# Selena App

Selena App is an integrated application designed to manage financial transactions seamlessly. Built as part of a collaborative project, it combines Machine Learning (ML), Cloud Computing (CC), and Mobile Development (MD) technologies to deliver an intuitive and efficient experience for users.

---

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [System Architecture](#system-architecture)
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

## System Architecture

![System Architecture Diagram](https://storage.googleapis.com/selena_model_bucket/selena-cloud-architecture)

- **Frontend (MD):** Mobile application for user interaction.
- **Backend (CC):** API to handle requests and process data.
- **ML Component:** Provides insights and recommendations based on data.

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

## Dataset Machine Learning

The dataset used for the Machine Learning component is stored on [GitHub](https://github.com/calistasalscpw/Selena-Finance-Tracker).

**Reasoning:**
The dataset was collected manually by gathering transaction histories ("mutasi rekening") from several individuals. This approach was necessary because publicly available datasets are predominantly from foreign sources, which do not accurately reflect the spending patterns and behaviors of users in Indonesia. By using locally sourced data, the model can provide more relevant and effective financial insights tailored to the Indonesian context.

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