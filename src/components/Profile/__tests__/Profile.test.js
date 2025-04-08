import { render, screen } from '@testing-library/react'
import Profile from '..'

// Mock the Avatar component
jest.mock('components/Avatar', () => {
  return function MockAvatar() {
    return <div data-testid="avatar" />
  }
})

describe('Profile component', () => {
  const props = {
    title: 'John Doe',
    position: 'Developer',
    authorDescription: 'Software Engineer'
  }

  it('renders desktop profile correctly', () => {
    render(<Profile {...props} />)

    expect(screen.getByTestId('avatar')).toBeInTheDocument()
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('Developer')).toBeInTheDocument()
    expect(screen.getByText('Software Engineer')).toBeInTheDocument()
  })

  it('renders mobile profile correctly', () => {
    render(<Profile {...props} isMobileHeader={true} />)

    expect(screen.getByTestId('avatar')).toBeInTheDocument()
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('Developer')).toBeInTheDocument()
    expect(screen.getByText('Software Engineer')).toBeInTheDocument()
  })
})
