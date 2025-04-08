import { render, screen } from '@testing-library/react'
import Layout from '..'

// Mock the required components
jest.mock('components/Profile', () => {
  return function MockProfile() {
    return <div data-testid="profile" />
  }
})

jest.mock('components/Sidebar', () => {
  return function MockSidebar({ setIsMenuOpen, isMenuOpen }) {
    return (
      <div data-testid="sidebar">
        <button
          data-testid="toggle-button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          Toggle
        </button>
        <span data-testid="menu-state">{isMenuOpen ? 'open' : 'closed'}</span>
      </div>
    )
  }
})

jest.mock('components/MenuBar', () => {
  return function MockMenuBar() {
    return <div data-testid="menu-bar" />
  }
})

// Mock constants
jest.mock('lib/constants', () => ({
  BLOG_AUTHOR: 'Miguel',
  BLOG_AUTHOR_POSITION: 'Developer',
  BLOG_AUTHOR_DESCRIPTION: 'Web Developer'
}))

describe('Layout component', () => {
  it('renders correctly', () => {
    render(
      <Layout>
        <div data-testid="content">Test Content</div>
      </Layout>
    )

    expect(screen.getByTestId('profile')).toBeInTheDocument()
    expect(screen.getByTestId('sidebar')).toBeInTheDocument()
    expect(screen.getByTestId('menu-bar')).toBeInTheDocument()
    expect(screen.getByTestId('content')).toBeInTheDocument()
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })
})
