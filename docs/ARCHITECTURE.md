# 🏗️ Architecture & Security Design

## 1. Architectural Pattern
The application follows the **MERN (MongoDB, Express.js, React, Node.js)** full-stack architecture with clear separation of concerns:

- **Client Layer (SPA):** Built with React 19, Vite, and Tailwind CSS. Client state is managed with Context API (`AuthContext`, `ThemeContext`) and custom hooks.
- **API Layer (REST):** Express.js routing with modular controllers and express-validator middleware.
- **Data Persistence:** MongoDB Atlas with Mongoose schemas and compound query indexes.

## 2. Authentication & Data Isolation
1. **Password Hashing:** Passwords are never stored in plaintext. They are salted with bcrypt (12 rounds) in a pre-save hook.
2. **Stateless JWTs:** Tokens are signed using HMAC SHA-256 and verified on every protected request.
3. **Data Isolation:** All database queries are scoped by `req.user._id` populated from the JWT token. Users can never query or manipulate other accounts' records.

## 3. Defense-in-Depth Security
- **Helmet.js:** Sets HTTP security headers (Content Security Policy, X-Content-Type-Options, etc.).
- **Rate Limiting:** Protects authentication endpoints from credential-stuffing and brute-force attempts.
- **CORS Allowlist:** Only requests from configured frontend origins are allowed to make cross-origin calls.
