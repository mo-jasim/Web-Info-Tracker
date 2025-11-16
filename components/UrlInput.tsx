'use client'

import { useState } from 'react'

interface UrlInputProps {
  onAnalyze: (url: string, query: string) => void
  isLoading: boolean
}

export default function UrlInput({ onAnalyze, isLoading }: UrlInputProps) {
  const [url, setUrl] = useState('')
  const [query, setQuery] = useState('')
  const [errors, setErrors] = useState<{ url?: string; query?: string }>({})

  const validateUrl = (url: string): boolean => {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: { url?: string; query?: string } = {}

    if (!url.trim()) {
      newErrors.url = 'URL is required'
    } else if (!validateUrl(url)) {
      newErrors.url = 'Please enter a valid URL (including http:// or https://)'
    }

    if (!query.trim()) {
      newErrors.query = 'Please describe what you want to know about this website'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setErrors({})
    onAnalyze(url, query)
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* URL Input */}
          <div>
            <label htmlFor="url" className="block text-sm font-medium text-gray-200 mb-2">
              Website URL
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className={`w-full pl-12 pr-4 py-3 bg-white/5 border ${
                  errors.url ? 'border-red-400' : 'border-white/30'
                } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all`}
                disabled={isLoading}
              />
            </div>
            {errors.url && (
              <p className="mt-2 text-sm text-red-400">{errors.url}</p>
            )}
          </div>

          {/* Query Input */}
          <div>
            <label htmlFor="query" className="block text-sm font-medium text-gray-200 mb-2">
              What do you want to know?
            </label>
            <div className="relative">
              <div className="absolute top-3 left-0 pl-4 flex items-start pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <textarea
                id="query"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g., What is this website about? Is it trustworthy? What products or services do they offer?"
                rows={4}
                className={`w-full pl-12 pr-4 py-3 bg-white/5 border ${
                  errors.query ? 'border-red-400' : 'border-white/30'
                } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none`}
                disabled={isLoading}
              />
            </div>
            {errors.query && (
              <p className="mt-2 text-sm text-red-400">{errors.query}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all duration-300 ${
              isLoading
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 shadow-lg hover:shadow-xl'
            }`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Analyzing...
              </span>
            ) : (
              <span className="flex items-center justify-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                Analyze Website
              </span>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
