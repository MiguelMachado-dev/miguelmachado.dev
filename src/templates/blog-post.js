import Prism from 'prismjs'

import { useEffect } from 'react'
import Link from 'next/link'
import { NextSeo } from 'next-seo'

import { timeToRead } from 'lib/utils'

import Comments from 'components/Comments'
import RecommendedPosts from 'components/RecommendedPosts'
import PostTag from 'components/PostTag'
import ShareButtons from 'components/ShareButtons'

import {
  PostHeader,
  PostTitle,
  PostDescription,
  PostDate,
  MainContent,
  ButtonBack
} from 'styles/base'

const BlogPost = ({ post }) => {
  useEffect(() => {
    Prism.highlightAll() // <--- directly call Prism.highlightAll
  }, [post]) // <--- run when post updates

  const postUrl = `https://miguelmachado.dev/${post.slug}`

  return (
    <>
      <NextSeo
        title={`${post.frontmatter.title} - Miguel Machado`}
        description={post.frontmatter.description}
        openGraph={{
          url: postUrl,
          title: `${post.frontmatter.title} - Miguel Machado`,
          description: post.frontmatter.description,
          images: [
            {
              url: `https://og-image-service.miguelmachado.dev/${encodeURIComponent(
                post.frontmatter.title
              )}.png`,
              alt: `${post.frontmatter.title}`
            }
          ],
          type: 'article',
          article: {
            publishedTime: new Date(post.date).toISOString(),
            tags: post.frontmatter.tags
          }
        }}
      />
      <PostHeader>
        <Link href="/" passHref>
          <ButtonBack>← Voltar ao início</ButtonBack>
        </Link>

        <PostDate>
          {post.frontmatter.date} • {timeToRead(post.content)}
        </PostDate>
        <PostTitle>{post.frontmatter.title}</PostTitle>
        <PostDescription>{post.frontmatter.description}</PostDescription>
        <PostTag tags={post.frontmatter?.tags} />
      </PostHeader>
      <MainContent>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </MainContent>
      <ShareButtons title={post.frontmatter.title} url={postUrl} />
      <Comments />
      <RecommendedPosts next={post.nextPost} previous={post.prevPost} />
    </>
  )
}

export default BlogPost
