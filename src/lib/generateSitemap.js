import { BLOG_URL } from './constants'
import { getAllPosts } from './api' // We might need allPosts directly here
// Use require for CommonJS modules
const { SitemapStream, streamToPromise } = require('sitemap')
const { Readable } = require('stream')
const fs = require('fs')

// pages that should not be in the sitemap (adjust if needed)
// const blocklist = ['/404'] // Example, might need /en/404 etc. if you have custom 404 pages per locale

export async function generateSitemap(posts) {
  if (process.env.NODE_ENV === 'development') {
    return
  }

  const baseUrl = BLOG_URL
  // Define locales explicitly, matching next.config.js
  const locales = ['en', 'br']

  // Manually define base page routes per locale
  const pageLinks = []
  locales.forEach(locale => {
    pageLinks.push({ url: `/${locale}`, changefreq: 'daily', priority: 0.7 }) // Add homepage for each locale
    // Add other static pages here if needed, e.g., /en/about, /br/about
  })

  // post routes - use locale and slug
  const postLinks = posts.map(post => ({
    url: `/${post.locale}/${post.slug}`, // <-- Include locale here
    changefreq: 'daily',
    priority: 0.7
    // You could also add lastmod based on post.date if desired
    // lastmod: new Date(post.date).toISOString(),
  }))

  const links = [...pageLinks, ...postLinks]
  const stream = new SitemapStream({ hostname: baseUrl })

  const xml = await streamToPromise(Readable.from(links).pipe(stream)).then(
    data => data.toString()
  )

  fs.writeFileSync('./public/sitemap.xml', xml)
}
