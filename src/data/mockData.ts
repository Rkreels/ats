import { Candidate, Interview, Job, TimeToHireData, DiversityData } from "@/types";

const firstNames = ["Alice", "Bob", "Charlie", "David", "Emily", "Finn", "Grace", "Harry", "Ivy", "Jack", "Chloe", "Liam", "Mia", "Noah", "Olivia", "Owen", "Sophia", "William", "Ava", "James"];
const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "White"];
const jobTitles = ["Software Engineer", "Product Manager", "UX Designer", "Data Scientist", "Marketing Manager", "Sales Representative", "HR Manager", "Financial Analyst", "Project Manager", "Business Analyst"];
const departments = ["Engineering", "Product", "Design", "Data Science", "Marketing", "Sales", "Human Resources", "Finance", "Operations"];
const cities = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Jose"];
const jobTypes = ["Full-time", "Part-time", "Contract", "Temporary", "Internship"];
const skillsList = ["JavaScript", "React", "Node.js", "Python", "SQL", "HTML", "CSS", "Java", "C++", "C#", "AWS", "Azure", "GCP", "Docker", "Kubernetes", "Git", "Agile", "Scrum", "Leadership", "Communication"];
const educationLevels = ["Bachelor's Degree", "Master's Degree", "PhD", "Associate's Degree", "High School Diploma"];
const sources = ["LinkedIn", "Indeed", "Glassdoor", "Company Website", "Referral", "University Career Fair"];

type CandidateStatus = "Applied" | "Screen" | "Interview" | "Offer" | "Hired" | "Rejected";
type JobStatus = "Draft" | "Pending Approval" | "Published" | "Closed" | "On Hold";

const getRandomCandidateStatus = (): CandidateStatus => {
  const statuses: CandidateStatus[] = ["Applied", "Screen", "Interview", "Offer", "Hired", "Rejected"];
  return statuses[Math.floor(Math.random() * statuses.length)];
};

const getRandomJobStatus = (): JobStatus => {
  const statuses: JobStatus[] = ["Draft", "Pending Approval", "Published", "Closed", "On Hold"];
  return statuses[Math.floor(Math.random() * statuses.length)];
};

const getRandomSkills = (): string[] => {
  const numSkills = Math.floor(Math.random() * 5) + 3;
  const skills: string[] = [];
  for (let i = 0; i < numSkills; i++) {
    skills.push(skillsList[Math.floor(Math.random() * skillsList.length)]);
  }
  return [...new Set(skills)];
};

const getRandomPastDate = (): string => {
  const now = new Date();
  const past = new Date(now.getTime() - Math.random() * 30 * 24 * 60 * 60 * 1000);
  return past.toLocaleDateString();
};

const getRandomFutureDate = (): string => {
  const now = new Date();
  const future = new Date(now.getTime() + Math.random() * 30 * 24 * 60 * 60 * 1000);
  return future.toLocaleDateString();
};

const getRandomNote = (): string => {
  const notes = [
    "Promising candidate with relevant experience.",
    "Needs further screening to assess technical skills.",
    "Strong communication skills, good cultural fit.",
    "Potential for growth within the company.",
    "Expressed interest in learning new technologies."
  ];
  return notes[Math.floor(Math.random() * notes.length)];
};

const getRandomFeedback = (): string => {
  const feedback = [
    "Excellent technical skills, strong problem-solving abilities.",
    "Good understanding of product development lifecycle.",
    "Demonstrated leadership qualities, effective team player.",
    "Needs improvement in time management and prioritization.",
    "Overall, a highly qualified candidate with great potential."
  ];
  return feedback[Math.floor(Math.random() * feedback.length)];
};

