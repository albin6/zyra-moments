import { Request, RequestHandler, Response } from "express";
import {
  authorizeRole,
  verifyAuth,
} from "../../../interfaceAdapters/middlewares/auth.middleware";
import {
  blockStatusMiddleware,
  createTicketController,
  markAttendanceController,
} from "../../di/resolver";
import { BaseRoute } from "../base.route";

export class QrRoutes extends BaseRoute {
  constructor() {
    super();
  }
  protected initializeRoutes(): void {
    this.router.post(
      "/client/new-ticket",
      verifyAuth,
      authorizeRole(["client"]),
      blockStatusMiddleware.checkBlockedStatus as RequestHandler,
      (req: Request, res: Response) => createTicketController.handle(req, res)
    );

    this.router.put(
      "/client/ticket",
      verifyAuth,
      authorizeRole(["client"]),
      blockStatusMiddleware.checkBlockedStatus as RequestHandler,
      (req: Request, res: Response) => markAttendanceController.handle(req, res)
    );
  }
}
