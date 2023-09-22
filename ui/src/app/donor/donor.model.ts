import { Donor } from "../admin/admin.model";
import { BloodGroup } from "../shared/shared.model";

export interface DonateHistory {
  id: number;
  disease: string;
  age: number;
  unit: number;
  status: number;
  added: Date;
  donor: Donor;
  blood_group: number;
}

export interface DonateBlood {
  age: number;
  blood_group: BloodGroup;
  unit: number;
  disease: string | null;
}