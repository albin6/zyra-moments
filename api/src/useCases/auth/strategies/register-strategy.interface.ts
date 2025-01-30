import { UserDTO } from "../../../shared/dtos/user.dto";

export interface IRegisterStrategy {
  register(user: UserDTO): Promise<void>;
}
