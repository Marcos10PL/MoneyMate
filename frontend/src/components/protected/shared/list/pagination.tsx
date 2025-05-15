import {
  Pagination as PaginationComponent,
  PaginationContent,
  PaginationItem,
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
  const handleNextPage = () => {
    if (currentPage < lastPage) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  if(lastPage <= 1) return null;

  return (
    <PaginationComponent className="py-2">
      <PaginationContent>
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

        {lastPage > 1 && (
          <PaginationItem className="px-2">
            {currentPage} / {lastPage}
          </PaginationItem>
        )}

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
