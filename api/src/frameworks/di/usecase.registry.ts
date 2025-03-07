import { container } from "tsyringe";
import { IBcrypt } from "../security/bcrypt.interface";
import { OTPBcrypt } from "../security/otp.bcrypt";
import { PasswordBcrypt } from "../security/password.bcrypt";

import { IRegisterStrategy } from "../../useCases/auth/regiter-strategies/register-strategy.interface";
import { ILoginStrategy } from "../../useCases/auth/login-strategies/login-strategy.interface";
import { ClientRegisterStrategy } from "../../useCases/auth/regiter-strategies/client-register.strategy";
import { ClientLoginStrategy } from "../../useCases/auth/login-strategies/client-login.strategy";
import { VendorRegisterStrategy } from "../../useCases/auth/regiter-strategies/vendor-register.strategy";
import { VendorLoginStrategy } from "../../useCases/auth/login-strategies/vendor-login.strategy";
import { AdminRegisterStrategy } from "../../useCases/auth/regiter-strategies/admin-register.startegy";
import { AdminLoginStrategy } from "../../useCases/auth/login-strategies/admin-login.strategy";

import { ITokenService } from "../../useCases/auth/interfaces/token-service.interface";
import { JwtService } from "../../interfaceAdapters/services/jwt.service";
import { IEmailService } from "../../entities/services/email-service.interface";
import { EmailService } from "../../interfaceAdapters/services/email.service";
import { IOTPService } from "../../entities/services/otp-service.inteface";
import { OTPService } from "../../interfaceAdapters/services/otp.service";
import { IUserExistenceService } from "../../entities/services/user-existence-service.interface";
import { UserExistenceService } from "../../interfaceAdapters/services/use-existence.service";
import { IPaymentService } from "../../entities/services/payement-service.interface";
import { StripeService } from "../../interfaceAdapters/services/stripe.service";
import { IQrCodeService } from "../../entities/services/qr-code-service.interface";
import { QrCodeService } from "../../interfaceAdapters/services/qr-code.service";

