import ListCard from "../../shared/list/list-card";
import DeleteAlert from "../../shared/list/delete-alert";
import { Category as CategoryType } from "@/lib/types";
import useDeleteCategory from "@/lib/hooks/categories/useDeleteCategory";

type CategoryProps = {
  category: CategoryType;
};

export default function Category({ category }: CategoryProps) {
  const { open, setOpen, handleDelete, isLoading } = useDeleteCategory();

  return (
    <ListCard className="flex flex-row justify-between">
      <p>{category.name}</p>

      <DeleteAlert
        id={category.id.toString()}
        open={open}
        setOpen={setOpen}
        handleDelete={handleDelete}
        isLoading={isLoading}
      />
    </ListCard>
  );
}
