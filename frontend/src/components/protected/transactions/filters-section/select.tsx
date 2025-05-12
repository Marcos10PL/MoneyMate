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
import { Control } from "react-hook-form";
import { FilteringTransactionForm } from "@/lib/types";

type SelectFormProps = {
  title: string;
  control: Control<FilteringTransactionForm>;
  name: "category" | "sort_by";
};

export function SelectForm({ control, name, title }: SelectFormProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel>{title}</FormLabel>
          <Select onValueChange={field.onChange}>
            <FormControl className="w-full min-w-32">
              <SelectTrigger>
                <SelectValue
                  placeholder={`Select a ${title.toLocaleLowerCase()}`}
                />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {name === "sort_by" ? (
                <>
                  <SelectItem value="amount_desc">Descending</SelectItem>
                  <SelectItem value="amount_asc">Ascending</SelectItem>
                </>
              ) : (
                <>
                  <SelectItem value="food">Food</SelectItem>
                  <SelectItem value="transport">Transport</SelectItem>
                  <SelectItem value="entertainment">Entertainment</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </>
              )}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
