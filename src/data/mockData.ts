import { v4 as uuidv4 } from 'uuid';
import { Candidate, Interview, User } from '@/types';

// Mock data service
export const mockDataService = {
  getAllCandidates: (): Candidate[] => candidates,
  getCandidate: (id: string): Candidate | undefined => candidates.find(c => c.id === id),
  getAllUsers: (): User[] => users,
  getUser: (id: string): User | undefined => users.find(u => u.id === id),
  getAllInterviews: (): Interview[] => interviews,
  getInterview: (id: string): Interview | undefined => interviews.find(i => i.id === id),
};

// Mock candidate data
const candidates: Candidate[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john.123@example.com",
    phone: "123-456-7890",
    location: "New York, NY",
    role: "Frontend Developer",
    status: "Interview",
    appliedDate: "2023-01-15",
    source: "LinkedIn",
    resumeUrl: "/placeholder.svg",
    coverLetterUrl: "",
    avatar: "/placeholder.svg",
    skills: ["React", "JavaScript", "HTML", "CSS"],
    experience: "5 years",
    education: "Bachelor's Degree in Computer Science",
    notes: "Promising candidate with strong technical skills.",
    lastUpdated: "2023-03-01",
    interviews: [
      {
        id: "101",
        date: "2023-02-01",
        type: "Technical Interview",
        notes: "Discussed React and JavaScript concepts.",
        candidateId: "1"
      }
    ],
    feedback: {
      interviewer: "Jane Doe",
      date: "2023-02-01",
      rating: 4,
      comments: "Good understanding of frontend technologies."
    }
  },
  {
    id: "2",
    name: "Alice Johnson",
    email: "alice.j@example.com",
    phone: "987-654-3210",
    location: "Los Angeles, CA",
    role: "Backend Developer",
    status: "Offer",
    appliedDate: "2022-12-01",
    source: "Indeed",
    resumeUrl: "/placeholder.svg",
    coverLetterUrl: "",
    avatar: "/placeholder.svg",
    skills: ["Node.js", "Express", "SQL", "MongoDB"],
    experience: "7 years",
    education: "Master's Degree in Software Engineering",
    notes: "Experienced backend developer with a strong portfolio.",
    lastUpdated: "2023-03-05",
    interviews: [
      {
        id: "102",
        date: "2023-01-10",
        type: "Technical Interview",
        notes: "Discussed Node.js and database design.",
        candidateId: "2"
      }
    ],
    feedback: {
      interviewer: "Bob Smith",
      date: "2023-01-10",
      rating: 5,
      comments: "Excellent technical skills and problem-solving abilities."
    }
  },
  {
    id: "3",
    name: "Bob Williams",
    email: "bob.w@example.com",
    phone: "555-123-4567",
    location: "Chicago, IL",
    role: "Data Scientist",
    status: "Hired",
    appliedDate: "2023-02-10",
    source: "Company Website",
    resumeUrl: "/placeholder.svg",
    coverLetterUrl: "",
    avatar: "/placeholder.svg",
    skills: ["Python", "Machine Learning", "Data Analysis", "Statistics"],
    experience: "4 years",
    education: "Bachelor's Degree in Statistics",
    notes: "Strong analytical skills and experience with machine learning.",
    lastUpdated: "2023-03-10",
    interviews: [
      {
        id: "103",
        date: "2023-03-01",
        type: "Technical Interview",
        notes: "Discussed machine learning algorithms and data analysis techniques.",
        candidateId: "3"
      }
    ],
    feedback: {
      interviewer: "Alice Johnson",
      date: "2023-03-01",
      rating: 4,
      comments: "Good understanding of data science concepts."
    }
  },
  {
    id: "4",
    name: "Emily Brown",
    email: "emily.b@example.com",
    phone: "777-999-8888",
    location: "Houston, TX",
    role: "Project Manager",
    status: "Rejected",
    appliedDate: "2022-11-01",
    source: "Referral",
    resumeUrl: "/placeholder.svg",
    coverLetterUrl: "",
    avatar: "/placeholder.svg",
    skills: ["Project Management", "Leadership", "Communication", "Agile"],
    experience: "8 years",
    education: "Master's Degree in Business Administration",
    notes: "Experienced project manager with strong leadership skills.",
    lastUpdated: "2023-03-15",
    interviews: [
      {
        id: "104",
        date: "2022-12-15",
        type: "Behavioral Interview",
        notes: "Discussed project management methodologies and leadership skills.",
        candidateId: "4"
      }
    ],
    feedback: {
      interviewer: "John Smith",
      date: "2022-12-15",
      rating: 3,
      comments: "Good communication skills but lacks technical expertise."
    }
  },
  {
    id: "5",
    name: "David Lee",
    email: "david.l@example.com",
    phone: "111-222-3333",
    location: "San Francisco, CA",
    role: "UX Designer",
    status: "Applied",
    appliedDate: "2023-03-01",
    source: "Behance",
    resumeUrl: "/placeholder.svg",
    coverLetterUrl: "",
    avatar: "/placeholder.svg",
    skills: ["User Research", "Wireframing", "Prototyping", "UI Design"],
    experience: "6 years",
    education: "Bachelor's Degree in Design",
    notes: "Creative UX designer with a strong portfolio.",
    lastUpdated: "2023-03-20",
    interviews: [],
    feedback: null
  },
  {
    id: "6",
    name: "Sarah Kim",
    email: "sarah.k@example.com",
    phone: "444-555-6666",
    location: "Seattle, WA",
    role: "QA Engineer",
    status: "Screen",
    appliedDate: "2023-02-20",
    source: "Glassdoor",
    resumeUrl: "/placeholder.svg",
    coverLetterUrl: "",
    avatar: "/placeholder.svg",
    skills: ["Test Automation", "Manual Testing", "Bug Tracking", "Agile"],
    experience: "3 years",
    education: "Associate's Degree in Computer Science",
    notes: "Detail-oriented QA engineer with experience in test automation.",
    lastUpdated: "2023-03-25",
    interviews: [],
    feedback: null
  },
  {
    id: "7",
    name: "Michael Chen",
    email: "michael.c@example.com",
    phone: "222-333-4444",
    location: "Austin, TX",
    role: "DevOps Engineer",
    status: "Interview",
    appliedDate: "2023-01-01",
    source: "Stack Overflow",
    resumeUrl: "/placeholder.svg",
    coverLetterUrl: "",
    avatar: "/placeholder.svg",
    skills: ["AWS", "Docker", "Kubernetes", "CI/CD"],
    experience: "5 years",
    education: "Bachelor's Degree in Information Technology",
    notes: "Experienced DevOps engineer with strong cloud skills.",
    lastUpdated: "2023-03-30",
    interviews: [],
    feedback: null
  },
  {
    id: "8",
    name: "Linda Nguyen",
    email: "linda.n@example.com",
    phone: "666-777-8888",
    location: "Boston, MA",
    role: "Business Analyst",
    status: "Offer",
    appliedDate: "2022-10-01",
    source: "LinkedIn",
    resumeUrl: "/placeholder.svg",
    coverLetterUrl: "",
    avatar: "/placeholder.svg",
    skills: ["Data Analysis", "Requirements Gathering", "Process Improvement", "SQL"],
    experience: "7 years",
    education: "Master's Degree in Business Analytics",
    notes: "Experienced business analyst with strong analytical skills.",
    lastUpdated: "2023-04-01",
    interviews: [],
    feedback: null
  },
  {
    id: "9",
    name: "Kevin Patel",
    email: "kevin.p@example.com",
    phone: "888-999-0000",
    location: "Miami, FL",
    role: "Marketing Manager",
    status: "Hired",
    appliedDate: "2023-03-01",
    source: "Company Website",
    resumeUrl: "/placeholder.svg",
    coverLetterUrl: "",
    avatar: "/placeholder.svg",
    skills: ["Digital Marketing", "Social Media", "SEO", "Content Marketing"],
    experience: "4 years",
    education: "Bachelor's Degree in Marketing",
    notes: "Creative marketing manager with experience in digital marketing.",
    lastUpdated: "2023-04-05",
    interviews: [],
    feedback: null
  },
  {
    id: "10",
    name: "Jessica Garcia",
    email: "jessica.g@example.com",
    phone: "999-000-1111",
    location: "Denver, CO",
    role: "Sales Representative",
    status: "Rejected",
    appliedDate: "2022-09-01",
    source: "Indeed",
    resumeUrl: "/placeholder.svg",
    coverLetterUrl: "",
    avatar: "/placeholder.svg",
    skills: ["Sales", "Customer Service", "Communication", "Negotiation"],
    experience: "6 years",
    education: "Associate's Degree in Business Administration",
    notes: "Experienced sales representative with strong communication skills.",
    lastUpdated: "2023-04-10",
    interviews: [],
    feedback: null
  }
];

