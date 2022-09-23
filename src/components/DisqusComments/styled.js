import styled from 'styled-components'
import media from 'styled-media-query'

export const CommentWrapper = styled.section`
  margin: auto;
  max-width: 70rem;
  padding: 2rem 5rem;

  ${media.lessThan('large')`
    padding: 2rem 0.5rem;
    max-width: 100%;
  `}
`
