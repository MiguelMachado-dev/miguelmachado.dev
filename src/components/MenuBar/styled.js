import styled from 'styled-components'
import media from 'styled-media-query'

import transitions from 'styles/transitions'

export const MenuBarWrapper = styled.aside`
  align-items: center;
  background: rgba(17, 15, 24, 0.85);
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: row;
  height: auto;
  right: 0;
  bottom: 0;
  transition: ${transitions.ALL};
  position: fixed;
  width: 100%;
  padding: 0;
  padding-bottom: env(safe-area-inset-bottom);
  justify-content: center;
  border: 0;
  border-top: 1px solid rgba(58, 56, 66, 0.6);
  box-shadow: 0px -5px 20px rgba(0, 0, 0, 0.2);
  z-index: 5;

  ${media.lessThan('large')`
    flex-direction: row;
    justify-content: space-between;
  `}
`

export const MenuBarGroupDesktop = styled.div`
  display: block;

  ${media.lessThan('large')`
    display: none;
  `}
`

export const MenuBarGroupMobile = styled.div`
  display: none;

  ${media.lessThan('large')`
    display: block;
  `}
`

export const MenuBarGroup = styled.div`
  display: flex;
  flex-direction: row;
`

export const MenuBarLink = styled.a`
  display: block;
  position: relative;

  &.active {
    span {
      color: var(--highlight);
    }
    
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 4px;
      height: 4px;
      background: var(--highlight);
      border-radius: 50%;
    }
  }
`

export const MenuBarExternalLink = styled.a`
  display: block;
`

export const MenuBarItem = styled.span`
  color: var(--texts);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3.75rem;
  padding: 1.1rem;
  position: relative;
  width: 3.75rem;
  transition: all 0.25s ease;
  
  svg {
    vertical-align: middle;
    transition: all 0.25s ease;
  }

  &.light {
    color: #ffdc41;
  }

  &.display {
    ${media.lessThan('large')`
      display: none;
    `}
  }

  ${media.greaterThan('large')`
    &:hover {
      color: var(--highlight);
      
      svg {
        transform: scale(1.1);
      }
    }
  `}

  ${media.lessThan('large')`
    height: 3.2rem;
    padding: .9rem;
    position: relative;
    width: 3.2rem;
  `}
`

export const MenuBarNotification = styled.span`
  background: var(--highlight);
  border-radius: 50%;
  display: block;
  height: 0.4rem;
  position: absolute;
  right: 12px;
  top: 12px;
  width: 0.4rem;
  box-shadow: 0 0 4px var(--highlight);
`
