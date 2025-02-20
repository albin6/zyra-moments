import { injectable } from "tsyringe";
import { IServiceEntity } from "../../../entities/models/service.entity";
import { IServiceRepository } from "../../../entities/repositoryInterfaces/common/service-repository.interface";
import { ServiceModel } from "../../../frameworks/database/models/service.model";
import {
  PaginatedServices,
  PaginatedVendorServices,
} from "../../../entities/models/paginated-services.entity";

@injectable()
export class ServiceRepository implements IServiceRepository {
  async save(data: IServiceEntity): Promise<void> {
    await ServiceModel.create(data);
  }

  async findByVendorId(
    id: any,
    skip: number,
    limit: number
  ): Promise<PaginatedServices> {
    const [services, total, all] = await Promise.all([
      ServiceModel.find({ vendorId: id })
        .select(
          "_id serviceTitle serviceDuration serviceDescription servicePrice"
        )
        .skip(skip)
        .limit(limit)
        .lean(),
      ServiceModel.countDocuments({ vendorId: id }),
      ServiceModel.countDocuments(),
    ]);

    return {
      services,
      total,
      all,
    };
  }

  async findByVendorIdForVendorProfileInClient(
    id: any,
    skip: number,
    limit: number
  ): Promise<PaginatedVendorServices> {
    const [services, total] = await Promise.all([
      ServiceModel.find({ vendorId: id }).skip(skip).limit(limit).lean(),
      ServiceModel.countDocuments({ vendorId: id }),
    ]);

    return {
      services,
      total,
    };
  }

  async findById(id: any): Promise<IServiceEntity | null> {
    return await ServiceModel.findById(id);
  }

  async findByIdAndUpdate(id: any, data: IServiceEntity): Promise<void> {
    await ServiceModel.findByIdAndUpdate(id, data);
  }

  async findAllServiceByVendorId(id: any): Promise<IServiceEntity[] | []> {
    return await ServiceModel.find({ vendorId: id });
  }
}
