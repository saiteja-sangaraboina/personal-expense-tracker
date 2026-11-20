# 💰 Personal Expense Tracker

A full-stack MERN web application to manage personal finances — track income, expenses, budgets, and view analytics through an interactive dashboard.

## 🚀 Features

- 🔐 Secure JWT Authentication
- 💸 Income & Expense Management
- 📊 Interactive Dashboard with Charts
- 🎯 Budget Tracking with Alerts
- 📈 Financial Reports & Analytics
- 🔍 Search, Filter & Sort Transactions
- 🌙 Dark / Light Mode
- 📱 Fully Responsive UI
- 📤 Export Transactions as CSV

## 🛠️ Tech Stack

**Frontend:** React.js, Vite, Tailwind CSS, Recharts, Lucide React  
**Backend:** Node.js, Express.js, JWT, bcrypt.js  
**Database:** MongoDB Atlas, Mongoose  
**Deployment:** Vercel (frontend), Render (backend)

## 📁 Project Structure

```
personal-expense-tracker/
  frontend/   → React + Vite frontend
  backend/    → Node.js + Express API
  README.md
```

## ⚙️ Installation

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- Git

### Clone the repo
```bash
git clone https://github.com/saiteja-sangaraboina/personal-expense-tracker.git
cd personal-expense-tracker
```

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env   # Fill in your values
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env   # Fill in your values
npm run dev
```

## 🌐 Live Demo
Coming soon...

## 📝 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register user |
| POST | /api/auth/login | Login user |
| GET | /api/auth/me | Get current user |
| GET | /api/transactions | Get all transactions |
| POST | /api/transactions | Add transaction |
| PUT | /api/transactions/:id | Update transaction |
| DELETE | /api/transactions/:id | Delete transaction |
| GET | /api/budgets | Get budgets |
| POST | /api/budgets | Create budget |
| GET | /api/dashboard/summary | Dashboard summary |
| GET | /api/dashboard/analytics | Dashboard analytics |

## 👨‍💻 Author
**Saiteja Sangaraboina**  
GitHub: [@saiteja-sangaraboina](https://github.com/saiteja-sangaraboina)
