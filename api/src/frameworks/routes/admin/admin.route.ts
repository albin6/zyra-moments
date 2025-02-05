import { Request, Response } from "express";
import {
  createNewCategoryController,
  getAllCategoriesController,
  getAllUsersController,
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
      authorizeRole(["vendor"]),
      (req: Request, res: Response) =>
        getAllCategoriesController.handle(req, res)
    );

    this.router.post("/admin/categories", (req: Request, res: Response) =>
      createNewCategoryController.handle(req, res)
    );

    this.router.get("/admin/users", (req: Request, res: Response) =>
      getAllUsersController.handle(req, res)
    );
  }
}
