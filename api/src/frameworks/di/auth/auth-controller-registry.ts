import { container } from "tsyringe";
import { RegisterUserController } from "../../../interfaceAdapters/controllers/auth/register.controllers";

export class ControllerRegistry {
  static registerControllers() {
    container.register(RegisterUserController, {
      useClass: RegisterUserController,
    });
  }
}
