export interface AnalysisRequest {
  url: string
  query: string
}

export interface TavilyResult {
  title: string
  url: string
  content: string
  score: number
}

export interface TavilyResponse {
  results: TavilyResult[]
  query: string
}

export interface AnalysisResponse {
  tavilyData: TavilyResponse | null
  geminiAnalysis: string | null
  metadata: {
    url: string
    status: string
    timestamp: string
  }
  error?: string
}
