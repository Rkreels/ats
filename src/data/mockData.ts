import { Candidate, Job, TimeToHireData, DiversityData, Interview } from "@/types";
import { v4 as uuidv4 } from 'uuid';

// Sample candidates
const candidates: Candidate[] = [
  {
    id: "c1",
    name: "Alex Johnson",
    role: "Frontend Developer",
    email: "alex.johnson@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    experience: 5,
    skills: ["React", "TypeScript", "CSS", "HTML", "JavaScript"],
    education: "BS Computer Science, Stanford University",
    source: "LinkedIn",
    salary: "$120,000 - $140,000",
    status: "Interview",
    appliedDate: "2023-04-15",
    resumeUrl: "#",
    coverLetterUrl: "#",
    notes: "Strong frontend skills, good cultural fit. Enthusiastic about our product.",
    feedback: "Performed well in technical interview. Team recommended moving forward.",
    avatar: "https://i.pravatar.cc/150?img=1",
    lastUpdated: "2023-04-20",
    interviews: [
      {
        id: "i1",
        candidateId: "c1",
        interviewerId: "e1",
        interviewerName: "Sarah Chen",
        date: "2023-04-25",
        time: "2:00 PM",
        duration: "45 minutes",
        type: "Video",
        status: "Scheduled",
      }
    ]
  },
  {
    id: "c2",
    name: "Emily White",
    role: "Backend Developer",
    email: "emily.white@example.com",
    phone: "+1 (555) 234-5678",
    location: "New York, NY",
    experience: 3,
    skills: ["Node.js", "Express", "PostgreSQL", "JavaScript"],
    education: "MS Computer Science, MIT",
    source: "Indeed",
    salary: "$110,000 - $130,000",
    status: "Offer",
    appliedDate: "2023-03-01",
    resumeUrl: "#",
    coverLetterUrl: "#",
    notes: "Solid backend skills, experience with large-scale systems.",
    feedback: "Excellent problem-solving skills. Strong understanding of system architecture.",
    avatar: "https://i.pravatar.cc/150?img=2",
    lastUpdated: "2023-03-15",
    interviews: [
      {
        id: "i2",
        candidateId: "c2",
        interviewerId: "e2",
        interviewerName: "David Lee",
        date: "2023-03-10",
        time: "10:00 AM",
        duration: "60 minutes",
        type: "In-person",
        status: "Completed",
        feedback: "Candidate demonstrated strong technical abilities and a good understanding of backend development principles."
      }
    ]
  },
  {
    id: "c3",
    name: "Carlos Rodriguez",
    role: "Data Scientist",
    email: "carlos.rodriguez@example.com",
    phone: "+1 (555) 345-6789",
    location: "Chicago, IL",
    experience: 7,
    skills: ["Python", "Machine Learning", "Data Analysis", "SQL"],
    education: "PhD Statistics, University of Chicago",
    source: "Referral",
    salary: "$140,000 - $160,000",
    status: "Hired",
    appliedDate: "2022-11-01",
    resumeUrl: "#",
    coverLetterUrl: "#",
    notes: "Expert in machine learning, extensive research experience.",
    feedback: "Exceptional analytical skills. Published several papers in top journals.",
    avatar: "https://i.pravatar.cc/150?img=3",
    lastUpdated: "2022-12-01",
    interviews: [
      {
        id: "i3",
        candidateId: "c3",
        interviewerId: "e3",
        interviewerName: "Linda Brown",
        date: "2022-11-15",
        time: "1:00 PM",
        duration: "75 minutes",
        type: "Video",
        status: "Completed",
        feedback: "Candidate's expertise in machine learning and data analysis was evident. A strong addition to the team."
      }
    ]
  },
  {
    id: "c4",
    name: "Priya Sharma",
    role: "Product Manager",
    email: "priya.sharma@example.com",
    phone: "+1 (555) 456-7890",
    location: "Seattle, WA",
    experience: 4,
    skills: ["Product Strategy", "Market Analysis", "Agile", "User Experience"],
    education: "MBA, Harvard Business School",
    source: "LinkedIn",
    salary: "$130,000 - $150,000",
    status: "Rejected",
    appliedDate: "2023-01-15",
    resumeUrl: "#",
    coverLetterUrl: "#",
    notes: "Good understanding of product management principles, but lacks experience in our industry.",
    feedback: "Candidate's interview performance was satisfactory, but other candidates had more relevant experience.",
    avatar: "https://i.pravatar.cc/150?img=4",
    lastUpdated: "2023-02-01",
    interviews: [
      {
        id: "i4",
        candidateId: "c4",
        interviewerId: "e4",
        interviewerName: "Michael Green",
        date: "2023-01-25",
        time: "3:00 PM",
        duration: "60 minutes",
        type: "Video",
        status: "Completed",
        feedback: "Candidate displayed a solid understanding of product management concepts but lacked specific experience in our target market."
      }
    ]
  },
  {
    id: "c5",
    name: "David Kim",
    role: "Software Engineer",
    email: "david.kim@example.com",
    phone: "+1 (555) 567-8901",
    location: "Austin, TX",
    experience: 2,
    skills: ["Java", "Spring", "RESTful APIs", "SQL"],
    education: "BS Computer Engineering, UT Austin",
    source: "Company Website",
    salary: "$100,000 - $120,000",
    status: "Applied",
    appliedDate: "2023-05-01",
    resumeUrl: "#",
    coverLetterUrl: "#",
    notes: "Recent graduate, eager to learn. Some internship experience.",
    feedback: null,
    avatar: "https://i.pravatar.cc/150?img=5",
    lastUpdated: "2023-05-05",
    interviews: []
  },
  {
    id: "c6",
    name: "Laura Smith",
    role: "UX Designer",
    email: "laura.smith@example.com",
    phone: "+1 (555) 678-9012",
    location: "Los Angeles, CA",
    experience: 6,
    skills: ["User Research", "Wireframing", "Prototyping", "UI Design"],
    education: "MFA Design, UCLA",
    source: "Behance",
    salary: "$120,000 - $140,000",
    status: "Screen",
    appliedDate: "2023-02-15",
    resumeUrl: "#",
    coverLetterUrl: "#",
    notes: "Creative designer, strong portfolio. Needs to improve communication skills.",
    feedback: null,
    avatar: "https://i.pravatar.cc/150?img=6",
    lastUpdated: "2023-02-28",
    interviews: []
  },
  {
    id: "c7",
    name: "Kevin Brown",
    role: "Technical Lead",
    email: "kevin.brown@example.com",
    phone: "+1 (555) 789-0123",
    location: "Denver, CO",
    experience: 8,
    skills: ["Leadership", "System Design", "Cloud Computing", "Agile"],
    education: "BS Electrical Engineering, CU Boulder",
    source: "Referral",
    salary: "$150,000 - $170,000",
    status: "Interview",
    appliedDate: "2022-12-01",
    resumeUrl: "#",
    coverLetterUrl: "#",
    notes: "Experienced leader, deep technical knowledge. Excellent communication skills.",
    feedback: null,
    avatar: "https://i.pravatar.cc/150?img=7",
    lastUpdated: "2022-12-15",
    interviews: []
  },
  {
    id: "c8",
    name: "Ashley Taylor",
    role: "Marketing Manager",
    email: "ashley.taylor@example.com",
    phone: "+1 (555) 890-1234",
    location: "Miami, FL",
    experience: 5,
    skills: ["Digital Marketing", "Social Media", "SEO", "Content Strategy"],
    education: "BA Marketing, University of Florida",
    source: "LinkedIn",
    salary: "$110,000 - $130,000",
    status: "Offer",
    appliedDate: "2023-03-15",
    resumeUrl: "#",
    coverLetterUrl: "#",
    notes: "Creative marketer, data-driven approach. Strong communication skills.",
    feedback: null,
    avatar: "https://i.pravatar.cc/150?img=8",
    lastUpdated: "2023-03-30",
    interviews: []
  },
  {
    id: "c9",
    name: "Ryan Garcia",
    role: "Financial Analyst",
    email: "ryan.garcia@example.com",
    phone: "+1 (555) 901-2345",
    location: "Houston, TX",
    experience: 3,
    skills: ["Financial Modeling", "Data Analysis", "Accounting", "Excel"],
    education: "MS Finance, Rice University",
    source: "Indeed",
    salary: "$90,000 - $110,000",
    status: "Hired",
    appliedDate: "2023-01-01",
    resumeUrl: "#",
    coverLetterUrl: "#",
    notes: "Detail-oriented analyst, strong financial acumen. Excellent analytical skills.",
    feedback: null,
    avatar: "https://i.pravatar.cc/150?img=9",
    lastUpdated: "2023-01-15",
    interviews: []
  },
  {
    id: "c10",
    name: "Jessica Martinez",
    role: "HR Manager",
    email: "jessica.martinez@example.com",
    phone: "+1 (555) 012-3456",
    location: "Phoenix, AZ",
    experience: 7,
    skills: ["HR Management", "Employee Relations", "Recruiting", "Compensation"],
    education: "BA Human Resources, ASU",
    source: "Company Website",
    salary: "$120,000 - $140,000",
    status: "Rejected",
    appliedDate: "2022-11-15",
    resumeUrl: "#",
    coverLetterUrl: "#",
    notes: "Experienced HR professional, good understanding of employment law. Strong communication skills.",
    feedback: null,
    avatar: "https://i.pravatar.cc/150?img=10",
    lastUpdated: "2022-11-30",
    interviews: []
  }
];