const getRandomInterviews = (): Interview[] => {
  const numInterviews = Math.floor(Math.random() * 3);
  const interviews: Interview[] = [];
  for (let i = 0; i < numInterviews; i++) {
    interviews.push({
      id: `i-${i + 1}`,
      candidateId: `c-${Math.floor(Math.random() * 20) + 1}`,
      interviewerId: `e-${Math.floor(Math.random() * 10) + 1}`,
      interviewerName: `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
      date: getRandomFutureDate(),
      time: `${Math.floor(Math.random() * 12) + 8}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')} AM`,
      duration: `${Math.floor(Math.random() * 60) + 30} minutes`,
      type: ["Phone", "Video", "In-person"][Math.floor(Math.random() * 3)] as "Phone" | "Video" | "In-person",
      status: ["Scheduled", "Completed", "Canceled"][Math.floor(Math.random() * 3)] as "Scheduled" | "Completed" | "Canceled",
      feedback: Math.random() > 0.5 ? getRandomFeedback() : null,
      notes: Math.random() > 0.3 ? getRandomNote() : ""
    });
  }
  return interviews;
};

const getRandomJobDescription = (): string => {
  const descriptions = [
    "We are looking for a skilled software engineer to join our team. The ideal candidate will have experience in developing and maintaining web applications.",
    "We are seeking a product manager to lead the development of our next-generation products. The ideal candidate will have a strong understanding of customer needs and market trends.",
    "We are hiring a UX designer to create intuitive and engaging user interfaces for our products. The ideal candidate will have a passion for user-centered design.",
    "We are seeking a data scientist to analyze large datasets and develop insights to improve our business. The ideal candidate will have a strong background in statistics and machine learning.",
    "We are hiring a marketing manager to develop and execute marketing campaigns to promote our products. The ideal candidate will have experience in digital marketing and social media."
  ];
  return descriptions[Math.floor(Math.random() * descriptions.length)];
};

const getRandomResponsibilities = (): string[] => {
  const responsibilities = [
    "Develop and maintain web applications",
    "Lead the development of new products",
    "Create intuitive and engaging user interfaces",
    "Analyze large datasets and develop insights",
    "Develop and execute marketing campaigns",
    "Manage a team of software engineers",
    "Conduct user research and usability testing",
    "Develop and implement data-driven strategies",
    "Manage social media accounts",
    "Collaborate with cross-functional teams"
  ];
  const numResponsibilities = Math.floor(Math.random() * 5) + 3;
  const selectedResponsibilities: string[] = [];
  for (let i = 0; i < numResponsibilities; i++) {
    selectedResponsibilities.push(responsibilities[Math.floor(Math.random() * responsibilities.length)]);
  }
  return [...new Set(selectedResponsibilities)];
};

const getRandomRequirements = (): string[] => {
  const requirements = [
    "Bachelor's degree in computer science or related field",
    "3+ years of experience in software development",
    "Experience with React, Node.js, and SQL",
    "Strong understanding of product development lifecycle",
    "Experience with user-centered design principles",
    "Strong background in statistics and machine learning",
    "Experience with digital marketing and social media",
    "Excellent communication and collaboration skills",
    "Ability to work independently and as part of a team",
    "Passion for learning new technologies"
  ];
  const numRequirements = Math.floor(Math.random() * 5) + 3;
  const selectedRequirements: string[] = [];
  for (let i = 0; i < numRequirements; i++) {
    selectedRequirements.push(requirements[Math.floor(Math.random() * requirements.length)]);
  }
  return [...new Set(selectedRequirements)];
};

