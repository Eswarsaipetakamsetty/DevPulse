# 🔐 Auth Service (Spring Boot)

This microservice handles user authentication and authorization using **JWT tokens**. It supports organizational onboarding, user sign-up, login, role elevation (e.g. making a user a manager), and token validation.

---

## 🚀 Features

- Register a new organization
- Sign up users (e.g., employees)
- Login and receive a JWT
- Promote an employee to a manager
- Fetch user details by ID
- Validate an existing JWT token

---

## 🧩 Tech Stack

- **Spring Boot**
- **Spring Security**
- **JWT (JSON Web Token)**
- **PostgreSQL** or preferred RDBMS
- **Maven/Gradle**

---

## 📦 API Endpoints

### 🔧 Auth APIs

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/auth/org/create` | Register a new organization |
| `POST` | `/auth/signup` | Register a new user (e.g., employee) |
| `POST` | `/auth/login` | Authenticate user and issue JWT |
| `POST` | `/auth/make_manager/{id}` | Promote employee with given ID to manager |
| `GET` | `/auth/user/{id}` | Get user information by ID |
| `POST` | `/auth/token/validate` | Validate an existing JWT (token introspection) |

---

## 📥 Request Samples

### ✅ Register Organization


