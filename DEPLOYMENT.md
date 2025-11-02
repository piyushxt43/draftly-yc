# 🚀 Draftly Production Deployment Guide

## 📋 Prerequisites

- Node.js 18+ installed
- Git repository set up
- Vercel account (free tier works)
- Firebase project created
- Google Gemini API key

## 🔐 Environment Variables Setup

### Local Development

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Fill in your actual values in `.env`:
```
# Client-side (VITE_ prefix - exposed in browser, safe for Firebase)
VITE_FIREBASE_API_KEY=your_actual_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id

# Server-side (NO VITE_ prefix - NOT exposed to client, SECURE!)
# This is for the /api/generate-ui endpoint
GEMINI_API_KEY=your_gemini_api_key
```

### Vercel Production Deployment

1. **Push to Git** (ensure .env is NOT committed):
```bash
git add .
git commit -m "Production ready deployment"
git push origin main
```

2. **Deploy to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your Git repository
   - Configure environment variables in Vercel dashboard:
     - Go to Project Settings → Environment Variables
     - **IMPORTANT:** Add both client-side AND server-side variables:
       - **Client-side** (VITE_ prefix): VITE_FIREBASE_*, etc.
       - **Server-side** (NO prefix): `GEMINI_API_KEY` (this is SECURE, not exposed to clients!)
     - Set for: Production, Preview, and Development
     - ⚠️ **SECURITY:** Never add `VITE_GEMINI_API_KEY` - use `GEMINI_API_KEY` instead!

3. **Add Custom Domain** (optional):
   - Go to Project Settings → Domains
   - Add your custom domain
   - Follow DNS configuration instructions

## 🛠️ Build Commands

Vercel will automatically detect these settings:

- **Framework**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

## ✅ Pre-Deployment Checklist

- [x] All API keys moved to environment variables
- [x] `.env` added to `.gitignore`
- [x] `.env.example` created for reference
- [x] Firebase configuration using env vars
- [x] Gemini API using env vars
- [x] No sensitive data in source code
- [x] All dependencies in `package.json`
- [x] Build command tested locally

## 🔒 Security Notes

**NEVER commit these files:**
- `.env`
- `.env.local`
- `.env.production`

**Safe to commit:**
- `.env.example` (with placeholder values)
- All source code files
- `package.json` and `package-lock.json`

## 🧪 Test Build Locally

Before deploying, test the production build:

```bash
npm run build
npm run preview
```

## 📦 What's Deployed

- ✅ React + TypeScript frontend
- ✅ Firebase Authentication
- ✅ Firestore Database
- ✅ Google Gemini AI integration
- ✅ LoremFlickr image API
- ✅ Responsive UI with Tailwind CSS
- ✅ Framer Motion animations
- ✅ UI generation & download features

## 🌐 After Deployment

1. Update Firebase authorized domains:
   - Go to Firebase Console → Authentication → Settings
   - Add your Vercel domain (e.g., `your-app.vercel.app`)

2. Test all features:
   - User authentication (Email & Google)
   - UI generation
   - File downloads
   - Responsive design

## 🆘 Troubleshooting

**Build fails:**
- Check all environment variables are set in Vercel
- Ensure Node.js version is 18+
- Clear build cache in Vercel

**Firebase errors:**
- Add Vercel domain to Firebase authorized domains
- Check Firebase API keys are correct
- Verify Firebase project is active

**UI generation not working:**
- Verify `GEMINI_API_KEY` (NOT `VITE_GEMINI_API_KEY`) is set in Vercel environment variables
- Check that `/api/generate-ui` endpoint is accessible
- Check API quota/billing in Google Cloud Console
- Review browser console for errors
- Check Vercel function logs for server-side errors

**API key security:**
- ✅ `GEMINI_API_KEY` - Server-side only (secure, used in `/api/generate-ui`)
- ❌ `VITE_GEMINI_API_KEY` - DO NOT USE (would expose key to clients)

## 📞 Support

For issues, check:
- Vercel deployment logs
- Browser developer console
- Firebase Console → Analytics

---

**Ready to deploy!** 🎉
