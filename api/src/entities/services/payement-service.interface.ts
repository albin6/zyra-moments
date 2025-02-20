import Stripe from "stripe";

export interface IPaymentService {
  createPaymentIntent(amount: number, currency: string): Promise<string>;
  confirmPayment(paymentIntentId: string): Promise<boolean>;
  updatePaymentStatus(paymentIntentId: string, status: string): Promise<void>;
  handleWebhookEvent(event: Stripe.Event): Promise<void>;
}
