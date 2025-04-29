
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
  type: "Phone" | "Video" | "In-person";
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
