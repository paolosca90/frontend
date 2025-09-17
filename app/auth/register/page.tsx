'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import MatrixRain from '../../../components/matrix/MatrixRain'
import MatrixButton from '../../../components/ui/MatrixButton'
import { authAPI, handleAPIError } from '../../../lib/api'

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long')
      return
    }

    setIsLoading(true)

    try {
      // Split name into first and last name
      const nameParts = formData.name.trim().split(' ')
      const firstName = nameParts[0] || ''
      const lastName = nameParts.slice(1).join(' ')

      // Call registration API
      const response = await authAPI.register(
        formData.email,
        formData.password,
        firstName,
        lastName
      )

      // Store the token
      if (response.token) {
        localStorage.setItem('matrix_token', response.token)
      }

      // Redirect to dashboard or login page
      router.push('/dashboard')

    } catch (err: any) {
      console.error('Registration error:', err)
      setError(handleAPIError(err))
    } finally {
      setIsLoading(false)
    }
  }

  const isFormValid = formData.name && formData.email && formData.password &&
                     formData.confirmPassword && agreedToTerms &&
                     formData.password === formData.confirmPassword

  return (
    <div className="min-h-screen relative bg-black text-matrix-green">
      {/* Matrix Rain Background */}
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
          {/* Registration Card */}
          <div className="matrix-glass matrix-border-animated p-8 lg:p-10">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-responsive-2xl font-matrix font-bold text-matrix-green mb-2 animate-matrix-glow">
                JOIN MATRIX
              </h1>
              <p className="text-responsive-base font-matrix text-matrix-green/80">
                Begin Your Digital Evolution
              </p>
              <div className="w-16 h-0.5 bg-matrix-green mx-auto mt-4 animate-pulse-matrix" />
            </div>

            {/* Error Display */}
            {error && (
              <div className="bg-red-900/20 border border-red-500 rounded-lg p-4 mb-6">
                <p className="text-red-400 font-matrix text-sm">{error}</p>
              </div>
            )}

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div className="matrix-form-group">
                <label htmlFor="name" className="font-matrix">
                  AGENT_NAME
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="matrix-input w-full px-4 py-3 text-responsive-base font-matrix"
                  placeholder="Thomas Anderson"
                  autoComplete="name"
                />
              </div>

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
                  value={formData.email}
                  onChange={handleChange}
                  className="matrix-input w-full px-4 py-3 text-responsive-base font-matrix"
                  placeholder="neo@matrix.com"
                  autoComplete="email"
                />
              </div>

              {/* Password Field */}
              <div className="matrix-form-group">
                <label htmlFor="password" className="font-matrix">
                  ACCESS_KEY
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="matrix-input w-full px-4 py-3 pr-12 text-responsive-base font-matrix"
                    placeholder="••••••••••••••••"
                    autoComplete="new-password"
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

              {/* Confirm Password Field */}
              <div className="matrix-form-group">
                <label htmlFor="confirmPassword" className="font-matrix">
                  VERIFY_ACCESS_KEY
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`matrix-input w-full px-4 py-3 pr-12 text-responsive-base font-matrix ${
                      formData.confirmPassword && formData.password !== formData.confirmPassword
                        ? 'border-red-500'
                        : ''
                    }`}
                    placeholder="••••••••••••••••"
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-matrix-green/60 hover:text-matrix-green transition-colors"
                  >
                    {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
                {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                  <p className="text-red-400 text-xs font-matrix mt-1">ACCESS_KEYS_DO_NOT_MATCH</p>
                )}
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-1 w-4 h-4 text-matrix-green bg-transparent border-matrix-green rounded focus:ring-matrix-green focus:ring-2"
                />
                <label htmlFor="terms" className="text-sm font-matrix text-matrix-green/80 cursor-pointer">
                  I agree to the{' '}
                  <a href="/terms" className="text-matrix-bright-green hover:text-matrix-green transition-colors">
                    MATRIX_PROTOCOLS
                  </a>{' '}
                  and{' '}
                  <a href="/privacy" className="text-matrix-bright-green hover:text-matrix-green transition-colors">
                    PRIVACY_CONSTRAINTS
                  </a>
                </label>
              </div>

              {/* Submit Button */}
              <MatrixButton
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                loading={isLoading}
                disabled={!isFormValid}
                className="mt-8"
              >
                {isLoading ? 'INITIALIZING_AGENT...' : 'JOIN_REVOLUTION'}
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

            {/* Social Registration */}
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
                ALREADY_IN_MATRIX?{' '}
                <a
                  href="/auth/login"
                  className="text-matrix-bright-green hover:text-matrix-green transition-colors font-bold"
                >
                  ACCESS_TERMINAL
                </a>
              </p>
            </div>
          </div>

          {/* System Status */}
          <div className="text-center mt-6 text-xs font-matrix text-matrix-green/60 space-y-1">
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-matrix-green rounded-full animate-pulse-matrix" />
              <span>REGISTRATION: ACTIVE</span>
            </div>
            <div>NEW_AGENTS: WELCOME</div>
            <div>SECURITY: QUANTUM_ENCRYPTED</div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="mobile-nav lg:hidden">
        <div className="flex items-center justify-center w-full">
          <MatrixButton
            variant="ghost"
            size="sm"
            onClick={() => window.location.href = '/auth/login'}
            className="mx-4"
          >
            ALREADY MEMBER
          </MatrixButton>
        </div>
      </div>
    </div>
  )
}