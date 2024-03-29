import Prism from 'prismjs'

import { useEffect } from 'react'
import Link from 'next/link'
import { NextSeo } from 'next-seo'

import { timeToRead } from 'lib/utils'

import Comments from 'components/Comments'
import RecommendedPosts from 'components/RecommendedPosts'
import PostTag from 'components/PostTag'

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
    const highlight = async () => {
      await Prism.highlightAll(); // <--- prepare Prism
    };
    highlight(); // <--- call the async function
  }, [post]); // <--- run when post updates

  return (
    <>
      <NextSeo
        title={`${post.frontmatter.title} - Miguel Machado`}
        description={post.frontmatter.description}
        openGraph={{
          url: `https://miguelmachado.dev/${post.slug}`,
          title: `${post.frontmatter.title} - Miguel Machado`,
          description: post.frontmatter.description,
          images: [
            {
              url: `https://og-image-service.miguelmachado.dev/${encodeURIComponent(post.frontmatter.title)}.png?v=404`,
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
      <Comments />
      <RecommendedPosts next={post.nextPost} previous={post.prevPost} />
    </>
  )
}

export default BlogPost
