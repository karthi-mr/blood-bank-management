import { BloodGroup } from "../shared/shared.model";

export interface AuthToken {
  auth_token: {
    access: string;
    refresh: string;
  }
}

export interface LoginUser {
  username: string;
  password: string;
}

export interface JWTToken {
  token_type: string;
  exp: Date;
  iat: Date;
  jti: string;
  user_id: number;
  username: string;
  user_type: number;
}

export interface User {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  mobile: string;
  password: string;
  user_type: number;
}

export interface RegisterUser {
  user: User;
  data_of_birth: Date;
  blood_group: BloodGroup;
}