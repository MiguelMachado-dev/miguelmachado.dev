import { render, screen } from '@testing-library/react'
import RecommendedPosts from '..'

// Mock Next/Link
jest.mock('next/link', () => {
  const MockLink = ({ children, href }) => {
    return children.props.href ? children : <div>{children}</div>
  }
  MockLink.displayName = 'MockLink'
  return MockLink
})

describe('RecommendedPosts component', () => {
  it('renders with previous and next posts correctly', () => {
    const previousPost = {
      slug: '/previous-post',
      frontmatter: {
        title: 'Previous Post Title'
      }
    }

    const nextPost = {
      slug: '/next-post',
      frontmatter: {
        title: 'Next Post Title'
      }
    }

    render(<RecommendedPosts previous={previousPost} next={nextPost} />)

    expect(screen.getByText('Previous Post Title')).toBeInTheDocument()
    expect(screen.getByText('Next Post Title')).toBeInTheDocument()

    const previousLink = screen.getByText('Previous Post Title').closest('a')
    const nextLink = screen.getByText('Next Post Title').closest('a')

    expect(previousLink).toHaveClass('previous')
    expect(nextLink).toHaveClass('next')
  })

  it('renders with only previous post correctly', () => {
    const previousPost = {
      slug: '/previous-post',
      frontmatter: {
        title: 'Previous Post Title'
      }
    }

    render(<RecommendedPosts previous={previousPost} />)

    expect(screen.getByText('Previous Post Title')).toBeInTheDocument()
    expect(screen.queryByText('Next Post Title')).not.toBeInTheDocument()
  })

  it('renders with only next post correctly', () => {
    const nextPost = {
      slug: '/next-post',
      frontmatter: {
        title: 'Next Post Title'
      }
    }

    render(<RecommendedPosts next={nextPost} />)

    expect(screen.queryByText('Previous Post Title')).not.toBeInTheDocument()
    expect(screen.getByText('Next Post Title')).toBeInTheDocument()
  })

  it('renders empty when no posts are provided', () => {
    const { container } = render(<RecommendedPosts />)

    expect(container.firstChild).toBeEmptyDOMElement()
  })
})
