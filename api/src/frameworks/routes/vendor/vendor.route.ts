import { Request, Response } from "express";
import { BaseRoute } from "../base.route";
import {
  getAllCategoriesController,
  getVendorDetailsController,
  joinCategoryController,
  logoutUserController,
  refreshTokenController,
  updateVendorPasswordController,
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
      (req: Request, res: Response) =>
        getAllCategoriesController.handle(req, res)
    );

    this.router.post("/vendor/categories/join", (req: Request, res: Response) =>
      joinCategoryController.handle(req, res)
    );

    this.router.get(
      "/vendor/profile",
      verifyAuth,
      authorizeRole(["vendor"]),
      (req: Request, res: Response) =>
        getVendorDetailsController.handle(req, res)
    );

    this.router.post(
      "/vendor/logout",
      verifyAuth,
      authorizeRole(["vendor"]),
      (req: Request, res: Response) => {
        logoutUserController.handle(req, res);
      }
    );

    this.router.put(
      "/vendor/update-password",
      verifyAuth,
      authorizeRole(["vendor"]),
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
  }
}
