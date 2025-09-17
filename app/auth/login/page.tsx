'use client'

import React, { useState, useEffect } from 'react'
import MatrixRain from '../../../components/matrix/MatrixRain'
import MatrixButton from '../../../components/ui/MatrixButton'
import MatrixTerminal from '../../../components/terminal/MatrixTerminal'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [terminalMode, setTerminalMode] = useState(false)
  const [authStatus, setAuthStatus] = useState('STANDBY')
  const [systemMessages, setSystemMessages] = useState<string[]>([])

  // Simulate system initialization
  useEffect(() => {
    const bootSequence = [
      'INITIALIZING MATRIX AUTH SYSTEM...',
      'LOADING SECURITY PROTOCOLS...',
      'ESTABLISHING ENCRYPTED CONNECTION...',
      'NEURAL NETWORK: ONLINE',
      'BIOMETRIC SENSORS: ACTIVE',
      'FIREWALL: ENGAGED',
      'AUTH SYSTEM: READY'
    ]

    bootSequence.forEach((message, index) => {
      setTimeout(() => {
        setSystemMessages(prev => [...prev, message])
        if (index === bootSequence.length - 1) {
          setAuthStatus('READY')
        }
      }, index * 800)
    })
  }, [])

  const addSystemMessage = (message: string) => {
    setSystemMessages(prev => [...prev, message])
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setAuthStatus('AUTHENTICATING')

    // Simulate authentication process with Matrix-style feedback
    addSystemMessage('AUTHENTICATION REQUEST RECEIVED...')

    setTimeout(() => {
      addSystemMessage('VALIDATING CREDENTIALS...')
    }, 500)

    setTimeout(() => {
      addSystemMessage('CHECKING BIOMETRIC DATA...')
    }, 1000)

    setTimeout(() => {
      addSystemMessage('RUNNING NEURAL VERIFICATION...')
    }, 1500)

    setTimeout(() => {
      addSystemMessage('ACCESS GRANTED')
      addSystemMessage('WELCOME TO THE MATRIX, USER')
      setAuthStatus('AUTHORIZED')
      setIsLoading(false)

      // Redirect to dashboard after successful login
      setTimeout(() => {
        window.location.href = '/dashboard'
      }, 2000)
    }, 2000)
  }

  const handleTerminalCommand = (command: string) => {
    if (command.toLowerCase().includes('login')) {
      setTerminalMode(false)
    } else if (command.toLowerCase().includes('help')) {
      addSystemMessage('TERMINAL COMMANDS: login, status, clear, exit')
    } else if (command.toLowerCase().includes('status')) {
      addSystemMessage(`AUTH STATUS: ${authStatus}`)
    } else if (command.toLowerCase().includes('exit')) {
      setTerminalMode(false)
    }
  }

  if (terminalMode) {
    return (
      <div className="min-h-screen relative bg-black">
        <MatrixRain className="absolute inset-0" intensity="high" speed={1.2} />

        <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
          <div className="w-full max-w-4xl">
            <MatrixTerminal
              title="MATRIX AUTH TERMINAL"
              height="600px"
              onCommand={handleTerminalCommand}
              welcomeMessage={`MATRIX AUTHENTICATION TERMINAL v2.0.1
=========================================
Security Level: MAXIMUM
Encryption: AES-256 + Quantum
Connection: ENCRYPTED
Status: ${authStatus}

Type 'login' for form interface or 'help' for commands.`}
              commands={['status', 'help']}
              autoType={true}
            />

            <div className="text-center mt-4">
              <MatrixButton
                variant="ghost"
                onClick={() => setTerminalMode(false)}
                icon={<span>←</span>}
                iconPosition="left"
              >
                BACK TO LOGIN
              </MatrixButton>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative bg-black text-matrix-green">
      {/* Matrix Rain Background - Enhanced for cyberpunk feel */}
      <MatrixRain className="absolute inset-0" intensity="medium" speed={0.8} />

      {/* System Status Overlay */}
      <div className="absolute top-4 right-4 z-20 text-xs font-matrix text-matrix-green/80 space-y-1">
        {systemMessages.slice(-3).map((msg, index) => (
          <div key={index} className="flex items-center gap-2 animate-pulse">
            <div className="w-1 h-1 bg-matrix-green rounded-full" />
            <span>{msg}</span>
          </div>
        ))}
      </div>

      {/* Terminal Mode Toggle */}
      <div className="absolute top-4 left-4 z-20">
        <MatrixButton
          variant="ghost"
          size="sm"
          onClick={() => setTerminalMode(true)}
          icon={<span>💻</span>}
          iconPosition="left"
        >
          TERMINAL
        </MatrixButton>
      </div>

      {/* Back Navigation */}
      <div className="absolute top-16 left-4 z-20">
        <MatrixButton
          variant="ghost"
          size="sm"
          onClick={() => window.location.href = '/'}
          icon={<span>←</span>}
          iconPosition="left"
        >
          HOME
        </MatrixButton>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center spacing-responsive">
        <div className="w-full max-w-md mx-auto">
          {/* Enhanced Login Card with Matrix terminal styling */}
          <div className="matrix-glass matrix-border-animated p-8 lg:p-10 relative overflow-hidden">
            {/* Corner Matrix decorations */}
            <div className="absolute top-2 left-2 w-8 h-8 border-l-2 border-t-2 border-matrix-green/50" />
            <div className="absolute top-2 right-2 w-8 h-8 border-r-2 border-t-2 border-matrix-green/50" />
            <div className="absolute bottom-2 left-2 w-8 h-8 border-l-2 border-b-2 border-matrix-green/50" />
            <div className="absolute bottom-2 right-2 w-8 h-8 border-r-2 border-b-2 border-matrix-green/50" />

            {/* Scanning line effect */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="scan-line h-px bg-gradient-to-r from-transparent via-matrix-green to-transparent opacity-30" />
            </div>

            {/* Header with enhanced Matrix styling */}
            <div className="text-center mb-8">
              <div className="matrix-glitch text-responsive-2xl font-matrix font-bold text-matrix-green mb-2" data-text="MATRIX ACCESS">
                MATRIX ACCESS
              </div>
              <p className="text-responsive-base font-matrix text-matrix-green/80 tracking-wider">
                AUTHENTICATE TO ENTER THE SYSTEM
              </p>
              <div className="w-20 h-0.5 bg-matrix-green mx-auto mt-4 animate-pulse-matrix" />

              {/* Status indicator */}
              <div className="mt-4 flex items-center justify-center gap-2">
                <div className={`w-2 h-2 rounded-full animate-pulse ${
                  authStatus === 'READY' ? 'bg-green-400' :
                  authStatus === 'AUTHENTICATING' ? 'bg-yellow-400' :
                  authStatus === 'AUTHORIZED' ? 'bg-green-400' :
                  'bg-red-400'
                }`} />
                <span className="text-xs font-matrix text-matrix-green/60">
                  STATUS: {authStatus}
                </span>
              </div>
            </div>

            {/* Enhanced Login Form with Matrix terminal styling */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field with terminal styling */}
              <div className="matrix-form-group">
                <label htmlFor="email" className="font-matrix text-xs text-matrix-green/80 tracking-wider">
                  [USER_IDENTITY]
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-matrix-green/60 font-matrix">
                    user@matrix:~$
                  </span>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="matrix-input w-full pl-24 pr-4 py-3 text-responsive-base font-matrix bg-black/40 border-matrix-green/50"
                    placeholder="identity@matrix.net"
                    autoComplete="email"
                  />
                </div>
              </div>

              {/* Password Field with terminal styling */}
              <div className="matrix-form-group">
                <label htmlFor="password" className="font-matrix text-xs text-matrix-green/80 tracking-wider">
                  [ACCESS_KEY]
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-matrix-green/60 font-matrix">
                    key@matrix:~$
                  </span>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="matrix-input w-full pl-20 pr-12 py-3 text-responsive-base font-matrix bg-black/40 border-matrix-green/50 font-mono"
                    placeholder="••••••••••••••••"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-matrix-green/60 hover:text-matrix-green transition-colors"
                  >
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
              </div>

              {/* Enhanced Security Options */}
              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="matrix-checkbox w-4 h-4 text-matrix-green bg-transparent border-matrix-green rounded focus:ring-matrix-green focus:ring-2"
                  />
                  <span className="font-matrix text-matrix-green/80">PERSIST_SESSION</span>
                </label>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="font-matrix text-matrix-green/60">256-bit_AES</span>
                </div>
              </div>

              {/* Enhanced Submit Button */}
              <MatrixButton
                type="submit"
                variant="glow"
                size="lg"
                fullWidth
                loading={isLoading}
                disabled={!email || !password || authStatus !== 'READY'}
                className="mt-8 border-2"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    INITIATING PROTOCOL...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    🔓 AUTHENTICATE IDENTITY
                  </span>
                )}
              </MatrixButton>
            </form>

            {/* Enhanced Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-matrix-green/20" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-black text-matrix-green/60 font-matrix text-xs">
                  ALTERNATIVE_AUTH_METHODS
                </span>
              </div>
            </div>

            {/* Enhanced Social Login */}
            <div className="space-y-3">
              <MatrixButton
                variant="secondary"
                size="md"
                fullWidth
                icon={<span>🔐</span>}
                iconPosition="left"
                className="border-matrix-green/30"
              >
                GOOGLE_OAUTH_2.0
              </MatrixButton>

              <MatrixButton
                variant="ghost"
                size="md"
                fullWidth
                icon={<span>🧬</span>}
                iconPosition="left"
                onClick={() => setTerminalMode(true)}
              >
                BIOMETRIC_AUTH
              </MatrixButton>
            </div>

            {/* Enhanced Links */}
            <div className="text-center mt-8 space-y-2">
              <p className="font-matrix text-matrix-green/70 text-sm">
                NO_IDENTITY?{' '}
                <a
                  href="/auth/register"
                  className="text-matrix-bright-green hover:text-matrix-green transition-colors font-bold underline"
                >
                  CREATE_NEW_IDENTITY
                </a>
              </p>
              <a
                href="/auth/forgot-password"
                className="block font-matrix text-matrix-green/60 hover:text-matrix-green text-xs transition-colors"
              >
                LOST_ACCESS_KEY? → RECOVERY_PROTOCOL
              </a>
            </div>
          </div>

          {/* Enhanced System Status */}
          <div className="matrix-glass p-4 mt-6">
            <div className="text-center text-xs font-matrix text-matrix-green/60 space-y-1">
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-matrix-green rounded-full animate-pulse-matrix" />
                <span>AUTH_SYSTEM: {authStatus}</span>
              </div>
              <div>ENCRYPTION: AES-256-QUANTUM</div>
              <div>FIREWALL: ACTIVE•INTRUSION_DETECTION: ENABLED</div>
              <div>UPTIME: 47:33:12 • LATENCY: 0.085ms</div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="mobile-nav lg:hidden">
        <div className="flex items-center justify-center w-full">
          <MatrixButton
            variant="ghost"
            size="sm"
            onClick={() => window.location.href = '/auth/register'}
            className="mx-4"
          >
            CREATE IDENTITY
          </MatrixButton>
        </div>
      </div>

      {/* Add scan line animation */}
      <style jsx>{`
        .scan-line {
          animation: scan 8s linear infinite;
        }

        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </div>
  )
}