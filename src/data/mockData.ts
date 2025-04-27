
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
  status: 'Applied' | 'Screen' | 'Interview' | 'Offer' | 'Hired' | 'Rejected';
  appliedDate: string;
  lastUpdated: string;
  avatar?: string;
  resume?: string;
  notes?: string[];
  feedback?: Feedback[];
  diversity?: {
    gender?: string;
    ethnicity?: string;
    veteranStatus?: boolean;
    disabilityStatus?: boolean;
  };
  interviews?: Interview[];
}

export interface Feedback {
  id: string;
  reviewerId: string;
  reviewerName: string;
  date: string;
  overallRating: number;
  skillRatings: {
    [key: string]: number;
  };
  strengths: string;
  weaknesses: string;
  recommendations: string;
}

export interface Interview {
  id: string;
  type: string;
  interviewerId: string;
  interviewerName: string;
  scheduledTime: string;
  duration: number; // in minutes
  status: 'Scheduled' | 'Completed' | 'Cancelled' | 'No-show';
  feedback?: string;
}

export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Temporary' | 'Internship';
  description: string;
  responsibilities: string[];
  requirements: string[];
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  status: 'Draft' | 'Pending Approval' | 'Published' | 'Closed' | 'On Hold';
  postedDate?: string;
  closingDate?: string;
  applicantCount: number;
  hiringManager: string;
  approvalWorkflow?: {
    currentStage: string;
    approvers: {
      name: string;
      role: string;
      approved: boolean;
      date?: string;
      comments?: string;
    }[];
  };
  skills: string[];
}

// Mock data generation
const generateRandomId = () => Math.random().toString(36).substring(2, 10);

const getRandomDate = (start: Date, end: Date) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString().split('T')[0];
};

const getRandomElement = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

// Mock data constants
const skills = [
  'JavaScript', 'TypeScript', 'React', 'Angular', 'Vue', 'Node.js', 'Python',
  'Java', 'C#', 'Ruby', 'SQL', 'NoSQL', 'AWS', 'Azure', 'GCP', 'Docker',
  'Kubernetes', 'CI/CD', 'GraphQL', 'REST API', 'Microservices', 'Agile',
  'Scrum', 'Project Management', 'Leadership', 'Communication', 'Problem Solving'
];

const names = [
  'John Smith', 'Sarah Johnson', 'Michael Brown', 'Jessica Davis', 'David Miller',
  'Emily Wilson', 'James Taylor', 'Emma Moore', 'Robert Anderson', 'Olivia Thomas',
  'William Jackson', 'Sofia Martinez', 'Richard White', 'Ava Thompson', 'Joseph Garcia',
  'Isabella Rodriguez', 'Charles Lewis', 'Mia Walker', 'Daniel Hall', 'Charlotte Allen',
  'Jamal Washington', 'Aisha Khan', 'Wei Chen', 'Priya Patel', 'Miguel Gonzalez',
  'Fatima Ahmed', 'Taro Tanaka', 'Zainab Ali', 'Jin Park', 'Neha Sharma'
];

const roles = [
  'Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'DevOps Engineer',
  'UI/UX Designer', 'Product Manager', 'Project Manager', 'QA Engineer', 'Data Scientist',
  'Machine Learning Engineer', 'Software Architect', 'Mobile Developer', 'IT Support',
  'Database Administrator', 'Systems Analyst', 'Network Engineer', 'Security Engineer',
  'Business Analyst', 'Technical Writer', 'Scrum Master'
];

const locations = [
  'New York, NY', 'San Francisco, CA', 'Austin, TX', 'Seattle, WA', 'Boston, MA',
  'Chicago, IL', 'Los Angeles, CA', 'Denver, CO', 'Atlanta, GA', 'Miami, FL',
  'Remote', 'Hybrid - New York', 'Hybrid - San Francisco', 'Remote - US Only'
];

const departments = [
  'Engineering', 'Product', 'Design', 'Marketing', 'Sales', 'Customer Support',
  'Human Resources', 'Finance', 'Operations', 'Research', 'Legal', 'Administration'
];

const sources = [
  'LinkedIn', 'Indeed', 'Glassdoor', 'Company Website', 'Referral', 'University Recruiting',
  'Job Fair', 'Recruiter', 'GitHub', 'StackOverflow'
];

const interviewTypes = [
  'Phone Screen', 'Technical Interview', 'System Design', 'Behavioral', 'Culture Fit',
  'Case Study', 'Pair Programming', 'Take-home Assignment', 'Final Round', 'Team Meeting'
];

