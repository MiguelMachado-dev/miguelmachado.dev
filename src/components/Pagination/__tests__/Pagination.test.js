import { render, screen } from '@testing-library/react'
import Pagination from '..'

describe('Pagination component', () => {
  it('renders first page correctly', () => {
    render(
      <Pagination
        isFirst={true}
        isLast={false}
        currentPage={1}
        numPages={5}
        prevPage="/page/0"
        nextPage="/page/2"
      />
    )

    expect(screen.queryByText('← Página Anterior')).not.toBeInTheDocument()
    expect(screen.getByText('Próxima Página →')).toBeInTheDocument()
    expect(screen.getByText('1 de 5')).toBeInTheDocument()
  })

  it('renders middle page correctly', () => {
    render(
      <Pagination
        isFirst={false}
        isLast={false}
        currentPage={3}
        numPages={5}
        prevPage="/page/2"
        nextPage="/page/4"
      />
    )

    expect(screen.getByText('← Página Anterior')).toBeInTheDocument()
    expect(screen.getByText('Próxima Página →')).toBeInTheDocument()
    expect(screen.getByText('3 de 5')).toBeInTheDocument()
  })

  it('renders last page correctly', () => {
    render(
      <Pagination
        isFirst={false}
        isLast={true}
        currentPage={5}
        numPages={5}
        prevPage="/page/4"
        nextPage="/page/6"
      />
    )

    expect(screen.getByText('← Página Anterior')).toBeInTheDocument()
    expect(screen.queryByText('Próxima Página →')).not.toBeInTheDocument()
    expect(screen.getByText('5 de 5')).toBeInTheDocument()
  })
})
