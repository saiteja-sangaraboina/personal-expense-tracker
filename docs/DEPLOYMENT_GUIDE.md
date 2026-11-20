# 🚀 Deployment Guide

This guide details deploying the Personal Expense Tracker to production using free tiers on Vercel and Render.

---

## Step 1: MongoDB Atlas Setup
1. Create a free M0 cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas).
2. Go to **Network Access** and add IP `0.0.0.0/0` (Allow access from anywhere).
3. Create a Database User under **Database Access**.
4. In **Clusters** -> **Connect** -> **Drivers**, copy your connection URI:
   ```
   mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/expensetracker?retryWrites=true&w=majority
   ```

---

## Step 2: Backend Deployment (Render)
1. Sign in to [render.com](https://render.com).
2. Click **New +** -> **Web Service**.
3. Connect your repository: `saiteja-sangaraboina/personal-expense-tracker`.
4. Configure the service:
   - **Root Directory:** `backend`
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Add Environment Variables:
   - `NODE_ENV`: `production`
   - `MONGO_URI`: `<Your MongoDB Atlas connection URI>`
   - `JWT_SECRET`: `<A strong random string>`
   - `JWT_EXPIRE`: `30d`
   - `FRONTEND_URL`: `https://your-frontend.vercel.app`

---

## Step 3: Frontend Deployment (Vercel)
1. Sign in to [vercel.com](https://vercel.com).
2. Click **Add New...** -> **Project**.
3. Import your `personal-expense-tracker` repository.
4. Set **Root Directory** to `frontend`.
5. Add Environment Variable:
   - `VITE_API_URL`: `https://your-backend.onrender.com/api`
6. Click **Deploy**.
