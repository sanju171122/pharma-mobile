export interface User {
  uid: string;
  email: string;
  role: 'Pharmacist' | 'Administrator';
  active: boolean;
  createdAt: string;
  profile: UserProfile;
}

export interface UserProfile {
  name?: string;
  phone?: string;
  dob?: string;
  gender?: string;
  cityId?: string;
  instituteId?: string;
  education?: string;
  practiceType?: string;
  license?: string;
  experienceYears?: number;
  specialization?: string;
  photoUrl?: string;
}

export interface Intervention {
  id?: string;
  userId: string;
  interventionType: string;
  medications: string[];
  problem: string;
  skills: string[];
  riskLevel: 'Low' | 'Medium' | 'High';
  outcome: 'Pending' | 'Accepted' | 'Rejected';
  createdAt: string;
}

export interface Favorite {
  id?: string;
  userId: string;
  name: string;
  description?: string;
  interventionType: string;
  medications: string[];
  problem: string;
  skills: string[];
  riskLevel: 'Low' | 'Medium' | 'High';
  outcome: 'Pending' | 'Accepted' | 'Rejected';
}

export interface ReferenceData {
  id: string;
  name: string;
  active?: boolean;
}
