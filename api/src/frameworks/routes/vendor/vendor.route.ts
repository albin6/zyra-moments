import { Request, Response } from "express";
import { BaseRoute } from "../base.route";
import {
  getVendorDetailsController,
  joinCategoryController,
} from "../../di/resolver";
import {
  authorizeRole,
  verifyAuth,
} from "../../../interfaceAdapters/middlewares/auth.middleware";

export class VendorRoutes extends BaseRoute {
  constructor() {
    super();
  }
  protected initializeRoutes(): void {
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
  }
}
