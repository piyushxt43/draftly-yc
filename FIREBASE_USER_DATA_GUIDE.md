# 📝 Firebase User Data Storage Guide

## Overview
Currently, Firebase stores:
- ✅ Email (from authentication)
- ✅ Name & Industry (from onboarding)
- ✅ Generation Count

This guide shows how to store **additional user data** like:
- User profile details (name, phone, company, etc.)
- User prompts/searches (what users are entering)
- Generation history
- User preferences

---

## 🔥 Step 1: Understanding Firestore Structure

### Current Structure:
```
Firestore Database
└── users (collection)
    └── {userId} (document)
        ├── email: "user@example.com"
        ├── name: "John Doe"
        ├── industry: "freelancer"
        ├── onboarded: true
        ├── generationCount: 5
        └── createdAt: "2024-01-01T00:00:00Z"
```

### Target Structure (After Implementation):
```
Firestore Database
└── users (collection)
    └── {userId} (document)
        ├── email: "user@example.com"
        ├── name: "John Doe"
        ├── phone: "+1234567890"
        ├── company: "Acme Inc"
        ├── industry: "freelancer"
        ├── onboarded: true
        ├── generationCount: 5
        ├── createdAt: "2024-01-01T00:00:00Z"
        └── prompts (subcollection)
            ├── {promptId1}
            │   ├── prompt: "Design a modern SaaS landing page..."
            │   ├── timestamp: "2024-01-01T10:00:00Z"
            │   └── htmlGenerated: true
            └── {promptId2}
                ├── prompt: "Create an e-commerce dashboard..."
                ├── timestamp: "2024-01-01T11:00:00Z"
                └── htmlGenerated: true
```

---

## 📋 Step 2: Store User Profile Data

### Option A: Update During Onboarding (Recommended)

**File: `src/components/OnboardingFlow.tsx`**

The onboarding already stores `name` and `industry`. Add more fields:

```typescript
// In handleComplete function, update:
await setDoc(doc(db, 'users', user.uid), {
  name: name.trim(),
  industry: selectedIndustry,
  email: user.email,
  phone: '', // Add phone field
  company: '', // Add company field
  bio: '', // Add bio field
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  onboarded: true
}, { merge: true }) // Use merge to not overwrite existing data
```

### Option B: Update Profile Page

**File: `src/pages/Profile.tsx`**

Add a form to update profile information:

```typescript
const [profileData, setProfileData] = useState({
  name: '',
  phone: '',
  company: '',
  bio: ''
})

const handleUpdateProfile = async () => {
  try {
    await setDoc(doc(db, 'users', user.uid), {
      ...profileData,
      updatedAt: new Date().toISOString()
    }, { merge: true })
    alert('Profile updated!')
  } catch (error) {
    console.error('Error updating profile:', error)
  }
}
```

---

## 📝 Step 3: Store User Prompts/Searches

### When to Store:
- When user generates UI
- When user searches
- When user saves a prompt

### Implementation in Landing.tsx:

**File: `src/pages/Landing.tsx`**

In the `handleGenerateUI` function, add prompt storage:

```typescript
// After successful generation:
if (result.success && result.html) {
  // Store the prompt in user's prompts subcollection
  try {
    const promptsRef = collection(db, 'users', user.uid, 'prompts')
    await addDoc(promptsRef, {
      prompt: chatInput.trim(),
      timestamp: new Date().toISOString(),
      htmlGenerated: true,
      htmlLength: result.html.length
    })
  } catch (error) {
    console.error('Error saving prompt:', error)
  }
  
  // Rest of your existing code...
}
```

**Don't forget to import:**
```typescript
import { collection, addDoc } from 'firebase/firestore'
```

---

## 🔍 Step 4: Retrieve User Data

### Get User Profile:
```typescript
const getUserData = async (userId: string) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId))
    if (userDoc.exists()) {
      return userDoc.data()
    }
  } catch (error) {
    console.error('Error fetching user data:', error)
  }
}
```

### Get User Prompts:
```typescript
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore'

const getUserPrompts = async (userId: string, limitCount: number = 10) => {
  try {
    const promptsRef = collection(db, 'users', userId, 'prompts')
    const q = query(promptsRef, orderBy('timestamp', 'desc'), limit(limitCount))
    const querySnapshot = await getDocs(q)
    
    const prompts = []
    querySnapshot.forEach((doc) => {
      prompts.push({ id: doc.id, ...doc.data() })
    })
    
    return prompts
  } catch (error) {
    console.error('Error fetching prompts:', error)
    return []
  }
}
```

---

## 🎯 Step 5: Complete Implementation Example

### Example: Store Prompt + Update Profile