// Sample jobs
const jobs: Job[] = [
  {
    id: "j1",
    title: "Senior Frontend Developer",
    department: "Engineering",
    location: "San Francisco, CA",
    type: "Full-time",
    description: "We are looking for an experienced frontend developer to join our team...",
    responsibilities: [
      "Develop new user-facing features",
      "Build reusable components and libraries",
      "Translate designs into high-quality code",
    ],
    requirements: [
      "3+ years experience with React",
      "Strong proficiency in JavaScript and TypeScript",
      "Experience with responsive design",
    ],
    postedDate: "2023-04-01",
    closingDate: "2023-05-01",
    salary: "$120,000 - $150,000",
    status: "Published",
    hiringManager: "Sarah Chen",
    applicants: 12,
    skills: ["React", "TypeScript", "CSS", "HTML", "JavaScript"],
  },
  {
    id: "j2",
    title: "Backend Developer",
    department: "Engineering",
    location: "New York, NY",
    type: "Full-time",
    description: "We are seeking a skilled backend developer to build and maintain our server-side logic...",
    responsibilities: [
      "Design and implement RESTful APIs",
      "Write efficient and scalable code",
      "Work with databases and cloud services",
    ],
    requirements: [
      "2+ years experience with Node.js",
      "Proficiency in JavaScript and SQL",
      "Experience with cloud platforms like AWS or Azure",
    ],
    postedDate: "2023-04-15",
    closingDate: "2023-05-15",
    salary: "$110,000 - $140,000",
    status: "Published",
    hiringManager: "David Lee",
    applicants: 8,
    skills: ["Node.js", "JavaScript", "SQL", "AWS", "Azure"],
  },
  {
    id: "j3",
    title: "Data Scientist",
    department: "Data Science",
    location: "Chicago, IL",
    type: "Full-time",
    description: "We are looking for a data scientist to analyze large datasets and build machine learning models...",
    responsibilities: [
      "Collect and analyze data from various sources",
      "Develop and implement machine learning algorithms",
      "Communicate findings to stakeholders",
    ],
    requirements: [
      "3+ years experience with Python",
      "Strong knowledge of machine learning techniques",
      "Experience with data visualization tools",
    ],
    postedDate: "2023-05-01",
    closingDate: "2023-06-01",
    salary: "$130,000 - $160,000",
    status: "Published",
    hiringManager: "Linda Brown",
    applicants: 5,
    skills: ["Python", "Machine Learning", "Data Analysis", "SQL"],
  },
  {
    id: "j4",
    title: "Product Manager",
    department: "Product",
    location: "Seattle, WA",
    type: "Full-time",
    description: "We are seeking a product manager to define and execute our product strategy...",
    responsibilities: [
      "Conduct market research and competitive analysis",
      "Define product requirements and specifications",
      "Work with engineering and design teams to deliver products",
    ],
    requirements: [
      "2+ years experience with product management",
      "Strong analytical and problem-solving skills",
      "Excellent communication and interpersonal skills",
    ],
    postedDate: "2023-05-15",
    closingDate: "2023-06-15",
    salary: "$120,000 - $150,000",
    status: "Published",
    hiringManager: "Michael Green",
    applicants: 10,
    skills: ["Product Strategy", "Market Analysis", "Agile", "User Experience"],
  },
  {
    id: "j5",
    title: "Software Engineer",
    department: "Engineering",
    location: "Austin, TX",
    type: "Full-time",
    description: "Entry-level software engineer to develop and maintain software applications...",
    responsibilities: [
      "Write clean and efficient code",
      "Participate in code reviews",
      "Work with senior engineers to design solutions",
    ],
    requirements: [
      "Bachelor's degree in Computer Science",
      "Proficiency in Java or C++",
      "Knowledge of data structures and algorithms",
    ],
    postedDate: "2023-06-01",
    closingDate: "2023-07-01",
    salary: "$80,000 - $100,000",
    status: "Published",
    hiringManager: "Sarah Chen",
    applicants: 15,
    skills: ["Java", "C++", "Data Structures", "Algorithms"],
  }
];

