import {
  Pagination as PaginationComponent,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

type PaginationProps = {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  lastPage: number;
};

export default function Pagination({
  currentPage,
  setCurrentPage,
  lastPage,
}: PaginationProps) {
  const handlePageChange = (page: number) => setCurrentPage(page);

  const handleNextPage = () => {
    if (currentPage < lastPage) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <PaginationComponent className="py-2">
      <PaginationContent>
        {/* Previous Page */}
        <PaginationItem>
          <PaginationPrevious
            onClick={handlePreviousPage}
            className={cn(
              "cursor-pointer",
              currentPage === 1 && "pointer-events-none opacity-50"
            )}
          >
            Previous
          </PaginationPrevious>
        </PaginationItem>

        {/* Current Page */}
        <PaginationItem>
          <PaginationLink
            className={cn(
              "cursor-pointer",
              currentPage === 1 && "pointer-events-none opacity-50"
            )}
            onClick={() => handlePageChange(1)}
          >
            1
          </PaginationLink>
        </PaginationItem>

        {/* Ellipsis if more pages */}
        {lastPage > 1 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {/* Last Page */}
        {lastPage > 1 && (
          <PaginationItem>
            <PaginationLink
              className={cn(
                "cursor-pointer",
                currentPage === lastPage && "pointer-events-none opacity-50"
              )}
              onClick={() => handlePageChange(lastPage)}
            >
              {lastPage}
            </PaginationLink>
          </PaginationItem>
        )}

        {/* Next Page */}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={handleNextPage}
            className={cn(
              "cursor-pointer",
              currentPage === lastPage && "pointer-events-none opacity-50"
            )}
          >
            Next
          </PaginationNext>
        </PaginationItem>
      </PaginationContent>
    </PaginationComponent>
  );
}
