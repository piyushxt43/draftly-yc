# 🚀 Quick Setup Guide for Draftly

## ✅ What Was Done

All environment variables are now properly configured:

### Created Files:
- `.env.example` - Template for environment variables
- `.env` - Your actual API keys (NOT in git)

### Configured:
- ✅ Firebase environment variables
- ✅ Gemini API key  
- ✅ .gitignore protects sensitive files
- ✅ Vercel-ready configuration

## 🏃 Running Locally

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

Your app will run at: http://localhost:5173

## 🌐 Deploying to Vercel

### Step 1: Add Environment Variables to Vercel

1. Go to https://vercel.com/dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add each variable:

```
# Firebase (7 variables)
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
VITE_FIREBASE_MEASUREMENT_ID

# Gemini AI
GEMINI_API_KEY
```

5. Enable for **Production**, **Preview**, and **Development**
6. Click **Save**
7. Go to **Deployments** → **Redeploy**

### Step 2: Connect to GitHub

1. Push your code to GitHub
2. Connect repo to Vercel
3. Auto-deploy on every push ✅

## 🔒 Security Checklist

- ✅ `.env` is in `.gitignore`
- ✅ No API keys in code
- ✅ All sensitive data in environment variables
- ✅ Safe to make repo public

## 📚 More Help

See these files for detailed instructions:
- `FIREBASE_SETUP.md` - Firebase configuration details
- `VERCEL_ENV_SETUP.md` - Vercel environment setup
- `README.md` - Full project documentation

