import { model } from "mongoose";
import { IFundReleaseRequestEntity } from "../../../entities/models/fund-release-request.entity";
import { fundReleaseRequestSchema } from "../schemas/fund-release-request.schema";

export interface IFundReleaseRequestModel extends IFundReleaseRequestEntity, Document{}

export const FundReleaseRequestModel = model<IFundReleaseRequestModel>("FundReleaseRequest", fundReleaseRequestSchema)