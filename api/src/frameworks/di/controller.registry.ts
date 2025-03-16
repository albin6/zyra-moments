import { container } from "tsyringe";
import { RegisterUserController } from "../../interfaceAdapters/controllers/auth/register.controllers";
import { LoginUserController } from "../../interfaceAdapters/controllers/auth/login.controllers";
import { SendEmailController } from "../../interfaceAdapters/controllers/auth/send-email.controllers";
import { VerifyOTPController } from "../../interfaceAdapters/controllers/auth/verify-otp.controllers";
import { RefreshTokenController } from "../../interfaceAdapters/controllers/auth/refresh-token.controllers";
import { GetAllCategoriesController } from "../../interfaceAdapters/controllers/common/get-all-categories.controllers";
import { CreateNewCategoryController } from "../../interfaceAdapters/controllers/admin/create-new-category.controllers";
import { JoinCategoryController } from "../../interfaceAdapters/controllers/vendor/join-category-request.controllers";
import { GetAllUsersController } from "../../interfaceAdapters/controllers/admin/get-all-users.controllers";
import { GetVendorDetailsController } from "../../interfaceAdapters/controllers/vendor/get-vendor-details.controllers";
import { GetAllCategoryJoinRequestController } from "../../interfaceAdapters/controllers/admin/get-all-category-join-request.controllers";
import { GetClientDetailsConrtoller } from "../../interfaceAdapters/controllers/client/get-client-details.controllers";
import { UpdateClientPasswordController } from "../../interfaceAdapters/controllers/client/update-client-password.controllers";
import { UpdateVendorPasswordController } from "../../interfaceAdapters/controllers/vendor/update-vendor-password.controllers";
import { UpdateUserStatusController } from "../../interfaceAdapters/controllers/admin/update-user-status.controllers";
import { GetAllPaginatedCategoryController } from "../../interfaceAdapters/controllers/admin/get-all-paginated-category.controllers";
import { CreateWorkSampleController } from "../../interfaceAdapters/controllers/vendor/create-work-sample.controllers";
import { GetAllWorkSampleByVendorIdController } from "../../interfaceAdapters/controllers/vendor/get-all-work-sample-by-vendorid.controller";
import { UpdateVendorProfileController } from "../../interfaceAdapters/controllers/vendor/update-vendor-profile.controller";
import { UpdateClientProfileController } from "../../interfaceAdapters/controllers/client/update-client-profile.controller";
import { GetVendorCategoryJoinRequestStatusController } from "../../interfaceAdapters/controllers/vendor/get-vendor-category-join-request-status.controller";
import { UpdateCategoryStatusController } from "../../interfaceAdapters/controllers/admin/update-category-status.controller";
import { UpdateCategoryRequestStatusController } from "../../interfaceAdapters/controllers/admin/update-category-request-status.controller";
import { BlockedStatusMiddleware } from "../../interfaceAdapters/middlewares/block-status.middleware";
import { GetWorkSampleByIdController } from "../../interfaceAdapters/controllers/vendor/get-work-sample-by-id.controller";
import { UpdateWorkSampleByIdController } from "../../interfaceAdapters/controllers/vendor/update-work-sample-by-id.controller";
import { DeleteWorkSampleByIdController } from "../../interfaceAdapters/controllers/vendor/delete-work-sample-by-id.controller";
import { CreateServiceController } from "../../interfaceAdapters/controllers/vendor/service/create-service.controller";
import { GetAllServicesByVendorIdController } from "../../interfaceAdapters/controllers/vendor/service/get-all-services-by-vendor-id.controller";
import { GetServiceDetailsByIdController } from "../../interfaceAdapters/controllers/vendor/service/get-service-details-by-id.controller";
import { UpdateServiceByIdController } from "../../interfaceAdapters/controllers/vendor/service/update-service-by-id.controller";
import { GetVendorsUnderCategoryController } from "../../interfaceAdapters/controllers/client/get-vendors-under-category.controller";
import { GetVendorProfileDetailsController } from "../../interfaceAdapters/controllers/client/get-vendor-profile-details.controller";
import { GetBestVendorsController } from "../../interfaceAdapters/controllers/client/get-best-vendors.controller";
import { CreatePaymentIntentController } from "../../interfaceAdapters/controllers/payment/create-payment-intent.controller";
import { ConfirmPaymentController } from "../../interfaceAdapters/controllers/payment/confirm-payment.controller";
import { HandleWebHookController } from "../../interfaceAdapters/controllers/payment/handle-webhook.controller";
import { GetAllServicesForBookingController } from "../../interfaceAdapters/controllers/client/get-all-services-for-booking.controller";
import { GetAllBookingByClientController } from "../../interfaceAdapters/controllers/booking/get-all-booking-by-client.controller";
import { GetAllBookingForVendorController } from "../../interfaceAdapters/controllers/booking/get-all-booking-for-vendor.controller";
import { GoogleController } from "../../interfaceAdapters/controllers/auth/google.controller";
import { UpdateBookingStatusController } from "../../interfaceAdapters/controllers/booking/update-booking-status.controller";
import { HostNewEventController } from "../../interfaceAdapters/controllers/event/host-new-event.controller";
import { GetAllEventsByHostIdController } from "../../interfaceAdapters/controllers/event/get-all-events-by-host-id.controller";
import { GetEventDetailsByIdController } from "../../interfaceAdapters/controllers/event/get-event-details-by-id.controller";
import { GetAllTransactionsByUserIdUseCase } from "../../useCases/payment/get-all-transactions-by-userid.usecase";
import { GetWalletDetailsOfUserController } from "../../interfaceAdapters/controllers/wallet/get-wallet-details-of-user.controller";
import { CreateTicketController } from "../../interfaceAdapters/controllers/event/ticket/create-ticket.controller";
import { MarkAttendanceController } from "../../interfaceAdapters/controllers/event/ticket/mark-attendance.controller";
import { ListPaginatedEventsController } from "../../interfaceAdapters/controllers/event/list-paginated-events.controller";
import { DownloadTicketAsPdfController } from "../../interfaceAdapters/controllers/event/ticket/download-ticket-as-pdf.controller";
import { GetUpcomingEventsController } from "../../interfaceAdapters/controllers/event/get-upcoming-events.controller";
import { UpdateEventDetailsByIdController } from "../../interfaceAdapters/controllers/event/update-event-details-by-id.controller";
import { GetEventAttendanceController } from "../../interfaceAdapters/controllers/event/get-event-attendance.controller";
import { ChatController } from "../../interfaceAdapters/controllers/chat/chat.controller";
import { GetVendorDetailsForChatController } from "../../interfaceAdapters/controllers/chat/get-vendor-details.controller";
import { CreateChatRoomController } from "../../interfaceAdapters/controllers/chat/create-chat-room-controller";
import { GetAllTicketsByUserIdController } from "../../interfaceAdapters/controllers/event/ticket/get-all-tickets-by-user-id.controller";
import { CancelTicketController } from "../../interfaceAdapters/controllers/event/ticket/cancel-ticket.controller";
import { GetPaginatedEventsController } from "../../interfaceAdapters/controllers/event/get-paginated-events.controller";

