import { useCreateCategoryMutation } from "@/lib/state/features/categories/api-categories-slice";
import { CategoryForm } from "@/lib/types";
import { categoryFormSchema } from "@/lib/zod-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type UseCategoryForm = {
  category?: CategoryForm;
};

export default function useCategoryForm({ category }: UseCategoryForm) {
  const form = useForm<CategoryForm>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: category?.name || "",
    },
  });
  const [open, setOpen] = useState(false);
  const [createCategory, { isLoading: isCraeting }] =
    useCreateCategoryMutation();

  const onSubmitAddForm = (data: CategoryForm) => {
    createCategory(data)
      .unwrap()
      .then(() => {
        form.reset({
          name: "",
        });
        toast.success("Category created successfully");
        setOpen(false);
      })
      .catch(error => {
        console.error("Failed to create category: ", error);
        toast.error("Failed to create category");
      });
  };

  return {
    form,
    onSubmitAddForm,
    isCraeting,
    open,
    setOpen,
  } as const;
}
