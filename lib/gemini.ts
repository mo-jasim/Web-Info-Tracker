import { GoogleGenerativeAI } from '@google/generative-ai'
import { TavilyResponse } from '@/types'

export async function analyzeWithGemini(
  url: string,
  query: string,
  tavilyData: TavilyResponse
): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GEMINI_API_KEY

  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured')
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey)

    // Get model name from environment, with mapping for invalid names
    let requestedModel = process.env.GEMINI_MODEL || 'gemini-1.5-flash'

    // Map invalid model names to valid ones
    const modelMap: Record<string, string> = {
      'gemini-2.5-flash-lite': 'gemini-1.5-flash',
      'gemini-2.5-flash': 'gemini-1.5-flash',
      'gemini-pro': 'gemini-1.5-pro',
    }

    const modelName = modelMap[requestedModel] || requestedModel
    console.log(`Using Gemini model: ${modelName}${requestedModel !== modelName ? ` (mapped from ${requestedModel})` : ''}`)
    const model = genAI.getGenerativeModel({ model: modelName })

    // Prepare context from Tavily results
    const hasTavilyData = tavilyData.results && tavilyData.results.length > 0
    const tavilyContext = hasTavilyData
      ? tavilyData.results
          .map(
            (result, index) =>
              `Source ${index + 1}:\nTitle: ${result.title}\nURL: ${result.url}\nContent: ${result.content}\n`
          )
          .join('\n---\n')
      : 'No additional data available from external sources.'

    let prompt = ''
    if (hasTavilyData) {
      prompt = `You are an expert website analyst. A user wants to know about the website: ${url}

User's question: ${query}

Here is real-time information gathered from Tavily API:
${tavilyContext}

Based on the above information, provide a comprehensive, professional analysis that answers the user's question. Structure your response with:

1. **Overview**: Brief summary of what the website is about
2. **Key Findings**: Main points addressing the user's specific question
3. **Content & Services**: What the website offers
4. **Credibility Assessment**: Evaluate trustworthiness, professionalism, and reliability
5. **Recommendations**: Any suggestions or important considerations

Be specific, detailed, and cite information from the sources when relevant. Format your response in a clear, professional manner.`
    } else {
      prompt = `You are an expert website analyst. A user wants to know about the website: ${url}

User's question: ${query}

Based on your general knowledge about this website and similar platforms, provide a professional analysis that answers the user's question. Structure your response with:

1. **Overview**: Brief summary of what you know about this website
2. **Key Findings**: Main points addressing the user's specific question
3. **Content & Services**: What the website typically offers
4. **General Assessment**: Evaluate based on your knowledge
5. **Recommendations**: Any suggestions or important considerations

Note: This analysis is based on general knowledge as real-time data was not available. Provide accurate information about ${url}.`
    }

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    return text
  } catch (error: any) {
    console.error('Gemini API error:', error)
    console.error('Error details:', error?.message)
    throw new Error(`Failed to generate analysis with Gemini AI: ${error?.message || 'Unknown error'}`)
  }
}
