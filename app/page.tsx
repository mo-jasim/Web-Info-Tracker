'use client'

import { useState } from 'react'
import UrlInput from '@/components/UrlInput'
import AnalysisResults from '@/components/AnalysisResults'

export default function Home() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [results, setResults] = useState<any>(null)

  const handleAnalyze = async (url: string, query: string) => {
    setIsAnalyzing(true)
    setResults(null)

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url, query }),
      })

      if (!response.ok) {
        throw new Error('Analysis failed')
      }

      const data = await response.json()
      setResults(data)
    } catch (error) {
      console.error('Error:', error)
      setResults({
        error: 'Failed to analyze URL. Please check your API keys and try again.',
      })
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-6xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            URL Contest Tool
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
            AI-powered website analysis using Google Gemini and Tavily for real-time insights
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          <UrlInput onAnalyze={handleAnalyze} isLoading={isAnalyzing} />
          {(isAnalyzing || results) && (
            <AnalysisResults results={results} isLoading={isAnalyzing} />
          )}
        </div>

        {/* Features Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard
            icon="🤖"
            title="AI-Powered Analysis"
            description="Leverages Google Gemini AI for intelligent website analysis"
          />
          <FeatureCard
            icon="⚡"
            title="Real-Time Data"
            description="Uses Tavily API to fetch the latest information about websites"
          />
          <FeatureCard
            icon="📊"
            title="Comprehensive Insights"
            description="Get detailed analysis including content, SEO, and recommendations"
          />
        </div>
      </div>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-300 text-sm">{description}</p>
    </div>
  )
}
