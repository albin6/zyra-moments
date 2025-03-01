"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { DiscoverTab } from "./DiscoverTab";
import { BecomeMCTab } from "./BecomeMCTab";
import { PaymentTab } from "./PaymentTab";

export default function EventPlatform() {
  const [activeTab, setActiveTab] = useState("discover");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    string | null
  >(null);
  const [amount] = useState("$49.99");
  const [loading, setLoading] = useState(false);
  const [userData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
  });

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const handleNext = () => {
    if (activeTab === "discover") {
      setActiveTab("become-mc");
    } else if (activeTab === "become-mc") {
      setActiveTab("payment");
    }
  };

  const handlePrevious = () => {
    if (activeTab === "payment") {
      setActiveTab("become-mc");
    } else if (activeTab === "become-mc") {
      setActiveTab("discover");
    }
  };

  const handlePayment = () => {
    if (!selectedPaymentMethod) {
      toast.error("Please select a payment method");
      return;
    }

    setLoading(true);
    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      toast.success("Payment successful! You are now a Master of Ceremonies.");
      // Reset and return to discover tab
      setSelectedPaymentMethod(null);
      setActiveTab("discover");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 lg:p-12">
      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="w-full max-w-6xl mx-auto transition-all duration-300"
      >
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="discover">Discover</TabsTrigger>
          <TabsTrigger value="become-mc">Become an MC</TabsTrigger>
          <TabsTrigger value="payment">Payment</TabsTrigger>
        </TabsList>

        {/* First Tab: Discover Events */}
        <TabsContent value="discover" className="transition-all duration-300">
          <DiscoverTab onNext={handleNext} />
        </TabsContent>

        {/* Second Tab: Become a Master of Ceremonies */}
        <TabsContent value="become-mc" className="transition-all duration-300">
          <BecomeMCTab
            onNext={handleNext}
            onPrevious={handlePrevious}
            amount={amount}
          />
        </TabsContent>

        {/* Third Tab: Payment */}
        <TabsContent value="payment" className="transition-all duration-300">
          <PaymentTab
            onPrevious={handlePrevious}
            onPayment={handlePayment}
            selectedPaymentMethod={selectedPaymentMethod}
            setSelectedPaymentMethod={setSelectedPaymentMethod}
            amount={amount}
            userData={userData}
            loading={loading}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
