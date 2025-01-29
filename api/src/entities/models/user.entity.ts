import { ObjectId } from "mongoose";
import { TRole } from "../../shared/constants";

export interface IUserEntity {
  _id?: ObjectId;
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  role: TRole;
  profileImage?: string;
  phone?: string;
  masterOfCeremonies?: boolean;
  status?: string;
  createdAt: Date;
  updatedAt: Date;
}
