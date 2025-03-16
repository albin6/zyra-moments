import { Request, Response } from "express";
import {
  createNewCategoryController,
  getAllCategoryJoinRequestController,
  getAllPaginatedCategoryController,
  getAllTransactionsByUserIdController,
  getAllUsersController,
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

export class AdminRoutes extends BaseRoute {
  constructor() {
    super();
  }
  protected initializeRoutes(): void {
    this.router.get(
      "/admin/events",
      verifyAuth,
      authorizeRole(["admin"]),
      (req: Request, res: Response) =>
        getPaginatedEventsController.handle(req, res)
    );

    this.router
      .route("/admin/categories")
      .get(
        verifyAuth,
        authorizeRole(["admin"]),
        (req: Request, res: Response) =>
          getAllPaginatedCategoryController.handle(req, res)
      )
      .post(
        verifyAuth,
        authorizeRole(["admin"]),
        (req: Request, res: Response) =>
          createNewCategoryController.handle(req, res)
      );

    this.router
      .route("/admin/categories/:categoryId")
      .patch(
        verifyAuth,
        authorizeRole(["admin"]),
        (req: Request, res: Response) =>
          updateCategoryStatusController.handle(req, res)
      )
      .put(
        verifyAuth,
        authorizeRole(["admin"]),
        (req: Request, res: Response) =>
          updateCategoryStatusController.handle(req, res) // need to change remember!
      );

    this.router
      .route("/admin/category/request")
      .get(
        verifyAuth,
        authorizeRole(["admin"]),
        (req: Request, res: Response) =>
          getAllCategoryJoinRequestController.handle(req, res)
      )
      .patch(
        verifyAuth,
        authorizeRole(["admin"]),
        (req: Request, res: Response) =>
          updateCategoryRequestStatusController.handle(req, res)
      );

    this.router.get(
      "/admin/users",
      verifyAuth,
      authorizeRole(["admin"]),
      (req: Request, res: Response) => getAllUsersController.handle(req, res)
    );

    this.router.patch(
      "/admin/user-status",
      verifyAuth,
      authorizeRole(["admin"]),
      (req: Request, res: Response) =>
        updateUserStatusController.handle(req, res)
    );

    // wallet
    this.router.get(
      "/admin/wallet",
      verifyAuth,
      authorizeRole(["admin"]),
      (req: Request, res: Response) =>
        getWalletDetailsOfUserController.handle(req, res)
    );

    // transactions
    this.router.get(
      "/admin/transactions",
      verifyAuth,
      authorizeRole(["admin"]),
      (req: Request, res: Response) =>
        getAllTransactionsByUserIdController.handle(req, res)
    );

    this.router.post(
      "/admin/logout",
      verifyAuth,
      authorizeRole(["admin"]),
      (req: Request, res: Response) => {
        logoutUserController.handle(req, res);
      }
    );

    this.router.post(
      "/admin/refresh-token",
      decodeToken,
      (req: Request, res: Response) => {
        refreshTokenController.handle(req, res);
      }
    );
  }
}
