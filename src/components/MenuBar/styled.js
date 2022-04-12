import styled from 'styled-components'
import media from 'styled-media-query'

import transitions from 'styles/transitions'

export const MenuBarWrapper = styled.aside`
  align-items: center;
  background: var(--mediumBackground);
  display: flex;
  flex-direction: row;
  height: auto;
  right: 0;
  bottom: -3px;
  transition: ${transitions.ALL};
  position: fixed;
  width: 100%;
  padding: 0;
  padding-bottom: env(safe-area-inset-bottom);
  justify-content: center;
  border: 0;
  border-top: 1px solid var(--borders);
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

  &.active {
    span {
      color: var(--highlight);
    }
  }
`

export const MenuBarExternalLink = styled.a`
  display: block;
`

export const MenuBarItem = styled.span`
  color: var(--texts);
  cursor: pointer;
  display: block;
  height: 3.75rem;
  padding: 1.1rem;
  position: relative;
  width: 3.75rem;
  transition: ${transitions.COLOR};

  svg {
    vertical-align: middle;
  }

  &.light {
    color: #d4d400;
  }

  &.display {
    ${media.lessThan('large')`
      display: none;
    `}
  }

  ${media.greaterThan('large')`
    &:hover {
      color: var(--highlight);
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
`
