import Stripe from "stripe";
import { IPaymentService } from "../../entities/services/payement-service.interface";
import { inject, injectable } from "tsyringe";
import { IPaymentRepository } from "../../entities/repositoryInterfaces/payment/payment-repository.interface";
import { PaymentStatus } from "../../entities/models/payment.entity";
import { config } from "../../shared/config";

@injectable()
export class StripeService implements IPaymentService {
  private stripe: Stripe;
  private apiKey: string;

  constructor(
    @inject("IPaymentRepository") private paymentRepository: IPaymentRepository
  ) {
    this.apiKey = config.stripe.sk;
    this.stripe = new Stripe(this.apiKey, {
      apiVersion: "2025-01-27.acacia",
    });
  }

  async createPaymentIntent(amount: number, currency: string): Promise<string> {
    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount,
        currency,
        automatic_payment_methods: {
          enabled: true,
        },
      });

      return paymentIntent.client_secret!;
    } catch (error) {
      console.error("Error creating payment intent:", error);
      throw new Error("Failed to create payment intent");
    }
  }

  async confirmPayment(paymentIntentId: string): Promise<boolean> {
    try {
      const paymentIntent = await this.stripe.paymentIntents.retrieve(
        paymentIntentId
      );
      return paymentIntent.status === "succeeded";
    } catch (error) {
      console.error("Error confirming payment:", error);
      throw new Error("Failed to confirm payment");
    }
  }

  async updatePaymentStatus(
    paymentIntentId: string,
    status: PaymentStatus
  ): Promise<void> {
    await this.paymentRepository.findByPaymentIntentIdAndUpdateStatus(
      paymentIntentId,
      status
    );
  }

  async handleWebhookEvent(event: Stripe.Event): Promise<void> {
    switch (event.type) {
      case "payment_intent.succeeded":
        const successfulPayment = event.data.object as Stripe.PaymentIntent;
        await this.updatePaymentStatus(successfulPayment.id, "succeeded");
        break;

      case "payment_intent.payment_failed":
        const failedPayment = event.data.object as Stripe.PaymentIntent;
        await this.updatePaymentStatus(failedPayment.id, "failed");
        break;
      case "payment_intent.created":
        const createdPayment = event.data.object as Stripe.PaymentIntent;
        await this.updatePaymentStatus(createdPayment.id, "pending");
        break;

      case "payment_intent.processing":
        const processingPayment = event.data.object as Stripe.PaymentIntent;
        await this.updatePaymentStatus(processingPayment.id, "processing");
        break;

      case "payment_intent.canceled":
        const canceledPayment = event.data.object as Stripe.PaymentIntent;
        await this.updatePaymentStatus(canceledPayment.id, "failed");
        break;
    }
  }
}
