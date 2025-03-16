import { injectable } from "tsyringe";
import { IDashBoardStatsRepository } from "../../../entities/repositoryInterfaces/admin/dashboard-stats-repository.interface";
import { CategoryModel } from "../../../frameworks/database/models/category.model";
import { ClientModel } from "../../../frameworks/database/models/client.model";
import { EventModel } from "../../../frameworks/database/models/event.model";
import { VendorModel } from "../../../frameworks/database/models/vendor.model";

@injectable()
export class DashboardStatsRepository implements IDashBoardStatsRepository {
  async getActiveEventsCount(): Promise<number> {
    return EventModel.countDocuments({ status: true });
  }

  async getActiveClientsCount(): Promise<number> {
    return ClientModel.countDocuments({ status: "active" });
  }

  async getActiveVendorsCount(): Promise<number> {
    return VendorModel.countDocuments({ status: "active" });
  }

  async getActiveCategoriesCount(): Promise<number> {
    return CategoryModel.countDocuments({ status: true });
  }
}
