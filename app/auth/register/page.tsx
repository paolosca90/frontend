'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Brain, Zap, ArrowLeft, User, Mail, Lock } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuthStore } from '@/lib/store/auth'
import { toast } from 'react-hot-toast'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { register, isLoading: authLoading, error } = useAuthStore()
  const router = useRouter()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    if (password !== confirmPassword) {
      toast.error('Security keys do not match')
      setIsLoading(false)
      return
    }

    if (password.length < 8) {
      toast.error('Security key must be at least 8 characters')
      setIsLoading(false)
      return
    }

    try {
      await register(email, password, name)
      toast.success('Neural interface activated! Welcome to the Matrix.')
      router.push('/dashboard')
    } catch (error: any) {
      toast.error(error.message || 'System access denied. Try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center p-4">
      {/* Matrix Background Effect */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full bg-matrix-500">
          <div className="grid grid-cols-20 h-full animate-matrix-rain">
            {Array.from({ length: 100 }, (_, i) => (
              <div key={i} className="text-matrix-500 text-xs">
                {Math.random() > 0.5 ? '1' : '0'}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="absolute top-4 left-4 z-20">
        <Button variant="matrix-outline" size="sm" asChild>
          <Link href="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Exit
          </Link>
        </Button>
      </div>

      {/* Register Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="bg-matrix-dark-200/90 border-matrix-500/30 backdrop-blur-sm">
          <CardHeader className="text-center pb-8">
            <div className="w-16 h-16 bg-matrix-500/20 border border-matrix-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Brain className="w-8 h-8 text-matrix-500" />
            </div>
            <CardTitle className="text-2xl font-bold text-white mb-2">
              REQUEST <span className="text-matrix-500 font-mono">ACCESS</span>
            </CardTitle>
            <p className="text-gray-400 text-sm">
              Initialize your neural interface to the trading matrix
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleRegister} className="space-y-6">
              {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-400 text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="name" className="text-matrix-500 font-mono text-sm">
                  USER_IDENTITY
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-matrix-dark-300 border-matrix-500/30 text-white placeholder:text-gray-500 focus:border-matrix-500 focus:ring-matrix-500 pl-10"
                    placeholder="Enter your name"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-matrix-500 font-mono text-sm">
                  NEURAL_ADDRESS
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-matrix-dark-300 border-matrix-500/30 text-white placeholder:text-gray-500 focus:border-matrix-500 focus:ring-matrix-500 pl-10"
                    placeholder="your.email@domain.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-matrix-500 font-mono text-sm">
                  SECURITY_KEY
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-matrix-dark-300 border-matrix-500/30 text-white placeholder:text-gray-500 focus:border-matrix-500 focus:ring-matrix-500 pl-10 pr-12"
                    placeholder="••••••••••••"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-matrix-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-matrix-500 font-mono text-sm">
                  VERIFY_KEY
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="bg-matrix-dark-300 border-matrix-500/30 text-white placeholder:text-gray-500 focus:border-matrix-500 focus:ring-matrix-500 pl-10 pr-12"
                    placeholder="••••••••••••"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-matrix-500"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>

              <Button
                type="submit"
                variant="matrix"
                size="lg"
                className="w-full"
                disabled={isLoading || authLoading}
              >
                {isLoading || authLoading ? (
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 animate-pulse" />
                    INITIALIZING INTERFACE...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    ACTIVATE NEURAL LINK
                  </div>
                )}
              </Button>

              <div className="text-center text-xs text-gray-400">
                By activating your neural interface, you agree to the{' '}
                <Link href="/terms" className="text-matrix-500 hover:text-matrix-400 font-mono">
                  SYSTEM_PROTOCOLS
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-matrix-500 hover:text-matrix-400 font-mono">
                  DATA_ENCRYPTION_POLICY
                </Link>
              </div>
            </form>

            <div className="mt-8 pt-6 border-t border-matrix-500/20">
              <div className="text-center space-y-4">
                <p className="text-gray-400 text-sm">
                  Already connected to the Matrix?
                </p>
                <Button variant="matrix-outline" size="lg" className="w-full" asChild>
                  <Link href="/auth/login">
                    <Brain className="w-4 h-4 mr-2" />
                    ACCESS_EXISTING_LINK
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Matrix-style footer */}
        <div className="text-center mt-6">
          <p className="text-gray-500 text-xs font-mono">
            &gt; NEURAL_INTERFACE_PROTOCOL_v3.2_
          </p>
        </div>
      </motion.div>
    </div>
  )
}