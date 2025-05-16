import Transactions from "@/components/protected/user/transactions/transactions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Transactions",
};

export default function TransactionsPage() {
  return <Transactions />;
}
