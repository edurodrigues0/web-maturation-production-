import { ReactNode, createContext, useContext, useState } from "react"

interface Pagination {
  currentPage: number
  totalItems: number
  totalPages: number
  itemsPerPage: number
}

interface PaginationContextData {
  goToFirstPage: () => void
  goToPreviousPage: () => void
  goToNextPage: () => void
  goToLastPage: () => void
  onCurrentPage: (page: number) => void
  pagination: Pagination | undefined
  page: number
  setPagination: (data: Pagination) => void
}

interface PaginationProviderProps {
  children: ReactNode
}

export const PaginationContext = createContext({} as PaginationContextData)

export function PaginationContextProvider({ children }: PaginationProviderProps) {
  const [pagination, setPagination] = useState<Pagination>()

  const [page, setPage] = useState(() => {
    const url = new URL(window.location.toString())

    if (url.searchParams.has('page')) {
      return Number(url.searchParams.get('page'))
    }

    return 1
  })

  function onCurrentPage(page: number) {
    const url = new URL(window.location.href)

    url.searchParams.set('page', String(page))

    window.history.pushState({}, '', url)
    setPage(page)
  }

  function goToFirstPage() {
    onCurrentPage(1)
  }

  function goToPreviousPage() {
    if (page <= 1) {
      return
    }

    onCurrentPage(page - 1)
  }

  function goToNextPage() {
    if (page === pagination?.totalPages) {
      return
    }

    onCurrentPage(page + 1)
  }

  function goToLastPage() {
    if (page === pagination?.totalPages) {
      return
    }

    if (pagination?.totalPages === undefined) {
      return
    }

    onCurrentPage(pagination?.totalPages)
  }

  return (
    <PaginationContext.Provider
      value={{
        goToFirstPage,
        goToLastPage,
        goToNextPage,
        goToPreviousPage,
        onCurrentPage,
        setPagination,
        pagination,
        page,
      }}
    >
      { children }
    </PaginationContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function usePagination() {
  const context = useContext(PaginationContext)

  return context
}