'use client'

import React, { useState, useEffect } from 'react'
import { useMatrix } from '@/contexts/MatrixContext'
import MatrixButton from '@/components/ui/MatrixButton'
import TypewriterText from '@/components/ui/TypewriterText'

interface PortfolioData {
  totalBalance: number
  availableMargin: number
  usedMargin: number
  equity: number
  totalPnL: number
  dailyPnL: number
  winRate: number
  totalTrades: number
  riskLevel: 'LOW' | 'MODERATE' | 'HIGH'
}

interface Trade {
  id: string
  symbol: string
  type: 'BUY' | 'SELL'
  size: number
  openPrice: number
  closePrice?: number
  openTime: Date
  closeTime?: Date
  pnl: number
  status: 'OPEN' | 'CLOSED'
  duration?: string
}

interface PerformanceMetric {
  label: string
  value: string
  change: number
  icon: string
}

const PortfolioMatrix: React.FC = () => {
  const { sound, addToHistory } = useMatrix()

  const [activeTab, setActiveTab] = useState<'overview' | 'positions' | 'history' | 'analytics'>('overview')
  const [isUpdating, setIsUpdating] = useState(false)

  // Mock portfolio data
  const [portfolioData] = useState<PortfolioData>({
    totalBalance: 25478.32,
    availableMargin: 18234.56,
    usedMargin: 7243.76,
    equity: 26934.78,
    totalPnL: 4934.78,
    dailyPnL: 234.56,
    winRate: 87.3,
    totalTrades: 147,
    riskLevel: 'MODERATE'
  })

  // Mock trades data
  const [trades] = useState<Trade[]>([
    {
      id: '1',
      symbol: 'EURUSD',
      type: 'BUY',
      size: 0.5,
      openPrice: 1.0823,
      closePrice: 1.0845,
      openTime: new Date(Date.now() - 3600000),
      closeTime: new Date(Date.now() - 1800000),
      pnl: 110.00,
      status: 'CLOSED',
      duration: '30m'
    },
    {
      id: '2',
      symbol: 'GBPUSD',
      type: 'SELL',
      size: 0.3,
      openPrice: 1.2478,
      closePrice: 1.2456,
      openTime: new Date(Date.now() - 7200000),
      closeTime: new Date(Date.now() - 3600000),
      pnl: 66.00,
      status: 'CLOSED',
      duration: '1h'
    },
    {
      id: '3',
      symbol: 'XAUUSD',
      type: 'BUY',
      size: 0.1,
      openPrice: 1976.23,
      openTime: new Date(Date.now() - 1800000),
      pnl: 80.90,
      status: 'OPEN'
    },
    {
      id: '4',
      symbol: 'USDJPY',
      type: 'SELL',
      size: 0.2,
      openPrice: 149.67,
      openTime: new Date(Date.now() - 900000),
      pnl: -45.30,
      status: 'OPEN'
    }
  ])

  const openTrades = trades.filter(trade => trade.status === 'OPEN')
  const closedTrades = trades.filter(trade => trade.status === 'CLOSED')

  const performanceMetrics: PerformanceMetric[] = [
    { label: 'TOTAL_EQUITY', value: `$${portfolioData.equity.toLocaleString()}`, change: 2.34, icon: '💰' },
    { label: 'DAILY_PNL', value: `$${portfolioData.dailyPnL.toFixed(2)}`, change: 1.85, icon: '📈' },
    { label: 'WIN_RATE', value: `${portfolioData.winRate}%`, change: 3.2, icon: '🎯' },
    { label: 'TOTAL_TRADES', value: `${portfolioData.totalTrades}`, change: 12, icon: '⚡' }
  ]

  const updatePortfolio = async () => {
    setIsUpdating(true)
    sound.play('beep')
    addToHistory('UPDATING PORTFOLIO DATA...')
    addToHistory('SYNCHRONIZING WITH NEURAL NETWORK...')

    await new Promise(resolve => setTimeout(resolve, 2000))

    sound.play('success')
    addToHistory('PORTFOLIO DATA SYNCHRONIZED')
    setIsUpdating(false)
  }

  // Real-time updates simulation
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate P&L updates for open positions
      openTrades.forEach(trade => {
        const randomChange = (Math.random() - 0.5) * 20
        trade.pnl += randomChange
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [openTrades])

  const TabButton: React.FC<{ tabKey: typeof activeTab; label: string }> = ({ tabKey, label }) => (
    <MatrixButton
      onClick={() => {
        setActiveTab(tabKey)
        sound.play('beep')
        addToHistory(`SWITCHING TO: ${label}`)
      }}
      variant={activeTab === tabKey ? 'primary' : 'secondary'}
      size="sm"
      className="flex-1"
    >
      {label}
    </MatrixButton>
  )

  return (
    <div className="min-h-[calc(100vh-120px)] bg-black text-matrix-green p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <TypewriterText
            text="PORTFOLIO MATRIX"
            speed={30}
            className="text-4xl font-mono font-bold glow-matrix mb-4"
          />
          <div className="flex items-center justify-center space-x-4">
            <TypewriterText
              text="Neural financial monitoring system"
              speed={20}
              delay={1500}
              className="text-lg text-matrix-dim"
            />
            <MatrixButton
              onClick={updatePortfolio}
              disabled={isUpdating}
              size="sm"
              variant="secondary"
            >
              {isUpdating ? 'SYNCING...' : 'REFRESH'}
            </MatrixButton>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {performanceMetrics.map((metric) => (
            <div key={metric.label} className="matrix-card p-4 hover:shadow-matrix transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl animate-pulse-matrix">{metric.icon}</span>
                <span className={`text-sm font-mono ${metric.change >= 0 ? 'text-matrix-bright' : 'text-red-400'}`}>
                  {metric.change >= 0 ? '+' : ''}{metric.change.toFixed(1)}%
                </span>
              </div>
              <div className="text-2xl font-mono font-bold text-matrix-bright mb-1 animate-pulse-matrix">
                {metric.value}
              </div>
              <div className="text-xs font-mono text-matrix-dim">
                {metric.label}
              </div>
            </div>
          ))}
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-2 mb-6 overflow-x-auto">
          <TabButton tabKey="overview" label="OVERVIEW" />
          <TabButton tabKey="positions" label="POSITIONS" />
          <TabButton tabKey="history" label="HISTORY" />
          <TabButton tabKey="analytics" label="ANALYTICS" />
        </div>

        {/* Tab Content */}
        <div className="matrix-card p-6 min-h-96">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Balance Overview */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-mono font-bold text-matrix-bright mb-4 flex items-center">
                    <span className="animate-pulse-matrix mr-2">💼</span>
                    ACCOUNT BALANCE
                  </h3>
                  <div className="matrix-terminal p-6">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-3xl font-mono font-bold text-matrix-bright animate-pulse-matrix">
                          ${portfolioData.totalBalance.toLocaleString()}
                        </div>
                        <div className="text-sm text-matrix-dim font-mono">TOTAL_BALANCE</div>
                      </div>
                      <div>
                        <div className="text-3xl font-mono font-bold text-matrix-bright">
                          ${portfolioData.equity.toLocaleString()}
                        </div>
                        <div className="text-sm text-matrix-dim font-mono">EQUITY</div>
                      </div>
                    </div>

                    <div className="mt-6 space-y-3">
                      <div className="flex justify-between font-mono text-sm">
                        <span>Available Margin:</span>
                        <span className="text-matrix-bright">${portfolioData.availableMargin.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between font-mono text-sm">
                        <span>Used Margin:</span>
                        <span className="text-red-400">${portfolioData.usedMargin.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between font-mono text-sm">
                        <span>Total P&L:</span>
                        <span className={portfolioData.totalPnL >= 0 ? 'text-matrix-bright' : 'text-red-400'}>
                          ${portfolioData.totalPnL.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-mono font-bold text-matrix-bright mb-4 flex items-center">
                    <span className="animate-pulse-matrix mr-2">📊</span>
                    RISK ANALYSIS
                  </h3>
                  <div className="matrix-terminal p-6">
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className={`
                          text-2xl font-mono font-bold px-4 py-2 border inline-block
                          ${portfolioData.riskLevel === 'LOW' && 'border-matrix-green text-matrix-green'}
                          ${portfolioData.riskLevel === 'MODERATE' && 'border-yellow-400 text-yellow-400'}
                          ${portfolioData.riskLevel === 'HIGH' && 'border-red-400 text-red-400'}
                        `}>
                          {portfolioData.riskLevel}
                        </div>
                        <div className="text-sm text-matrix-dim font-mono mt-2">RISK_LEVEL</div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between font-mono text-sm">
                          <span>Margin Usage:</span>
                          <span className="text-matrix-bright">
                            {((portfolioData.usedMargin / portfolioData.totalBalance) * 100).toFixed(1)}%
                          </span>
                        </div>
                        <div className="flex justify-between font-mono text-sm">
                          <span>Win Rate:</span>
                          <span className="text-matrix-bright">{portfolioData.winRate}%</span>
                        </div>
                        <div className="flex justify-between font-mono text-sm">
                          <span>Active Positions:</span>
                          <span className="text-matrix-bright">{openTrades.length}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div>
                <h3 className="text-xl font-mono font-bold text-matrix-bright mb-4 flex items-center">
                  <span className="animate-pulse-matrix mr-2">⚡</span>
                  RECENT ACTIVITY
                </h3>
                <div className="space-y-3">
                  {[...openTrades, ...closedTrades.slice(0, 3)].map((trade) => (
                    <div key={trade.id} className="matrix-terminal p-4 flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`
                          px-3 py-1 border text-sm font-mono
                          ${trade.type === 'BUY' ? 'border-matrix-green text-matrix-green' : 'border-red-400 text-red-400'}
                        `}>
                          {trade.type}
                        </div>
                        <span className="font-mono font-bold text-matrix-bright">{trade.symbol}</span>
                        <span className="font-mono text-sm text-matrix-dim">
                          Size: {trade.size}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className={`font-mono font-bold ${trade.pnl >= 0 ? 'text-matrix-bright' : 'text-red-400'}`}>
                          {trade.pnl >= 0 ? '+' : ''}${trade.pnl.toFixed(2)}
                        </div>
                        <div className="text-sm text-matrix-dim font-mono">
                          {trade.status === 'OPEN' ? 'OPEN' : trade.duration}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'positions' && (
            <div>
              <h3 className="text-xl font-mono font-bold text-matrix-bright mb-6 flex items-center">
                <span className="animate-pulse-matrix mr-2">🎯</span>
                ACTIVE POSITIONS ({openTrades.length})
              </h3>

              {openTrades.length === 0 ? (
                <div className="text-center py-12">
                  <TypewriterText
                    text="No active positions detected in the Matrix."
                    speed={30}
                    className="text-lg text-matrix-dim"
                  />
                </div>
              ) : (
                <div className="space-y-4">
                  {openTrades.map((trade) => (
                    <div key={trade.id} className="matrix-terminal p-6">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                        <div>
                          <div className="flex items-center space-x-3 mb-2">
                            <div className={`
                              px-3 py-1 border font-mono font-bold
                              ${trade.type === 'BUY' ? 'border-matrix-green text-matrix-green' : 'border-red-400 text-red-400'}
                            `}>
                              {trade.type}
                            </div>
                            <span className="font-mono font-bold text-matrix-bright text-xl">
                              {trade.symbol}
                            </span>
                          </div>
                          <div className="text-sm font-mono text-matrix-dim">
                            Size: {trade.size} | Opened: {trade.openTime.toLocaleTimeString()}
                          </div>
                        </div>

                        <div className="text-center">
                          <div className="text-sm text-matrix-dim font-mono mb-1">ENTRY_PRICE</div>
                          <div className="text-lg font-mono font-bold text-matrix-bright">
                            {trade.openPrice.toFixed(trade.symbol.includes('JPY') ? 2 : 4)}
                          </div>
                        </div>

                        <div className="text-center">
                          <div className="text-sm text-matrix-dim font-mono mb-1">CURRENT_PNL</div>
                          <div className={`text-2xl font-mono font-bold animate-pulse-matrix ${
                            trade.pnl >= 0 ? 'text-matrix-bright' : 'text-red-400'
                          }`}>
                            {trade.pnl >= 0 ? '+' : ''}${trade.pnl.toFixed(2)}
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          <MatrixButton
                            size="sm"
                            variant="danger"
                            className="flex-1"
                            onClick={() => {
                              sound.play('beep')
                              addToHistory(`CLOSING POSITION: ${trade.symbol}`)
                            }}
                          >
                            CLOSE
                          </MatrixButton>
                          <MatrixButton
                            size="sm"
                            variant="secondary"
                            className="flex-1"
                            onClick={() => {
                              sound.play('beep')
                              addToHistory(`MODIFYING: ${trade.symbol}`)
                            }}
                          >
                            MODIFY
                          </MatrixButton>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'history' && (
            <div>
              <h3 className="text-xl font-mono font-bold text-matrix-bright mb-6 flex items-center">
                <span className="animate-pulse-matrix mr-2">📜</span>
                TRADE HISTORY
              </h3>

              <div className="space-y-4">
                {closedTrades.map((trade) => (
                  <div key={trade.id} className="matrix-terminal p-4">
                    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center text-sm font-mono">
                      <div className="flex items-center space-x-2">
                        <div className={`
                          px-2 py-1 border text-xs
                          ${trade.type === 'BUY' ? 'border-matrix-green text-matrix-green' : 'border-red-400 text-red-400'}
                        `}>
                          {trade.type}
                        </div>
                        <span className="font-bold text-matrix-bright">{trade.symbol}</span>
                      </div>

                      <div>
                        <div className="text-matrix-dim">Entry:</div>
                        <div className="text-matrix-bright">{trade.openPrice?.toFixed(4)}</div>
                      </div>

                      <div>
                        <div className="text-matrix-dim">Exit:</div>
                        <div className="text-matrix-bright">{trade.closePrice?.toFixed(4)}</div>
                      </div>

                      <div>
                        <div className="text-matrix-dim">Duration:</div>
                        <div className="text-matrix-bright">{trade.duration}</div>
                      </div>

                      <div>
                        <div className="text-matrix-dim">P&L:</div>
                        <div className={`font-bold ${trade.pnl >= 0 ? 'text-matrix-bright' : 'text-red-400'}`}>
                          {trade.pnl >= 0 ? '+' : ''}${trade.pnl.toFixed(2)}
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-matrix-dim text-xs">
                          {trade.closeTime?.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div>
              <h3 className="text-xl font-mono font-bold text-matrix-bright mb-6 flex items-center">
                <span className="animate-pulse-matrix mr-2">📈</span>
                PERFORMANCE ANALYTICS
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="matrix-terminal p-6">
                  <h4 className="text-lg font-mono font-bold text-matrix-bright mb-4">TRADING STATISTICS</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="font-mono">Total Trades:</span>
                      <span className="text-matrix-bright font-mono">{portfolioData.totalTrades}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-mono">Win Rate:</span>
                      <span className="text-matrix-bright font-mono">{portfolioData.winRate}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-mono">Avg. Trade:</span>
                      <span className="text-matrix-bright font-mono">$33.56</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-mono">Best Trade:</span>
                      <span className="text-matrix-bright font-mono">+$234.78</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-mono">Worst Trade:</span>
                      <span className="text-red-400 font-mono">-$87.23</span>
                    </div>
                  </div>
                </div>

                <div className="matrix-terminal p-6">
                  <h4 className="text-lg font-mono font-bold text-matrix-bright mb-4">RISK METRICS</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="font-mono">Sharpe Ratio:</span>
                      <span className="text-matrix-bright font-mono">2.34</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-mono">Max Drawdown:</span>
                      <span className="text-red-400 font-mono">-8.7%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-mono">Profit Factor:</span>
                      <span className="text-matrix-bright font-mono">1.87</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-mono">Recovery Factor:</span>
                      <span className="text-matrix-bright font-mono">0.34</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-mono">Calmar Ratio:</span>
                      <span className="text-matrix-bright font-mono">0.89</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 matrix-terminal p-6">
                <h4 className="text-lg font-mono font-bold text-matrix-bright mb-4">NEURAL PERFORMANCE CHART</h4>
                <div className="h-48 bg-black border border-matrix-green/20 flex items-center justify-center">
                  <div className="text-center">
                    <TypewriterText
                      text="GENERATING NEURAL VISUALIZATION..."
                      speed={50}
                      className="text-matrix-dim mb-4"
                    />
                    <div className="matrix-loading w-8 h-8 mx-auto"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PortfolioMatrix