import axios from 'axios'
import { TavilyResponse } from '@/types'

const TAVILY_API_URL = 'https://api.tavily.com/search'

export async function searchWithTavily(query: string, url: string): Promise<TavilyResponse> {
  const apiKey = process.env.TAVILY_API_KEY

  if (!apiKey) {
    throw new Error('TAVILY_API_KEY is not configured')
  }

  try {
    const searchQuery = `${query} site:${new URL(url).hostname}`

    const response = await axios.post(
      TAVILY_API_URL,
      {
        api_key: apiKey,
        query: searchQuery,
        search_depth: 'advanced',
        include_answer: true,
        include_raw_content: false,
        max_results: 5,
        include_domains: [new URL(url).hostname],
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    return {
      results: response.data.results || [],
      query: searchQuery,
    }
  } catch (error) {
    console.error('Tavily API error:', error)
    throw new Error('Failed to fetch data from Tavily API')
  }
}
