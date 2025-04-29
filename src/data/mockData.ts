import { v4 as uuidv4 } from 'uuid';
import { Candidate, Interview, TimeToHireData, DiversityData, Job, User } from '@/types';

// Mock data service
export const mockDataService = {
  getAllCandidates: (): Candidate[] => candidates,
  getCandidate: (id: string): Candidate | undefined => candidates.find(c => c.id === id),
  getAllUsers: (): User[] => users,
  getUser: (id: string): User | undefined => users.find(u => u.id === id),
  getAllInterviews: (): Interview[] => interviews,
  getInterview: (id: string): Interview | undefined => interviews.find(i => i.id === id),
  getAllJobs: (): Job[] => jobs,
  getTimeToHireData: (): TimeToHireData[] => timeToHireData,
  getDiversityData: (): DiversityData => diversityData,
  updateCandidate: (candidate: Candidate): Candidate => {
    const index = candidates.findIndex(c => c.id === candidate.id);
    if (index !== -1) {
      candidates[index] = candidate;
    }
    return candidate;
  },
  addCandidate: (candidate: Omit<Candidate, "id">): Candidate => {
    const newCandidate = createCandidate(candidate);
    candidates.push(newCandidate);
    return newCandidate;
  }
};

// Time to Hire mock data
const timeToHireData: TimeToHireData[] = [
  { month: "Jan", Engineering: 45, Product: 32, Marketing: 28, Sales: 25 },
  { month: "Feb", Engineering: 42, Product: 30, Marketing: 26, Sales: 22 },
  { month: "Mar", Engineering: 38, Product: 29, Marketing: 25, Sales: 24 },
  { month: "Apr", Engineering: 35, Product: 28, Marketing: 24, Sales: 21 },
  { month: "May", Engineering: 32, Product: 26, Marketing: 22, Sales: 20 },
  { month: "Jun", Engineering: 30, Product: 25, Marketing: 21, Sales: 19 }
];

// Diversity data mock
const diversityData: DiversityData = {
  gender: {
    "Male": 55,
    "Female": 40,
    "Non-binary": 3,
    "Prefer not to say": 2
  },
  ethnicity: {
    "White": 45,
    "Black or African American": 20,
    "Asian": 15,
    "Hispanic": 12,
    "Two or more races": 5,
    "Other/Unknown": 3
  },
  hiringSource: {
    "LinkedIn": 35,
    "Job Boards": 25,
    "Company Website": 15,
    "Referrals": 20,
    "University Recruiting": 3,
    "Other": 2
  }
};