// Mock user data
const users: User[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
    permissions: {
      canViewCandidates: true,
      canEditCandidates: true,
      canDeleteCandidates: true,
      canViewJobs: true,
      canEditJobs: true,
      canDeleteJobs: true,
      canScheduleInterviews: true,
      canViewReports: true,
      canEditReports: true,
      canDeleteReports: true,
      canManageUsers: true
    }
  },
  {
    id: "2",
    name: "Manager User",
    email: "manager@example.com",
    role: "manager",
    permissions: {
      canViewCandidates: true,
      canEditCandidates: true,
      canDeleteCandidates: false,
      canViewJobs: true,
      canEditJobs: true,
      canDeleteJobs: false,
      canScheduleInterviews: true,
      canViewReports: true,
      canEditReports: false,
      canDeleteReports: false,
      canManageUsers: false
    }
  },
  {
    id: "3",
    name: "Regular User",
    email: "user@example.com",
    role: "user",
    permissions: {
      canViewCandidates: true,
      canEditCandidates: false,
      canDeleteCandidates: false,
      canViewJobs: true,
      canEditJobs: false,
      canDeleteJobs: false,
      canScheduleInterviews: false,
      canViewReports: false,
      canEditReports: false,
      canDeleteReports: false,
      canManageUsers: false
    }
  }
];

