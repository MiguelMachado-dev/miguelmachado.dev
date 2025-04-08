import { render, screen } from '@testing-library/react'
import Post from '..'

// Mock Next/Link
jest.mock('next/link', () => {
  const MockLink = ({ children, href }) => {
    return children.props.href ? children : <div>{children}</div>
  }
  MockLink.displayName = 'MockLink'
  return MockLink
})

describe('Post component', () => {
  it('renders post with all props correctly', () => {
    render(
      <Post
        slug="/test-post"
        timeToRead="5"
        title="Test Post Title"
        description="This is a test post description"
        main_class="js"
      />
    )

    expect(screen.getByText('js')).toBeInTheDocument()
    expect(screen.getByText('• 5 min de leitura')).toBeInTheDocument()
    expect(screen.getByText('Test Post Title')).toBeInTheDocument()
    expect(
      screen.getByText('This is a test post description')
    ).toBeInTheDocument()
  })

  it('renders post without main_class correctly', () => {
    render(
      <Post
        slug="/test-post"
        timeToRead="5"
        title="Test Post Title"
        description="This is a test post description"
      />
    )

    expect(screen.queryByText('js')).not.toBeInTheDocument()
    expect(screen.getByText('• 5 min de leitura')).toBeInTheDocument()
    expect(screen.getByText('Test Post Title')).toBeInTheDocument()
    expect(
      screen.getByText('This is a test post description')
    ).toBeInTheDocument()
  })

  it('renders post without timeToRead correctly', () => {
    render(
      <Post
        slug="/test-post"
        title="Test Post Title"
        description="This is a test post description"
        main_class="js"
      />
    )

    expect(screen.getByText('js')).toBeInTheDocument()
    expect(screen.queryByText(/min de leitura/)).not.toBeInTheDocument()
    expect(screen.getByText('Test Post Title')).toBeInTheDocument()
    expect(
      screen.getByText('This is a test post description')
    ).toBeInTheDocument()
  })
})
