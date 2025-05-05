import styled from 'styled-components'
import media from 'styled-media-query'

import transitions from 'styles/transitions'

export const MenuLinksWrapper = styled.nav`
  margin-top: 2rem;
  
  ${media.lessThan('large')`
    margin: 2rem auto;
    width: 100%;
  `}
`

export const MenuLinksList = styled.ul`
  font-size: 1.1rem;
  font-weight: 400;
  
  ${media.lessThan('large')`
    font-size: 1.8rem;
    text-align: center;
    width: 100%;
  `}
`

export const MenuLinksItem = styled.li`
  padding: 0.5rem 0;
  margin: 0.5rem 0;
  position: relative;
  
  .active {
    color: var(--highlight);
    font-weight: 600;
    
    &::before {
      content: '';
      position: absolute;
      left: -10px;
      top: 50%;
      transform: translateY(-50%);
      width: 4px;
      height: 4px;
      background: var(--highlight);
      border-radius: 50%;
      box-shadow: 0 0 4px var(--highlight);
    }
  }

  ${media.lessThan('large')`
    padding: 1rem 0;
    width: 100%;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    
    &:last-child {
      border-bottom: none;
    }
    
    .active::before {
      display: none;
    }
  `}

  a {
    color: var(--texts);
    text-decoration: none;
    transition: ${transitions.COLOR};
    display: inline-block;
    position: relative;
    padding: 0.25rem 0;
    
    &::after {
      content: '';
      position: absolute;
      width: 0;
      height: 1px;
      bottom: 0;
      left: 0;
      background-color: var(--highlight);
      transition: width 0.3s ease;
    }

    &:hover {
      color: var(--highlight);
      
      &::after {
        width: 100%;
      }
    }
    
    ${media.lessThan('large')`
      display: block;
      width: 100%;
      
      &::after {
        display: none;
      }
    `}
  }
`
