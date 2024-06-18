import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
} from 'react-icons/fi'
import { usePagination } from '../hooks/usePagination'
import { Button } from './ui/button'

export function Pagination() {
  const {
    goToFirstPage,
    goToNextPage,
    goToPreviousPage,
    goToLastPage,
    page,
    pagination,
  } = usePagination()

  function handleGoToFirstPage() {
    goToFirstPage()
  }

  function handleGoToNextPage() {
    goToNextPage()
  }

  function handleGoToPreviousPage() {
    goToPreviousPage()
  }

  function handleGoToLastPage() {
    goToLastPage()
  }

  return (
    <div className="mt-4 mr-12 flex items-center justify-end gap-2">
      <Button
        onClick={handleGoToFirstPage}
        disabled={page <= 1}
        variant="outline"
        size="icon"
      >
        <FiChevronsLeft />
      </Button>

      <Button
        onClick={handleGoToPreviousPage}
        disabled={page <= 1}
        variant="outline"
        size="icon"
      >
        <FiChevronLeft />
      </Button>

      <Button
        onClick={handleGoToNextPage}
        disabled={page === pagination?.totalPages}
        variant="outline"
        size="icon"
      >
        <FiChevronRight />
      </Button>

      <Button
        onClick={handleGoToLastPage}
        disabled={page === pagination?.totalPages}
        variant="outline"
        size="icon"
      >
        <FiChevronsRight />
      </Button>
    </div>
  )
}
