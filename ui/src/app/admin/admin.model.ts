import { User } from '../auth/auth.model';
import { BloodGroup } from '../shared/shared.model';

export interface Links {
  next: string;
  previous: string;
}

export interface UserResult {
  id: number;
  username: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  mobile: string | null;
  user_type: number | null;
  address: string | null;
  last_login: Date | null;
}

export interface Admin {
  id: number;
  user: UserResult;
  profile_pic: string | null;
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

export interface AdminResult {
  links: Links;
  total: number;
  count: number;
  results: Admin[];
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
