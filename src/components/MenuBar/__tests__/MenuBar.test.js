import { render, screen, fireEvent } from '@testing-library/react'
import MenuBar from '..'

// Mock Next.js router
jest.mock('next/router', () => ({
  useRouter: () => ({
    pathname: '/'
  })
}))

// Mock Next/Link
jest.mock('next/link', () => {
  const MockLink = ({ children, href }) => {
    return children.props.href ? children : <div>{children}</div>
  }
  MockLink.displayName = 'MockLink'
  return MockLink
})

describe('MenuBar component', () => {
  const setIsMenuOpenMock = jest.fn()

  beforeEach(() => {
    // Mock window methods and properties
    window.__theme = 'light'
    window.__setPreferredTheme = jest.fn()
    window.__onThemeChange = null
    window.dispatchEvent = jest.fn()
    window.scroll = jest.fn()
  })

  it('renders correctly', () => {
    render(<MenuBar setIsMenuOpen={setIsMenuOpenMock} isMenuOpen={false} />)

    expect(screen.getByTitle('Voltar para Home')).toBeInTheDocument()
    expect(screen.getByTitle('Pesquisar no Blog')).toBeInTheDocument()
    expect(screen.getByTitle('Mudar o Tema')).toBeInTheDocument()
    expect(screen.getByTitle('Ir para o Topo')).toBeInTheDocument()
    expect(screen.getByTitle('Abrir Menu')).toBeInTheDocument()
  })

  it('toggles menu when menu button is clicked', () => {
    render(<MenuBar setIsMenuOpen={setIsMenuOpenMock} isMenuOpen={false} />)

    const menuButton = screen.getByTitle('Abrir Menu')
    fireEvent.click(menuButton)

    expect(setIsMenuOpenMock).toHaveBeenCalledWith(true)
  })

  it('toggles menu when home button is clicked', () => {
    render(<MenuBar setIsMenuOpen={setIsMenuOpenMock} isMenuOpen={false} />)

    const homeButton = screen.getByTitle('Voltar para Home')
    fireEvent.click(homeButton)

    expect(setIsMenuOpenMock).toHaveBeenCalledWith(true)
  })

  it('changes theme when theme button is clicked', () => {
    render(<MenuBar setIsMenuOpen={setIsMenuOpenMock} isMenuOpen={false} />)

    const themeButton = screen.getByTitle('Mudar o Tema')
    fireEvent.click(themeButton)

    expect(window.__setPreferredTheme).toHaveBeenCalledWith('dark')
    expect(window.dispatchEvent).toHaveBeenCalled()
  })

  it('scrolls to top when arrow button is clicked', () => {
    render(<MenuBar setIsMenuOpen={setIsMenuOpenMock} isMenuOpen={false} />)

    const arrowButton = screen.getByTitle('Ir para o Topo')
    fireEvent.click(arrowButton)

    expect(window.scroll).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })
  })

  it('handles dark theme correctly', () => {
    window.__theme = 'dark'

    render(<MenuBar setIsMenuOpen={setIsMenuOpenMock} isMenuOpen={false} />)

    const themeButton = screen.getByTitle('Mudar o Tema')
    fireEvent.click(themeButton)

    expect(window.__setPreferredTheme).toHaveBeenCalledWith('light')
  })

  it('sets theme from window.__theme on mount', () => {
    window.__theme = 'dark'

    render(<MenuBar setIsMenuOpen={setIsMenuOpenMock} isMenuOpen={false} />)

    expect(screen.getByTitle('Mudar o Tema')).toHaveClass('dark')
  })

  it('updates theme when window.__onThemeChange is called', () => {
    render(<MenuBar setIsMenuOpen={setIsMenuOpenMock} isMenuOpen={false} />)

    expect(window.__onThemeChange).toBeTruthy()

    // Simulate theme change
    window.__theme = 'dark'
    window.__onThemeChange()

    expect(screen.getByTitle('Mudar o Tema')).toHaveClass('dark')
  })
})
