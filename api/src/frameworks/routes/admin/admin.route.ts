import { Request, Response } from "express";
import {
  createNewCategoryController,
  getAllCategoriesController,
  getAllUsersController,
  logoutUserController,
} from "../../di/resolver";
import { BaseRoute } from "../base.route";
import {
  authorizeRole,
  verifyAuth,
} from "../../../interfaceAdapters/middlewares/auth.middleware";

export class AdminRoutes extends BaseRoute {
  constructor() {
    super();
  }
  protected initializeRoutes(): void {
    this.router.get(
      "/admin/categories",
      verifyAuth,
      authorizeRole(["admin"]),
      (req: Request, res: Response) =>
        getAllCategoriesController.handle(req, res)
    );

    this.router.post(
      "/admin/categories",
      verifyAuth,
      authorizeRole(["admin"]),
      (req: Request, res: Response) =>
        createNewCategoryController.handle(req, res)
    );

    this.router.get("/admin/users", (req: Request, res: Response) =>
      getAllUsersController.handle(req, res)
    );

    this.router.post(
      "/admin/logout",
      verifyAuth,
      (req: Request, res: Response) => {
        logoutUserController.handle(req, res);
      }
    );
  }
}
