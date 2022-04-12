import styled from 'styled-components'
import media from 'styled-media-query'

export const TagsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0 1.4rem;
  margin-top: 0.8rem;
  gap: 0.2rem;

  ${media.lessThan('large')`
    padding: 0 1rem;
  `}

  span {
    color: #edecee;
    background-color: #3d375e7f;
    padding: 0.1em 0.5em;
    border-radius: 0.3em;
    line-height: 1.5;
  }
`
