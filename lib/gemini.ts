import { GoogleGenerativeAI } from '@google/generative-ai'
import { TavilyResponse } from '@/types'

export async function analyzeWithGemini(
  url: string,
  query: string,
  tavilyData: TavilyResponse
): Promise<string> {
  const apiKey = process.env.GOOGLE_GEMINI_API_KEY

  if (!apiKey) {
    throw new Error('GOOGLE_GEMINI_API_KEY is not configured')
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

    // Prepare context from Tavily results
    const tavilyContext = tavilyData.results
      .map(
        (result, index) =>
          `Source ${index + 1}:\nTitle: ${result.title}\nURL: ${result.url}\nContent: ${result.content}\n`
      )
      .join('\n---\n')

    const prompt = `You are an expert website analyst. A user wants to know about the website: ${url}

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

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    return text
  } catch (error) {
    console.error('Gemini API error:', error)
    throw new Error('Failed to generate analysis with Gemini AI')
  }
}
