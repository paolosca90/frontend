'use client'

import React, { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useMatrix } from '@/contexts/MatrixContext'
import TypewriterText from '@/components/ui/TypewriterText'
import MatrixButton from '@/components/ui/MatrixButton'
import MatrixInput from '@/components/ui/MatrixInput'

const MatrixLogin: React.FC = () => {
  const { login, register, error, clearError } = useAuth()
  const { sound, addToHistory, triggerGlitch } = useMatrix()

  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    // Show form after terminal introduction
    const timer = setTimeout(() => setShowForm(true), 3000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (error) {
      sound.play('error')
      triggerGlitch()
    }
  }, [error, sound, triggerGlitch])

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    sound.play('typing')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    clearError()

    try {
      if (isLogin) {
        addToHistory(`ATTEMPTING LOGIN: ${formData.email}`)
        await login(formData.email, formData.password)
        sound.play('success')
        addToHistory('LOGIN SUCCESSFUL - NEURAL LINK ESTABLISHED')
      } else {
        addToHistory(`REGISTERING NEW USER: ${formData.email}`)
        await register(formData.email, formData.password, formData.firstName, formData.lastName)
        sound.play('success')
        addToHistory('REGISTRATION COMPLETE - WELCOME TO THE MATRIX')
      }
    } catch (err) {
      addToHistory(`ERROR: ${error || 'Authentication failed'}`)
    } finally {
      setIsLoading(false)
    }
  }

  const toggleMode = () => {
    setIsLogin(!isLogin)
    setFormData({ email: '', password: '', firstName: '', lastName: '' })
    clearError()
    sound.play('beep')
  }

  if (!showForm) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-matrix-green px-4">
        <div className="matrix-terminal p-8 max-w-2xl w-full">
          <div className="space-y-4 font-mono">
            <TypewriterText
              text="> NEURAL INTERFACE ACTIVATED"
              speed={50}
              className="text-xl"
            />
            <TypewriterText
              text="> SCANNING FOR CONSCIOUSNESS..."
              speed={50}
              delay={1000}
              className="text-lg"
            />
            <TypewriterText
              text="> IDENTITY VERIFICATION REQUIRED"
              speed={50}
              delay={2000}
              className="text-lg"
            />
            <TypewriterText
              text="> PREPARE TO JACK IN"
              speed={50}
              delay={2500}
              className="text-xl text-matrix-bright"
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-matrix-green px-4 py-8">
      <div className="matrix-terminal p-8 max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8 space-y-4">
          <TypewriterText
            text={isLogin ? "> JACK INTO THE MATRIX" : "> CREATE NEURAL LINK"}
            speed={30}
            className="text-2xl font-bold"
          />
          <div className="text-sm text-matrix-dim">
            <TypewriterText
              text="Enter your credentials to access the trading matrix"
              speed={20}
              delay={1000}
            />
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 border border-red-500 bg-red-500/10 text-red-400 font-mono text-sm matrix-glitch">
            <TypewriterText
              text={`> ERROR: ${error}`}
              speed={20}
            />
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-mono mb-2 text-matrix-bright">
                  FIRST_NAME:
                </label>
                <MatrixInput
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  placeholder="Enter first name"
                />
              </div>
              <div>
                <label className="block text-sm font-mono mb-2 text-matrix-bright">
                  LAST_NAME:
                </label>
                <MatrixInput
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  placeholder="Enter last name"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-mono mb-2 text-matrix-bright">
              EMAIL_ADDRESS:
            </label>
            <MatrixInput
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-mono mb-2 text-matrix-bright">
              PASSWORD:
            </label>
            <MatrixInput
              type="password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <MatrixButton
            type="submit"
            disabled={isLoading}
            className="w-full text-lg py-4"
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="matrix-loading w-4 h-4"></div>
                <TypewriterText
                  text="ESTABLISHING CONNECTION..."
                  speed={30}
                  showCursor={false}
                />
              </div>
            ) : (
              <TypewriterText
                text={isLogin ? "JACK IN" : "CREATE LINK"}
                speed={20}
                showCursor={false}
              />
            )}
          </MatrixButton>
        </form>

        {/* Mode Toggle */}
        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={toggleMode}
            className="text-sm font-mono text-matrix-dim hover:text-matrix-bright transition-colors"
          >
            <TypewriterText
              text={isLogin
                ? "> Need neural link? CREATE_ACCOUNT"
                : "> Already linked? JACK_IN"
              }
              speed={20}
              showCursor={false}
            />
          </button>
        </div>

        {/* Google Login */}
        <div className="mt-6 pt-6 border-t border-matrix-green/20">
          <MatrixButton
            type="button"
            variant="secondary"
            className="w-full"
            onClick={() => {
              sound.play('beep')
              // TODO: Implement Google OAuth
              alert('Google OAuth integration coming soon!')
            }}
          >
            <TypewriterText
              text="QUICK_LINK: GOOGLE_AUTH"
              speed={20}
              showCursor={false}
            />
          </MatrixButton>
        </div>
      </div>
    </div>
  )
}

export default MatrixLogin