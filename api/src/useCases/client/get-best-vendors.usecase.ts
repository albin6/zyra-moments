import { inject, injectable } from "tsyringe";
import { IVendorEntity } from "../../entities/models/vendor.entity";
import { IVendorRepository } from "../../entities/repositoryInterfaces/vendor/vendor-repository.interface";
import { IGetBestVendorsUseCase } from "../../entities/useCaseInterfaces/client/get-best-vendors-usecase.interface";

@injectable()
export class GetBestVendorsUseCase implements IGetBestVendorsUseCase {
  constructor(
    @inject("IVendorRepository") private vendorRepository: IVendorRepository
  ) {}

  async execute(): Promise<Partial<IVendorEntity>[] | []> {
    return await this.vendorRepository.findBestVendors();
  }
}
