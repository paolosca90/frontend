'use client'

import React, { useState, useEffect } from 'react'
import MatrixButton from '@/components/ui/MatrixButton'
import TypewriterText from '@/components/ui/TypewriterText'

interface Position {
  id: string
  symbol: string
  type: 'BUY' | 'SELL'
  size: number
  openPrice: number
  currentPrice: number
  pnl: number
  pnlPercent: number
  timestamp: string
}

interface PortfolioSummaryProps {
  className?: string
}

const PortfolioSummary: React.FC<PortfolioSummaryProps> = ({ className = '' }) => {
  const [positions, setPositions] = useState<Position[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading portfolio data
    const loadPortfolioData = async () => {
      try {
        // Mock positions data
        const mockPositions: Position[] = [
          {
            id: '1',
            symbol: 'EURUSD',
            type: 'BUY',
            size: 0.5,
            openPrice: 1.0820,
            currentPrice: 1.0842,
            pnl: 110.00,
            pnlPercent: 1.2,
            timestamp: new Date().toISOString()
          },
          {
            id: '2',
            symbol: 'XAUUSD',
            type: 'BUY',
            size: 0.1,
            openPrice: 2032.50,
            currentPrice: 2045.30,
            pnl: 128.00,
            pnlPercent: 0.63,
            timestamp: new Date(Date.now() - 3600000).toISOString()
          },
          {
            id: '3',
            symbol: 'GBPUSD',
            type: 'SELL',
            size: 0.3,
            openPrice: 1.2672,
            currentPrice: 1.2657,
            pnl: 45.00,
            pnlPercent: 0.12,
            timestamp: new Date(Date.now() - 7200000).toISOString()
          }
        ]

        setPositions(mockPositions)
      } catch (error) {
        console.error('Failed to load portfolio data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadPortfolioData()
  }, [])

  const totalPnL = positions.reduce((sum, pos) => sum + pos.pnl, 0)
  const totalValue = positions.reduce((sum, pos) => sum + (pos.openPrice * pos.size * 100000), 0)

  if (loading) {
    return (
      <div className={`matrix-terminal p-6 ${className}`}>
        <div className="animate-pulse-matrix font-mono text-matrix-green mb-4">
          > LOADING PORTFOLIO_DATA...
        </div>
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex justify-between items-center p-3 border border-matrix-green/10">
              <div className="space-y-1">
                <div className="h-4 bg-matrix-green/10 rounded w-16 animate-pulse-matrix" />
                <div className="h-3 bg-matrix-green/10 rounded w-12 animate-pulse-matrix" />
              </div>
              <div className="space-y-1 text-right">
                <div className="h-4 bg-matrix-green/10 rounded w-20 animate-pulse-matrix" />
                <div className="h-3 bg-matrix-green/10 rounded w-16 animate-pulse-matrix" />
              </div>
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
        <TypewriterText
          text="> PORTFOLIO_NEURAL_SCAN"
          speed={30}
          className="text-xl font-mono text-matrix-bright glow-matrix"
        />
      </div>

      {/* Portfolio Summary Stats */}
      <div className="matrix-terminal p-6">
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <div className="font-mono text-xs text-matrix-dim">TOTAL P&L</div>
            <div className={`font-mono text-xl font-bold ${totalPnL >= 0 ? 'text-matrix-green glow-matrix' : 'text-red-400'}`}>
              ${totalPnL >= 0 ? '+' : ''}${totalPnL.toFixed(2)}
            </div>
          </div>
          <div className="text-center">
            <div className="font-mono text-xs text-matrix-dim">POSITIONS</div>
            <div className="font-mono text-xl font-bold text-matrix-bright">
              {positions.length}
            </div>
          </div>
          <div className="text-center">
            <div className="font-mono text-xs text-matrix-dim">EXPOSURE</div>
            <div className="font-mono text-xl font-bold text-matrix-bright">
              ${(totalValue / 1000).toFixed(1)}K
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <MatrixButton
            onClick={() => window.location.href = '/portfolio'}
            variant="secondary"
          >
            FULL_PORTFOLIO_VIEW
          </MatrixButton>
        </div>
      </div>

      {/* Active Positions */}
      <div className="matrix-terminal p-6">
        <h3 className="font-mono text-lg text-matrix-bright glow-matrix mb-4">
          > ACTIVE_POSITIONS
        </h3>

        {positions.length === 0 ? (
          <div className="text-center py-8">
            <div className="font-mono text-matrix-dim">
              > NO ACTIVE POSITIONS
            </div>
            <div className="font-mono text-sm text-matrix-dim mt-2">
              Ready for neural trading signals...
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {positions.map((position) => (
              <div
                key={position.id}
                className="flex justify-between items-center p-4 border border-matrix-green/20 rounded hover:border-matrix-green/40 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-3">
                    <span className="font-mono text-matrix-bright font-bold">
                      {position.symbol}
                    </span>
                    <span className={`font-mono text-xs px-2 py-1 rounded border ${
                      position.type === 'BUY'
                        ? 'text-matrix-green border-matrix-green/30 bg-matrix-green/10'
                        : 'text-red-400 border-red-400/30 bg-red-400/10'
                    }`}>
                      {position.type}
                    </span>
                    <span className="font-mono text-xs text-matrix-dim">
                      {position.size} lots
                    </span>
                  </div>
                  <div className="font-mono text-xs text-matrix-dim">
                    Open: {position.openPrice} → Current: {position.currentPrice}
                  </div>
                </div>

                <div className="text-right space-y-1">
                  <div className={`font-mono text-lg font-bold ${
                    position.pnl >= 0 ? 'text-matrix-green glow-matrix' : 'text-red-400'
                  }`}>
                    {position.pnl >= 0 ? '+' : ''}${position.pnl.toFixed(2)}
                  </div>
                  <div className={`font-mono text-xs ${
                    position.pnlPercent >= 0 ? 'text-matrix-green' : 'text-red-400'
                  }`}>
                    {position.pnlPercent >= 0 ? '+' : ''}{position.pnlPercent.toFixed(2)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="matrix-terminal p-4">
        <div className="flex flex-wrap gap-3 justify-center">
          <MatrixButton
            onClick={() => window.location.href = '/signals'}
            size="sm"
            className="flex-1 md:flex-none"
          >
            NEW_SIGNAL
          </MatrixButton>
          <MatrixButton
            onClick={() => window.location.href = '/trading'}
            variant="secondary"
            size="sm"
            className="flex-1 md:flex-none"
          >
            MANUAL_TRADE
          </MatrixButton>
          <MatrixButton
            onClick={() => window.location.reload()}
            variant="outline"
            size="sm"
            className="flex-1 md:flex-none"
          >
            REFRESH
          </MatrixButton>
        </div>
      </div>
    </div>
  )
}

export default PortfolioSummary