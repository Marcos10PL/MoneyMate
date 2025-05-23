"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ListFilterIcon } from "lucide-react";
import FilterForm from "./filter-form";
import { useState } from "react";
import { FilteringTransactionForm } from "@/lib/types";

type DialogFormProps = {
  onSubmit: (data: FilteringTransactionForm) => void;
};

export default function DialogForm({ onSubmit }: DialogFormProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <p>Filter</p>
          <ListFilterIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Filter your transactions</DialogTitle>
        <DialogDescription>
          Use this form to filter your transactions
        </DialogDescription>
        <FilterForm setOpen={setOpen} onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
}
