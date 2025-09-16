'use client'

import React, { useState, useEffect } from 'react'
import { useMatrix } from '@/contexts/MatrixContext'
import MatrixButton from '@/components/ui/MatrixButton'
import TypewriterText from '@/components/ui/TypewriterText'

interface TradingSignal {
  id: string
  instrument: string
  direction: 'BUY' | 'SELL'
  confidence: number
  entryPrice: number
  stopLoss: number
  takeProfit: number
  timestamp: Date
  analysis: string[]
  aiReasoning: string
  status: 'ACTIVE' | 'EXECUTED' | 'EXPIRED'
}

const SignalGenerator: React.FC = () => {
  const { sound, addToHistory } = useMatrix()

  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedInstrument, setSelectedInstrument] = useState<string>('ALL')
  const [signals, setSignals] = useState<TradingSignal[]>([])

  // Mock AI analysis patterns
  const analysisPatterns = {
    'EURUSD': [
      'NEURAL PATTERN: Ascending Triangle Formation',
      'VOLUME ANALYSIS: Above Average (+23%)',
      'MOMENTUM: Bullish Divergence Detected',
      'FIBONACCI: 61.8% Retracement Support'
    ],
    'GBPUSD': [
      'NEURAL PATTERN: Head & Shoulders Reversal',
      'VOLUME ANALYSIS: Declining Volume on Rally',
      'MOMENTUM: Bearish Divergence Confirmed',
      'ELLIOTT WAVE: Wave 5 Completion Imminent'
    ],
    'XAUUSD': [
      'NEURAL PATTERN: Golden Cross Formation',
      'VOLUME ANALYSIS: Institutional Accumulation',
      'MOMENTUM: RSI Breaking Resistance',
      'SENTIMENT: Risk-On Environment Detected'
    ]
  }

  const instruments = ['ALL', 'EURUSD', 'GBPUSD', 'USDJPY', 'USDCHF', 'AUDUSD', 'XAUUSD', 'BTC/USD', 'SPX500']

  // Generate AI-powered trading signal
  const generateSignal = async () => {
    setIsGenerating(true)
    sound.play('beep')
    addToHistory('INITIALIZING AI SIGNAL GENERATION...')
    addToHistory('SCANNING MATRIX FOR ANOMALIES...')

    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 3000))

    // Mock signal generation
    const randomInstrument = selectedInstrument === 'ALL'
      ? instruments.slice(1)[Math.floor(Math.random() * (instruments.length - 1))]
      : selectedInstrument

    const direction: 'BUY' | 'SELL' = Math.random() > 0.5 ? 'BUY' : 'SELL'
    const confidence = Math.floor(Math.random() * 30) + 70 // 70-99%
    const basePrice = getRandomPrice(randomInstrument)

    const newSignal: TradingSignal = {
      id: Math.random().toString(36).substring(2, 9),
      instrument: randomInstrument,
      direction,
      confidence,
      entryPrice: basePrice,
      stopLoss: direction === 'BUY'
        ? basePrice * (1 - 0.01)
        : basePrice * (1 + 0.01),
      takeProfit: direction === 'BUY'
        ? basePrice * (1 + 0.02)
        : basePrice * (1 - 0.02),
      timestamp: new Date(),
      analysis: analysisPatterns[randomInstrument as keyof typeof analysisPatterns] || [
        'NEURAL PATTERN: Complex Formation Detected',
        'VOLUME ANALYSIS: Institutional Interest',
        'MOMENTUM: Trend Continuation Signal',
        'AI CONFIDENCE: High Probability Setup'
      ],
      aiReasoning: generateAIReasoning(randomInstrument, direction, confidence),
      status: 'ACTIVE'
    }

    setSignals(prev => [newSignal, ...prev.slice(0, 9)]) // Keep last 10 signals

    addToHistory(`SIGNAL GENERATED: ${randomInstrument} ${direction}`)
    addToHistory(`CONFIDENCE LEVEL: ${confidence}%`)
    sound.play('success')
    setIsGenerating(false)
  }

  const getRandomPrice = (instrument: string): number => {
    const prices: { [key: string]: number } = {
      'EURUSD': 1.0845,
      'GBPUSD': 1.2456,
      'USDJPY': 149.23,
      'USDCHF': 0.9123,
      'AUDUSD': 0.6789,
      'XAUUSD': 1984.32,
      'BTC/USD': 45678.90,
      'SPX500': 4567.89
    }
    return prices[instrument] + (Math.random() - 0.5) * (prices[instrument] * 0.01)
  }

  const generateAIReasoning = (instrument: string, direction: 'BUY' | 'SELL', confidence: number): string => {
    const reasoningTemplates = [
      `Matrix neural networks detected ${confidence}% probability of ${direction} movement in ${instrument}. Advanced pattern recognition algorithms identified key support/resistance confluence with high-probability breakout scenario.`,
      `Deep learning analysis reveals institutional order flow favoring ${direction} positions in ${instrument}. Multi-timeframe momentum alignment confirms ${confidence}% confidence rating for this trading opportunity.`,
      `AI sentiment analysis combined with technical indicators suggests ${direction} bias for ${instrument}. Machine learning models trained on 10+ years of market data predict ${confidence}% success probability.`
    ]
    return reasoningTemplates[Math.floor(Math.random() * reasoningTemplates.length)]
  }

  // Auto-generate signals every 30 seconds (for demo purposes)
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isGenerating && signals.length < 10) {
        generateSignal()
      }
    }, 30000)

    return () => clearInterval(interval)
  }, [isGenerating, signals.length])

  return (
    <div className="min-h-[calc(100vh-120px)] bg-black text-matrix-green p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <TypewriterText
            text="AI SIGNAL GENERATOR"
            speed={30}
            className="text-4xl font-mono font-bold glow-matrix mb-4"
          />
          <TypewriterText
            text="Neural networks scanning the Matrix for trading anomalies..."
            speed={20}
            delay={1500}
            className="text-lg text-matrix-dim"
          />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Signal Generation Panel */}
          <div className="xl:col-span-1">
            <div className="matrix-card p-6 sticky top-24">
              <h3 className="text-xl font-mono font-bold text-matrix-bright mb-6 flex items-center">
                <span className="animate-pulse-matrix mr-2">🧠</span>
                AI CONTROL
              </h3>

              {/* Instrument Selection */}
              <div className="mb-6">
                <label className="block text-sm font-mono text-matrix-bright mb-3">
                  TARGET_INSTRUMENT:
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {instruments.map((instrument) => (
                    <MatrixButton
                      key={instrument}
                      onClick={() => {
                        setSelectedInstrument(instrument)
                        sound.play('beep')
                      }}
                      variant={selectedInstrument === instrument ? 'primary' : 'secondary'}
                      size="sm"
                      className="text-xs"
                    >
                      {instrument}
                    </MatrixButton>
                  ))}
                </div>
              </div>

              {/* Generate Button */}
              <MatrixButton
                onClick={generateSignal}
                disabled={isGenerating}
                className="w-full text-lg py-4 mb-6"
              >
                {isGenerating ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="matrix-loading w-5 h-5"></div>
                    <TypewriterText
                      text="ANALYZING..."
                      speed={50}
                      showCursor={false}
                    />
                  </div>
                ) : (
                  'GENERATE SIGNAL'
                )}
              </MatrixButton>

              {/* AI Status */}
              <div className="matrix-terminal p-4">
                <div className="space-y-2 text-sm font-mono">
                  <div className="flex justify-between">
                    <span>Neural Network:</span>
                    <span className="text-matrix-bright animate-pulse-matrix">ACTIVE</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Accuracy:</span>
                    <span className="text-matrix-bright">94.7%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Processing:</span>
                    <span className="text-matrix-bright">REAL-TIME</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Signals Today:</span>
                    <span className="text-matrix-bright">{signals.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Signals Display */}
          <div className="xl:col-span-3">
            {signals.length === 0 ? (
              <div className="matrix-terminal p-12 text-center">
                <TypewriterText
                  text="No trading signals detected. Click 'GENERATE SIGNAL' to start AI analysis."
                  speed={30}
                  className="text-lg text-matrix-dim"
                />
              </div>
            ) : (
              <div className="space-y-6">
                {signals.map((signal) => (
                  <div key={signal.id} className="matrix-card p-6 hover:shadow-matrix transition-all">
                    {/* Signal Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className={`
                          px-4 py-2 border font-mono font-bold text-lg
                          ${signal.direction === 'BUY'
                            ? 'border-matrix-green text-matrix-green bg-matrix-green/10'
                            : 'border-red-400 text-red-400 bg-red-400/10'
                          }
                        `}>
                          {signal.direction}
                        </div>
                        <div>
                          <h3 className="text-2xl font-mono font-bold text-matrix-bright">
                            {signal.instrument}
                          </h3>
                          <div className="text-sm text-matrix-dim font-mono">
                            {signal.timestamp.toLocaleString()}
                          </div>
                        </div>
                      </div>

                      <div className="text-right mt-4 md:mt-0">
                        <div className="text-3xl font-mono font-bold text-matrix-bright">
                          {signal.confidence}%
                        </div>
                        <div className="text-sm text-matrix-dim font-mono">
                          CONFIDENCE
                        </div>
                      </div>
                    </div>

                    {/* Price Levels */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="matrix-terminal p-4">
                        <div className="text-sm text-matrix-dim font-mono mb-1">ENTRY_PRICE:</div>
                        <div className="text-xl font-mono font-bold text-matrix-bright">
                          {signal.entryPrice.toFixed(signal.instrument.includes('JPY') ? 2 : 4)}
                        </div>
                      </div>

                      <div className="matrix-terminal p-4">
                        <div className="text-sm text-red-400 font-mono mb-1">STOP_LOSS:</div>
                        <div className="text-xl font-mono font-bold text-red-400">
                          {signal.stopLoss.toFixed(signal.instrument.includes('JPY') ? 2 : 4)}
                        </div>
                      </div>

                      <div className="matrix-terminal p-4">
                        <div className="text-sm text-matrix-bright font-mono mb-1">TAKE_PROFIT:</div>
                        <div className="text-xl font-mono font-bold text-matrix-bright">
                          {signal.takeProfit.toFixed(signal.instrument.includes('JPY') ? 2 : 4)}
                        </div>
                      </div>
                    </div>

                    {/* AI Analysis */}
                    <div className="mb-6">
                      <h4 className="text-lg font-mono font-bold text-matrix-bright mb-3">
                        NEURAL_ANALYSIS:
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {signal.analysis.map((item, index) => (
                          <div key={index} className="flex items-center space-x-2 font-mono text-sm">
                            <span className="text-matrix-bright animate-pulse-matrix">▶</span>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* AI Reasoning */}
                    <div className="matrix-terminal p-4 mb-6">
                      <div className="text-sm text-matrix-bright font-mono mb-2">AI_REASONING:</div>
                      <div className="text-sm font-mono text-matrix-dim leading-relaxed">
                        {signal.aiReasoning}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                      <MatrixButton
                        onClick={() => {
                          sound.play('success')
                          addToHistory(`EXECUTING SIGNAL: ${signal.instrument} ${signal.direction}`)
                        }}
                        variant={signal.direction === 'BUY' ? 'primary' : 'danger'}
                        className="flex-1"
                      >
                        EXECUTE SIGNAL
                      </MatrixButton>

                      <MatrixButton
                        onClick={() => {
                          sound.play('beep')
                          addToHistory(`COPYING SIGNAL: ${signal.instrument}`)
                        }}
                        variant="secondary"
                        className="flex-1"
                      >
                        COPY TO CLIPBOARD
                      </MatrixButton>

                      <MatrixButton
                        onClick={() => {
                          sound.play('beep')
                          addToHistory(`ANALYZING DEEPER: ${signal.instrument}`)
                        }}
                        variant="secondary"
                        className="flex-1"
                      >
                        DEEP ANALYSIS
                      </MatrixButton>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignalGenerator