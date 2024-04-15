/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'emoticodev.blob.core.windows.net',
            port: '',
            pathname: '/**',
          },
        ],
      },
    webpack: (config) => {
      config.resolve = {
        ...config.resolve,
        fallback: {
          "fs": false,
          "path": false,
          "os": false,
        }
      }
      return config
    },
}

module.exports = nextConfig

