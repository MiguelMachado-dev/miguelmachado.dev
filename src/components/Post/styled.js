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
  margin-bottom: 1.5rem;
  background: var(--card-bg);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  box-shadow: var(--card-shadow);
  border: 1px solid var(--borders);
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: var(--highlight);
    opacity: 0.9;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 14px 28px var(--card-shadow-hover-strong),
      0 10px 10px var(--card-shadow-hover-light);
    border-color: var(--highlight);
  }

  ${media.lessThan('large')`
    padding: 1.5rem 1.25rem;
    margin: 1rem;
    border-radius: 12px;
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
  font-size: 0.8rem;
  font-weight: 700;
  justify-content: center;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-radius: 8px;
  min-height: auto;
  min-width: auto;
  padding: 0.4rem 0.8rem;
  margin-bottom: 1rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);

  ${media.lessThan('large')`
    font-size: 0.75rem;
    padding: .3rem .6rem;
    margin-bottom: 0.8rem;
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
  color: var(--texts-secondary);
  font-family: 'MonoLisa-Regular', monospace;
`

export const PostTitle = styled.h1`
  font-size: 1.9rem;
  font-weight: 700;
  margin: 0.5rem 0 0.75rem;
  color: var(--postColor);
  line-height: 1.35;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 40px;
    height: 3px;
    background: var(--highlight);
    opacity: 0.6;
  }
`

export const PostDescription = styled.h2`
  font-size: 1.15rem;
  font-weight: 400;
  line-height: 1.5;
  color: var(--texts);
  margin-top: 0.8rem;
  opacity: 0.85;
`
