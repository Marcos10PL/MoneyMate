import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { CategoryForm as CategoryFormType } from "@/lib/types";
import { FormProvider, UseFormReturn } from "react-hook-form";
import { cn } from "@/lib/utils";
import Spinner from "@/components/spinner";
import { LucideIcon } from "lucide-react";

type TransactionFormProps = {
  title: string;
  buttonText: string;
  openButtonText: string;
  icon: LucideIcon;
  onSubmit: (data: CategoryFormType) => void;
  form: UseFormReturn<CategoryFormType>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
};

export default function CategoryForm({
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
          Fill the name of the category.
        </DialogDescription>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Input
              {...form.register("name")}
              placeholder="Category Name"
              className={cn(
                "mb-3",
                form.formState.errors.name && "border-red-400 mb-1"
              )}
            />
            {form.formState.errors.name && (
              <p className="text-red-400 text-sm mt-0 mb-4">
                {form.formState.errors.name?.message}
              </p>
            )}

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
