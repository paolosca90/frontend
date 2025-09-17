'use client'

import React, { useState } from 'react'
import MatrixRain from '../components/matrix/MatrixRain'
import MatrixButton from '../components/ui/MatrixButton'

export default function DashboardPage() {
  const [selectedInstrument, setSelectedInstrument] = useState('EURUSD')
  const [selectedTimeframe, setSelectedTimeframe] = useState('1h')
  const [isGeneratingSignal, setIsGeneratingSignal] = useState(false)

  const handleGenerateSignal = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsGeneratingSignal(true)

    // Simulate signal generation
    setTimeout(() => {
      setIsGeneratingSignal(false)
      console.log('Generated signal for:', { selectedInstrument, selectedTimeframe })
    }, 3000)
  }

  const stats = [
    { title: 'TOTAL_SIGNALS', value: '1,247', icon: '📊', status: 'online' },
    { title: 'WIN_RATE', value: '87.3%', icon: '🎯', status: 'online' },
    { title: 'PROFIT_USD', value: '+$12,847', icon: '💰', status: 'online' },
    { title: 'ACTIVE_TRADES', value: '5', icon: '⚡', status: 'warning' }
  ]

  const recentSignals = [
    { pair: 'EUR/USD', action: 'BUY', profit: '+$247', status: 'CLOSED', time: '2 min ago' },
    { pair: 'GBP/USD', action: 'SELL', profit: '+$183', status: 'CLOSED', time: '5 min ago' },
    { pair: 'USD/JPY', action: 'BUY', profit: '+$156', status: 'ACTIVE', time: '8 min ago' },
    { pair: 'BTC/USD', action: 'BUY', profit: '+$425', status: 'ACTIVE', time: '12 min ago' },
    { pair: 'ETH/USD', action: 'SELL', profit: '+$312', status: 'PENDING', time: '15 min ago' }
  ]

  return (
    <div className="min-h-screen relative bg-black text-matrix-green">
      {/* Matrix Rain Background */}
      <MatrixRain className="absolute inset-0" density={0.1} speed={0.3} />

      {/* Header */}
      <header className="relative z-10 border-b border-matrix-green/20 bg-black/80 backdrop-blur-sm sticky top-0">
        <div className="spacing-responsive">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-responsive-2xl font-matrix font-bold text-matrix-green animate-matrix-glow">
                MATRIX_DASHBOARD
              </h1>
              <div className="w-2 h-2 bg-matrix-green rounded-full animate-pulse-matrix" />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-6">
              <MatrixButton variant="ghost" size="sm" onClick={() => window.location.href = '/'}>
                HOME
              </MatrixButton>
              <MatrixButton variant="ghost" size="sm" onClick={() => window.location.href = '/signals'}>
                SIGNALS
              </MatrixButton>
              <MatrixButton variant="danger" size="sm" onClick={() => window.location.href = '/auth/login'}>
                LOGOUT
              </MatrixButton>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 spacing-responsive">
        {/* Stats Grid */}
        <section className="mb-8">
          <div className="grid grid-responsive-4 gap-4 lg:gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="matrix-glass matrix-card p-4 lg:p-6 group hover:shadow-matrix-strong transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl group-hover:animate-matrix-float">{stat.icon}</span>
                  <div className={`w-2 h-2 rounded-full ${
                    stat.status === 'online' ? 'bg-matrix-green animate-pulse-matrix' :
                    stat.status === 'warning' ? 'bg-yellow-400 animate-pulse' :
                    'bg-red-400'
                  }`} />
                </div>
                <h3 className="text-responsive-sm font-matrix font-bold text-matrix-green/80 mb-1">
                  {stat.title}
                </h3>
                <p className="text-responsive-xl font-matrix font-bold text-matrix-green">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Main Dashboard Content */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Recent Signals - Takes 2 columns on large screens */}
          <section className="lg:col-span-2">
            <div className="matrix-glass matrix-border-animated p-6 lg:p-8">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
                <h2 className="text-responsive-xl font-matrix font-bold text-matrix-green mb-2 sm:mb-0">
                  RECENT_SIGNALS
                </h2>
                <MatrixButton variant="secondary" size="sm">
                  VIEW_ALL
                </MatrixButton>
              </div>

              <div className="space-y-3">
                {recentSignals.map((signal, index) => (
                  <div
                    key={index}
                    className="matrix-glass p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 hover:shadow-matrix transition-all duration-300"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="font-matrix font-bold text-matrix-green">
                        {signal.pair}
                      </span>
                      <span className={`px-2 py-1 text-xs font-matrix font-bold rounded ${
                        signal.action === 'BUY'
                          ? 'bg-matrix-green text-black'
                          : 'bg-red-500 text-white'
                      }`}>
                        {signal.action}
                      </span>
                      <span className={`px-2 py-1 text-xs font-matrix rounded border ${
                        signal.status === 'ACTIVE'
                          ? 'border-matrix-green text-matrix-green'
                          : signal.status === 'CLOSED'
                          ? 'border-gray-500 text-gray-400'
                          : 'border-yellow-500 text-yellow-400'
                      }`}>
                        {signal.status}
                      </span>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end space-x-4">
                      <div className="text-right">
                        <div className="font-matrix text-matrix-green font-bold">
                          {signal.profit}
                        </div>
                        <div className="text-xs font-matrix text-matrix-green/60">
                          {signal.time}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Signal Generator */}
          <section>
            <div className="matrix-glass matrix-border-animated p-6 lg:p-8">
              <h2 className="text-responsive-xl font-matrix font-bold text-matrix-green mb-6">
                GENERATE_SIGNAL
              </h2>

              <form onSubmit={handleGenerateSignal} className="space-y-6">
                <div className="matrix-form-group">
                  <label htmlFor="instrument" className="font-matrix">
                    INSTRUMENT
                  </label>
                  <select
                    id="instrument"
                    value={selectedInstrument}
                    onChange={(e) => setSelectedInstrument(e.target.value)}
                    className="matrix-select w-full px-4 py-3 text-responsive-base font-matrix"
                  >
                    <option value="EURUSD">EUR/USD</option>
                    <option value="GBPUSD">GBP/USD</option>
                    <option value="USDJPY">USD/JPY</option>
                    <option value="BTCUSD">BTC/USD</option>
                    <option value="ETHUSD">ETH/USD</option>
                    <option value="XAUUSD">XAU/USD</option>
                  </select>
                </div>

                <div className="matrix-form-group">
                  <label htmlFor="timeframe" className="font-matrix">
                    TIMEFRAME
                  </label>
                  <select
                    id="timeframe"
                    value={selectedTimeframe}
                    onChange={(e) => setSelectedTimeframe(e.target.value)}
                    className="matrix-select w-full px-4 py-3 text-responsive-base font-matrix"
                  >
                    <option value="5m">5 Minutes</option>
                    <option value="15m">15 Minutes</option>
                    <option value="1h">1 Hour</option>
                    <option value="4h">4 Hours</option>
                    <option value="1d">1 Day</option>
                  </select>
                </div>

                <MatrixButton
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  loading={isGeneratingSignal}
                  icon={<span>🎯</span>}
                  iconPosition="left"
                >
                  {isGeneratingSignal ? 'ANALYZING_MATRIX...' : 'GENERATE_AI_SIGNAL'}
                </MatrixButton>
              </form>

              {/* Quick Stats */}
              <div className="mt-8 pt-6 border-t border-matrix-green/30">
                <h3 className="text-sm font-matrix font-bold text-matrix-green/80 mb-4">
                  SYSTEM_STATUS
                </h3>
                <div className="space-y-2 text-xs font-matrix text-matrix-green/60">
                  <div className="flex justify-between">
                    <span>AI_ENGINE:</span>
                    <span className="text-matrix-green">ACTIVE</span>
                  </div>
                  <div className="flex justify-between">
                    <span>MARKET_DATA:</span>
                    <span className="text-matrix-green">LIVE</span>
                  </div>
                  <div className="flex justify-between">
                    <span>LATENCY:</span>
                    <span className="text-matrix-green">12ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ACCURACY:</span>
                    <span className="text-matrix-green">87.3%</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Mobile Navigation */}
      <div className="mobile-nav lg:hidden">
        <div className="grid grid-cols-3 gap-2 w-full px-4">
          <MatrixButton
            variant="ghost"
            size="sm"
            onClick={() => window.location.href = '/'}
          >
            HOME
          </MatrixButton>
          <MatrixButton
            variant="ghost"
            size="sm"
            onClick={() => window.location.href = '/signals'}
          >
            SIGNALS
          </MatrixButton>
          <MatrixButton
            variant="danger"
            size="sm"
            onClick={() => window.location.href = '/auth/login'}
          >
            LOGOUT
          </MatrixButton>
        </div>
      </div>
    </div>
  )
}