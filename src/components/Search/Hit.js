import Post from 'components/Post'

const Hit = props => {
  const { hit } = props

  return (
    <Post
      slug={hit.fields.slug}
      title={hit.title}
      date={hit.date}
      description={hit.description}
      main_class={hit.category}
    />
  )
}

export default Hit
