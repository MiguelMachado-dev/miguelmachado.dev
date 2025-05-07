const { initOpenNextCloudflareForDev } = require('@opennextjs/cloudflare')

initOpenNextCloudflareForDev()

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
  redirects() {
    return [
      {
        source: '/todos-os-meus-links',
        destination: 'https://meus-links.miguelmachado.dev/',
        permanent: true
      },
      {
        source: '/meus-links',
        destination: 'https://meus-links.miguelmachado.dev/',
        permanent: true
      },
      {
        source: '/discord',
        destination: 'https://discord.gg/fZJfrVgQDS',
        permanent: true
      },
      {
        source: '/twitch',
        destination: 'https://twitch.tv/Migtito',
        permanent: true
      }
    ]
  },
  images: { domains: ['avatars.githubusercontent.com'] }
}
