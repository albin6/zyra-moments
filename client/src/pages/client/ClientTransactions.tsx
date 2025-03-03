import TransactionsComponent from "@/components/TransactionsComponent";
import { PaymentStatus, PopulatedWallet, Purpose } from "@/types/Wallet";

// Example usage of the wallet component
export default function ClientTransactions() {
  // Mock transactions data
  const transactions: PopulatedWallet[] = [
    {
      _id: "wallet123",
      userId: {
        _id: "user123",
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
      },
      paymentId: [
        {
          _id: "payment1",
          transactionId: "TRX12345",
          amount: 500,
          currency: "USD",
          status: PaymentStatus.COMPLETED,
          purpose: Purpose.DEPOSIT,
        },
        {
          _id: "payment2",
          transactionId: "TRX12346",
          amount: 200,
          currency: "USD",
          status: PaymentStatus.COMPLETED,
          purpose: Purpose.WITHDRAWAL,
        },
      ],
      role: "client",
      balance: 1250.75,
      createdAt: new Date(2023, 5, 15),
      updatedAt: new Date(2023, 5, 15),
    },
    {
      _id: "wallet456",
      userId: {
        _id: "user456",
        firstName: "Jane",
        lastName: "Smith",
        email: "jane.smith@example.com",
      },
      paymentId: [
        {
          _id: "payment3",
          transactionId: "TRX12347",
          amount: 150,
          currency: "USD",
          status: PaymentStatus.PENDING,
          purpose: Purpose.PAYMENT,
        },
        {
          _id: "payment4",
          transactionId: "TRX12348",
          amount: 50,
          currency: "USD",
          status: PaymentStatus.COMPLETED,
          purpose: Purpose.REFUND,
        },
      ],
      role: "vendor",
      balance: 950.75,
      createdAt: new Date(2023, 6, 1),
      updatedAt: new Date(2023, 6, 1),
    },
  ];

  return (
    <div className="container mx-auto py-6 px-4">
      <TransactionsComponent
        transactions={transactions}
        userRole="client" // Change to "vendor" or "admin" to see different views
      />
    </div>
  );
}
