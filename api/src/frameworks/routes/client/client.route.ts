import { Request, Response } from "express";
import { verifyAuth } from "../../../interfaceAdapters/middlewares/auth.middleware";
import { logoutUserController } from "../../di/resolver";
import { BaseRoute } from "../base.route";

export class ClientRoutes extends BaseRoute {
  constructor() {
    super();
  }

  protected initializeRoutes(): void {
    this.router.post(
      "/client/logout",
      verifyAuth,
      (req: Request, res: Response) => {
        logoutUserController.handle(req, res);
      }
    );
  }
}
