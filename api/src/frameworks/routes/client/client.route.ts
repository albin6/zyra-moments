import { Request, RequestHandler, Response } from "express";
import {
  authorizeRole,
  decodeToken,
  verifyAuth,
} from "../../../interfaceAdapters/middlewares/auth.middleware";
import {
  blockStatusMiddleware,
  createReviewController,
  getAllBookingByClientController,
  getAllCategoriesController,
  getAllServicesForBookingController,
  getAllTransactionsByUserIdController,
  getBestVendorsController,
  getClientDetailsController,
  getPaginatedReviewsByVendorIdController,
  getVendorDetailsForChatController,
  getVendorProfileDetailsController,
  getVendorsUnderCategoryController,
  getWalletDetailsOfUserController,
  logoutUserController,
  refreshTokenController,
  updateBookingStatusController,
  updateClientPasswordController,
  updateClientProfileController,
} from "../../di/resolver";
import { BaseRoute } from "../base.route";
import { asyncHandler } from "../../../shared/async-handler";

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
        asyncHandler(
          getClientDetailsController.handle.bind(getClientDetailsController)
        )
      )
      .put(
        verifyAuth,
        authorizeRole(["client"]),
        blockStatusMiddleware.checkBlockedStatus as RequestHandler,
        asyncHandler(
          updateClientProfileController.handle.bind(
            updateClientProfileController
          )
        )
      );

    this.router.get(
      "/client/categories",
      verifyAuth,
      authorizeRole(["client"]),
      blockStatusMiddleware.checkBlockedStatus as RequestHandler,
      asyncHandler(
        getAllCategoriesController.handle.bind(getAllCategoriesController)
      )
    );

    this.router.get(
      "/client/vendors/:categoryId/listing",
      verifyAuth,
      authorizeRole(["client"]),
      blockStatusMiddleware.checkBlockedStatus as RequestHandler,
      asyncHandler(
        getVendorsUnderCategoryController.handle.bind(
          getVendorsUnderCategoryController
        )
      )
    );

    this.router.get(
      "/client/:vendorId/details",
      verifyAuth,
      authorizeRole(["client"]),
      blockStatusMiddleware.checkBlockedStatus as RequestHandler,
      asyncHandler(
        getVendorProfileDetailsController.handle.bind(
          getVendorProfileDetailsController
        )
      )
    );

    this.router.get(
      "/client/best-vendors",
      verifyAuth,
      authorizeRole(["client"]),
      blockStatusMiddleware.checkBlockedStatus as RequestHandler,
      asyncHandler(
        getBestVendorsController.handle.bind(getBestVendorsController)
      )
    );

    this.router.get(
      "/client/vendor-services",
      verifyAuth,
      authorizeRole(["client"]),
      blockStatusMiddleware.checkBlockedStatus as RequestHandler,
      asyncHandler(
        getAllServicesForBookingController.handle.bind(
          getAllServicesForBookingController
        )
      )
    );

    this.router.get(
      "/client/client-bookings",
      verifyAuth,
      authorizeRole(["client"]),
      blockStatusMiddleware.checkBlockedStatus as RequestHandler,
      asyncHandler(
        getAllBookingByClientController.handle.bind(
          getAllBookingByClientController
        )
      )
    );

    this.router.patch(
      "/client/booking/status",
      verifyAuth,
      authorizeRole(["client"]),
      blockStatusMiddleware.checkBlockedStatus as RequestHandler,
      asyncHandler(
        updateBookingStatusController.handle.bind(updateBookingStatusController)
      )
    );

    this.router.get(
      "/client/vendors/:vendorId",
      verifyAuth,
      authorizeRole(["client"]),
      blockStatusMiddleware.checkBlockedStatus as RequestHandler,
      asyncHandler(
        getVendorDetailsForChatController.handle.bind(
          getVendorDetailsForChatController
        )
      )
    );

    this.router.get(
      "/client/wallet",
      verifyAuth,
      authorizeRole(["client"]),
      blockStatusMiddleware.checkBlockedStatus as RequestHandler,
      asyncHandler(
        getWalletDetailsOfUserController.handle.bind(
          getWalletDetailsOfUserController
        )
      )
    );

    this.router.get(
      "/client/transactions",
      verifyAuth,
      authorizeRole(["client"]),
      blockStatusMiddleware.checkBlockedStatus as RequestHandler,
      asyncHandler(
        getAllTransactionsByUserIdController.handle.bind(
          getAllTransactionsByUserIdController
        )
      )
    );

    // review and rating
    this.router.post(
      "/client/review",
      verifyAuth,
      authorizeRole(["client"]),
      blockStatusMiddleware.checkBlockedStatus as RequestHandler,
      asyncHandler(createReviewController.handle.bind(createReviewController))
    );

    this.router.get(
      "/client/reviews",
      verifyAuth,
      authorizeRole(["client"]),
      blockStatusMiddleware.checkBlockedStatus as RequestHandler,
      asyncHandler(
        getPaginatedReviewsByVendorIdController.handle.bind(
          getPaginatedReviewsByVendorIdController
        )
      )
    );

    this.router.post(
      "/client/logout",
      verifyAuth,
      authorizeRole(["client"]),
      blockStatusMiddleware.checkBlockedStatus as RequestHandler,
      asyncHandler(logoutUserController.handle.bind(logoutUserController))
    );

    this.router.put(
      "/client/update-password",
      verifyAuth,
      authorizeRole(["client"]),
      blockStatusMiddleware.checkBlockedStatus as RequestHandler,
      asyncHandler(
        updateClientPasswordController.handle.bind(
          updateClientPasswordController
        )
      )
    );

    this.router.post(
      "/client/refresh-token",
      decodeToken,
      asyncHandler(refreshTokenController.handle.bind(refreshTokenController))
    );
  }
}
