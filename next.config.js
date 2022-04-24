/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack5: true,
  eslint: {
    dirs: [
      'pages',
      'server',
    ],
  },  
}

module.exports = nextConfig
