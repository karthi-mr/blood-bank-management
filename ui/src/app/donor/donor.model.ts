import { Donor, Links } from '../admin/admin.model';
import { Branch } from '../patient/patient.model';
import { BloodGroup } from '../shared/shared.model';

export interface DonateHistory {
  id: number;
  disease: string;
  age: number;
  unit: number;
  status: number;
  reject_reason: string;
  added: Date;
  donor: Donor;
  blood_group: BloodGroup;
  donate_branch: Branch;
}

export interface DonateHistoryView {
  links: Links;
  total: number;
  count: number;
  results: DonateHistory[];
}

export interface DonateBlood {
  age: number;
  blood_group: BloodGroup;
  unit: number;
  disease: string | null;
  donate_branch_id: number;
}
