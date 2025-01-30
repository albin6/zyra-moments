export interface AdminDTO {
  email: string;
  password: string;
  role: "admin";
}

export interface ClientDTO {
  clientId?: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: "client";
}

export interface VendorDTO {
  vendorId?: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: "vendor";
  category: string;
}

export type UserDTO = AdminDTO | ClientDTO | VendorDTO;
