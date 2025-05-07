import styled from 'styled-components'
import media from 'styled-media-query'

import transitions from 'styles/transitions'

export const LayoutWrapper = styled.section`
  display: flex;
  position: relative;

  @media (max-width: 1170px) {
    flex-direction: column;
  }
`

export const LayoutMain = styled.main`
  background: var(--background);
  min-height: 100vh;
  padding: 0 0 3.6rem 20rem; /* Add left padding to account for the sidebar */
  transition: ${transitions.DEFAULT};
  width: 100%;

  /* Add a subtle gradient to the main content area */
  background: linear-gradient(
    135deg,
    var(--background) 0%,
    var(--mediumBackground) 100%
  );

  /* Let's create a modern grid pattern in the background */
  position: relative;

  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: radial-gradient(var(--grid-pattern) 1px, transparent 0),
      radial-gradient(var(--grid-pattern) 1px, transparent 0);
    background-size: 30px 30px;
    background-position: 0 0, 15px 15px;
    z-index: -1;
    opacity: 0.4;
    pointer-events: none;
  }

  .infinite-scroll-component {
    padding: 1rem 0;
  }

  @media (max-width: 1170px) {
    padding: 4.5rem 0 3rem 0;

    .infinite-scroll-component {
      padding: 0 1rem;
    }
  }
`
