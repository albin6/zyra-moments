import { Request, Response } from "express";
import { ICreateWorkSampleController } from "../../../entities/controllerInterfaces/vendor/create-work-sample-controller.interface";
import { ICreateWorkSampleUseCase } from "../../../entities/useCaseInterfaces/vendor/create-work-sample-usercase.interface";
import { inject, injectable } from "tsyringe";
import { ZodError } from "zod";
import { HTTP_STATUS, SUCCESS_MESSAGES } from "../../../shared/constants";
import { CustomError } from "../../../entities/utils/CustomError";
import { IWorkSampleEntity } from "../../../entities/models/work-sample.entity";
import { CustomRequest } from "../../middlewares/auth.middleware";

@injectable()
export class CreateWorkSampleController implements ICreateWorkSampleController {
  constructor(
    @inject("ICreateWorkSampleUseCase")
    private createWorkSampleUseCase: ICreateWorkSampleUseCase
  ) {}
  async handle(req: Request, res: Response): Promise<void> {
    try {
      const { title, description, images } = req.body as Omit<
        IWorkSampleEntity,
        "vendorId"
      >;
      const vendorId = (req as CustomRequest).user.id as any;

      const data: IWorkSampleEntity = {
        title,
        description,
        images,
        vendorId,
      };

      await this.createWorkSampleUseCase.execute(data);

      res
        .status(HTTP_STATUS.CREATED)
        .json({ success: true, message: SUCCESS_MESSAGES.OPERATION_SUCCESS });
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.errors.map((err) => ({
          message: err.message,
        }));

        res.status(HTTP_STATUS.BAD_REQUEST).json({
          success: false,
          message: "Validation failed",
          errors,
        });
        return;
      }
      if (error instanceof CustomError) {
        res
          .status(error.statusCode)
          .json({ success: false, message: error.message });
        return;
      }
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Something went wrong!" });
    }
  }
}
