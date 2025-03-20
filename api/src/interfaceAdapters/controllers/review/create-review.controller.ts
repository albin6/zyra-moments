import { Request, Response } from "express";
import { ICreateReviewController } from "../../../entities/controllerInterfaces/review/create-review-controller.interface";
import { ICreateReviewUseCase } from "../../../entities/useCaseInterfaces/review/create-revew-usecase.interface";
import { HTTP_STATUS } from "../../../shared/constants";
import { inject, injectable } from "tsyringe";

@injectable()
export class CreateReviewController implements ICreateReviewController {
  constructor(@inject("ICreateReviewUseCase") private createReviewUseCase: ICreateReviewUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    const { clientId, vendorId, rating, comment } = req.body;
    const review = await this.createReviewUseCase.execute({
      clientId,
      vendorId,
      rating,
      comment,
    });
    res.status(HTTP_STATUS.CREATED).json({ success: true, review });
  }
}
