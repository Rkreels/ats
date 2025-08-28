export interface Candidate {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  location: string;
  experience: number;
  skills: string[];
  education: string;
  source: string;
  salary: string;
  status: "Applied" | "Screen" | "Interview" | "Offer" | "Hired" | "Rejected";
  appliedDate: string;
  resumeUrl: string;
  coverLetterUrl: string | null;
  notes: string;
  feedback: string | null;
  avatar: string;
  lastUpdated: string;
  interviews: Interview[];
  linkedinUrl?: string;
  expectedSalary?: string;
  availability?: string;
  certifications?: string;
  portfolioUrl?: string;
}

export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Temporary" | "Internship";
  description: string;
  responsibilities: string[];
  requirements: string[];
  postedDate: string;
  closingDate: string;
  salary: string;
  status: "Draft" | "Pending Approval" | "Published" | "Closed" | "On Hold";
  hiringManager: string;
  applicants: number;
  skills: string[];
}

export interface Interview {
  id: string;
  candidateId: string;
  interviewerId: string;
  interviewerName: string;
  date: string;
  time: string;
  duration: string;
  type: "Phone" | "Video" | "In-person" | "Behavioral" | "Technical";
  status: "Scheduled" | "Completed" | "Canceled";
  feedback?: string;
  notes?: string;
}

export interface TimeToHireData {
  month: string;
  Engineering: number;
  Product: number;
  Marketing: number;
  Sales: number;
}

export interface DiversityData {
  gender: {
    Male: number;
    Female: number;
    "Non-binary": number;
    "Prefer not to say": number;
  };
  ethnicity: {
    White: number;
    "Black or African American": number;
    Asian: number;
    Hispanic: number;
    "Two or more races": number;
    "Other/Unknown": number;
  };
  hiringSource: {
    LinkedIn: number;
    "Job Boards": number;
    "Company Website": number;
    Referrals: number;
    "University Recruiting": number;
    Other: number;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  permissions: {
    canViewCandidates: boolean;
    canEditCandidates: boolean;
    canDeleteCandidates: boolean;
    canViewJobs: boolean;
    canEditJobs: boolean;
    canDeleteJobs: boolean;
    canScheduleInterviews: boolean;
    canViewReports: boolean;
    canEditReports: boolean;
    canDeleteReports: boolean;
    canManageUsers: boolean;
  };
}

// New interfaces for enhanced ATS functionality
export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  category: "Interview" | "Offer" | "Rejection" | "General" | "Onboarding";
  variables: string[];
}

export interface OnboardingTask {
  id: string;
  candidateId: string;
  title: string;
  description: string;
  dueDate: string;
  status: "Pending" | "In Progress" | "Completed" | "Overdue";
  assignedTo: string;
}

export interface JobSource {
  id: string;
  name: string;
  url: string;
  candidates: number;
  hires: number;
  costPerHire: number;
  isActive: boolean;
}

export interface CandidateAssessment {
  id: string;
  candidateId: string;
  title: string;
  type: "Skills" | "Personality" | "Cognitive" | "Technical";
  score: number | null;
  maxScore: number;
  completed: boolean;
  sentDate: string;
  completedDate: string | null;
}

export interface ReferralProgram {
  id: string;
  name: string;
  department: string;
  bonus: string;
  eligibility: string;
  status: "Active" | "Inactive";
  referrals: number;
  hires: number;
}
