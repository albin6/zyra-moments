import { Request, Response } from "express";
import { verifyAuth } from "../../../interfaceAdapters/middlewares/auth.middleware";
import {
  getClientDetailsController,
  logoutUserController,
  updateClientPasswordController,
} from "../../di/resolver";
import { BaseRoute } from "../base.route";

export class ClientRoutes extends BaseRoute {
  constructor() {
    super();
  }

  protected initializeRoutes(): void {
    this.router.get(
      "/client/details",
      verifyAuth,
      (req: Request, res: Response) =>
        getClientDetailsController.handle(req, res)
    );

    this.router.post(
      "/client/logout",
      verifyAuth,
      (req: Request, res: Response) => {
        logoutUserController.handle(req, res);
      }
    );

    this.router.put(
      "/client/update-password",
      verifyAuth,
      (req: Request, res: Response) =>
        updateClientPasswordController.handle(req, res)
    );
  }
}
