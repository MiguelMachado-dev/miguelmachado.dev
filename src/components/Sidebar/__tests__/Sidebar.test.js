import { render, screen } from '@testing-library/react'
import Sidebar from '..'

// Mock the required components
jest.mock('components/Profile', () => {
  const MockProfile = ({
    title,
    position,
    authorDescription,
    isMobileHeader
  }) => (
    <div data-testid="profile">
      <span data-testid="title">{title}</span>
      <span data-testid="position">{position}</span>
      <span data-testid="author-description">{authorDescription}</span>
      <span data-testid="is-mobile">{isMobileHeader ? 'true' : 'false'}</span>
    </div>
  )
  MockProfile.displayName = 'MockProfile'
  return MockProfile
})

jest.mock('components/SocialLinks', () => {
  const MockSocialLinks = () => <div data-testid="social-links" />
  MockSocialLinks.displayName = 'MockSocialLinks'
  return MockSocialLinks
})

jest.mock('components/MenuLinks', () => {
  const MockMenuLinks = ({ setIsMenuOpen, isMenuOpen }) => (
    <div data-testid="menu-links">
      <span data-testid="menu-open">{isMenuOpen ? 'open' : 'closed'}</span>
    </div>
  )
  MockMenuLinks.displayName = 'MockMenuLinks'
  return MockMenuLinks
})

// Mock constants
jest.mock('lib/constants', () => ({
  BLOG_AUTHOR: 'Test Author',
  BLOG_AUTHOR_DESCRIPTION: 'Test Author Description',
  BLOG_AUTHOR_POSITION: 'Test Position'
}))

describe('Sidebar component', () => {
  const setIsMenuOpenMock = jest.fn()

  it('renders correctly when menu is closed', () => {
    render(<Sidebar isMenuOpen={false} setIsMenuOpen={setIsMenuOpenMock} />)

    expect(screen.getByTestId('profile')).toBeInTheDocument()
    expect(screen.getByTestId('title')).toHaveTextContent('Test Author')
    expect(screen.getByTestId('position')).toHaveTextContent('Test Position')
    expect(screen.getByTestId('author-description')).toHaveTextContent(
      'Test Author Description'
    )
    expect(screen.getByTestId('is-mobile')).toHaveTextContent('false')

    expect(screen.getByTestId('social-links')).toBeInTheDocument()
    expect(screen.getByTestId('menu-links')).toBeInTheDocument()
    expect(screen.getByTestId('menu-open')).toHaveTextContent('closed')
  })

  it('renders correctly when menu is open', () => {
    render(<Sidebar isMenuOpen={true} setIsMenuOpen={setIsMenuOpenMock} />)

    expect(screen.getByTestId('menu-open')).toHaveTextContent('open')
  })
})
