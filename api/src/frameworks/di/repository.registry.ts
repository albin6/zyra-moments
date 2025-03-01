import { container } from "tsyringe";
import { IAdminRepository } from "../../entities/repositoryInterfaces/admin/admin-repository.interface";
import { AdminRepository } from "../../interfaceAdapters/repositories/admin/admin.respository";
import { IClientRepository } from "../../entities/repositoryInterfaces/client/client-respository.interface";
import { ClientRepository } from "../../interfaceAdapters/repositories/client/client.repository";
import { IVendorRepository } from "../../entities/repositoryInterfaces/vendor/vendor-repository.interface";
import { VendorRepository } from "../../interfaceAdapters/repositories/vendor/vendor.repository";
import { IOTPRepository } from "../../entities/repositoryInterfaces/auth/otp-repository.inteface";
import { OTPRepository } from "../../interfaceAdapters/repositories/auth/otp.repsitory";
import { ICategoryRepository } from "../../entities/repositoryInterfaces/common/category-repository.interface";
import { CategoryRespository } from "../../interfaceAdapters/repositories/common/category.repository";
import { ICategoryRequestRepository } from "../../entities/repositoryInterfaces/common/category-request-respository.interface";
import { CategoryRequestRepository } from "../../interfaceAdapters/repositories/common/category-request.repository";
import { IRedisTokenRepository } from "../../entities/repositoryInterfaces/redis/redis-token-repository.interface";
import { RedisTokenRepository } from "../../interfaceAdapters/repositories/redis/redis-token.repository";
import { IRefreshTokenRepository } from "../../entities/repositoryInterfaces/auth/refresh-token-repository.interface";
import { RefreshTokenRepository } from "../../interfaceAdapters/repositories/auth/refresh-token.respository";
import { IWorkSampleRepository } from "../../entities/repositoryInterfaces/vendor/work-sample-repository.interface";
import { WorkSampleRepository } from "../../interfaceAdapters/repositories/vendor/work-sample.repository";
import { IServiceRepository } from "../../entities/repositoryInterfaces/common/service-repository.interface";
import { ServiceRepository } from "../../interfaceAdapters/repositories/common/service.repository";
import { IPaymentRepository } from "../../entities/repositoryInterfaces/payment/payment-repository.interface";
import { PaymentRepository } from "../../interfaceAdapters/repositories/payment/payment.repository";
import { IBookingRepository } from "../../entities/repositoryInterfaces/booking/booking-repository.interface";
import { BookingRepository } from "../../interfaceAdapters/repositories/booking/booking.repository";
import { IEventRepository } from "../../entities/repositoryInterfaces/event/event-repository.interface";
import { EventRepository } from "../../interfaceAdapters/repositories/event/event.repository";

export class RepositoryRegistry {
  static registerRepositories(): void {
    container.register<IAdminRepository>("IAdminRepository", {
      useClass: AdminRepository,
    });

    container.register<IClientRepository>("IClientRepository", {
      useClass: ClientRepository,
    });

    container.register<IVendorRepository>("IVendorRepository", {
      useClass: VendorRepository,
    });

    container.register<IOTPRepository>("IOTPRepository", {
      useClass: OTPRepository,
    });

    container.register<ICategoryRepository>("ICategoryRepository", {
      useClass: CategoryRespository,
    });

    container.register<ICategoryRequestRepository>(
      "ICategoryRequestRepository",
      { useClass: CategoryRequestRepository }
    );

    container.register<IRedisTokenRepository>("IRedisTokenRepository", {
      useClass: RedisTokenRepository,
    });

    container.register<IRefreshTokenRepository>("IRefreshTokenRepository", {
      useClass: RefreshTokenRepository,
    });

    container.register<IWorkSampleRepository>("IWorkSampleRepository", {
      useClass: WorkSampleRepository,
    });

    container.register<IServiceRepository>("IServiceRepository", {
      useClass: ServiceRepository,
    });

    container.register<IPaymentRepository>("IPaymentRepository", {
      useClass: PaymentRepository,
    });

    container.register<IBookingRepository>("IBookingRepository", {
      useClass: BookingRepository,
    });

    container.register<IEventRepository>("IEventRepository", {
      useClass: EventRepository,
    });
  }
}
