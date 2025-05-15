import { useEffect, useState } from "react";

type usePaginationProps = {
  isFetching: boolean;
  isLoading: boolean;
  dataLength: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

export default function usePagination({
  isFetching,
  isLoading,
  dataLength,
  currentPage,
  setCurrentPage,
}: usePaginationProps) {
  const [isPageChanging, setIsPageChanging] = useState(false);

  useEffect(() => {
    if (isFetching) {
      setIsPageChanging(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  useEffect(() => {
    if (!isFetching && isPageChanging) {
      setIsPageChanging(false);
    }
  }, [isFetching, isPageChanging]);

  useEffect(() => {
    if (!isLoading && dataLength === 0 && currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  }, [dataLength, isLoading, currentPage, setCurrentPage]);

  return {
    isPageChanging,
  };
}
