import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI Cash Revolution | Trading Platform',
  description: 'AI-powered trading platform for modern traders.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="theme-color" content="#000000" />
      </head>
      <body className={`${inter.className} bg-black text-green-400 min-h-screen`}>
        <div className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  )
}