'use client'

import React, { useState, useEffect, useCallback } from 'react'
import MatrixRain from '../matrix/MatrixRain'
import MatrixTerminal from '../terminal/MatrixTerminal'
import MatrixButton from '../ui/MatrixButton'

interface MatrixCommandCenterProps {
  className?: string
}

interface SystemMetric {
  name: string
  value: string
  change: string
  status: 'optimal' | 'warning' | 'critical'
}

interface TradingSignal {
  id: string
  pair: string
  direction: 'BUY' | 'SELL' | 'HOLD'
  confidence: number
  entry: number
  stopLoss: number
  takeProfit: number
  timestamp: Date
}

const MatrixCommandCenter: React.FC<MatrixCommandCenterProps> = ({ className = '' }) => {
  const [activeView, setActiveView] = useState<'overview' | 'terminal' | 'signals' | 'portfolio'>('overview')
  const [systemMetrics, setSystemMetrics] = useState<SystemMetric[]>([])
  const [activeSignals, setActiveSignals] = useState<TradingSignal[]>([])
  const [terminalCommands, setTerminalCommands] = useState<string[]>([])
  const [showTerminal, setShowTerminal] = useState(false)

  // Initialize system metrics
  useEffect(() => {
    const metrics: SystemMetric[] = [
      { name: 'NEURAL_NETWORK', value: '98.7%', change: '+0.3%', status: 'optimal' },
      { name: 'TRADING_ENGINE', value: 'ACTIVE', change: 'STABLE', status: 'optimal' },
      { name: 'LATENCY', value: '0.085ms', change: '-0.002ms', status: 'optimal' },
      { name: 'MEMORY_USAGE', value: '67.2%', change: '+2.1%', status: 'warning' },
      { name: 'SUCCESS_RATE', value: '94.7%', change: '+0.8%', status: 'optimal' },
      { name: 'UPTIME', value: '47:33:12', change: 'RUNNING', status: 'optimal' },
    ]
    setSystemMetrics(metrics)
  }, [])

  // Initialize trading signals
  useEffect(() => {
    const signals: TradingSignal[] = [
      {
        id: '1',
        pair: 'EUR/USD',
        direction: 'BUY',
        confidence: 87,
        entry: 1.0765,
        stopLoss: 1.0720,
        takeProfit: 1.0850,
        timestamp: new Date(Date.now() - 300000) // 5 minutes ago
      },
      {
        id: '2',
        pair: 'GBP/USD',
        direction: 'SELL',
        confidence: 92,
        entry: 1.2745,
        stopLoss: 1.2780,
        takeProfit: 1.2630,
        timestamp: new Date(Date.now() - 600000) // 10 minutes ago
      },
      {
        id: '3',
        pair: 'XAU/USD',
        direction: 'BUY',
        confidence: 78,
        entry: 2025.30,
        stopLoss: 2012.30,
        takeProfit: 2035.50,
        timestamp: new Date(Date.now() - 900000) // 15 minutes ago
      }
    ]
    setActiveSignals(signals)
  }, [])

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Update random metric
      setSystemMetrics(prev => prev.map(metric => {
        if (Math.random() > 0.8 && metric.name === 'LATENCY') {
          const newValue = (Math.random() * 0.2 + 0.05).toFixed(3)
          return { ...metric, value: `${newValue}ms` }
        }
        return metric
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const handleTerminalCommand = useCallback((command: string) => {
    setTerminalCommands(prev => [...prev, command])

    switch (command.toLowerCase()) {
      case 'clear':
        setTerminalCommands([])
        break
      case 'signals':
        setActiveView('signals')
        break
      case 'portfolio':
        setActiveView('portfolio')
        break
      case 'overview':
        setActiveView('overview')
        break
      case 'help':
        setTerminalCommands(prev => [...prev, 'Available: overview, signals, portfolio, clear, status'])
        break
      default:
        // Command will be handled by MatrixTerminal
        break
    }
  }, [])

  const getStatusColor = (status: 'optimal' | 'warning' | 'critical') => {
    switch (status) {
      case 'optimal': return 'text-green-400'
      case 'warning': return 'text-yellow-400'
      case 'critical': return 'text-red-400'
    }
  }

  const getStatusIndicator = (status: 'optimal' | 'warning' | 'critical') => {
    switch (status) {
      case 'optimal': return 'bg-green-400'
      case 'warning': return 'bg-yellow-400'
      case 'critical': return 'bg-red-400'
    }
  }

  const renderOverview = () => (
    <div className="space-y-6">
      {/* System Status Grid */}
      <div className="grid grid-responsive-2 lg:grid-responsive-3 gap-4">
        {systemMetrics.map((metric, index) => (
          <div key={index} className="matrix-glass p-4 border border-matrix-green/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-matrix text-matrix-green/60 tracking-wider">
                {metric.name.replace(/_/g, ' ')}
              </span>
              <div className={`w-2 h-2 rounded-full ${getStatusIndicator(metric.status)} animate-pulse`} />
            </div>
            <div className={`text-lg font-matrix ${getStatusColor(metric.status)} font-bold`}>
              {metric.value}
            </div>
            <div className="text-xs font-matrix text-matrix-green/50">
              {metric.change}
            </div>
          </div>
        ))}
      </div>

      {/* Active Signals */}
      <div className="matrix-glass p-6 border border-matrix-green/30">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-matrix text-matrix-green font-bold tracking-wider">
            ACTIVE SIGNALS
          </h3>
          <MatrixButton
            variant="ghost"
            size="sm"
            onClick={() => setActiveView('signals')}
            icon={<span>→</span>}
            iconPosition="right"
          >
            VIEW ALL
          </MatrixButton>
        </div>

        <div className="space-y-3">
          {activeSignals.slice(0, 3).map((signal) => (
            <div key={signal.id} className="flex items-center justify-between p-3 bg-black/40 border border-matrix-green/20">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${
                  signal.direction === 'BUY' ? 'bg-green-400' :
                  signal.direction === 'SELL' ? 'bg-red-400' : 'bg-yellow-400'
                }`} />
                <div>
                  <div className="font-matrix text-matrix-green font-bold">
                    {signal.pair}
                  </div>
                  <div className="text-xs font-matrix text-matrix-green/60">
                    {signal.direction} • {signal.confidence}% confidence
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-matrix text-matrix-green">
                  {signal.entry}
                </div>
                <div className="text-xs font-matrix text-matrix-green/60">
                  TP: {signal.takeProfit}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-responsive-2 gap-4">
        <MatrixButton
          variant="glow"
          size="lg"
          fullWidth
          icon={<span>📊</span>}
          iconPosition="left"
          onClick={() => setActiveView('signals')}
        >
          GENERATE SIGNALS
        </MatrixButton>
        <MatrixButton
          variant="secondary"
          size="lg"
          fullWidth
          icon={<span>🧠</span>}
          iconPosition="left"
          onClick={() => setShowTerminal(true)}
        >
          NEURAL COMMANDS
        </MatrixButton>
      </div>
    </div>
  )

  const renderSignals = () => (
    <div className="space-y-6">
      <div className="matrix-glass p-6 border border-matrix-green/30">
        <h3 className="text-lg font-matrix text-matrix-green font-bold tracking-wider mb-4">
          SIGNAL GENERATOR
        </h3>

        <div className="grid grid-responsive-1 lg:grid-responsive-2 gap-4 mb-6">
          <MatrixButton
            variant="primary"
            size="md"
            fullWidth
            icon={<span>⚡</span>}
            iconPosition="left"
          >
            QUICK SCAN
          </MatrixButton>
          <MatrixButton
            variant="secondary"
            size="md"
            fullWidth
            icon={<span>🔍</span>}
            iconPosition="left"
          >
            DEEP ANALYSIS
          </MatrixButton>
        </div>

        <div className="space-y-3">
          {activeSignals.map((signal) => (
            <div key={signal.id} className="matrix-glass p-4 border border-matrix-green/30">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`px-3 py-1 rounded text-xs font-matrix font-bold ${
                    signal.direction === 'BUY' ? 'bg-green-400/20 text-green-400' :
                    signal.direction === 'SELL' ? 'bg-red-400/20 text-red-400' :
                    'bg-yellow-400/20 text-yellow-400'
                  }`}>
                    {signal.direction}
                  </div>
                  <div className="font-matrix text-matrix-green text-lg font-bold">
                    {signal.pair}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-matrix text-matrix-bright-green font-bold">
                    {signal.confidence}%
                  </div>
                  <div className="text-xs font-matrix text-matrix-green/60">
                    confidence
                  </div>
                </div>
              </div>

              <div className="grid grid-responsive-3 gap-4 text-sm">
                <div>
                  <div className="text-xs font-matrix text-matrix-green/60">ENTRY</div>
                  <div className="font-matrix text-matrix-green">{signal.entry}</div>
                </div>
                <div>
                  <div className="text-xs font-matrix text-matrix-green/60">STOP LOSS</div>
                  <div className="font-matrix text-red-400">{signal.stopLoss}</div>
                </div>
                <div>
                  <div className="text-xs font-matrix text-matrix-green/60">TAKE PROFIT</div>
                  <div className="font-matrix text-green-400">{signal.takeProfit}</div>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="text-xs font-matrix text-matrix-green/60">
                  {signal.timestamp.toLocaleTimeString()}
                </div>
                <div className="flex gap-2">
                  <MatrixButton variant="ghost" size="sm">
                    EXECUTE
                  </MatrixButton>
                  <MatrixButton variant="ghost" size="sm">
                    ANALYZE
                  </MatrixButton>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderPortfolio = () => (
    <div className="space-y-6">
      <div className="matrix-glass p-6 border border-matrix-green/30">
        <h3 className="text-lg font-matrix text-matrix-green font-bold tracking-wider mb-6">
          PORTFOLIO OVERVIEW
        </h3>

        <div className="grid grid-responsive-2 gap-6 mb-6">
          <div className="matrix-glass p-4 border border-matrix-green/30">
            <div className="text-sm font-matrix text-matrix-green/60 mb-1">TOTAL BALANCE</div>
            <div className="text-2xl font-matrix text-matrix-green font-bold">$124,732.45</div>
            <div className="text-sm font-matrix text-green-400">+$2,847.33 (2.34%)</div>
          </div>

          <div className="matrix-glass p-4 border border-matrix-green/30">
            <div className="text-sm font-matrix text-matrix-green/60 mb-1">AVAILABLE MARGIN</div>
            <div className="text-2xl font-matrix text-matrix-green font-bold">$87,294.12</div>
            <div className="text-sm font-matrix text-matrix-green/60">70% utilization</div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-matrix text-matrix-green font-bold tracking-wider">OPEN POSITIONS</h4>

          {/* Mock positions */}
          {[
            { pair: 'EUR/USD', direction: 'BUY', size: '0.5', entry: '1.0750', current: '1.0765', pnl: '+$75.00' },
            { pair: 'GBP/USD', direction: 'SELL', size: '0.3', entry: '1.2760', current: '1.2745', pnl: '+$45.00' },
            { pair: 'XAU/USD', direction: 'BUY', size: '0.1', entry: '2020.50', current: '2025.30', pnl: '+$480.00' }
          ].map((position, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-black/40 border border-matrix-green/20">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${
                  position.direction === 'BUY' ? 'bg-green-400' : 'bg-red-400'
                }`} />
                <div>
                  <div className="font-matrix text-matrix-green font-bold">
                    {position.pair}
                  </div>
                  <div className="text-xs font-matrix text-matrix-green/60">
                    {position.direction} {position.size} lots
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-matrix text-matrix-green">
                  {position.current}
                </div>
                <div className="text-xs font-matrix text-green-400">
                  {position.pnl}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className={`min-h-screen relative bg-black ${className}`}>
      {/* Enhanced Matrix Rain */}
      <MatrixRain intensity="high" speed={1.0} />

      {/* Header */}
      <div className="relative z-10 border-b border-matrix-green/30 bg-black/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="matrix-glitch text-xl font-matrix font-bold text-matrix-green" data-text="AI CASH REVOLUTION">
                AI CASH REVOLUTION
              </div>
              <div className="hidden md:flex items-center gap-2 text-xs font-matrix text-matrix-green/60">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span>SYSTEM ONLINE</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <MatrixButton
                variant="ghost"
                size="sm"
                icon={<span>💻</span>}
                onClick={() => setShowTerminal(!showTerminal)}
              >
                TERMINAL
              </MatrixButton>
              <MatrixButton
                variant="ghost"
                size="sm"
                icon={<span>👤</span>}
              >
                ACCOUNT
              </MatrixButton>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="relative z-10 border-b border-matrix-green/20 bg-black/60">
        <div className="container mx-auto px-4">
          <nav className="flex gap-1">
            {[
              { id: 'overview', label: 'OVERVIEW', icon: '📊' },
              { id: 'signals', label: 'SIGNALS', icon: '📈' },
              { id: 'portfolio', label: 'PORTFOLIO', icon: '💰' }
            ].map((item) => (
              <MatrixButton
                key={item.id}
                variant={activeView === item.id ? 'primary' : 'ghost'}
                size="sm"
                icon={<span>{item.icon}</span>}
                iconPosition="left"
                onClick={() => setActiveView(item.id as any)}
                className={`rounded-none border-b-2 ${
                  activeView === item.id ? 'border-matrix-green' : 'border-transparent'
                }`}
              >
                {item.label}
              </MatrixButton>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-6">
          {activeView === 'overview' && renderOverview()}
          {activeView === 'signals' && renderSignals()}
          {activeView === 'portfolio' && renderPortfolio()}
        </div>
      </div>

      {/* Terminal Overlay */}
      {showTerminal && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm">
          <div className="h-full flex items-center justify-center p-4">
            <div className="w-full max-w-6xl">
              <div className="flex items-center justify-between mb-4">
                <div className="matrix-glitch text-lg font-matrix font-bold text-matrix-green" data-text="NEURAL COMMAND TERMINAL">
                  NEURAL COMMAND TERMINAL
                </div>
                <MatrixButton
                  variant="ghost"
                  size="sm"
                  icon={<span>✕</span>}
                  onClick={() => setShowTerminal(false)}
                >
                  CLOSE
                </MatrixButton>
              </div>

              <MatrixTerminal
                height="70vh"
                onCommand={handleTerminalCommand}
                welcomeMessage={`AI CASH REVOLUTION - NEURAL COMMAND TERMINAL v2.0.1
=======================================================
System Status: ONLINE • Neural Network: ACTIVE • Security: MAXIMUM
Available Commands: overview, signals, portfolio, status, clear, help
Type 'help' for more information or enter Matrix commands below.`}
                commands={['status', 'help', 'signals']}
                autoType={true}
              />
            </div>
          </div>
        </div>
      )}

      {/* Status Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-20 border-t border-matrix-green/30 bg-black/90 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between text-xs font-matrix text-matrix-green/60">
            <div className="flex items-center gap-6">
              <span>UPTIME: 47:33:12</span>
              <span>LATENCY: 0.085ms</span>
              <span>SIGNALS: {activeSignals.length} ACTIVE</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span>CONNECTED</span>
              </div>
              <span>ENCRYPTED</span>
              <span>v2.0.1</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MatrixCommandCenter