"use client";

import { Card } from "@/components/ui/card";
import { Transaction } from "@/lib/types";
import { cn } from "@/lib/utils";
import { PencilIcon } from "lucide-react";
import DeleteAlert from "./delete-alert";
import TransactionForm from "../forms/transaction-form";
import useTransactionForm from "@/lib/hooks/transactions/useTransactionForm";
import useDeleteTransaction from "@/lib/hooks/transactions/useDeleteTransaction";

type TransactionCardProps = {
  transaction: Transaction;
};

export default function TransactionCard({ transaction }: TransactionCardProps) {
  const { form, isLoading, open, setOpen, onSubmit } = useTransactionForm({
    transaction,
  });

  const {
    handleDelete,
    isLoading: isDeleting,
    open: isOpen,
    setOpen: setIsOpen,
  } = useDeleteTransaction();

  return (
    <Card className="flex flex-col md:flex-row px-3 py-2 justify-between items-center">
      <Name name={transaction.name} date={transaction.date} />
      <div className="flex items-center justify-between md:w-1/2 w-full">
        <Info
          type={transaction.type}
          amount={transaction.amount}
          category={transaction.category}
        />
        <div className="flex items-center">
          <TransactionForm
            title="Edit Transaction"
            buttonText="Edit"
            openButtonText=""
            icon={PencilIcon}
            form={form}
            open={open}
            setOpen={setOpen}
            onSubmit={onSubmit}
            isLoading={isLoading}
          />
          <DeleteAlert
            open={isOpen}
            setOpen={setIsOpen}
            handleDelete={handleDelete}
            isLoading={isDeleting}
            id={transaction.id.toString()}
          />
        </div>
      </div>
    </Card>
  );
}

function Name({ name, date }: Pick<Transaction, "name" | "date">) {
  return (
    <div className="w-full md:w-1/2">
      {name}{" "}
      <span className="text-sm text-gray-400 ml-2">
        ({new Date(date).toLocaleDateString()})
      </span>
    </div>
  );
}

function Info({
  type,
  amount,
  category,
}: Pick<Transaction, "type" | "amount" | "category">) {
  return (
    <div className="flex items-center">
      <p
        className={cn(
          type === "income"
            ? "dark:text-green-300 text-green-800"
            : "dark:text-red-300 text-red-800"
        )}
      >
        {type === "income" ? "+" : "-"}
        {amount} PLN
        {category && (
          <span className="text-sm text-muted-foreground ml-4">
            {" "}
            {category}
          </span>
        )}
      </p>
    </div>
  );
}
