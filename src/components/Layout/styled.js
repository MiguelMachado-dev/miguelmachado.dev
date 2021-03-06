import styled from 'styled-components'
import media from 'styled-media-query'

import transitions from 'styles/transitions'

export const LayoutWrapper = styled.section`
  display: flex;

  ${media.lessThan('large')`
    flex-direction: column;
  `}
`

export const LayoutMain = styled.main`
  background: var(--background);
  min-height: 100vh;
  padding: 0 0 3.6rem 20rem;
  transition: ${transitions.DEFAULT};
  width: 100%;

  ${media.lessThan('large')`
    padding: 4rem 0 3rem 0;
  `}
`
