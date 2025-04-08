import { render, screen, fireEvent, act } from '@testing-library/react'
import Comments from '..'

// Mock Giscus component
jest.mock('@giscus/react', () => {
  return function MockGiscus(props) {
    return <div data-testid="giscus" data-theme={props.theme} />
  }
})

describe('Comments component', () => {
  // Mock window.__theme and addEventListener
  const originalAddEventListener = window.addEventListener
  const originalRemoveEventListener = window.removeEventListener

  beforeEach(() => {
    window.__theme = 'dark'
    window.addEventListener = jest.fn((event, callback) => {
      if (event === 'themeChanged') {
        window.themeChangedCallback = callback
      }
    })
    window.removeEventListener = jest.fn()
  })

  afterEach(() => {
    window.addEventListener = originalAddEventListener
    window.removeEventListener = originalRemoveEventListener
    delete window.themeChangedCallback
  })

  it('renders with initial dark theme', () => {
    render(<Comments />)

    const giscus = screen.getByTestId('giscus')
    expect(giscus).toBeInTheDocument()
    expect(giscus).toHaveAttribute('data-theme', 'dark')
  })

  it('changes theme when window.__theme changes', () => {
    render(<Comments />)

    // Initial state check
    let giscus = screen.getByTestId('giscus')
    expect(giscus).toHaveAttribute('data-theme', 'dark')

    // Change theme to light
    act(() => {
      window.__theme = 'light'
      window.themeChangedCallback()
    })

    // Check if theme was updated
    giscus = screen.getByTestId('giscus')
    expect(giscus).toHaveAttribute('data-theme', 'light')
  })

  it('removes event listener on unmount', () => {
    const { unmount } = render(<Comments />)

    unmount()

    expect(window.removeEventListener).toHaveBeenCalledWith(
      'themeChanged',
      expect.any(Function)
    )
  })
})
