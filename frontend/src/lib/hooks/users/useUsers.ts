import { useGetUsersQuery } from "@/lib/state/features/users/api-users-slice";
import { UserParams } from "@/lib/types";
import { useState } from "react";
import usePagination from "../usePagination";

export default function useUsers({ per_page = 10, page }: Partial<UserParams>) {
  const [currentPage, setCurrentPage] = useState(1);

  const { isLoading, isError, isFetching, data } = useGetUsersQuery({
    per_page: per_page,
    page: page || currentPage,
  });

  const { isPageChanging } = usePagination({
    isFetching,
    isLoading,
    dataLength: data?.data.users.length ?? 0,
    currentPage,
    setCurrentPage,
  });

  return {
    data,
    isLoading,
    isError,
    setCurrentPage,
    isPageChanging,
  };
}
