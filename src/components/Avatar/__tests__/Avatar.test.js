import { render, screen } from '@testing-library/react'
import Avatar from '..'

// Mock Next/Image since it's not available in the test environment
jest.mock('next/image', () => {
  return function MockImage(props) {
    return (
      <img
        src={props.src}
        alt={props.alt}
        width={props.width}
        height={props.height}
        data-testid="avatar-img"
      />
    )
  }
})

describe('Avatar component', () => {
  it('renders correctly', () => {
    render(<Avatar />)

    const image = screen.getByTestId('avatar-img')

    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute(
      'src',
      'https://avatars.githubusercontent.com/u/29252011?v=4'
    )
    expect(image).toHaveAttribute('width', '64')
    expect(image).toHaveAttribute('height', '64')
  })
})
