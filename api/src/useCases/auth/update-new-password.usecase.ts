import { inject, injectable } from "tsyringe";
import { IUpdateNewPasswordUseCase } from "../../entities/useCaseInterfaces/auth/update-new-password-usecase.interface";
import { IUpdatePasswordStrategy } from "./update-password/update-password-strategy.interface";
import { CustomError } from "../../entities/utils/custom-error";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../shared/constants";

@injectable()
export class UpdateNewPasswordUseCase implements IUpdateNewPasswordUseCase {
  private _strategies: Record<string, IUpdatePasswordStrategy>;

  constructor(
    @inject("IUpdatePasswordStrategy")
    private updateClientPasswordStrategy: IUpdatePasswordStrategy,
    @inject("IUpdatePasswordStrategy")
    private updateVendorPassowordStrategy: IUpdatePasswordStrategy
  ) {
    this._strategies = {
      client: this.updateClientPasswordStrategy,
      vendor: this.updateVendorPassowordStrategy,
    };
  }

  async execute(email: string, role: string, password: string): Promise<void> {
    const strategy = this._strategies[role];

    if (!strategy) {
      throw new CustomError(ERROR_MESSAGES.INVALID_ROLE, HTTP_STATUS.FORBIDDEN);
    }

    await strategy.update(email, password);
  }
}
