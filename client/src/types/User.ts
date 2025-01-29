import { UserRole } from "./UserRoles";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  token: string;
}
