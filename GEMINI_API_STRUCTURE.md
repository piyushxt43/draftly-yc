# 🔄 Gemini API Structure & Fallback Mechanism

## Current Implementation

The codebase uses **`gemini-2.0-flash-exp`** as the primary model with automatic fallback to **`gemini-2.0-flash`** when limits are exceeded or the API is unreachable.

---

## 📍 Where It's Implemented

### 1. **Client-Side** (`src/services/geminiService.ts`)
- Direct API calls (local development)
- Lines: 38-89

### 2. **Server-Side** (`api/generate-ui.ts`)
- Vercel serverless function (production)
- Lines: 42-75

---

## 🏗️ API Structure Flow

```
┌─────────────────────────────────────┐
│  1. Initialize Gemini AI            │
│     genAI.getGenerativeModel()      │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  2. Try gemini-2.0-flash-exp FIRST │
│     Primary model (experimental)    │
└──────────────┬──────────────────────┘
               │
        ┌──────┴──────┐
        │             │
   ✅ SUCCESS    ❌ ERROR
        │             │
        │    ┌────────┴────────┐
        │    │                 │
        │  Check Error Type    │
        │    │                 │
        │    ▼                 ▼
        │ 429 or Resource    Other
        │  Exhausted?        Error
        │    │                 │
        │    YES              NO
        │    │                 │
        │    ▼                 │
        │ ┌──────────────────┐ │
        │ │  3. FALLBACK     │ │
        │ │  gemini-2.0-flash│ │
        │ │  (stable model)  │ │
        │ └──────────────────┘ │
        │         │             │
        └─────────┴─────────────┘
                   │
                   ▼
        ┌──────────────────────┐
        │  4. Generate Content │
        │     Return HTML      │
        └──────────────────────┘
```

---

## 💻 Code Structure

### Step 1: Initialize Model

```typescript
const genAI = new GoogleGenerativeAI(API_KEY);
let model = genAI.getGenerativeModel({ 
  model: "gemini-2.0-flash-exp"  // ← PRIMARY MODEL
});
```

### Step 2: Try Experimental Model First

```typescript
try {
  result = await model.generateContent({
    contents: [{
      role: "user",
      parts: [{ text: fullPrompt }]
    }],
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 8192,
      topP: 0.9,
    }
  });
  response = await result.response;
  generatedText = response.text();
  console.log('✅ Used gemini-2.0-flash-exp');
} 
```

### Step 3: Fallback to Stable Model

```typescript
catch (rateLimitError: any) {
  // Check if rate limited or resource exhausted
  if (
    rateLimitError.message?.includes('429') || 
    rateLimitError.message?.includes('Resource exhausted')
  ) {
    console.log('⚠️ Rate limited, falling back to gemini-2.0-flash...');
    
    // SWITCH TO STABLE MODEL
    model = genAI.getGenerativeModel({ 
      model: "gemini-2.0-flash"  // ← FALLBACK MODEL
    });
    
    // Retry with stable model
    result = await model.generateContent({
      contents: [{
        role: "user",
        parts: [{ text: fullPrompt }]
      }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 8192,
        topP: 0.9,
      }
    });
    response = await result.response;
    generatedText = response.text();
    console.log('✅ Used gemini-2.0-flash (fallback)');
  } else {
    // Other errors - throw them
    throw rateLimitError;
  }
}
```

---

## 🎯 Current Error Handling

### ✅ Handles These Errors:

#### Rate Limit Errors:
- **429** - Rate limit exceeded
- **Resource exhausted** - API quota/limit reached

#### Network/Unreachable Errors:
- **Network errors** - Connection issues
- **Timeout errors** - Request timeouts
- **ECONNREFUSED** - Connection refused
- **ENOTFOUND** - DNS resolution failed
- **ETIMEDOUT** - Request timeout
- **Unreachable** - API not reachable

### ✅ Implementation:

```typescript
catch (error: any) {
  const isRateLimit = 
    error.message?.includes('429') || 
    error.message?.includes('Resource exhausted');
  
  const isNetworkError = 
    error.message?.includes('network') ||
    error.message?.includes('timeout') ||
    error.message?.includes('ECONNREFUSED') ||
    error.message?.includes('ENOTFOUND') ||
    error.message?.includes('unreachable') ||
    error.code === 'ETIMEDOUT' ||
    error.code === 'ECONNREFUSED' ||
    error.code === 'ENOTFOUND';
  
  // Fallback if rate limited OR network error (unreachable)
  if (isRateLimit || isNetworkError) {
    // Try fallback model
    model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    // ... retry logic
  } else {
    throw error;
  }
}
```

---

## 📊 Model Comparison

| Feature | gemini-2.0-flash-exp | gemini-2.0-flash |
|---------|---------------------|------------------|
| **Status** | Experimental | Stable |
| **Primary Use** | Yes | Fallback |
| **Speed** | Faster | Standard |
| **Availability** | May have limits | More reliable |
| **Rate Limits** | Stricter | More lenient |

---

## ✅ Summary

**Current Behavior:**
1. ✅ Tries `gemini-2.0-flash-exp` first
2. ✅ Falls back to `gemini-2.0-flash` on rate limits (429) or resource exhaustion
3. ✅ Falls back to `gemini-2.0-flash` on network errors (unreachable, timeout, connection refused, etc.)

**Complete Fallback Coverage:** Both rate limits AND network/unreachable errors are handled! 🚀
