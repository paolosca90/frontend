export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-green-400 p-8">
      <div className="text-center space-y-8">
        {/* 404 Error */}
        <div className="space-y-4">
          <h1 className="text-8xl md:text-9xl font-mono font-bold text-green-400">
            404
          </h1>
          <h2 className="text-3xl md:text-4xl font-mono font-bold">
            PAGE NOT FOUND
          </h2>
        </div>

        {/* Matrix-themed message */}
        <div className="space-y-4">
          <p className="text-xl md:text-2xl font-mono">
            The path you seek does not exist in this reality.
          </p>
          <p className="text-lg font-mono text-green-300">
            Perhaps you took the wrong pill?
          </p>
        </div>

        {/* Navigation options */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-center mt-8">
          <a
            href="/"
            className="px-8 py-4 bg-green-600 text-black font-mono font-bold text-lg rounded hover:bg-green-500 transition-colors"
          >
            RETURN TO MATRIX
          </a>
          <a
            href="/dashboard"
            className="px-8 py-4 bg-blue-600 text-white font-mono font-bold text-lg rounded hover:bg-blue-500 transition-colors"
          >
            ENTER DASHBOARD
          </a>
        </div>

        {/* ASCII Art */}
        <div className="mt-12 text-sm font-mono text-green-300">
          <pre>{`
    ╔══════════════════════════════════════╗
    ║  ERROR: REALITY.EXE HAS STOPPED      ║
    ║  WORKING                             ║
    ║                                      ║
    ║  [RESTART] [DEBUG] [IGNORE]          ║
    ╚══════════════════════════════════════╝
          `}</pre>
        </div>
      </div>
    </div>
  )
}