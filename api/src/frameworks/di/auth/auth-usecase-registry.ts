import { container } from "tsyringe";
import { IRegisterUserUseCase } from "../../../entities/useCaseInterfaces/auth/register-usecase.inteface";
import { RegisterUserUseCase } from "../../../useCases/auth/register.usecase";
import { IPasswordBcrypt } from "../../security/password.bcrypt.interface";
import { PasswordBcrypt } from "../../security/password.bcrypt";

export class UseCaseRegistry {
  static registerUseCases(): void {
    container.register<IRegisterUserUseCase>("IRegisterUserUseCase", {
      useClass: RegisterUserUseCase,
    });
    container.register<IPasswordBcrypt>("IPasswordBcrypt", {
      useClass: PasswordBcrypt,
    });
  }
}
