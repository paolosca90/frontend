export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-green-400 p-8">
      <div className="text-center space-y-8 max-w-4xl">
        {/* Title */}
        <div className="space-y-4">
          <h1 className="text-6xl md:text-8xl font-mono font-bold text-green-400">
            AI CASH
          </h1>
          <h2 className="text-4xl md:text-6xl font-mono font-bold text-green-400">
            REVOLUTION
          </h2>
        </div>

        {/* Welcome Message */}
        <div className="space-y-6">
          <p className="text-2xl md:text-3xl font-mono">
            Welcome to the Matrix of Trading
          </p>
          <p className="text-xl md:text-2xl font-mono">
            AI-powered trading signals for the modern trader
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col md:flex-row gap-6 items-center justify-center mt-12">
          <a
            href="/auth/login"
            className="px-8 py-4 bg-green-600 text-black font-mono font-bold text-lg rounded hover:bg-green-500 transition-colors"
          >
            LOGIN
          </a>
          <a
            href="/auth/register"
            className="px-8 py-4 bg-blue-600 text-white font-mono font-bold text-lg rounded hover:bg-blue-500 transition-colors"
          >
            REGISTER
          </a>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mt-16">
          <div className="p-6 border border-green-400 rounded">
            <h3 className="text-xl font-mono font-bold mb-4">AI SIGNALS</h3>
            <p className="font-mono">Advanced AI algorithms generate profitable trading signals</p>
          </div>
          <div className="p-6 border border-green-400 rounded">
            <h3 className="text-xl font-mono font-bold mb-4">REAL-TIME</h3>
            <p className="font-mono">Live market data and instant signal delivery</p>
          </div>
          <div className="p-6 border border-green-400 rounded">
            <h3 className="text-xl font-mono font-bold mb-4">MATRIX UI</h3>
            <p className="font-mono">Cyberpunk-inspired interface for the digital age</p>
          </div>
        </div>
      </div>
    </div>
  )
}