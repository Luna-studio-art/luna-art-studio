# 🚀 Luna Portfolio - FREE Deployment Guide

## Your Live Website Will Be:
- **Frontend:** `https://luna-portfolio.vercel.app`
- **Backend:** `https://luna-portfolio-backend.onrender.com`
- **Cost:** $0 (completely free!)

---

## ⚡ Quick Start (20 Minutes)

### Step 1: Create GitHub Account (3 min)
1. Go to https://github.com
2. Click "Sign up"
3. Use email: `kr077279@gmail.com`
4. Choose username: `lumacooper` or `luna-art`
5. Verify email

### Step 2: Install Git (5 min)
1. Download: https://git-scm.com/download/win
2. Run installer (click Next → Next → Finish)
3. Done!

### Step 3: Push Code to GitHub (10 min)

Open **Command Prompt** and run:

```bash
# Go to project folder
cd C:\Users\STARHIVE\OneDrive\Documents\Attachments\Desktop\portfoio

# Initialize Git
git init

# Add all files
git add .

# Commit
git commit -m "Luna Portfolio"

# Rename branch



# Create repo on github.com (name: luna-portfolio, Public)

# Push (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/luna-portfolio.git
git push -u origin main
```

### Step 4: Deploy Frontend on Vercel (5 min)

1. Go to https://vercel.com
2. Sign up with GitHub
3. Click "Add New Project"
4. Select `luna-portfolio`
5. **Root Directory:** `frontend`
6. Click **"Deploy"**
7. Wait 2-3 minutes
8. **Done!** Copy your URL

### Step 5: Deploy Backend on Render (10 min)

1. Go to https://render.com
2. Sign up with GitHub
3. **New +** → **Web Service**
4. Connect `luna-portfolio`
5. **Settings:**
   - Root Directory: `backend`
   - Build: `npm install`
   - Start: `node server.js`
   - Instance: **Free**

6. **Add Environment Variables:**
   ```
   MONGODB_URI = mongodb+srv://admin12:Abdulkabir123@cluster0.uhslfh7.mongodb.net/?appName=Cluster0
   JWT_SECRET = your-super-secret-jwt-key-change-in-production
   CLOUDINARY_CLOUD_NAME = dxapjnzqt
   CLOUDINARY_API_KEY = 597827226537635
   CLOUDINARY_API_SECRET = RaF07aONDzMcNHKorjlDcZnJC6g
   FRONTEND_URL = https://luna-portfolio.vercel.app
   ADMIN_EMAIL = kr077279@gmail.com
   ADMIN_PASSWORD = admin123
   ```

7. Click **"Create Web Service"**
8. Wait 5-10 minutes
9. **Done!** Copy your backend URL

### Step 6: Update Vercel (2 min)

1. Go to Vercel Dashboard
2. Select your project
3. **Settings** → **Environment Variables**
4. Add: `NEXT_PUBLIC_API_URL = https://luna-portfolio-backend.onrender.com/api`
5. **Redeploy**

---

## 🎉 Your Live Website!

```
Frontend: https://luna-portfolio.vercel.app
Backend:  https://luna-portfolio-backend.onrender.com
```

**Test:**
- Open frontend URL
- Login to admin: `kr077279@gmail.com` / `admin123`
- Upload your work!

---

## ⚠️ Important Notes

1. **Render Free Tier:** Backend sleeps after 15 min (first request takes 30 sec)
2. **Vercel:** Always fast, no sleep
3. **Auto-Deploy:** Push to GitHub = auto update both!

---

## 🆘 Need Help?

If you get stuck, tell me:
- Which step?
- What error do you see?

I'll help you fix it! 😊