const reviewers = [
  { id: 'rev1', name: 'Alex Rodriguez' },
  { id: 'rev2', name: 'Taylor Swift' },
  { id: 'rev3', name: 'Jordan Lee' },
  { id: 'rev4', name: 'Casey Morgan' },
  { id: 'rev5', name: 'Sam Patel' }
];

const statuses = ['Applied', 'Screen', 'Interview', 'Offer', 'Hired', 'Rejected'] as const;
const jobStatuses = ['Draft', 'Pending Approval', 'Published', 'Closed', 'On Hold'] as const;

// Generate mock candidates
export const generateMockCandidates = (count: number = 20): Candidate[] => {
  const today = new Date();
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(today.getFullYear() - 1);

  return Array.from({ length: count }, (_, index) => {
    const id = generateRandomId();
    const name = getRandomElement(names);
    const firstName = name.split(' ')[0].toLowerCase();
    const appliedDate = getRandomDate(oneYearAgo, today);
    const status = getRandomElement(statuses);
    const role = getRandomElement(roles);
    
    // More likely to have interviews if further along in the pipeline
    const hasInterviews = ['Screen', 'Interview', 'Offer', 'Hired'].includes(status);
    const interviewCount = hasInterviews ? Math.floor(Math.random() * 3) + 1 : 0;
    
    // More likely to have feedback if interviewed
    const hasFeedback = interviewCount > 0 && Math.random() > 0.3;
    const feedbackCount = hasFeedback ? Math.floor(Math.random() * interviewCount) + 1 : 0;
    
    const diversityData = Math.random() > 0.3 ? {
      gender: getRandomElement(['Male', 'Female', 'Non-binary', 'Prefer not to say']),
      ethnicity: getRandomElement([
        'White', 'Black', 'Hispanic/Latino', 'Asian', 'Native American', 
        'Pacific Islander', 'Two or more races', 'Prefer not to say'
      ]),
      veteranStatus: Math.random() > 0.9,
      disabilityStatus: Math.random() > 0.9
    } : undefined;
    
    return {
      id,
      name,
      role,
      email: `${firstName}${Math.floor(Math.random() * 1000)}@example.com`,
      phone: `(${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
      location: getRandomElement(locations),
      experience: Math.floor(Math.random() * 15) + 1,
      skills: Array.from(
        new Set(Array.from({ length: Math.floor(Math.random() * 5) + 3 }, () => getRandomElement(skills)))
      ),
      education: getRandomElement([
        'Bachelor\'s in Computer Science', 'Master\'s in Computer Science',
        'Bachelor\'s in Information Technology', 'Master\'s in Information Systems',
        'Bachelor\'s in Engineering', 'PhD in Computer Science',
        'Self-taught', 'Bootcamp Graduate'
      ]),
      source: getRandomElement(sources),
      salary: `$${(Math.floor(Math.random() * 100) + 70)}k - $${(Math.floor(Math.random() * 50) + 120)}k`,
      status,
      appliedDate,
      lastUpdated: getRandomDate(new Date(appliedDate), today),
      avatar: `https://i.pravatar.cc/150?u=${id}`,
      notes: Math.random() > 0.5 ? Array.from(
        { length: Math.floor(Math.random() * 3) + 1 },
        () => getRandomElement([
          'Strong technical background',
          'Great communication skills',
          'Needs more experience with system design',
          'Excellent problem-solving abilities',
          'Could improve SQL knowledge',
          'Team player with leadership qualities',
          'Consider for senior role',
          'Might be better fit for another team'
        ])
      ) : [],
      feedback: Array.from({ length: feedbackCount }, () => {
        const reviewer = getRandomElement(reviewers);
        const skillRatings: { [key: string]: number } = {};
        
        // Assign random ratings to 3-5 skills
        const candidateSkills = Array.from(
          new Set(Array.from({ length: Math.floor(Math.random() * 3) + 3 }, () => getRandomElement(skills)))
        );
        candidateSkills.forEach(skill => {
          skillRatings[skill] = Math.floor(Math.random() * 5) + 1;
        });
        
        return {
          id: generateRandomId(),
          reviewerId: reviewer.id,
          reviewerName: reviewer.name,
          date: getRandomDate(new Date(appliedDate), today),
          overallRating: Math.floor(Math.random() * 5) + 1,
          skillRatings,
          strengths: getRandomElement([
            'Strong technical skills',
            'Great communication',
            'Problem-solving abilities',
            'Team collaboration',
            'Leadership potential',
            'Creative thinking'
          ]),
          weaknesses: getRandomElement([
            'Limited experience with our tech stack',
            'Could improve system design skills',
            'Communication could be clearer',
            'Lacks depth in some technical areas',
            'Time management concerns'
          ]),
          recommendations: getRandomElement([
            'Recommend to hire',
            'Move to next round',
            'Consider for different role',
            'Not a good fit at this time'
          ])
        };
      }),
      diversity: diversityData,
      interviews: Array.from({ length: interviewCount }, () => {
        const reviewer = getRandomElement(reviewers);
        const interviewStatus = getRandomElement(['Scheduled', 'Completed', 'Cancelled', 'No-show']);
        const interviewDate = getRandomDate(new Date(appliedDate), new Date());
        
        return {
          id: generateRandomId(),
          type: getRandomElement(interviewTypes),
          interviewerId: reviewer.id,
          interviewerName: reviewer.name,
          scheduledTime: `${interviewDate}T${Math.floor(Math.random() * 8) + 9}:00:00`,
          duration: getRandomElement([30, 45, 60, 90]),
          status: interviewStatus,
          feedback: interviewStatus === 'Completed' ? getRandomElement([
            'Good technical skills, but needs more experience',
            'Great cultural fit, technically strong',
            'Excellent problem-solver, recommended to hire',
            'Not enough depth in required skills'
          ]) : undefined
        };
      })
    };
  });
};

