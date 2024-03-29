import { Donor, Links, Patient } from '../admin/admin.model';
import { BloodGroup } from '../shared/shared.model';

export interface Branch {
  id?: number;
  name: string;
  address: string;
  mobile: string;
  added: Date;
}

export interface PatientHistory {
  id: number;
  patient_name: string;
  patient_age: string;
  reason: string;
  reject_reason: string;
  unit: number;
  status: number;
  added: Date;
  request_by_patient: Patient | null;
  request_by_donor: Donor | null;
  request_branch: Branch;
  blood_group: BloodGroup;
}

export interface BloodRequestHistoryView {
  links: Links;
  total: number;
  count: number;
  results: PatientHistory[];
}

export interface RequestBlood {
  patient_name: string;
  patient_age: number;
  reason: string;
  blood_group: number;
  unit: number;
  request_branch: number;
}
