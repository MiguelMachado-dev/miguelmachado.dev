import { render } from '@testing-library/react'
import Analytics from '..'

// Mock the GA_TRACKING_ID
jest.mock('lib/gtag', () => ({
  GA_TRACKING_ID: 'UA-123456789-1'
}))

// Mock next/script
jest.mock('next/script', () => {
  return function MockScript(props) {
    if (props.src) {
      return (
        <script
          data-testid="ga-script"
          src={props.src}
          strategy={props.strategy}
        />
      )
    }

    if (props.dangerouslySetInnerHTML) {
      return (
        <script
          data-testid="ga-inline-script"
          data-html={props.dangerouslySetInnerHTML.__html}
          strategy={props.strategy}
        />
      )
    }

    return null
  }
})

describe('Analytics component', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(<Analytics />)

    const scriptTag = getByTestId('ga-script')
    const inlineScriptTag = getByTestId('ga-inline-script')

    expect(scriptTag).toHaveAttribute(
      'src',
      'https://www.googletagmanager.com/gtag/js?id=UA-123456789-1'
    )
    expect(scriptTag).toHaveAttribute('strategy', 'afterInteractive')

    expect(inlineScriptTag).toHaveAttribute('strategy', 'afterInteractive')
    expect(inlineScriptTag).toHaveAttribute('data-html')
    expect(inlineScriptTag.getAttribute('data-html')).toContain(
      'UA-123456789-1'
    )
  })
})
