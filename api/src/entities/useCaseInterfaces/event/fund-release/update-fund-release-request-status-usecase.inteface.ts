import { IFundReleaseRequestEntity } from "../../../models/fund-release-request.entity";

export interface IUpdateFundReleaseRequestStatusUseCase {
  execute(
    requestId: string,
    status: IFundReleaseRequestEntity["status"]
  ): Promise<IFundReleaseRequestEntity>;
}
