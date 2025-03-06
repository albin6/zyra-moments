import { Request, RequestHandler, Response } from "express";
import {
  authorizeRole,
  verifyAuth,
} from "../../../interfaceAdapters/middlewares/auth.middleware";
import {
  blockStatusMiddleware,
  createTicketController,
  downloadTicketAsPdfController,
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
    this.router.get(
      "/client/:ticketId/download-pdf",
      verifyAuth,
      authorizeRole(["client"]),
      blockStatusMiddleware.checkBlockedStatus as RequestHandler,
      (req: Request, res: Response) =>
        downloadTicketAsPdfController.handle(req, res)
    );
  }
}
