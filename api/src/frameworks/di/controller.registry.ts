import { container } from "tsyringe";
import { RegisterUserController } from "../../interfaceAdapters/controllers/auth/register.controllers";
import { LoginUserController } from "../../interfaceAdapters/controllers/auth/login.controllers";
import { SendEmailController } from "../../interfaceAdapters/controllers/auth/send-email.controllers";
import { VerifyOTPController } from "../../interfaceAdapters/controllers/auth/verify-otp.controllers";
import { RefreshTokenController } from "../../interfaceAdapters/controllers/auth/refresh-token.controllers";
import { GetAllCategoriesController } from "../../interfaceAdapters/controllers/common/get-all-categories.controllers";
import { CreateNewCategoryController } from "../../interfaceAdapters/controllers/common/create-new-category.controllers";

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

    container.register("VerifyOTPController", {
      useClass: VerifyOTPController,
    });

    container.register("RefreshTokenController", {
      useClass: RefreshTokenController,
    });

    container.register("GetAllCategoriesController", {
      useClass: GetAllCategoriesController,
    });

    container.register("CreateNewCategoryController", {
      useClass: CreateNewCategoryController,
    });
  }
}
