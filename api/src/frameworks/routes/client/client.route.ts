import { Request, Response } from "express";
import {
  authorizeRole,
  decodeToken,
  verifyAuth,
} from "../../../interfaceAdapters/middlewares/auth.middleware";
import {
  getClientDetailsController,
  logoutUserController,
  refreshTokenController,
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
      authorizeRole(["client"]),
      (req: Request, res: Response) =>
        getClientDetailsController.handle(req, res)
    );

    this.router.post(
      "/client/logout",
      verifyAuth,
      authorizeRole(["client"]),
      (req: Request, res: Response) => {
        logoutUserController.handle(req, res);
      }
    );

    this.router.put(
      "/client/update-password",
      verifyAuth,
      authorizeRole(["client"]),
      (req: Request, res: Response) =>
        updateClientPasswordController.handle(req, res)
    );

    this.router.post(
      "/client/refresh-token",
      decodeToken,
      (req: Request, res: Response) => {
        refreshTokenController.handle(req, res);
      }
    );
  }
}