export class ControllerRegistry {
  static registerControllers(): void {
    container.register(BlockedStatusMiddleware, {
      useClass: BlockedStatusMiddleware,
    });

    container.register("RegisterUserController", {
      useClass: RegisterUserController,
    });

    container.register("LoginUserController", {
      useClass: LoginUserController,
    });

    container.register("SendEmailController", {
      useClass: SendEmailController,
    });

    container.register("VerifyOTPController", {
      useClass: VerifyOTPController,
    });

    container.register("RefreshTokenController", {
      useClass: RefreshTokenController,
    });

    container.register("GetAllCategoriesController", {
      useClass: GetAllCategoriesController,
    });

    container.register("CreateNewCategoryController", {
      useClass: CreateNewCategoryController,
    });

    container.register("JoinCategoryController", {
      useClass: JoinCategoryController,
    });

    container.register("GetAllUsersController", {
      useClass: GetAllUsersController,
    });

    container.register("GetVendorDetailsController", {
      useClass: GetVendorDetailsController,
    });

    container.register("GetAllCategoryJoinRequestController", {
      useClass: GetAllCategoryJoinRequestController,
    });

    container.register("GetClientDetailsConrtoller", {
      useClass: GetClientDetailsConrtoller,
    });

    container.register("UpdateClientPasswordController", {
      useClass: UpdateClientPasswordController,
    });

    container.register("UpdateVendorPasswordController", {
      useClass: UpdateVendorPasswordController,
    });

    container.register("UpdateUserStatusController", {
      useClass: UpdateUserStatusController,
    });

    container.register("GetAllPaginatedCategoryController", {
      useClass: GetAllPaginatedCategoryController,
    });

    container.register("CreateWorkSampleController", {
      useClass: CreateWorkSampleController,
    });

    container.register("GetAllWorkSampleByVendorIdController", {
      useClass: GetAllWorkSampleByVendorIdController,
    });

    container.register("GetWorkSampleByIdController", {
      useClass: GetWorkSampleByIdController,
    });

    container.register("UpdateWorkSampleByIdController", {
      useClass: UpdateWorkSampleByIdController,
    });

    container.register("DeleteWorkSampleByIdController", {
      useClass: DeleteWorkSampleByIdController,
    });

    container.register("UpdateVendorProfileController", {
      useClass: UpdateVendorProfileController,
    });

    container.register("UpdateClientProfileController", {
      useClass: UpdateClientProfileController,
    });

    container.register("GetVendorCategoryJoinRequestStatusController", {
      useClass: GetVendorCategoryJoinRequestStatusController,
    });

    container.register("UpdateCategoryStatusController", {
      useClass: UpdateCategoryStatusController,
    });

    container.register("UpdateCategoryRequestStatusController", {
      useClass: UpdateCategoryRequestStatusController,
    });

    container.register("CreateServiceController", {
      useClass: CreateServiceController,
    });

    container.register("GetAllServicesByVendorIdController", {
      useClass: GetAllServicesByVendorIdController,
    });

    container.register("GetServiceDetailsByIdController", {
      useClass: GetServiceDetailsByIdController,
    });

    container.register("UpdateServiceByIdController", {
      useClass: UpdateServiceByIdController,
    });

    container.register("GetVendorsUnderCategoryController", {
      useClass: GetVendorsUnderCategoryController,
    });

    container.register("GetVendorProfileDetailsController", {
      useClass: GetVendorProfileDetailsController,
    });

    container.register("GetBestVendorsController", {
      useClass: GetBestVendorsController,
    });

    container.register("CreatePaymentIntentController", {
      useClass: CreatePaymentIntentController,
    });

    container.register("ConfirmPaymentController", {
      useClass: ConfirmPaymentController,
    });

    container.register("HandleWebHookController", {
      useClass: HandleWebHookController,
    });

    container.register("GetAllServicesForBookingController", {
      useClass: GetAllServicesForBookingController,
    });

    container.register("GetAllBookingByClientController", {
      useClass: GetAllBookingByClientController,
    });

    container.register("GetAllBookingForVendorController", {
      useClass: GetAllBookingForVendorController,
    });

    container.register("GoogleController", { useClass: GoogleController });

    container.register("UpdateBookingStatusController", {
      useClass: UpdateBookingStatusController,
    });

    container.register("HostNewEventController", {
      useClass: HostNewEventController,
    });

    container.register("GetAllEventsByHostIdController", {
      useClass: GetAllEventsByHostIdController,
    });

    container.register("GetEventDetailsByIdController", {
      useClass: GetEventDetailsByIdController,
    });

    container.register("GetAllTransactionsByUserIdUseCase", {
      useClass: GetAllTransactionsByUserIdUseCase,
    });

    container.register("GetWalletDetailsOfUserController", {
      useClass: GetWalletDetailsOfUserController,
    });

    container.register("CreateTicketController", {
      useClass: CreateTicketController,
    });

    container.register("MarkAttendanceController", {
      useClass: MarkAttendanceController,
    });

    container.register("ListPaginatedEventsController", {
      useClass: ListPaginatedEventsController,
    });

    container.register("DownloadTicketAsPdfController", {
      useClass: DownloadTicketAsPdfController,
    });

    container.register("GetUpcomingEventsController", {
      useClass: GetUpcomingEventsController,
    });

    container.register("UpdateEventDetailsByIdController", {
      useClass: UpdateEventDetailsByIdController,
    });

    container.register("GetEventAttendanceController", {
      useClass: GetEventAttendanceController,
    });

    container.register("GetAllTicketsByUserIdController", {
      useClass: GetAllTicketsByUserIdController,
    });

    container.register("CancelTicketController", {
      useClass: CancelTicketController,
    });

    // -----chat-----
    container.register("ChatController", { useClass: ChatController });

    container.register("GetVendorDetailsForChatController", {
      useClass: GetVendorDetailsForChatController,
    });

    container.register("CreateChatRoomController", {
      useClass: CreateChatRoomController,
    });

    container.register("GetPaginatedEventsController", {
      useClass: GetPaginatedEventsController,
    });
  }
}
