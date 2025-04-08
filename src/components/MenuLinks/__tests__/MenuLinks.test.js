import { render, screen, fireEvent } from '@testing-library/react'
import MenuLinks from '..'

jest.mock('next/link', () => {
  const MockLink = ({ children, href }) => {
    return children.props.href ? children : <div>{children}</div>
  }
  MockLink.displayName = 'MockLink'
  return MockLink
})

jest.mock('next/router', () => ({
  useRouter: () => ({
    pathname: '/'
  })
}))

describe('MenuLinks component', () => {
  const setIsMenuOpen = jest.fn()

  beforeEach(() => {
    setIsMenuOpen.mockClear()
  })

  it('renders correctly', () => {
    render(<MenuLinks isMenuOpen={false} setIsMenuOpen={setIsMenuOpen} />)

    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Viagens')).toBeInTheDocument()
    expect(screen.getByText('Meus Links')).toBeInTheDocument()
  })

  it('handles active link correctly', () => {
    const { container } = render(
      <MenuLinks isMenuOpen={false} setIsMenuOpen={setIsMenuOpen} />
    )

    // Find links and check if Home has active class
    const links = container.querySelectorAll('a')
    expect(links[0].className).toBe('active')
  })

  it('calls setIsMenuOpen with true when menu is closed and link is clicked', () => {
    render(<MenuLinks isMenuOpen={false} setIsMenuOpen={setIsMenuOpen} />)

    // Find and click the first menu item
    const menuItems = screen.getAllByRole('listitem')
    fireEvent.click(menuItems[0])

    expect(setIsMenuOpen).toHaveBeenCalledWith(true)
  })

  it('calls setIsMenuOpen with false when menu is open and link is clicked', () => {
    render(<MenuLinks isMenuOpen={true} setIsMenuOpen={setIsMenuOpen} />)

    const menuItems = screen.getAllByRole('listitem')
    fireEvent.click(menuItems[0])

    expect(setIsMenuOpen).toHaveBeenCalledWith(false)
  })
})
