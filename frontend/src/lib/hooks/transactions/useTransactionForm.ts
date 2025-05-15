import { useGetCategoriesQuery } from "@/lib/state/features/categories/api-categories-slice";
import {
  useCreateTransactionMutation,
  useUpdateTransactionMutation,
} from "@/lib/state/features/transactions/api-transactions-slice";
import { useGetTypesQuery } from "@/lib/state/features/types/api-types-slice";
import { Transaction, TransactionForm } from "@/lib/types";
import { transactionFormSchema } from "@/lib/zod-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type UseTransactionForm = {
  transaction?: Transaction;
};

export default function useTransactionForm({
  transaction,
}: UseTransactionForm) {
  const form = useForm<TransactionForm>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: {
      name: transaction?.name || "",
      amount: transaction?.amount.toString() || "",
      category_id: undefined,
      type_id: undefined,
      date: transaction?.date ? new Date(transaction.date) : new Date(),
    },
  });

  const [createTransaction, { isLoading: isCraeting }] =
    useCreateTransactionMutation();
  const [updateTransaction, { isLoading: isUpdating }] =
    useUpdateTransactionMutation();

  const { data: categories, isSuccess: categoriesLoaded } =
    useGetCategoriesQuery({});
  const { data: types, isSuccess: typesLoaded } = useGetTypesQuery();

  const [open, setOpen] = useState(false);

  const onSubmitAddForm = async (data: TransactionForm) => {
    createTransaction(data)
      .unwrap()
      .then(() => {
        form.reset({
          name: "",
          amount: "",
          category_id: data.category_id,
          type_id: data.type_id,
        });
        toast.success("Transaction created successfully");
        setOpen(false);
      })
      .catch(error => {
        console.error("Failed to create transaction: ", error);
        toast.error("Failed to create transaction");
      });
  };

  const onSubmitUpdateForm = async (data: TransactionForm) => {
    if (transaction?.id) {
      updateTransaction({ ...data, id: transaction?.id.toString() })
        .unwrap()
        .then(() => {
          toast.success("Transaction updated successfully");
          setOpen(false);
        })
        .catch(error => {
          console.error("Failed to update transaction: ", error);
          toast.error("Failed to update transaction");
        });
    }
  };

  useEffect(() => {
    if (transaction && categoriesLoaded && typesLoaded) {
      const category = categories.data.categories.find(
        c => c.name === transaction.category
      );
      const type = types.find(t => t.name === transaction.type);

      if (category) {
        form.setValue("category_id", category.id.toString());
      }

      if (type) {
        form.setValue("type_id", type.id.toString());
      }
    }
  }, [transaction, categoriesLoaded, typesLoaded, categories, types, form]);

  return {
    form,
    open,
    setOpen,
    isLoading: transaction ? isUpdating : isCraeting,
    onSubmit: transaction ? onSubmitUpdateForm : onSubmitAddForm,
  } as const;
}
