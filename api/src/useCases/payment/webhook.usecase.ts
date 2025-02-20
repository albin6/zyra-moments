import Stripe from "stripe";
import { IPaymentService } from "../../entities/services/payement-service.interface";
import { IWebHookUseCase } from "../../entities/useCaseInterfaces/payment/webhook-usecase.interface";
import { config } from "../../shared/config";
import { inject, injectable } from "tsyringe";
import { CustomError } from "../../entities/utils/CustomError";
import { HTTP_STATUS } from "../../shared/constants";

@injectable()
export class WebHookUseCase implements IWebHookUseCase {
  private stripe: Stripe;
  private endpointSecret: string;
  constructor(
    @inject("IPaymentService") private paymentService: IPaymentService
  ) {
    this.stripe = new Stripe(config.stripe.sk, {
      apiVersion: "2025-01-27.acacia",
    });
    this.endpointSecret = config.stripe.sws;
  }
  async execute(sig: string, body: any): Promise<void> {
    let event: Stripe.Event;
    try {
      event = this.stripe.webhooks.constructEvent(
        body,
        sig,
        this.endpointSecret
      );
    } catch (err) {
      console.error("Webhook signature verification failed:", err);
      throw new CustomError(
        "Invalid webhook signature",
        HTTP_STATUS.BAD_REQUEST
      );
    }
    await this.paymentService.handleWebhookEvent(event);
  }
}
