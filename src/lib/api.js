import matter from 'gray-matter'
import { join } from 'path'
import fs from 'fs'

import { format } from 'date-fns'
import { pt, enUS } from 'date-fns/locale'

// Helper to get locale object from string
const getLocale = locale => (locale === 'pt' ? pt : enUS)

const postsDirectory = join(process.cwd(), 'posts')

// Updated function to accept locale
export function getPostBySlug(slug, locale) {
  if (!slug || !locale) return null

  const fullPath = join(postsDirectory, `${slug}.${locale}.md`)
  // Use existsSync to avoid errors if a post doesn't exist for a locale
  if (!fs.existsSync(fullPath)) return null

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  // Format date based on locale
  const date = format(
    new Date(data.date),
    locale === 'pt' ? "dd 'de' MMMM 'de' yyyy" : 'MMMM dd, yyyy',
    {
      locale: getLocale(locale)
    }
  )

  return {
    slug, // Slug remains the core identifier
    locale, // Add locale
    date: data.date.toString(),
    frontmatter: { ...data, date }, // Formatted date in frontmatter
    content
  }
}

// Updated function to parse locale from filename
export function getAllPosts() {
  const filenames = fs.readdirSync(postsDirectory)
  const posts = filenames
    .map(filename => {
      // Match filenames like 'slug.en.md' or 'slug.br.md'
      const match = filename.match(/^(.+?)\.([a-z]{2})\.md$/)
      if (!match) return null // Skip files that don't match the pattern

      const [, slug, locale] = match
      // Use the updated getPostBySlug
      return getPostBySlug(slug, locale)
    })
    .filter(post => post !== null) // Filter out nulls (non-matching files or missing posts)
    // Sort by original date string
    .sort((post1, post2) =>
      new Date(post1.date) > new Date(post2.date) ? -1 : 1
    )

  console.log('[getAllPosts] Found posts:', posts)
  return posts
}
