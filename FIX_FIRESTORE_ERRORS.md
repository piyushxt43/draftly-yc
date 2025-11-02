# 🔧 Fix Firestore 400 Errors

## What Are These Errors?

These are **Firebase Firestore connection errors** (not Gemini API). They show:
- `firestore.googleapis.com` - 400 Bad Request
- WebChannelConnection errors
- Firestore Listen/Write stream errors

## Root Causes:

1. ❌ **Firebase environment variables not set in Vercel**
2. ❌ **Firestore not enabled in Firebase project**
3. ❌ **Domain not authorized in Firebase**
4. ❌ **Firestore security rules blocking access**

---

## ✅ Step-by-Step Fix

### Step 1: Add Firebase Environment Variables to Vercel

1. Go to: **Vercel Dashboard** → Your Project → **Settings** → **Environment Variables**

2. Add ALL these variables (with `VITE_` prefix):

```
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

3. Enable for: **Production**, **Preview**, **Development** (all three)

4. Click **Save**

### Step 2: Enable Firestore in Firebase

1. Go to: https://console.firebase.google.com/
2. Select your project (e.g., "draflty")
3. In left sidebar: **Build** → **Firestore Database**
4. Click **Create database** (if not created)
5. Choose:
   - **Start in test mode** (for development)
   - Or **Production mode** (then set security rules)
6. Select a location (choose closest to your users)
7. Click **Enable**

### Step 3: Set Firestore Security Rules

1. In Firebase Console → **Firestore Database** → **Rules** tab
2. For development, use test mode:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

3. Click **Publish**

### Step 4: Authorize Your Domain

1. Go to: **Firebase Console** → **Authentication** → **Settings** → **Authorized domains**
2. Add your Vercel domain:
   - `your-app.vercel.app`
   - Your custom domain (if any)
3. Click **Add**

### Step 5: Redeploy on Vercel

1. Go to **Vercel Dashboard** → **Deployments**
2. Click **...** on latest deployment
3. Click **Redeploy**
4. Wait for completion

---

## 🔍 How to Get Firebase Credentials

### Option 1: Firebase Console (Recommended)

1. Go to: https://console.firebase.google.com/
2. Select your project
3. Click **⚙️ Settings** (gear icon) → **Project settings**
4. Scroll to **Your apps** section
5. Click **Web app** (or create one)
6. Copy all config values:
   ```javascript
   const firebaseConfig = {
     apiKey: "AIza...",
     authDomain: "project.firebaseapp.com",
     projectId: "project-id",
     storageBucket: "project.appspot.com",
     messagingSenderId: "123456789",
     appId: "1:123456789:web:abc123",
     measurementId: "G-ABC123"
   };
   ```
7. Use these values for Vercel environment variables

### Option 2: Check Your Local .env File

If you have a `.env` file locally, check it:
```bash
# Look for these values:
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
# etc.
```

---

## ✅ Verification Checklist

After setup, verify:

- [ ] All 7 Firebase environment variables added to Vercel
- [ ] Variables enabled for Production, Preview, Development
- [ ] Firestore Database created in Firebase Console
- [ ] Firestore security rules published
- [ ] Vercel domain added to Firebase authorized domains
- [ ] Redeployed on Vercel
- [ ] Errors should be gone! ✅

---

## 🚨 If Errors Persist

### Check 1: Firebase Project ID
- Make sure `VITE_FIREBASE_PROJECT_ID` matches your Firebase project
- Check in Firebase Console → Project Settings

### Check 2: Firestore Enabled
- Go to Firebase Console → Firestore Database
- If you see "Create database", it's not enabled yet

### Check 3: Network Issues
- These errors can also happen if Firebase is temporarily down
- Check: https://status.firebase.google.com/

### Check 4: Browser Console
- Open browser DevTools → Console
- Look for more specific Firebase error messages
- They will tell you exactly what's wrong

---

## 💡 Note About Errors

These Firestore errors are **non-critical** for basic functionality:
- ✅ Your site will still load
- ✅ UI generation will still work (doesn't use Firestore)
- ⚠️ User authentication/profile data may not save

But it's best to fix them for full functionality!

---

**After following these steps, the Firestore errors should disappear!** 🎉

