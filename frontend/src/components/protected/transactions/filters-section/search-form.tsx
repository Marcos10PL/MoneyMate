"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchTransactionForm } from "@/lib/types";
import { searchTransactionFormSchema } from "@/lib/zod-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { SearchIcon } from "lucide-react";
import { useForm } from "react-hook-form";

export default function SearchForm() {
  const form = useForm<SearchTransactionForm>({
    resolver: zodResolver(searchTransactionFormSchema),
  });

  const onSubmit = (data: SearchTransactionForm) => {
    console.log("Szukam:", data.search);
  };

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
      <Button className="w-full md:w-fit flex items-center gap-2">
        <p>Search</p>
        <SearchIcon className="h-4 w-4" />
      </Button>
    </form>
  );
}
