'use client'

import React, { useState, useEffect } from 'react'
import { useMatrix } from '@/contexts/MatrixContext'
import MatrixButton from '@/components/ui/MatrixButton'
import MatrixInput from '@/components/ui/MatrixInput'
import TypewriterText from '@/components/ui/TypewriterText'

interface TradingPair {
  symbol: string
  price: number
  change: number
  changePercent: number
  volume: string
  high: number
  low: number
}

interface Position {
  id: string
  symbol: string
  type: 'BUY' | 'SELL'
  size: number
  entryPrice: number
  currentPrice: number
  pnl: number
  pnlPercent: number
}

const TradingInterface: React.FC = () => {
  const { sound, addToHistory } = useMatrix()

  const [selectedPair, setSelectedPair] = useState<string>('EURUSD')
  const [orderType, setOrderType] = useState<'BUY' | 'SELL'>('BUY')
  const [orderSize, setOrderSize] = useState<string>('0.1')
  const [stopLoss, setStopLoss] = useState<string>('')
  const [takeProfit, setTakeProfit] = useState<string>('')
  const [isProcessingOrder, setIsProcessingOrder] = useState(false)

  // Mock data - in real app, this would come from API
  const [tradingPairs] = useState<TradingPair[]>([
    { symbol: 'EURUSD', price: 1.0845, change: 0.0023, changePercent: 0.21, volume: '1.2M', high: 1.0867, low: 1.0823 },
    { symbol: 'GBPUSD', price: 1.2456, change: -0.0012, changePercent: -0.10, volume: '987K', high: 1.2478, low: 1.2434 },
    { symbol: 'USDJPY', price: 149.23, change: 0.45, changePercent: 0.30, volume: '2.1M', high: 149.67, low: 148.89 },
    { symbol: 'USDCHF', price: 0.9123, change: -0.0008, changePercent: -0.09, volume: '456K', high: 0.9145, low: 0.9098 },
    { symbol: 'AUDUSD', price: 0.6789, change: 0.0034, changePercent: 0.50, volume: '678K', high: 0.6823, low: 0.6756 },
    { symbol: 'XAUUSD', price: 1984.32, change: 12.45, changePercent: 0.63, volume: '3.4M', high: 1998.76, low: 1976.23 }
  ])

  const [positions] = useState<Position[]>([
    { id: '1', symbol: 'EURUSD', type: 'BUY', size: 0.5, entryPrice: 1.0823, currentPrice: 1.0845, pnl: 110.00, pnlPercent: 2.03 },
    { id: '2', symbol: 'GBPUSD', type: 'SELL', size: 0.3, entryPrice: 1.2478, currentPrice: 1.2456, pnl: 66.00, pnlPercent: 1.76 },
    { id: '3', symbol: 'XAUUSD', type: 'BUY', size: 0.1, entryPrice: 1976.23, currentPrice: 1984.32, pnl: 80.90, pnlPercent: 4.09 }
  ])

  // Simulate live price updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate price movements with Matrix-style glitch effect
      const randomPair = tradingPairs[Math.floor(Math.random() * tradingPairs.length)]
      const priceChange = (Math.random() - 0.5) * 0.01
      randomPair.price += priceChange
      randomPair.change += priceChange
      randomPair.changePercent = (randomPair.change / randomPair.price) * 100
    }, 2000)

    return () => clearInterval(interval)
  }, [tradingPairs])

  const handlePlaceOrder = async () => {
    if (!orderSize || parseFloat(orderSize) <= 0) {
      sound.play('error')
      addToHistory('ERROR: Invalid order size')
      return
    }

    setIsProcessingOrder(true)
    sound.play('beep')
    addToHistory(`PROCESSING ${orderType} ORDER: ${selectedPair}`)
    addToHistory(`SIZE: ${orderSize} | SL: ${stopLoss || 'NONE'} | TP: ${takeProfit || 'NONE'}`)

    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Simulate order result (90% success rate)
    const isSuccess = Math.random() > 0.1

    if (isSuccess) {
      sound.play('success')
      addToHistory('ORDER EXECUTED SUCCESSFULLY')
      addToHistory(`POSITION OPENED: ${selectedPair} ${orderType} ${orderSize}`)

      // Reset form
      setOrderSize('0.1')
      setStopLoss('')
      setTakeProfit('')
    } else {
      sound.play('error')
      addToHistory('ORDER REJECTED: INSUFFICIENT MARGIN')
    }

    setIsProcessingOrder(false)
  }

  const selectedPairData = tradingPairs.find(pair => pair.symbol === selectedPair)

  return (
    <div className="min-h-[calc(100vh-120px)] bg-black text-matrix-green p-6">
      <div className="max-w-7xl mx-auto">
        {/* Trading Interface Header */}
        <div className="mb-6">
          <TypewriterText
            text="MATRIX TRADING INTERFACE"
            speed={30}
            className="text-3xl font-mono font-bold text-center glow-matrix mb-2"
          />
          <div className="text-center text-matrix-dim font-mono">
            <TypewriterText
              text="Real-time market manipulation detected... Trading the anomalies"
              speed={20}
              delay={1500}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Market Watch */}
          <div className="lg:col-span-2">
            <div className="matrix-card p-6 mb-6">
              <h2 className="text-xl font-mono font-bold text-matrix-bright mb-4 flex items-center">
                <span className="animate-pulse-matrix mr-2">⚡</span>
                MARKET ANOMALIES
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tradingPairs.map((pair) => (
                  <div
                    key={pair.symbol}
                    onClick={() => {
                      setSelectedPair(pair.symbol)
                      sound.play('beep')
                    }}
                    className={`
                      matrix-terminal p-4 cursor-pointer transition-all hover:shadow-matrix
                      ${selectedPair === pair.symbol ? 'border-matrix-bright glow-matrix' : ''}
                    `}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-mono font-bold text-matrix-bright">{pair.symbol}</span>
                      <span className={`font-mono text-sm ${pair.change >= 0 ? 'text-matrix-bright' : 'text-red-400'}`}>
                        {pair.change >= 0 ? '+' : ''}{pair.changePercent.toFixed(2)}%
                      </span>
                    </div>

                    <div className="font-mono text-2xl mb-2 animate-pulse-matrix">
                      {pair.price.toFixed(pair.symbol.includes('JPY') ? 2 : 4)}
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-xs font-mono text-matrix-dim">
                      <div>H: {pair.high.toFixed(4)}</div>
                      <div>L: {pair.low.toFixed(4)}</div>
                      <div>Vol: {pair.volume}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chart Placeholder */}
            <div className="matrix-card p-6">
              <h3 className="text-lg font-mono font-bold text-matrix-bright mb-4">
                DIGITAL RAIN ANALYSIS: {selectedPair}
              </h3>
              <div className="h-64 bg-black border border-matrix-green/20 flex items-center justify-center">
                <div className="text-center">
                  <TypewriterText
                    text="NEURAL CHART PROCESSING..."
                    speed={50}
                    className="text-matrix-dim mb-4"
                  />
                  <div className="matrix-loading w-8 h-8 mx-auto"></div>
                  <div className="mt-4 text-sm font-mono text-matrix-dim">
                    TradingView integration will render here
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Trading Panel */}
          <div className="space-y-6">
            {/* Order Entry */}
            <div className="matrix-card p-6">
              <h3 className="text-lg font-mono font-bold text-matrix-bright mb-4 flex items-center">
                <span className="animate-pulse-matrix mr-2">🎯</span>
                EXECUTE ORDER
              </h3>

              <div className="space-y-4">
                {/* Order Type Toggle */}
                <div className="flex space-x-2">
                  <MatrixButton
                    onClick={() => {
                      setOrderType('BUY')
                      sound.play('beep')
                    }}
                    variant={orderType === 'BUY' ? 'primary' : 'secondary'}
                    className="flex-1"
                  >
                    BUY
                  </MatrixButton>
                  <MatrixButton
                    onClick={() => {
                      setOrderType('SELL')
                      sound.play('beep')
                    }}
                    variant={orderType === 'SELL' ? 'danger' : 'secondary'}
                    className="flex-1"
                  >
                    SELL
                  </MatrixButton>
                </div>

                {/* Current Price Display */}
                {selectedPairData && (
                  <div className="matrix-terminal p-3 text-center">
                    <div className="font-mono text-sm text-matrix-dim mb-1">{selectedPair}</div>
                    <div className="font-mono text-2xl text-matrix-bright animate-pulse-matrix">
                      {selectedPairData.price.toFixed(selectedPair.includes('JPY') ? 2 : 4)}
                    </div>
                    <div className={`font-mono text-sm ${selectedPairData.change >= 0 ? 'text-matrix-bright' : 'text-red-400'}`}>
                      {selectedPairData.change >= 0 ? '+' : ''}{selectedPairData.change.toFixed(4)} ({selectedPairData.changePercent.toFixed(2)}%)
                    </div>
                  </div>
                )}

                {/* Order Inputs */}
                <MatrixInput
                  label="SIZE:"
                  type="number"
                  step="0.01"
                  value={orderSize}
                  onChange={(e) => setOrderSize(e.target.value)}
                  placeholder="0.1"
                />

                <MatrixInput
                  label="STOP_LOSS:"
                  type="number"
                  step="0.0001"
                  value={stopLoss}
                  onChange={(e) => setStopLoss(e.target.value)}
                  placeholder="Optional"
                />

                <MatrixInput
                  label="TAKE_PROFIT:"
                  type="number"
                  step="0.0001"
                  value={takeProfit}
                  onChange={(e) => setTakeProfit(e.target.value)}
                  placeholder="Optional"
                />

                {/* Execute Button */}
                <MatrixButton
                  onClick={handlePlaceOrder}
                  disabled={isProcessingOrder}
                  variant={orderType === 'BUY' ? 'primary' : 'danger'}
                  className="w-full text-lg py-4"
                >
                  {isProcessingOrder ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="matrix-loading w-4 h-4"></div>
                      <span>PROCESSING...</span>
                    </div>
                  ) : (
                    `${orderType} ${selectedPair}`
                  )}
                </MatrixButton>
              </div>
            </div>

            {/* Positions */}
            <div className="matrix-card p-6">
              <h3 className="text-lg font-mono font-bold text-matrix-bright mb-4 flex items-center">
                <span className="animate-pulse-matrix mr-2">📊</span>
                ACTIVE POSITIONS
              </h3>

              <div className="space-y-3">
                {positions.map((position) => (
                  <div key={position.id} className="matrix-terminal p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-mono font-bold text-matrix-bright">{position.symbol}</span>
                      <span className={`font-mono text-sm px-2 py-1 border ${
                        position.type === 'BUY'
                          ? 'border-matrix-green text-matrix-green'
                          : 'border-red-400 text-red-400'
                      }`}>
                        {position.type}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs font-mono text-matrix-dim">
                      <div>Size: {position.size}</div>
                      <div>Entry: {position.entryPrice.toFixed(4)}</div>
                      <div>Current: {position.currentPrice.toFixed(4)}</div>
                      <div className={`${position.pnl >= 0 ? 'text-matrix-bright' : 'text-red-400'}`}>
                        P&L: ${position.pnl.toFixed(2)}
                      </div>
                    </div>

                    <div className="mt-2 flex space-x-2">
                      <MatrixButton
                        size="sm"
                        variant="secondary"
                        className="flex-1 text-xs"
                        onClick={() => {
                          sound.play('beep')
                          addToHistory(`CLOSING POSITION: ${position.symbol}`)
                        }}
                      >
                        CLOSE
                      </MatrixButton>
                      <MatrixButton
                        size="sm"
                        variant="secondary"
                        className="flex-1 text-xs"
                        onClick={() => {
                          sound.play('beep')
                          addToHistory(`MODIFYING POSITION: ${position.symbol}`)
                        }}
                      >
                        MODIFY
                      </MatrixButton>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TradingInterface