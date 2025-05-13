import DialogForm from "@/components/protected/transactions/filters-section/dialog-form";
import FilterForm from "@/components/protected/transactions/filters-section/filter-form";
import SearchForm from "@/components/protected/transactions/filters-section/search-form";
import Transactions from "@/components/protected/transactions/transactions";

export default function TransactionsPage() {
  return (
    <>
      <section className="py-4 border-b">
        <div className="flex flex-col md:flex-row gap-2 lg:hidden">
          <DialogForm />
          <SearchForm />
        </div>
        <div className="hidden lg:block">
          <FilterForm />
          <SearchForm />
        </div>
      </section>

      <Transactions />
    </>
  );
}
