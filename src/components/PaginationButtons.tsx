import { HStack, IconButton } from "@chakra-ui/react";
import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from "react-icons/fi";
import { usePagination } from "../hooks/usePagination";

export function PaginationButtons() {
  const { goToFirstPage, goToNextPage, goToPreviousPage, goToLastPage, page, pagination } = usePagination()

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
    <HStack
      justifyContent="flex-end" 
      spacing={2}
    >
      <IconButton
        onClick={handleGoToFirstPage}
        isDisabled={page <= 1}
        colorScheme="purple"
        aria-label="First page"
        icon={<FiChevronsLeft />}
      />
      <IconButton
        onClick={handleGoToPreviousPage}
        isDisabled={page <= 1}
        colorScheme="purple"
        aria-label="Previous page"
        icon={<FiChevronLeft />}
      />
      <IconButton
        onClick={handleGoToNextPage}
        isDisabled={page === pagination?.totalPages}
        colorScheme="purple"
        aria-label="Next page"
        icon={<FiChevronRight />}
      />
      <IconButton
        onClick={handleGoToLastPage}
        isDisabled={page === pagination?.totalPages}
        colorScheme="purple"
        aria-label="Last page"
        icon={<FiChevronsRight />}
      />
    </HStack>
  )
}