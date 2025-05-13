"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Transaction } from "@/lib/types";
import { cn } from "@/lib/utils";
import { PencilIcon, TrashIcon } from "lucide-react";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useDeleteTransactionMutation } from "@/lib/state/features/transactions/api-transactions-slice";
import { toast } from "sonner";
import Spinner from "@/components/spinner";

type TransactionCardProps = {
  transaction: Transaction;
};

export default function TransactionCard({ transaction }: TransactionCardProps) {
  const [deleteTransaction, { isLoading }] = useDeleteTransactionMutation();

  const handleEdit = () => {
    console.log("Edit transaction");
  };

  const handleDelete = (id: string) => {
    console.log(id);
    deleteTransaction(id)
      .unwrap()
      .then(() => {
        toast.success("Transaction deleted successfully");
      })
      .catch(error => {
        console.error("Failed to delete transaction: ", error);
        toast.error("Failed to delete transaction");
      });
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
            transaction.type === "income" ? "text-green-400" : "text-red-400"
          )}
        >
          {transaction.type === "income" ? "+ " : "- "}
          {transaction.amount} PLN
          {transaction.category && (
            <span className="text-sm text-muted-foreground ml-4">
              {" "}
              {transaction.category}
            </span>
          )}
        </p>
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={handleEdit}>
            <PencilIcon className="h-4 w-4 text-blue-400" />
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="icon">
                <TrashIcon className="h-4 w-4 text-red-400" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <Button
                  onClick={() => handleDelete(transaction.id.toString())}
                >
                  {isLoading ? <Spinner /> : "Delete"}
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </Card>
  );
}
