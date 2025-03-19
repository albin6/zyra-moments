import { Request, Response } from "express";
import { BaseRoute } from "../base.route";
import { chatController, createChatRoomController } from "../../di/resolver";
import { asyncHandler } from "../../../shared/async-handler";

export class ChatRoutes extends BaseRoute {
  constructor() {
    super();
  }
  protected initializeRoutes(): void {
    this.router.get(
      "/:userId/:userType",
      asyncHandler(chatController.handle.bind(chatController))
    );
    
    this.router.post(
      "/create",
      asyncHandler(
        createChatRoomController.handle.bind(createChatRoomController)
      )
    );
  }
}
