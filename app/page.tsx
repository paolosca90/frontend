'use client'

import React, { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import MatrixLogin from '@/components/auth/MatrixLogin'
import MatrixDashboard from '@/components/dashboard/MatrixDashboard'
import TypewriterText from '@/components/ui/TypewriterText'

export default function HomePage() {
  const { isAuthenticated, isLoading } = useAuth()
  const [showWelcome, setShowWelcome] = useState(true)

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        setShowWelcome(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
    return undefined
  }, [isLoading])

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-matrix-green">
        <div className="matrix-terminal p-8 max-w-2xl w-full mx-4">
          <div className="space-y-4">
            <TypewriterText
              text="INITIALIZING NEURAL INTERFACE..."
              speed={50}
              className="text-xl font-mono"
            />
            <div className="matrix-loading h-8 w-full"></div>
            <TypewriterText
              text="ESTABLISHING SECURE CONNECTION..."
              speed={50}
              delay={1000}
              className="text-lg font-mono"
            />
            <TypewriterText
              text="LOADING MATRIX PROTOCOLS..."
              speed={50}
              delay={2000}
              className="text-lg font-mono"
            />
          </div>
        </div>
      </div>
    )
  }

  if (showWelcome && !isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-matrix-green px-4">
        <div className="text-center space-y-8 max-w-4xl">
          {/* Matrix Logo/Title */}
          <div className="space-y-4">
            <h1 className="text-6xl md:text-8xl font-mono font-bold matrix-glitch glow-matrix" data-text="AI CASH">
              AI CASH
            </h1>
            <h2 className="text-4xl md:text-6xl font-mono font-bold matrix-glitch glow-matrix" data-text="REVOLUTION">
              REVOLUTION
            </h2>
          </div>

          {/* Wake up Neo message */}
          <div className="space-y-6">
            <TypewriterText
              text="Wake up, Neo..."
              speed={100}
              delay={500}
              className="text-2xl md:text-3xl font-mono animate-pulse-matrix"
            />
            <TypewriterText
              text="The Matrix of trading has you."
              speed={75}
              delay={2000}
              className="text-xl md:text-2xl font-mono"
            />
            <TypewriterText
              text="But you can be free."
              speed={75}
              delay={4000}
              className="text-xl md:text-2xl font-mono"
            />
          </div>

          {/* Pills */}
          <div className="flex flex-col md:flex-row gap-8 items-center justify-center mt-12">
            <div className="text-center space-y-2">
              <div className="w-24 h-24 mx-auto rounded-full bg-red-600 shadow-[0_0_30px_rgba(255,0,0,0.7)] flex items-center justify-center text-white font-mono font-bold text-lg cursor-pointer hover:scale-110 transition-transform">
                RED
              </div>
              <TypewriterText
                text="Stay in wonderland"
                speed={50}
                delay={6000}
                className="text-sm font-mono text-red-400"
              />
            </div>

            <div className="text-4xl font-mono animate-pulse-matrix">VS</div>

            <div className="text-center space-y-2">
              <div
                className="w-24 h-24 mx-auto rounded-full bg-blue-600 shadow-[0_0_30px_rgba(0,100,255,0.7)] flex items-center justify-center text-white font-mono font-bold text-lg cursor-pointer hover:scale-110 transition-transform"
                onClick={() => setShowWelcome(false)}
              >
                BLUE
              </div>
              <TypewriterText
                text="See how deep the rabbit hole goes"
                speed={50}
                delay={6500}
                className="text-sm font-mono text-blue-400"
              />
            </div>
          </div>

          {/* Auto continue */}
          <TypewriterText
            text="Choose wisely... or continue automatically in 3 seconds"
            speed={50}
            delay={8000}
            className="text-sm font-mono text-matrix-dim"
          />
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <MatrixLogin />
  }

  return <MatrixDashboard />
}