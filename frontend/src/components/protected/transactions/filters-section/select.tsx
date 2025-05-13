"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Control, FieldValues, Path } from "react-hook-form";
import { useGetTypesQuery } from "@/lib/state/features/types/api-types-slice";
import { useGetCategoriesQuery } from "@/lib/state/features/categories/api-categories-slice";

type SelectFormProps<T extends FieldValues> = {
  title: string;
  control: Control<T>;
  name: Path<T>;
  noFilter?: true;
};

export function SelectForm<T extends FieldValues>({
  control,
  name,
  title,
  noFilter,
}: SelectFormProps<T>) {
  const { data: types } = useGetTypesQuery();
  const { data: categories } = useGetCategoriesQuery();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel>{title}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl className="w-full min-w-32">
              <SelectTrigger>
                <SelectValue placeholder="Select a value" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {!noFilter && <SelectItem value={"all"}>All</SelectItem>}
              {name === "sort_by" && (
                <>
                  <SelectItem value="desc">Descending</SelectItem>
                  <SelectItem value="asc">Ascending</SelectItem>
                </>
              )}
              {name === "category_id" &&
                categories?.map(category => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    {category.name}
                  </SelectItem>
                ))}
              {name === "type_id" &&
                types?.map(type => (
                  <SelectItem key={type.id} value={type.id.toString()}>
                    {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
