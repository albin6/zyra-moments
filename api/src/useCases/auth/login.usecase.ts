import { inject, injectable } from "tsyringe";
import { ILoginUserUseCase } from "../../entities/useCaseInterfaces/auth/login-usecase.interface";
import { LoginUserDTO } from "../../shared/dtos/user.dto";
import { CustomError } from "../../entities/utils/custom-error";
import { HTTP_STATUS } from "../../shared/constants";
import { ILoginStrategy } from "./login-strategies/login-strategy.interface";
import { IUserEntity } from "../../entities/models/user.entity";

@injectable()
export class LoginUserUseCase implements ILoginUserUseCase {
  private strategies: Record<string, ILoginStrategy>;

  constructor(
    @inject("AdminLoginStrategy") private adminLogin: ILoginStrategy,
    @inject("ClientLoginStrategy") private clientLogin: ILoginStrategy,
    @inject("VendorLoginStrategy") private vendorLogin: ILoginStrategy
  ) {
    this.strategies = {
      admin: this.adminLogin,
      client: this.clientLogin,
      vendor: this.vendorLogin,
    };
  }

  async execute(user: LoginUserDTO): Promise<Partial<IUserEntity>> {
    const strategy = this.strategies[user.role];
    if (!strategy) {
      throw new CustomError("Invalid user role", HTTP_STATUS.FORBIDDEN);
    }
    return await strategy.login(user);
  }
}
