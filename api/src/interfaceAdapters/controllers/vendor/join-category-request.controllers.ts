import { Request, Response } from "express";
import { IJoinCategoryRequestController } from "../../../entities/controllerInterfaces/vendor/join-category-request-controller.inteface";
import { IJoinCategoryRequestUseCase } from "../../../entities/useCaseInterfaces/vendor/join-category-request-usecase.interface";
import { HTTP_STATUS, SUCCESS_MESSAGES } from "../../../shared/constants";
import { inject, injectable } from "tsyringe";
import { CustomRequest } from "../../middlewares/auth.middleware";

@injectable()
export class JoinCategoryController implements IJoinCategoryRequestController {
  constructor(
    @inject("IJoinCategoryRequestUseCase")
    private joinCategoryRequestUseCase: IJoinCategoryRequestUseCase
  ) {}
  async handle(req: Request, res: Response): Promise<void> {
    const { category } = req.body;
    const vendorId = (req as CustomRequest).user.id;
    await this.joinCategoryRequestUseCase.execute(vendorId as any, category);
    res
      .status(HTTP_STATUS.OK)
      .json({ success: true, message: SUCCESS_MESSAGES.ACTION_SUCCESS });
  }
}
