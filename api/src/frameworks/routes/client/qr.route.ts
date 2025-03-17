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
import { asyncHandler } from "../../../shared/async-handler";

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
      asyncHandler(createTicketController.handle.bind(createTicketController))
    );

    this.router.put(
      "/client/ticket",
      verifyAuth,
      authorizeRole(["client"]),
      blockStatusMiddleware.checkBlockedStatus as RequestHandler,
      asyncHandler(
        markAttendanceController.handle.bind(markAttendanceController)
      )
    );

    this.router.get(
      "/client/:ticketId/download-pdf",
      verifyAuth,
      authorizeRole(["client"]),
      blockStatusMiddleware.checkBlockedStatus as RequestHandler,
      asyncHandler(
        downloadTicketAsPdfController.handle.bind(downloadTicketAsPdfController)
      )
    );
  }
}
