import AdminTransactionsComponent from "@/components/admin/AdminTransactionsComponent";
import { Spinner } from "@/components/ui/spinner";
import { useAdminTransactionsQuery } from "@/hooks/service/useTransactions";
import { PopulatedPayments } from "@/types/Payment";
import { useEffect, useState } from "react";

export default function AdminTransactions() {
  const { data, isLoading } = useAdminTransactionsQuery();
  const [transactions, setTransactions] = useState<PopulatedPayments[] | null>(
    null
  );

  useEffect(() => {
    if (data) {
      setTransactions(data.payments);
    }
  }, [data]);

  if (isLoading) {
    return <Spinner />;
  }

  if (!transactions) {
    return null;
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <AdminTransactionsComponent
        transactions={transactions}
        userRole="admin"
      />
    </div>
  );
}