import { IRegisterUserUseCase } from "../../entities/useCaseInterfaces/auth/register-usecase.inteface";
import { RegisterUserUseCase } from "../../useCases/auth/register-user.usecase";
import { ILoginUserUseCase } from "../../entities/useCaseInterfaces/auth/login-usecase.interface";
import { LoginUserUseCase } from "../../useCases/auth/login.usecase";
import { ISendEmailUseCase } from "../../entities/useCaseInterfaces/auth/send-email-usecase.inteface";
import { SendEmailUseCase } from "../../useCases/auth/send-email.usecase";
import { IVerifyOTPUseCase } from "../../entities/useCaseInterfaces/auth/verify-otp-usecase.interface";
import { VerifyOTPUseCase } from "../../useCases/auth/verify-otp.usecase";
import { IGenerateTokenUseCase } from "../../entities/useCaseInterfaces/auth/generate-token-usecase.interface";
import { GenerateTokenUseCase } from "../../useCases/auth/generate-token.usecase";
import { IRefreshTokenUseCase } from "../../entities/useCaseInterfaces/auth/refresh-toke-usecase.inteface";
import { RefreshTokenUseCase } from "../../useCases/auth/refresh-token.usecase";
import { IGetAllCategoriesUseCase } from "../../entities/useCaseInterfaces/common/get-all-categories-usecase.inteface";
import { GetAllCategoriesUseCase } from "../../useCases/common/get-all-categories.usecase";
import { ICreateNewCategoryUseCase } from "../../entities/useCaseInterfaces/admin/create-new-category-usecase.interface";
import { CreateNewCategoryUseCase } from "../../useCases/admin/create-new-category.usecase";
import { IJoinCategoryRequestUseCase } from "../../entities/useCaseInterfaces/vendor/join-category-request-usecase.interface";
import { JoinCategoryRequestUseCase } from "../../useCases/vendor/join-category-request.usecase";
import { IGetAllUsersUseCase } from "../../entities/useCaseInterfaces/admin/get-all-users-usecase.interface";
import { GetAllUsersUseCase } from "../../useCases/admin/get-all-users.usecase";
import { IGetVendorDetailsUseCase } from "../../entities/useCaseInterfaces/vendor/get-vendor-details-usecase.interface";
import { GetVendorDetailsUseCase } from "../../useCases/vendor/get-vendor-details.usecase";
import { IBlackListTokenUseCase } from "../../entities/useCaseInterfaces/auth/blacklist-token-usecase.interface";
import { BlackListTokenUseCase } from "../../useCases/auth/blacklist-token.usecase";
import { IRevokeRefreshTokenUseCase } from "../../entities/useCaseInterfaces/auth/revoke-refresh-token-usecase.interface";
import { RevokeRefreshTokenUseCase } from "../../useCases/auth/revoke-refresh-token.usecase";
import { IGetAllCategoryJoinRequestUseCase } from "../../entities/useCaseInterfaces/admin/get-all-category-join-request-usecase.interface";
import { GetAllCategoryJoinRequestUseCase } from "../../useCases/admin/get-all-category-join-request.usecase";
import { IGetClientDetailsUseCase } from "../../entities/useCaseInterfaces/client/get-client-details-usecase.interface";
import { GetClientDetailsUseCase } from "../../useCases/client/get-client-details.usecase";
import { IUpdateClientPasswordUseCase } from "../../entities/useCaseInterfaces/client/update-client-password-usecase.interface";
import { UpdateClientPasswordUseCase } from "../../useCases/client/update-client-password.usecase";
import { IUpdateVendorPasswordUseCase } from "../../entities/useCaseInterfaces/vendor/update-vendor-password-usecase.interface";
import { UpdateVendorPasswordUseCase } from "../../useCases/vendor/update-vendor-password.usecase";
import { IUpdateUserStatusUseCase } from "../../entities/useCaseInterfaces/admin/update-user-status-usecase.interface";
import { UpdateUserStatusUseCase } from "../../useCases/admin/update-user-status.usecase";
import { IGetAllPaginatedCategoryUseCase } from "../../entities/useCaseInterfaces/admin/get-all-paginated-category-usecase.interface";
import { GetAllPaginatedCategoryUseCase } from "../../useCases/admin/get-all-paginated-category.usecase";
import { ICreateWorkSampleUseCase } from "../../entities/useCaseInterfaces/vendor/create-work-sample-usercase.interface";
import { CreateWorkSampleUseCase } from "../../useCases/vendor/create-work-sample.usecase";
import { IGetAllWorkSampleByVendorIdUseCase } from "../../entities/useCaseInterfaces/vendor/get-all-work-sample-by-vendorid-usecase.interface";
import { GetAllWorkSampleByVendorIdUseCase } from "../../useCases/vendor/get-all-work-sample-by-vendorid.usecase";
import { IUpdateVendorProfileUseCase } from "../../entities/useCaseInterfaces/vendor/update-vendor-profile-usecase.interface";
import { UpdateVendorProfileUseCase } from "../../useCases/vendor/update-vendor-profile.usecase";
import { IUpdateClientProfileUseCase } from "../../entities/useCaseInterfaces/client/update-client-profile-usecase.interface";
import { UpdateClientProfileUseCase } from "../../useCases/client/update-client-profile.usecase";
import { IGetVendorCategoryJoinRequestStatusUseCase } from "../../entities/useCaseInterfaces/vendor/get-vendor-category-join-request-status-usecase.interface";
import { GetVendorCategoryJoinRequestStatusUseCase } from "../../useCases/vendor/get-vendor-category-join-request-status.usecase";
import { IUpdateCategoryStatusUseCase } from "../../entities/useCaseInterfaces/admin/update-category-status-usecase.interface";
import { UpdateCategoryStatusUseCase } from "../../useCases/admin/update-category-status.usecase";
import { IUpdateCategoryRequestStatusUseCase } from "../../entities/useCaseInterfaces/admin/update-category-request-status-usecase.interface";
import { UpdateCategoryRequestStatusUseCase } from "../../useCases/admin/update-category-request-status.usecase";
import { IGetWorkSampleByIdUseCase } from "../../entities/useCaseInterfaces/vendor/get-work-sample-by-id-usecase.interface";
import { GetWorkSampleByIdUseCase } from "../../useCases/vendor/get-work-sample-by-id.usecase";
import { IUpdateWorkSampleByIdUseCase } from "../../entities/useCaseInterfaces/vendor/update-work-sample-by-id-usecase.interface";
import { UpdateWorkSampleByIdUseCase } from "../../useCases/vendor/update-work-sample-by-id.usecase";
import { IDeleteWorkSampleByIdUseCase } from "../../entities/useCaseInterfaces/vendor/delete-work-sample-by-id-usecase.interface";
import { DeleteWorkSampleByIdUseCase } from "../../useCases/vendor/delete-work-sample-by-id.usecase";
import { ICreateServiceUseCase } from "../../entities/useCaseInterfaces/vendor/service/create-service-usecase.interface";
import { CreateServiceUseCase } from "../../useCases/vendor/service/create-service.usecase";
import { IGetAllServicesByVendorIdUseCase } from "../../entities/useCaseInterfaces/vendor/service/get-all-services-by-vendor-id-usecase.interface";
import { GetAllServicesByVendorIdUseCase } from "../../useCases/vendor/service/get-all-services-by-vendor-id.usecase";
import { IGetServiceDetailsByIdUseCase } from "../../entities/useCaseInterfaces/vendor/service/get-service-details-by-id-usecase.interface";
import { GetServiceDetailsByIdUseCase } from "../../useCases/vendor/service/get-service-details-by-id.usecase";
import { IUpdateServiceByIdUseCase } from "../../entities/useCaseInterfaces/vendor/service/update-service-by-id-usecase.interface";
import { UpdateServiceByIdUseCase } from "../../useCases/vendor/service/update-service-by-id.usecase";
import { IGetVendorsUnderCategoryUseCase } from "../../entities/useCaseInterfaces/client/get-vendors-under-category-usecase.interface";
import { GetVendorsUnderCategoryUseCase } from "../../useCases/client/get-vendors-under-category.usecase";
import { IGetVendorProfileDetailsUseCase } from "../../entities/useCaseInterfaces/client/get-vendor-profile-details-usecase.interface";
import { GetVendorProfileDetailsUseCase } from "../../useCases/client/get-vendor-profile-details.usecase";
import { IGetBestVendorsUseCase } from "../../entities/useCaseInterfaces/client/get-best-vendors-usecase.interface";
import { GetBestVendorsUseCase } from "../../useCases/client/get-best-vendors.usecase";
import { ICreatePaymentIntentUseCase } from "../../entities/useCaseInterfaces/payment/create-payment-intent-usecase.interface";
import { CreatePaymentIntentUseCase } from "../../useCases/payment/create-payment-intent.usecase";
import { IConfirmPaymentUseCase } from "../../entities/useCaseInterfaces/payment/confirm-payment-usecase.interface";
import { ConfirmPaymentUseCase } from "../../useCases/payment/confirm-payment.usecase";
import { IWebHookUseCase } from "../../entities/useCaseInterfaces/payment/webhook-usecase.interface";
import { WebHookUseCase } from "../../useCases/payment/webhook.usecase";
import { IGetAllServicesForBookingUseCase } from "../../entities/useCaseInterfaces/client/get-all-services-for-booking-usecase.interface";
import { GetAllServicesForBookingUseCase } from "../../useCases/client/get-all-services-for-booking.usecase";
import { IGetAllBookingByClientUseCase } from "../../entities/useCaseInterfaces/booking/get-all-booking-by-client-usecase.interface";
import { GetAllBookingByClientUseCase } from "../../useCases/booking/get-all-booking-by-client.usecase";
import { ICreateNewBookingUseCase } from "../../entities/useCaseInterfaces/booking/create-new-booking-usecase.interface";
import { CreateNewBookingUseCase } from "../../useCases/booking/create-new-booking.usecase";
import { IGetAllBookingForVendorUseCase } from "../../entities/useCaseInterfaces/booking/get-all-booking-for-vendor-usecase.interface";
import { GetAllBookingForVendorUseCase } from "../../useCases/booking/get-all-booking-by-vendor.usecase";
import { IGoogleUseCase } from "../../entities/useCaseInterfaces/auth/google-usecase.interface.interface";
import { GoogleUseCase } from "../../useCases/auth/google.usecase";
import { ClientGoogleLoginStrategy } from "../../useCases/auth/login-strategies/client-google-login.strategy";
import { VendorGoogleLoginStrategy } from "../../useCases/auth/login-strategies/vendor-google-login.strategy";
import { IUpdateBookingStatusUseCase } from "../../entities/useCaseInterfaces/booking/update-booking-status-usecase.interface";
import { UpdateBookingStatusUseCase } from "../../useCases/booking/update-booking-status.usecase";
import { ICancelBookingUseCase } from "../../entities/useCaseInterfaces/booking/cancel-booking-usecase.interface";
import { CancelBookingUseCase } from "../../useCases/booking/cancel-booking.usecase";
import { IHostNewEventUseCase } from "../../entities/useCaseInterfaces/event/host-new-event-usecase.interface";
import { HostNewEventUseCase } from "../../useCases/event/host-new-event.usecase";
import { IGetAllEventsByHostIdUseCase } from "../../entities/useCaseInterfaces/event/get-all-events-by-host-id-usecase.interface";
import { GetAllEventsByHostIdUseCase } from "../../useCases/event/get-all-events-by-host-id.usecase";
import { IGetEventDetailsByIdUseCase } from "../../entities/useCaseInterfaces/event/get-event-details-by-id-usecase.interface";
import { GetEventDetailsByIdUseCase } from "../../useCases/event/get-event-details-by-id.usecase";
import { IGetAllTransactionsByUserIdUseCase } from "../../entities/useCaseInterfaces/payment/get-all-transactions-by-userid-usecase.interface";
import { GetAllTransactionsByUserIdUseCase } from "../../useCases/payment/get-all-transactions-by-userid.usecase";
import { IGetWalletDetailsOfUserUseCase } from "../../entities/useCaseInterfaces/wallet/get-wallet-details-of-user-usecase.interface";
import { GetWalletDetailsOfUserUseCase } from "../../useCases/wallet/get-wallet-details-of-user.usecase";
import { ICreateTicketUseCase } from "../../entities/useCaseInterfaces/event/ticket/create-ticket-usecase.interface";
import { CreateTicketUseCase } from "../../useCases/event/ticket/create-ticket.usecase";
import { IMarkAttendanceUseCase } from "../../entities/useCaseInterfaces/event/ticket/mark-attendance-usecase.interface";
import { MarkAttendanceUseCase } from "../../useCases/event/ticket/mark-attendance.usecase";
import { IListPaginatedEventsUseCase } from "../../entities/useCaseInterfaces/event/list-paginated-events-usecase.interface";
import { ListPaginatedEventsUseCase } from "../../useCases/event/list-paginated-events.usecase";
import { IDownloadTicketAsPdfUseCase } from "../../entities/useCaseInterfaces/event/ticket/download-ticket-as-pdf-usecase.inteface";
import { DownloadTicketAsPdfUseCase } from "../../useCases/event/ticket/download-ticket-as-pdf.usecase";
import { IGetUpcomingEventsUseCase } from "../../entities/useCaseInterfaces/event/get-upcoming-events-usecase.interface";
import { GetUpcomingEventsUseCase } from "../../useCases/event/get-upcoming-events.usecase";
import { IUpdateEventDetailsByIdUseCase } from "../../entities/useCaseInterfaces/event/update-event-details-by-id-usecase.interface";
import { UpdateEventDetailsByIdUseCase } from "../../useCases/event/update-event-details-by-id.usecase";

