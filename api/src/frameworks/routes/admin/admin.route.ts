import { Request, Response } from "express";
import {
  createNewCategoryController,
  getAllCategoryJoinRequestController,
  getAllPaginatedCategoryController,
  getAllUsersController,
  logoutUserController,
  refreshTokenController,
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
    this.router
      .route('"/admin/categories"')
      .get((req: Request, res: Response) =>
        getAllPaginatedCategoryController.handle(req, res)
      )
      .post(
        verifyAuth,
        authorizeRole(["admin"]),
        (req: Request, res: Response) =>
          createNewCategoryController.handle(req, res)
      );

    this.router.get(
      "/admin/category/request",
      verifyAuth,
      authorizeRole(["admin"]),
      (req: Request, res: Response) =>
        getAllCategoryJoinRequestController.handle(req, res)
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
