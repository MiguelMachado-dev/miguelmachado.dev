import { render, screen } from '@testing-library/react'
import Hit from '../Hit'

// Mock the Post component
jest.mock('components/Post', () => {
  const MockPost = ({ slug, title, date, description, main_class }) => (
    <div data-testid="post-component">
      <span data-testid="slug">{slug}</span>
      <span data-testid="title">{title}</span>
      <span data-testid="date">{date}</span>
      <span data-testid="description">{description}</span>
      <span data-testid="main-class">{main_class}</span>
    </div>
  )
  MockPost.displayName = 'MockPost'
  return MockPost
})

describe('Hit component', () => {
  it('renders correctly with all props', () => {
    const hit = {
      fields: {
        slug: '/test-post'
      },
      title: 'Test Post Title',
      date: '2022-01-01',
      description: 'This is a test post description',
      main_class: 'js'
    }

    render(<Hit hit={hit} />)

    expect(screen.getByTestId('post-component')).toBeInTheDocument()
    expect(screen.getByTestId('slug')).toHaveTextContent('/test-post')
    expect(screen.getByTestId('title')).toHaveTextContent('Test Post Title')
    expect(screen.getByTestId('date')).toHaveTextContent('2022-01-01')
    expect(screen.getByTestId('description')).toHaveTextContent(
      'This is a test post description'
    )
    expect(screen.getByTestId('main-class')).toHaveTextContent('js')
  })
})
