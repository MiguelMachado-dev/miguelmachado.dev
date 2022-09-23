import {DiscussionEmbed} from "disqus-react"

import * as S from './styled'

const DisqusComments = ({ post }) => {
  const disqusShortname = process.env.NEXT_PUBLIC_DISQUS_SHORTNAME

  const disqusConfig = {
    url: `https://miguelmachado.dev/${post.slug}`,
    identifier: post.slug, // Single post id
    title: post.frontmatter.title // Single post title
  }

  return (
    <S.CommentWrapper>
      <DiscussionEmbed
        shortname={disqusShortname}
        config={disqusConfig}
      />
    </S.CommentWrapper>
  )
}
export default DisqusComments;
