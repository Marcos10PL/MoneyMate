import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { TransactionForm as TransactionFormType } from "@/lib/types";
import { TransactionFormSchema } from "@/lib/zod-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { SelectForm } from "./select";
import { cn } from "@/lib/utils";

export default function TransactionForm() {
  const form = useForm<TransactionFormType>({
    resolver: zodResolver(TransactionFormSchema),
  });

  const onSubmit = async (data: TransactionFormType) => {
    console.log(data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <p>Add new </p>
          <PlusIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Add Transaction</DialogTitle>
        <DialogDescription>
          Fill in the details of the transaction.
        </DialogDescription>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <Input
              {...form.register("name")}
              placeholder="Transaction Name"
              className={cn(
                "my-2",
                form.formState.errors.amount && "border-red-400"
              )}
            />
            {form.formState.errors.name && (
              <p className="text-red-400 text-sm mt-0">
                {form.formState.errors.name.message}
              </p>
            )}

            <Input
              {...form.register("amount")}
              placeholder="Amount"
              className={cn(
                "my-2",
                form.formState.errors.amount && "border-red-400"
              )}
            />
            {form.formState.errors.amount && (
              <p className="text-red-400 text-sm mt-0">
                {form.formState.errors.amount.message}
              </p>
            )}

            <div className="py-2 space-y-4">
              <SelectForm
                control={form.control}
                name="category_id"
                title="Category"
                noFilter
              />

              <SelectForm
                control={form.control}
                name="type_id"
                title="Type"
                noFilter
              />
            </div>

            <Button type="submit">Submit</Button>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
