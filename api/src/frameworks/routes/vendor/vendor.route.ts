import { Request, RequestHandler, Response } from "express";
import { BaseRoute } from "../base.route";
import {
  blockStatusMiddleware,
  createServiceController,
  createWorkSampleController,
  deleteWorkSampleByIdController,
  getAllBookingForVendorController,
  getAllCategoriesController,
  getAllServicesByVendorIdController,
  getAllTransactionsByUserIdController,
  getAllWorkSampleByVendorIdController,
  getServiceDetailsByIdController,
  getVendorCategoryJoinRequestStatusController,
  getVendorDetailsController,
  getWalletDetailsOfUserController,
  getWorkSampleByIdController,
  joinCategoryController,
  logoutUserController,
  refreshTokenController,
  updateBookingStatusController,
  updateServiceByIdController,
  updateVendorPasswordController,
  updateVendorProfileController,
  updateWorkSampleByIdController,
} from "../../di/resolver";
import {
  authorizeRole,
  decodeToken,
  verifyAuth,
} from "../../../interfaceAdapters/middlewares/auth.middleware";

export class VendorRoutes extends BaseRoute {
  constructor() {
    super();
  }
  protected initializeRoutes(): void {
    this.router.get(
      "/vendor/categories",
      verifyAuth,
      authorizeRole(["vendor"]),
      blockStatusMiddleware.checkBlockedStatus as RequestHandler,
      (req: Request, res: Response) =>
        getAllCategoriesController.handle(req, res)
    );

    this.router.post(
      "/vendor/categories/join",
      verifyAuth,
      authorizeRole(["vendor"]),
      blockStatusMiddleware.checkBlockedStatus as RequestHandler,
      (req: Request, res: Response) => joinCategoryController.handle(req, res)
    );

    this.router.get(
      "/vendor/category/status",
      verifyAuth,
      authorizeRole(["vendor"]),
      blockStatusMiddleware.checkBlockedStatus as RequestHandler,
      (req: Request, res: Response) =>
        getVendorCategoryJoinRequestStatusController.handle(req, res)
    );

    this.router
      .route("/vendor/profile")
      .get(
        verifyAuth,
        authorizeRole(["vendor"]),
        blockStatusMiddleware.checkBlockedStatus as RequestHandler,
        (req: Request, res: Response) =>
          getVendorDetailsController.handle(req, res)
      )
      .put(
        verifyAuth,
        authorizeRole(["vendor"]),
        blockStatusMiddleware.checkBlockedStatus as RequestHandler,
        (req: Request, res: Response) =>
          updateVendorProfileController.handle(req, res)
      );

    this.router
      .route("/vendor/work-sample")
      .post(
        verifyAuth,
        authorizeRole(["vendor"]),
        blockStatusMiddleware.checkBlockedStatus as RequestHandler,
        (req: Request, res: Response) =>
          createWorkSampleController.handle(req, res)
      )
      .get(
        verifyAuth,
        authorizeRole(["vendor"]),
        blockStatusMiddleware.checkBlockedStatus as RequestHandler,
        (req: Request, res: Response) =>
          getAllWorkSampleByVendorIdController.handle(req, res)
      );

    this.router
      .route("/vendor/work-sample/:id")
      .get(
        verifyAuth,
        authorizeRole(["vendor"]),
        blockStatusMiddleware.checkBlockedStatus as RequestHandler,
        (req: Request, res: Response) =>
          getWorkSampleByIdController.handle(req, res)
      )
      .put(
        verifyAuth,
        authorizeRole(["vendor"]),
        blockStatusMiddleware.checkBlockedStatus as RequestHandler,
        (req: Request, res: Response) =>
          updateWorkSampleByIdController.handle(req, res)
      )
      .delete(
        verifyAuth,
        authorizeRole(["vendor"]),
        blockStatusMiddleware.checkBlockedStatus as RequestHandler,
        (req: Request, res: Response) =>
          deleteWorkSampleByIdController.handle(req, res)
      );

    this.router
      .route("/vendor/services")
      .post(
        verifyAuth,
        authorizeRole(["vendor"]),
        blockStatusMiddleware.checkBlockedStatus as RequestHandler,
        (req: Request, res: Response) =>
          createServiceController.handle(req, res)
      )
      .get(
        verifyAuth,
        authorizeRole(["vendor"]),
        blockStatusMiddleware.checkBlockedStatus as RequestHandler,
        (req: Request, res: Response) =>
          getAllServicesByVendorIdController.handle(req, res)
      );

    this.router
      .route("/vendor/services/:serviceId")
      .get(
        verifyAuth,
        authorizeRole(["vendor"]),
        blockStatusMiddleware.checkBlockedStatus as RequestHandler,
        (req: Request, res: Response) =>
          getServiceDetailsByIdController.handle(req, res)
      )
      .put(
        verifyAuth,
        authorizeRole(["vendor"]),
        blockStatusMiddleware.checkBlockedStatus as RequestHandler,
        (req: Request, res: Response) =>
          updateServiceByIdController.handle(req, res)
      );

    this.router.get(
      "/vendor/vendor-bookings",
      verifyAuth,
      authorizeRole(["vendor"]),
      blockStatusMiddleware.checkBlockedStatus as RequestHandler,
      (req: Request, res: Response) =>
        getAllBookingForVendorController.handle(req, res)
    );

    this.router.patch(
      "/vendor/booking/status",
      verifyAuth,
      authorizeRole(["vendor"]),
      blockStatusMiddleware.checkBlockedStatus as RequestHandler,
      (req: Request, res: Response) =>
        updateBookingStatusController.handle(req, res)
    );

    // wallet
    this.router.get(
      "/vendor/wallet",
      verifyAuth,
      authorizeRole(["vendor"]),
      blockStatusMiddleware.checkBlockedStatus as RequestHandler,
      (req: Request, res: Response) =>
        getWalletDetailsOfUserController.handle(req, res)
    );

    // transactions
    this.router.get(
      "/vendor/transactions",
      verifyAuth,
      authorizeRole(["vendor"]),
      blockStatusMiddleware.checkBlockedStatus as RequestHandler,
      (req: Request, res: Response) =>
        getAllTransactionsByUserIdController.handle(req, res)
    );

    this.router.put(
      "/vendor/update-password",
      verifyAuth,
      authorizeRole(["vendor"]),
      blockStatusMiddleware.checkBlockedStatus as RequestHandler,
      (req: Request, res: Response) =>
        updateVendorPasswordController.handle(req, res)
    );

    this.router.post(
      "/vendor/refresh-token",
      decodeToken,
      (req: Request, res: Response) => {
        refreshTokenController.handle(req, res);
      }
    );

    this.router.post(
      "/vendor/logout",
      verifyAuth,
      authorizeRole(["vendor"]),
      blockStatusMiddleware.checkBlockedStatus as RequestHandler,
      (req: Request, res: Response) => {
        logoutUserController.handle(req, res);
      }
    );
  }
}
