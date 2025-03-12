import { inject, injectable } from "tsyringe";
import { IGetVendorDetailsForChatUseCase } from "../../../entities/useCaseInterfaces/chat/get-vendor-details-usecase.interface";
import { Request, Response } from "express";
import { HTTP_STATUS } from "../../../shared/constants";

@injectable()
export class VendorController {
  constructor(
    @inject("IGetVendorDetailsForChatUseCase")
    private getVendorDetailsForChatUseCase: IGetVendorDetailsForChatUseCase
  ) {}

  async getVendorDetails(req: Request, res: Response): Promise<void> {
    try {
      const { vendorId } = req.params;

      if (!vendorId) {
        res.status(400).json({ error: "Vendor ID is required" });
        return;
      }

      const vendor = await this.getVendorDetailsForChatUseCase.execute(
        vendorId
      );

      if (!vendor) {
        res.status(HTTP_STATUS.NOT_FOUND).json({ error: "Vendor not found" });
        return;
      }

      res.status(200).json({
        _id: vendor._id,
        firstName: vendor.firstName,
        lastName: vendor.lastName,
        profileImage: vendor.profileImage,
        email: vendor.email,
      });
    } catch (error) {
      console.error("Error fetching vendor details:", error);
      res.status(500).json({ error: "Failed to fetch vendor details" });
    }
  }
}
