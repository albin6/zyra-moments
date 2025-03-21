import { Request, Response } from "express";
import { ICreateReviewController } from "../../../entities/controllerInterfaces/review/create-review-controller.interface";
import { ICreateReviewUseCase } from "../../../entities/useCaseInterfaces/review/create-revew-usecase.interface";
import { HTTP_STATUS, SUCCESS_MESSAGES } from "../../../shared/constants";
import { inject, injectable } from "tsyringe";
import { CustomRequest } from "../../middlewares/auth.middleware";

@injectable()
export class CreateReviewController implements ICreateReviewController {
  constructor(
    @inject("ICreateReviewUseCase")
    private createReviewUseCase: ICreateReviewUseCase
  ) {}

  async handle(req: Request, res: Response): Promise<void> {
    const clientId = (req as CustomRequest).user.id;
    const { vendorId, rating, comment, bookingId } = req.body;
    const review = await this.createReviewUseCase.execute({
      bookingId,
      clientId,
      vendorId,
      rating,
      comment,
    });
    res
      .status(HTTP_STATUS.CREATED)
      .json({
        success: true,
        message: SUCCESS_MESSAGES.SUBMIT_SUCCESS,
        review,
      });
  }
}
