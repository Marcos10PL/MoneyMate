"use client";

import { FormProvider, useForm } from "react-hook-form";
import { CalendarForm } from "./day-picker";
import { SelectForm } from "./select";
import { FilteringTransactionForm } from "@/lib/types";
import { filteringTransactionFormSchema } from "@/lib/zod-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";

type FilterFormProps = {
  setOpen?: (open: boolean) => void;
};

export default function FilterForm({ setOpen }: FilterFormProps) {
  const form = useForm<FilteringTransactionForm>({
    resolver: zodResolver(filteringTransactionFormSchema),
  });

  const onSubmit = (data: FilteringTransactionForm) => {
    console.log("Data od:", data.date_from);
    console.log("Data do:", data.date_to);
    console.log("Kategoria:", data.category);
    console.log("Sortowanie:", data.sort_by);
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="my-2 flex flex-col lg:flex-row items-center gap-2 space-y-4 lg:space-y-0"
      >
        <CalendarForm
          title="Date from"
          control={form.control}
          name="date_from"
        />
        <CalendarForm title="Date to" control={form.control} name="date_to" />
        <SelectForm title="Category" control={form.control} name="category" />
        <SelectForm title="Sort by" control={form.control} name="sort_by" />
        <Button
          onClick={setOpen ? () => setOpen(false) : undefined}
          className="self-end w-full lg:w-fit"
        >
          Filter
        </Button>
      </form>
    </FormProvider>
  );
}
