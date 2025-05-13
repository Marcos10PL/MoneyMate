"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Transaction } from "@/lib/types";
import { cn } from "@/lib/utils";
import { PencilIcon, TrashIcon } from "lucide-react";

type TransactionCardProps = {
  transaction: Transaction;
};

export default function TransactionCard({ transaction }: TransactionCardProps) {
  const handleEdit = () => {
    console.log("Edit transaction");
  };

  const handleDelete = () => {
    console.log("Delete transaction");
  };

  return (
    <Card className="flex flex-col md:flex-row px-3 py-2 justify-between items-center">
      <div className="w-full md:w-1/2">
        {transaction.name} (
        {new Date(transaction.created_at).toLocaleDateString()})
      </div>
      <div className="flex items-center justify-between md:w-1/2 w-full">
        <p
          className={cn(
            transaction.type === "income" ? "text-green-200" : "text-red-200"
          )}
        >
          {transaction.type === "income" ? "+" : "-"}
          {transaction.amount}
          PLN
        </p>
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={handleEdit}>
            <PencilIcon className="h-4 w-4 text-blue-400" />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleDelete}>
            <TrashIcon className="h-4 w-4 text-red-400" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
