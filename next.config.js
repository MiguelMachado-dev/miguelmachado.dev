module.exports = {
  webpack: (config, { dev, isServer }) => {
    // Replace React with Preact only in client production build
    if (!dev && !isServer) {
      Object.assign(config.resolve.alias, {
        react: 'preact/compat',
        'react-dom/test-utils': 'preact/test-utils',
        'react-dom': 'preact/compat'
      })
    }

    return config
  },
  async redirects() {
    return [
      {
        source: '/my-trips/',
        destination: 'https://my-trips.miguelmachado.dev/',
        permanent: true
      },
    ]
  },
  images: { domains: ['pbs.twimg.com'] }
}
