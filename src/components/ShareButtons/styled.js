import styled from 'styled-components'
import media from 'styled-media-query'

import transitions from 'styles/transitions'

export const ShareButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2rem auto;
  padding: 0 1.4rem;

  ${media.lessThan('large')`
    padding: 0 1rem;
    flex-direction: column;
    align-items: center;
  `}
`

export const ShareTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 300;
  margin-right: 1rem;
  color: var(--texts);

  ${media.lessThan('large')`
    margin-bottom: 1rem;
    margin-right: 0;
  `}
`

export const ShareButtonsList = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  list-style: none;
  padding: 0;
  margin: 0;
`

export const ShareButtonsItem = styled.li`
  margin-right: 1rem;
`

export const ShareButtonsLink = styled.a`
  display: block;
  width: 2.5rem;
  height: 2.5rem;
  color: var(--texts);
  border-radius: 50%;
  transition: ${transitions.COLOR};
  position: relative;

  svg {
    width: 100%;
    height: 100%;
    padding: 0.5rem;
  }

  &:hover {
    color: var(--highlight);
  }

  &.twitter:hover {
    color: #1da1f2;
  }

  &.linkedin:hover {
    color: #0077b5;
  }

  &.whatsapp:hover {
    color: #25d366;
  }
`
