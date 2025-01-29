import bcrypt from "bcrypt";
import { IPasswordBcrypt } from "./password.bcrypt.interface";

export class PasswordBcrypt implements IPasswordBcrypt {
  async hash(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }
  async compare(current: string, original: string): Promise<boolean> {
    return await bcrypt.compare(current, original);
  }
}
