export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-black text-green-400 p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-mono font-bold">DASHBOARD</h1>
        <nav className="space-x-6">
          <a href="/" className="font-mono hover:text-green-300">HOME</a>
          <a href="/signals" className="font-mono hover:text-green-300">SIGNALS</a>
          <a href="/auth/login" className="font-mono hover:text-green-300">LOGOUT</a>
        </nav>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="p-6 border border-green-400 rounded">
          <h3 className="text-lg font-mono font-bold mb-2">TOTAL SIGNALS</h3>
          <p className="text-3xl font-mono text-green-400">1,247</p>
        </div>
        <div className="p-6 border border-green-400 rounded">
          <h3 className="text-lg font-mono font-bold mb-2">WIN RATE</h3>
          <p className="text-3xl font-mono text-green-400">87.3%</p>
        </div>
        <div className="p-6 border border-green-400 rounded">
          <h3 className="text-lg font-mono font-bold mb-2">PROFIT</h3>
          <p className="text-3xl font-mono text-green-400">+$12,847</p>
        </div>
        <div className="p-6 border border-green-400 rounded">
          <h3 className="text-lg font-mono font-bold mb-2">ACTIVE</h3>
          <p className="text-3xl font-mono text-green-400">5</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Signals */}
        <div className="border border-green-400 rounded p-6">
          <h2 className="text-2xl font-mono font-bold mb-6">RECENT SIGNALS</h2>
          <div className="space-y-4">
            {[
              { pair: 'EUR/USD', action: 'BUY', profit: '+$247', status: 'CLOSED' },
              { pair: 'GBP/USD', action: 'SELL', profit: '+$183', status: 'CLOSED' },
              { pair: 'USD/JPY', action: 'BUY', profit: '+$156', status: 'ACTIVE' },
              { pair: 'BTC/USD', action: 'BUY', profit: '+$425', status: 'ACTIVE' },
            ].map((signal, index) => (
              <div key={index} className="flex justify-between items-center p-4 border border-green-400/30 rounded">
                <div>
                  <span className="font-mono font-bold">{signal.pair}</span>
                  <span className={`ml-2 px-2 py-1 text-xs font-mono ${
                    signal.action === 'BUY' ? 'bg-green-600' : 'bg-red-600'
                  } text-black rounded`}>
                    {signal.action}
                  </span>
                </div>
                <div className="text-right">
                  <div className="font-mono text-green-400">{signal.profit}</div>
                  <div className="text-xs font-mono">{signal.status}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trading Interface */}
        <div className="border border-green-400 rounded p-6">
          <h2 className="text-2xl font-mono font-bold mb-6">GENERATE SIGNAL</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-mono font-medium mb-2">INSTRUMENT</label>
              <select className="w-full px-3 py-2 bg-black border border-green-400 rounded text-green-400 font-mono focus:outline-none focus:ring-2 focus:ring-green-500">
                <option value="EURUSD">EUR/USD</option>
                <option value="GBPUSD">GBP/USD</option>
                <option value="USDJPY">USD/JPY</option>
                <option value="BTCUSD">BTC/USD</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-mono font-medium mb-2">TIMEFRAME</label>
              <select className="w-full px-3 py-2 bg-black border border-green-400 rounded text-green-400 font-mono focus:outline-none focus:ring-2 focus:ring-green-500">
                <option value="1h">1 Hour</option>
                <option value="4h">4 Hours</option>
                <option value="1d">1 Day</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-green-600 text-black font-mono font-bold text-lg rounded hover:bg-green-500 transition-colors"
            >
              GENERATE AI SIGNAL
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}