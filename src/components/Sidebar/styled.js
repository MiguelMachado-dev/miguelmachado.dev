import styled from 'styled-components'
import media from 'styled-media-query'

import transitions from '../../styles/transitions'

export const SidebarContainer = styled.aside`
  align-items: center;
  border-right: 1px solid var(--borders);
  background: var(--mediumBackground);
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: fixed;
  padding: 2rem;
  text-align: center;
  width: 20rem;
  transition: ${transitions.ALL};
  box-shadow: 3px 0 15px rgba(0, 0, 0, 0.1);
  left: 0;
  top: 0;
  z-index: 5;
  transform: translateX(0); /* Ensure it's visible by default */
  overflow-y: auto;
  
  body.dark & {
    background: linear-gradient(160deg, #15141b 0%, #110f18 100%);
  }
  
  body.light & {
    background: linear-gradient(160deg, #f6f7fa 0%, #ffffff 100%);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
      linear-gradient(30deg, var(--grid-pattern) 12%, transparent 12.5%, transparent 87%, var(--grid-pattern) 87.5%, var(--grid-pattern)),
      linear-gradient(150deg, var(--grid-pattern) 12%, transparent 12.5%, transparent 87%, var(--grid-pattern) 87.5%, var(--grid-pattern)),
      linear-gradient(30deg, var(--grid-pattern) 12%, transparent 12.5%, transparent 87%, var(--grid-pattern) 87.5%, var(--grid-pattern)),
      linear-gradient(150deg, var(--grid-pattern) 12%, transparent 12.5%, transparent 87%, var(--grid-pattern) 87.5%, var(--grid-pattern)),
      linear-gradient(60deg, var(--grid-pattern) 25%, transparent 25.5%, transparent 75%, var(--grid-pattern) 75%, var(--grid-pattern)),
      linear-gradient(60deg, var(--grid-pattern) 25%, transparent 25.5%, transparent 75%, var(--grid-pattern) 75%, var(--grid-pattern));
    background-size: 20px 35px;
    background-position: 0 0, 0 0, 10px 18px, 10px 18px, 0 0, 10px 18px;
    opacity: 0.2;
    z-index: 0;
    pointer-events: none;
  }

  /* Fix for mobile view */
  @media (max-width: 1170px) {
    align-items: flex-start;
    border: 0;
    height: calc(100% - 49px);
    padding: 2rem;
    width: 100%;
    transform: ${props =>
      props.isMenuOpen ? 'translateX(0)' : 'translateX(-100vw)'};
    z-index: 10;
    box-shadow: ${props => 
      props.isMenuOpen ? '0 5px 25px rgba(0, 0, 0, 0.3)' : 'none'};
  }
`

export const SidebarLinksContainer = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 2;
`
