/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['avatar.vercel.sh'],
    },
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'https://vortigon.nabinkhair12.workers.dev/:path*', // Proxy to external API
  
        },
      ];
    },
  };
  
  export default nextConfig;