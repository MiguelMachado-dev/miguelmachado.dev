const withPWA = require('next-pwa')
const isProd = process.env.NODE_ENV === 'production'

module.exports = withPWA({
  pwa: {
    dest: 'public',
    disable: !isProd,
  },
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
  redirects() {
    return [
      {
        source: '/todos-os-meus-links',
        destination: 'https://meus-links.miguelmachado.dev/',
        permanent: true
      },
    ]
  },
  images: { domains: ['avatars.githubusercontent.com'] }
})
