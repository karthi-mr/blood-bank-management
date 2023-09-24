import { BloodGroup } from "../shared/shared.model";

export interface Links {
  next: string;
  previous: string;
}

export interface UserResult {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  mobile: string;
  user_type: number;
  address: string | null;
  last_login: Date | null;
}

export interface Donor {
  id: number;
  user: UserResult;
  date_of_birth: Date;
  profile_pic: string | null;
  blood_group: BloodGroup;
}

export interface Patient {
  id: number;
  user: UserResult;
  date_of_birth: Date;
  profile_pic: string | null;
  blood_group: BloodGroup;
}

export interface DonorResult {
  links: Links;
  total: number;
  count: number;
  results: Donor[];
}

export interface PatientResult {
  links: Links;
  total: number;
  count: number;
  results: Patient[];
}

export interface BloodStock {
  id: number;
  unit: number;
  blood_group: BloodGroup;
}