import styled from 'styled-components'
import media from 'styled-media-query'

import transitions from 'styles/transitions'

export const SocialLinksWrapper = styled.nav`
  margin: 2rem auto;
  width: 100%;
  
  ${media.lessThan('large')`
    order: 2;
    margin: 0 0 1rem;
  `}
`

// Define IconWrapper first so it can be referenced in SocialLinksList
export const IconWrapper = styled.div`
  fill: var(--texts);
  width: 24px;
  height: 24px;
  transition: all 0.3s ease;
  
  ${media.greaterThan('large')`
    &:hover {
      transform: scale(1.1);
    }
  `}
  
  ${media.lessThan('large')`
    width: 30px;
    height: 30px;
  `}
`

export const SocialLinksList = styled.ul`
  align-items: center;
  display: flex;
  justify-content: space-around;
  list-style: none !important;
  padding: 0 1rem;

  a {
    color: var(--texts);
    text-decoration: none;
    transition: all 0.3s ease;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    
    &:hover {
      color: var(--highlight);
      transform: translateY(-3px);
      
      ${IconWrapper} {
        fill: var(--highlight);
        filter: drop-shadow(0px 2px 4px rgba(162, 119, 255, 0.3));
      }
    }
  }
`
