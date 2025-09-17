'use client'

import React, { useState, useEffect } from 'react'
import MatrixCommandCenter from '../../components/dashboard/MatrixCommandCenter'
import MatrixRain from '../../components/matrix/MatrixRain'
import MatrixButton from '../../components/ui/MatrixButton'

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [bootSequence, setBootSequence] = useState<string[]>([])
  const [systemReady, setSystemReady] = useState(false)

  // Simulate Matrix system boot sequence
  useEffect(() => {
    const bootMessages = [
      'INITIALIZING MATRIX DASHBOARD...',
      'LOADING NEURAL NETWORKS...',
      'CONNECTING TO MARKET DATA FEEDS...',
      'ESTABLISHING SECURE CONNECTIONS...',
      'CALIBRATING TRADING ALGORITHMS...',
      'LOADING USER PREFERENCES...',
      'SYNCHRONIZING PORTFOLIO DATA...',
      'ACTIVATING REAL-TIME SIGNALS...',
      'MATRIX SYSTEM: FULLY OPERATIONAL'
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
      }, index * 400)
    })
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen relative bg-black flex items-center justify-center">
        <MatrixRain className="absolute inset-0" intensity="medium" speed={1.2} />

        <div className="relative z-10 text-center max-w-2xl mx-auto p-8">
          <div className="matrix-glitch text-4xl font-matrix font-bold text-matrix-green mb-8" data-text="MATRIX INITIALIZATION">
            MATRIX INITIALIZATION
          </div>

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
                <span className="text-matrix-green/60">INITIALIZING SYSTEMS...</span>
              </div>
            )}
          </div>

          {systemReady && (
            <div className="mt-8 p-4 matrix-glass border border-matrix-green">
              <div className="flex items-center gap-2 text-green-400 font-matrix">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                <span className="font-bold">SYSTEM READY</span>
              </div>
              <p className="text-sm text-matrix-green/60 mt-2">
                Press ENTER to access the Matrix Command Center
              </p>
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

  return <MatrixCommandCenter />
}