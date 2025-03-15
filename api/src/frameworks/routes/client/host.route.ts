import { Request, RequestHandler, Response } from "express";
import {
  authorizeRole,
  verifyAuth,
} from "../../../interfaceAdapters/middlewares/auth.middleware";
import {
  blockStatusMiddleware,
  cancelTicketController,
  getAllEventsByHostIdController,
  getAllTicketsByUserIdController,
  getEventAttendanceController,
  getEventDetailsByIdController,
  getUpcomingEventsController,
  hostNewEventController,
  listPaginatedEventsController,
  updateEventDetailsByIdController,
} from "../../di/resolver";
import { BaseRoute } from "../base.route";

export class HostRoutes extends BaseRoute {
  constructor() {
    super();
  }
  protected initializeRoutes(): void {
    this.router
      .route("/client/host-event")
      .post(
        verifyAuth,
        authorizeRole(["client"]),
        blockStatusMiddleware.checkBlockedStatus as RequestHandler,
        (req: Request, res: Response) => hostNewEventController.handle(req, res)
      )
      .put(
        verifyAuth,
        authorizeRole(["client"]),
        blockStatusMiddleware.checkBlockedStatus as RequestHandler,
        (req: Request, res: Response) =>
          updateEventDetailsByIdController.handle(req, res)
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

    this.router.get(
      "/client/upcomings",
      verifyAuth,
      authorizeRole(["client"]),
      blockStatusMiddleware.checkBlockedStatus as RequestHandler,
      (req: Request, res: Response) =>
        getUpcomingEventsController.handle(req, res)
    );

    this.router.get(
      "/client/discover-events",
      verifyAuth,
      authorizeRole(["client"]),
      blockStatusMiddleware.checkBlockedStatus as RequestHandler,
      (req: Request, res: Response) =>
        listPaginatedEventsController.handle(req, res)
    );

    this.router.get(
      "/client/purchased-tickets",
      verifyAuth,
      authorizeRole(["client"]),
      blockStatusMiddleware.checkBlockedStatus as RequestHandler,
      (req: Request, res: Response) =>
        getAllTicketsByUserIdController.handle(req, res)
    );

    this.router.patch(
      "/client/ticket/cancel",
      verifyAuth,
      authorizeRole(["client"]),
      blockStatusMiddleware.checkBlockedStatus as RequestHandler,
      (req: Request, res: Response) => cancelTicketController.handle(req, res)
    );

    this.router.get(
      "/client/events/:eventId/attendance",
      verifyAuth,
      authorizeRole(["client"]),
      blockStatusMiddleware.checkBlockedStatus as RequestHandler,
      (req: Request, res: Response) =>
        getEventAttendanceController.handle(req, res)
    );
  }
}
