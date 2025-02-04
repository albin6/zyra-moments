import { Request, Response } from "express";
import { BaseRoute } from "../base.route";
import {
  createNewCategoryController,
  getAllCategoriesController,
  getAllUsersController,
  getVendorDetailsController,
  joinCategoryController,
} from "../../di/resolver";
import {
  authorizeRole,
  verifyAuth,
} from "../../../interfaceAdapters/middlewares/auth.middleware";

export class PrivateRoutes extends BaseRoute {
  constructor() {
    super();
  }
  protected initializeRoutes(): void {
    this.router.get(
      "/categories",
      verifyAuth,
      authorizeRole(["admin", "vendor"]),
      (req: Request, res: Response) =>
        getAllCategoriesController.handle(req, res)
    );

    this.router.post(
      "/categories",
      verifyAuth,
      authorizeRole(["admin"]),
      (req: Request, res: Response) =>
        createNewCategoryController.handle(req, res)
    );

    this.router.post(
      "/categories/join",
      verifyAuth,
      authorizeRole(["vendor"]),
      (req: Request, res: Response) => joinCategoryController.handle(req, res)
    );

    this.router.get(
      "/users",
      verifyAuth,
      authorizeRole(["admin"]),
      (req: Request, res: Response) => getAllUsersController.handle(req, res)
    );

    this.router.get(
      "/vendors/profile",
      verifyAuth,
      authorizeRole(["vendor"]),
      (req: Request, res: Response) =>
        getVendorDetailsController.handle(req, res)
    );
  }
}
