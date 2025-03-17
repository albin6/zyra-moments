import { Request, Response } from "express";
import { ILogoutUserController } from "../../../entities/controllerInterfaces/auth/logout-controller.interface";
import { HTTP_STATUS, SUCCESS_MESSAGES } from "../../../shared/constants";
import { clearAuthCookies } from "../../../shared/utils/cookieHelper";
import { inject, injectable } from "tsyringe";
import { CustomRequest } from "../../middlewares/auth.middleware";
import { IBlackListTokenUseCase } from "../../../entities/useCaseInterfaces/auth/blacklist-token-usecase.interface";
import { IRevokeRefreshTokenUseCase } from "../../../entities/useCaseInterfaces/auth/revoke-refresh-token-usecase.interface";

@injectable()
export class LogoutUserController implements ILogoutUserController {
  constructor(
    @inject("IBlackListTokenUseCase")
    private blackListTokenUseCase: IBlackListTokenUseCase,
    @inject("IRevokeRefreshTokenUseCase")
    private revokeRefreshTokenUseCase: IRevokeRefreshTokenUseCase
  ) {}
  async handle(req: Request, res: Response): Promise<void> {
    await this.blackListTokenUseCase.execute(
      (req as CustomRequest).user.access_token
    );

    await this.revokeRefreshTokenUseCase.execute(
      (req as CustomRequest).user.refresh_token
    );

    const user = (req as CustomRequest).user;
    const accessTokenName = `${user.role}_access_token`;
    const refreshTokenName = `${user.role}_refresh_token`;
    clearAuthCookies(res, accessTokenName, refreshTokenName);
    res
      .status(HTTP_STATUS.OK)
      .json({ success: true, message: SUCCESS_MESSAGES.LOGOUT_SUCCESS });
  }
}
