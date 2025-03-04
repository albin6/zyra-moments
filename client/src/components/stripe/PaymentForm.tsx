import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useVendorBookingPaymentMutation } from "@/hooks/payment/usePayment";
import { makePaymentAndBooking } from "@/services/payment/paymentService";
import { toast } from "sonner";
import { clientAxiosInstance } from "@/api/client.axios";
import { Booking } from "@/types/Booking";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

interface PaymentFormProps {
  amount: number;
  getBookingData: () => Booking;
  setBookingSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  amount,
  getBookingData,
  setBookingSuccess,
  setIsOpen,
  setIsSuccess,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState<boolean>(false);
  const [succeeded, setSucceeded] = useState<boolean>(false);

  const { mutate: proceedPayment } = useVendorBookingPaymentMutation(
    makePaymentAndBooking
  );

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);
    setIsOpen(true);
    setIsSuccess(false);

    proceedPayment(
      {
        amount,
        purpose: "vendor-booking",
        bookingData: getBookingData(),
        createrType: "Client",
        receiverType: "Vendor",
      },
      {
        onSuccess: async (data) => {
          const { error: stripeError, paymentIntent } =
            await stripe.confirmCardPayment(data.clientSecret, {
              payment_method: {
                card: elements.getElement(CardElement)!,
              },
            });
          if (stripeError) {
            toast.error(stripeError.message || "An error occurred");
          } else if (paymentIntent.status === "succeeded") {
            try {
              await clientAxiosInstance.post("/_pmt/client/confirm-payment", {
                paymentIntentId: paymentIntent.id,
              });
              toast.success("Payment completed.");
              setBookingSuccess(true);
              setIsSuccess(true);
              setIsOpen(false);
              setIsSuccess(false);
            } catch (error) {
              console.log("Error in confirm payement=>", error);
            }
            setSucceeded(true);
          }
        },
        onError: (error: any) => {
          setBookingSuccess(false);
          setIsOpen(false);
          setIsSuccess(false);
          toast.error(error.response.data.message);
        },
      }
    );

    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="mb-4">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
      </div>

      {succeeded && (
        <div className="text-green-500 mb-4">
          Payment processed successfully!
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || processing || succeeded}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded disabled:opacity-50"
      >
        {processing ? "Processing..." : `Pay $${(amount / 100).toFixed(2)}`}
      </button>
    </form>
  );
};

export const PaymentWrapper: React.FC<{
  amount: number;
  getBookingData: () => Booking;
  setBookingSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({
  amount,
  getBookingData,
  setBookingSuccess,
  setIsOpen,
  setIsSuccess,
}) => {
  return (
    <Elements stripe={stripePromise}>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl mb-4">Complete Your Payment</h1>
        <PaymentForm
          amount={amount}
          getBookingData={getBookingData}
          setBookingSuccess={setBookingSuccess}
          setIsOpen={setIsOpen}
          setIsSuccess={setIsSuccess}
        />
      </div>
    </Elements>
  );
};
