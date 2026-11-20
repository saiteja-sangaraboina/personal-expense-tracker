# 🚀 Deployment Guide

This guide details how to deploy Personal Expense Tracker across multiple hosting and container environments.

## Option 1: Docker Compose (Recommended for Self-Hosting)

### Production Deployment
```bash
# Clone the repository
git clone https://github.com/saiteja-sangaraboina/personal-expense-tracker.git
cd personal-expense-tracker

# Build and start all services in detached mode
docker compose up --build -d

# Check running status
docker compose ps
```

The frontend will be available at `http://localhost` (port 80) and the backend API at `http://localhost:5000`.

---

## Option 2: Cloud Deployment (Vercel + Render)

### Frontend on Vercel
1. Link your GitHub repository to Vercel.
2. Set root directory to `frontend`.
3. Build command: `npm run build`
4. Output directory: `dist`
5. Configure environment variable: `VITE_API_URL=https://your-backend-api.onrender.com/api`

### Backend on Render
1. Create a Web Service connected to GitHub.
2. Root directory: `backend`
3. Build command: `npm install`
4. Start command: `node server.js`
5. Add MongoDB connection string (`MONGO_URI`) and `JWT_SECRET`.
