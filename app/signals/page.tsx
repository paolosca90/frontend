export default function SignalsPage() {
  return (
    <div className="min-h-screen bg-black text-green-400 p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-mono font-bold">SIGNALS</h1>
        <nav className="space-x-6">
          <a href="/" className="font-mono hover:text-green-300">HOME</a>
          <a href="/dashboard" className="font-mono hover:text-green-300">DASHBOARD</a>
          <a href="/auth/login" className="font-mono hover:text-green-300">LOGOUT</a>
        </nav>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-8">
        <select className="px-4 py-2 bg-black border border-green-400 rounded text-green-400 font-mono focus:outline-none focus:ring-2 focus:ring-green-500">
          <option value="">ALL INSTRUMENTS</option>
          <option value="EURUSD">EUR/USD</option>
          <option value="GBPUSD">GBP/USD</option>
          <option value="USDJPY">USD/JPY</option>
          <option value="BTCUSD">BTC/USD</option>
        </select>

        <select className="px-4 py-2 bg-black border border-green-400 rounded text-green-400 font-mono focus:outline-none focus:ring-2 focus:ring-green-500">
          <option value="">ALL STATUS</option>
          <option value="active">ACTIVE</option>
          <option value="closed">CLOSED</option>
          <option value="pending">PENDING</option>
        </select>

        <select className="px-4 py-2 bg-black border border-green-400 rounded text-green-400 font-mono focus:outline-none focus:ring-2 focus:ring-green-500">
          <option value="">ALL TYPES</option>
          <option value="buy">BUY</option>
          <option value="sell">SELL</option>
        </select>

        <button className="px-6 py-2 bg-green-600 text-black font-mono font-bold rounded hover:bg-green-500 transition-colors">
          FILTER
        </button>
      </div>

      {/* Signals List */}
      <div className="border border-green-400 rounded">
        {/* Header */}
        <div className="grid grid-cols-7 gap-4 p-4 border-b border-green-400 bg-green-400/10">
          <div className="font-mono font-bold">INSTRUMENT</div>
          <div className="font-mono font-bold">TYPE</div>
          <div className="font-mono font-bold">ENTRY</div>
          <div className="font-mono font-bold">SL</div>
          <div className="font-mono font-bold">TP</div>
          <div className="font-mono font-bold">P&L</div>
          <div className="font-mono font-bold">STATUS</div>
        </div>

        {/* Signal Rows */}
        {[
          { instrument: 'EUR/USD', type: 'BUY', entry: '1.0842', sl: '1.0820', tp: '1.0890', pnl: '+$247', status: 'CLOSED', statusColor: 'bg-green-600' },
          { instrument: 'GBP/USD', type: 'SELL', entry: '1.2650', sl: '1.2680', tp: '1.2600', pnl: '+$183', status: 'CLOSED', statusColor: 'bg-green-600' },
          { instrument: 'USD/JPY', type: 'BUY', entry: '149.80', sl: '149.50', tp: '150.20', pnl: '+$156', status: 'ACTIVE', statusColor: 'bg-blue-600' },
          { instrument: 'BTC/USD', type: 'BUY', entry: '43850', sl: '43500', tp: '44500', pnl: '+$425', status: 'ACTIVE', statusColor: 'bg-blue-600' },
          { instrument: 'EUR/GBP', type: 'SELL', entry: '0.8580', sl: '0.8600', tp: '0.8540', pnl: '+$89', status: 'PENDING', statusColor: 'bg-yellow-600' },
          { instrument: 'AUD/USD', type: 'BUY', entry: '0.6720', sl: '0.6700', tp: '0.6760', pnl: '+$134', status: 'CLOSED', statusColor: 'bg-green-600' },
          { instrument: 'XAU/USD', type: 'BUY', entry: '2035.50', sl: '2025.00', tp: '2055.00', pnl: '+$312', status: 'ACTIVE', statusColor: 'bg-blue-600' },
          { instrument: 'USD/CAD', type: 'SELL', entry: '1.3520', sl: '1.3550', tp: '1.3480', pnl: '+$78', status: 'CLOSED', statusColor: 'bg-green-600' },
        ].map((signal, index) => (
          <div key={index} className="grid grid-cols-7 gap-4 p-4 border-b border-green-400/30 hover:bg-green-400/5 transition-colors">
            <div className="font-mono">{signal.instrument}</div>
            <div>
              <span className={`px-2 py-1 text-xs font-mono ${
                signal.type === 'BUY' ? 'bg-green-600' : 'bg-red-600'
              } text-black rounded`}>
                {signal.type}
              </span>
            </div>
            <div className="font-mono">{signal.entry}</div>
            <div className="font-mono text-red-400">{signal.sl}</div>
            <div className="font-mono text-green-400">{signal.tp}</div>
            <div className="font-mono text-green-400">{signal.pnl}</div>
            <div>
              <span className={`px-2 py-1 text-xs font-mono ${signal.statusColor} text-white rounded`}>
                {signal.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8 space-x-4">
        <button className="px-4 py-2 border border-green-400 rounded font-mono hover:bg-green-400/10 transition-colors">
          PREV
        </button>
        <span className="px-4 py-2 font-mono">Page 1 of 5</span>
        <button className="px-4 py-2 border border-green-400 rounded font-mono hover:bg-green-400/10 transition-colors">
          NEXT
        </button>
      </div>
    </div>
  )
}