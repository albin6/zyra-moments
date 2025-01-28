import { Request, Response } from "express";
import { BaseRoute } from "../base.route";
import { registerController } from "../../di/resolver";

export class AuthRoutes extends BaseRoute {
  constructor() {
    super();
  }

  protected initializeRoutes(): void {
    this.router.post("/register", (req: Request, res: Response) => {
      registerController.handle(req, res);
    });
  }
}
