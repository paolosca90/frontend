'use client'

import React, { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import MatrixButton from '@/components/ui/MatrixButton'
import TypewriterText from '@/components/ui/TypewriterText'

interface TradingStats {
  todayPnL: number
  weekPnL: number
  monthPnL: number
  totalPnL: number
  winRate: number
  totalTrades: number
  activePositions: number
  accountBalance: number
}

interface MarketData {
  symbol: string
  price: number
  change: number
  changePercent: number
}

const TradingOverview: React.FC = () => {
  const { user } = useAuth()
  const [stats, setStats] = useState<TradingStats>({
    todayPnL: 0,
    weekPnL: 0,
    monthPnL: 0,
    totalPnL: 0,
    winRate: 0,
    totalTrades: 0,
    activePositions: 0,
    accountBalance: 10000
  })
  const [marketData, setMarketData] = useState<MarketData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading trading data
    const loadData = async () => {
      try {
        // Mock data - in real app would fetch from API
        setStats({
          todayPnL: 247.80,
          weekPnL: 1205.50,
          monthPnL: 3840.20,
          totalPnL: 15420.75,
          winRate: 73.5,
          totalTrades: 147,
          activePositions: 3,
          accountBalance: 25420.75
        })

        setMarketData([
          { symbol: 'EURUSD', price: 1.0842, change: 0.0023, changePercent: 0.21 },
          { symbol: 'GBPUSD', price: 1.2657, change: -0.0015, changePercent: -0.12 },
          { symbol: 'USDJPY', price: 149.85, change: 0.42, changePercent: 0.28 },
          { symbol: 'XAUUSD', price: 2045.30, change: 12.80, changePercent: 0.63 }
        ])
      } catch (error) {
        console.error('Failed to load trading data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  if (loading) {
    return (
      <div className="matrix-terminal p-6 space-y-4">
        <div className="animate-pulse-matrix font-mono text-matrix-green">
          > LOADING NEURAL_TRADING_DATA...
        </div>
        <div className="space-y-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-4 bg-matrix-green/10 rounded animate-pulse-matrix" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="matrix-terminal p-4">
        <TypewriterText
          text={`> NEURAL_TRADING_OVERVIEW - ${new Date().toLocaleDateString()}`}
          speed={30}
          className="text-xl font-mono text-matrix-bright glow-matrix"
        />
      </div>

      {/* Trading Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="matrix-terminal p-4 text-center">
          <div className="font-mono text-xs text-matrix-dim">TODAY P&L</div>
          <div className={`font-mono text-lg font-bold ${stats.todayPnL >= 0 ? 'text-matrix-green glow-matrix' : 'text-red-400'}`}>
            ${stats.todayPnL >= 0 ? '+' : ''}${stats.todayPnL.toFixed(2)}
          </div>
        </div>

        <div className="matrix-terminal p-4 text-center">
          <div className="font-mono text-xs text-matrix-dim">WEEK P&L</div>
          <div className={`font-mono text-lg font-bold ${stats.weekPnL >= 0 ? 'text-matrix-green glow-matrix' : 'text-red-400'}`}>
            ${stats.weekPnL >= 0 ? '+' : ''}${stats.weekPnL.toFixed(2)}
          </div>
        </div>

        <div className="matrix-terminal p-4 text-center">
          <div className="font-mono text-xs text-matrix-dim">WIN RATE</div>
          <div className="font-mono text-lg font-bold text-matrix-bright">
            {stats.winRate}%
          </div>
        </div>

        <div className="matrix-terminal p-4 text-center">
          <div className="font-mono text-xs text-matrix-dim">ACTIVE</div>
          <div className="font-mono text-lg font-bold text-matrix-bright">
            {stats.activePositions} POS
          </div>
        </div>
      </div>

      {/* Account Summary */}
      <div className="matrix-terminal p-6">
        <h3 className="font-mono text-lg text-matrix-bright glow-matrix mb-4">
          > ACCOUNT_STATUS
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-mono text-matrix-dim">Balance:</span>
              <span className="font-mono text-matrix-bright">${stats.accountBalance.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-mono text-matrix-dim">Total P&L:</span>
              <span className={`font-mono ${stats.totalPnL >= 0 ? 'text-matrix-green glow-matrix' : 'text-red-400'}`}>
                ${stats.totalPnL >= 0 ? '+' : ''}${stats.totalPnL.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-mono text-matrix-dim">Total Trades:</span>
              <span className="font-mono text-matrix-bright">{stats.totalTrades}</span>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <MatrixButton
              onClick={() => window.location.href = '/trading'}
              className="w-full"
            >
              ENTER TRADING_MODULE
            </MatrixButton>
          </div>
        </div>
      </div>

      {/* Quick Market Data */}
      <div className="matrix-terminal p-6">
        <h3 className="font-mono text-lg text-matrix-bright glow-matrix mb-4">
          > MARKET_PULSE
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {marketData.map((market) => (
            <div key={market.symbol} className="flex justify-between items-center p-3 border border-matrix-green/20 rounded">
              <div>
                <div className="font-mono text-matrix-bright">{market.symbol}</div>
                <div className="font-mono text-sm text-matrix-dim">{market.price}</div>
              </div>
              <div className="text-right">
                <div className={`font-mono text-sm ${market.change >= 0 ? 'text-matrix-green' : 'text-red-400'}`}>
                  {market.change >= 0 ? '+' : ''}{market.change}
                </div>
                <div className={`font-mono text-xs ${market.changePercent >= 0 ? 'text-matrix-green' : 'text-red-400'}`}>
                  {market.changePercent >= 0 ? '+' : ''}{market.changePercent}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TradingOverview