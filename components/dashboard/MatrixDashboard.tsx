'use client'

import React, { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useMatrix } from '@/contexts/MatrixContext'
import TypewriterText from '@/components/ui/TypewriterText'
import MatrixButton from '@/components/ui/MatrixButton'
import MatrixTerminal from './MatrixTerminal'
import TradingInterface from './TradingInterface'
import PortfolioMatrix from './PortfolioMatrix'
import SignalGenerator from './SignalGenerator'

const MatrixDashboard: React.FC = () => {
  const { user, logout } = useAuth()
  const { sound, addToHistory } = useMatrix()

  const [currentView, setCurrentView] = useState<'terminal' | 'trading' | 'portfolio' | 'signals'>('terminal')
  const [showGreeting, setShowGreeting] = useState(true)

  useEffect(() => {
    // Welcome message
    if (user) {
      addToHistory(`NEURAL LINK ESTABLISHED: ${user.email}`)
      addToHistory(`SUBSCRIPTION TIER: ${user.subscriptionTier}`)
      addToHistory('ALL SYSTEMS OPERATIONAL')

      // Auto hide greeting after 5 seconds
      const timer = setTimeout(() => setShowGreeting(false), 5000)
      return () => clearTimeout(timer)
    }
    return undefined
  }, [user, addToHistory])

  const handleViewChange = (view: typeof currentView) => {
    setCurrentView(view)
    sound.play('beep')
    addToHistory(`SWITCHING TO: ${view.toUpperCase()}_MODULE`)
  }

  const handleLogout = () => {
    sound.play('glitch')
    addToHistory('TERMINATING NEURAL LINK...')
    setTimeout(logout, 1000)
  }

  if (showGreeting) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-matrix-green px-4">
        <div className="matrix-terminal p-8 max-w-4xl w-full">
          <div className="space-y-6 font-mono">
            <TypewriterText
              text={`{'>'} WELCOME TO THE MATRIX, ${user?.firstName?.toUpperCase() || 'NEO'}`}
              speed={50}
              className="text-3xl text-center glow-matrix"
            />
            <TypewriterText
              text="{'>'} NEURAL INTERFACE SYNCHRONIZED"
              speed={40}
              delay={2000}
              className="text-xl text-center"
            />
            <TypewriterText
              text="{'>'} TRADING ALGORITHMS ONLINE"
              speed={40}
              delay={3000}
              className="text-xl text-center"
            />
            <TypewriterText
              text="{'>'} AI CASH REVOLUTION ACTIVATED"
              speed={40}
              delay={4000}
              className="text-2xl text-center text-matrix-bright glow-matrix"
            />

            <div className="text-center mt-8">
              <MatrixButton
                onClick={() => setShowGreeting(false)}
                size="lg"
                className="animate-pulse-matrix"
              >
                <TypewriterText
                  text="ENTER THE MATRIX"
                  speed={30}
                  delay={4500}
                  showCursor={false}
                />
              </MatrixButton>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-matrix-green">
      {/* Matrix Navigation Header */}
      <header className="border-b border-matrix-green/20 bg-black/90 backdrop-blur-sm sticky top-0 z-20">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-mono font-bold matrix-glitch glow-matrix" data-text="AI CASH">
                AI CASH
              </h1>
              <div className="text-sm font-mono text-matrix-dim">
                / REVOLUTION_v1.0
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              {[
                { key: 'terminal', label: 'TERMINAL' },
                { key: 'trading', label: 'TRADING' },
                { key: 'signals', label: 'SIGNALS' },
                { key: 'portfolio', label: 'PORTFOLIO' }
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => handleViewChange(key as typeof currentView)}
                  className={`
                    font-mono text-sm px-3 py-2 border transition-all
                    ${currentView === key
                      ? 'border-matrix-green text-matrix-bright glow-matrix bg-matrix-green/10'
                      : 'border-matrix-green/30 text-matrix-green hover:border-matrix-green hover:text-matrix-bright'
                    }
                  `}
                >
                  {label}
                </button>
              ))}
            </nav>

            {/* User Info & Logout */}
            <div className="flex items-center space-x-4">
              <div className="text-sm font-mono text-right">
                <div className="text-matrix-bright">{user?.email}</div>
                <div className="text-matrix-dim text-xs">{user?.subscriptionTier}</div>
              </div>
              <MatrixButton
                onClick={handleLogout}
                variant="danger"
                size="sm"
              >
                JACK OUT
              </MatrixButton>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <div className="md:hidden border-b border-matrix-green/20 px-4 py-2">
        <div className="flex space-x-2 overflow-x-auto">
          {[
            { key: 'terminal', label: 'TERM' },
            { key: 'trading', label: 'TRADE' },
            { key: 'signals', label: 'SIGNALS' },
            { key: 'portfolio', label: 'PORTFOLIO' }
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => handleViewChange(key as typeof currentView)}
              className={`
                font-mono text-xs px-3 py-2 border whitespace-nowrap transition-all
                ${currentView === key
                  ? 'border-matrix-green text-matrix-bright bg-matrix-green/10'
                  : 'border-matrix-green/30 text-matrix-green'
                }
              `}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="relative z-10">
        {currentView === 'terminal' && <MatrixTerminal />}
        {currentView === 'trading' && <TradingInterface />}
        {currentView === 'signals' && <SignalGenerator />}
        {currentView === 'portfolio' && <PortfolioMatrix />}
      </main>

      {/* Status Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/90 border-t border-matrix-green/20 px-4 py-2 z-20">
        <div className="flex items-center justify-between text-xs font-mono">
          <div className="flex items-center space-x-4">
            <span className="text-matrix-bright">STATUS:</span>
            <span className="animate-pulse-matrix">ONLINE</span>
            <span className="text-matrix-dim">|</span>
            <span>NEURAL_LINK: ACTIVE</span>
          </div>
          <div className="flex items-center space-x-4">
            <span>MODULE: {currentView.toUpperCase()}</span>
            <span className="text-matrix-dim">|</span>
            <span className="animate-pulse-matrix">⚡ MATRIX_CONNECTED</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MatrixDashboard