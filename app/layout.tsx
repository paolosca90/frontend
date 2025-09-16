import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { MatrixProvider } from '@/contexts/MatrixContext'
import { AuthProvider } from '@/contexts/AuthContext'
import { MatrixEffects } from '@/components/matrix/MatrixEffects'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI Cash Revolution | Jack Into The Matrix',
  description: 'Enter the Matrix of AI-powered trading. Take the red pill and revolutionize your trading experience.',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Courier+Prime:ital,wght@0,400;0,700;1,400;1,700&family=Source+Code+Pro:ital,wght@0,200..900;1,200..900&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className={`${inter.className} matrix-theme bg-black text-matrix-green overflow-x-hidden`}>
        <MatrixProvider>
          <AuthProvider>
            <MatrixEffects />
            <div className="relative z-10 min-h-screen">
              {children}
            </div>
            <Toaster />
          </AuthProvider>
        </MatrixProvider>
      </body>
    </html>
  )
}