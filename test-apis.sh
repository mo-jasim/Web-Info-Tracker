#!/bin/bash

echo "========================================="
echo "API Keys Test Script"
echo "========================================="
echo ""

# Read API keys from .env.local or use environment variables
if [ -f .env.local ]; then
    export $(grep -v '^#' .env.local | xargs)
fi

echo "Testing Gemini API..."
echo "-----------------------------------"
GEMINI_RESPONSE=$(curl -s -w "\nHTTP_CODE:%{http_code}" \
  -X POST "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{"contents":[{"parts":[{"text":"Say hello"}]}]}' \
  --max-time 10)

HTTP_CODE=$(echo "$GEMINI_RESPONSE" | grep "HTTP_CODE" | cut -d':' -f2)

if [ "$HTTP_CODE" = "200" ]; then
    echo "✅ Gemini API: SUCCESS"
    echo "$GEMINI_RESPONSE" | grep -v "HTTP_CODE" | jq -r '.candidates[0].content.parts[0].text' 2>/dev/null || echo "Response received"
else
    echo "❌ Gemini API: FAILED (HTTP $HTTP_CODE)"
    echo "$GEMINI_RESPONSE" | grep -v "HTTP_CODE" | head -5
fi

echo ""
echo "Testing Tavily API..."
echo "-----------------------------------"
TAVILY_RESPONSE=$(curl -s -w "\nHTTP_CODE:%{http_code}" \
  -X POST "https://api.tavily.com/search" \
  -H "Content-Type: application/json" \
  -d "{\"api_key\": \"${TAVILY_API_KEY}\", \"query\": \"test\", \"max_results\": 1}" \
  --max-time 10)

HTTP_CODE=$(echo "$TAVILY_RESPONSE" | grep "HTTP_CODE" | cut -d':' -f2)

if [ "$HTTP_CODE" = "200" ]; then
    echo "✅ Tavily API: SUCCESS"
    echo "$TAVILY_RESPONSE" | grep -v "HTTP_CODE" | jq -r '.results[0].title' 2>/dev/null || echo "Response received"
else
    echo "❌ Tavily API: FAILED (HTTP $HTTP_CODE)"
    echo "$TAVILY_RESPONSE" | grep -v "HTTP_CODE" | head -5
fi

echo ""
echo "========================================="
echo "Test Complete"
echo "========================================="
echo ""
echo "If both APIs show SUCCESS, your application will work!"
echo "If either shows FAILED, you need to get new API keys."
