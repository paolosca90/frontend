'use client'

import React, { useState } from 'react'
import MatrixRain from '../../../components/matrix/MatrixRain'
import MatrixButton from '../../../components/ui/MatrixButton'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate login process
    setTimeout(() => {
      setIsLoading(false)
      // Add actual login logic here
      console.log('Login attempt:', { email, password })
    }, 2000)
  }

  return (
    <div className="min-h-screen relative bg-black text-matrix-green">
      {/* Matrix Rain Background - Lighter density for focus */}
      <MatrixRain className="absolute inset-0" density={0.2} speed={0.5} />

      {/* Back Navigation */}
      <div className="absolute top-4 left-4 z-20">
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
          {/* Login Card */}
          <div className="matrix-glass matrix-border-animated p-8 lg:p-10">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-responsive-2xl font-matrix font-bold text-matrix-green mb-2 animate-matrix-glow">
                MATRIX LOGIN
              </h1>
              <p className="text-responsive-base font-matrix text-matrix-green/80">
                Enter the Digital Realm
              </p>
              <div className="w-16 h-0.5 bg-matrix-green mx-auto mt-4 animate-pulse-matrix" />
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="matrix-form-group">
                <label htmlFor="email" className="font-matrix">
                  EMAIL_ADDRESS
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="matrix-input w-full px-4 py-3 text-responsive-base font-matrix"
                  placeholder="neo@matrix.com"
                  autoComplete="email"
                />
              </div>

              {/* Password Field */}
              <div className="matrix-form-group">
                <label htmlFor="password" className="font-matrix">
                  PASSWORD_KEY
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="matrix-input w-full px-4 py-3 pr-12 text-responsive-base font-matrix"
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

              {/* Remember Me */}
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="matrix-checkbox w-4 h-4 text-matrix-green bg-transparent border-matrix-green rounded focus:ring-matrix-green focus:ring-2"
                  />
                  <span className="text-sm font-matrix text-matrix-green/80">REMEMBER_SESSION</span>
                </label>
                <a
                  href="/auth/forgot-password"
                  className="text-sm font-matrix text-matrix-green/60 hover:text-matrix-green transition-colors"
                >
                  FORGOT_PASSWORD?
                </a>
              </div>

              {/* Submit Button */}
              <MatrixButton
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                loading={isLoading}
                disabled={!email || !password}
                className="mt-8"
              >
                {isLoading ? 'ACCESSING_MATRIX...' : 'ENTER_MATRIX'}
              </MatrixButton>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-matrix-green/30" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-black text-matrix-green/60 font-matrix">OR_CONNECT_VIA</span>
              </div>
            </div>

            {/* Social Login */}
            <div className="space-y-4">
              <MatrixButton
                variant="secondary"
                size="md"
                fullWidth
                icon={<span>🔑</span>}
                iconPosition="left"
              >
                GOOGLE_OAUTH
              </MatrixButton>
            </div>

            {/* Links */}
            <div className="text-center mt-8 space-y-4">
              <p className="font-matrix text-matrix-green/80">
                NEW_TO_MATRIX?{' '}
                <a
                  href="/auth/register"
                  className="text-matrix-bright-green hover:text-matrix-green transition-colors font-bold"
                >
                  CREATE_ACCOUNT
                </a>
              </p>
            </div>
          </div>

          {/* System Status */}
          <div className="text-center mt-6 text-xs font-matrix text-matrix-green/60 space-y-1">
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-matrix-green rounded-full animate-pulse-matrix" />
              <span>AUTH_SYSTEM: ONLINE</span>
            </div>
            <div>SECURITY_LEVEL: MAXIMUM</div>
            <div>ENCRYPTION: 256-BIT</div>
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
            CREATE ACCOUNT
          </MatrixButton>
        </div>
      </div>
    </div>
  )
}