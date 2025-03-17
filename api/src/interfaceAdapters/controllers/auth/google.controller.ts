import { Request, Response } from "express";
import { IGoogleController } from "../../../entities/controllerInterfaces/auth/google-controller.interface";
import { HTTP_STATUS, SUCCESS_MESSAGES } from "../../../shared/constants";
import { IGoogleUseCase } from "../../../entities/useCaseInterfaces/auth/google-usecase.interface.interface";
import { setAuthCookies } from "../../../shared/utils/cookieHelper";
import { IGenerateTokenUseCase } from "../../../entities/useCaseInterfaces/auth/generate-token-usecase.interface";
import { inject, injectable } from "tsyringe";

@injectable()
export class GoogleController implements IGoogleController {
  constructor(
    @inject("IGoogleUseCase")
    private googleUseCase: IGoogleUseCase,
    @inject("IGenerateTokenUseCase")
    private generateTokenUseCase: IGenerateTokenUseCase
  ) {}
  async handle(req: Request, res: Response): Promise<void> {
    const { credential, client_id, role } = req.body;

    const user = await this.googleUseCase.execute(credential, client_id, role);

    if (!user._id || !user.email || !user.role) {
      throw new Error("User ID, email, or role is missing");
    }

    const userId = user._id.toString();

    const tokens = await this.generateTokenUseCase.execute(
      userId,
      user.email,
      user.role
    );

    const accessTokenName = `${user.role}_access_token`;
    const refreshTokenName = `${user.role}_refresh_token`;

    setAuthCookies(
      res,
      tokens.accessToken,
      tokens.refreshToken,
      accessTokenName,
      refreshTokenName
    );

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: SUCCESS_MESSAGES.LOGIN_SUCCESS,
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
    });
  }
}
