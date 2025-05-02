import BlogPost from 'templates/blog-post'
import { getPostBySlug, getAllPosts } from 'lib/api'
import markdownToHtml from 'lib/markdownToHtml'

const Post = post => {
  return <BlogPost post={post} />
}

export default Post

export async function getStaticProps({ params, locale }) {
  const slug = params.slug
  const post = getPostBySlug(slug, locale)

  if (!post) {
    return {
      notFound: true
    }
  }

  const content = await markdownToHtml(post.content || '')

  const allPostsForLocale = getAllPosts().filter(p => p.locale === locale)
  const currentPostIndex = allPostsForLocale.findIndex(p => p.slug === slug)

  const nextPost = allPostsForLocale[currentPostIndex - 1] ?? null
  const prevPost = allPostsForLocale[currentPostIndex + 1] ?? null

  return {
    props: {
      ...post,
      content,
      nextPost,
      prevPost
    }
  }
}

export async function getStaticPaths({ locales }) {
  const posts = getAllPosts()
  const paths = []

  posts.forEach(post => {
    locales.forEach(locale => {
      if (post.locale === locale) {
        paths.push({ params: { slug: post.slug }, locale: locale })
      }
    })
  })

  return {
    paths,
    fallback: false
  }
}
