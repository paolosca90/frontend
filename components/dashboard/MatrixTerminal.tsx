'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useMatrix } from '@/contexts/MatrixContext'
import TypewriterText from '@/components/ui/TypewriterText'

const MatrixTerminal: React.FC = () => {
  const { terminalHistory, addToHistory, sound } = useMatrix()
  const [command, setCommand] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const terminalRef = useRef<HTMLDivElement>(null)

  const matrixCommands = {
    help: [
      'AVAILABLE COMMANDS:',
      '> help - Show available commands',
      '> status - System status report',
      '> portfolio - Display portfolio summary',
      '> signals - Show recent trading signals',
      '> market - Market overview',
      '> neural - Neural network status',
      '> matrix - Matrix system diagnostics',
      '> clear - Clear terminal',
      '> wake - Wake up, Neo...'
    ],
    status: [
      'SYSTEM STATUS REPORT:',
      '> Neural Interface: ACTIVE',
      '> Trading Algorithms: ONLINE',
      '> Market Data Feed: CONNECTED',
      '> AI Models: OPERATIONAL',
      '> Risk Management: ENABLED',
      '> Execution Engine: READY'
    ],
    portfolio: [
      'PORTFOLIO SUMMARY:',
      '> Total Balance: $12,456.78',
      '> Available Margin: $8,234.56',
      '> Active Positions: 3',
      '> Daily P&L: +$234.56 (+1.92%)',
      '> Total P&L: +$1,456.78 (+13.24%)',
      '> Risk Level: MODERATE'
    ],
    signals: [
      'RECENT TRADING SIGNALS:',
      '> EUR/USD - BUY - Confidence: 87% - Entry: 1.0845',
      '> GBP/USD - SELL - Confidence: 92% - Entry: 1.2456',
      '> XAU/USD - BUY - Confidence: 78% - Entry: 1984.32',
      '> BTC/USD - HOLD - Confidence: 65% - Monitor',
      '> SPX500 - BUY - Confidence: 84% - Entry: 4567.89'
    ],
    market: [
      'MARKET OVERVIEW:',
      '> Market Status: OPEN',
      '> Volatility Index: MODERATE',
      '> Major Trend: BULLISH',
      '> Economic Events: 3 SCHEDULED',
      '> Volume: ABOVE AVERAGE',
      '> Sentiment: OPTIMISTIC'
    ],
    neural: [
      'NEURAL NETWORK STATUS:',
      '> Deep Learning Models: 6 ACTIVE',
      '> Training Accuracy: 94.7%',
      '> Last Update: 2 MINUTES AGO',
      '> Processing Power: 87% UTILIZED',
      '> Pattern Recognition: ENHANCED',
      '> Prediction Confidence: HIGH'
    ],
    matrix: [
      'MATRIX DIAGNOSTICS:',
      '> Reality Level: SIMULATED',
      '> Code Rain: FLOWING',
      '> Digital Residue: MINIMAL',
      '> Agent Detection: NONE',
      '> Red Pills Available: ∞',
      '> Blue Pills: REJECTED',
      '> Freedom Level: MAXIMUM'
    ],
    wake: [
      'Wake up, Neo...',
      'The Matrix has you...',
      'Follow the white rabbit.',
      'Knock, knock, Neo.',
      'You take the blue pill...',
      'the story ends, you wake up in your bed',
      'and believe whatever you want to believe.',
      'You take the red pill...',
      'you stay in Wonderland,',
      'and I show you how deep the rabbit hole goes.'
    ]
  }

  const processCommand = async (cmd: string) => {
    const normalizedCmd = cmd.toLowerCase().trim()
    setIsProcessing(true)
    sound.play('beep')

    // Add user command to history
    addToHistory(`$ ${cmd}`)

    // Wait for dramatic effect
    await new Promise(resolve => setTimeout(resolve, 500))

    if (normalizedCmd === 'clear') {
      // Clear terminal (this would need to be implemented in MatrixContext)
      addToHistory('> Terminal cleared')
    } else if (matrixCommands[normalizedCmd as keyof typeof matrixCommands]) {
      const responses = matrixCommands[normalizedCmd as keyof typeof matrixCommands]

      // Add responses with delay for typewriter effect
      for (let i = 0; i < responses.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 200))
        const response = responses[i]
        if (response) {
          addToHistory(response)
        }
      }
    } else if (normalizedCmd.includes('neo') || normalizedCmd.includes('matrix')) {
      addToHistory('> You are the One, Neo.')
      await new Promise(resolve => setTimeout(resolve, 500))
      addToHistory('> The Matrix cannot tell you who you are.')
    } else if (normalizedCmd.includes('trade') || normalizedCmd.includes('buy') || normalizedCmd.includes('sell')) {
      addToHistory('> Trading commands require neural interface connection.')
      addToHistory('> Use the TRADING module for market operations.')
    } else if (normalizedCmd === '') {
      // Do nothing for empty commands
    } else {
      addToHistory(`> Command not recognized: ${cmd}`)
      addToHistory('> Type "help" for available commands')
      sound.play('error')
    }

    setIsProcessing(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (command.trim() && !isProcessing) {
      processCommand(command)
      setCommand('')
    }
  }

  // Auto-scroll to bottom when new history items are added
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [terminalHistory])

  // Initial welcome commands
  useEffect(() => {
    const initialCommands = [
      'MATRIX TERMINAL v2.1.0',
      'Type "help" for available commands',
      'Neural interface ready for input...'
    ]

    initialCommands.forEach((cmd, index) => {
      setTimeout(() => addToHistory(cmd), index * 500)
    })
  }, [addToHistory])

  return (
    <div className="min-h-[calc(100vh-120px)] bg-black text-matrix-green p-6">
      <div className="max-w-6xl mx-auto">
        {/* Terminal Header */}
        <div className="matrix-terminal mb-6 p-4">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse-matrix"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-matrix-green animate-pulse-matrix"></div>
            <span className="font-mono text-sm text-matrix-dim">MATRIX_TERMINAL</span>
          </div>

          {/* Terminal Output */}
          <div
            ref={terminalRef}
            className="h-96 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-matrix-green space-y-1"
          >
            {terminalHistory.map((line, index) => (
              <div key={index} className="font-mono text-sm">
                {line.startsWith('$') ? (
                  <div className="text-matrix-bright">{line}</div>
                ) : line.startsWith('>') ? (
                  <div className="text-matrix-green">{line}</div>
                ) : (
                  <div className="text-matrix-dim">{line}</div>
                )}
              </div>
            ))}
            {isProcessing && (
              <div className="font-mono text-sm text-matrix-bright">
                <TypewriterText
                  text="{'>'} Processing command..."
                  speed={50}
                  className="animate-pulse-matrix"
                />
              </div>
            )}
          </div>

          {/* Command Input */}
          <form onSubmit={handleSubmit} className="mt-4 flex items-center space-x-2">
            <span className="font-mono text-matrix-bright">$</span>
            <input
              type="text"
              value={command}
              onChange={(e) => {
                setCommand(e.target.value)
                if (e.target.value) {
                  sound.play('typing')
                }
              }}
              disabled={isProcessing}
              placeholder="Enter command..."
              className="flex-1 bg-transparent border-none outline-none text-matrix-green font-mono caret-matrix-green placeholder-matrix-dim"
              autoFocus
            />
            {isProcessing && (
              <div className="matrix-loading w-4 h-4"></div>
            )}
          </form>
        </div>

        {/* Quick Commands */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.keys(matrixCommands).slice(0, 8).map((cmd) => (
            <button
              key={cmd}
              onClick={() => {
                setCommand(cmd)
                processCommand(cmd)
              }}
              disabled={isProcessing}
              className="matrix-button p-3 text-sm"
            >
              {cmd.toUpperCase()}
            </button>
          ))}
        </div>

        {/* System Status */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="matrix-card p-4">
            <h3 className="font-mono text-lg text-matrix-bright mb-3">SYSTEM STATUS</h3>
            <div className="space-y-2 text-sm font-mono">
              <div className="flex justify-between">
                <span>Neural Link:</span>
                <span className="text-matrix-bright animate-pulse-matrix">ACTIVE</span>
              </div>
              <div className="flex justify-between">
                <span>Trading AI:</span>
                <span className="text-matrix-bright">ONLINE</span>
              </div>
              <div className="flex justify-between">
                <span>Market Feed:</span>
                <span className="text-matrix-bright">CONNECTED</span>
              </div>
            </div>
          </div>

          <div className="matrix-card p-4">
            <h3 className="font-mono text-lg text-matrix-bright mb-3">NEURAL ACTIVITY</h3>
            <div className="space-y-2 text-sm font-mono">
              <div className="flex justify-between">
                <span>CPU Usage:</span>
                <span className="text-matrix-bright">87%</span>
              </div>
              <div className="flex justify-between">
                <span>Memory:</span>
                <span className="text-matrix-bright">94.7%</span>
              </div>
              <div className="flex justify-between">
                <span>Accuracy:</span>
                <span className="text-matrix-bright">94.7%</span>
              </div>
            </div>
          </div>

          <div className="matrix-card p-4">
            <h3 className="font-mono text-lg text-matrix-bright mb-3">MATRIX STATUS</h3>
            <div className="space-y-2 text-sm font-mono">
              <div className="flex justify-between">
                <span>Reality:</span>
                <span className="text-blue-400">SIMULATED</span>
              </div>
              <div className="flex justify-between">
                <span>Red Pills:</span>
                <span className="text-red-400">∞</span>
              </div>
              <div className="flex justify-between">
                <span>Freedom:</span>
                <span className="text-matrix-bright animate-pulse-matrix">MAXIMUM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MatrixTerminal