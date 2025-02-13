import { injectable } from "tsyringe";
import { IWorkSampleEntity } from "../../../entities/models/work-sample.entity";
import { IWorkSampleRepository } from "../../../entities/repositoryInterfaces/vendor/work-sample-repository.interface";
import { WorkSampleModel } from "../../../frameworks/database/models/work-sample.model";

@injectable()
export class WorkSampleRepository implements IWorkSampleRepository {
  async create(data: IWorkSampleEntity): Promise<void> {
    await WorkSampleModel.create(data);
  }

  async findAllByVendorId(
    vendorId: any
  ): Promise<
    Pick<IWorkSampleEntity, "_id" | "title" | "description" | "images">[]
  > {
    return await WorkSampleModel.find(
      { vendorId },
      { _id: 1, title: 1, description: 1, images: 1 }
    );
  }
}
