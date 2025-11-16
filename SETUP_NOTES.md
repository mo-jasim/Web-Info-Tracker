# Setup Notes - URL Contest Tool

## Current Status

✅ **Completed:**
- Next.js 16 application with TypeScript
- Beautiful responsive UI with Tailwind CSS
- Google Gemini AI integration
- Tavily API integration
- Environment variable configuration
- Model name mapping (invalid → valid models)

## API Key Issues Detected

### 1. Tavily API - HTTP 403 Error
**Issue:** The Tavily API key is returning a 403 Forbidden error.

**Possible causes:**
- API key may be invalid or expired
- Free tier limitations
- API key needs to be regenerated

**Solution:**
- Visit [Tavily Dashboard](https://tavily.com) and verify your API key
- Generate a new API key if needed
- Update `.env.local` with the new key

### 2. Gemini API - Fetch Failed Error
**Issue:** The Gemini API is returning "fetch failed" errors.

**Possible causes:**
- API key may be invalid
- Network restrictions in the environment
- API key permissions not set correctly

**Solution:**
- Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
- Verify your API key is active
- Ensure the API key has proper permissions for Gemini 1.5 models
- Regenerate if necessary

## Environment Variables

The application reads from:
1. System environment variables (highest priority)
2. `.env.local` file (lower priority)

**Current configuration:**
- `GEMINI_MODEL`: Automatically maps invalid model names to valid ones
  - `gemini-2.5-flash-lite` → `gemini-1.5-flash`
  - `gemini-2.5-flash` → `gemini-1.5-flash`
  - `gemini-pro` → `gemini-1.5-pro`

## Valid Gemini Models

- `gemini-1.5-pro` - Most capable model
- `gemini-1.5-flash` - Fast and efficient
- `gemini-2.0-flash-exp` - Experimental newest model

## Next Steps

1. **Verify Tavily API Key:**
   ```bash
   # Test Tavily API directly
   curl -X POST https://api.tavily.com/search \
     -H "Content-Type: application/json" \
     -d '{"api_key": "your_tavily_key", "query": "test"}'
   ```

2. **Verify Gemini API Key:**
   ```bash
   # Test Gemini API directly
   curl -X POST "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=YOUR_API_KEY" \
     -H "Content-Type: application/json" \
     -d '{"contents":[{"parts":[{"text":"Hello"}]}]}'
   ```

3. **Update Environment Variables:**
   - Edit `.env.local` with working API keys
   - Restart the development server: `npm run dev`

## Testing Locally

Once API keys are working:

```bash
# Start the development server
npm run dev

# Test in another terminal
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"url": "https://www.github.com", "query": "What is this website?"}'
```

## Production Deployment

When deploying to production (Vercel, Netlify, etc.):

1. Add environment variables in your hosting platform:
   - `GEMINI_MODEL=gemini-1.5-flash`
   - `GEMINI_API_KEY=your_actual_key`
   - `TAVILY_API_KEY=your_actual_key`

2. Build and deploy:
   ```bash
   npm run build
   npm run start
   ```
