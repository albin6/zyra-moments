import { Request, Response } from "express";
import { IGetVendorProfileDetailsController } from "../../../entities/controllerInterfaces/client/get-vendor-profile-details-controller.interface";
import { IGetVendorProfileDetailsUseCase } from "../../../entities/useCaseInterfaces/client/get-vendor-profile-details-usecase.interface";
import { ZodError } from "zod";
import { HTTP_STATUS } from "../../../shared/constants";
import { CustomError } from "../../../entities/utils/CustomError";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetVendorProfileDetailsController
  implements IGetVendorProfileDetailsController
{
  constructor(
    @inject("IGetVendorProfileDetailsUseCase")
    private getVendorProfileDetailsUseCase: IGetVendorProfileDetailsUseCase
  ) {}
  async handle(req: Request, res: Response): Promise<void> {
    try {
      const { vendorId } = req.params;
      const { servicePage, workSamplePage, limit } = req.query;

      const servicePageNumber = Number(servicePage);
      const workSamplePageNumber = Number(workSamplePage);
      const pageSize = Number(limit);

      const vendorDetails = await this.getVendorProfileDetailsUseCase.execute(
        vendorId,
        {
          servicePage: servicePageNumber,
          workSamplePage: workSamplePageNumber,
          limit: pageSize,
        }
      );

      const response = {
        _id: vendorDetails._id!,
        firstName: vendorDetails.firstName,
        lastName: vendorDetails.lastName,
        email: vendorDetails.email,
        profileImage: vendorDetails?.profileImage,
        phoneNumber: vendorDetails?.phoneNumber,
        status: vendorDetails.status,
        vendorId: vendorDetails.vendorId,
        category: vendorDetails.category,
        bio: vendorDetails.bio,
        place: vendorDetails.place,
        averageRating: vendorDetails.averageRating,
        totalReviews: vendorDetails.totalReviews,
        workSamples: vendorDetails.workSamplesData.workSamples,
        services: vendorDetails.servicesData.services,
      };

      res.status(HTTP_STATUS.OK).json({
        success: true,
        vendorData: response,
        currentServicePage: servicePageNumber,
        totalServicePages: vendorDetails.servicesData.total,
        currentWorkSamplePage: workSamplePageNumber,
        totalWorkSamplePage: vendorDetails.workSamplesData.total,
      });
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
