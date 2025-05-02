import fs from 'fs'
import { getAllPosts } from 'lib/api'
import { buildAlgoliaIndexes } from 'lib/buildAlgoliaIndexes'
import { generateRss } from 'lib/generateRSS'
import { generateSitemap } from 'lib/generateSitemap'

import BlogList from 'templates/blog-list'

const Post = ({ posts }) => {
  return <BlogList posts={posts} />
}

export async function getStaticProps({ locale }) {
  const allPosts = getAllPosts()

  const postsForLocale = allPosts.filter(post => post.locale === locale)

  if (process.env.NODE_ENV !== 'development') {
    await generateSitemap(allPosts)

    const rss = await generateRss(allPosts)
    fs.writeFileSync('./public/feed.xml', rss)

    await buildAlgoliaIndexes(allPosts)
  }

  return {
    props: {
      posts: postsForLocale
    }
  }
}

export default Post
