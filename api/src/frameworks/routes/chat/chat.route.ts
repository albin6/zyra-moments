import { Request, Response } from "express";
import { BaseRoute } from "../base.route";
import { chatController, createChatRoomController } from "../../di/resolver";

export class ChatRoutes extends BaseRoute {
  constructor() {
    super();
  }
  protected initializeRoutes(): void {
    this.router.get("/:userId/:userType", (req: Request, res: Response) =>
      chatController.handle(req, res)
    );
    this.router.post("/create", (req: Request, res: Response) =>
      createChatRoomController.handle(req, res)
    );
  }
}
