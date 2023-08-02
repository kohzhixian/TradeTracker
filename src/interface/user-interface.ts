import { Types } from "mongoose";

export interface loginDTO {
  email: string;
  password: string;
}

export interface registerDTO {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  profileImage: string;
  companyCode: string;
}

export interface updateProfileDTO {
  userId: Types.ObjectId | string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface updatePasswordDTO {
  userId: Types.ObjectId | string;
  currentPassword: string;
  newPassword: string;
}

export interface deactivateAccountDTO {
  userId: Types.ObjectId | string;
}
