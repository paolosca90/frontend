/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Enable PWA features and Matrix-specific optimizations
  experimental: {
    optimizePackageImports: ['@heroicons/react', 'lucide-react', 'framer-motion'],
    serverComponentsExternalPackages: ['axios'],
  },

  // Matrix theme environment variables
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
    NEXT_PUBLIC_WS_URL: process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3000',
    NEXT_PUBLIC_GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  },

  // Performance optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },

  // Bundle optimization
  webpack: (config, { dev, isServer }) => {
    // Bundle analyzer in development
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: 10,
            reuseExistingChunk: true,
          },
          trading: {
            test: /[\\/]components[\\/]trading[\\/]/,
            name: 'trading',
            priority: 20,
            reuseExistingChunk: true,
          },
          charts: {
            test: /[\\/]components[\\/]charts[\\/]/,
            name: 'charts',
            priority: 20,
            reuseExistingChunk: true,
          },
        },
      };
    }

    // Add fallbacks for node modules and Matrix optimizations
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
      }
    }

    // Optimize for mobile bundle size
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': require('path').join(__dirname, '.'),
      'framer-motion': dev ? 'framer-motion' : 'framer-motion/dist/framer-motion',
    };

    return config;
  },

  // Matrix-optimized image configuration
  images: {
    domains: ['localhost', 'api.aicash-revolution.com', 's3.tradingview.com'],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [320, 420, 768, 1024, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 86400, // 24 hours
    unoptimized: process.env.NODE_ENV === 'development',
  },

  // API proxy to backend with Matrix routing
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/:path*`,
      },
    ];
  },

  // Matrix app redirects
  async redirects() {
    return [
      {
        source: '/dashboard',
        destination: '/',
        permanent: false,
      },
      {
        source: '/login',
        destination: '/',
        permanent: false,
      },
    ]
  },

  // Security and performance headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          // Matrix security headers
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://accounts.google.com https://apis.google.com https://s3.tradingview.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: https: blob:",
              "connect-src 'self' ws: wss: https://api.oanda.com https://accounts.google.com https://oauth2.googleapis.com",
              "frame-src 'self' https://accounts.google.com https://s3.tradingview.com",
              "worker-src 'self' blob:",
            ].join('; '),
          },
          // Performance headers
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          // Cache static assets aggressively
          ...(process.env.NODE_ENV === 'production' ? [
            {
              key: 'Cache-Control',
              value: 'public, max-age=31536000, immutable',
            },
          ] : []),
        ],
      },
      // Service Worker
      {
        source: '/sw.js',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
        ],
      },
    ];
  },

  // Output optimization
  output: 'standalone',

  // Compress output
  compress: true,

  // Enable SWC minification for better performance
  swcMinify: true,

  // Reduce build size
  modularizeImports: {
    '@heroicons/react/24/outline': {
      transform: '@heroicons/react/24/outline/{{member}}',
    },
    '@heroicons/react/24/solid': {
      transform: '@heroicons/react/24/solid/{{member}}',
    },
    'lucide-react': {
      transform: 'lucide-react/dist/esm/icons/{{kebabCase member}}',
    },
  },
}

module.exports = nextConfig;