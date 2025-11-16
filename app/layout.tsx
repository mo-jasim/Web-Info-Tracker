import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'URL Contest Tool - AI-Powered Website Analysis',
  description: 'Analyze websites with AI using Google Gemini and Tavily for real-time insights',
  keywords: 'url analysis, website checker, AI analysis, Gemini, Tavily',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
          {children}
        </main>
      </body>
    </html>
  )
}
