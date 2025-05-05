import styled from 'styled-components'
import media from 'styled-media-query'

import transitions from 'styles/transitions'

export const PostWrapper = styled.section`
  display: flex;
  padding: 2rem 3rem;
  width: 100%;
  transition: ${transitions.ALL};
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  margin-bottom: 1rem;
  background: var(--card-bg);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  box-shadow: var(--card-shadow);
  border: 1px solid var(--borders);
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 3px;
    height: 100%;
    background: var(--highlight);
    opacity: 0.8;
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.15);
  }

  ${media.lessThan('large')`
    padding: 1.5rem 1rem;
    margin: 0.75rem 1rem;
    border-radius: 8px;
  `}
`

export const PostLink = styled.a`
  color: var(--texts);
  display: flex;
  text-decoration: none;
  transition: ${transitions.COLOR};
  position: relative;
  width: 100%;

  &:hover {
    color: var(--highlight);
  }
`

export const PostTag = styled.div`
  align-items: center;
  background: var(--highlight);
  color: var(--white);
  display: flex;
  font-size: 0.7rem;
  font-weight: 700;
  justify-content: center;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-radius: 4px;
  min-height: auto;
  min-width: auto;
  padding: 0.35rem 0.7rem;
  margin-bottom: 0.7rem;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.12);

  ${media.lessThan('large')`
    font-size: 0.65rem;
    padding: .25rem .5rem;
  `}

  &.is-js {
    background: #d6ba32;
    color: #000;
  }

  &.is-misc {
    background: #7aab13;
  }

  &.is-dev {
    background: #637a91;
  }

  &.is-css {
    background: #2da0c3;
  }

  &.is-go {
    background: #00add8;
    color: #ffffff;
  }

  &.is-proto {
    background: #7c20f2;
  }

  &.is-a11y {
    background: #009e66;
  }
`

export const PostInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const PostDate = styled.time`
  font-size: 0.8rem;
  margin-top: 0.2rem;
  color: rgba(136, 153, 166, 0.8);
  font-family: 'MonoLisa-Regular', monospace;
`

export const PostTitle = styled.h1`
  font-size: 1.6rem;
  font-weight: 700;
  margin: 0.2rem 0 0.5rem;
  color: var(--postColor);
  line-height: 1.3;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 30px;
    height: 2px;
    background: var(--highlight);
    opacity: 0.5;
  }
`

export const PostDescription = styled.h2`
  font-size: 1.1rem;
  font-weight: 400;
  line-height: 1.4;
  color: var(--texts);
  margin-top: 0.6rem;
  opacity: 0.85;
`