// Mock interview data
const interviews: Interview[] = [
  {
    id: "101",
    date: "2023-05-01",
    type: "Technical Interview",
    notes: "Discussed React and JavaScript concepts.",
    candidateId: "1"
  },
  {
    id: "102",
    date: "2023-05-03",
    type: "Behavioral Interview",
    notes: "Discussed team work and problem-solving skills.",
    candidateId: "2"
  },
  {
    id: "103",
    date: "2023-05-05",
    type: "Final Interview",
    notes: "Final discussion before making an offer.",
    candidateId: "3"
  }
];

// Add this patch to fix the TypeScript error in AddCandidateForm
export const createCandidate = (candidateData: Omit<Partial<Candidate>, "id">): Candidate => {
  const id = uuidv4();
  
  // Provide default values for required fields to fix TypeScript errors
  const defaultCandidate: Omit<Candidate, "id"> = {
    name: "New Candidate",
    email: "candidate@example.com",
    phone: "",
    location: "",
    role: "Frontend Developer",
    status: "Applied",
    appliedDate: new Date().toISOString().split('T')[0],
    source: "Website",
    resumeUrl: "/placeholder.svg",
    coverLetterUrl: "",
    avatar: "/placeholder.svg",
    skills: [],
    experience: "",
    education: "",
    notes: "",
    lastUpdated: new Date().toISOString(),
    interviews: [],
    feedback: null
  };
  
  // Create new candidate with defaults and override with provided data
  return {
    id,
    ...defaultCandidate,
    ...candidateData
  };
};

export const createUser = (userData: Omit<User, "id">): User => {
  const id = uuidv4();
  return {
    id,
    ...userData
  };
};
