'use client'

import React, { useState, useEffect } from 'react'
import MatrixButton from '@/components/ui/MatrixButton'
import TypewriterText from '@/components/ui/TypewriterText'

interface Signal {
  id: string
  symbol: string
  type: 'BUY' | 'SELL'
  strength: number
  entry: number
  stopLoss: number
  takeProfit: number
  status: 'active' | 'executed' | 'cancelled' | 'completed'
  timestamp: string
  pnl?: number
  confidence: number
  aiAnalysis: string
}

interface RecentSignalsProps {
  className?: string
}

const RecentSignals: React.FC<RecentSignalsProps> = ({ className = '' }) => {
  const [signals, setSignals] = useState<Signal[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading recent signals
    const loadRecentSignals = async () => {
      try {
        const mockSignals: Signal[] = [
          {
            id: '1',
            symbol: 'EURUSD',
            type: 'BUY',
            strength: 85,
            entry: 1.0840,
            stopLoss: 1.0800,
            takeProfit: 1.0900,
            status: 'executed',
            timestamp: new Date(Date.now() - 300000).toISOString(), // 5 mins ago
            pnl: 45.20,
            confidence: 87,
            aiAnalysis: 'Strong bullish momentum detected. EUR strengthening against USD.'
          },
          {
            id: '2',
            symbol: 'XAUUSD',
            type: 'BUY',
            strength: 92,
            entry: 2045.00,
            stopLoss: 2025.00,
            takeProfit: 2080.00,
            status: 'active',
            timestamp: new Date(Date.now() - 900000).toISOString(), // 15 mins ago
            confidence: 92,
            aiAnalysis: 'Gold showing strong support levels. Risk-off sentiment increasing.'
          },
          {
            id: '3',
            symbol: 'GBPUSD',
            type: 'SELL',
            strength: 78,
            entry: 1.2670,
            stopLoss: 1.2710,
            takeProfit: 1.2600,
            status: 'completed',
            timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
            pnl: 210.50,
            confidence: 78,
            aiAnalysis: 'GBP weakness confirmed by economic indicators.'
          },
          {
            id: '4',
            symbol: 'USDJPY',
            type: 'SELL',
            strength: 65,
            entry: 149.90,
            stopLoss: 150.30,
            takeProfit: 149.20,
            status: 'cancelled',
            timestamp: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
            confidence: 65,
            aiAnalysis: 'Signal cancelled due to conflicting market conditions.'
          }
        ]

        setSignals(mockSignals)
      } catch (error) {
        console.error('Failed to load recent signals:', error)
      } finally {
        setLoading(false)
      }
    }

    loadRecentSignals()
  }, [])

  const getStatusColor = (status: Signal['status']) => {
    switch (status) {
      case 'active':
        return 'text-blue-400'
      case 'executed':
        return 'text-matrix-green'
      case 'completed':
        return 'text-matrix-bright'
      case 'cancelled':
        return 'text-red-400'
      default:
        return 'text-matrix-dim'
    }
  }

  const getStatusBorder = (status: Signal['status']) => {
    switch (status) {
      case 'active':
        return 'border-blue-400/30 bg-blue-400/5'
      case 'executed':
        return 'border-matrix-green/30 bg-matrix-green/5'
      case 'completed':
        return 'border-matrix-bright/30 bg-matrix-bright/5'
      case 'cancelled':
        return 'border-red-400/30 bg-red-400/5'
      default:
        return 'border-matrix-green/20'
    }
  }

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date()
    const signalTime = new Date(timestamp)
    const diffMinutes = Math.floor((now.getTime() - signalTime.getTime()) / 60000)

    if (diffMinutes < 1) return 'NOW'
    if (diffMinutes < 60) return `${diffMinutes}m ago`
    if (diffMinutes < 1440) return `${Math.floor(diffMinutes / 60)}h ago`
    return `${Math.floor(diffMinutes / 1440)}d ago`
  }

  if (loading) {
    return (
      <div className={`matrix-terminal p-6 ${className}`}>
        <div className="animate-pulse-matrix font-mono text-matrix-green mb-4">
          {'>'} SCANNING NEURAL_SIGNALS...
        </div>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="border border-matrix-green/10 p-4 rounded">
              <div className="flex justify-between items-start mb-2">
                <div className="space-y-1">
                  <div className="h-4 bg-matrix-green/10 rounded w-16 animate-pulse-matrix" />
                  <div className="h-3 bg-matrix-green/10 rounded w-12 animate-pulse-matrix" />
                </div>
                <div className="h-4 bg-matrix-green/10 rounded w-20 animate-pulse-matrix" />
              </div>
              <div className="h-3 bg-matrix-green/10 rounded w-3/4 animate-pulse-matrix" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="matrix-terminal p-4">
        <div className="flex items-center justify-between">
          <TypewriterText
            text="{'>'} RECENT_NEURAL_SIGNALS"
            speed={30}
            className="text-xl font-mono text-matrix-bright glow-matrix"
          />
          <div className="font-mono text-sm text-matrix-dim">
            {signals.length} signals
          </div>
        </div>
      </div>

      {/* Signals List */}
      <div className="matrix-terminal p-6">
        {signals.length === 0 ? (
          <div className="text-center py-8">
            <div className="font-mono text-matrix-dim">
              {'>'} NO RECENT SIGNALS
            </div>
            <div className="font-mono text-sm text-matrix-dim mt-2">
              Neural network scanning for opportunities...
            </div>
            <div className="mt-4">
              <MatrixButton
                onClick={() => window.location.href = '/signals'}
                size="sm"
              >
                GENERATE_SIGNAL
              </MatrixButton>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {signals.map((signal) => (
              <div
                key={signal.id}
                className={`border rounded p-4 ${getStatusBorder(signal.status)} hover:border-matrix-green/40 transition-colors`}
              >
                {/* Signal Header */}
                <div className="flex justify-between items-start mb-3">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-3">
                      <span className="font-mono text-lg font-bold text-matrix-bright">
                        {signal.symbol}
                      </span>
                      <span className={`font-mono text-sm px-2 py-1 rounded border ${
                        signal.type === 'BUY'
                          ? 'text-matrix-green border-matrix-green/30 bg-matrix-green/10'
                          : 'text-red-400 border-red-400/30 bg-red-400/10'
                      }`}>
                        {signal.type}
                      </span>
                      <span className={`font-mono text-xs px-2 py-1 rounded uppercase ${getStatusColor(signal.status)}`}>
                        {signal.status}
                      </span>
                    </div>
                    <div className="font-mono text-xs text-matrix-dim">
                      Strength: {signal.strength}% | Confidence: {signal.confidence}%
                    </div>
                  </div>

                  <div className="text-right space-y-1">
                    <div className="font-mono text-sm text-matrix-dim">
                      {formatTimeAgo(signal.timestamp)}
                    </div>
                    {signal.pnl !== undefined && (
                      <div className={`font-mono text-sm font-bold ${
                        signal.pnl >= 0 ? 'text-matrix-green' : 'text-red-400'
                      }`}>
                        {signal.pnl >= 0 ? '+' : ''}${signal.pnl.toFixed(2)}
                      </div>
                    )}
                  </div>
                </div>

                {/* Signal Details */}
                <div className="grid md:grid-cols-3 gap-4 text-sm font-mono mb-3">
                  <div>
                    <span className="text-matrix-dim">Entry: </span>
                    <span className="text-matrix-bright">{signal.entry}</span>
                  </div>
                  <div>
                    <span className="text-matrix-dim">SL: </span>
                    <span className="text-red-400">{signal.stopLoss}</span>
                  </div>
                  <div>
                    <span className="text-matrix-dim">TP: </span>
                    <span className="text-matrix-green">{signal.takeProfit}</span>
                  </div>
                </div>

                {/* AI Analysis */}
                <div className="text-xs font-mono text-matrix-dim border-t border-matrix-green/10 pt-3">
                  <span className="text-matrix-bright">AI: </span>
                  {signal.aiAnalysis}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View All Button */}
        {signals.length > 0 && (
          <div className="text-center mt-6 pt-6 border-t border-matrix-green/20">
            <MatrixButton
              onClick={() => window.location.href = '/signals'}
              variant="secondary"
            >
              VIEW_ALL_SIGNALS
            </MatrixButton>
          </div>
        )}
      </div>
    </div>
  )
}

export default RecentSignals