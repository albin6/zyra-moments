import { LoginUserDTO } from "../../../shared/dtos/user.dto";

export interface ILoginUserUseCase {
  execute(user: LoginUserDTO): Promise<void>;
}