const candidates: Candidate[] = Array.from({ length: 20 }, (_, i) => ({
  id: `c-${i + 1}`,
  name: `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
  role: jobTitles[Math.floor(Math.random() * jobTitles.length)],
  email: `candidate${i + 1}@example.com`,
  phone: `(${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
  location: cities[Math.floor(Math.random() * cities.length)],
  experience: Math.floor(Math.random() * 15) + 1,
  skills: getRandomSkills(),
  education: educationLevels[Math.floor(Math.random() * educationLevels.length)],
  source: sources[Math.floor(Math.random() * sources.length)],
  salary: `$${(Math.floor(Math.random() * 150) + 50)}k`,
  status: getRandomCandidateStatus(),
  appliedDate: getRandomPastDate(),
  resumeUrl: `https://example.com/resumes/resume-${i + 1}.pdf`,
  coverLetterUrl: Math.random() > 0.5 ? `https://example.com/cover-letters/cover-${i + 1}.pdf` : null,
  notes: Math.random() > 0.3 ? getRandomNote() : "",
  feedback: Math.random() > 0.5 ? getRandomFeedback() : null,
  avatar: `https://i.pravatar.cc/150?img=${i + 10}`,
  lastUpdated: getRandomPastDate(),
  interviews: getRandomInterviews(),
}));

const jobs: Job[] = Array.from({ length: 12 }, (_, i) => ({
  id: `j-${i + 1}`,
  title: jobTitles[Math.floor(Math.random() * jobTitles.length)],
  department: departments[Math.floor(Math.random() * departments.length)],
  location: cities[Math.floor(Math.random() * cities.length)],
  type: jobTypes[Math.floor(Math.random() * jobTypes.length)] as "Full-time" | "Part-time" | "Contract" | "Temporary" | "Internship",
  description: getRandomJobDescription(),
  responsibilities: getRandomResponsibilities(),
  requirements: getRandomRequirements(),
  postedDate: getRandomPastDate(),
  closingDate: getRandomFutureDate(),
  salary: `$${(Math.floor(Math.random() * 150) + 50)}k - $${(Math.floor(Math.random() * 50) + 60) + (Math.floor(Math.random() * 150) + 50)}k`,
  status: getRandomJobStatus(),
  hiringManager: `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
  applicants: Math.floor(Math.random() * 100) + 5,
  skills: getRandomSkills(),
}));

const timeToHireData: TimeToHireData[] = [
  { month: "Jan", Engineering: 35, Product: 30, Marketing: 25, Sales: 40 },
  { month: "Feb", Engineering: 32, Product: 28, Marketing: 22, Sales: 38 },
  { month: "Mar", Engineering: 38, Product: 32, Marketing: 28, Sales: 42 },
  { month: "Apr", Engineering: 40, Product: 35, Marketing: 30, Sales: 45 },
  { month: "May", Engineering: 42, Product: 38, Marketing: 32, Sales: 48 }
];

const diversityData: DiversityData = {
  gender: {
    Male: 55,
    Female: 40,
    "Non-binary": 3,
    "Prefer not to say": 2
  },
  ethnicity: {
    White: 60,
    "Black or African American": 15,
    Asian: 12,
    Hispanic: 8,
    "Two or more races": 3,
    "Other/Unknown": 2
  },
  hiringSource: {
    LinkedIn: 40,
    "Job Boards": 25,
    "Company Website": 15,
    Referrals: 10,
    "University Recruiting": 5,
    Other: 5
  }
};

export const mockDataService = {
  getAllCandidates: (): Candidate[] => candidates,
  getCandidateById: (id: string): Candidate | undefined => candidates.find(c => c.id === id),
  getAllJobs: (): Job[] => jobs,
  getJobById: (id: string): Job | undefined => jobs.find(j => j.id === id),
  getTimeToHireData: (): TimeToHireData[] => timeToHireData,
  getDiversityData: (): DiversityData => diversityData,
  generateMoreCandidates: (num: number): void => {
    for (let i = 0; i < num; i++) {
      const newId = `c-${candidates.length + i + 1}`;
      candidates.push({
        id: newId,
        name: `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
        role: jobTitles[Math.floor(Math.random() * jobTitles.length)],
        email: `candidate${candidates.length + i + 1}@example.com`,
        phone: `(${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
        location: cities[Math.floor(Math.random() * cities.length)],
        experience: Math.floor(Math.random() * 15) + 1,
        skills: getRandomSkills(),
        education: educationLevels[Math.floor(Math.random() * educationLevels.length)],
        source: sources[Math.floor(Math.random() * sources.length)],
        salary: `$${(Math.floor(Math.random() * 150) + 50)}k`,
        status: getRandomCandidateStatus(),
        appliedDate: getRandomPastDate(),
        resumeUrl: `https://example.com/resumes/resume-${candidates.length + i + 1}.pdf`,
        coverLetterUrl: Math.random() > 0.5 ? `https://example.com/cover-letters/cover-${candidates.length + i + 1}.pdf` : null,
        notes: Math.random() > 0.3 ? getRandomNote() : "",
        feedback: Math.random() > 0.5 ? getRandomFeedback() : null,
        avatar: `https://i.pravatar.cc/150?img=${candidates.length + i + 10}`,
        lastUpdated: getRandomPastDate(),
        interviews: getRandomInterviews(),
      });
    }
  }
};
