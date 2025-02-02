import { UserRole } from "./UserRoles";

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  role?: UserRole;
}

export interface IAdmin {
  email: string;
  password: string;
  role: "admin";
}

export interface IClient {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: "client";
}

export interface IVendor {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: "vendor";
  category?: string;
}

export type UserDTO = IAdmin | IClient | IVendor;
