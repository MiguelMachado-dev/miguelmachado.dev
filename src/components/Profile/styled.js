import styled from 'styled-components'
import media from 'styled-media-query'

import transitions from '../../styles/transitions'

export const ProfileContainer = styled.section`
  display: ${props => (props.isMobileHeader ? 'none' : 'flex')};
  color: var(--texts);
  flex-direction: column;
  position: relative;
  padding-bottom: 2rem;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 40%;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      var(--highlight) 50%,
      transparent 100%
    );
    opacity: 0.3;
  }

  ${media.lessThan('large')`
    align-items: center;
    justify-content: center;
    display: ${props => (props.isMobileHeader ? 'flex' : 'none')};
    background: rgba(17, 15, 24, 0.85);
    border-bottom: 1px solid rgba(58, 56, 66, 0.6);
    box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.2);
    padding: 0.75rem;
    width: 100vw;
    position: fixed;
    z-index: 10;
    backdrop-filter: blur(10px);
    flex-direction: row;

    &::after {
      display: none;
    }
  `}
`

export const ProfileLink = styled.a`
  color: var(--texts);
  text-decoration: none;
  transition: ${transitions.COLOR};
  position: relative;

  &:hover {
    color: var(--highlight);
  }

  ${media.lessThan('large')`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  `}
`

export const ProfileAuthor = styled.h1`
  font-size: 1.8rem;
  margin: 0.5rem auto 1.5rem;
  font-weight: 700;
  background: linear-gradient(
    90deg,
    var(--highlight) 0%,
    var(--postColor) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);

  ${media.lessThan('large')`
    font-size: 1.2rem;
    margin: 0 0 0 10px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: center;
  `}
`

export const ProfilePosition = styled.small`
  display: block;
  font-size: 1.1rem;
  font-weight: 400;
  letter-spacing: 0.05em;
  margin-bottom: 1rem;

  ${media.lessThan('large')`
    font-size: .8rem;
    margin-top: 0;
    margin-bottom: 0;
  `}
`

export const ProfileDescription = styled.p`
  font-size: 0.95rem;
  font-weight: 300;
  line-height: 1.5;
  opacity: 0.85;
  padding: 0 1rem;
  position: relative;

  &::before {
    content: '{ ';
    color: var(--highlight);
    font-weight: 700;
    opacity: 0.6;
  }

  &::after {
    content: ' }';
    color: var(--highlight);
    font-weight: 700;
    opacity: 0.6;
  }

  ${media.lessThan('large')`
    display: none;
  `}
`
