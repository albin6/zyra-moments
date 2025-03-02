import { RolePromoPaymentWrapper } from "@/components/stripe/RolePromoForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface PaymentTabProps {
  onPrevious: () => void;
  onPayment: () => void;
  selectedPaymentMethod: string | null;
  setSelectedPaymentMethod: (value: string) => void;
  amount: string;
  userData: {
    name: string;
    email: string;
  };
  loading: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  setIsBookingSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}

export function PaymentTab({
  onPrevious,
  selectedPaymentMethod,
  setSelectedPaymentMethod,
  amount,
  userData,
  setIsOpen,
  setIsSuccess,
  setIsBookingSuccess,
}: PaymentTabProps) {
  return (
    <Card className="border-none bg-transparent shadow-none">
      <CardContent className="p-0 sm:p-2">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center">
          <div className="w-full md:w-1/2 lg:w-5/12">
            <img
              src="https://res.cloudinary.com/dkgic4cru/image/upload/v1740813349/woman-spiral_uvic2g.jpg"
              alt="Colorful spiral with person"
              className="w-full rounded-lg shadow-md"
            />
          </div>
          <div className="w-full md:w-1/2 lg:w-7/12 space-y-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
              Complete Your Payment
            </h1>

            <div className="space-y-2 bg-muted/50 p-4 rounded-lg">
              <p className="text-lg font-medium text-foreground">
                Role Upgrade Fee: <span className="text-primary">{amount}</span>
              </p>
              <div className="text-sm text-muted-foreground">
                <p>Name: {userData.name}</p>
                <p>Email: {userData.email}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-lg font-medium text-foreground">
                  Payment methods:
                </p>
                <p className="text-sm text-muted-foreground">
                  Select your preferred payment method
                </p>
              </div>

              <RadioGroup
                value={selectedPaymentMethod || ""}
                onValueChange={setSelectedPaymentMethod}
                className="space-y-3"
              >
                <div className="flex items-center space-x-2 border p-3 rounded-md hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="flex-1 cursor-pointer">
                    Debit Card / Credit Card
                  </Label>
                  <div className="flex gap-2">
                    <div className="w-8 h-5 bg-red-500 rounded"></div>
                    <div className="w-8 h-5 bg-blue-500 rounded"></div>
                    <div className="w-8 h-5 bg-yellow-500 rounded"></div>
                    <div className="w-8 h-5 bg-orange-500 rounded"></div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 border p-3 rounded-md hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value="bank" id="bank" />
                  <Label htmlFor="bank" className="flex-1 cursor-pointer">
                    Bank Transfer
                  </Label>
                </div>

                <div className="flex items-center space-x-2 border p-3 rounded-md hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value="upi" id="upi" />
                  <Label htmlFor="upi" className="flex-1 cursor-pointer">
                    UPI Method
                  </Label>
                </div>
              </RadioGroup>

              <div className="flex flex-col gap-3 pt-4">
                <RolePromoPaymentWrapper
                  setIsOpen={setIsOpen}
                  setIsSuccess={setIsSuccess}
                  amount={3000}
                  setIsBookingSuccess={setIsBookingSuccess}
                />
                <Button
                  onClick={onPrevious}
                  variant="outline"
                  className="border-primary text-primary w-full hover:bg-primary/10"
                  size="lg"
                >
                  Back
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
