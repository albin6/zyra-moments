import { Request, RequestHandler, Response } from "express";
import {
  authorizeRole,
  verifyAuth,
} from "../../../interfaceAdapters/middlewares/auth.middleware";
import {
  blockStatusMiddleware,
  confirmPaymentController,
  createPaymentIntentController,
  handleWebHookController,
} from "../../di/resolver";
import { BaseRoute } from "../base.route";
import { asyncHandler } from "../../../shared/async-handler";

export class PaymentRoutes extends BaseRoute {
  constructor() {
    super();
  }

  protected initializeRoutes(): void {
    this.router.post(
      "/client/create-payment-intent",
      verifyAuth,
      authorizeRole(["client"]),
      blockStatusMiddleware.checkBlockedStatus as RequestHandler,
      asyncHandler(
        createPaymentIntentController.handle.bind(createPaymentIntentController)
      )
    );

    this.router.post(
      "/client/webhook",
      asyncHandler(handleWebHookController.handle.bind(handleWebHookController))
    );

    this.router.post(
      "/client/confirm-payment",
      verifyAuth,
      authorizeRole(["client"]),
      blockStatusMiddleware.checkBlockedStatus as RequestHandler,
      asyncHandler(
        confirmPaymentController.handle.bind(confirmPaymentController)
      )
    );
  }
}
