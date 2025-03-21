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
  getPaginatedReviewsByVendorIdController,
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
import { asyncHandler } from "../../../shared/async-handler";

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
      asyncHandler(
        getAllCategoriesController.handle.bind(getAllCategoriesController)
      )
    );

    this.router.post(
      "/vendor/categories/join",
      verifyAuth,
      authorizeRole(["vendor"]),
      blockStatusMiddleware.checkBlockedStatus as RequestHandler,
      asyncHandler(joinCategoryController.handle.bind(joinCategoryController))
    );

    this.router.get(
      "/vendor/category/status",
      verifyAuth,
      authorizeRole(["vendor"]),
      blockStatusMiddleware.checkBlockedStatus as RequestHandler,
      asyncHandler(
        getVendorCategoryJoinRequestStatusController.handle.bind(
          getVendorCategoryJoinRequestStatusController
        )
      )
    );

    this.router
      .route("/vendor/profile")
      .get(
        verifyAuth,
        authorizeRole(["vendor"]),
        blockStatusMiddleware.checkBlockedStatus as RequestHandler,
        asyncHandler(
          getVendorDetailsController.handle.bind(getVendorDetailsController)
        )
      )
      .put(
        verifyAuth,
        authorizeRole(["vendor"]),
        blockStatusMiddleware.checkBlockedStatus as RequestHandler,
        asyncHandler(
          updateVendorProfileController.handle.bind(
            updateVendorProfileController
          )
        )
      );

    this.router
      .route("/vendor/work-sample")
      .post(
        verifyAuth,
        authorizeRole(["vendor"]),
        blockStatusMiddleware.checkBlockedStatus as RequestHandler,
        asyncHandler(
          createWorkSampleController.handle.bind(createWorkSampleController)
        )
      )
      .get(
        verifyAuth,
        authorizeRole(["vendor"]),
        blockStatusMiddleware.checkBlockedStatus as RequestHandler,
        asyncHandler(
          getAllWorkSampleByVendorIdController.handle.bind(
            getAllWorkSampleByVendorIdController
          )
        )
      );

    this.router
      .route("/vendor/work-sample/:id")
      .get(
        verifyAuth,
        authorizeRole(["vendor"]),
        blockStatusMiddleware.checkBlockedStatus as RequestHandler,
        asyncHandler(
          getWorkSampleByIdController.handle.bind(getWorkSampleByIdController)
        )
      )
      .put(
        verifyAuth,
        authorizeRole(["vendor"]),
        blockStatusMiddleware.checkBlockedStatus as RequestHandler,
        asyncHandler(
          updateWorkSampleByIdController.handle.bind(
            updateWorkSampleByIdController
          )
        )
      )
      .delete(
        verifyAuth,
        authorizeRole(["vendor"]),
        blockStatusMiddleware.checkBlockedStatus as RequestHandler,
        asyncHandler(
          deleteWorkSampleByIdController.handle.bind(
            deleteWorkSampleByIdController
          )
        )
      );

    this.router
      .route("/vendor/services")
      .post(
        verifyAuth,
        authorizeRole(["vendor"]),
        blockStatusMiddleware.checkBlockedStatus as RequestHandler,
        asyncHandler(
          createServiceController.handle.bind(createServiceController)
        )
      )
      .get(
        verifyAuth,
        authorizeRole(["vendor"]),
        blockStatusMiddleware.checkBlockedStatus as RequestHandler,
        asyncHandler(
          getAllServicesByVendorIdController.handle.bind(
            getAllServicesByVendorIdController
          )
        )
      );

    this.router
      .route("/vendor/services/:serviceId")
      .get(
        verifyAuth,
        authorizeRole(["vendor"]),
        blockStatusMiddleware.checkBlockedStatus as RequestHandler,
        asyncHandler(
          getServiceDetailsByIdController.handle.bind(
            getServiceDetailsByIdController
          )
        )
      )
      .put(
        verifyAuth,
        authorizeRole(["vendor"]),
        blockStatusMiddleware.checkBlockedStatus as RequestHandler,
        asyncHandler(
          updateServiceByIdController.handle.bind(updateServiceByIdController)
        )
      );

    this.router.get(
      "/vendor/vendor-bookings",
      verifyAuth,
      authorizeRole(["vendor"]),
      blockStatusMiddleware.checkBlockedStatus as RequestHandler,
      asyncHandler(
        getAllBookingForVendorController.handle.bind(
          getAllBookingForVendorController
        )
      )
    );

    this.router.patch(
      "/vendor/booking/status",
      verifyAuth,
      authorizeRole(["vendor"]),
      blockStatusMiddleware.checkBlockedStatus as RequestHandler,
      asyncHandler(
        updateBookingStatusController.handle.bind(updateBookingStatusController)
      )
    );

    // wallet
    this.router.get(
      "/vendor/wallet",
      verifyAuth,
      authorizeRole(["vendor"]),
      blockStatusMiddleware.checkBlockedStatus as RequestHandler,
      asyncHandler(
        getWalletDetailsOfUserController.handle.bind(
          getWalletDetailsOfUserController
        )
      )
    );

    // transactions
    this.router.get(
      "/vendor/transactions",
      verifyAuth,
      authorizeRole(["vendor"]),
      blockStatusMiddleware.checkBlockedStatus as RequestHandler,
      asyncHandler(
        getAllTransactionsByUserIdController.handle.bind(
          getAllTransactionsByUserIdController
        )
      )
    );

    // reviews
    this.router.get(
      "/vendor/reviews",
      verifyAuth,
      authorizeRole(["vendor"]),
      blockStatusMiddleware.checkBlockedStatus as RequestHandler,
      asyncHandler(
        getPaginatedReviewsByVendorIdController.handle.bind(
          getPaginatedReviewsByVendorIdController
        )
      )
    );

    this.router.put(
      "/vendor/update-password",
      verifyAuth,
      authorizeRole(["vendor"]),
      blockStatusMiddleware.checkBlockedStatus as RequestHandler,
      asyncHandler(
        updateVendorPasswordController.handle.bind(
          updateVendorPasswordController
        )
      )
    );

    this.router.post(
      "/vendor/refresh-token",
      decodeToken,
      asyncHandler(refreshTokenController.handle.bind(refreshTokenController))
    );

    this.router.post(
      "/vendor/logout",
      verifyAuth,
      authorizeRole(["vendor"]),
      blockStatusMiddleware.checkBlockedStatus as RequestHandler,
      asyncHandler(logoutUserController.handle.bind(logoutUserController))
    );
  }
}
