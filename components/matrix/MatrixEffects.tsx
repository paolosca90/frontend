'use client'

import React, { useEffect, useState } from 'react'
import MatrixRain from './MatrixRain'

interface MatrixEffectsProps {
  showRain?: boolean
  showScanLines?: boolean
  intensity?: 'low' | 'medium' | 'high'
}

const MatrixEffects: React.FC<MatrixEffectsProps> = ({
  showRain = true,
  showScanLines = true,
  intensity = 'medium'
}) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Delay showing effects to prevent flash
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  const densityMap = {
    low: 0.4,
    medium: 0.8,
    high: 1.2
  }

  const speedMap = {
    low: 0.5,
    medium: 1,
    high: 1.5
  }

  return (
    <>
      {/* Matrix Digital Rain Background */}
      {showRain && (
        <MatrixRain
          density={densityMap[intensity]}
          speed={speedMap[intensity]}
          className="z-[-10]"
        />
      )}

      {/* Scan Lines Overlay */}
      {showScanLines && (
        <div
          className="fixed inset-0 pointer-events-none z-[5]"
          style={{
            background: `linear-gradient(
              transparent 0%,
              rgba(0, 255, 136, 0.03) 50%,
              transparent 51%,
              transparent 100%
            )`,
            backgroundSize: '100% 4px',
            animation: 'scan-lines 2s linear infinite'
          }}
        />
      )}

      {/* Matrix Glow Overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-[1]"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(0, 255, 136, 0.02) 0%, transparent 70%)',
          animation: 'pulse-matrix 4s ease-in-out infinite alternate'
        }}
      />

      {/* Terminal Screen Curvature Effect */}
      <div
        className="fixed inset-0 pointer-events-none z-[6]"
        style={{
          background: `
            radial-gradient(ellipse at center,
              transparent 60%,
              rgba(0, 0, 0, 0.1) 70%,
              rgba(0, 0, 0, 0.3) 100%
            )
          `,
          borderRadius: '1%',
        }}
      />

      {/* Subtle Grid Pattern */}
      <div
        className="fixed inset-0 pointer-events-none z-[2] opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 136, 1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 136, 1) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }}
      />

      <style jsx>{`
        @keyframes scan-lines {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100vh);
          }
        }
      `}</style>
    </>
  )
}

export default MatrixEffects