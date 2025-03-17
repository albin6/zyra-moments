import { inject, injectable } from "tsyringe";
import { IGoogleUseCase } from "../../entities/useCaseInterfaces/auth/google-usecase.interface.interface";
import { IRegisterStrategy } from "./regiter-strategies/register-strategy.interface";
import { HTTP_STATUS } from "../../shared/constants";
import { CustomError } from "../../entities/utils/custom-error";
import { OAuth2Client } from "google-auth-library";
import { IUserEntity } from "../../entities/models/user.entity";
import { ILoginStrategy } from "./login-strategies/login-strategy.interface";

@injectable()
export class GoogleUseCase implements IGoogleUseCase {
  private registerStrategies: Record<string, IRegisterStrategy>;
  private loginStrategies: Record<string, ILoginStrategy>;
  private client: OAuth2Client;
  constructor(
    @inject("ClientRegisterStrategy") private clientRegister: IRegisterStrategy,
    @inject("VendorRegisterStrategy") private vendorRegister: IRegisterStrategy,
    @inject("ClientGoogleLoginStrategy") private clientLogin: ILoginStrategy,
    @inject("VendorGoogleLoginStrategy") private vendorLogin: ILoginStrategy
  ) {
    this.registerStrategies = {
      client: this.clientRegister,
      vendor: this.vendorRegister,
    };
    this.loginStrategies = {
      client: this.clientLogin,
      vendor: this.vendorLogin,
    };
    this.client = new OAuth2Client();
  }
  async execute(
    credential: any,
    client_id: any,
    role: any
  ): Promise<Partial<IUserEntity>> {
    const registerStrategy = this.registerStrategies[role];
    const loginStrategy = this.loginStrategies[role];
    if (!registerStrategy || !loginStrategy) {
      throw new CustomError("Invalid user role", HTTP_STATUS.FORBIDDEN);
    }

    const ticket = await this.client.verifyIdToken({
      idToken: credential,
      audience: client_id,
    });

    const payload = ticket.getPayload();
    if (!payload) {
      throw new CustomError(
        "Invalid or empty token payload",
        HTTP_STATUS.UNAUTHORIZED
      );
    }

    const googleId = payload.sub;
    const email = payload.email;
    const firstName = payload.given_name;
    const lastName = payload.family_name;
    const profileImage = payload.picture;

    if (!email) {
      throw new CustomError("Email is required", HTTP_STATUS.BAD_REQUEST);
    }

    const existingUser = await loginStrategy.login({ email, role });

    if (!existingUser) {
      const newUser = await registerStrategy.register({
        firstName: firstName as string,
        lastName: lastName as string,
        role,
        googleId,
        email,
        profileImage,
      });

      if (!newUser) {
        throw new CustomError("", 0);
      }
      return { email, role, _id: newUser._id };
    }

    return { email, role, _id: existingUser._id };
  }
}
