import { Request, Response } from "express";
import { IUpdateCategoryStatusController } from "../../../entities/controllerInterfaces/admin/update-category-status-controller.interface";
import { IUpdateCategoryStatusUseCase } from "../../../entities/useCaseInterfaces/admin/update-category-status-usecase.interface";
import { HTTP_STATUS, SUCCESS_MESSAGES } from "../../../shared/constants";
import { inject, injectable } from "tsyringe";

@injectable()
export class UpdateCategoryStatusController
  implements IUpdateCategoryStatusController
{
  constructor(
    @inject("IUpdateCategoryStatusUseCase")
    private updateCategoryStatusUseCase: IUpdateCategoryStatusUseCase
  ) {}
  async handle(req: Request, res: Response): Promise<void> {
    const { categoryId } = req.params;

    await this.updateCategoryStatusUseCase.execute(categoryId);

    res
      .status(HTTP_STATUS.OK)
      .json({ success: true, message: SUCCESS_MESSAGES.UPDATE_SUCCESS });
  }
}
