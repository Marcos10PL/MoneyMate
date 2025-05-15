"use client";

import useCategories from "@/lib/hooks/categories/useCategories";
import Loading from "../../shared/response/loading";
import ErrorMsg from "../../shared/response/error-msg";
import NotFoundMsg from "../../shared/response/not-found-msg";
import Category from "./category";
import { InfoIcon } from "lucide-react";

export default function CategoriesList() {
  const { data, isLoading, isError } = useCategories({});

  return (
    <section className="pt-2">
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <ErrorMsg msg="Error loading categories" />
      ) : data?.data.categories.length === 0 ? (
        <NotFoundMsg msg="No categories found" />
      ) : (
        <>
          <p className="pt-2 pb-4 px-1 text-justify flex items-center gap-2">
            <InfoIcon />
            Categories can only be deleted if they are not used in any
            transactions.
          </p>
          <div className="md:*:w-[calc(50%-.25rem)] *:w-full flex flex-wrap gap-2">
            {data?.data.categories.map(category => (
              <Category key={category.id} category={category} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
