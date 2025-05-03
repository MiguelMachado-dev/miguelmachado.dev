import styled from 'styled-components'
import media from 'styled-media-query'

export const LanguageSwitcherWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  margin-left: 1rem;

  ${media.lessThan('medium')`
    margin-left: 0.5rem;
  `}
`

export const LanguageButton = styled.button`
  background: ${props => (props.active ? 'var(--highlight)' : 'transparent')};
  color: ${props => (props.active ? 'var(--navy)' : 'var(--texts)')};
  border: 1px solid var(--borders);
  border-radius: 4px;
  padding: 0.3rem 0.5rem;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: var(--highlight);
    color: var(--navy);
  }

  ${media.lessThan('medium')`
    padding: 0.2rem 0.4rem;
    font-size: 0.7rem;
  `}
`
