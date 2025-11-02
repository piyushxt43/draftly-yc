import { GoogleGenerativeAI } from "@google/generative-ai";

// This runs on Vercel server-side - API key is NOT exposed to client
export default async function handler(req: any, res: any) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    // Get API key from server-side environment (NOT exposed to client)
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.error('❌ GEMINI_API_KEY is not set in Vercel environment variables!');
      return res.status(500).json({ error: 'API key not configured' });
    }

    console.log('🚀 Server: Calling Gemini API with prompt length:', prompt.length);

    // Initialize Gemini AI
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

    // The prompt from client already includes MASTER_SYSTEM_PROMPT with all detailed instructions
    // including the critical CSS texture background requirements, so we use it directly
    const systemPrompt = "You are an elite UI/UX designer. You MUST return COMPLETE, FULL HTML websites with ALL 7-8 sections. NEVER truncate or summarize. Output the ENTIRE HTML code from <!DOCTYPE html> to </html>. Minimum 5000 characters. Include 20+ images with LoremFlickr URLs. 🚨🚨🚨 CRITICAL: The <body> tag MUST use ONLY CSS texture patterns from the 20 provided options - ABSOLUTELY NO background images (no url(https://...), no url(https://loremflickr.com/...), no url(https://unsplash.com/...))! Use ONLY CSS gradients or SVG data URIs for <body> background! Make a COMPLETE, WORKING website!";

    // Call Gemini API
    // Note: prompt already contains MASTER_SYSTEM_PROMPT with all detailed instructions
    const result = await model.generateContent({
      contents: [{
        role: "user",
        parts: [{
          text: `${systemPrompt}\n\n${prompt}`
        }]
      }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 8192,
        topP: 0.9,
      }
    });

    const response = await result.response;
    const generatedText = response.text();

    console.log('✅ Server: Gemini API responded successfully! Length:', generatedText.length);

    // Return the generated HTML
    return res.status(200).json({
      success: true,
      html: generatedText
    });

  } catch (error: any) {
    console.error('❌ Server Error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to generate UI. Please try again.'
    });
  }
}

