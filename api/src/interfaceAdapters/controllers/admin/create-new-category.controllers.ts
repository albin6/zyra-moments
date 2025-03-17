import { Request, Response } from "express";
import { ICreateNewCategoryController } from "../../../entities/controllerInterfaces/admin/create-new-category-controller.interface";
import { ICreateNewCategoryUseCase } from "../../../entities/useCaseInterfaces/admin/create-new-category-usecase.interface";
import { HTTP_STATUS, SUCCESS_MESSAGES } from "../../../shared/constants";
import { inject, injectable } from "tsyringe";

@injectable()
export class CreateNewCategoryController
  implements ICreateNewCategoryController
{
  constructor(
    @inject("ICreateNewCategoryUseCase")
    private createNewCategoryUseCase: ICreateNewCategoryUseCase
  ) {}
  async handle(req: Request, res: Response): Promise<void> {
    const { name } = req.body as { name: string };

    await this.createNewCategoryUseCase.execute(name);

    res
      .status(HTTP_STATUS.CREATED)
      .json({ success: true, message: SUCCESS_MESSAGES.OPERATION_SUCCESS });
  }
}
