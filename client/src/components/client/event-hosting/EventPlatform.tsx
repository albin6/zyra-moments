import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { DiscoverTab } from "./DiscoverTab";
import { BecomeMCTab } from "./BecomeMCTab";
import { PaymentTab } from "./PaymentTab";
import { motion } from "framer-motion";
import PaymentProcessingModal from "@/components/modals/PaymentProcessingModal";
import { PromotionModal } from "@/components/modals/PromotionModal";
import { useNavigate } from "react-router-dom";

export default function EventPlatform() {
  const [activeTab, setActiveTab] = useState("discover");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    string | null
  >(null);
  const [amount] = useState("$49.99");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isBookingSuccess, setIsBookingSuccess] = useState(false);
  const [userData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
  });

  const navigate = useNavigate();

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

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <DiscoverTab onNext={handleNext} />
          </motion.div>
        </TabsContent>

        {/* Second Tab: Become a Master of Ceremonies */}
        <TabsContent value="become-mc" className="transition-all duration-300">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <BecomeMCTab
              onNext={handleNext}
              onPrevious={handlePrevious}
              amount={amount}
            />
          </motion.div>
        </TabsContent>

        {/* Third Tab: Payment */}
        <TabsContent value="payment" className="transition-all duration-300">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <PaymentTab
              onPrevious={handlePrevious}
              onPayment={handlePayment}
              selectedPaymentMethod={selectedPaymentMethod}
              setSelectedPaymentMethod={setSelectedPaymentMethod}
              amount={amount}
              userData={userData}
              loading={loading}
              setIsOpen={setIsOpen}
              setIsSuccess={setIsSuccess}
              setIsBookingSuccess={setIsBookingSuccess}
            />
          </motion.div>
        </TabsContent>
      </Tabs>
      <PaymentProcessingModal
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        isSuccess={isSuccess}
      />

      <PromotionModal
        isOpen={isBookingSuccess}
        onClose={() => {
          setIsBookingSuccess(false);
          navigate("/landing");
        }}
      />
    </div>
  );
}
