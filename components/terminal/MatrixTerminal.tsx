'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'

interface MatrixTerminalProps {
  className?: string
  title?: string
  height?: string
  commands?: string[]
  onCommand?: (command: string) => void
  welcomeMessage?: string
  prompt?: string
  autoType?: boolean
  showHeader?: boolean
}

interface TerminalLine {
  type: 'command' | 'output' | 'error' | 'system'
  content: string
  timestamp?: Date
}

const MatrixTerminal: React.FC<MatrixTerminalProps> = ({
  className = '',
  title = 'MATRIX TERMINAL v2.0.1',
  height = '400px',
  commands = [],
  onCommand,
  welcomeMessage = `AI CASH REVOLUTION - TERMINAL INTERFACE
Copyright (c) 2025 Matrix Systems Corporation
Type 'help' for available commands.`,
  prompt = 'matrix@ai-cash:~$ ',
  autoType = true,
  showHeader = true
}) => {
  const [input, setInput] = useState('')
  const [lines, setLines] = useState<TerminalLine[]>([])
  const [isFocused, setIsFocused] = useState(false)
  const [cursorVisible, setCursorVisible] = useState(true)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)
  const scrollToBottomRef = useRef<HTMLDivElement>(null)

  // Available commands
  const availableCommands = {
    help: 'Show available commands',
    clear: 'Clear terminal screen',
    status: 'System status and diagnostics',
    signals: 'View active trading signals',
    portfolio: 'Show portfolio overview',
    scan: 'Market scan utility',
    execute: 'Execute trading command',
    config: 'System configuration',
    logout: 'Terminate session',
    matrix: 'Enter Matrix mode',
    hack: 'Initiate security protocols',
    decrypt: 'Decrypt market data',
    analyze: 'AI market analysis'
  }

  // Initialize terminal with welcome message
  useEffect(() => {
    if (welcomeMessage) {
      const welcomeLines = welcomeMessage.split('\n').map(line => ({
        type: 'system' as const,
        content: line,
        timestamp: new Date()
      }))
      setLines(welcomeLines)
    }
  }, [welcomeMessage])

  // Auto-type commands if provided
  useEffect(() => {
    if (autoType && commands.length > 0 && lines.length <= (welcomeMessage?.split('\n').length || 0)) {
      commands.forEach((command, index) => {
        setTimeout(() => {
          executeCommand(command)
        }, (index + 1) * 2000)
      })
    }
  }, [commands, autoType, lines.length, welcomeMessage])

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible(v => !v)
    }, 500)

    return () => clearInterval(cursorInterval)
  }, [])

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollToBottomRef.current) {
      scrollToBottomRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [lines])

  // Focus input on terminal click
  const handleTerminalClick = useCallback(() => {
    inputRef.current?.focus()
    setIsFocused(true)
  }, [])

  const executeCommand = useCallback((command: string) => {
    const commandLine: TerminalLine = {
      type: 'command',
      content: `${prompt}${command}`,
      timestamp: new Date()
    }

    setLines(prev => [...prev, commandLine])

    // Process command
    const trimmedCommand = command.trim().toLowerCase()
    let outputLines: TerminalLine[] = []

    switch (trimmedCommand) {
      case 'help':
        outputLines = [
          { type: 'output', content: 'Available Commands:' },
          ...Object.entries(availableCommands).map(([cmd, desc]) => ({
            type: 'output' as const,
            content: `  ${cmd.padEnd(12)} - ${desc}`
          }))
        ]
        break

      case 'clear':
        setLines([])
        return

      case 'status':
        outputLines = [
          { type: 'output', content: 'MATRIX SYSTEM STATUS' },
          { type: 'output', content: '==================' },
          { type: 'output', content: 'Neural Network:    ONLINE' },
          { type: 'output', content: 'Trading Engine:    ACTIVE' },
          { type: 'output', content: 'Market Data:       REAL-TIME' },
          { type: 'output', content: 'Security Level:    MAXIMUM' },
          { type: 'output', content: 'AI Core:           CONSCIOUS' },
          { type: 'output', content: 'Latency:           0.085ms' },
          { type: 'output', content: 'Uptime:            47h 33m 12s' },
          { type: 'output', content: 'Signals Generated: 1,247' },
          { type: 'output', content: 'Success Rate:      94.7%' }
        ]
        break

      case 'signals':
        outputLines = [
          { type: 'output', content: 'ACTIVE TRADING SIGNALS' },
          { type: 'output', content: '=====================' },
          { type: 'output', content: '[EURUSD] BUY  | Confidence: 87% | TP: 1.0850 | SL: 1.0720' },
          { type: 'output', content: '[GBPUSD] SELL | Confidence: 92% | TP: 1.2630 | SL: 1.2780' },
          { type: 'output', content: '[XAUUSD] BUY  | Confidence: 78% | TP: 2035.50 | SL: 2012.30' },
          { type: 'output', content: '[BTCUSD] HOLD | Confidence: 85% | Range: 42800-44500' }
        ]
        break

      case 'portfolio':
        outputLines = [
          { type: 'output', content: 'PORTFOLIO OVERVIEW' },
          { type: 'output', content: '==================' },
          { type: 'output', content: 'Total Balance:     $124,732.45' },
          { type: 'output', content: 'Available Margin:   $87,294.12' },
          { type: 'output', content: 'Daily P&L:         +$2,847.33 (+2.34%)' },
          { type: 'output', content: 'Total P&L:         +$24,732.45 (+24.73%)' },
          { type: 'output', content: 'Open Positions:    7' },
          { type: 'output', content: 'Win Rate:          89.3%' }
        ]
        break

      case 'scan':
        outputLines = [
          { type: 'output', content: 'INITIATING MARKET SCAN...' },
          { type: 'output', content: 'Scanning 28 currency pairs...' },
          { type: 'output', content: 'Analyzing volatility patterns...' },
          { type: 'output', content: 'Processing neural network predictions...' },
          { type: 'output', content: 'Scan complete. 3 high-probability opportunities found.' },
          { type: 'error', content: 'Premium feature. Upgrade to access full scan results.' }
        ]
        break

      case 'matrix':
        outputLines = [
          { type: 'output', content: 'INITIATING MATRIX PROTOCOL...' },
          { type: 'output', content: 'Bypassing security systems...' },
          { type: 'output', content: 'Accessing mainframe...' },
          { type: 'output', content: 'MATRIX MODE ACTIVATED' },
          { type: 'output', content: 'Welcome to the real world.' }
        ]
        break

      case 'hack':
        outputLines = [
          { type: 'error', content: 'ACCESS DENIED' },
          { type: 'error', content: 'Security breach detected!' },
          { type: 'error', content: ' Initiating countermeasures...' },
          { type: 'output', content: 'Just kidding! This is a demo terminal. 😄' }
        ]
        break

      case 'decrypt':
        outputLines = [
          { type: 'output', content: 'DECRYPTING MARKET DATA...' },
          { type: 'output', content: 'Breaking 256-bit encryption...' },
          { type: 'output', content: 'Accessing dark pool liquidity...' },
          { type: 'output', content: 'DECRYPTION COMPLETE' },
          { type: 'output', content: 'Insider trading pattern detected: EURUSD long positions accumulating' }
        ]
        break

      case 'analyze':
        outputLines = [
          { type: 'output', content: 'AI MARKET ANALYSIS INITIATED' },
          { type: 'output', content: 'Processing 1.2TB of market data...' },
          { type: 'output', content: 'Running quantum algorithms...' },
          { type: 'output', content: 'PREDICTION: EURUSD bullish breakout expected within 4 hours' },
          { type: 'output', content: 'Confidence: 87% | Risk: Medium | Reward: High' }
        ]
        break

      case '':
        // Empty command, just add new prompt
        break

      default:
        outputLines = [
          { type: 'error', content: `Command not found: ${trimmedCommand}` },
          { type: 'output', content: 'Type "help" for available commands.' }
        ]
    }

    // Add output lines with delay for realistic feel
    outputLines.forEach((line, index) => {
      setTimeout(() => {
        setLines(prev => [...prev, { ...line, timestamp: new Date() }])
      }, index * 100)
    })

    // Call external command handler if provided
    if (onCommand) {
      onCommand(command)
    }

    setInput('')
  }, [prompt, onCommand])

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      executeCommand(input)
    }
  }, [input, executeCommand])

  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  }

  return (
    <div className={`matrix-terminal ${className}`} style={{ height }}>
      {showHeader && (
        <div className="matrix-terminal-header bg-black/80 border-b border-matrix-green p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
            <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse" />
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            <span className="text-matrix-green font-matrix text-sm ml-2">{title}</span>
          </div>
          <div className="text-matrix-green/60 font-matrix text-xs">
            {new Date().toLocaleString()}
          </div>
        </div>
      )}

      <div
        ref={terminalRef}
        className="terminal-output flex-1 overflow-y-auto p-4 font-matrix text-sm space-y-1 cursor-text"
        onClick={handleTerminalClick}
        style={{ minHeight: 'calc(100% - 60px)' }}
      >
        {lines.map((line, index) => (
          <div
            key={index}
            className={`terminal-line ${
              line.type === 'error' ? 'text-red-400' :
              line.type === 'system' ? 'text-matrix-bright-green' :
              line.type === 'command' ? 'text-matrix-green' :
              'text-matrix-green/80'
            }`}
          >
            <span className="timestamp opacity-50 mr-2">
              [{formatTimestamp(line.timestamp || new Date())}]
            </span>
            <span className="content">
              {line.content}
            </span>
          </div>
        ))}

        {/* Current input line */}
        <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-2">
          <span className="text-matrix-green">{prompt}</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="matrix-input flex-1 bg-transparent border-none outline-none text-matrix-green font-matrix"
            placeholder={isFocused ? '' : 'Type command...'}
            autoComplete="off"
            spellCheck="false"
          />
          <span className={`cursor ${cursorVisible ? 'opacity-100' : 'opacity-0'} bg-matrix-green`} style={{ width: '8px', height: '16px' }} />
        </form>

        <div ref={scrollToBottomRef} />
      </div>

      {/* Terminal footer */}
      <div className="matrix-terminal-footer bg-black/60 border-t border-matrix-green/30 p-2">
        <div className="flex items-center justify-between text-xs font-matrix text-matrix-green/60">
          <div className="flex items-center gap-4">
            <span>CONNECTED</span>
            <span>ENCRYPTED</span>
            <span>SECURE</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-matrix-green rounded-full animate-pulse" />
            <span>SYSTEM ONLINE</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MatrixTerminal