import { inject, injectable } from "tsyringe";
import { ICreateFundReleaseRequestController } from "../../../../entities/controllerInterfaces/event/fund-release/create-fund-release-request-controller.inteface";
import { ICreateFundReleaseRequestUseCase } from "../../../../entities/useCaseInterfaces/event/fund-release/create-fund-release-request-usecase.interface";
import { Request, Response } from "express";
import { HTTP_STATUS, SUCCESS_MESSAGES } from "../../../../shared/constants";
import { CustomRequest } from "../../../middlewares/auth.middleware";

@injectable()
export class CreateFundReleaseRequestController
  implements ICreateFundReleaseRequestController
{
  constructor(
    @inject("ICreateFundReleaseRequestUseCase")
    private createFundReleaseRequestUseCase: ICreateFundReleaseRequestUseCase
  ) {}

  async handle(req: Request, res: Response): Promise<void> {
    const organizerId = (req as CustomRequest).user.id
    const { eventId, message } = req.body;

    const request = await this.createFundReleaseRequestUseCase.execute(
      eventId,
      organizerId,
      message
    );

    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      data: request,
      message: SUCCESS_MESSAGES.FUND_RELEASE_REQ_CREATED,
    });
  }
}
