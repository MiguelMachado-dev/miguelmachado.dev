import { render, screen } from '@testing-library/react'
import SocialLinks from '..'

// Mock the content and icons
jest.mock('../content', () => [
  {
    label: 'Github',
    url: 'https://github.com/test'
  },
  {
    label: 'Twitter',
    url: 'https://twitter.com/test'
  },
  {
    label: 'Linkedin',
    url: 'https://linkedin.com/in/test'
  },
  {
    label: 'Instagram',
    url: 'https://instagram.com/test'
  }
])

jest.mock('../Icons', () => {
  const GithubIcon = () => <div data-testid="github-icon" />
  GithubIcon.displayName = 'GithubIcon'

  const TwitterIcon = () => <div data-testid="twitter-icon" />
  TwitterIcon.displayName = 'TwitterIcon'

  const LinkedinIcon = () => <div data-testid="linkedin-icon" />
  LinkedinIcon.displayName = 'LinkedinIcon'

  const InstagramIcon = () => <div data-testid="instagram-icon" />
  InstagramIcon.displayName = 'InstagramIcon'

  return {
    Github: GithubIcon,
    Twitter: TwitterIcon,
    Linkedin: LinkedinIcon,
    Instagram: InstagramIcon
  }
})

describe('SocialLinks component', () => {
  it('renders all social links correctly', () => {
    render(<SocialLinks />)

    // Check if all icons are rendered
    expect(screen.getByTestId('github-icon')).toBeInTheDocument()
    expect(screen.getByTestId('twitter-icon')).toBeInTheDocument()
    expect(screen.getByTestId('linkedin-icon')).toBeInTheDocument()
    expect(screen.getByTestId('instagram-icon')).toBeInTheDocument()

    // Check if all links have correct attributes
    const githubLink = screen.getByTestId('github-icon').closest('a')
    expect(githubLink).toHaveAttribute('href', 'https://github.com/test')
    expect(githubLink).toHaveAttribute('title', 'Github')
    expect(githubLink).toHaveAttribute('target', '_blank')
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer')

    const twitterLink = screen.getByTestId('twitter-icon').closest('a')
    expect(twitterLink).toHaveAttribute('href', 'https://twitter.com/test')
    expect(twitterLink).toHaveAttribute('title', 'Twitter')

    const linkedinLink = screen.getByTestId('linkedin-icon').closest('a')
    expect(linkedinLink).toHaveAttribute('href', 'https://linkedin.com/in/test')
    expect(linkedinLink).toHaveAttribute('title', 'Linkedin')

    const instagramLink = screen.getByTestId('instagram-icon').closest('a')
    expect(instagramLink).toHaveAttribute('href', 'https://instagram.com/test')
    expect(instagramLink).toHaveAttribute('title', 'Instagram')
  })
})
