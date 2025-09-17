'use client'

import React, { useEffect, useRef, useState } from 'react'

interface MatrixRainProps {
  className?: string
  density?: number
  speed?: number
  onlyMobile?: boolean
  intensity?: 'low' | 'medium' | 'high' | 'extreme'
}

const MatrixRain: React.FC<MatrixRainProps> = ({
  className = '',
  density = 0.7,
  speed = 1,
  onlyMobile = false,
  intensity = 'medium'
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const [isVisible, setIsVisible] = useState(true)

  // Intensity settings
  const intensitySettings = {
    low: { fontSize: 14, spacing: 25, fadeSpeed: 0.02, charDensity: 0.6 },
    medium: { fontSize: 16, spacing: 20, fadeSpeed: 0.04, charDensity: 0.8 },
    high: { fontSize: 18, spacing: 18, fadeSpeed: 0.05, charDensity: 1.0 },
    extreme: { fontSize: 20, spacing: 15, fadeSpeed: 0.08, charDensity: 1.2 }
  }

  const settings = intensitySettings[intensity]

  useEffect(() => {
    // Enhanced visibility check with performance optimization
    const shouldShow = () => {
      if (onlyMobile) {
        return window.innerWidth <= 768
      }

      // Always show on desktop for Matrix effect
      if (window.innerWidth > 768) {
        // Check for reduced motion preference
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          return intensity === 'low'
        }

        // Performance-based intensity adjustment
        const isHighPerformance = navigator.hardwareConcurrency >= 6 && navigator.deviceMemory >= 4
        if (!isHighPerformance && intensity === 'extreme') {
          return false
        }
        return true
      }

      // Mobile optimization
      return intensity === 'low' && navigator.hardwareConcurrency >= 4
    }

    setIsVisible(shouldShow())

    const handleResize = () => {
      setIsVisible(shouldShow())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [onlyMobile, intensity])

  useEffect(() => {
    if (!isVisible) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    // Enhanced Matrix character sets for authentic feel
    const matrixChars = {
      katakana: 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン',
      hiragana: 'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん',
      numbers: '0123456789',
      latin: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?~`',
      matrix: '田由甲申甴电甶男甸甹町画甼甽甾甿畀畁畂畃畄畅畆畇畈畉畊畋界畍畎畏畐畑',
      binary: '01'
    }

    // Combine all character sets
    const allChars = Object.values(matrixChars).join('')
    const chars = allChars.split('')

    // Rain drop data structure
    interface RainDrop {
      x: number
      y: number
      speed: number
      chars: string[]
      brightness: number
      length: number
      trail: { char: string; brightness: number }[]
    }

    let drops: RainDrop[] = []
    let columns: number

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      columns = Math.floor(canvas.width / settings.spacing) * density

      // Initialize rain drops
      drops = []
      for (let i = 0; i < columns; i++) {
        drops.push(createRainDrop(i))
      }
    }

    const createRainDrop = (columnIndex: number): RainDrop => {
      const x = columnIndex * (canvas.width / columns) + settings.spacing / 2
      const length = Math.floor(Math.random() * 20) + 10 // Trail length

      return {
        x,
        y: Math.random() * canvas.height - canvas.height, // Start above screen
        speed: (Math.random() * 2 + 1) * speed,
        chars: Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]),
        brightness: Math.random() * 0.5 + 0.5,
        length,
        trail: []
      }
    }

    const draw = () => {
      // Create authentic Matrix fade effect
      ctx.fillStyle = `rgba(0, 0, 0, ${settings.fadeSpeed})`
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Set up text rendering
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      drops.forEach((drop, index) => {
        // Update drop position
        drop.y += drop.speed

        // Add new character to trail
        if (Math.random() > 0.7) {
          const newChar = chars[Math.floor(Math.random() * chars.length)]
          drop.trail.unshift({
            char: newChar,
            brightness: drop.brightness
          })
        }

        // Limit trail length
        if (drop.trail.length > drop.length) {
          drop.trail.pop()
        }

        // Draw trail with authentic Matrix effect
        drop.trail.forEach((segment, trailIndex) => {
          const trailY = drop.y - trailIndex * settings.fontSize

          if (trailY > 0 && trailY < canvas.height) {
            // Head of the trail (brightest)
            if (trailIndex === 0) {
              ctx.fillStyle = `rgba(255, 255, 255, ${segment.brightness})`
              ctx.shadowColor = '#00ff88'
              ctx.shadowBlur = 15
            }
            // Middle of trail (Matrix green)
            else if (trailIndex < drop.length * 0.3) {
              const fadeAmount = 1 - (trailIndex / (drop.length * 0.3))
              ctx.fillStyle = `rgba(0, 255, 136, ${segment.brightness * fadeAmount})`
              ctx.shadowColor = '#00ff88'
              ctx.shadowBlur = 10 * fadeAmount
            }
            // Tail of trail (fading green)
            else {
              const fadeAmount = Math.max(0, 1 - (trailIndex / drop.length))
              ctx.fillStyle = `rgba(0, 100, 68, ${segment.brightness * fadeAmount * 0.5})`
              ctx.shadowBlur = 0
            }

            // Add glitch effect randomly
            if (Math.random() > 0.99) {
              ctx.fillStyle = `rgba(255, 0, 100, ${segment.brightness * 0.8})`
            }

            ctx.font = `${settings.fontSize}px var(--font-jetbrains-mono), monospace`
            ctx.fillText(segment.char, drop.x, trailY)
          }
        })

        // Reset drop when it goes off screen
        if (drop.y > canvas.height + drop.length * settings.fontSize) {
          if (Math.random() > 0.98) { // Random reset for authentic feel
            drops[index] = createRainDrop(index)
          }
        }
      })

      // Randomly add new drops for dynamic effect
      if (Math.random() > 0.95 && drops.length < columns * settings.charDensity) {
        const randomColumn = Math.floor(Math.random() * columns)
        if (!drops[randomColumn] || drops[randomColumn].y > canvas.height * 0.5) {
          drops[randomColumn] = createRainDrop(randomColumn)
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

    // Handle resize with debouncing
    let resizeTimeout: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(resizeCanvas, 100)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(resizeTimeout)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isVisible, density, speed, intensity, settings])

  if (!isVisible) {
    return null
  }

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      style={{
        mixBlendMode: 'screen',
        opacity: intensity === 'extreme' ? 0.8 : 0.6,
      }}
    />
  )
}

export default MatrixRain