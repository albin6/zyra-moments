import { PaginatedWorkSample } from "../../models/paginated-work-sample.entity";
import { IWorkSampleEntity } from "../../models/work-sample.entity";

export interface IWorkSampleRepository {
  create(data: IWorkSampleEntity): Promise<void>;

  findAllByVendorId(
    vendorId: any,
    skip: number,
    limit: number
  ): Promise<PaginatedWorkSample>;

  findById(
    id: any
  ): Promise<Pick<
    IWorkSampleEntity,
    "_id" | "title" | "description" | "images"
  > | null>;

  findByIdAndUpdate(id: any, data: Partial<IWorkSampleEntity>): Promise<void>;

  deleteById(id: any): Promise<void>;
}
