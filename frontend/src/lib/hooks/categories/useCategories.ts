import { useGetCategoriesQuery } from "@/lib/state/features/categories/api-categories-slice";
import { CategoryParams } from "@/lib/types";
import { useState } from "react";

export default function useCategories({
  page,
  per_page = 1000,
}: Partial<CategoryParams>) {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError } = useGetCategoriesQuery({
    page: page || currentPage,
    per_page: per_page,
  });

  return {
    data,
    isLoading,
    currentPage,
    setCurrentPage,
    isError,
  } as const;
}
