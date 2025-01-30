import { LoginUserDTO } from "../../../shared/dtos/user.dto";

export interface ILoginStrategy {
  login(user: LoginUserDTO): Promise<void>;
}
