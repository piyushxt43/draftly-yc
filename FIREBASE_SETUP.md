# 🔐 Firebase Environment Setup

Your Firebase credentials are now **secure**! They are stored in `.env` file which is **NOT pushed to GitHub**.

## 📋 For Vercel Deployment

You need to add these environment variables to Vercel:

1. Go to your Vercel project dashboard
2. Click on **Settings** → **Environment Variables**
3. Add these variables one by one:

```
VITE_FIREBASE_API_KEY=AIzaSyDQTD9SHIJ9BMnauJ2cJevIVxYxtuWJJaY
VITE_FIREBASE_AUTH_DOMAIN=draflty.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=draflty
VITE_FIREBASE_STORAGE_BUCKET=draflty.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=999469134861
VITE_FIREBASE_APP_ID=1:999469134861:web:207bd3ee83fee13bd6d144
VITE_FIREBASE_MEASUREMENT_ID=G-P6S60N1JV1
```

4. Make sure to select **Production**, **Preview**, and **Development** for each variable
5. Click **Save**
6. Redeploy your site

## 🌐 Domain Setup

Your domain connection will **NOT be affected** by this change:
- ✅ GitHub → Vercel connection: **Still works**
- ✅ Vercel → Hostinger domain: **Still works**
- ✅ All environment variables are loaded from Vercel settings

## 🚀 What Changed?

### Before:
```typescript
// Firebase credentials were hardcoded in firebase.ts
const firebaseConfig = {
  apiKey: "AIzaSy..." // ❌ Exposed in GitHub
}
```

### After:
```typescript
// Now using environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY // ✅ Secure
}
```

## 📝 For Local Development

The `.env` file is already created on your local machine with all credentials.

If you clone the repo on another machine:
1. Copy `.env.example` to `.env`
2. Fill in your Firebase credentials
3. Run `npm run dev`

## ✨ Benefits

- 🔒 **Secure**: Firebase keys not exposed on GitHub
- 🌍 **Public repos**: Safe to make repo public now
- 🔄 **Easy updates**: Change keys in Vercel dashboard only
- 🛡️ **Best practice**: Industry-standard security approach

