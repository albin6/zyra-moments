import { Spinner } from "@/components/ui/spinner";
import VendorTransactionsComponent from "@/components/vendor/VendorTransactionsComponent";
import { useVendorTransactionsQuery } from "@/hooks/service/useTransactions";
import { PopulatedPayments } from "@/types/Payment";
import { useEffect, useState } from "react";

export default function VendorTransactions() {
  const { data, isLoading } = useVendorTransactionsQuery();
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
      <VendorTransactionsComponent
        transactions={transactions}
        userRole="client" // Change to "vendor" or "admin" to see different views
      />
    </div>
  );
}
