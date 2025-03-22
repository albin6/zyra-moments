import { injectable } from "tsyringe";
import { IFundReleaseRequestEntity } from "../../../entities/models/fund-release-request.entity";
import { IFundReleaseRequestRepository } from "../../../entities/repositoryInterfaces/event/fund-release-request-repository.interface";
import { FundReleaseRequestModel } from "../../../frameworks/database/models/fund-release-request.model";

@injectable()
export class FundReleaseRequestRepository
  implements IFundReleaseRequestRepository
{
  async create(
    request: IFundReleaseRequestEntity
  ): Promise<IFundReleaseRequestEntity> {
    const newRequest = new FundReleaseRequestModel(request);
    return await newRequest.save();
  }

  async findAll(): Promise<IFundReleaseRequestEntity[]> {
    return await FundReleaseRequestModel.find()
      .populate("eventId")
      .populate("organizerId")
      .exec();
  }

  async findById(requestId: string): Promise<IFundReleaseRequestEntity | null> {
    return await FundReleaseRequestModel.findOne({ requestId })
      .populate("eventId")
      .populate("organizerId")
      .exec();
  }

  async updateStatus(
    requestId: string,
    status: IFundReleaseRequestEntity["status"],
  ): Promise<IFundReleaseRequestEntity | null> {
    return await FundReleaseRequestModel.findOneAndUpdate(
      { requestId },
      {
        status,
        processedAt: status !== "PENDING" ? new Date() : undefined,
      },
      { new: true }
    ).exec();
  }
}
