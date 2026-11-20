# 📖 Personal Expense Tracker — API Documentation

This document describes all RESTful endpoints available in the Personal Expense Tracker backend service.

## Base URL
- **Local:** `http://localhost:5000/api`
- **Production:** `https://your-backend.onrender.com/api`

---

## 🔐 Authentication

All protected endpoints require a Bearer token in the request header:
```http
Authorization: Bearer <your_jwt_token>
```

### 1. Register User
- **Method:** `POST`
- **Endpoint:** `/auth/register`
- **Access:** Public
- **Request Body:**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "secretPassword123"
}
```
- **Response:** `201 Created`
```json
{
  "success": true,
  "message": "Account created successfully",
  "token": "eyJhbGciOiJIUzI1Ni...",
  "user": {
    "_id": "654321...",
    "name": "Jane Doe",
    "email": "jane@example.com",
    "currency": "USD"
  }
}
```

### 2. Login User
- **Method:** `POST`
- **Endpoint:** `/auth/login`
- **Access:** Public
- **Request Body:**
```json
{
  "email": "jane@example.com",
  "password": "secretPassword123"
}
```

### 3. Get Current User Profile
- **Method:** `GET`
- **Endpoint:** `/auth/me`
- **Access:** Private (Bearer Token)

---

## 💸 Transactions

### 1. Get All Transactions
- **Method:** `GET`
- **Endpoint:** `/transactions`
- **Access:** Private
- **Query Parameters:**
  - `type`: `income` | `expense`
  - `category`: string
  - `startDate`: ISO date string
  - `endDate`: ISO date string
  - `search`: string (matches category or description)
  - `sortBy`: `date` | `amount`
  - `order`: `asc` | `desc`
  - `page`: integer (default: 1)
  - `limit`: integer (default: 20)

### 2. Create Transaction
- **Method:** `POST`
- **Endpoint:** `/transactions`
- **Access:** Private
- **Request Body:**
```json
{
  "type": "expense",
  "amount": 42.50,
  "category": "Food",
  "description": "Lunch with team",
  "date": "2026-11-20"
}
```

### 3. Export Transactions as CSV
- **Method:** `GET`
- **Endpoint:** `/transactions/export`
- **Access:** Private
- **Response:** `200 OK` (returns CSV string formatted rows)

---

## 🎯 Savings Goals

### 1. List Savings Goals
- **Method:** `GET`
- **Endpoint:** `/goals`
- **Access:** Private

### 2. Create Goal
- **Method:** `POST`
- **Endpoint:** `/goals`
- **Access:** Private

---

## 🔄 Recurring Transactions

### 1. List Subscriptions & Bills
- **Method:** `GET`
- **Endpoint:** `/recurring`
- **Access:** Private

### 2. Create Recurring Item
- **Method:** `POST`
- **Endpoint:** `/recurring`
- **Access:** Private

---

## 📊 Dashboard & Reports

### 1. Summary Statistics
- **Method:** `GET`
- **Endpoint:** `/dashboard/summary`
- **Access:** Private

### 2. Analytics
- **Method:** `GET`
- **Endpoint:** `/dashboard/analytics?year=2026`
- **Access:** Private
