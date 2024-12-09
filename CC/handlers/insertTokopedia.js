/* eslint-disable no-unused-vars */
const xlsx = require("xlsx");
const Users = require("../models/user");
const validateExcelRange = require("../helper/checkValidExcel");
const Transactions = require("../models/transaction");

exports.insertTokopediaSalesHandler = async (req, res) => {
  const userId = req.body.user_id; // User ID dari request body
  const file = req.file; // File yang diunggah

  if (!userId) {
    return res.status(400).json({ message: "User ID diperlukan" });
  }

  if (!file) {
    return res.status(400).json({ message: "Tidak ada file yang diunggah" });
  }

  try {
    // Cek apakah user_id valid (opsional, jika perlu validasi user_id)
    const user = await Users.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    // Membaca file Excel dari buffer (tanpa menyimpan ke disk)
    const workbook = xlsx.read(file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    // Cek apakah excel yang diupload merupakan Laporan 'Riwayat Penjualan' hasil export dari halaman 'Daftar Pesanan' di Tokopedia
    const determinedRange = "A5:E5";
    const expectedValues = [
      "Nomor",
      "Nomor Invoice",
      "Tanggal Pembayaran",
      "Status Terakhir",
      "Tanggal Pesanan Selesai",
    ];
    const isValid = validateExcelRange(
      worksheet,
      expectedValues,
      determinedRange
    );

    if (!isValid) {
      return res.status(400).json({
        message:
          "Excel yang anda upload bukan merupakan Laporan 'Riwayat Penjualan' hasil export dari halaman 'Daftar Pesanan' di Tokopedia. Silahkan upload excel yang valid.",
      });
    }

    // Ambil informasi range yang ada datanya dari sheet
    const range = worksheet["!ref"];

    // Mendapatkan baris pertama dan terakhir dari range
    const [startCell, endCell] = range.split(":");

    // Mengonversi data mulai dari baris ke-5 hingga baris terakhir
    const data = xlsx.utils.sheet_to_json(worksheet, {
      range: `A5:${endCell}`,
      blankrows: false,
    });

    // Memproses data menjadi transaksi
    const transactions = data
      .filter((row) => row["Status Terakhir"] === "Pesanan Selesai")
      .map((row) => {
        // Pastikan row["Tanggal Pesanan Selesai"] adalah tanggal yang valid
        const date = new Date(row["Tanggal Pesanan Selesai"]);

        // Cek apakah date valid
        const formattedDate = !isNaN(date)
          ? date.toISOString().slice(0, 10)
          : new Date().toISOString().slice(0, 10);

        return {
          user_id: userId,
          amount: parseFloat(
            row["Total Penjualan (IDR)"] - row["Total Pengurangan (IDR)"] || 0
          ),
          transaction_type: "income", // Menganggap semua transaksi adalah "income"
          date: formattedDate,
          catatan: `Penjualan Tokopedia | ${
            row["Nomor Invoice"] ? `Invoice: ${row["Nomor Invoice"]} | ` : ""
          } ${row["Nama Produk"] ? `Produk: ${row["Nama Produk"]}` : ""}`,
        };
      });

    await Transactions.bulkCreate(transactions);

    res.status(200).json({
      message: "Transaksi berhasil diimpor",
      totalTransaksi: transactions.length,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Terjadi kesalahan di server", error: error.message });
  }
};

exports.insertTokopediaDepositHandler = async (req, res) => {
  const userId = req.body.user_id;
  const file = req.file;

  if (!userId) {
    return res.status(400).json({ message: "User ID diperlukan" });
  }

  if (!file) {
    return res.status(400).json({ message: "Tidak ada file yang diunggah" });
  }

  try {
    // Cek apakah user_id valid (opsional, jika perlu validasi user_id)
    const user = await Users.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    // Membaca file Excel dari buffer (tanpa menyimpan ke disk)
    const workbook = xlsx.read(file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    // Cek apakah excel yang diupload merupakan hasil dari export 'Riwayat Saldo' dari halaman 'Detail Saldo' di Tokopedia
    const determinedRange = "A7:E7";
    const expectedValues = [
      "Date",
      "Mutation (Debit/Credit)",
      "Description",
      "Nominal (Rp)",
      "Balance (Rp)",
    ];
    const isValid = validateExcelRange(
      worksheet,
      expectedValues,
      determinedRange
    );

    if (!isValid) {
      return res.status(400).json({
        message:
          "Excel yang anda upload bukan merupakan Laporan 'Riwayat Saldo' hasil export dari halaman 'Detail Saldo' di Tokopedia. Silahkan upload excel yang valid.",
      });
    }

    // Ambil informasi range yang ada datanya dari sheet
    const range = worksheet["!ref"];

    // Mendapatkan baris pertama dan terakhir dari range
    const [startCell, endCell] = range.split(":");
    console.log(endCell);

    // Mengonversi data mulai dari baris ke-5 hingga baris terakhir
    const data = xlsx.utils.sheet_to_json(worksheet, {
      range: `A7:${endCell}`, // Dinamis: mulai dari baris ke-5 hingga akhir
      blankrows: false,
    });

    // Memproses data menjadi transaksi
    const transactions = data.map((row) => {
      // Pastikan row["Tanggal Pesanan Selesai"] adalah tanggal yang valid
      const date = new Date(row["Date"]);

      // Cek apakah date valid
      const formattedDate = !isNaN(date)
        ? date.toISOString().slice(0, 10)
        : new Date().toISOString().slice(0, 10);

      return {
        user_id: userId,
        amount: Math.abs(row["Nominal (Rp)"]) || 0,
        transaction_type: row["Nominal (Rp)"] < 0 ? "expense" : "income",
        date: formattedDate,
        catatan: row["Description"],
      };
    });

    await Transactions.bulkCreate(transactions);

    res.status(200).json({
      message: "Transaksi berhasil diimpor",
      totalTransaksi: transactions.length,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Terjadi kesalahan di server", error: error.message });
  }
};
