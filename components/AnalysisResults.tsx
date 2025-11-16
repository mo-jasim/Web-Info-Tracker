'use client'

interface AnalysisResultsProps {
  results: any
  isLoading: boolean
}

export default function AnalysisResults({ results, isLoading }: AnalysisResultsProps) {
  if (isLoading) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
          <div className="space-y-4">
            <div className="flex items-center justify-center">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <svg
                    className="w-6 h-6 text-purple-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path
                      fillRule="evenodd"
                      d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <p className="text-center text-white text-lg font-medium">
              Analyzing website...
            </p>
            <div className="space-y-2">
              <LoadingStep text="Fetching website data with Tavily API" delay={0} />
              <LoadingStep text="Processing with Google Gemini AI" delay={300} />
              <LoadingStep text="Generating comprehensive insights" delay={600} />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!results) {
    return null
  }

  if (results.error) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <div className="bg-red-500/10 backdrop-blur-lg rounded-2xl p-8 border border-red-500/30 shadow-2xl">
          <div className="flex items-start space-x-3">
            <svg
              className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            <div>
              <h3 className="text-lg font-semibold text-red-400 mb-1">Error</h3>
              <p className="text-red-300">{results.error}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Tavily Results */}
      {results.tavilyData && (
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
          <div className="flex items-center mb-4">
            <div className="bg-blue-500/20 p-2 rounded-lg mr-3">
              <svg
                className="w-6 h-6 text-blue-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path
                  fillRule="evenodd"
                  d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white">Real-Time Data</h2>
          </div>
          <div className="prose prose-invert max-w-none">
            {results.tavilyData.results && results.tavilyData.results.length > 0 ? (
              <div className="space-y-4">
                {results.tavilyData.results.slice(0, 3).map((result: any, index: number) => (
                  <div
                    key={index}
                    className="bg-white/5 p-4 rounded-lg border border-white/10 hover:bg-white/10 transition-all"
                  >
                    <a
                      href={result.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 font-semibold text-lg no-underline"
                    >
                      {result.title}
                    </a>
                    <p className="text-gray-300 text-sm mt-2">{result.content}</p>
                    {result.score && (
                      <div className="mt-2">
                        <span className="text-xs text-gray-400">
                          Relevance: {(result.score * 100).toFixed(0)}%
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-300">No additional data found.</p>
            )}
          </div>
        </div>
      )}

      {/* Gemini Analysis */}
      {results.geminiAnalysis && (
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
          <div className="flex items-center mb-4">
            <div className="bg-purple-500/20 p-2 rounded-lg mr-3">
              <svg
                className="w-6 h-6 text-purple-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white">AI Analysis</h2>
          </div>
          <div className="prose prose-invert max-w-none">
            <div className="text-gray-200 whitespace-pre-wrap leading-relaxed">
              {results.geminiAnalysis}
            </div>
          </div>
        </div>
      )}

      {/* Metadata */}
      {results.metadata && (
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-gray-400 text-sm">Status</p>
              <p className="text-white font-semibold mt-1">
                {results.metadata.status || 'Complete'}
              </p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Analyzed URL</p>
              <p className="text-white font-semibold mt-1 truncate">
                {results.metadata.url ? new URL(results.metadata.url).hostname : 'N/A'}
              </p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Sources</p>
              <p className="text-white font-semibold mt-1">
                {results.tavilyData?.results?.length || 0}
              </p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Analysis Time</p>
              <p className="text-white font-semibold mt-1">
                {results.metadata.timestamp
                  ? new Date(results.metadata.timestamp).toLocaleTimeString()
                  : 'Now'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function LoadingStep({ text, delay }: { text: string; delay: number }) {
  return (
    <div
      className="flex items-center space-x-2 text-gray-300 animate-pulse"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
      <span className="text-sm">{text}</span>
    </div>
  )
}
