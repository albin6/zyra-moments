import { Request, RequestHandler, Response } from "express";
import {
  authorizeRole,
  verifyAuth,
} from "../../../interfaceAdapters/middlewares/auth.middleware";
import {
  blockStatusMiddleware,
  getAllEventsByHostIdController,
  getEventDetailsByIdController,
  hostNewEventController,
} from "../../di/resolver";
import { BaseRoute } from "../base.route";

export class HostRoutes extends BaseRoute {
  constructor() {
    super();
  }
  protected initializeRoutes(): void {
    this.router.post(
      "/client/host-event",
      verifyAuth,
      authorizeRole(["client"]),
      blockStatusMiddleware.checkBlockedStatus as RequestHandler,
      (req: Request, res: Response) => hostNewEventController.handle(req, res)
    );

    this.router.get(
      "/client/host-event/details",
      verifyAuth,
      authorizeRole(["client"]),
      blockStatusMiddleware.checkBlockedStatus as RequestHandler,
      (req: Request, res: Response) =>
        getEventDetailsByIdController.handle(req, res)
    );

    this.router.get(
      "/client/hosted-event",
      verifyAuth,
      authorizeRole(["client"]),
      blockStatusMiddleware.checkBlockedStatus as RequestHandler,
      (req: Request, res: Response) =>
        getAllEventsByHostIdController.handle(req, res)
    );
  }
}
