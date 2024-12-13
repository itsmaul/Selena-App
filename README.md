# Selena App

Selena App is an integrated application designed to manage financial transactions seamlessly. Built as part of a collaborative project, it combines Machine Learning (ML), Cloud Computing (CC), and Mobile Development (MD) technologies to deliver an intuitive and efficient experience for users.

---

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Cloud Architecture](#system-architecture)
- [Installation and Setup](#installation-and-setup)
- [API Documentation](#api-documentation)
- [Contributors](#contributors)
- [License](#license)

---

## Features

- **User Authentication:** Secure signup, login, and OTP-based verification.
- **Transaction Management:** CRUD operations for financial transactions.
- **Batch Transaction Uploads:** Support for bulk uploads from Shopee and Tokopedia Excel files.
- **Dashboard Analytics:** Visual insights into financial data, including income, expenses, and anomalies.
- **Machine Learning Insights:** Personalized financial recommendations based on transaction patterns.

---

## Technologies Used

### **Mobile Development (MD)**
- **Platform:** Android (Kotlin)
- **Features:**
  - User-friendly interface for managing transactions.
  - Integration with API for real-time updates.

### **Cloud Computing (CC)**
- **Backend Framework:** Express.js
- **Deployed on:** Google Cloud Run
- **Database:** Cloud SQL
- **Features:**
  - RESTful APIs for user authentication and transaction management.
  - Secure and scalable backend infrastructure.

### **Machine Learning (ML)**
- **Algorithm:** Autoencoder for anomaly detection
- **Frameworks:** TensorFlow.js, Scikit-learn
- **Features:**
  - Anomaly detection in transactions.
  - Financial advice based on spending patterns.

---

## Cloud Architecture

### Current Architecture
The current architecture is optimized to minimize resource costs while maintaining essential functionalities. Key components include:

- **Frontend (MD):** Mobile application interacting with the backend APIs for user input and financial data management.
- **Backend (CC):** Deployed on **Google Cloud Run**, handling API requests and performing database operations.
- **Database:** **Cloud SQL** for structured storage of transaction and user data.
- **Temporary Storage:** **Cloud Firestore** for managing OTP verification in real time.
- **Model Storage:** **Google Cloud Storage** for uploading and storing TensorFlow.js models.

![Current Cloud Architecture](https://storage.googleapis.com/selena_model_bucket/Cloud%20Architecture%20-%20A.png)

---

### Recommended Architecture
For a real-case scenario, the architecture can be expanded to include enhanced scalability and performance features:

- **Frontend (MD):** Mobile app remains the primary user interface.
- **Backend (CC):** Continues on **Google Cloud Run** but with additional integration for GPU-powered **Compute Engine** to process ML tasks like anomaly detection.
- **ML Processing:** High-performance **Compute Engine** instances for running ML models and delivering real-time insights.
- **Database:** **Cloud SQL** for relational data and **Google Cloud Storage** for large-scale data and model handling.
- **Temporary Data Storage:** **Cloud Firestore** for real-time data like OTPs.
- **Artifact Management:** **Artifact Registry** to manage and deploy containerized services.

![Current Cloud Architecture](https://storage.googleapis.com/selena_model_bucket/Cloud%20Architecture%20-%20B.png)

---

## API Documentation

The API is documented and accessible via Postman: [Selena Backend API Documentation](https://documenter.getpostman.com/view/22349462/2sAYHwJQCt)

Key Endpoints:
- **POST /auth/signup**: User registration.
- **POST /auth/login**: User login.
- **POST /auth/otp/verify**: OTP verification.
- **GET /transactions**: Fetch user transactions.
- **POST /transactions**: Add a new transaction.
- **PUT /transactions/:id**: Update a transaction.
- **DELETE /transactions/:transactionId**: Delete a transaction.
- **DELETE /transactions/delete-all/:userId**: Delete all user's transactions.

---
This provides detailed documentation for the Cloud Computing (CC) APIs used in the Selena App. These APIs handle backend functionality such as user authentication, transaction management, and data import.

### User Authentication

**1. Signup**

- **URL:** `/auth/signup`
- **Method:** `POST`
- **Request Body:**

    ```json
    {
      "name": "John Doe",
      "email": "johndoe@example.com",
      "password": "securepassword123"
    }
    ```

- **Responses:**
  - Missing required fields (400):
    ```json
    { "message": "Nama, email, dan password perlu diisi!" }
    ```
  - Password less than 8 characters (400):
    ```json
    { "message": "Password harus berjumlah 8 karakter." }
    ```
  - Email already registered (409):
    ```json
    { "message": "Email sudah terdaftar!" }
    ```
  - OTP Sending Failed (500):
    ```json
    { "message": "Gagal mengirim OTP. Coba lagi" }
    ```
  - Successful registration (200):
    ```json
    {
      "message": "OTP telah dikirim ke email Anda. Harap verifikasi.",
      "user": {
        "id": 1,
        "name": "John Doe",
        "email": "johndoe@example.com"
      }
    }
    ```

**2. Verify OTP**

- **URL:** `/auth/otp/verify`
- **Method:** `POST`
- **Request Body:**

    ```json
    {
      "otp": "123456",
      "name": "John Doe",
      "email": "johndoe@example.com",
      "password": "securepassword123"
    }
    ```

- **Responses:**
  - Missing required fields (400):
    ```json
    { "message": "Nama, email, password, ataupun OTP tidak lengkap di Request Body!" }
    ```
  - Expired OTP (400):
    ```json
    { "message": "OTP sudah kedaluwarsa." }
    ```
  - Invalid OTP (400):
    ```json
    { "message": "OTP tidak valid." }
    ```
  - Server error (500):
    ```json
    { "message": "Terjadi kesalahan di server." }
    ```
  - Successful account creation (201):
    ```json
    { "message": "Pendaftaran akun berhasil!" }
    ```

**3. Login**

- **URL:** `/auth/login`
- **Method:** `POST`
- **Request Body:**

    ```json
    {
      "email": "johndoe@example.com",
      "password": "securepassword123"
    }
    ```

- **Responses:**
  - Missing required fields (400):
    ```json
    { "message": "Email dan password diperlukan" }
    ```
  - User not found (404):
    ```json
    { "message": "Pengguna tidak ditemukan" }
    ```
  - Invalid credentials (401):
    ```json
    { "message": "Email atau password tidak valid" }
    ```
  - Successful login (200):
    ```json
    {
      "message": "Login berhasil",
      "user": {
        "id": "integer",
        "name": "string",
        "email": "string"
      },
      "token": "string"
    }
    ```

---

### Transaction Management

**4. Get All Transactions**

- **URL:** `/transactions`
- **Method:** `GET`
- **Query Parameters:**
  - `user_id` (required)
  - `start_date` (optional)
  - `end_date` (optional)
- **Headers:**
  - `Authorization: Bearer <JWT_TOKEN>`

**5. Get Transaction Details**

- **URL:** `/transactions/:transactionId`
- **Method:** `GET`

**6. Add a Transaction**

- **URL:** `/transactions`
- **Method:** `POST`

**7. Update a Transaction**

- **URL:** `/transactions/:transactionId`
- **Method:** `PUT`

**8. Delete a Transaction**

- **URL:** `/transactions/:transactionId`
- **Method:** `DELETE`

**9. Delete All Transactions**

- **URL:** `/transactions/delete-all/:userId`
- **Method:** `DELETE`

---

### Data Import

**10. Insert Data via Shopee Excel**

- **URL:** `/insert-shopee`
- **Method:** `POST`

**11. Insert Data via Tokopedia Excel**

- **URL:** `/insert-tokopedia`
- **Method:** `POST`

---

### Dashboard Analytics

**URL: `/dashboard`**

- **Parameters:**
  - `user_id` (required)
- **Method:** `GET`
- **Headers:**
  - `Authorization: Bearer <JWT_TOKEN>`
---

## Dataset Machine Learning

The dataset used for the Machine Learning component is stored on [GitHub](https://github.com/calistasalscpw/Selena-Finance-Tracker).

**Reasoning:**
The dataset was collected manually by gathering transaction histories ("mutasi rekening") from several individuals. This approach was necessary because publicly available datasets are predominantly from foreign sources, which do not accurately reflect the spending patterns and behaviors of users in Indonesia. By using locally sourced data, the model can provide more relevant and effective financial insights tailored to the Indonesian context.

---

## Previous Github Repositories

- MD Github: https://github.com/dorizx/SelenaApp
- CC Github: https://github.com/anthrofax/selena-backend-service
- ML Github: https://github.com/calistasalscpw/Selena-Finance-Tracker

---

# Link Application
https://drive.google.com/drive/folders/1NqCNwd5DWX0OOvuj5eVqy9vNA4pDDpaO?usp=drive_link

---

## Contributors

### Machine Learning (ML):
- (ML) M263B4KY0464 - Amin Afif Rafi’i (Universitas Muhammadiyah Purwokerto) - [Active]
- (ML) M314B4KX3882 - Risma Auliya Salsabilla (Universitas Singaperbangsa Karawang) - [Active]
- (ML) M314B4KX0888 - Calista Salsabila Citra Putri Winanto (Universitas Singaperbangsa Karawang) - [Active]

### Cloud Computing (CC):
- (CC) C314B4KY0164 - Afridho Ikhsan (Universitas Singaperbangsa Karawang) - [Active]
- (CC) C314B4KY3917 - Rizki Septiana (Universitas Singaperbangsa Karawang) - [Active]

### Mobile Development (MD):
- (MD) A314B4KY0109 - Aditya Daffa Syahputra (Universitas Singaperbangsa Karawang) - [Active]
- (MD) A263B4KX0272 - Ajeng Puspa Andini (Universitas Muhammadiyah Purwokerto) - [Active]

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
