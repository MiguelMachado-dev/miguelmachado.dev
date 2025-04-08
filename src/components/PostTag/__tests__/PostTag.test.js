import { render, screen } from '@testing-library/react'
import PostTag from '..'

describe('PostTag component', () => {
  it('renders tags correctly', () => {
    render(<PostTag tags={['javascript', 'react', 'nextjs']} />)

    expect(screen.getByText('#javascript')).toBeInTheDocument()
    expect(screen.getByText('#react')).toBeInTheDocument()
    expect(screen.getByText('#nextjs')).toBeInTheDocument()
  })

  it('renders nothing when tags is null', () => {
    const { container } = render(<PostTag tags={null} />)
    expect(container).toBeEmptyDOMElement()
  })

  it('renders nothing when tags is undefined', () => {
    const { container } = render(<PostTag />)
    expect(container).toBeEmptyDOMElement()
  })
})
