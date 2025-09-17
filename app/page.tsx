'use client'

import React, { useState, useEffect } from 'react'
import MatrixRain from '../components/matrix/MatrixRain'
import MatrixButton from '../components/ui/MatrixButton'
import { useMatrixSound } from '../components/effects/MatrixSoundManager'

export default function HomePage() {
  const [isInitialized, setIsInitialized] = useState(false)
  const [showWelcome, setShowWelcome] = useState(false)
  const [glitchActive, setGlitchActive] = useState(false)
  const { playSound } = useMatrixSound()

  // Matrix initialization sequence
  useEffect(() => {
    const sequence = [
      () => setGlitchActive(true),
      () => setGlitchActive(false),
      () => setIsInitialized(true),
      () => setShowWelcome(true)
    ]

    sequence.forEach((action, index) => {
      setTimeout(action, index * 800)
    })

    // Play welcome sound when initialized
    setTimeout(() => {
      playSound('success')
    }, 2500)

    // Random glitch effects
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.95) {
        setGlitchActive(true)
        setTimeout(() => setGlitchActive(false), 200)
        playSound('glitch')
      }
    }, 5000)

    return () => clearInterval(glitchInterval)
  }, [playSound])

  const handleEnterMatrix = () => {
    playSound('terminal_open')
    setTimeout(() => {
      window.location.href = '/auth/login'
    }, 300)
  }

  const handleJoinRevolution = () => {
    playSound('notification')
    setTimeout(() => {
      window.location.href = '/auth/register'
    }, 300)
  }

  if (!isInitialized) {
    return (
      <div className="min-h-screen relative bg-black flex items-center justify-center">
        <MatrixRain className="absolute inset-0" intensity="extreme" speed={1.5} />

        <div className="relative z-10 text-center">
          <div className={`matrix-glitch text-6xl font-matrix font-bold text-matrix-green ${
            glitchActive ? 'random-glitch' : ''
          }`} data-text="INITIALIZING...">
            INITIALIZING...
          </div>

          <div className="mt-8 space-y-2">
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-matrix-green rounded-full animate-pulse" />
              <span className="text-sm font-matrix text-matrix-green/60">
                LOADING MATRIX PROTOCOLS...
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative bg-black text-matrix-green overflow-hidden">
      {/* Enhanced Matrix Rain */}
      <MatrixRain className="absolute inset-0" intensity="high" speed={1.2} />

      {/* Atmospheric Effects */}
      <div className={`glitch-overlay ${glitchActive ? 'opacity-100' : ''}`} />
      <div className="signal-interference" />

      {/* Floating Matrix Code */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute top-10 left-10 font-matrix text-xs animate-pulse">
          01001101 01100001 01110100 01110010 01101001 01111000
        </div>
        <div className="absolute top-20 right-20 font-matrix text-xs animate-pulse">
          01110100 01110010 01100001 01100100 01101001 01101110 01100111
        </div>
        <div className="absolute bottom-20 left-1/4 font-matrix text-xs animate-pulse">
          01010011 01111001 01110011 01110100 01100101 01101101 01110011
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Hero Section */}
        <main className="flex-1 flex items-center justify-center spacing-responsive">
          <div className="text-center max-w-6xl mx-auto">
            {/* Enhanced Title with Matrix Effects */}
            <div className={`space-y-4 mb-8 lg:mb-12 ${
              showWelcome ? 'animate-fade-in-up' : 'opacity-0'
            }`}>
              <div className="relative">
                <h1 className={`text-responsive-3xl font-matrix font-bold text-matrix-green animate-matrix-glow ${
                  glitchActive ? 'random-glitch' : ''
                }`} data-text="AI CASH REVOLUTION">
                  AI CASH REVOLUTION
                </h1>

                {/* Digital distortion effect */}
                <div className="digital-distortion absolute inset-0 -z-10" />
              </div>

              {/* Glitch subtitle */}
              <div className="space-y-2">
                <p className="text-responsive-lg font-matrix tracking-wide matrix-flicker">
                  WELCOME TO THE MATRIX OF TRADING
                </p>
                <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-matrix-green to-transparent mx-auto animate-pulse-matrix" />
              </div>

              {/* System status */}
              <div className="flex items-center justify-center gap-4 mt-4 text-xs font-matrix text-matrix-green/60">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span>NEURAL NETWORK: ONLINE</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span>TRADING ENGINE: ACTIVE</span>
                </div>
              </div>
            </div>

            {/* Enhanced Description */}
            <div className={`space-y-6 mb-12 lg:mb-16 ${
              showWelcome ? 'animate-fade-in-up delay-300' : 'opacity-0'
            }`}>
              <p className="text-responsive-xl font-matrix text-matrix-bright-green max-w-3xl mx-auto leading-relaxed">
                Enter the Matrix of Trading Intelligence
              </p>
              <p className="text-responsive-base font-matrix text-matrix-green/80 max-w-2xl mx-auto">
                Experience the future of trading with our advanced AI-powered system.
                Real-time signals, neural network analysis, and cyberpunk interface
                designed for the digital age trader.
              </p>
            </div>

            {/* Enhanced CTA Buttons */}
            <div className={`flex flex-col sm:flex-row gap-4 lg:gap-6 items-center justify-center mb-16 lg:mb-20 ${
              showWelcome ? 'animate-fade-in-up delay-500' : 'opacity-0'
            }`}>
              <MatrixButton
                variant="glow"
                size="lg"
                onClick={handleEnterMatrix}
                className="w-full sm:w-auto matrix-pulse hover:shadow-matrix-strong transform hover:scale-105 transition-all duration-300"
              >
                <span className="flex items-center gap-2">
                  🔓 ENTER THE MATRIX
                </span>
              </MatrixButton>
              <MatrixButton
                variant="secondary"
                size="lg"
                onClick={handleJoinRevolution}
                className="w-full sm:w-auto hover:shadow-matrix transform hover:scale-105 transition-all duration-300"
              >
                <span className="flex items-center gap-2">
                  ⚡ JOIN REVOLUTION
                </span>
              </MatrixButton>
            </div>

            {/* Enhanced Features Grid */}
            <div className={`grid grid-responsive-3 gap-6 lg:gap-8 ${
              showWelcome ? 'animate-fade-in-up delay-700' : 'opacity-0'
            }`}>
              {[
                {
                  title: "NEURAL AI",
                  description: "Quantum neural networks process market patterns in real-time",
                  icon: "🧠",
                  stats: "99.7% Accuracy",
                  color: "text-purple-400"
                },
                {
                  title: "LIGHTNING SPEED",
                  description: "Microsecond execution with zero latency trading",
                  icon: "⚡",
                  stats: "0.085ms Latency",
                  color: "text-yellow-400"
                },
                {
                  title: "MATRIX INTERFACE",
                  description: "Immersive cyberpunk terminal for professional trading",
                  icon: "💚",
                  stats: "Next-Gen UI",
                  color: "text-green-400"
                }
              ].map((feature, index) => (
                <div
                  key={index}
                  className="matrix-glass matrix-card p-6 lg:p-8 group hover:shadow-matrix-strong transition-all duration-300 transform hover:scale-105 digital-distortion"
                >
                  <div className={`text-4xl mb-4 group-hover:animate-matrix-float ${feature.color}`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-responsive-lg font-matrix font-bold mb-3 text-matrix-green group-hover:text-matrix-bright-green transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-responsive-sm font-matrix text-matrix-green/70 mb-4 leading-relaxed">
                    {feature.description}
                  </p>
                  <div className="text-xs font-matrix text-matrix-bright-green font-bold uppercase tracking-wider">
                    {feature.stats}
                  </div>
                </div>
              ))}
            </div>

            {/* System Requirements */}
            <div className={`mt-12 p-6 matrix-glass border border-matrix-green/30 ${
              showWelcome ? 'animate-fade-in-up delay-1000' : 'opacity-0'
            }`}>
              <h3 className="text-sm font-matrix text-matrix-green mb-3 tracking-wider">
                SYSTEM REQUIREMENTS
              </h3>
              <div className="grid grid-responsive-3 gap-4 text-xs font-matrix text-matrix-green/60">
                <div>• QUANTUM PROCESSOR</div>
                <div>• NEURAL INTERFACE</div>
                <div>• MATRIX COMPATIBLE</div>
              </div>
            </div>
          </div>
        </main>

        {/* Enhanced Mobile Navigation */}
        <div className="mobile-nav lg:hidden">
          <div className="flex items-center justify-around w-full">
            <MatrixButton
              variant="ghost"
              size="sm"
              onClick={handleEnterMatrix}
              className="flex-1 mx-2"
            >
              LOGIN
            </MatrixButton>
            <div className="w-px h-8 bg-matrix-green/30" />
            <MatrixButton
              variant="ghost"
              size="sm"
              onClick={handleJoinRevolution}
              className="flex-1 mx-2"
            >
              REGISTER
            </MatrixButton>
          </div>
        </div>

        {/* Enhanced Performance Indicators */}
        <div className="absolute top-4 right-4 text-xs font-matrix text-matrix-green/60 space-y-1 hidden lg:block">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-matrix-green rounded-full animate-pulse-matrix" />
            <span>SYSTEM ONLINE</span>
          </div>
          <div>SIGNALS: ACTIVE</div>
          <div>LATENCY: 0.085ms</div>
          <div>ENCRYPTION: QUANTUM</div>
        </div>

        {/* Hidden Terminal Access */}
        <div className="fixed bottom-4 right-4 lg:hidden">
          <MatrixButton
            variant="ghost"
            size="sm"
            icon={<span>💻</span>}
            onClick={() => window.location.href = '/dashboard'}
            className="opacity-50 hover:opacity-100"
          >
            TERMINAL
          </MatrixButton>
        </div>
      </div>

      {/* Enhanced Animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        .delay-300 { animation-delay: 0.3s; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-700 { animation-delay: 0.7s; }
        .delay-1000 { animation-delay: 1s; }
      `}</style>
    </div>
  )
}