import { Request, Response } from "express";
import { IGetClientDetailsController } from "../../../entities/controllerInterfaces/client/get-client-details-controller.interface";
import { IGetClientDetailsUseCase } from "../../../entities/useCaseInterfaces/client/get-client-details-usecase.interface";
import { CustomRequest } from "../../middlewares/auth.middleware";
import { HTTP_STATUS } from "../../../shared/constants";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetClientDetailsConrtoller implements IGetClientDetailsController {
  constructor(
    @inject("IGetClientDetailsUseCase")
    private getClientDetailsUseCase: IGetClientDetailsUseCase
  ) {}
  async handle(req: Request, res: Response): Promise<void> {
    const id = (req as CustomRequest).user.id;
    const client = await this.getClientDetailsUseCase.execute(id);

    res.status(HTTP_STATUS.OK).json({ success: true, client });
  }
}
