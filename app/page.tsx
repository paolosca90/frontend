'use client'

import React from 'react'
import MatrixRain from '../components/matrix/MatrixRain'
import MatrixButton from '../components/ui/MatrixButton'

export default function HomePage() {
  return (
    <div className="min-h-screen relative bg-black text-matrix-green">
      {/* Matrix Rain Background */}
      <MatrixRain className="absolute inset-0" density={0.3} speed={0.8} />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Hero Section */}
        <main className="flex-1 flex items-center justify-center spacing-responsive">
          <div className="text-center max-w-6xl mx-auto">
            {/* Title with Enhanced Matrix Effects */}
            <div className="space-y-4 mb-8 lg:mb-12">
              <h1 className="text-responsive-3xl font-matrix font-bold text-matrix-green animate-matrix-glow">
                <span className="block">AI CASH</span>
                <span className="block text-matrix-bright-green">REVOLUTION</span>
              </h1>

              {/* Glitch subtitle */}
              <div className="space-y-2">
                <p className="text-responsive-lg font-matrix tracking-wide opacity-90">
                  WELCOME TO THE MATRIX OF TRADING
                </p>
                <div className="w-24 h-0.5 bg-matrix-green mx-auto animate-pulse-matrix" />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-6 mb-12 lg:mb-16">
              <p className="text-responsive-xl font-matrix text-matrix-bright-green max-w-3xl mx-auto leading-relaxed">
                AI-powered trading signals for the modern trader
              </p>
              <p className="text-responsive-base font-matrix text-matrix-green/80 max-w-2xl mx-auto">
                Advanced algorithms, real-time analysis, and professional-grade trading tools
                in a cyberpunk-inspired interface designed for the digital age.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 items-center justify-center mb-16 lg:mb-20">
              <MatrixButton
                variant="glow"
                size="lg"
                onClick={() => window.location.href = '/auth/login'}
                className="w-full sm:w-auto"
              >
                ENTER THE MATRIX
              </MatrixButton>
              <MatrixButton
                variant="secondary"
                size="lg"
                onClick={() => window.location.href = '/auth/register'}
                className="w-full sm:w-auto"
              >
                JOIN REVOLUTION
              </MatrixButton>
            </div>

            {/* Features Grid */}
            <div className="grid grid-responsive-3 gap-6 lg:gap-8">
              {[
                {
                  title: "AI SIGNALS",
                  description: "Advanced neural networks analyze market patterns in real-time",
                  icon: "🧠",
                  stats: "94.7% Accuracy"
                },
                {
                  title: "REAL-TIME",
                  description: "Lightning-fast signal delivery with microsecond precision",
                  icon: "⚡",
                  stats: "< 100ms Latency"
                },
                {
                  title: "MATRIX UI",
                  description: "Professional cyberpunk interface optimized for trading",
                  icon: "💚",
                  stats: "Mobile First"
                }
              ].map((feature, index) => (
                <div
                  key={index}
                  className="matrix-glass matrix-card p-6 lg:p-8 group hover:shadow-matrix-strong transition-all duration-300"
                >
                  <div className="text-4xl mb-4 group-hover:animate-matrix-float">
                    {feature.icon}
                  </div>
                  <h3 className="text-responsive-lg font-matrix font-bold mb-3 text-matrix-green">
                    {feature.title}
                  </h3>
                  <p className="text-responsive-sm font-matrix text-matrix-green/80 mb-4 leading-relaxed">
                    {feature.description}
                  </p>
                  <div className="text-xs font-matrix text-matrix-bright-green font-bold uppercase tracking-wider">
                    {feature.stats}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* Mobile Navigation Bar */}
        <div className="mobile-nav lg:hidden">
          <div className="flex items-center justify-around w-full">
            <MatrixButton
              variant="ghost"
              size="sm"
              onClick={() => window.location.href = '/auth/login'}
              className="flex-1 mx-2"
            >
              LOGIN
            </MatrixButton>
            <div className="w-px h-8 bg-matrix-green/30" />
            <MatrixButton
              variant="ghost"
              size="sm"
              onClick={() => window.location.href = '/auth/register'}
              className="flex-1 mx-2"
            >
              REGISTER
            </MatrixButton>
          </div>
        </div>

        {/* Performance Indicators */}
        <div className="absolute top-4 right-4 text-xs font-matrix text-matrix-green/60 space-y-1 hidden lg:block">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-matrix-green rounded-full animate-pulse-matrix" />
            <span>SYSTEM ONLINE</span>
          </div>
          <div>SIGNALS: ACTIVE</div>
          <div>LATENCY: 85ms</div>
        </div>
      </div>
    </div>
  )
}