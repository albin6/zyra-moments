import { Request, Response } from "express";
import { BaseRoute } from "../base.route";
import { getAllCategoriesController } from "../../di/resolver";
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
      authorizeRole(["admin"]),
      (req: Request, res: Response) => {
        getAllCategoriesController.handle(req, res);
      }
    );
  }
}
