import { Request, Response } from "express";
import { IGetAllCategoriesController } from "../../../entities/controllerInterfaces/common/get-all-categories-controller.interface";
import { HTTP_STATUS } from "../../../shared/constants";
import { inject, injectable } from "tsyringe";
import { IGetAllCategoriesUseCase } from "../../../entities/useCaseInterfaces/common/get-all-categories-usecase.inteface";

@injectable()
export class GetAllCategoriesController implements IGetAllCategoriesController {
  constructor(
    @inject("IGetAllCategoriesUseCase")
    private getAllCategoriesUseCase: IGetAllCategoriesUseCase
  ) {}

  async handle(req: Request, res: Response): Promise<void> {
    const categories = await this.getAllCategoriesUseCase.execute();
    res.status(HTTP_STATUS.OK).json({ success: true, categories });
  }
}
