export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-green-400 p-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-mono font-bold text-green-400 mb-2">
            REGISTER
          </h1>
          <p className="text-lg font-mono">
            Join the Revolution
          </p>
        </div>

        {/* Registration Form */}
        <form className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-mono font-medium mb-2">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="w-full px-3 py-2 bg-black border border-green-400 rounded text-green-400 font-mono focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Your Name"
            />
          </div>

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

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-mono font-medium mb-2">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              className="w-full px-3 py-2 bg-black border border-green-400 rounded text-green-400 font-mono focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-mono font-bold text-lg rounded hover:bg-blue-500 transition-colors"
          >
            REGISTER
          </button>
        </form>

        {/* Links */}
        <div className="text-center space-y-4">
          <p className="font-mono">
            Already have an account?{' '}
            <a href="/auth/login" className="text-green-400 hover:text-green-300">
              Login
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