// Sample time to hire data for reports
const timeToHireData: TimeToHireData[] = [
  {
    month: "Jan",
    Engineering: 32,
    Product: 28,
    Marketing: 25,
    Sales: 20,
  },
  {
    month: "Feb",
    Engineering: 30,
    Product: 26,
    Marketing: 23,
    Sales: 22,
  },
  {
    month: "Mar",
    Engineering: 35,
    Product: 30,
    Marketing: 27,
    Sales: 24,
  },
  {
    month: "Apr",
    Engineering: 33,
    Product: 29,
    Marketing: 26,
    Sales: 21,
  },
  {
    month: "May",
    Engineering: 31,
    Product: 27,
    Marketing: 24,
    Sales: 23,
  },
  {
    month: "Jun",
    Engineering: 34,
    Product: 28,
    Marketing: 25,
    Sales: 19,
  }
];

// Sample diversity data for reports
const diversityData: DiversityData = {
  gender: {
    Male: 45,
    Female: 40,
    "Non-binary": 10,
    "Prefer not to say": 5,
  },
  ethnicity: {
    White: 50,
    "Black or African American": 15,
    Asian: 20,
    Hispanic: 10,
    "Two or more races": 3,
    "Other/Unknown": 2,
  },
  hiringSource: {
    LinkedIn: 35,
    "Job Boards": 25,
    "Company Website": 20,
    Referrals: 15,
    "University Recruiting": 3,
    Other: 2,
  },
};

export const mockDataService = {
  getAllCandidates: () => [...candidates],
  getCandidateById: (id: string) => {
    return candidates.find((candidate) => candidate.id === id) as Candidate;
  },
  getAllJobs: () => [...jobs],
  getJobById: (id: string) => {
    return jobs.find((job) => job.id === id) as Job;
  },
  getTimeToHireData: () => [...timeToHireData],
  getDiversityData: () => diversityData,
  generateMoreCandidates: (num: number) => {
    // This would generate more mock candidates
  },
  updateCandidate: (updatedCandidate: Candidate) => {
    const index = candidates.findIndex(c => c.id === updatedCandidate.id);
    if (index !== -1) {
      candidates[index] = updatedCandidate;
    }
    return updatedCandidate;
  },
  addCandidate: (newCandidate: Omit<Candidate, 'id'>) => {
    const candidateWithId = {
      ...newCandidate,
      id: uuidv4(),
    };
    candidates.push(candidateWithId as Candidate);
    return candidateWithId;
  }
};
