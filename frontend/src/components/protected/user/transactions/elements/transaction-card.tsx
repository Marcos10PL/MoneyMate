"use client";

import { Transaction } from "@/lib/types";
import { cn } from "@/lib/utils";
import { PencilIcon } from "lucide-react";
import DeleteAlert from "../../../shared/list/delete-alert";
import TransactionForm from "../forms/transaction-form";
import useTransactionForm from "@/lib/hooks/transactions/useTransactionForm";
import useDeleteTransaction from "@/lib/hooks/transactions/useDeleteTransaction";
import ListCard, {
  ListCardFooter,
  ListCardInfo,
  ListCardName,
} from "@/components/protected/shared/list/list-card";

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
    <ListCard>
      <ListCardName>
        <Name name={transaction.name} date={transaction.date} />
      </ListCardName>
      <ListCardInfo>
        <Info
          type={transaction.type}
          amount={transaction.amount}
          category={transaction.category}
        />
        <ListCardFooter>
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
        </ListCardFooter>
      </ListCardInfo>
    </ListCard>
  );
}

function Name({ name, date }: Pick<Transaction, "name" | "date">) {
  return (
    <>
      {name}{" "}
      <span className="text-sm text-gray-400 ml-2">
        ({new Date(date).toLocaleDateString()})
      </span>
    </>
  );
}

function Info({
  type,
  amount,
  category,
}: Pick<Transaction, "type" | "amount" | "category">) {
  return (
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
        <span className="text-sm text-muted-foreground ml-4"> {category}</span>
      )}
    </p>
  );
}
