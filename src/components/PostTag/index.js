import * as S from './styled'

const PostTag = ({ tags }) => {
  if (!tags) return null;

  return (
    <S.TagsWrapper>
      {tags.map(tag => (
        <span key={tag}>#{tag}</span>
      ))}
    </S.TagsWrapper>
  )
}

export default PostTag
