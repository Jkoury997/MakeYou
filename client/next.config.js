/** @type {import('next').NextConfig} */
require('dotenv').config();
const nextConfig = {
    async rewrites() {
        return [
          {
            source: '/ws_jinx/:path*',
            //destination: 'http://190.216.66.210:10287/api/:path*',
            destination: 'http://10.0.0.110:8100/api/:path*'
          }
        ]
      }
}

module.exports = nextConfig
