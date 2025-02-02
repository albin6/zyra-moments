import { container } from "tsyringe";
import { IRegisterUserUseCase } from "../../entities/useCaseInterfaces/auth/register-usecase.inteface";
import { RegisterUserUseCase } from "../../useCases/auth/register-user.usecase";
import { IPasswordBcrypt } from "../security/password.bcrypt.interface";
import { PasswordBcrypt } from "../security/password.bcrypt";
import { ILoginUserUseCase } from "../../entities/useCaseInterfaces/auth/login-usecase.interface";
import { LoginUserUseCase } from "../../useCases/auth/login.usecase";

import { IRegisterStrategy } from "../../useCases/auth/regiter-strategies/register-strategy.interface";
import { ClientRegisterStrategy } from "../../useCases/auth/regiter-strategies/client-register.strategy";
import { VendorRegisterStrategy } from "../../useCases/auth/regiter-strategies/vendor-register.strategy";
import { AdminRegisterStrategy } from "../../useCases/auth/regiter-strategies/admin-register.startegy";
import { ILoginStrategy } from "../../useCases/auth/login-strategies/login-strategy.interface";
import { AdminLoginStrategy } from "../../useCases/auth/login-strategies/admin-login.strategy";
import { ClientLoginStrategy } from "../../useCases/auth/login-strategies/client-login.strategy";
import { VendorLoginStrategy } from "../../useCases/auth/login-strategies/vendor-login.strategy";
import { ISendEmailUseCase } from "../../entities/useCaseInterfaces/auth/send-email-usecase.inteface";
import { SendEmailUseCase } from "../../useCases/auth/send-email.usecase";
import { IEmailService } from "../../entities/services/email-service.interface";
import { EmailService } from "../../interfaceAdapters/services/email.services";
import { IOTPService } from "../../entities/services/otp-service.inteface";
import { OTPService } from "../../interfaceAdapters/services/otp.services";
import { IVerifyOTPUseCase } from "../../entities/useCaseInterfaces/auth/verify-otp-usecase.interface";
import { VerifyOTPUseCase } from "../../useCases/auth/verify-otp.usecase";
import { IUserExistenceService } from "../../entities/services/user-existence-service.interface";
import { UserExistenceService } from "../../interfaceAdapters/services/use-existence.services";
import { IGenerateTokenUseCase } from "../../entities/useCaseInterfaces/auth/generate-token-usecase.interface";
import { GenerateTokenUseCase } from "../../useCases/auth/generate-token.usecase";
import { IRefreshTokenUseCase } from "../../entities/useCaseInterfaces/auth/refresh-toke-usecase.inteface";
import { RefreshTokenUseCase } from "../../useCases/auth/refresh-token.usecase";
import { ITokenService } from "../../useCases/auth/interfaces/token-service.interface";
import { JwtService } from "../../interfaceAdapters/services/jwt-service";

export class UseCaseRegistry {
  static registerUseCases(): void {
    container.register<IRegisterUserUseCase>("IRegisterUserUseCase", {
      useClass: RegisterUserUseCase,
    });

    container.register<IPasswordBcrypt>("IPasswordBcrypt", {
      useClass: PasswordBcrypt,
    });

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

    // register email & otp services
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
  }
}
