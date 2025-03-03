import { Request, RequestHandler, Response } from "express";
import {
  authorizeRole,
  verifyAuth,
} from "../../../interfaceAdapters/middlewares/auth.middleware";
import {
  blockStatusMiddleware,
  confirmPaymentController,
  createPaymentIntentController,
  getAllTransactionsByUserIdController,
  handleWebHookController,
} from "../../di/resolver";
import { BaseRoute } from "../base.route";

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
      (req: Request, res: Response) =>
        createPaymentIntentController.handle(req, res)
    );

    this.router.post("/client/webhook", (req: Request, res: Response) =>
      handleWebHookController.handle(req, res)
    );

    this.router.post(
      "/client/confirm-payment",
      verifyAuth,
      authorizeRole(["client"]),
      blockStatusMiddleware.checkBlockedStatus as RequestHandler,
      (req: Request, res: Response) => confirmPaymentController.handle(req, res)
    );

    this.router.get(
      "/client/transactions",
      verifyAuth,
      authorizeRole(["client"]),
      blockStatusMiddleware.checkBlockedStatus as RequestHandler,
      (req: Request, res: Response) =>
        getAllTransactionsByUserIdController.handle(req, res)
    );
  }
}
