import { Request, Response } from "express";
import { IRefreshTokenUseCase } from "../../../entities/useCaseInterfaces/auth/refresh-toke-usecase.inteface";
import { inject, injectable } from "tsyringe";
import { IRefreshTokenController } from "../../../entities/controllerInterfaces/auth/refresh-token-controller.inteface";
import { setAuthCookies } from "../../../shared/utils/cookieHelper";
import {
  ERROR_MESSAGES,
  HTTP_STATUS,
  SUCCESS_MESSAGES,
} from "../../../shared/constants";

@injectable()
export class RefreshTokenController implements IRefreshTokenController {
  constructor(
    @inject("IRefreshTokenUseCase")
    private refreshTokenUseCase: IRefreshTokenUseCase
  ) {}
  handle(req: Request, res: Response) {
    try {
      const { refreshToken } = req.body;
      const newTokens = this.refreshTokenUseCase.execute(refreshToken);
      setAuthCookies(res, newTokens.accessToken, newTokens.refreshToken);
      res
        .status(HTTP_STATUS.OK)
        .json({ success: true, message: SUCCESS_MESSAGES.OPERATION_SUCCESS });
    } catch (error) {
      res
        .status(HTTP_STATUS.UNAUTHORIZED)
        .json({ message: ERROR_MESSAGES.INVALID_TOKEN });
    }
  }
}
