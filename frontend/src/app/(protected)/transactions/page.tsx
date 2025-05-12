import DialogForm from "@/components/protected/transactions/filters-section/dialog-form";
import FilterForm from "@/components/protected/transactions/filters-section/filter-form";
import SearchForm from "@/components/protected/transactions/filters-section/search-form";
import TransactionCard from "@/components/protected/transactions/transactions-section/transaction-card";
import { ScaleIcon, TrendingDownIcon, TrendingUpIcon } from "lucide-react";

export default function Dashboard() {
  return (
    <>
      <header className="border-b pt-2 pb-4 font-bold flex flex-wrap items-center justify-center gap-6">
        <div className="flex items-center justify-center gap-2">
          <TrendingUpIcon className="h-6 w-6 text-green-400" />
          <p>1234,00 PLN</p>
        </div>
        <div className="flex items-center justify-center gap-2">
          <TrendingDownIcon className="h-6 w-6 text-red-400" />
          <p>1234,00 PLN</p>
        </div>
        <div className="flex items-center justify-center gap-2">
          <ScaleIcon className="h-6 w-6 text-yellow-600" />
          <p>00,00 PLN</p>
        </div>
      </header>

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

      <section className="py-4 space-y-2">
        
        <TransactionCard />
        <TransactionCard />
        <TransactionCard />
        <TransactionCard />
      </section>
    </>
  );
}
