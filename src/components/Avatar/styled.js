import styled from 'styled-components'
import media from 'styled-media-query'

export const AvatarWrapper = styled.div`
  img {
    border-radius: 50%;
  }

  margin: auto;
  height: 4rem;
  width: 4rem;
  clip-path: circle(50% at 50% 50%);

  ${media.lessThan('large')`
    height: 2.5rem;
    width: 2.5rem;
    margin: 0;
    display: flex;
    align-items: center;
  `}
`
