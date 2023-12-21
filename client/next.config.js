/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
          {
            source: '/ws_jinx/:path*',
            destination: 'http://190.216.66.210:10287/api/:path*' // Proxy a la API
          }
        ]
      }
}

module.exports = nextConfig
