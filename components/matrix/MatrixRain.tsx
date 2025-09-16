'use client'

import React, { useEffect, useRef, useCallback } from 'react'

interface MatrixRainProps {
  density?: number
  speed?: number
  className?: string
}

const MatrixRain: React.FC<MatrixRainProps> = ({
  density = 0.8,
  speed = 1,
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number>()

  // Matrix characters (Japanese katakana, numbers, symbols)
  const matrixCharacters = [
    'ア', 'イ', 'ウ', 'エ', 'オ', 'カ', 'キ', 'ク', 'ケ', 'コ',
    'サ', 'シ', 'ス', 'セ', 'ソ', 'タ', 'チ', 'ツ', 'テ', 'ト',
    'ナ', 'ニ', 'ヌ', 'ネ', 'ノ', 'ハ', 'ヒ', 'フ', 'ヘ', 'ホ',
    'マ', 'ミ', 'ム', 'メ', 'モ', 'ヤ', 'ユ', 'ヨ', 'ラ', 'リ',
    'ル', 'レ', 'ロ', 'ワ', 'ヲ', 'ン',
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
    'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
    'U', 'V', 'W', 'X', 'Y', 'Z',
    '!', '@', '#', '$', '%', '^', '&', '*', '(', ')',
    '-', '_', '+', '=', '[', ']', '{', '}', '|', '\\',
    ':', ';', '"', "'", '<', '>', ',', '.', '?', '/',
    '~', '`'
  ]

  interface Drop {
    x: number
    y: number
    speed: number
    characters: string[]
    brightness: number[]
  }

  const initializeCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return null

    const ctx = canvas.getContext('2d')
    if (!ctx) return null

    // Set canvas size
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      ctx.fillStyle = '#000000'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }

    updateCanvasSize()
    window.addEventListener('resize', updateCanvasSize)

    return { ctx, cleanup: () => window.removeEventListener('resize', updateCanvasSize) }
  }, [])

  const createDrops = useCallback((width: number, height: number): Drop[] => {
    const fontSize = 14
    const columns = Math.floor(width / fontSize)
    const drops: Drop[] = []

    for (let i = 0; i < columns * density; i++) {
      const dropHeight = Math.floor(Math.random() * 20) + 10
      drops.push({
        x: Math.floor(Math.random() * columns) * fontSize,
        y: Math.random() * -height,
        speed: (Math.random() * 2 + 1) * speed,
        characters: Array.from({ length: dropHeight }, () =>
          matrixCharacters[Math.floor(Math.random() * matrixCharacters.length)]
        ),
        brightness: Array.from({ length: dropHeight }, (_, index) =>
          Math.max(0, 1 - (index / dropHeight))
        )
      })
    }

    return drops
  }, [density, speed, matrixCharacters])

  const animate = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Semi-transparent black overlay for trailing effect
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    const drops = createDrops(canvas.width, canvas.height)

    const renderFrame = () => {
      // Clear with slight transparency for trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.font = '14px "Courier Prime", monospace'
      ctx.textAlign = 'left'

      drops.forEach(drop => {
        // Update position
        drop.y += drop.speed

        // Reset drop if it goes off screen
        if (drop.y > canvas.height + drop.characters.length * 20) {
          drop.y = Math.random() * -canvas.height
          drop.x = Math.floor(Math.random() * (canvas.width / 14)) * 14
          drop.speed = (Math.random() * 2 + 1) * speed

          // Randomize characters occasionally
          if (Math.random() < 0.1) {
            drop.characters = drop.characters.map(() =>
              matrixCharacters[Math.floor(Math.random() * matrixCharacters.length)]
            )
          }
        }

        // Draw each character in the drop
        drop.characters.forEach((char, index) => {
          const charY = drop.y + (index * 20)
          const brightness = drop.brightness[index]

          if (charY > 0 && charY < canvas.height + 20) {
            // Leading character is brightest (white/bright green)
            if (index === 0) {
              ctx.fillStyle = '#ffffff'
              ctx.shadowColor = '#00ff88'
              ctx.shadowBlur = 10
            }
            // Following characters fade from bright green to dark green
            else {
              const alpha = brightness * 0.8
              ctx.fillStyle = `rgba(0, 255, 136, ${alpha})`
              ctx.shadowColor = '#00ff88'
              ctx.shadowBlur = 5 * brightness
            }

            // Add slight randomness to character position
            const jitter = (Math.random() - 0.5) * 2
            ctx.fillText(char, drop.x + jitter, charY)
          }
        })

        // Reset shadow
        ctx.shadowBlur = 0
      })

      animationFrameRef.current = requestAnimationFrame(renderFrame)
    }

    renderFrame()
  }, [createDrops, speed, matrixCharacters])

  useEffect(() => {
    const canvasSetup = initializeCanvas()
    if (!canvasSetup) return

    const { cleanup } = canvasSetup

    // Start animation
    animate()

    return () => {
      cleanup()
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [initializeCanvas, animate])

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 w-full h-full pointer-events-none z-0 ${className}`}
      style={{
        background: '#000000',
        mixBlendMode: 'normal'
      }}
    />
  )
}

export default MatrixRain