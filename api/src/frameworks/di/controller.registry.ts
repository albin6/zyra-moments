import { container } from "tsyringe";
import { RegisterUserController } from "../../interfaceAdapters/controllers/auth/register.controllers";
import { LoginUserController } from "../../interfaceAdapters/controllers/auth/login.controllers";

export class ControllerRegistry {
  static registerControllers(): void {
    container.register("RegisterUserController", {
      useClass: RegisterUserController,
    });

    container.register("LoginUserController", {
      useClass: LoginUserController,
    });
  }
}
