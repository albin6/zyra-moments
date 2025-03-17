import { Request, Response } from "express";
import { IGetAllUsersController } from "../../../entities/controllerInterfaces/admin/get-all-users-controller.interface";
import { IGetAllUsersUseCase } from "../../../entities/useCaseInterfaces/admin/get-all-users-usecase.interface";
import { HTTP_STATUS } from "../../../shared/constants";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetAllUsersController implements IGetAllUsersController {
  constructor(
    @inject("IGetAllUsersUseCase")
    private getAllUsersUseCase: IGetAllUsersUseCase
  ) {}

  async handle(req: Request, res: Response): Promise<void> {
    const { page = 1, limit = 10, search = "", userType } = req.query;

    const pageNumber = Number(page);
    const pageSize = Number(limit);
    const userTypeString = typeof userType === "string" ? userType : "client";
    const searchTermString = typeof search === "string" ? search : "";

    const { user, total } = await this.getAllUsersUseCase.execute(
      userTypeString,
      pageNumber,
      pageSize,
      searchTermString
    );

    res.status(HTTP_STATUS.OK).json({
      success: true,
      users: user,
      totalPages: total,
      currentPage: pageNumber,
    });
  }
}
