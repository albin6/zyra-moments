import { Request, Response } from "express";
import { IGetAllCategoryJoinRequestController } from "../../../entities/controllerInterfaces/admin/get-all-category-join-request-controller.interface";
import { IGetAllCategoryJoinRequestUseCase } from "../../../entities/useCaseInterfaces/admin/get-all-category-join-request-usecase.interface";
import { HTTP_STATUS } from "../../../shared/constants";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetAllCategoryJoinRequestController
  implements IGetAllCategoryJoinRequestController
{
  constructor(
    @inject("IGetAllCategoryJoinRequestUseCase")
    private getAllCategoryJoinRequestUseCase: IGetAllCategoryJoinRequestUseCase
  ) {}
  async handle(req: Request, res: Response): Promise<void> {
    const categoryRequests =
      await this.getAllCategoryJoinRequestUseCase.execute();

    res
      .status(HTTP_STATUS.OK)
      .json({ success: true, requests: categoryRequests });
  }
}
