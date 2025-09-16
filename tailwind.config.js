/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Matrix Theme Colors
        matrix: {
          green: '#00ff88',
          'dark-green': '#003322',
          'bright-green': '#88ff88',
          black: '#000000',
          'dark-gray': '#111111',
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        // Matrix-specific animations
        'matrix-fall': {
          '0%': {
            transform: 'translateY(-100vh)',
            opacity: '0'
          },
          '10%': {
            opacity: '1'
          },
          '90%': {
            opacity: '1'
          },
          '100%': {
            transform: 'translateY(100vh)',
            opacity: '0'
          }
        },
        'scan-lines': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        'glitch-skew': {
          '0%': { transform: 'skew(0deg)' },
          '10%': { transform: 'skew(2deg)' },
          '20%': { transform: 'skew(0deg)' },
          '30%': { transform: 'skew(-2deg)' },
          '40%': { transform: 'skew(0deg)' },
          '50%': { transform: 'skew(1deg)' },
          '60%': { transform: 'skew(0deg)' },
          '70%': { transform: 'skew(-1deg)' },
          '80%': { transform: 'skew(0deg)' },
          '90%': { transform: 'skew(2deg)' },
          '100%': { transform: 'skew(0deg)' }
        },
        'pulse-matrix': {
          '0%, 100%': {
            opacity: '1',
            textShadow: '0 0 5px #00ff88'
          },
          '50%': {
            opacity: '0.5',
            textShadow: '0 0 20px #00ff88'
          }
        },
        'typewriter': {
          from: { width: '0' },
          to: { width: '100%' }
        },
        'blink-cursor': {
          'from, to': { borderColor: 'transparent' },
          '50%': { borderColor: '#00ff88' }
        },
        'matrix-slide-in': {
          from: {
            transform: 'translateX(100%)',
            opacity: '0'
          },
          to: {
            transform: 'translateX(0)',
            opacity: '1'
          }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        // Matrix animations
        'matrix-fall': 'matrix-fall linear infinite',
        'scan-lines': 'scan-lines 2s linear infinite',
        'glitch-skew': 'glitch-skew 1s infinite linear alternate-reverse',
        'pulse-matrix': 'pulse-matrix 2s infinite',
        'typewriter': 'typewriter 4s steps(40, end), blink-cursor 0.75s step-end infinite',
        'matrix-slide-in': 'matrix-slide-in 0.3s ease-out'
      },
      fontFamily: {
        'mono': ['Courier Prime', 'Source Code Pro', 'Courier New', 'Monaco', 'Lucida Console', 'monospace'],
      },
      boxShadow: {
        'matrix': '0 0 15px rgba(0, 255, 136, 0.3)',
        'matrix-strong': '0 0 30px rgba(0, 255, 136, 0.5)',
      },
      textShadow: {
        'matrix': '0 0 10px #00ff88',
        'matrix-strong': '0 0 20px #00ff88',
      }
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
    // Add text shadow plugin
    function({ addUtilities }) {
      const newUtilities = {
        '.text-shadow-matrix': {
          textShadow: '0 0 10px #00ff88',
        },
        '.text-shadow-matrix-strong': {
          textShadow: '0 0 20px #00ff88',
        },
        '.glow-matrix': {
          textShadow: '0 0 10px #00ff88',
          boxShadow: '0 0 20px rgba(0, 255, 136, 0.5)',
        },
      }
      addUtilities(newUtilities)
    }
  ],
}