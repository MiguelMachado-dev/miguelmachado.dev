const { defineCloudflareConfig } = require('@opennextjs/cloudflare')
const kvIncrementalCache = require('@opennextjs/cloudflare/kv-cache')

module.exports = defineCloudflareConfig({
  incrementalCache: kvIncrementalCache({
    // You'll need to bind your KV namespace in wrangler.toml
    // to the name 'KV_NAMESPACE_NAME' or change it here.
    kvBinding: 'NEXT_CACHE' // This is the binding name in wrangler.toml
  })
  // You can add other OpenNext specific configurations here
})
