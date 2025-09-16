'use client'

import React, { useState, useEffect } from 'react'
import MatrixButton from '@/components/ui/MatrixButton'
import VirtualList from '@/app/components/ui/virtual-list'

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
  riskReward: number
}

interface SignalsListProps {
  filters?: {
    symbols: string[]
    types: ('BUY' | 'SELL')[]
    status: ('active' | 'executed' | 'completed' | 'cancelled')[]
    strength: { min: number; max: number }
    timeframe: string
  }
  className?: string
}

const SignalsList: React.FC<SignalsListProps> = ({ filters, className = '' }) => {
  const [signals, setSignals] = useState<Signal[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedSignal, setSelectedSignal] = useState<string | null>(null)

  useEffect(() => {
    loadSignals()
  }, [filters])

  const loadSignals = async () => {
    setLoading(true)
    try {
      // Mock signals data
      const mockSignals: Signal[] = [
        {
          id: '1',
          symbol: 'EURUSD',
          type: 'BUY',
          strength: 85,
          entry: 1.0840,
          stopLoss: 1.0800,
          takeProfit: 1.0900,
          status: 'active',
          timestamp: new Date().toISOString(),
          confidence: 87,
          aiAnalysis: 'Strong bullish momentum detected. EUR strengthening against USD due to positive economic indicators.',
          riskReward: 1.5
        },
        {
          id: '2',
          symbol: 'XAUUSD',
          type: 'BUY',
          strength: 92,
          entry: 2045.00,
          stopLoss: 2025.00,
          takeProfit: 2080.00,
          status: 'executed',
          timestamp: new Date(Date.now() - 900000).toISOString(),
          pnl: 128.50,
          confidence: 92,
          aiAnalysis: 'Gold showing strong support levels. Risk-off sentiment and inflation concerns driving demand.',
          riskReward: 1.75
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
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          pnl: 210.50,
          confidence: 78,
          aiAnalysis: 'GBP weakness confirmed by economic indicators. Brexit concerns and BoE policy uncertainty.',
          riskReward: 1.75
        },
        {
          id: '4',
          symbol: 'USDJPY',
          type: 'BUY',
          strength: 88,
          entry: 149.50,
          stopLoss: 149.00,
          takeProfit: 150.50,
          status: 'active',
          timestamp: new Date(Date.now() - 1800000).toISOString(),
          confidence: 88,
          aiAnalysis: 'USD strength continues against JPY. BoJ intervention concerns at these levels but uptrend intact.',
          riskReward: 2.0
        },
        {
          id: '5',
          symbol: 'BTCUSD',
          type: 'BUY',
          strength: 73,
          entry: 43250.00,
          stopLoss: 42500.00,
          takeProfit: 45000.00,
          status: 'cancelled',
          timestamp: new Date(Date.now() - 7200000).toISOString(),
          confidence: 73,
          aiAnalysis: 'Signal cancelled due to unexpected regulatory news. Market volatility exceeded parameters.',
          riskReward: 2.33
        },
        // Add more mock signals for demonstration
        ...Array.from({ length: 15 }, (_, i) => ({
          id: `mock-${i + 6}`,
          symbol: ['AUDUSD', 'USDCAD', 'NZDUSD', 'USDCHF', 'XAGUSD'][i % 5],
          type: (i % 2 === 0 ? 'BUY' : 'SELL') as 'BUY' | 'SELL',
          strength: Math.floor(Math.random() * 40) + 60,
          entry: 1.2500 + (Math.random() * 0.1),
          stopLoss: 1.2450 + (Math.random() * 0.1),
          takeProfit: 1.2600 + (Math.random() * 0.1),
          status: ['active', 'executed', 'completed'][i % 3] as 'active' | 'executed' | 'completed',
          timestamp: new Date(Date.now() - (i * 600000)).toISOString(),
          confidence: Math.floor(Math.random() * 30) + 70,
          aiAnalysis: `AI analysis for ${['AUDUSD', 'USDCAD', 'NZDUSD', 'USDCHF', 'XAGUSD'][i % 5]} based on neural network models.`,
          riskReward: Number((Math.random() * 2 + 1).toFixed(2)),
          ...(Math.random() > 0.5 && { pnl: Number(((Math.random() - 0.5) * 200).toFixed(2)) })
        }))
      ]

      // Apply filters
      let filteredSignals = mockSignals
      if (filters) {
        if (filters.symbols.length > 0) {
          filteredSignals = filteredSignals.filter(s => filters.symbols.includes(s.symbol))
        }
        if (filters.types.length > 0) {
          filteredSignals = filteredSignals.filter(s => filters.types.includes(s.type))
        }
        if (filters.status.length > 0) {
          filteredSignals = filteredSignals.filter(s => filters.status.includes(s.status))
        }
        if (filters.strength.min > 0 || filters.strength.max < 100) {
          filteredSignals = filteredSignals.filter(s =>
            s.strength >= filters.strength.min && s.strength <= filters.strength.max
          )
        }
      }

      setSignals(filteredSignals)
    } catch (error) {
      console.error('Failed to load signals:', error)
    } finally {
      setLoading(false)
    }
  }

  const executeSignal = async (signalId: string) => {
    try {
      // Mock execution
      setSignals(prev => prev.map(signal =>
        signal.id === signalId
          ? { ...signal, status: 'executed' as const }
          : signal
      ))
    } catch (error) {
      console.error('Failed to execute signal:', error)
    }
  }

  const getStatusColor = (status: Signal['status']) => {
    switch (status) {
      case 'active':
        return 'text-blue-400 border-blue-400/30 bg-blue-400/5'
      case 'executed':
        return 'text-matrix-green border-matrix-green/30 bg-matrix-green/5'
      case 'completed':
        return 'text-matrix-bright border-matrix-bright/30 bg-matrix-bright/5'
      case 'cancelled':
        return 'text-red-400 border-red-400/30 bg-red-400/5'
      default:
        return 'text-matrix-dim border-matrix-green/20'
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

  const renderSignalCard = (signal: Signal, index: number) => (
    <div
      key={signal.id}
      className={`border rounded p-4 mb-4 transition-all cursor-pointer ${
        selectedSignal === signal.id
          ? 'border-matrix-green bg-matrix-green/10'
          : 'border-matrix-green/20 hover:border-matrix-green/40'
      }`}
      onClick={() => setSelectedSignal(selectedSignal === signal.id ? null : signal.id)}
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
            <span className={`font-mono text-xs px-2 py-1 rounded uppercase border ${getStatusColor(signal.status)}`}>
              {signal.status}
            </span>
          </div>
          <div className="font-mono text-xs text-matrix-dim">
            Strength: {signal.strength}% | Confidence: {signal.confidence}% | R:R {signal.riskReward}:1
          </div>
        </div>

        <div className="text-right space-y-1">
          <div className="font-mono text-sm text-matrix-dim">
            {formatTimeAgo(signal.timestamp)}
          </div>
          {signal.pnl !== undefined && (
            <div className={`font-mono text-sm font-bold ${
              signal.pnl >= 0 ? 'text-matrix-green glow-matrix' : 'text-red-400'
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
          <span className="text-matrix-bright">{signal.entry.toFixed(signal.symbol.includes('JPY') ? 2 : 4)}</span>
        </div>
        <div>
          <span className="text-matrix-dim">SL: </span>
          <span className="text-red-400">{signal.stopLoss.toFixed(signal.symbol.includes('JPY') ? 2 : 4)}</span>
        </div>
        <div>
          <span className="text-matrix-dim">TP: </span>
          <span className="text-matrix-green">{signal.takeProfit.toFixed(signal.symbol.includes('JPY') ? 2 : 4)}</span>
        </div>
      </div>

      {/* Expanded Details */}
      {selectedSignal === signal.id && (
        <div className="border-t border-matrix-green/20 pt-3 space-y-3">
          <div className="text-xs font-mono text-matrix-dim">
            <span className="text-matrix-bright">AI Analysis: </span>
            {signal.aiAnalysis}
          </div>

          {signal.status === 'active' && (
            <div className="flex justify-end space-x-2">
              <MatrixButton
                onClick={(e) => {
                  e.stopPropagation()
                  executeSignal(signal.id)
                }}
                size="sm"
                variant="secondary"
              >
                EXECUTE
              </MatrixButton>
              <MatrixButton
                onClick={(e) => {
                  e.stopPropagation()
                  // Handle copy signal logic
                }}
                size="sm"
                variant="outline"
              >
                COPY
              </MatrixButton>
            </div>
          )}
        </div>
      )}
    </div>
  )

  if (loading) {
    return (
      <div className={`matrix-terminal p-6 ${className}`}>
        <div className="animate-pulse-matrix font-mono text-matrix-green mb-4">
          > NEURAL_SCAN_IN_PROGRESS...
        </div>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="border border-matrix-green/10 p-4 rounded animate-pulse-matrix">
              <div className="flex justify-between items-start mb-3">
                <div className="space-y-2">
                  <div className="h-6 bg-matrix-green/10 rounded w-20" />
                  <div className="h-3 bg-matrix-green/10 rounded w-32" />
                </div>
                <div className="h-4 bg-matrix-green/10 rounded w-16" />
              </div>
              <div className="grid md:grid-cols-3 gap-4 mb-3">
                <div className="h-4 bg-matrix-green/10 rounded w-16" />
                <div className="h-4 bg-matrix-green/10 rounded w-16" />
                <div className="h-4 bg-matrix-green/10 rounded w-16" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={`matrix-terminal p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-mono text-lg text-matrix-bright glow-matrix">
            > NEURAL_SIGNALS_DETECTED
          </h3>
          <div className="font-mono text-sm text-matrix-dim mt-1">
            {signals.length} signal{signals.length !== 1 ? 's' : ''} found
          </div>
        </div>
        <div className="flex space-x-2">
          <MatrixButton
            onClick={loadSignals}
            variant="outline"
            size="sm"
          >
            REFRESH
          </MatrixButton>
          <MatrixButton
            onClick={() => window.location.href = '/trading'}
            size="sm"
          >
            NEW_SIGNAL
          </MatrixButton>
        </div>
      </div>

      {/* Signals List */}
      {signals.length === 0 ? (
        <div className="text-center py-12">
          <div className="font-mono text-matrix-dim text-lg mb-2">
            > NO SIGNALS MATCH CURRENT FILTERS
          </div>
          <div className="font-mono text-sm text-matrix-dim mb-6">
            Neural networks are scanning for new opportunities...
          </div>
          <MatrixButton
            onClick={() => window.location.reload()}
            variant="outline"
          >
            RESET_FILTERS
          </MatrixButton>
        </div>
      ) : (
        <VirtualList
          items={signals}
          itemHeight={120}
          renderItem={(signal, index) => renderSignalCard(signal, index)}
          className="h-96"
        />
      )}
    </div>
  )
}

export default SignalsList