// Generate mock jobs
export const generateMockJobs = (count: number = 10): Job[] => {
  const today = new Date();
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(today.getMonth() - 6);
  
  return Array.from({ length: count }, (_, index) => {
    const id = generateRandomId();
    const status = getRandomElement(jobStatuses);
    const departmentName = getRandomElement(departments);
    const title = `${getRandomElement(['Senior', 'Junior', 'Lead', 'Staff', ''])} ${getRandomElement(roles)}`;
    const postedDate = status !== 'Draft' ? getRandomDate(sixMonthsAgo, today) : undefined;
    
    const minSalary = (Math.floor(Math.random() * 50) + 70) * 1000;
    const maxSalary = minSalary + (Math.floor(Math.random() * 50) + 20) * 1000;
    
    const requirementsCount = Math.floor(Math.random() * 4) + 3;
    const responsibilitiesCount = Math.floor(Math.random() * 4) + 3;
    
    const requirements = [
      `${Math.floor(Math.random() * 8) + 3}+ years of experience in ${getRandomElement(skills)}`,
      `Strong understanding of ${getRandomElement(skills)} and ${getRandomElement(skills)}`,
      'Bachelor\'s degree in Computer Science or related field',
      'Experience with agile development methodologies',
      'Strong problem-solving skills and attention to detail',
      `Experience with ${getRandomElement(skills)}`,
      'Excellent communication and teamwork skills',
      'Experience in a fast-paced, startup environment'
    ].slice(0, requirementsCount);
    
    const responsibilities = [
      `Develop and maintain ${getRandomElement(skills)} applications`,
      'Collaborate with cross-functional teams to define and implement new features',
      'Write clean, maintainable, and efficient code',
      'Participate in code reviews and contribute to technical discussions',
      'Troubleshoot and debug issues in production environments',
      'Mentor junior developers',
      'Contribute to architecture and design decisions',
      'Work with product managers to define requirements'
    ].slice(0, responsibilitiesCount);
    
    const approvalNeeded = status === 'Pending Approval';
    
    return {
      id,
      title,
      department: departmentName,
      location: getRandomElement(locations),
      type: getRandomElement(['Full-time', 'Part-time', 'Contract', 'Temporary', 'Internship']),
      description: `We are looking for a ${title} to join our ${departmentName} team. In this role, you will be responsible for developing and maintaining our applications, collaborating with cross-functional teams, and contributing to the overall success of the department.`,
      responsibilities,
      requirements,
      salary: {
        min: minSalary,
        max: maxSalary,
        currency: 'USD'
      },
      status,
      postedDate,
      closingDate: postedDate ? getRandomDate(new Date(postedDate), new Date(today.setMonth(today.getMonth() + 3))) : undefined,
      applicantCount: Math.floor(Math.random() * 100),
      hiringManager: getRandomElement(names),
      approvalWorkflow: approvalNeeded ? {
        currentStage: 'HR Approval',
        approvers: [
          {
            name: getRandomElement(names),
            role: 'HR Manager',
            approved: Math.random() > 0.5,
            date: Math.random() > 0.5 ? getRandomDate(new Date(today.setDate(today.getDate() - 5)), today) : undefined,
            comments: Math.random() > 0.7 ? 'Looks good to me!' : undefined
          },
          {
            name: getRandomElement(names),
            role: 'Department Head',
            approved: false
          }
        ]
      } : undefined,
      skills: Array.from(
        new Set(Array.from({ length: Math.floor(Math.random() * 5) + 3 }, () => getRandomElement(skills)))
      )
    };
  });
};

