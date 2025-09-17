'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import MatrixRain from '../matrix/MatrixRain'
import MatrixButton from '../ui/MatrixButton'
import MatrixTerminal from '../terminal/MatrixTerminal'

interface MatrixTradingTerminalProps {
  className?: string
}

interface PriceData {
  symbol: string
  bid: number
  ask: number
  spread: number
  change: number
  changePercent: number
  timestamp: Date
}

interface Order {
  id: string
  symbol: string
  type: 'BUY' | 'SELL'
  volume: number
  price: number
  status: 'PENDING' | 'EXECUTED' | 'CANCELLED'
  timestamp: Date
}

interface Position {
  id: string
  symbol: string
  type: 'BUY' | 'SELL'
  volume: number
  openPrice: number
  currentPrice: number
  pnl: number
  pnlPercent: number
  timestamp: Date
}

const MatrixTradingTerminal: React.FC<MatrixTradingTerminalProps> = ({ className = '' }) => {
  const [selectedSymbol, setSelectedSymbol] = useState('EUR/USD')
  const [orderType, setOrderType] = useState<'BUY' | 'SELL'>('BUY')
  const [volume, setVolume] = useState(0.1)
  const [priceData, setPriceData] = useState<PriceData[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [positions, setPositions] = useState<Position[]>([])
  const [showTerminal, setShowTerminal] = useState(false)
  const [isExecuting, setIsExecuting] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<'CONNECTING' | 'CONNECTED' | 'DISCONNECTED'>('CONNECTING')

  const wsRef = useRef<WebSocket>()

  // Available symbols
  const symbols = ['EUR/USD', 'GBP/USD', 'USD/JPY', 'USD/CHF', 'BTC/USD', 'ETH/USD', 'XAU/USD', 'XAG/USD']

  // Initialize price data
  useEffect(() => {
    const initialPriceData: PriceData[] = symbols.map(symbol => ({
      symbol,
      bid: Math.random() * 2 + 1,
      ask: Math.random() * 2 + 1.001,
      spread: Math.random() * 0.002 + 0.001,
      change: (Math.random() - 0.5) * 0.01,
      changePercent: (Math.random() - 0.5) * 0.5,
      timestamp: new Date()
    }))
    setPriceData(initialPriceData)

    // Simulate connection
    setTimeout(() => {
      setConnectionStatus('CONNECTED')
    }, 2000)
  }, [])

  // Simulate real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPriceData(prev => prev.map(data => {
        const change = (Math.random() - 0.5) * 0.002
        const newBid = Math.max(0.0001, data.bid + change)
        const newAsk = newBid + data.spread
        const priceChange = newBid - data.bid
        const changePercent = (priceChange / data.bid) * 100

        return {
          ...data,
          bid: newBid,
          ask: newAsk,
          change: priceChange,
          changePercent,
          timestamp: new Date()
        }
      }))

      // Update position prices
      setPositions(prev => prev.map(pos => {
        const currentData = priceData.find(d => d.symbol === pos.symbol)
        if (!currentData) return pos

        const currentPrice = pos.type === 'BUY' ? currentData.bid : currentData.ask
        const pnl = pos.type === 'BUY' ?
          (currentPrice - pos.openPrice) * pos.volume * 100000 :
          (pos.openPrice - currentPrice) * pos.volume * 100000
        const pnlPercent = (pnl / (pos.openPrice * pos.volume * 100000)) * 100

        return {
          ...pos,
          currentPrice,
          pnl,
          pnlPercent
        }
      }))
    }, 1000)

    return () => clearInterval(interval)
  }, [priceData])

  const handleExecuteOrder = useCallback(async () => {
    setIsExecuting(true)

    // Simulate order execution
    setTimeout(() => {
      const currentData = priceData.find(d => d.symbol === selectedSymbol)
      if (!currentData) return

      const price = orderType === 'BUY' ? currentData.ask : currentData.bid

      // Create order
      const newOrder: Order = {
        id: `ORD-${Date.now()}`,
        symbol: selectedSymbol,
        type: orderType,
        volume,
        price,
        status: 'EXECUTED',
        timestamp: new Date()
      }

      setOrders(prev => [newOrder, ...prev])

      // Create position
      const newPosition: Position = {
        id: `POS-${Date.now()}`,
        symbol: selectedSymbol,
        type: orderType,
        volume,
        openPrice: price,
        currentPrice: price,
        pnl: 0,
        pnlPercent: 0,
        timestamp: new Date()
      }

      setPositions(prev => [newPosition, ...prev])
      setIsExecuting(false)
    }, 1500)
  }, [selectedSymbol, orderType, volume, priceData])

  const handleClosePosition = useCallback((positionId: string) => {
    setPositions(prev => prev.filter(pos => pos.id !== positionId))
  }, [])

  const handleTerminalCommand = useCallback((command: string) => {
    const cmd = command.toLowerCase().trim()

    switch (cmd) {
      case 'positions':
        return `OPEN POSITIONS:
================
${positions.map(pos => `${pos.symbol} ${pos.type} ${pos.volume} @ ${pos.openPrice.toFixed(5)} | P&L: ${pos.pnl >= 0 ? '+' : ''}${pos.pnl.toFixed(2)}`).join('\n')}`
      case 'orders':
        return `RECENT ORDERS:
===============
${orders.slice(0, 5).map(order => `${order.symbol} ${order.type} ${order.volume} @ ${order.price.toFixed(5)} | ${order.status}`).join('\n')}`
      case 'prices':
        return `MARKET PRICES:
===============
${priceData.map(data => `${data.symbol} | BID: ${data.bid.toFixed(5)} | ASK: ${data.ask.toFixed(5)} | ${data.change >= 0 ? '+' : ''}${data.changePercent.toFixed(3)}%`).join('\n')}`
      case 'status':
        return `TRADING TERMINAL STATUS:
=======================
Connection: ${connectionStatus}
Positions: ${positions.length}
Orders: ${orders.length}
Selected: ${selectedSymbol}
Order Type: ${orderType}`
      case 'buy':
        setOrderType('BUY')
        return `Order type set to BUY`
      case 'sell':
        setOrderType('SELL')
        return `Order type set to SELL`
      case 'clear':
        // Handled by terminal
        break
      case 'help':
        return `TRADING TERMINAL COMMANDS:
=========================
positions      - View open positions
orders         - View recent orders
prices         - View market prices
status         - System status
buy / sell     - Set order type
clear          - Clear terminal
help           - This help menu`
      default:
        return `Unknown command: ${command}
Type 'help' for available commands.`
    }
  }, [positions, orders, priceData, connectionStatus, selectedSymbol, orderType])

  const selectedPriceData = priceData.find(d => d.symbol === selectedSymbol)

  return (
    <div className={`min-h-screen relative bg-black ${className}`}>
      {/* Enhanced Matrix Rain */}
      <MatrixRain intensity="high" speed={1.2} />

      {/* Glitch overlay */}
      <div className="glitch-overlay" />

      {/* Header */}
      <div className="relative z-10 border-b border-matrix-green/30 bg-black/90 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="matrix-glitch text-lg font-matrix font-bold text-matrix-green" data-text="MATRIX TRADING TERMINAL">
                MATRIX TRADING TERMINAL
              </div>
              <div className="flex items-center gap-2 text-xs font-matrix">
                <div className={`w-2 h-2 rounded-full ${
                  connectionStatus === 'CONNECTED' ? 'bg-green-400 animate-pulse' :
                  connectionStatus === 'CONNECTING' ? 'bg-yellow-400 animate-pulse' :
                  'bg-red-400'
                }`} />
                <span className={connectionStatus === 'CONNECTED' ? 'text-green-400' : 'text-yellow-400'}>
                  {connectionStatus}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-xs font-matrix text-matrix-green/60">
                POSITIONS: {positions.length} | ORDERS: {orders.length}
              </div>
              <MatrixButton
                variant="ghost"
                size="sm"
                icon={<span>💻</span>}
                onClick={() => setShowTerminal(true)}
              >
                TERMINAL
              </MatrixButton>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Left Panel - Market Watch */}
          <div className="lg:col-span-3">
            <div className="matrix-glass border border-matrix-green/30 p-4 h-full">
              <div className="matrix-glitch text-sm font-matrix text-matrix-green mb-4" data-text="MARKET WATCH">
                MARKET WATCH
              </div>

              <div className="space-y-2 max-h-96 overflow-y-auto">
                {priceData.map((data) => (
                  <div
                    key={data.symbol}
                    className={`p-2 cursor-pointer transition-all duration-200 ${
                      selectedSymbol === data.symbol
                        ? 'bg-matrix-green/20 border border-matrix-green'
                        : 'hover:bg-matrix-green/10 border border-transparent'
                    }`}
                    onClick={() => setSelectedSymbol(data.symbol)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-matrix text-sm font-bold">{data.symbol}</div>
                      <div className={`text-xs ${
                        data.changePercent >= 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {data.changePercent >= 0 ? '+' : ''}{data.changePercent.toFixed(3)}%
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs font-matrix text-matrix-green/60">
                      <span>{data.bid.toFixed(5)}</span>
                      <span>{data.ask.toFixed(5)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Center Panel - Trading Interface */}
          <div className="lg:col-span-6">
            <div className="matrix-glass border border-matrix-green/30 p-6">
              {/* Symbol Header */}
              <div className="mb-6">
                <div className="matrix-glitch text-2xl font-matrix font-bold text-matrix-green mb-2" data-text={selectedSymbol}>
                  {selectedSymbol}
                </div>
                {selectedPriceData && (
                  <div className="flex items-center gap-4">
                    <div className="text-3xl font-matrix text-matrix-green">
                      {selectedPriceData.bid.toFixed(5)}
                    </div>
                    <div className={`text-lg font-matrix ${
                      selectedPriceData.changePercent >= 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {selectedPriceData.changePercent >= 0 ? '+' : ''}{selectedPriceData.changePercent.toFixed(3)}%
                    </div>
                  </div>
                )}
              </div>

              {/* Order Panel */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <MatrixButton
                  variant={orderType === 'BUY' ? 'primary' : 'secondary'}
                  size="lg"
                  fullWidth
                  onClick={() => setOrderType('BUY')}
                  className={`border-2 ${
                    orderType === 'BUY' ? 'border-green-400 bg-green-400/10' : 'border-matrix-green/30'
                  }`}
                >
                  <span className="text-xl font-bold">BUY</span>
                </MatrixButton>
                <MatrixButton
                  variant={orderType === 'SELL' ? 'danger' : 'secondary'}
                  size="lg"
                  fullWidth
                  onClick={() => setOrderType('SELL')}
                  className={`border-2 ${
                    orderType === 'SELL' ? 'border-red-400 bg-red-400/10' : 'border-matrix-green/30'
                  }`}
                >
                  <span className="text-xl font-bold">SELL</span>
                </MatrixButton>
              </div>

              {/* Volume Input */}
              <div className="mb-6">
                <label className="block text-xs font-matrix text-matrix-green/60 mb-2">
                  VOLUME (LOTS)
                </label>
                <input
                  type="number"
                  value={volume}
                  onChange={(e) => setVolume(Math.max(0.01, parseFloat(e.target.value) || 0.01))}
                  className="matrix-input w-full px-4 py-3 text-lg font-matrix text-center bg-black/40 border-matrix-green/50"
                  step="0.01"
                  min="0.01"
                />
              </div>

              {/* Execute Button */}
              <MatrixButton
                variant="glow"
                size="lg"
                fullWidth
                loading={isExecuting}
                onClick={handleExecuteOrder}
                disabled={isExecuting || connectionStatus !== 'CONNECTED'}
                className="text-lg font-bold border-2"
              >
                {isExecuting ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    EXECUTING ORDER...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    {orderType === 'BUY' ? '🚀' : '⚡'} EXECUTE {orderType} ORDER
                  </span>
                )}
              </MatrixButton>

              {/* Quick Stats */}
              <div className="mt-6 pt-4 border-t border-matrix-green/30">
                <div className="grid grid-cols-2 gap-4 text-xs font-matrix text-matrix-green/60">
                  <div>
                    <div className="text-matrix-green">SPREAD</div>
                    <div>{selectedPriceData?.spread.toFixed(5) || '0.00000'}</div>
                  </div>
                  <div>
                    <div className="text-matrix-green">24H VOLUME</div>
                    <div>{(Math.random() * 1000 + 500).toFixed(0)}M</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Positions & Orders */}
          <div className="lg:col-span-3 space-y-4">
            {/* Positions */}
            <div className="matrix-glass border border-matrix-green/30 p-4">
              <div className="matrix-glitch text-sm font-matrix text-matrix-green mb-3" data-text="POSITIONS">
                POSITIONS
              </div>

              <div className="space-y-2 max-h-48 overflow-y-auto">
                {positions.length === 0 ? (
                  <div className="text-xs font-matrix text-matrix-green/60 text-center py-4">
                    NO OPEN POSITIONS
                  </div>
                ) : (
                  positions.map((position) => (
                    <div key={position.id} className="p-2 bg-black/40 border border-matrix-green/20">
                      <div className="flex items-center justify-between mb-1">
                        <div className="font-matrix text-xs font-bold">{position.symbol}</div>
                        <div className={`text-xs font-bold ${
                          position.type === 'BUY' ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {position.type}
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs font-matrix text-matrix-green/60">
                        <span>{position.volume} lots</span>
                        <span className={position.pnl >= 0 ? 'text-green-400' : 'text-red-400'}>
                          {position.pnl >= 0 ? '+' : ''}{position.pnl.toFixed(2)}
                        </span>
                      </div>
                      <MatrixButton
                        variant="ghost"
                        size="xs"
                        fullWidth
                        onClick={() => handleClosePosition(position.id)}
                        className="mt-2 text-xs"
                      >
                        CLOSE
                      </MatrixButton>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Recent Orders */}
            <div className="matrix-glass border border-matrix-green/30 p-4">
              <div className="matrix-glitch text-sm font-matrix text-matrix-green mb-3" data-text="RECENT ORDERS">
                RECENT ORDERS
              </div>

              <div className="space-y-2 max-h-48 overflow-y-auto">
                {orders.slice(0, 5).map((order) => (
                  <div key={order.id} className="p-2 bg-black/40 border border-matrix-green/20">
                    <div className="flex items-center justify-between mb-1">
                      <div className="font-matrix text-xs font-bold">{order.symbol}</div>
                      <div className={`text-xs font-bold ${
                        order.type === 'BUY' ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {order.type}
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs font-matrix text-matrix-green/60">
                      <span>{order.volume} lots @ {order.price.toFixed(5)}</span>
                      <span className={order.status === 'EXECUTED' ? 'text-green-400' : 'text-yellow-400'}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Terminal Overlay */}
      {showTerminal && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm">
          <div className="h-full flex items-center justify-center p-4">
            <div className="w-full max-w-6xl">
              <div className="flex items-center justify-between mb-4">
                <div className="matrix-glitch text-lg font-matrix font-bold text-matrix-green" data-text="TRADING COMMAND TERMINAL">
                  TRADING COMMAND TERMINAL
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
                welcomeMessage={`AI CASH REVOLUTION - TRADING TERMINAL v2.0.1
=================================================
Selected Instrument: ${selectedSymbol}
Connection: ${connectionStatus}
Positions: ${positions.length} | Orders: ${orders.length}

Available Commands: positions, orders, prices, status, buy, sell, help

Type 'help' for complete command list.`}
                commands={['help', 'status', 'prices']}
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
              <span>CONNECTION: {connectionStatus}</span>
              <span>SELECTED: {selectedSymbol}</span>
              <span>ORDER: {orderType}</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span>REAL-TIME</span>
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

export default MatrixTradingTerminal