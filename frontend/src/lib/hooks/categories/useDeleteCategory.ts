import { useDeleteCategoryMutation } from "@/lib/state/features/categories/api-categories-slice";
import { useState } from "react";
import { toast } from "sonner";

export default function useDeleteCategory() {
  const [deleteCategory, { isLoading }] = useDeleteCategoryMutation();
  const [open, setOpen] = useState(false);

  const handleDelete = (id: string) => {
    deleteCategory(id)
      .unwrap()
      .then(() => {
        setOpen(false);
        toast.success("Category deleted successfully");
      })
      .catch(error => {
        console.error("Failed to delete category: ", error);
        toast.error("Failed to delete category");
      });
  };

  return {
    open,
    setOpen,
    handleDelete,
    isLoading,
  } as const;
}
