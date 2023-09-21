import { Donor } from "../admin/admin.model";

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