import { container } from "tsyringe";
import { RegisterUserController } from "../../interfaceAdapters/controllers/auth/register.controllers";
import { LoginUserController } from "../../interfaceAdapters/controllers/auth/login.controllers";
import { SendEmailController } from "../../interfaceAdapters/controllers/auth/send-email.controllers";

export class ControllerRegistry {
  static registerControllers(): void {
    container.register("RegisterUserController", {
      useClass: RegisterUserController,
    });

    container.register("LoginUserController", {
      useClass: LoginUserController,
    });

    container.register("SendEmailController", {
      useClass: SendEmailController,
    });
  }
}
