import TransactionForm from "../forms/transaction-form";
import { FilteringTransactionForm, SearchTransactionForm } from "@/lib/types";
import useTransactionForm from "@/lib/hooks/transactions/useTransactionForm";
import { PlusIcon } from "lucide-react";
import DialogForm from "../forms/dialog-form";
import SearchForm from "../forms/search-form";
import FilterForm from "../forms/filter-form";

type FormsProps = {
  onSubmitFilter: (data: FilteringTransactionForm) => void;
  onSubmitSearch: (data: SearchTransactionForm) => void;
  onResetSearch: () => void;
};

export default function Forms({
  onSubmitFilter,
  onSubmitSearch,
  onResetSearch,
}: FormsProps) {
  const { form, isLoading, open, setOpen, onSubmit } = useTransactionForm({});

  return (
    <section className="pb-4 border-b">
      <div className="flex flex-col md:flex-row gap-2 lg:hidden">
        <DialogForm onSubmit={onSubmitFilter} />
        <SearchForm onSubmit={onSubmitSearch} onResetSearch={onResetSearch} />
      </div>
      <div className="hidden lg:block">
        <FilterForm onSubmit={onSubmitFilter} />
        <SearchForm onSubmit={onSubmitSearch} onResetSearch={onResetSearch} />
      </div>
      <div className="flex mt-2 *:grow">
        <TransactionForm
          title="Add Transaction"
          buttonText="Add new"
          openButtonText="Add Transaction"
          icon={PlusIcon}
          form={form}
          open={open}
          setOpen={setOpen}
          onSubmit={onSubmit}
          isLoading={isLoading}
        />
      </div>
    </section>
  );
}
