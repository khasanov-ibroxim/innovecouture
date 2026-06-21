/** @type {import('next').NextConfig} */
const nextConfig = {

    // ✅ Image optimization for remote URLs
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'textile.okach-admin.uz',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '8000',
                pathname: '/**',
            },
        ],
        unoptimized: true, // Required for output: export
    },

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
                    { key: 'X-DNS-Prefetch-Control', value: 'on' },
                    { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
                    { key: 'X-Content-Type-Options', value: 'nosniff' },
                    { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
                    { key: 'X-XSS-Protection', value: '1; mode=block' },
                    { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
                ],
            },
            {
                source: '/static/:path*',
                headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
            },
            {
                source: '/_next/image/:path*',
                headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
            },
        ];
    },

    // ✅ Redirects — NOTE: redirects don't work with output: export at runtime
    // They work only as static HTML redirects. Use middleware instead if needed.
    async redirects() {
        return [
            {
                source: '/',
                destination: '/ru',
                permanent: false,
            },
        ];
    },

    logging: {
        fetches: {
            fullUrl: true,
        },
    },

    // ✅ Static export
    output: 'export',
    trailingSlash: true,
    staticPageGenerationTimeout: 120,
};

module.exports = nextConfig;