export class UseCaseRegistry {
  static registerUseCases(): void {
    container.register<IRegisterUserUseCase>("IRegisterUserUseCase", {
      useClass: RegisterUserUseCase,
    });

    container.register<IBcrypt>("IPasswordBcrypt", {
      useClass: PasswordBcrypt,
    });

    container.register<IBcrypt>("IOTPBcrypt", { useClass: OTPBcrypt });

    container.register<ILoginUserUseCase>("ILoginUserUseCase", {
      useClass: LoginUserUseCase,
    });

    container.register<ISendEmailUseCase>("ISendEmailUseCase", {
      useClass: SendEmailUseCase,
    });

    container.register<IVerifyOTPUseCase>("IVerifyOTPUseCase", {
      useClass: VerifyOTPUseCase,
    });

    container.register<IGenerateTokenUseCase>("IGenerateTokenUseCase", {
      useClass: GenerateTokenUseCase,
    });

    container.register<IRefreshTokenUseCase>("IRefreshTokenUseCase", {
      useClass: RefreshTokenUseCase,
    });

    container.register<IGetAllCategoriesUseCase>("IGetAllCategoriesUseCase", {
      useClass: GetAllCategoriesUseCase,
    });

    container.register<ICreateNewCategoryUseCase>("ICreateNewCategoryUseCase", {
      useClass: CreateNewCategoryUseCase,
    });

    container.register<IJoinCategoryRequestUseCase>(
      "IJoinCategoryRequestUseCase",
      {
        useClass: JoinCategoryRequestUseCase,
      }
    );

    container.register<IGetAllUsersUseCase>("IGetAllUsersUseCase", {
      useClass: GetAllUsersUseCase,
    });

    container.register<IGetVendorDetailsUseCase>("IGetVendorDetailsUseCase", {
      useClass: GetVendorDetailsUseCase,
    });

    container.register<IBlackListTokenUseCase>("IBlackListTokenUseCase", {
      useClass: BlackListTokenUseCase,
    });

    container.register<IRevokeRefreshTokenUseCase>(
      "IRevokeRefreshTokenUseCase",
      { useClass: RevokeRefreshTokenUseCase }
    );

    container.register<IGetAllCategoryJoinRequestUseCase>(
      "IGetAllCategoryJoinRequestUseCase",
      { useClass: GetAllCategoryJoinRequestUseCase }
    );

    container.register<IGetClientDetailsUseCase>("IGetClientDetailsUseCase", {
      useClass: GetClientDetailsUseCase,
    });

    container.register<IUpdateClientPasswordUseCase>(
      "IUpdateClientPasswordUseCase",
      { useClass: UpdateClientPasswordUseCase }
    );

    container.register<IUpdateVendorPasswordUseCase>(
      "IUpdateVendorPasswordUseCase",
      { useClass: UpdateVendorPasswordUseCase }
    );

    container.register<IUpdateUserStatusUseCase>("IUpdateUserStatusUseCase", {
      useClass: UpdateUserStatusUseCase,
    });

    container.register<IGetAllPaginatedCategoryUseCase>(
      "IGetAllPaginatedCategoryUseCase",
      { useClass: GetAllPaginatedCategoryUseCase }
    );

    container.register<ICreateWorkSampleUseCase>("ICreateWorkSampleUseCase", {
      useClass: CreateWorkSampleUseCase,
    });

    container.register<IGetAllWorkSampleByVendorIdUseCase>(
      "IGetAllWorkSampleByVendorIdUseCase",
      { useClass: GetAllWorkSampleByVendorIdUseCase }
    );

    container.register<IGetWorkSampleByIdUseCase>("IGetWorkSampleByIdUseCase", {
      useClass: GetWorkSampleByIdUseCase,
    });

    container.register<IUpdateWorkSampleByIdUseCase>(
      "IUpdateWorkSampleByIdUseCase",
      { useClass: UpdateWorkSampleByIdUseCase }
    );

    container.register<IDeleteWorkSampleByIdUseCase>(
      "IDeleteWorkSampleByIdUseCase",
      { useClass: DeleteWorkSampleByIdUseCase }
    );

    container.register<IUpdateVendorProfileUseCase>(
      "IUpdateVendorProfileUseCase",
      { useClass: UpdateVendorProfileUseCase }
    );

    container.register<IUpdateClientProfileUseCase>(
      "IUpdateClientProfileUseCase",
      { useClass: UpdateClientProfileUseCase }
    );

    container.register<IGetVendorCategoryJoinRequestStatusUseCase>(
      "IGetVendorCategoryJoinRequestStatusUseCase",
      { useClass: GetVendorCategoryJoinRequestStatusUseCase }
    );

    container.register<IUpdateCategoryStatusUseCase>(
      "IUpdateCategoryStatusUseCase",
      { useClass: UpdateCategoryStatusUseCase }
    );

    container.register<IUpdateCategoryRequestStatusUseCase>(
      "IUpdateCategoryRequestStatusUseCase",
      { useClass: UpdateCategoryRequestStatusUseCase }
    );

    container.register<ICreateServiceUseCase>("ICreateServiceUseCase", {
      useClass: CreateServiceUseCase,
    });

    container.register<IGetAllServicesByVendorIdUseCase>(
      "IGetAllServicesByVendorIdUseCase",
      { useClass: GetAllServicesByVendorIdUseCase }
    );

    container.register<IGetServiceDetailsByIdUseCase>(
      "IGetServiceDetailsByIdUseCase",
      { useClass: GetServiceDetailsByIdUseCase }
    );

    container.register<IUpdateServiceByIdUseCase>("IUpdateServiceByIdUseCase", {
      useClass: UpdateServiceByIdUseCase,
    });

    container.register<IGetVendorsUnderCategoryUseCase>(
      "IGetVendorsUnderCategoryUseCase",
      { useClass: GetVendorsUnderCategoryUseCase }
    );

    container.register<IGetVendorProfileDetailsUseCase>(
      "IGetVendorProfileDetailsUseCase",
      { useClass: GetVendorProfileDetailsUseCase }
    );

    container.register<IGetBestVendorsUseCase>("IGetBestVendorsUseCase", {
      useClass: GetBestVendorsUseCase,
    });

    container.register<ICreatePaymentIntentUseCase>(
      "ICreatePaymentIntentUseCase",
      { useClass: CreatePaymentIntentUseCase }
    );

    container.register<IConfirmPaymentUseCase>("IConfirmPaymentUseCase", {
      useClass: ConfirmPaymentUseCase,
    });

    container.register<IWebHookUseCase>("IWebHookUseCase", {
      useClass: WebHookUseCase,
    });

    container.register<IGetAllServicesForBookingUseCase>(
      "IGetAllServicesForBookingUseCase",
      { useClass: GetAllServicesForBookingUseCase }
    );

    container.register<IGetAllBookingByClientUseCase>(
      "IGetAllBookingByClientUseCase",
      { useClass: GetAllBookingByClientUseCase }
    );

    container.register<ICreateNewBookingUseCase>("ICreateNewBookingUseCase", {
      useClass: CreateNewBookingUseCase,
    });

    container.register<IGetAllBookingForVendorUseCase>(
      "IGetAllBookingForVendorUseCase",
      { useClass: GetAllBookingForVendorUseCase }
    );

    container.register<IGoogleUseCase>("IGoogleUseCase", {
      useClass: GoogleUseCase,
    });

    container.register<IUpdateBookingStatusUseCase>(
      "IUpdateBookingStatusUseCase",
      { useClass: UpdateBookingStatusUseCase }
    );

    container.register<ICancelBookingUseCase>("ICancelBookingUseCase", {
      useClass: CancelBookingUseCase,
    });

    container.register<IHostNewEventUseCase>("IHostNewEventUseCase", {
      useClass: HostNewEventUseCase,
    });

    container.register<IGetAllEventsByHostIdUseCase>(
      "IGetAllEventsByHostIdUseCase",
      { useClass: GetAllEventsByHostIdUseCase }
    );

    container.register<IGetEventDetailsByIdUseCase>(
      "IGetEventDetailsByIdUseCase",
      { useClass: GetEventDetailsByIdUseCase }
    );

    container.register<IGetAllTransactionsByUserIdUseCase>(
      "IGetAllTransactionsByUserIdUseCase",
      { useClass: GetAllTransactionsByUserIdUseCase }
    );

    container.register<IGetWalletDetailsOfUserUseCase>(
      "IGetWalletDetailsOfUserUseCase",
      { useClass: GetWalletDetailsOfUserUseCase }
    );

    container.register<ICreateTicketUseCase>("ICreateTicketUseCase", {
      useClass: CreateTicketUseCase,
    });

    container.register<IMarkAttendanceUseCase>("IMarkAttendanceUseCase", {
      useClass: MarkAttendanceUseCase,
    });

    container.register<IListPaginatedEventsUseCase>(
      "IListPaginatedEventsUseCase",
      { useClass: ListPaginatedEventsUseCase }
    );

    container.register<IDownloadTicketAsPdfUseCase>(
      "IDownloadTicketAsPdfUseCase",
      { useClass: DownloadTicketAsPdfUseCase }
    );

    container.register<IGetUpcomingEventsUseCase>("IGetUpcomingEventsUseCase", {
      useClass: GetUpcomingEventsUseCase,
    });

    container.register<IUpdateEventDetailsByIdUseCase>(
      "IUpdateEventDetailsByIdUseCase",
      { useClass: UpdateEventDetailsByIdUseCase }
    );

    // Register Strategies
    container.register<IRegisterStrategy>("ClientRegisterStrategy", {
      useClass: ClientRegisterStrategy,
    });

    container.register<IRegisterStrategy>("VendorRegisterStrategy", {
      useClass: VendorRegisterStrategy,
    });

    container.register<IRegisterStrategy>("AdminRegisterStrategy", {
      useClass: AdminRegisterStrategy,
    });

    container.register<ILoginStrategy>("AdminLoginStrategy", {
      useClass: AdminLoginStrategy,
    });

    container.register<ILoginStrategy>("ClientLoginStrategy", {
      useClass: ClientLoginStrategy,
    });

    container.register<ILoginStrategy>("VendorLoginStrategy", {
      useClass: VendorLoginStrategy,
    });

    container.register<ILoginStrategy>("ClientGoogleLoginStrategy", {
      useClass: ClientGoogleLoginStrategy,
    });

    container.register<ILoginStrategy>("VendorGoogleLoginStrategy", {
      useClass: VendorGoogleLoginStrategy,
    });

    // register services
    container.register<IEmailService>("IEmailService", {
      useClass: EmailService,
    });

    container.register<IOTPService>("IOTPService", { useClass: OTPService });

    container.register<IUserExistenceService>("IUserExistenceService", {
      useClass: UserExistenceService,
    });

    container.register<ITokenService>("ITokenService", {
      useClass: JwtService,
    });

    container.register<IPaymentService>("IPaymentService", {
      useClass: StripeService,
    });

    container.register<IQrCodeService>("IQrCodeService", {
      useClass: QrCodeService,
    });
  }
}
