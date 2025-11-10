export type UserRole = 'Administrator' | 'Pharmacist';

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  profileCompleted?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type RiskLevel = 'Low' | 'Moderate' | 'High' | 'Extreme';
export type OutcomeStatus = 'Accepted' | 'Not Accepted' | 'Pending';

export interface Intervention {
  id: string;
  userId: string;
  problem: string;
  medicationIds: string[];
  risk: RiskLevel;
  outcome: OutcomeStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface Medication {
  id: string;
  name: string;
  createdAt: Date;
}

export interface Stats {
  totalPharmacists: number;
  totalInterventions: number;
  acceptanceRate: number;
  highRiskCount: number;
}
