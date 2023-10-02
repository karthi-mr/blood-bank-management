import { BloodGroup } from "../shared/shared.model";

interface User2 {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  mobile: string;
  password: string;
  user_type: number;
  last_login: Date;
}

interface User1 {
  id: number;
  user: User2;
  blood_group?: BloodGroup;
  date_of_birth?: Date;
  profile_pic: string | null;
}

export interface MyProfile {
  detail: string;
  age: number | string;
  user: User1;
}