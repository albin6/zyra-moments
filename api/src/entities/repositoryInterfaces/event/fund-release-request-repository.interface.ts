import { IFundReleaseRequestEntity } from "../../models/fund-release-request.entity";

export interface IFundReleaseRequestRepository {
    create(request: IFundReleaseRequestEntity): Promise<IFundReleaseRequestEntity>;
    findAll(): Promise<IFundReleaseRequestEntity[]>;
    findById(requestId: string): Promise<IFundReleaseRequestEntity | null>;
    updateStatus(requestId: string, status: IFundReleaseRequestEntity["status"]): Promise<IFundReleaseRequestEntity | null>;
  }