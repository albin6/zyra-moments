import { container } from "tsyringe";
import { IRegisterUserUseCase } from "../../../entities/useCaseInterfaces/auth/register.usecase.inteface";
import { RegisterUserUseCase } from "../../../useCases/auth/register.usecase";

export class UseCaseRegistry {
  static registerUseCases(): void {
    container.register<IRegisterUserUseCase>("IRegisterUserUseCase", {
      useClass: RegisterUserUseCase,
    });
  }
}
