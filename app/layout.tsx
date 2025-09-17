import './globals.css'
import type { Metadata } from 'next'
import { Inter, Source_Code_Pro, JetBrains_Mono } from 'next/font/google'
import MatrixSoundManager from '../components/effects/MatrixSoundManager'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
})

const sourceCodePro = Source_Code_Pro({
  subsets: ['latin'],
  variable: '--font-source-code-pro',
  display: 'swap'
})

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'AI Cash Revolution | Advanced Trading Signals',
  description: 'Professional AI-powered trading platform with Matrix-inspired design. Get real-time trading signals, portfolio management, and advanced market analysis.',
  keywords: 'AI trading, trading signals, forex, cryptocurrency, financial technology, matrix design',
  authors: [{ name: 'AI Cash Revolution Team' }],
  creator: 'AI Cash Revolution',
  publisher: 'AI Cash Revolution',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
  themeColor: '#00ff88',
  robots: 'index, follow',
  openGraph: {
    title: 'AI Cash Revolution | Advanced Trading Signals',
    description: 'Professional AI-powered trading platform with Matrix-inspired design',
    type: 'website',
    siteName: 'AI Cash Revolution',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Cash Revolution | Advanced Trading Signals',
    description: 'Professional AI-powered trading platform with Matrix-inspired design',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`dark matrix-theme ${inter.variable} ${sourceCodePro.variable} ${jetBrainsMono.variable}`}
    >
      <head>
        <meta name="theme-color" content="#00ff88" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.className} bg-black text-green-400 min-h-screen antialiased selection:bg-green-400 selection:text-black`}>
        <div className="min-h-screen relative overflow-x-hidden">
          {/* Matrix Rain Background - Hidden on mobile for performance */}
          <div className="matrix-rain hidden lg:block" id="matrix-bg" />

          {/* Enhanced Effects */}
          <div className="glitch-overlay" />
          <div className="signal-interference" />

          {/* Sound Manager */}
          <MatrixSoundManager />

          {/* Main Content */}
          <div className="relative z-10">
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}