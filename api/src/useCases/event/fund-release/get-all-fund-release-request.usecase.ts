import { inject, injectable } from "tsyringe";
import { IFundReleaseRequestRepository } from "../../../entities/repositoryInterfaces/event/fund-release-request-repository.interface";
import { IGetAllFundReleaseRequestUseCase } from "../../../entities/useCaseInterfaces/event/fund-release/get-all-fund-release-request-usecase.interface";
import { IFundReleaseRequestEntity } from "../../../entities/models/fund-release-request.entity";

@injectable()
export class GetAllFundReleaseRequestUseCase implements IGetAllFundReleaseRequestUseCase {
    constructor(@inject("IFundReleaseRequestRepository")
    private fundReleaseRequestRepository: IFundReleaseRequestRepository) {}

    async execute(): Promise<IFundReleaseRequestEntity[]> {
        return await this.fundReleaseRequestRepository.findAll()
    }
}