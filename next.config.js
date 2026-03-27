/** @type {import('next').NextConfig} */
const nextConfig = {


  // ✅ Production optimizations
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,


  // ✅ CRITICAL: Turbopack config (empty to silence warning)
  turbopack: {},

  // ✅ Headers for security and caching
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
        ],
      },
      // ✅ Cache static assets
      {
        source: '/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // ✅ Cache images
      {
        source: '/_next/image/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // ✅ Redirects
  async redirects() {
    return [
      {
        source: '/',
        destination: '/ru',
        permanent: false,
      },
    ];
  },

  // ✅ Logging
  logging: {
    fetches: {
      fullUrl: true,
    },
  },

  // ✅ IMPORTANT: Configure build output
  output: 'standalone',

  // ✅ Disable static optimization for dynamic routes if needed
  // This helps with sitemap generation
  staticPageGenerationTimeout: 120, // 2 minutes timeout
};

module.exports = nextConfig;