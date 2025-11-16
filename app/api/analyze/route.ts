import { NextRequest, NextResponse } from 'next/server'
import { searchWithTavily } from '@/lib/tavily'
import { analyzeWithGemini } from '@/lib/gemini'
import { AnalysisRequest, AnalysisResponse } from '@/types'

export async function POST(request: NextRequest) {
  try {
    const body: AnalysisRequest = await request.json()
    const { url, query } = body

    // Validate input
    if (!url || !query) {
      return NextResponse.json(
        { error: 'URL and query are required' },
        { status: 400 }
      )
    }

    // Validate URL format
    try {
      new URL(url)
    } catch {
      return NextResponse.json(
        { error: 'Invalid URL format' },
        { status: 400 }
      )
    }

    // Step 1: Fetch real-time data with Tavily
    let tavilyData = null
    try {
      tavilyData = await searchWithTavily(query, url)
    } catch (error) {
      console.error('Tavily error:', error)
      // Continue even if Tavily fails - we can still use Gemini
    }

    // Step 2: Analyze with Gemini AI
    let geminiAnalysis = null
    try {
      if (tavilyData && tavilyData.results.length > 0) {
        geminiAnalysis = await analyzeWithGemini(url, query, tavilyData)
      } else {
        // If no Tavily data, provide a basic analysis request
        geminiAnalysis = await analyzeWithGemini(url, query, {
          results: [],
          query: query,
        })
      }
    } catch (error) {
      console.error('Gemini error:', error)
      return NextResponse.json(
        {
          error:
            'Failed to generate AI analysis. Please check your API keys and try again.',
        },
        { status: 500 }
      )
    }

    // Prepare response
    const response: AnalysisResponse = {
      tavilyData,
      geminiAnalysis,
      metadata: {
        url,
        status: 'success',
        timestamp: new Date().toISOString(),
      },
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Analysis error:', error)
    return NextResponse.json(
      {
        error: 'An unexpected error occurred during analysis',
      },
      { status: 500 }
    )
  }
}
