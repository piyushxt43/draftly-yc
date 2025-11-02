# 📋 Quick Copy-Paste for Vercel Environment Variables

Copy all the variables below and paste them into **Vercel Dashboard → Settings → Environment Variables**

---

## ✅ Copy These Variables to Vercel:

**Replace `your_gemini_api_key_here` with your actual Gemini API key at the end!**

```
VITE_FIREBASE_API_KEY=AIzaSyDQTD9SHIJ9BMnauJ2cJevIVxYxtuWJJaY
VITE_FIREBASE_AUTH_DOMAIN=draflty.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=draflty
VITE_FIREBASE_STORAGE_BUCKET=draflty.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=999469134861
VITE_FIREBASE_APP_ID=1:999469134861:web:207bd3ee83fee13bd6d144
VITE_FIREBASE_MEASUREMENT_ID=G-P6S60N1JV1
GEMINI_API_KEY=your_gemini_api_key_here
```

**⚠️ Don't forget to replace `your_gemini_api_key_here` with your actual Gemini API key!**

---

## 📝 Step-by-Step:

1. **Go to Vercel Dashboard**: https://vercel.com/dashboard
2. **Select your project** (draftly-yc)
3. **Click Settings** → **Environment Variables**
4. **Click "Add New"** for each variable above
5. **Replace placeholder values** with your actual keys:
   - **Firebase keys**: Get from https://console.firebase.google.com/ → Project Settings
   - **Gemini key**: Get from https://aistudio.google.com/apikey
6. **Enable for**: ✅ Production, ✅ Preview, ✅ Development
7. **Click Save**
8. **Redeploy**: Go to Deployments → Redeploy latest

---

## 🔍 Where to Find Your Keys:

### Firebase Keys:
1. Go to: https://console.firebase.google.com/
2. Select your project
3. Click ⚙️ **Settings** → **Project settings**
4. Scroll to **Your apps** section
5. Click **Web app** (or create one)
6. Copy all config values

### Gemini API Key:
1. Go to: https://aistudio.google.com/apikey
2. Create new API key (if you don't have one)
3. Copy the key

---

## ⚠️ Important Notes:

- ✅ `GEMINI_API_KEY` - **NO** `VITE_` prefix (server-side only)
- ✅ `VITE_FIREBASE_*` - **WITH** `VITE_` prefix (client-side)
- ✅ Enable for **all environments** (Production, Preview, Development)
- ✅ **Redeploy** after adding variables
- ❌ **Never commit** `.env` file to Git
- ✅ `.env.example` is safe to commit (has placeholders)

---

**After adding all variables and redeploying, everything should work!** 🎉

