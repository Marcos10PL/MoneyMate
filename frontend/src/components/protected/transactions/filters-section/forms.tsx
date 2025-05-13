import AddUpdateTransactionForm from "./transaction-form";
import DialogForm from "./dialog-form";
import FilterForm from "./filter-form";
import SearchForm from "./search-form";
import { FilteringTransactionForm, SearchTransactionForm } from "@/lib/types";

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
        <AddUpdateTransactionForm />
      </div>
    </section>
  );
}
