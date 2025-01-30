import { inject, injectable } from "tsyringe";
import { IRegisterUserUseCase } from "../../entities/useCaseInterfaces/auth/register-usecase.inteface";
import { UserDTO } from "../../shared/dtos/user.dto";
import { IRegisterStrategy } from "./regiter-strategies/register-strategy.interface";
import { CustomError } from "../../entities/utils/CustomError";
import { HTTP_STATUS } from "../../shared/constants";

@injectable()
export class RegisterUserUseCase implements IRegisterUserUseCase {
  private strategies: Record<string, IRegisterStrategy>;

  constructor(
    @inject("ClientRegisterStrategy") private clientRegister: IRegisterStrategy,
    @inject("VendorRegisterStrategy") private vendorRegister: IRegisterStrategy,
    @inject("AdminRegisterStrategy") private adminRegister: IRegisterStrategy
  ) {
    this.strategies = {
      admin: this.adminRegister,
      client: this.clientRegister,
      vendor: this.vendorRegister,
    };
  }

  async execute(user: UserDTO): Promise<void> {
    const strategy = this.strategies[user.role];
    if (!strategy) {
      throw new CustomError("Invalid user role", HTTP_STATUS.FORBIDDEN);
    }
    await strategy.register(user);
  }
}
