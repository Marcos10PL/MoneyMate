"use client";

import Header from "../../shared/header";
import CategoriesList from "./categories-list";
import CategoryForm from "./category-form";
import useCategoryForm from "@/lib/hooks/categories/useCategoryForm";
import { PlusIcon } from "lucide-react";

export default function Categories() {
  const { form, open, setOpen, onSubmitAddForm, isCraeting } = useCategoryForm(
    {}
  );

  return (
    <>
      <Header title="Categories" backButton />
      <div className="flex mt-2 *:grow">
        <CategoryForm
          title="Edit Category"
          buttonText="Add Category"
          openButtonText="Add Category"
          icon={PlusIcon}
          form={form}
          open={open}
          setOpen={setOpen}
          onSubmit={onSubmitAddForm}
          isLoading={isCraeting}
        />
      </div>
      <CategoriesList />
    </>
  );
}
