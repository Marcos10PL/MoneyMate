import { useDeleteTransactionMutation } from "@/lib/state/features/transactions/api-transactions-slice";
import { useState } from "react";
import { toast } from "sonner";

export default function useDeleteTransaction() {
  const [deleteTransaction, { isLoading }] = useDeleteTransactionMutation();
  const [open, setOpen] = useState(false);

  const handleDelete = (id: string) => {
    deleteTransaction(id)
      .unwrap()
      .then(() => {
        toast.success("Transaction deleted successfully");
        setOpen(false);
      })
      .catch(error => {
        console.error("Failed to delete transaction: ", error);
        toast.error("Failed to delete transaction");
      });
  };

  return {
    isLoading,
    open,
    setOpen,
    handleDelete,
  };
}
