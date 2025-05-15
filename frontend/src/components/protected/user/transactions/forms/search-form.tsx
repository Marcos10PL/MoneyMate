"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchTransactionForm } from "@/lib/types";
import { searchTransactionFormSchema } from "@/lib/zod-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { SearchIcon, XIcon } from "lucide-react";
import { useForm } from "react-hook-form";

type SearchFormProps = {
  onSubmit: (data: SearchTransactionForm) => void;
  onResetSearch: () => void;
};

export default function SearchForm({
  onSubmit,
  onResetSearch,
}: SearchFormProps) {
  const form = useForm<SearchTransactionForm>({
    resolver: zodResolver(searchTransactionFormSchema),
  });

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col md:flex-row w-full gap-2"
    >
      <Input
        type="search"
        placeholder="Search..."
        {...form.register("search")}
        className="w-full"
      />
      <div className="w-full md:w-fit flex items-center gap-2">
        <Button
          variant={"secondary"}
          onClick={() => {
            onResetSearch();
            form.reset();
          }}
          className="flex items-center gap-2 grow"
        >
          <XIcon />
        </Button>
        <Button className="flex items-center gap-2 grow">
          <p>Search</p>
          <SearchIcon className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
}