```typescript
import { 
  db, doc, setDoc, getDoc, 
  collection, addDoc, 
  query, orderBy, getDocs 
} from '../firebase'

// 1. Store user prompt when generating UI
const saveUserPrompt = async (userId: string, prompt: string, html: string) => {
  try {
    // Add to prompts subcollection
    await addDoc(collection(db, 'users', userId, 'prompts'), {
      prompt: prompt.trim(),
      timestamp: new Date().toISOString(),
      htmlGenerated: true,
      htmlLength: html.length
    })
    
    // Update user's generation count
    const userDocRef = doc(db, 'users', userId)
    const userDoc = await getDoc(userDocRef)
    const currentCount = userDoc.exists() 
      ? (userDoc.data().generationCount || 0) 
      : 0
    
    await setDoc(userDocRef, {
      generationCount: currentCount + 1,
      lastGeneratedAt: new Date().toISOString()
    }, { merge: true })
    
    console.log('✅ Prompt saved successfully')
  } catch (error) {
    console.error('❌ Error saving prompt:', error)
  }
}

// 2. Update user profile
const updateUserProfile = async (
  userId: string, 
  data: { name?: string, phone?: string, company?: string, bio?: string }
) => {
  try {
    await setDoc(doc(db, 'users', userId), {
      ...data,
      updatedAt: new Date().toISOString()
    }, { merge: true })
    
    console.log('✅ Profile updated successfully')
  } catch (error) {
    console.error('❌ Error updating profile:', error)
  }
}

// 3. Get user's prompt history
const getPromptHistory = async (userId: string) => {
  try {
    const promptsRef = collection(db, 'users', userId, 'prompts')
    const q = query(promptsRef, orderBy('timestamp', 'desc'), limit(20))
    const snapshot = await getDocs(q)
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  } catch (error) {
    console.error('❌ Error fetching prompt history:', error)
    return []
  }
}
```

---

## 🔐 Step 6: Firestore Security Rules

Update your Firestore security rules to allow users to read/write their own data:

**Firebase Console → Firestore Database → Rules**

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own user document
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      
      // Users can read/write their own prompts
      match /prompts/{promptId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
    }
  }
}
```

---

## ✅ Step 7: Testing

1. **Test Profile Update:**
   - Go to Profile page
   - Update name, phone, company
   - Check Firebase Console → Firestore → users → {yourUserId}

2. **Test Prompt Storage:**
   - Generate a UI from Landing page
   - Check Firebase Console → Firestore → users → {yourUserId} → prompts

3. **Test Retrieval:**
   - Fetch user data in Profile page
   - Display prompt history

---

## 📊 Step 8: View Data in Firebase Console

1. Go to: https://console.firebase.google.com/
2. Select your project: **draflty**
3. Click **Firestore Database** in left sidebar
4. Navigate: `users` → `{userId}` → `prompts`
5. You'll see all stored data!

---

## 🎨 Step 9: Display Stored Data in UI

### Example: Show Prompt History in Profile

```typescript
// In Profile.tsx
const [promptHistory, setPromptHistory] = useState([])

useEffect(() => {
  if (user) {
    getPromptHistory(user.uid).then(setPromptHistory)
  }
}, [user])

// Display in JSX:
{promptHistory.map((prompt) => (
  <div key={prompt.id}>
    <p>{prompt.prompt}</p>
    <small>{new Date(prompt.timestamp).toLocaleDateString()}</small>
  </div>
))}
```

---

## 🚀 Quick Start Checklist

- [ ] Update `OnboardingFlow.tsx` to store additional fields
- [ ] Add prompt storage in `Landing.tsx` when generating UI
- [ ] Import necessary Firestore functions (`addDoc`, `collection`, etc.)
- [ ] Update Firestore security rules
- [ ] Test storing profile data
- [ ] Test storing prompts
- [ ] Test retrieving data
- [ ] Display data in UI (optional)

---

## 💡 Pro Tips

1. **Use `merge: true`** when updating documents to avoid overwriting existing data
2. **Use subcollections** for arrays of data (like prompts) - easier to query
3. **Add timestamps** to track when data was created/updated
4. **Handle errors** gracefully - Firestore might be offline
5. **Use indexes** if querying by multiple fields (Firebase will prompt you)

---

## ❓ Common Questions

**Q: Should I store HTML in Firestore?**
A: No, it's too large. Store prompts and metadata only. HTML can be stored in Cloud Storage if needed.

**Q: What's the difference between `setDoc` and `addDoc`?**
A: `setDoc` creates/updates a document with a specific ID. `addDoc` creates a document with an auto-generated ID.

**Q: How to delete user data?**
A: Use `deleteDoc(doc(db, 'users', userId))` or delete subcollections recursively.

---

## 📚 Additional Resources

- [Firestore Documentation](https://firebase.google.com/docs/firestore)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)
- [Firestore Best Practices](https://firebase.google.com/docs/firestore/best-practices)
