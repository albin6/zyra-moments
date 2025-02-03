import { IUserEntity } from "../../models/user.entity";

export interface ILoginUserUseCase {
  execute(user: Partial<IUserEntity>): Promise<Partial<IUserEntity>>;
}
