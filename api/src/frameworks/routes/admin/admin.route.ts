import { Request, Response } from "express";
import {
  createNewCategoryController,
  getAllCategoryJoinRequestController,
  getAllPaginatedCategoryController,
  getAllTransactionsByUserIdController,
  getAllUsersController,
  getDashboardStatsController,
  getPaginatedEventsController,
  getWalletDetailsOfUserController,
  logoutUserController,
  refreshTokenController,
  updateCategoryRequestStatusController,
  updateCategoryStatusController,
  updateUserStatusController,
} from "../../di/resolver";
import { BaseRoute } from "../base.route";
import {
  authorizeRole,
  decodeToken,
  verifyAuth,
} from "../../../interfaceAdapters/middlewares/auth.middleware";
import { asyncHandler } from "../../../shared/async-handler";

export class AdminRoutes extends BaseRoute {
  constructor() {
    super();
  }
  protected initializeRoutes(): void {
    this.router.get(
      "/admin/dashboard-stats",
      verifyAuth,
      authorizeRole(["admin"]),
      asyncHandler(
        getDashboardStatsController.handle.bind(getDashboardStatsController)
      )
    );

    this.router.get(
      "/admin/events",
      verifyAuth,
      authorizeRole(["admin"]),
      asyncHandler(
        getPaginatedEventsController.handle.bind(getPaginatedEventsController)
      )
    );

    this.router
      .route("/admin/categories")
      .get(
        verifyAuth,
        authorizeRole(["admin"]),
        asyncHandler(
          getAllPaginatedCategoryController.handle.bind(
            getAllPaginatedCategoryController
          )
        )
      )
      .post(
        verifyAuth,
        authorizeRole(["admin"]),
        asyncHandler(
          createNewCategoryController.handle.bind(createNewCategoryController)
        )
      );

    this.router
      .route("/admin/categories/:categoryId")
      .patch(
        verifyAuth,
        authorizeRole(["admin"]),
        asyncHandler(
          updateCategoryStatusController.handle.bind(
            updateCategoryStatusController
          )
        )
      )
      .put(
        verifyAuth,
        authorizeRole(["admin"]),
        asyncHandler(
          updateCategoryStatusController.handle.bind(
            updateCategoryStatusController
          )
        ) // Note: You mentioned this needs to change
      );

    this.router
      .route("/admin/category/request")
      .get(
        verifyAuth,
        authorizeRole(["admin"]),
        asyncHandler(
          getAllCategoryJoinRequestController.handle.bind(
            getAllCategoryJoinRequestController
          )
        )
      )
      .patch(
        verifyAuth,
        authorizeRole(["admin"]),
        asyncHandler(
          updateCategoryRequestStatusController.handle.bind(
            updateCategoryRequestStatusController
          )
        )
      );

    this.router.get(
      "/admin/users",
      verifyAuth,
      authorizeRole(["admin"]),
      asyncHandler(getAllUsersController.handle.bind(getAllUsersController))
    );

    this.router.patch(
      "/admin/user-status",
      verifyAuth,
      authorizeRole(["admin"]),
      asyncHandler(
        updateUserStatusController.handle.bind(updateUserStatusController)
      )
    );

    // wallet
    this.router.get(
      "/admin/wallet",
      verifyAuth,
      authorizeRole(["admin"]),
      asyncHandler(
        getWalletDetailsOfUserController.handle.bind(
          getWalletDetailsOfUserController
        )
      )
    );

    // transactions
    this.router.get(
      "/admin/transactions",
      verifyAuth,
      authorizeRole(["admin"]),
      asyncHandler(
        getAllTransactionsByUserIdController.handle.bind(
          getAllTransactionsByUserIdController
        )
      )
    );

    this.router.post(
      "/admin/logout",
      verifyAuth,
      authorizeRole(["admin"]),
      asyncHandler(logoutUserController.handle.bind(logoutUserController))
    );

    this.router.post(
      "/admin/refresh-token",
      decodeToken,
      asyncHandler(refreshTokenController.handle.bind(refreshTokenController))
    );
  }
}
