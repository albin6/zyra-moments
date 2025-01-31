import { Request, Response } from "express";
import { BaseRoute } from "../base.route";
import {
  loginController,
  registerController,
  sendEmailController,
} from "../../di/resolver";

export class AuthRoutes extends BaseRoute {
  constructor() {
    super();
  }

  protected initializeRoutes(): void {
    this.router.post("/register", (req: Request, res: Response) => {
      registerController.handle(req, res);
    });

    this.router.post("/login", (req: Request, res: Response) => {
      loginController.handle(req, res);
    });

    this.router.post("/send-otp", (req: Request, res: Response) => {
      sendEmailController.handle(req, res);
    });
  }
}
