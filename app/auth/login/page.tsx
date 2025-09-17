'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
// Temporary motion replacement for build fix
const motion = {
  div: (props: any) => {
    const { initial, animate, transition, ...rest } = props
    return <div {...rest} />
  }
}
import { Eye, EyeOff, Brain, Zap, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuthStore } from '@/lib/store/auth'
import { toast } from 'react-hot-toast'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { login, isLoading: authLoading, error } = useAuthStore()
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await login(email, password)
      toast.success('Neural link established successfully!')
      router.push('/dashboard')
    } catch (error: any) {
      toast.error(error.message || 'Access denied. Check your credentials.')
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
        <Button variant="outline" size="sm" asChild>
          <Link href="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Exit
          </Link>
        </Button>
      </div>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="bg-black/90 border-matrix-green/30 backdrop-blur-sm">
          <CardHeader className="text-center pb-8">
            <div className="w-16 h-16 bg-matrix-green/20 border border-matrix-green rounded-xl flex items-center justify-center mx-auto mb-4">
              <Brain className="w-8 h-8 text-matrix-green" />
            </div>
            <CardTitle className="text-2xl font-bold text-white mb-2">
              ACCESS <span className="text-matrix-green font-mono">MATRIX</span>
            </CardTitle>
            <p className="text-gray-400 text-sm">
              Enter your credentials to establish neural link
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-400 text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-matrix-green font-mono text-sm">
                  EMAIL_ADDRESS
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-black border-matrix-green/30 text-white placeholder:text-gray-500 focus:border-matrix-green focus:ring-matrix-green"
                  placeholder="your.email@domain.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-matrix-green font-mono text-sm">
                  SECURE_KEY
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-black border-matrix-green/30 text-white placeholder:text-gray-500 focus:border-matrix-green focus:ring-matrix-green pr-12"
                    placeholder="••••••••••••"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-matrix-green"
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

              <Button
                type="submit"
                className="w-full bg-matrix-green text-black hover:bg-matrix-green/90"
                size="lg"
                disabled={isLoading || authLoading}
              >
                {isLoading || authLoading ? (
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 animate-pulse" />
                    ESTABLISHING CONNECTION...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    JACK IN
                  </div>
                )}
              </Button>

              <div className="text-center">
                <Link
                  href="/auth/forgot-password"
                  className="text-sm text-matrix-green hover:text-matrix-green/80 font-mono"
                >
                  FORGOT_ACCESS_KEY?
                </Link>
              </div>
            </form>

            <div className="mt-8 pt-6 border-t border-matrix-green/20">
              <div className="text-center space-y-4">
                <p className="text-gray-400 text-sm">
                  Need system access?
                </p>
                <Button variant="outline" size="lg" className="w-full border-matrix-green text-matrix-green hover:bg-matrix-green/10" asChild>
                  <Link href="/auth/register">
                    <Brain className="w-4 h-4 mr-2" />
                    REQUEST_ACCESS
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Matrix-style footer */}
        <div className="text-center mt-6">
          <p className="text-gray-500 text-xs font-mono">
            &gt; SECURE_CONNECTION_PROTOCOL_v2.1_
          </p>
        </div>
      </motion.div>
    </div>
  )
}