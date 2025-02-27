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

  async saveCount(
    serviceId: any,
    dateString: string,
    startTime: string,
    endTime: string
  ): Promise<void> {
    const service = await ServiceModel.findById(serviceId);

    if (!service) {
      throw new Error("Service not found");
    }

    const dateIndex = service.availableDates.findIndex(
      (date) => date.date === dateString
    );

    if (dateIndex === -1) {
      throw new Error("Date not found in service availability");
    }

    const timeSlotIndex = service.availableDates[dateIndex].timeSlots.findIndex(
      (slot) => slot.startTime === startTime && slot.endTime === endTime
    );

    if (timeSlotIndex === -1) {
      throw new Error("Time slot not found for the given date");
    }

    // Increment the count
    service.availableDates[dateIndex].timeSlots[timeSlotIndex].count += 1;

    // Save the updated service
    await service.save();
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
