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
import { asyncHandler } from "../../../shared/async-handler";

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
        asyncHandler(hostNewEventController.handle.bind(hostNewEventController))
      )
      .put(
        verifyAuth,
        authorizeRole(["client"]),
        blockStatusMiddleware.checkBlockedStatus as RequestHandler,
        asyncHandler(
          updateEventDetailsByIdController.handle.bind(
            updateEventDetailsByIdController
          )
        )
      );

    this.router.get(
      "/client/host-event/details",
      verifyAuth,
      authorizeRole(["client"]),
      blockStatusMiddleware.checkBlockedStatus as RequestHandler,
      asyncHandler(
        getEventDetailsByIdController.handle.bind(getEventDetailsByIdController)
      )
    );

    this.router.get(
      "/client/hosted-event",
      verifyAuth,
      authorizeRole(["client"]),
      blockStatusMiddleware.checkBlockedStatus as RequestHandler,
      asyncHandler(
        getAllEventsByHostIdController.handle.bind(
          getAllEventsByHostIdController
        )
      )
    );

    this.router.get(
      "/client/upcomings",
      verifyAuth,
      authorizeRole(["client"]),
      blockStatusMiddleware.checkBlockedStatus as RequestHandler,
      asyncHandler(
        getUpcomingEventsController.handle.bind(getUpcomingEventsController)
      )
    );

    this.router.get(
      "/admin/upcomings",
      verifyAuth,
      authorizeRole(["admin"]),
      asyncHandler(
        getUpcomingEventsController.handle.bind(getUpcomingEventsController)
      )
    );

    this.router.get(
      "/client/discover-events",
      verifyAuth,
      authorizeRole(["client"]),
      blockStatusMiddleware.checkBlockedStatus as RequestHandler,
      asyncHandler(
        listPaginatedEventsController.handle.bind(listPaginatedEventsController)
      )
    );

    this.router.get(
      "/client/purchased-tickets",
      verifyAuth,
      authorizeRole(["client"]),
      blockStatusMiddleware.checkBlockedStatus as RequestHandler,
      asyncHandler(
        getAllTicketsByUserIdController.handle.bind(
          getAllTicketsByUserIdController
        )
      )
    );

    this.router.patch(
      "/client/ticket/cancel",
      verifyAuth,
      authorizeRole(["client"]),
      blockStatusMiddleware.checkBlockedStatus as RequestHandler,
      asyncHandler(cancelTicketController.handle.bind(cancelTicketController))
    );

    this.router.get(
      "/client/events/:eventId/attendance",
      verifyAuth,
      authorizeRole(["client"]),
      blockStatusMiddleware.checkBlockedStatus as RequestHandler,
      asyncHandler(
        getEventAttendanceController.handle.bind(getEventAttendanceController)
      )
    );
  }
}
