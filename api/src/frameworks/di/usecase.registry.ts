import { container } from "tsyringe";
import { IRegisterUserUseCase } from "../../entities/useCaseInterfaces/auth/register-usecase.inteface";
import { RegisterUserUseCase } from "../../useCases/auth/register-user.usecase";
import { IPasswordBcrypt } from "../security/password.bcrypt.interface";
import { PasswordBcrypt } from "../security/password.bcrypt";
import { ILoginUserUseCase } from "../../entities/useCaseInterfaces/auth/login-usecase.interface";
import { LoginUserUseCase } from "../../useCases/auth/login.usecase";

import { IRegisterStrategy } from "../../useCases/auth/strategies/register-strategy.interface";
import { ClientRegisterStrategy } from "../../useCases/auth/strategies/client-register.strategy";
import { VendorRegisterStrategy } from "../../useCases/auth/strategies/vendor-register.strategy";
import { AdminRegisterStrategy } from "../../useCases/auth/strategies/admin-register.startegy";

export class UseCaseRegistry {
  static registerUseCases(): void {
    container.register<IRegisterUserUseCase>("IRegisterUserUseCase", {
      useClass: RegisterUserUseCase,
    });

    container.register<IPasswordBcrypt>("IPasswordBcrypt", {
      useClass: PasswordBcrypt,
    });

    container.register<ILoginUserUseCase>("ILoginUserUseCase", {
      useClass: LoginUserUseCase,
    });

    // Register Strategies
    container.register<IRegisterStrategy>("ClientRegisterStrategy", {
      useClass: ClientRegisterStrategy,
    });

    container.register<IRegisterStrategy>("VendorRegisterStrategy", {
      useClass: VendorRegisterStrategy,
    });

    container.register<IRegisterStrategy>("AdminRegisterStrategy", {
      useClass: AdminRegisterStrategy,
    });
  }
}
