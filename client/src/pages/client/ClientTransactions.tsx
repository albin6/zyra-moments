import TransactionsComponent from "@/components/TransactionsComponent";
import { Spinner } from "@/components/ui/spinner";
import { useClientWallet } from "@/hooks/wallet/useWallet";
import { WalletTransactions } from "@/types/Wallet";
import { useEffect, useState } from "react";

export default function ClientTransactions() {
  const { data, isLoading } = useClientWallet();
  const [transactions, setTransactions] = useState<WalletTransactions | null>(
    null
  );

  useEffect(() => {
    if (data) {
      setTransactions({
        userId: data.userId,
        paymentId: data.paymentId,
      });
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
      <TransactionsComponent
        transactions={transactions}
        userRole="client" // Change to "vendor" or "admin" to see different views
      />
    </div>
  );
}
