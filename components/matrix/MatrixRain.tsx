'use client'

import React, { useEffect, useRef, useState } from 'react'

interface MatrixRainProps {
  className?: string
  density?: number
  speed?: number
  onlyMobile?: boolean
}

const MatrixRain: React.FC<MatrixRainProps> = ({
  className = '',
  density = 0.5,
  speed = 1,
  onlyMobile = false
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Check if we should show matrix rain based on device and performance
    const shouldShow = () => {
      if (onlyMobile) {
        return window.innerWidth <= 768
      }

      // Hide on mobile by default for performance
      if (window.innerWidth <= 768) {
        return false
      }

      // Check for reduced motion preference
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return false
      }

      // Basic performance check
      const isHighPerformance = navigator.hardwareConcurrency >= 4
      return isHighPerformance
    }

    setIsVisible(shouldShow())

    const handleResize = () => {
      setIsVisible(shouldShow())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [onlyMobile])

  useEffect(() => {
    if (!isVisible) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Matrix characters (Japanese katakana, numbers, and symbols)
    const matrixChars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+-=[]{}|;:,.<>?'
    const chars = matrixChars.split('')

    let columns: number
    let drops: number[]

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      columns = Math.floor(canvas.width / 20) * density
      drops = []

      for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * canvas.height
      }
    }

    const draw = () => {
      // Create trailing effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.04)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Set text properties
      ctx.fillStyle = '#00ff88'
      ctx.font = '16px var(--font-jetbrains-mono), monospace'
      ctx.textAlign = 'center'

      // Draw characters
      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)]
        const x = i * (canvas.width / columns)
        const y = drops[i]

        // Add some randomness to brightness
        const brightness = Math.random() * 0.5 + 0.5
        ctx.fillStyle = `rgba(0, 255, 136, ${brightness})`

        // Add glow effect randomly
        if (Math.random() > 0.95) {
          ctx.shadowColor = '#00ff88'
          ctx.shadowBlur = 10
        } else {
          ctx.shadowBlur = 0
        }

        ctx.fillText(char, x, y)

        // Reset drop to top randomly or continue falling
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        } else {
          drops[i] = y + (20 * speed)
        }
      }
    }

    const animate = () => {
      draw()
      animationRef.current = requestAnimationFrame(animate)
    }

    // Initialize
    resizeCanvas()
    animate()

    // Handle resize
    const handleResize = () => {
      resizeCanvas()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isVisible, density, speed])

  if (!isVisible) {
    return null
  }

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      style={{
        mixBlendMode: 'screen',
        opacity: 0.6,
      }}
    />
  )
}

export default MatrixRain