// Mock job data
const jobs: Job[] = [
  {
    id: "1",
    title: "Frontend Developer",
    department: "Engineering",
    location: "New York, NY",
    type: "Full-time",
    description: "We are looking for a Frontend Developer to join our team.",
    responsibilities: [
      "Develop new user-facing features",
      "Build reusable code and libraries for future use",
      "Ensure the technical feasibility of UI/UX designs",
      "Optimize applications for maximum speed and scalability"
    ],
    requirements: [
      "Strong proficiency in JavaScript, including DOM manipulation and the JavaScript object model",
      "Thorough understanding of React.js and its core principles",
      "Experience with popular React.js workflows (such as Flux or Redux)",
      "Familiarity with newer specifications of ECMAScript"
    ],
    postedDate: "2023-01-01",
    closingDate: "2023-03-01",
    salary: "$100,000 - $130,000",
    status: "Published",
    hiringManager: "John Doe",
    applicants: 15,
    skills: ["React", "JavaScript", "HTML", "CSS"]
  },
  {
    id: "2",
    title: "Backend Developer",
    department: "Engineering",
    location: "San Francisco, CA",
    type: "Full-time",
    description: "We are looking for a Backend Developer to join our team.",
    responsibilities: [
      "Design and implement scalable and reliable backend services",
      "Work with front-end developers to integrate user-facing elements",
      "Improve existing codebases and processes",
      "Manage the interchange of data between server and users"
    ],
    requirements: [
      "Strong proficiency in Node.js",
      "Experience with popular Node.js frameworks like Express",
      "Good understanding of server-side templating languages",
      "Basic understanding of front-end technologies"
    ],
    postedDate: "2023-01-15",
    closingDate: "2023-03-15",
    salary: "$120,000 - $150,000",
    status: "Published",
    hiringManager: "Jane Smith",
    applicants: 10,
    skills: ["Node.js", "Express", "MongoDB", "SQL"]
  },
  {
    id: "3",
    title: "Product Manager",
    department: "Product",
    location: "Chicago, IL",
    type: "Full-time",
    description: "We are looking for a Product Manager to join our team.",
    responsibilities: [
      "Define the product vision and strategy",
      "Work with engineering to deliver products",
      "Analyze market and competitive data",
      "Drive product launches"
    ],
    requirements: [
      "3+ years of product management experience",
      "Experience with agile development methodologies",
      "Excellent communication and leadership skills",
      "Technical background is a plus"
    ],
    postedDate: "2023-02-01",
    closingDate: "2023-04-01",
    salary: "$130,000 - $160,000",
    status: "Published",
    hiringManager: "Michael Johnson",
    applicants: 8,
    skills: ["Product Management", "Agile", "User Research", "Roadmapping"]
  }
];

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
    experience: 5,
    education: "Bachelor's Degree in Computer Science",
    notes: "Promising candidate with strong technical skills.",
    lastUpdated: "2023-03-01",
    interviews: [
      {
        id: "101",
        date: "2023-02-01",
        time: "10:00 AM",
        duration: "1 hour",
        type: "Phone",
        status: "Completed",
        candidateId: "1",
        interviewerId: "1",
        interviewerName: "Jane Doe",
        notes: "Discussed React and JavaScript concepts."
      }
    ],
    feedback: "Good understanding of frontend technologies.",
    salary: "$100,000 - $120,000"
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
    experience: 7,
    education: "Master's Degree in Software Engineering",
    notes: "Experienced backend developer with a strong portfolio.",
    lastUpdated: "2023-03-05",
    interviews: [
      {
        id: "102",
        date: "2023-01-10",
        time: "2:00 PM",
        duration: "45 minutes",
        type: "Video",
        status: "Completed",
        candidateId: "2",
        interviewerId: "2",
        interviewerName: "Bob Smith",
        notes: "Discussed Node.js and database design."
      }
    ],
    feedback: "Excellent technical skills and problem-solving abilities.",
    salary: "$110,000 - $130,000"
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
    experience: 4,
    education: "Bachelor's Degree in Statistics",
    notes: "Strong analytical skills and experience with machine learning.",
    lastUpdated: "2023-03-10",
    interviews: [
      {
        id: "103",
        date: "2023-03-01",
        time: "11:00 AM",
        duration: "1 hour",
        type: "In-person",
        status: "Completed",
        candidateId: "3",
        interviewerId: "3",
        interviewerName: "Alice Johnson",
        notes: "Discussed machine learning algorithms and data analysis techniques."
      }
    ],
    feedback: "Good understanding of data science concepts.",
    salary: "$95,000 - $115,000"
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
    experience: 8,
    education: "Master's Degree in Business Administration",
    notes: "Experienced project manager with strong leadership skills.",
    lastUpdated: "2023-03-15",
    interviews: [
      {
        id: "104",
        date: "2022-12-15",
        time: "3:00 PM",
        duration: "1.5 hours",
        type: "Behavioral",
        status: "Completed",
        candidateId: "4",
        interviewerId: "4",
        interviewerName: "John Smith",
        notes: "Discussed project management methodologies and leadership skills."
      }
    ],
    feedback: "Good communication skills but lacks technical expertise.",
    salary: "$120,000 - $140,000"
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
    experience: 6,
    education: "Bachelor's Degree in Design",
    notes: "Creative UX designer with a strong portfolio.",
    lastUpdated: "2023-03-20",
    interviews: [],
    feedback: null,
    salary: "$110,000 - $130,000"
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
    experience: 3,
    education: "Associate's Degree in Computer Science",
    notes: "Detail-oriented QA engineer with experience in test automation.",
    lastUpdated: "2023-03-25",
    interviews: [],
    feedback: null,
    salary: "$80,000 - $100,000"
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
    experience: 5,
    education: "Bachelor's Degree in Information Technology",
    notes: "Experienced DevOps engineer with strong cloud skills.",
    lastUpdated: "2023-03-30",
    interviews: [],
    feedback: null,
    salary: "$120,000 - $140,000"
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
    experience: 7,
    education: "Master's Degree in Business Analytics",
    notes: "Experienced business analyst with strong analytical skills.",
    lastUpdated: "2023-04-01",
    interviews: [],
    feedback: null,
    salary: "$110,000 - $130,000"
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
    experience: 4,
    education: "Bachelor's Degree in Marketing",
    notes: "Creative marketing manager with experience in digital marketing.",
    lastUpdated: "2023-04-05",
    interviews: [],
    feedback: null,
    salary: "$90,000 - $110,000"
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
    experience: 6,
    education: "Associate's Degree in Business Administration",
    notes: "Experienced sales representative with strong communication skills.",
    lastUpdated: "2023-04-10",
    interviews: [],
    feedback: null,
    salary: "$85,000 - $105,000"
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
    time: "10:00 AM",
    duration: "1 hour",
    type: "Phone",
    status: "Scheduled",
    candidateId: "1",
    interviewerId: "1",
    interviewerName: "Jane Doe",
    notes: "Discussed React and JavaScript concepts."
  },
  {
    id: "102",
    date: "2023-05-03",
    time: "2:00 PM",
    duration: "45 minutes",
    type: "Video",
    status: "Scheduled",
    candidateId: "2",
    interviewerId: "2",
    interviewerName: "Bob Smith",
    notes: "Discussed team work and problem-solving skills."
  },
  {
    id: "103",
    date: "2023-05-05",
    time: "11:00 AM",
    duration: "1 hour",
    type: "In-person",
    status: "Scheduled",
    candidateId: "3",
    interviewerId: "3",
    interviewerName: "Alice Johnson",
    notes: "Final discussion before making an offer."
  }
];

// Add this patch to fix the TypeScript error in AddCandidateForm
export const createCandidate = (candidateData: Partial<Omit<Candidate, "id">>): Candidate => {
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
    experience: 0,
    education: "",
    notes: "",
    lastUpdated: new Date().toISOString(),
    interviews: [],
    feedback: "",
    salary: ""
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
