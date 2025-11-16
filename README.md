# 🌐 URL Contest Tool

A professional, AI-powered website analysis tool built with Next.js, Google Gemini AI, and Tavily API. Get real-time insights and comprehensive analysis of any website with a beautiful, responsive interface.

![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

- 🤖 **AI-Powered Analysis** - Leverages Google Gemini AI for intelligent website insights
- ⚡ **Real-Time Data** - Uses Tavily API to fetch the latest information
- 🎨 **Beautiful UI** - Modern, responsive design with glass-morphism effects
- 📊 **Comprehensive Insights** - Detailed analysis including content, SEO, and credibility assessment
- 🔒 **Secure** - Environment variable based API key management
- 📱 **Fully Responsive** - Works perfectly on desktop, tablet, and mobile devices

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- Google Gemini API key ([Get one here](https://makersuite.google.com/app/apikey))
- Tavily API key ([Get one here](https://tavily.com))

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Web-Info-Tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:
   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` and add your API keys:
   ```env
   GOOGLE_GEMINI_API_KEY=your_actual_gemini_api_key
   TAVILY_API_KEY=your_actual_tavily_api_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 Usage

1. Enter a website URL (e.g., `https://example.com`)
2. Describe what you want to know about the website
3. Click "Analyze Website"
4. View real-time data from Tavily and AI-powered analysis from Gemini

### Example Queries

- "What is this website about and is it trustworthy?"
- "What products or services do they offer?"
- "Is this a legitimate business website?"
- "What are the main features of this website?"

## 🏗️ Project Structure

```
Web-Info-Tracker/
├── app/
│   ├── api/
│   │   └── analyze/
│   │       └── route.ts       # Main analysis API endpoint
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Home page
├── components/
│   ├── AnalysisResults.tsx    # Results display component
│   └── UrlInput.tsx           # URL input form component
├── lib/
│   ├── gemini.ts              # Google Gemini integration
│   └── tavily.ts              # Tavily API integration
├── types/
│   └── index.ts               # TypeScript type definitions
├── .env.example               # Environment variables template
├── next.config.js             # Next.js configuration
├── tailwind.config.ts         # Tailwind CSS configuration
├── tsconfig.json              # TypeScript configuration
└── package.json               # Project dependencies
```

## 🔑 API Keys Setup

### Google Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key and add it to your `.env.local` file

### Tavily API Key

1. Visit [Tavily](https://tavily.com)
2. Sign up for an account
3. Navigate to your dashboard
4. Copy your API key and add it to your `.env.local` file

## 🛠️ Available Scripts

- `npm run dev` - Start development server on port 3000
- `npm run build` - Build the production application
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code quality

## 🎨 Design Features

- **Glass-morphism Effects** - Modern frosted glass UI elements
- **Gradient Backgrounds** - Beautiful purple and blue gradient themes
- **Smooth Animations** - Subtle transitions and loading states
- **Responsive Layout** - Mobile-first design approach
- **Dark Theme** - Professional dark mode interface

## 🔐 Security

- API keys are stored in environment variables
- Never commit `.env.local` to version control
- API routes validate all input before processing
- HTTPS URLs are enforced for website analysis

## 📊 Technologies Used

- **[Next.js 16](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Google Gemini AI](https://ai.google.dev/)** - Advanced AI analysis
- **[Tavily API](https://tavily.com/)** - Real-time search and data
- **[Axios](https://axios-http.com/)** - HTTP client for API requests

## 🚧 Troubleshooting

### API Key Errors

If you see "API key not configured" errors:
1. Ensure `.env.local` exists in the root directory
2. Check that your API keys are correctly formatted
3. Restart the development server after adding environment variables

### Build Errors

If you encounter build issues:
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Network Errors

If Tavily API fails:
- Check your internet connection
- Verify your Tavily API key is valid
- The app will still work with Gemini-only analysis

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 👨‍💻 Author

Built with ❤️ using Next.js and AI

## 🙏 Acknowledgments

- Google Gemini for powerful AI capabilities
- Tavily for real-time search functionality
- Next.js team for the amazing framework
- Tailwind CSS for the utility-first approach

---

**Note:** Make sure to keep your API keys secure and never share them publicly!
