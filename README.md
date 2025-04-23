# Authentication Server

A robust and scalable Node.js authentication server built with Express and PostgreSQL.

## ✨ Features

- 🔑 User authentication (Login / Register)
- 🔐 JWT-based authentication
- 🔒 Secure password hashing
- 🧹 Input validation & sanitization
- 🚫 Rate limiting
- ⚠️ Centralized error handling
- 🔁 Password recovery (coming soon in future updates)

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL
- **ORM:** Sequelize
- **Security:** JWT, Bcrypt, CORS, Helmet
- **Validation:** express-validator

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [PostgreSQL](https://www.postgresql.org/)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mendeslian/auth-server.git
   cd <project-folder>
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```

4. **Start the server**
   ```bash
   npm start
   ```

---

## 📦 API Endpoints

### 🔐 Authentication

- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Authenticate user

---

## 📁 Project Structure

```
src/
├── controllers/    # Route handlers
├── middleware/     # Custom middleware (auth, validation, etc.)
├── models/         # Sequelize models
├── routes/         # Route definitions
└── utils/          # Utility functions
```

---

## ⚠️ Error Handling

All errors follow a consistent JSON structure with proper HTTP status codes:

```json
{
  "error": {
    "message": "Error message",
    "code": "ERROR_CODE"
  }
}
```

---

## 🛡️ Security Practices

This application follows common best practices for API security:

- Passwords are hashed using **bcrypt**
- Authentication via **JWT**
- **Rate limiting** to prevent brute force attacks
- **Input validation** using express-validator
- **CORS configuration** for safe cross-origin requests
- Optionally use **Helmet** to set secure HTTP headers

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m "Add my feature"`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request 🚀

---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE.md](LICENSE.md) file for more details.  
Created by [Lian Mendes](https://www.linkedin.com/in/lian-mendes-825295210/)
