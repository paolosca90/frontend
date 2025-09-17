export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-green-400 p-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-mono font-bold text-green-400 mb-2">
            LOGIN
          </h1>
          <p className="text-lg font-mono">
            Enter the Matrix
          </p>
        </div>

        {/* Login Form */}
        <form className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-mono font-medium mb-2">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-3 py-2 bg-black border border-green-400 rounded text-green-400 font-mono focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="neo@matrix.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-mono font-medium mb-2">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full px-3 py-2 bg-black border border-green-400 rounded text-green-400 font-mono focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-green-600 text-black font-mono font-bold text-lg rounded hover:bg-green-500 transition-colors"
          >
            LOGIN
          </button>
        </form>

        {/* Links */}
        <div className="text-center space-y-4">
          <p className="font-mono">
            Don't have an account?{' '}
            <a href="/auth/register" className="text-blue-400 hover:text-blue-300">
              Register
            </a>
          </p>
          <a href="/" className="block text-green-400 hover:text-green-300 font-mono">
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  )
}