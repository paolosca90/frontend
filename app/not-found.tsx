'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Brain } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="text-center space-y-8 max-w-md">
        {/* Matrix-style 404 */}
        <div className="space-y-4">
          <h1 className="text-8xl font-mono font-bold text-matrix-green glow-matrix">
            404
          </h1>
          <h2 className="text-2xl font-mono text-white">
            SYSTEM_ERROR
          </h2>
        </div>

        {/* Error message */}
        <div className="space-y-4">
          <p className="text-matrix-green font-mono text-lg">
            ACCESS_DENIED: Page not found in the Matrix
          </p>
          <p className="text-gray-400 text-sm">
            The neural pathway you're looking for doesn't exist in this reality.
          </p>
        </div>

        {/* Action buttons */}
        <div className="space-y-4">
          <Button
            className="w-full bg-matrix-green text-black hover:bg-matrix-green/90"
            size="lg"
            asChild
          >
            <Link href="/">
              <Brain className="w-4 h-4 mr-2" />
              RETURN_TO_MATRIX
            </Link>
          </Button>

          <Button
            variant="outline"
            className="w-full border-matrix-green text-matrix-green hover:bg-matrix-green/10"
            asChild
          >
            <Link href="/dashboard">
              <ArrowLeft className="w-4 h-4 mr-2" />
              ACCESS_DASHBOARD
            </Link>
          </Button>
        </div>

        {/* Matrix footer */}
        <div className="text-center">
          <p className="text-gray-500 text-xs font-mono">
            &gt; ERROR_404_NEURAL_LINK_NOT_FOUND_
          </p>
        </div>
      </div>
    </div>
  )
}