import { Donor, Patient } from "../admin/admin.model";

export interface PatientHistory {
  id: number;
  patient_name: string;
  patient_age: string;
  reason: string;
  unit: number;
  status: number;
  added: Date;
  request_by_patient: Patient | null;
  request_by_donor: Donor | null;
  blood_group: number;
}

export interface RequestBlood {
  patient_name: string;
  patient_age: number;
  reason: string;
  blood_group: number;
  unit: number;
}