// Diversity data for reporting
export const generateDiversityData = () => {
  return {
    gender: {
      Male: 45,
      Female: 38,
      'Non-binary': 12,
      'Prefer not to say': 5
    },
    ethnicity: {
      White: 48,
      Black: 15,
      'Hispanic/Latino': 18,
      Asian: 12,
      'Native American': 2,
      'Pacific Islander': 1,
      'Two or more races': 3,
      'Prefer not to say': 1
    },
    veteranStatus: {
      Veteran: 8,
      'Non-veteran': 92
    },
    disabilityStatus: {
      'Person with disability': 6,
      'No disability': 94
    },
    timeToHire: {
      'Less than 30 days': 32,
      '30-60 days': 45,
      '60-90 days': 18,
      'More than 90 days': 5
    },
    hiringSource: {
      LinkedIn: 35,
      Indeed: 22,
      Referral: 18,
      'Company Website': 15,
      GitHub: 5,
      Other: 5
    }
  };
};

// Generate time-to-hire data for dashboard
export const generateTimeToHireData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentMonth = new Date().getMonth();
  
  const last12Months = Array.from({ length: 12 }, (_, i) => {
    const monthIndex = (currentMonth - 11 + i) % 12;
    return months[monthIndex < 0 ? monthIndex + 12 : monthIndex];
  });
  
  return last12Months.map(month => ({
    month,
    "Engineering": Math.floor(Math.random() * 40) + 20,
    "Product": Math.floor(Math.random() * 30) + 25,
    "Marketing": Math.floor(Math.random() * 25) + 15,
    "Sales": Math.floor(Math.random() * 20) + 10,
  }));
};

// Mock data service
class MockDataService {
  private candidates: Candidate[];
  private jobs: Job[];
  
  constructor() {
    this.candidates = generateMockCandidates(30);
    this.jobs = generateMockJobs(12);
  }
  
  // Candidate methods
  getAllCandidates(): Candidate[] {
    return [...this.candidates];
  }
  
  getCandidatesByStatus(status: string): Candidate[] {
    return this.candidates.filter(c => c.status === status);
  }
  
  getCandidateById(id: string): Candidate | undefined {
    return this.candidates.find(c => c.id === id);
  }
  
  updateCandidateStatus(id: string, status: Candidate['status']): Candidate | undefined {
    const candidate = this.candidates.find(c => c.id === id);
    if (candidate) {
      candidate.status = status;
      candidate.lastUpdated = new Date().toISOString().split('T')[0];
    }
    return candidate;
  }
  
  addCandidate(candidate: Omit<Candidate, 'id'>): Candidate {
    const newCandidate = {
      ...candidate,
      id: generateRandomId(),
      appliedDate: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    
    this.candidates.push(newCandidate);
    return newCandidate;
  }
  
  // Job methods
  getAllJobs(): Job[] {
    return [...this.jobs];
  }
  
  getJobById(id: string): Job | undefined {
    return this.jobs.find(j => j.id === id);
  }
  
  addJob(job: Omit<Job, 'id'>): Job {
    const newJob = {
      ...job,
      id: generateRandomId()
    };
    
    this.jobs.push(newJob);
    return newJob;
  }
  
  updateJobStatus(id: string, status: Job['status']): Job | undefined {
    const job = this.jobs.find(j => j.id === id);
    if (job) {
      job.status = status;
    }
    return job;
  }
  
  // Data for analytics
  getDiversityData() {
    return generateDiversityData();
  }
  
  getTimeToHireData() {
    return generateTimeToHireData();
  }
  
  // Generate more mock data on demand
  generateMoreCandidates(count: number): Candidate[] {
    const newCandidates = generateMockCandidates(count);
    this.candidates = [...this.candidates, ...newCandidates];
    return newCandidates;
  }
}

export const mockDataService = new MockDataService();
