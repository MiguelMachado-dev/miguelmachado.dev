import { render, screen } from '@testing-library/react'
import Search from '..'

// Mock react-instantsearch-dom components
jest.mock('react-instantsearch-dom', () => {
  const SearchBox = () => <div data-testid="search-box" />
  SearchBox.displayName = 'SearchBox'

  const Hits = ({ hitComponent }) => {
    const Hit = hitComponent
    return (
      <Hit
        hit={{ fields: { slug: '/test' }, title: 'Test', date: '2022-01-01' }}
      />
    )
  }
  Hits.displayName = 'Hits'

  const Stats = ({ translations }) => (
    <div data-testid="stats">{translations.stats(10, 100)}</div>
  )
  Stats.displayName = 'Stats'

  const Configure = () => null
  Configure.displayName = 'Configure'

  return { SearchBox, Hits, Stats, Configure }
})

// Mock Hit component
jest.mock('../Hit', () => {
  const MockHit = ({ hit }) => (
    <div data-testid="hit-component">{hit.title}</div>
  )
  MockHit.displayName = 'MockHit'
  return MockHit
})

describe('Search component', () => {
  it('renders search components correctly', () => {
    render(<Search />)

    expect(screen.getByTestId('search-box')).toBeInTheDocument()
    expect(screen.getByTestId('stats')).toBeInTheDocument()
    expect(screen.getByTestId('hit-component')).toBeInTheDocument()
    expect(screen.getByText('Test')).toBeInTheDocument()
    expect(screen.getByText('Powered by Algolia')).toBeInTheDocument()
  })

  it('displays correct stats message for multiple results', () => {
    render(<Search />)

    expect(
      screen.getByText('10 resultados encontrados em 100ms')
    ).toBeInTheDocument()
  })

  it('displays correct stats message for single result', () => {
    // Re-mock the Stats component to simulate single result
    const originalModule = jest.requireMock('react-instantsearch-dom')
    const originalStats = originalModule.Stats

    const StatsSingle = ({ translations }) => {
      const singleResultStats = translations.stats(1, 100)
      return <div data-testid="stats-single">{singleResultStats}</div>
    }
    StatsSingle.displayName = 'StatsSingle'

    originalModule.Stats = StatsSingle

    // Render with the updated mock
    const { unmount } = render(<Search />)

    expect(screen.getByTestId('stats-single')).toBeInTheDocument()
    expect(
      screen.getByText('1 resultado encontrado em 100ms')
    ).toBeInTheDocument()

    // Clean up by unmounting and restoring the original mock
    unmount()
    originalModule.Stats = originalStats
  })
})
