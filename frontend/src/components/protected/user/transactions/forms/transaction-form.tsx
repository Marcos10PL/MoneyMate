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
import { FormProvider, UseFormReturn } from "react-hook-form";
import { SelectForm } from "../elements/select";
import { cn } from "@/lib/utils";
import Spinner from "@/components/spinner";
import { LucideIcon } from "lucide-react";
import { CalendarForm } from "../elements/calendar-form";

type TransactionFormProps = {
  title: string;
  buttonText: string;
  openButtonText: string;
  icon: LucideIcon;
  onSubmit: (data: TransactionFormType) => void;
  form: UseFormReturn<TransactionFormType>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
};

export default function TransactionForm({
  title,
  buttonText,
  openButtonText,
  icon: Icon,
  form,
  open,
  setOpen,
  onSubmit,
  isLoading,
}: TransactionFormProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={openButtonText === "" ? "ghost" : "default"}
          className={cn(openButtonText === "" && "text-blue-300")}
        >
          {openButtonText !== "" && <p>{openButtonText} </p>}
          <Icon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>{title}</DialogTitle>
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
                form.formState.errors.name && "border-red-400"
              )}
            />
            {form.formState.errors.name && (
              <p className="text-red-400 text-sm mt-0">
                {form.formState.errors.name?.message}
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
              <CalendarForm
                control={form.control}
                name="date"
                title="Date"
              />
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

            <Button
              type="submit"
              className="w-full md:w-fit min-w-36"
              disabled={isLoading || !open}
            >
              {isLoading ? <Spinner /> : buttonText}
            </Button>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
