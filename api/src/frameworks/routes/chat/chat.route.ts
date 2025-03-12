import { Request, Response } from "express";
import { BaseRoute } from "../base.route";
import { chatController } from "../../di/resolver";

export class ChatRoutes extends BaseRoute {
  constructor() {
    super();
  }
  protected initializeRoutes(): void {
    this.router.get("/:userId/:userType", (req: Request, res: Response) =>
      chatController.handle(req, res)
    );
  }
}
