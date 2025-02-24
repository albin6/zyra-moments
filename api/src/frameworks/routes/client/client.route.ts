import { Request, RequestHandler, Response } from "express";
import {
  authorizeRole,
  decodeToken,
  verifyAuth,
} from "../../../interfaceAdapters/middlewares/auth.middleware";
import {
  blockStatusMiddleware,
  getAllBookingByClientController,
  getAllCategoriesController,
  getAllServicesForBookingController,
  getBestVendorsController,
  getClientDetailsController,
  getVendorProfileDetailsController,
  getVendorsUnderCategoryController,
  logoutUserController,
  refreshTokenController,
  updateClientPasswordController,
  updateClientProfileController,
} from "../../di/resolver";
import { BaseRoute } from "../base.route";

export class ClientRoutes extends BaseRoute {
  constructor() {
    super();
  }

  protected initializeRoutes(): void {
    this.router
      .route("/client/details")
      .get(
        verifyAuth,
        authorizeRole(["client"]),
        blockStatusMiddleware.checkBlockedStatus as RequestHandler,
        (req: Request, res: Response) =>
          getClientDetailsController.handle(req, res)
      )
      .put(
        verifyAuth,
        authorizeRole(["client"]),
        blockStatusMiddleware.checkBlockedStatus as RequestHandler,
        (req: Request, res: Response) =>
          updateClientProfileController.handle(req, res)
      );

    this.router.get(
      "/client/categories",
      verifyAuth,
      authorizeRole(["client"]),
      blockStatusMiddleware.checkBlockedStatus as RequestHandler,
      (req: Request, res: Response) =>
        getAllCategoriesController.handle(req, res)
    );

    this.router.get(
      "/client/vendors/:categoryId/listing",
      verifyAuth,
      authorizeRole(["client"]),
      blockStatusMiddleware.checkBlockedStatus as RequestHandler,
      (req: Request, res: Response) =>
        getVendorsUnderCategoryController.handle(req, res)
    );

    this.router.get(
      "/client/:vendorId/details",
      verifyAuth,
      authorizeRole(["client"]),
      blockStatusMiddleware.checkBlockedStatus as RequestHandler,
      (req: Request, res: Response) =>
        getVendorProfileDetailsController.handle(req, res)
    );

    this.router.get(
      "/client/best-vendors",
      verifyAuth,
      authorizeRole(["client"]),
      blockStatusMiddleware.checkBlockedStatus as RequestHandler,
      (req: Request, res: Response) => getBestVendorsController.handle(req, res)
    );

    this.router.get(
      "/client/vendor-services",
      verifyAuth,
      authorizeRole(["client"]),
      blockStatusMiddleware.checkBlockedStatus as RequestHandler,
      (req: Request, res: Response) =>
        getAllServicesForBookingController.handle(req, res)
    );

    // bookings
    this.router.post("/client/book-vendor");

    this.router.get(
      "/client/client-bookings",
      verifyAuth,
      authorizeRole(["client"]),
      blockStatusMiddleware.checkBlockedStatus as RequestHandler,
      (req: Request, res: Response) =>
        getAllBookingByClientController.handle(req, res)
    );

    // logout
    this.router.post(
      "/client/logout",
      verifyAuth,
      authorizeRole(["client"]),
      blockStatusMiddleware.checkBlockedStatus as RequestHandler,
      (req: Request, res: Response) => {
        logoutUserController.handle(req, res);
      }
    );

    // password update
    this.router.put(
      "/client/update-password",
      verifyAuth,
      authorizeRole(["client"]),
      blockStatusMiddleware.checkBlockedStatus as RequestHandler,
      (req: Request, res: Response) =>
        updateClientPasswordController.handle(req, res)
    );

    // token refresh
    this.router.post(
      "/client/refresh-token",
      decodeToken,
      (req: Request, res: Response) => {
        refreshTokenController.handle(req, res);
      }
    );
  }
}
