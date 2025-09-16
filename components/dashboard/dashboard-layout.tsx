'use client'

import React from 'react'
import { useAuth } from '@/contexts/AuthContext'
import MatrixButton from '@/components/ui/MatrixButton'

interface DashboardLayoutProps {
  children: React.ReactNode
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
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
                / DASHBOARD_v1.0
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center space-x-6">
              <a
                href="/dashboard"
                className="font-mono text-sm px-3 py-2 border border-matrix-green text-matrix-bright glow-matrix bg-matrix-green/10 transition-all"
              >
                DASHBOARD
              </a>
              <a
                href="/signals"
                className="font-mono text-sm px-3 py-2 border border-matrix-green/30 text-matrix-green hover:border-matrix-green hover:text-matrix-bright transition-all"
              >
                SIGNALS
              </a>
              <a
                href="/trading"
                className="font-mono text-sm px-3 py-2 border border-matrix-green/30 text-matrix-green hover:border-matrix-green hover:text-matrix-bright transition-all"
              >
                TRADING
              </a>
              <a
                href="/portfolio"
                className="font-mono text-sm px-3 py-2 border border-matrix-green/30 text-matrix-green hover:border-matrix-green hover:text-matrix-bright transition-all"
              >
                PORTFOLIO
              </a>
            </nav>

            {/* User Info & Logout */}
            <div className="flex items-center space-x-4">
              <div className="text-sm font-mono text-right">
                <div className="text-matrix-bright">{user?.email}</div>
                <div className="text-matrix-dim text-xs">{user?.subscriptionTier || 'FREE'}</div>
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
          <a href="/dashboard" className="font-mono text-xs px-3 py-2 border border-matrix-green text-matrix-bright bg-matrix-green/10 whitespace-nowrap">
            DASH
          </a>
          <a href="/signals" className="font-mono text-xs px-3 py-2 border border-matrix-green/30 text-matrix-green whitespace-nowrap">
            SIGNALS
          </a>
          <a href="/trading" className="font-mono text-xs px-3 py-2 border border-matrix-green/30 text-matrix-green whitespace-nowrap">
            TRADE
          </a>
          <a href="/portfolio" className="font-mono text-xs px-3 py-2 border border-matrix-green/30 text-matrix-green whitespace-nowrap">
            PORTFOLIO
          </a>
        </div>
      </div>

      {/* Main Content */}
      <main className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
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
            <span>MODULE: DASHBOARD</span>
            <span className="text-matrix-dim">|</span>
            <span className="animate-pulse-matrix">⚡ MATRIX_CONNECTED</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout