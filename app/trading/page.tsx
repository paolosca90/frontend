'use client'

import React, { useState, useEffect } from 'react'
import MatrixTradingTerminal from '../../components/trading/MatrixTradingTerminal'
import MatrixRain from '../../components/matrix/MatrixRain'

export default function TradingPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [bootSequence, setBootSequence] = useState<string[]>([])
  const [systemReady, setSystemReady] = useState(false)

  // Simulate Matrix trading system initialization
  useEffect(() => {
    const bootMessages = [
      'INITIALIZING TRADING TERMINAL...',
      'CONNECTING TO MARKET DATA FEEDS...',
      'ESTABLISHING LIQUIDITY POOLS...',
      'LOADING TRADING ALGORITHMS...',
      'SYNCHRONIZING ORDER BOOKS...',
      'CALIBRATING EXECUTION ENGINE...',
      'CONNECTING TO BROKERAGE API...',
      'INITIALIZING RISK MANAGEMENT...',
      'ESTABLISHING SECURE CONNECTIONS...',
      'TRADING SYSTEM: FULLY OPERATIONAL'
    ]

    bootMessages.forEach((message, index) => {
      setTimeout(() => {
        setBootSequence(prev => [...prev, message])
        if (index === bootMessages.length - 1) {
          setTimeout(() => {
            setSystemReady(true)
            setIsLoading(false)
          }, 1000)
        }
      }, index * 300)
    })
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen relative bg-black flex items-center justify-center">
        <MatrixRain className="absolute inset-0" intensity="high" speed={1.5} />

        <div className="relative z-10 text-center max-w-2xl mx-auto p-8">
          <div className="matrix-glitch text-4xl font-matrix font-bold text-matrix-green mb-8" data-text="TRADING TERMINAL INITIALIZATION">
            TRADING TERMINAL INITIALIZATION
          </div>

          <div className="matrix-glass p-6 border border-matrix-green mb-8">
            <div className="space-y-3 font-matrix text-matrix-green/80 text-left">
              {bootSequence.map((message, index) => (
                <div key={index} className="flex items-center gap-3 opacity-0 animate-fade-in">
                  <div className="w-2 h-2 bg-matrix-green rounded-full animate-pulse" />
                  <span>{message}</span>
                </div>
              ))}

              {!systemReady && (
                <div className="flex items-center gap-3 mt-4">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                  <span className="text-matrix-green/60">INITIALIZING TRADING SYSTEMS...</span>
                </div>
              )}
            </div>
          </div>

          {systemReady && (
            <div className="space-y-4">
              <div className="p-4 matrix-glass border border-green-400">
                <div className="flex items-center gap-2 text-green-400 font-matrix">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                  <span className="font-bold">TRADING SYSTEM READY</span>
                </div>
                <p className="text-sm text-matrix-green/60 mt-2">
                  All trading systems operational. Press ENTER to access terminal.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs font-matrix text-matrix-green/60">
                <div className="matrix-glass p-3 border border-matrix-green/30">
                  <div className="text-matrix-green mb-1">MARKET DATA</div>
                  <div className="text-green-400">CONNECTED</div>
                </div>
                <div className="matrix-glass p-3 border border-matrix-green/30">
                  <div className="text-matrix-green mb-1">EXECUTION</div>
                  <div className="text-green-400">READY</div>
                </div>
              </div>
            </div>
          )}
        </div>

        <style jsx>{`
          @keyframes fade-in {
            from { opacity: 0; transform: translateX(-20px); }
            to { opacity: 1; transform: translateX(0); }
          }
          .animate-fade-in {
            animation: fade-in 0.5s ease-out forwards;
          }
        `}</style>
      </div>
    )
  }

  return <MatrixTradingTerminal />
}