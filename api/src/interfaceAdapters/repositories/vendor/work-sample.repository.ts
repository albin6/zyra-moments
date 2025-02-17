import { injectable } from "tsyringe";
import { IWorkSampleEntity } from "../../../entities/models/work-sample.entity";
import { IWorkSampleRepository } from "../../../entities/repositoryInterfaces/vendor/work-sample-repository.interface";
import { WorkSampleModel } from "../../../frameworks/database/models/work-sample.model";
import { PaginatedWorkSample } from "../../../entities/models/paginated-work-sample.entity";

@injectable()
export class WorkSampleRepository implements IWorkSampleRepository {
  async create(data: IWorkSampleEntity): Promise<void> {
    await WorkSampleModel.create(data);
  }

  async findAllByVendorId(
    vendorId: any,
    skip: number,
    limit: number
  ): Promise<PaginatedWorkSample> {
    const [workSamples, total] = await Promise.all([
      WorkSampleModel.find(
        { vendorId },
        { _id: 1, title: 1, description: 1, images: 1 }
      )
        .skip(skip)
        .limit(limit),
      WorkSampleModel.countDocuments({ vendorId }),
    ]);

    return {
      workSamples,
      total,
    };
  }

  async findById(
    id: any
  ): Promise<Pick<
    IWorkSampleEntity,
    "_id" | "title" | "description" | "images"
  > | null> {
    return await WorkSampleModel.findById(id);
  }

  async findByIdAndUpdate(
    id: any,
    data: Partial<IWorkSampleEntity>
  ): Promise<void> {
    await WorkSampleModel.findByIdAndUpdate(id, data);
  }

  async deleteById(id: any): Promise<void> {
    await WorkSampleModel.deleteOne(id);
  }
}
