import { v4 as uuidv4 } from 'uuid';
import { Candidate, Interview, TimeToHireData, DiversityData, Job, User, OnboardingTask } from '@/types';

// Time to Hire mock data
const timeToHireData: TimeToHireData[] = [
  { month: "Jan", Engineering: 45, Product: 32, Marketing: 28, Sales: 25 },
  { month: "Feb", Engineering: 42, Product: 30, Marketing: 26, Sales: 22 },
  { month: "Mar", Engineering: 38, Product: 29, Marketing: 25, Sales: 24 },
  { month: "Apr", Engineering: 35, Product: 28, Marketing: 24, Sales: 21 },
  { month: "May", Engineering: 32, Product: 26, Marketing: 22, Sales: 20 },
  { month: "Jun", Engineering: 30, Product: 25, Marketing: 21, Sales: 19 }
];

const diversityData: DiversityData = {
  gender: { "Male": 55, "Female": 40, "Non-binary": 3, "Prefer not to say": 2 },
  ethnicity: { "White": 45, "Black or African American": 20, "Asian": 15, "Hispanic": 12, "Two or more races": 5, "Other/Unknown": 3 },
  hiringSource: { "LinkedIn": 35, "Job Boards": 25, "Company Website": 15, "Referrals": 20, "University Recruiting": 3, "Other": 2 }
};

// 20 Jobs
const jobs: Job[] = [
  { id: "1", title: "Frontend Developer", department: "Engineering", location: "New York, NY", type: "Full-time", description: "We are looking for a Frontend Developer to join our team.", responsibilities: ["Develop new user-facing features", "Build reusable code and libraries", "Ensure technical feasibility of UI/UX designs", "Optimize for speed and scalability"], requirements: ["Strong proficiency in JavaScript", "Understanding of React.js", "Experience with Redux/Flux", "Familiarity with ES6+"], postedDate: "2025-01-01", closingDate: "2025-03-01", salary: "$100,000 - $130,000", status: "Published", hiringManager: "John Doe", applicants: 15, skills: ["React", "JavaScript", "HTML", "CSS"] },
  { id: "2", title: "Backend Developer", department: "Engineering", location: "San Francisco, CA", type: "Full-time", description: "We are looking for a Backend Developer to join our team.", responsibilities: ["Design scalable backend services", "Integrate user-facing elements", "Improve codebases", "Manage server-client data"], requirements: ["Proficiency in Node.js", "Experience with Express", "Server-side templating", "Front-end basics"], postedDate: "2025-01-15", closingDate: "2025-03-15", salary: "$120,000 - $150,000", status: "Published", hiringManager: "Jane Smith", applicants: 10, skills: ["Node.js", "Express", "MongoDB", "SQL"] },
  { id: "3", title: "Product Manager", department: "Product", location: "Chicago, IL", type: "Full-time", description: "We are looking for a Product Manager to join our team.", responsibilities: ["Define product vision", "Work with engineering", "Analyze market data", "Drive product launches"], requirements: ["3+ years PM experience", "Agile experience", "Communication skills", "Technical background a plus"], postedDate: "2025-02-01", closingDate: "2025-04-01", salary: "$130,000 - $160,000", status: "Published", hiringManager: "Michael Johnson", applicants: 8, skills: ["Product Management", "Agile", "User Research", "Roadmapping"] },
  { id: "4", title: "UX Designer", department: "Design", location: "Austin, TX", type: "Full-time", description: "Seeking a creative UX Designer for intuitive user experiences.", responsibilities: ["Create wireframes and prototypes", "Conduct user research", "Collaborate with product teams", "Design responsive layouts"], requirements: ["UX portfolio required", "Figma proficiency", "User-centered design knowledge", "2+ years experience"], postedDate: "2025-01-20", closingDate: "2025-03-20", salary: "$90,000 - $120,000", status: "Published", hiringManager: "Sarah Lee", applicants: 12, skills: ["Figma", "User Research", "Prototyping", "UI Design"] },
  { id: "5", title: "DevOps Engineer", department: "Engineering", location: "Seattle, WA", type: "Full-time", description: "Looking for a DevOps Engineer to manage CI/CD pipelines.", responsibilities: ["Manage cloud infrastructure", "Automate deployments", "Monitor system health", "Implement security best practices"], requirements: ["AWS/GCP experience", "Docker/Kubernetes", "CI/CD pipelines", "Linux administration"], postedDate: "2025-01-10", closingDate: "2025-03-10", salary: "$125,000 - $155,000", status: "Published", hiringManager: "Tom Wilson", applicants: 7, skills: ["AWS", "Docker", "Kubernetes", "CI/CD"] },
  { id: "6", title: "Data Scientist", department: "Data", location: "Boston, MA", type: "Full-time", description: "Data Scientist to build ML models and analyze business data.", responsibilities: ["Build ML models", "Analyze large datasets", "Present findings to stakeholders", "Develop data pipelines"], requirements: ["Python proficiency", "ML frameworks (TensorFlow/PyTorch)", "Statistics background", "SQL skills"], postedDate: "2025-02-05", closingDate: "2025-04-05", salary: "$115,000 - $145,000", status: "Published", hiringManager: "Alice Chen", applicants: 9, skills: ["Python", "Machine Learning", "Statistics", "SQL"] },
  { id: "7", title: "Marketing Manager", department: "Marketing", location: "Los Angeles, CA", type: "Full-time", description: "Marketing Manager to lead digital campaigns and brand strategy.", responsibilities: ["Plan marketing campaigns", "Manage social media", "Analyze marketing metrics", "Coordinate with sales"], requirements: ["5+ years marketing experience", "Digital marketing expertise", "Analytics skills", "Leadership experience"], postedDate: "2025-01-25", closingDate: "2025-03-25", salary: "$95,000 - $125,000", status: "Published", hiringManager: "Rachel Green", applicants: 11, skills: ["Digital Marketing", "SEO", "Content Strategy", "Analytics"] },
  { id: "8", title: "Sales Representative", department: "Sales", location: "Miami, FL", type: "Full-time", description: "Dynamic Sales Representative to drive revenue growth.", responsibilities: ["Generate leads", "Close deals", "Manage client relationships", "Meet sales targets"], requirements: ["2+ years sales experience", "CRM proficiency", "Communication skills", "Goal-oriented"], postedDate: "2025-02-10", closingDate: "2025-04-10", salary: "$60,000 - $90,000", status: "Published", hiringManager: "Mark Davis", applicants: 14, skills: ["Sales", "CRM", "Negotiation", "Communication"] },
  { id: "9", title: "QA Engineer", department: "Engineering", location: "Denver, CO", type: "Full-time", description: "QA Engineer to ensure product quality through testing.", responsibilities: ["Write test cases", "Automate testing", "Report bugs", "Collaborate with developers"], requirements: ["Test automation experience", "Selenium/Cypress", "API testing", "Agile methodology"], postedDate: "2025-01-30", closingDate: "2025-03-30", salary: "$85,000 - $110,000", status: "Published", hiringManager: "Lisa Park", applicants: 6, skills: ["Test Automation", "Selenium", "API Testing", "Agile"] },
  { id: "10", title: "HR Coordinator", department: "Human Resources", location: "Portland, OR", type: "Full-time", description: "HR Coordinator to support recruitment and employee relations.", responsibilities: ["Coordinate interviews", "Manage onboarding", "Maintain HR records", "Support employee engagement"], requirements: ["HR degree or certification", "1+ year HR experience", "HRIS experience", "Communication skills"], postedDate: "2025-02-15", closingDate: "2025-04-15", salary: "$55,000 - $70,000", status: "Published", hiringManager: "Nancy Brown", applicants: 8, skills: ["HR", "Recruiting", "HRIS", "Communication"] },
  { id: "11", title: "Mobile Developer", department: "Engineering", location: "Remote", type: "Full-time", description: "Mobile Developer for iOS and Android applications.", responsibilities: ["Build mobile apps", "Optimize performance", "Integrate APIs", "Write unit tests"], requirements: ["React Native or Flutter", "iOS/Android experience", "REST API integration", "App Store deployment"], postedDate: "2025-02-01", closingDate: "2025-04-01", salary: "$110,000 - $140,000", status: "Draft", hiringManager: "Chris Martin", applicants: 0, skills: ["React Native", "Flutter", "iOS", "Android"] },
  { id: "12", title: "Security Analyst", department: "IT Security", location: "Washington, DC", type: "Full-time", description: "Security Analyst to protect company systems and data.", responsibilities: ["Monitor security threats", "Conduct vulnerability assessments", "Implement security policies", "Incident response"], requirements: ["CISSP or equivalent", "Network security knowledge", "Penetration testing", "SIEM tools"], postedDate: "2025-01-18", closingDate: "2025-03-18", salary: "$100,000 - $130,000", status: "Published", hiringManager: "James Wilson", applicants: 5, skills: ["Cybersecurity", "SIEM", "Penetration Testing", "Compliance"] },
  { id: "13", title: "Content Writer", department: "Marketing", location: "Remote", type: "Part-time", description: "Content Writer for blog posts, whitepapers, and marketing copy.", responsibilities: ["Write blog content", "Create marketing copy", "Research topics", "Edit and proofread"], requirements: ["2+ years content writing", "SEO knowledge", "Strong grammar", "Portfolio required"], postedDate: "2025-02-08", closingDate: "2025-04-08", salary: "$45,000 - $65,000", status: "Published", hiringManager: "Emily Roberts", applicants: 18, skills: ["Content Writing", "SEO", "Copywriting", "Research"] },
  { id: "14", title: "Financial Analyst", department: "Finance", location: "New York, NY", type: "Full-time", description: "Financial Analyst for budgeting, forecasting, and reporting.", responsibilities: ["Prepare financial reports", "Budget analysis", "Forecast revenue", "Support audits"], requirements: ["CPA or CFA preferred", "Excel proficiency", "Financial modeling", "3+ years experience"], postedDate: "2025-01-22", closingDate: "2025-03-22", salary: "$80,000 - $110,000", status: "Pending Approval", hiringManager: "David Kim", applicants: 0, skills: ["Financial Modeling", "Excel", "Budgeting", "Forecasting"] },
  { id: "15", title: "Customer Success Manager", department: "Customer Success", location: "San Francisco, CA", type: "Full-time", description: "CSM to manage enterprise client relationships and retention.", responsibilities: ["Manage client accounts", "Drive product adoption", "Reduce churn", "Upsell services"], requirements: ["3+ years CSM experience", "SaaS background", "CRM tools", "Client-facing skills"], postedDate: "2025-02-12", closingDate: "2025-04-12", salary: "$85,000 - $115,000", status: "Published", hiringManager: "Sophia Wang", applicants: 7, skills: ["Customer Success", "SaaS", "Account Management", "CRM"] },
  { id: "16", title: "Project Manager", department: "Operations", location: "Chicago, IL", type: "Contract", description: "Project Manager for a 12-month digital transformation initiative.", responsibilities: ["Plan project timelines", "Coordinate teams", "Track deliverables", "Manage risks"], requirements: ["PMP certification", "Agile/Waterfall", "5+ years PM experience", "Stakeholder management"], postedDate: "2025-01-28", closingDate: "2025-03-28", salary: "$110,000 - $140,000", status: "Published", hiringManager: "Robert Taylor", applicants: 10, skills: ["Project Management", "Agile", "PMP", "Risk Management"] },
  { id: "17", title: "Database Administrator", department: "Engineering", location: "Dallas, TX", type: "Full-time", description: "DBA to manage and optimize database systems.", responsibilities: ["Manage database performance", "Implement backups", "Optimize queries", "Ensure data security"], requirements: ["PostgreSQL/MySQL expertise", "Performance tuning", "Backup/recovery", "3+ years DBA experience"], postedDate: "2025-02-03", closingDate: "2025-04-03", salary: "$95,000 - $125,000", status: "Published", hiringManager: "Jennifer Adams", applicants: 4, skills: ["PostgreSQL", "MySQL", "Database Optimization", "Backup/Recovery"] },
  { id: "18", title: "Business Analyst", department: "Operations", location: "Atlanta, GA", type: "Full-time", description: "Business Analyst to bridge business needs and technical solutions.", responsibilities: ["Gather requirements", "Create documentation", "Analyze processes", "Stakeholder communication"], requirements: ["BA/BS degree", "Requirements gathering", "Process modeling", "SQL basics"], postedDate: "2025-02-07", closingDate: "2025-04-07", salary: "$75,000 - $100,000", status: "Published", hiringManager: "Patricia Moore", applicants: 9, skills: ["Requirements Analysis", "Process Modeling", "SQL", "Documentation"] },
  { id: "19", title: "Graphic Designer", department: "Design", location: "Remote", type: "Full-time", description: "Graphic Designer for brand materials and digital assets.", responsibilities: ["Design marketing materials", "Create brand assets", "Collaborate on campaigns", "Maintain brand consistency"], requirements: ["Adobe Creative Suite", "Portfolio required", "Brand design experience", "Typography skills"], postedDate: "2025-01-12", closingDate: "2025-03-12", salary: "$65,000 - $90,000", status: "Closed", hiringManager: "Amanda Clark", applicants: 22, skills: ["Adobe Photoshop", "Illustrator", "InDesign", "Brand Design"] },
  { id: "20", title: "Technical Writer", department: "Engineering", location: "Remote", type: "Part-time", description: "Technical Writer for API docs, user guides, and knowledge base.", responsibilities: ["Write API documentation", "Create user guides", "Maintain knowledge base", "Review technical content"], requirements: ["Technical writing experience", "Markdown/HTML", "API documentation", "Attention to detail"], postedDate: "2025-02-14", closingDate: "2025-04-14", salary: "$55,000 - $75,000", status: "Published", hiringManager: "Steven Hall", applicants: 6, skills: ["Technical Writing", "API Docs", "Markdown", "Knowledge Base"] },
];

// 20 Candidates
const candidates: Candidate[] = [
  { id: "1", name: "John Smith", email: "john.123@example.com", phone: "123-456-7890", location: "New York, NY", role: "Frontend Developer", status: "Interview", appliedDate: "2025-01-15", source: "LinkedIn", resumeUrl: "/placeholder.svg", coverLetterUrl: "", avatar: "/placeholder.svg", skills: ["React", "JavaScript", "HTML", "CSS"], experience: 5, education: "BS Computer Science", notes: "Promising candidate with strong technical skills.", lastUpdated: "2025-03-01", interviews: [{ id: "101", date: "2025-02-01", time: "10:00", duration: "1 hour", type: "Phone", status: "Completed", candidateId: "1", interviewerId: "1", interviewerName: "Jane Doe", notes: "Discussed React and JavaScript." }], feedback: "Good frontend knowledge.", salary: "$100,000 - $120,000" },
  { id: "2", name: "Alice Johnson", email: "alice.j@example.com", phone: "987-654-3210", location: "Los Angeles, CA", role: "Backend Developer", status: "Offer", appliedDate: "2025-01-01", source: "Indeed", resumeUrl: "/placeholder.svg", coverLetterUrl: "", avatar: "/placeholder.svg", skills: ["Node.js", "Express", "SQL", "MongoDB"], experience: 7, education: "MS Software Engineering", notes: "Experienced backend developer.", lastUpdated: "2025-03-05", interviews: [{ id: "102", date: "2025-01-10", time: "14:00", duration: "45 minutes", type: "Video", status: "Completed", candidateId: "2", interviewerId: "2", interviewerName: "Bob Smith", notes: "Discussed Node.js and databases." }], feedback: "Excellent technical skills.", salary: "$110,000 - $130,000" },
  { id: "3", name: "Bob Williams", email: "bob.w@example.com", phone: "555-123-4567", location: "Chicago, IL", role: "Data Scientist", status: "Hired", appliedDate: "2025-02-10", source: "Company Website", resumeUrl: "/placeholder.svg", coverLetterUrl: "", avatar: "/placeholder.svg", skills: ["Python", "Machine Learning", "Data Analysis", "Statistics"], experience: 4, education: "BS Statistics", notes: "Strong analytical skills.", lastUpdated: "2025-03-10", interviews: [{ id: "103", date: "2025-03-01", time: "11:00", duration: "1 hour", type: "In-person", status: "Completed", candidateId: "3", interviewerId: "3", interviewerName: "Alice Johnson", notes: "Discussed ML algorithms." }], feedback: "Good data science knowledge.", salary: "$95,000 - $115,000" },
  { id: "4", name: "Emily Brown", email: "emily.b@example.com", phone: "777-999-8888", location: "Houston, TX", role: "Project Manager", status: "Rejected", appliedDate: "2025-01-01", source: "Referral", resumeUrl: "/placeholder.svg", coverLetterUrl: "", avatar: "/placeholder.svg", skills: ["Project Management", "Leadership", "Communication", "Agile"], experience: 8, education: "MBA", notes: "Experienced PM with leadership skills.", lastUpdated: "2025-03-15", interviews: [{ id: "104", date: "2025-01-15", time: "15:00", duration: "1.5 hours", type: "Behavioral", status: "Completed", candidateId: "4", interviewerId: "4", interviewerName: "John Smith", notes: "Discussed PM methodologies." }], feedback: "Good communication, lacks technical expertise.", salary: "$120,000 - $140,000" },
  { id: "5", name: "David Lee", email: "david.l@example.com", phone: "111-222-3333", location: "San Francisco, CA", role: "UX Designer", status: "Applied", appliedDate: "2025-03-01", source: "Behance", resumeUrl: "/placeholder.svg", coverLetterUrl: "", avatar: "/placeholder.svg", skills: ["User Research", "Wireframing", "Prototyping", "UI Design"], experience: 6, education: "BS Design", notes: "Creative UX designer.", lastUpdated: "2025-03-20", interviews: [], feedback: null, salary: "$110,000 - $130,000" },
  { id: "6", name: "Sarah Kim", email: "sarah.k@example.com", phone: "444-555-6666", location: "Seattle, WA", role: "QA Engineer", status: "Screen", appliedDate: "2025-02-20", source: "Glassdoor", resumeUrl: "/placeholder.svg", coverLetterUrl: "", avatar: "/placeholder.svg", skills: ["Test Automation", "Manual Testing", "Bug Tracking", "Agile"], experience: 3, education: "AS Computer Science", notes: "Detail-oriented QA engineer.", lastUpdated: "2025-03-25", interviews: [], feedback: null, salary: "$80,000 - $100,000" },
  { id: "7", name: "Michael Chen", email: "michael.c@example.com", phone: "222-333-4444", location: "Austin, TX", role: "DevOps Engineer", status: "Interview", appliedDate: "2025-01-01", source: "Stack Overflow", resumeUrl: "/placeholder.svg", coverLetterUrl: "", avatar: "/placeholder.svg", skills: ["AWS", "Docker", "Kubernetes", "CI/CD"], experience: 5, education: "BS Information Technology", notes: "Strong cloud skills.", lastUpdated: "2025-03-30", interviews: [], feedback: null, salary: "$120,000 - $140,000" },
  { id: "8", name: "Linda Nguyen", email: "linda.n@example.com", phone: "666-777-8888", location: "Boston, MA", role: "Business Analyst", status: "Offer", appliedDate: "2025-01-01", source: "LinkedIn", resumeUrl: "/placeholder.svg", coverLetterUrl: "", avatar: "/placeholder.svg", skills: ["Data Analysis", "Requirements Gathering", "Process Improvement", "SQL"], experience: 7, education: "MS Business Analytics", notes: "Strong analytical skills.", lastUpdated: "2025-04-01", interviews: [], feedback: null, salary: "$110,000 - $130,000" },
  { id: "9", name: "Kevin Patel", email: "kevin.p@example.com", phone: "888-999-0000", location: "Miami, FL", role: "Marketing Manager", status: "Hired", appliedDate: "2025-03-01", source: "Company Website", resumeUrl: "/placeholder.svg", coverLetterUrl: "", avatar: "/placeholder.svg", skills: ["Digital Marketing", "Social Media", "SEO", "Content Marketing"], experience: 4, education: "BS Marketing", notes: "Creative marketing professional.", lastUpdated: "2025-04-05", interviews: [], feedback: null, salary: "$90,000 - $110,000" },
  { id: "10", name: "Jessica Garcia", email: "jessica.g@example.com", phone: "999-000-1111", location: "Denver, CO", role: "Sales Representative", status: "Rejected", appliedDate: "2025-01-01", source: "Indeed", resumeUrl: "/placeholder.svg", coverLetterUrl: "", avatar: "/placeholder.svg", skills: ["Sales", "Customer Service", "Communication", "Negotiation"], experience: 6, education: "AS Business Administration", notes: "Experienced sales rep.", lastUpdated: "2025-04-10", interviews: [], feedback: null, salary: "$85,000 - $105,000" },
  { id: "11", name: "Ryan Thompson", email: "ryan.t@example.com", phone: "321-654-9870", location: "Portland, OR", role: "Mobile Developer", status: "Applied", appliedDate: "2025-02-18", source: "LinkedIn", resumeUrl: "/placeholder.svg", coverLetterUrl: "", avatar: "/placeholder.svg", skills: ["React Native", "Flutter", "iOS", "Android"], experience: 4, education: "BS Computer Science", notes: "Cross-platform mobile experience.", lastUpdated: "2025-03-01", interviews: [], feedback: null, salary: "$105,000 - $130,000" },
  { id: "12", name: "Megan Taylor", email: "megan.t@example.com", phone: "654-321-0987", location: "Dallas, TX", role: "Content Writer", status: "Screen", appliedDate: "2025-02-25", source: "Company Website", resumeUrl: "/placeholder.svg", coverLetterUrl: "", avatar: "/placeholder.svg", skills: ["Content Writing", "SEO", "Copywriting", "Research"], experience: 3, education: "BA English", notes: "Strong writing portfolio.", lastUpdated: "2025-03-05", interviews: [], feedback: null, salary: "$50,000 - $65,000" },
  { id: "13", name: "Daniel Martinez", email: "daniel.m@example.com", phone: "789-012-3456", location: "Atlanta, GA", role: "Security Analyst", status: "Interview", appliedDate: "2025-01-28", source: "Indeed", resumeUrl: "/placeholder.svg", coverLetterUrl: "", avatar: "/placeholder.svg", skills: ["Cybersecurity", "SIEM", "Penetration Testing", "Compliance"], experience: 5, education: "BS Cybersecurity", notes: "CISSP certified.", lastUpdated: "2025-03-15", interviews: [{ id: "113", date: "2025-03-10", time: "09:00", duration: "1 hour", type: "Technical", status: "Completed", candidateId: "13", interviewerId: "1", interviewerName: "James Wilson", notes: "Discussed security protocols." }], feedback: "Strong security knowledge.", salary: "$100,000 - $125,000" },
  { id: "14", name: "Olivia Anderson", email: "olivia.a@example.com", phone: "012-345-6789", location: "San Diego, CA", role: "HR Coordinator", status: "Offer", appliedDate: "2025-02-05", source: "Referral", resumeUrl: "/placeholder.svg", coverLetterUrl: "", avatar: "/placeholder.svg", skills: ["HR", "Recruiting", "HRIS", "Communication"], experience: 2, education: "BS Human Resources", notes: "Eager and well-organized.", lastUpdated: "2025-03-20", interviews: [{ id: "114", date: "2025-02-20", time: "13:00", duration: "45 minutes", type: "Video", status: "Completed", candidateId: "14", interviewerId: "2", interviewerName: "Nancy Brown", notes: "Good fit for team." }], feedback: "Great cultural fit.", salary: "$55,000 - $65,000" },
  { id: "15", name: "James White", email: "james.w@example.com", phone: "345-678-9012", location: "Minneapolis, MN", role: "Financial Analyst", status: "Applied", appliedDate: "2025-03-05", source: "LinkedIn", resumeUrl: "/placeholder.svg", coverLetterUrl: "", avatar: "/placeholder.svg", skills: ["Financial Modeling", "Excel", "Budgeting", "Forecasting"], experience: 4, education: "BS Finance", notes: "CFA Level II candidate.", lastUpdated: "2025-03-10", interviews: [], feedback: null, salary: "$80,000 - $100,000" },
  { id: "16", name: "Sophia Robinson", email: "sophia.r@example.com", phone: "567-890-1234", location: "Philadelphia, PA", role: "Graphic Designer", status: "Interview", appliedDate: "2025-01-20", source: "Behance", resumeUrl: "/placeholder.svg", coverLetterUrl: "", avatar: "/placeholder.svg", skills: ["Adobe Photoshop", "Illustrator", "InDesign", "Brand Design"], experience: 5, education: "BFA Graphic Design", notes: "Outstanding portfolio.", lastUpdated: "2025-02-28", interviews: [{ id: "116", date: "2025-02-15", time: "10:30", duration: "1 hour", type: "Video", status: "Completed", candidateId: "16", interviewerId: "3", interviewerName: "Amanda Clark", notes: "Reviewed portfolio." }], feedback: "Very creative work.", salary: "$70,000 - $90,000" },
  { id: "17", name: "Ethan Harris", email: "ethan.h@example.com", phone: "678-901-2345", location: "Nashville, TN", role: "Database Administrator", status: "Screen", appliedDate: "2025-02-12", source: "Stack Overflow", resumeUrl: "/placeholder.svg", coverLetterUrl: "", avatar: "/placeholder.svg", skills: ["PostgreSQL", "MySQL", "Database Optimization", "Backup/Recovery"], experience: 6, education: "BS Computer Science", notes: "Solid DBA background.", lastUpdated: "2025-03-01", interviews: [], feedback: null, salary: "$95,000 - $120,000" },
  { id: "18", name: "Isabella Clark", email: "isabella.c@example.com", phone: "890-123-4567", location: "Charlotte, NC", role: "Customer Success Manager", status: "Hired", appliedDate: "2025-01-10", source: "LinkedIn", resumeUrl: "/placeholder.svg", coverLetterUrl: "", avatar: "/placeholder.svg", skills: ["Customer Success", "SaaS", "Account Management", "CRM"], experience: 4, education: "BS Business", notes: "SaaS CSM with proven track record.", lastUpdated: "2025-02-20", interviews: [{ id: "118", date: "2025-01-25", time: "14:00", duration: "1 hour", type: "Video", status: "Completed", candidateId: "18", interviewerId: "4", interviewerName: "Sophia Wang", notes: "Excellent client skills." }], feedback: "Excellent retention metrics.", salary: "$85,000 - $110,000" },
  { id: "19", name: "Alexander Lewis", email: "alex.l@example.com", phone: "901-234-5678", location: "San Jose, CA", role: "Technical Writer", status: "Applied", appliedDate: "2025-03-08", source: "Company Website", resumeUrl: "/placeholder.svg", coverLetterUrl: "", avatar: "/placeholder.svg", skills: ["Technical Writing", "API Docs", "Markdown", "Knowledge Base"], experience: 3, education: "BA Communications", notes: "API documentation experience.", lastUpdated: "2025-03-10", interviews: [], feedback: null, salary: "$60,000 - $75,000" },
  { id: "20", name: "Charlotte Walker", email: "charlotte.w@example.com", phone: "234-567-8901", location: "Raleigh, NC", role: "Product Manager", status: "Interview", appliedDate: "2025-02-01", source: "Referral", resumeUrl: "/placeholder.svg", coverLetterUrl: "", avatar: "/placeholder.svg", skills: ["Product Management", "Agile", "Data Analysis", "Roadmapping"], experience: 5, education: "MBA", notes: "Strong product instincts.", lastUpdated: "2025-03-15", interviews: [{ id: "120", date: "2025-03-05", time: "11:00", duration: "1 hour", type: "Behavioral", status: "Completed", candidateId: "20", interviewerId: "1", interviewerName: "Michael Johnson", notes: "Good product sense." }], feedback: "Strong strategic thinker.", salary: "$125,000 - $150,000" },
];

const users: User[] = [
  { id: "1", name: "Admin User", email: "admin@example.com", role: "admin", permissions: { canViewCandidates: true, canEditCandidates: true, canDeleteCandidates: true, canViewJobs: true, canEditJobs: true, canDeleteJobs: true, canScheduleInterviews: true, canViewReports: true, canEditReports: true, canDeleteReports: true, canManageUsers: true } },
  { id: "2", name: "Manager User", email: "manager@example.com", role: "manager", permissions: { canViewCandidates: true, canEditCandidates: true, canDeleteCandidates: false, canViewJobs: true, canEditJobs: true, canDeleteJobs: false, canScheduleInterviews: true, canViewReports: true, canEditReports: false, canDeleteReports: false, canManageUsers: false } },
  { id: "3", name: "Regular User", email: "user@example.com", role: "user", permissions: { canViewCandidates: true, canEditCandidates: false, canDeleteCandidates: false, canViewJobs: true, canEditJobs: false, canDeleteJobs: false, canScheduleInterviews: false, canViewReports: false, canEditReports: false, canDeleteReports: false, canManageUsers: false } }
];

// 20 Interviews
const interviews: Interview[] = [
  { id: "i-1", candidateId: "1", interviewerId: "1", interviewerName: "Jane Doe", date: "2025-05-05", time: "10:00", duration: "1 hour", type: "Phone", status: "Scheduled", notes: "Initial phone screen." },
  { id: "i-2", candidateId: "2", interviewerId: "2", interviewerName: "Bob Smith", date: "2025-05-06", time: "14:30", duration: "45 minutes", type: "Video", status: "Scheduled", notes: "Technical discussion." },
  { id: "i-3", candidateId: "5", interviewerId: "3", interviewerName: "Alice Chen", date: "2025-05-07", time: "09:00", duration: "1 hour", type: "In-person", status: "Scheduled", notes: "Portfolio review." },
  { id: "i-4", candidateId: "7", interviewerId: "1", interviewerName: "Tom Wilson", date: "2025-05-08", time: "11:00", duration: "1 hour", type: "Technical", status: "Scheduled", notes: "DevOps technical assessment." },
  { id: "i-5", candidateId: "6", interviewerId: "4", interviewerName: "Lisa Park", date: "2025-05-09", time: "13:00", duration: "45 minutes", type: "Phone", status: "Scheduled", notes: "QA screening call." },
  { id: "i-6", candidateId: "11", interviewerId: "2", interviewerName: "Chris Martin", date: "2025-05-10", time: "10:30", duration: "1 hour", type: "Video", status: "Scheduled", notes: "Mobile development discussion." },
  { id: "i-7", candidateId: "12", interviewerId: "3", interviewerName: "Emily Roberts", date: "2025-05-11", time: "15:00", duration: "30 minutes", type: "Phone", status: "Scheduled", notes: "Writing sample review." },
  { id: "i-8", candidateId: "13", interviewerId: "1", interviewerName: "James Wilson", date: "2025-05-12", time: "09:30", duration: "1.5 hours", type: "Technical", status: "Scheduled", notes: "Security assessment." },
  { id: "i-9", candidateId: "15", interviewerId: "4", interviewerName: "David Kim", date: "2025-05-13", time: "14:00", duration: "1 hour", type: "Behavioral", status: "Scheduled", notes: "Cultural fit assessment." },
  { id: "i-10", candidateId: "16", interviewerId: "2", interviewerName: "Amanda Clark", date: "2025-05-14", time: "10:00", duration: "1 hour", type: "In-person", status: "Scheduled", notes: "Design challenge." },
  { id: "i-11", candidateId: "17", interviewerId: "3", interviewerName: "Jennifer Adams", date: "2025-05-15", time: "11:00", duration: "1 hour", type: "Technical", status: "Scheduled", notes: "Database skills test." },
  { id: "i-12", candidateId: "19", interviewerId: "1", interviewerName: "Steven Hall", date: "2025-05-16", time: "13:30", duration: "45 minutes", type: "Video", status: "Scheduled", notes: "Writing assessment." },
  { id: "i-13", candidateId: "20", interviewerId: "4", interviewerName: "Michael Johnson", date: "2025-05-17", time: "10:00", duration: "1 hour", type: "Behavioral", status: "Scheduled", notes: "PM case study." },
  { id: "i-14", candidateId: "1", interviewerId: "2", interviewerName: "Sarah Lee", date: "2025-05-18", time: "14:00", duration: "1 hour", type: "Technical", status: "Scheduled", notes: "React coding challenge." },
  { id: "i-15", candidateId: "3", interviewerId: "3", interviewerName: "Alice Chen", date: "2025-04-20", time: "10:00", duration: "45 minutes", type: "Video", status: "Completed", notes: "Final review.", feedback: "Excellent candidate." },
  { id: "i-16", candidateId: "9", interviewerId: "1", interviewerName: "Rachel Green", date: "2025-04-18", time: "11:00", duration: "30 minutes", type: "Phone", status: "Completed", notes: "Marketing strategy.", feedback: "Great vision." },
  { id: "i-17", candidateId: "18", interviewerId: "4", interviewerName: "Sophia Wang", date: "2025-04-15", time: "14:00", duration: "1 hour", type: "Behavioral", status: "Completed", notes: "CS skills review.", feedback: "Perfect fit." },
  { id: "i-18", candidateId: "4", interviewerId: "2", interviewerName: "Mark Davis", date: "2025-04-10", time: "09:00", duration: "1 hour", type: "Behavioral", status: "Completed", notes: "Leadership assessment.", feedback: "Not a match." },
  { id: "i-19", candidateId: "10", interviewerId: "3", interviewerName: "Patricia Moore", date: "2025-04-08", time: "15:00", duration: "45 minutes", type: "Phone", status: "Completed", notes: "Sales process review.", feedback: "Underqualified." },
  { id: "i-20", candidateId: "14", interviewerId: "1", interviewerName: "Nancy Brown", date: "2025-05-19", time: "10:00", duration: "45 minutes", type: "Video", status: "Scheduled", notes: "HR coordinator interview." },
];

// 20 Onboarding Tasks linked to hired candidates (3, 9, 18)
const onboardingTasks: OnboardingTask[] = [
  { id: "ot-1", candidateId: "3", title: "Complete I-9 Form", description: "Fill out I-9 employment eligibility verification form", dueDate: "2025-05-15", status: "Completed", assignedTo: "HR Team" },
  { id: "ot-2", candidateId: "3", title: "Set up workstation", description: "Prepare laptop, monitor, and desk for new hire", dueDate: "2025-05-12", status: "Completed", assignedTo: "IT Department" },
  { id: "ot-3", candidateId: "3", title: "Schedule orientation", description: "Arrange company orientation session", dueDate: "2025-05-18", status: "Completed", assignedTo: "HR Team" },
  { id: "ot-4", candidateId: "3", title: "Setup email and accounts", description: "Create company email and tool accounts", dueDate: "2025-05-10", status: "Completed", assignedTo: "IT Department" },
  { id: "ot-5", candidateId: "3", title: "Benefits enrollment", description: "Complete health, dental, and vision enrollment", dueDate: "2025-05-20", status: "Completed", assignedTo: "HR Team" },
  { id: "ot-6", candidateId: "3", title: "Team introduction meeting", description: "Schedule meet-and-greet with team members", dueDate: "2025-05-22", status: "Completed", assignedTo: "Hiring Manager" },
  { id: "ot-7", candidateId: "9", title: "Complete I-9 Form", description: "Fill out employment eligibility verification", dueDate: "2025-05-25", status: "In Progress", assignedTo: "HR Team" },
  { id: "ot-8", candidateId: "9", title: "Setup marketing tools access", description: "Grant access to marketing automation platforms", dueDate: "2025-05-20", status: "Completed", assignedTo: "IT Department" },
  { id: "ot-9", candidateId: "9", title: "Brand guidelines review", description: "Review company brand guidelines and messaging", dueDate: "2025-05-28", status: "Pending", assignedTo: "Marketing Lead" },
  { id: "ot-10", candidateId: "9", title: "Campaign overview session", description: "Walk through current marketing campaigns", dueDate: "2025-05-30", status: "Pending", assignedTo: "Marketing Lead" },
  { id: "ot-11", candidateId: "9", title: "Set up workstation", description: "Prepare laptop and peripherals", dueDate: "2025-05-18", status: "Completed", assignedTo: "IT Department" },
  { id: "ot-12", candidateId: "9", title: "Benefits enrollment", description: "Complete health and dental enrollment", dueDate: "2025-06-01", status: "Pending", assignedTo: "HR Team" },
  { id: "ot-13", candidateId: "9", title: "Meet the team", description: "Schedule introduction with marketing team", dueDate: "2025-06-02", status: "Pending", assignedTo: "Hiring Manager" },
  { id: "ot-14", candidateId: "18", title: "Complete I-9 Form", description: "Fill out employment eligibility verification", dueDate: "2025-05-10", status: "Completed", assignedTo: "HR Team" },
  { id: "ot-15", candidateId: "18", title: "CRM access setup", description: "Configure CRM tool access and training", dueDate: "2025-05-12", status: "In Progress", assignedTo: "IT Department" },
  { id: "ot-16", candidateId: "18", title: "Client portfolio handover", description: "Review assigned client accounts", dueDate: "2025-05-15", status: "Pending", assignedTo: "CS Lead" },
  { id: "ot-17", candidateId: "18", title: "Schedule orientation", description: "Arrange company orientation session", dueDate: "2025-05-14", status: "Completed", assignedTo: "HR Team" },
  { id: "ot-18", candidateId: "18", title: "Benefits enrollment", description: "Complete health insurance enrollment", dueDate: "2025-05-18", status: "Pending", assignedTo: "HR Team" },
  { id: "ot-19", candidateId: "18", title: "Set up workstation", description: "Prepare laptop and desk setup", dueDate: "2025-05-08", status: "Completed", assignedTo: "IT Department" },
  { id: "ot-20", candidateId: "18", title: "Team introduction meeting", description: "Meet the CS team members", dueDate: "2025-05-20", status: "Pending", assignedTo: "Hiring Manager" },
];

export const createCandidate = (candidateData: Partial<Omit<Candidate, "id">>): Candidate => {
  const id = uuidv4();
  const defaultCandidate: Omit<Candidate, "id"> = {
    name: "New Candidate", email: "candidate@example.com", phone: "", location: "", role: "Frontend Developer",
    status: "Applied", appliedDate: new Date().toISOString().split('T')[0], source: "Website",
    resumeUrl: "/placeholder.svg", coverLetterUrl: "", avatar: "/placeholder.svg", skills: [], experience: 0,
    education: "", notes: "", lastUpdated: new Date().toISOString(), interviews: [], feedback: "", salary: ""
  };
  return { id, ...defaultCandidate, ...candidateData };
};

export const createUser = (userData: Omit<User, "id">): User => {
  const id = uuidv4();
  return { id, ...userData };
};

export const mockDataService = {
  // Candidates CRUD
  getAllCandidates: (): Candidate[] => candidates,
  getCandidate: (id: string): Candidate | undefined => candidates.find(c => c.id === id),
  addCandidate: (candidate: Omit<Candidate, "id">): Candidate => {
    const newCandidate = createCandidate(candidate);
    candidates.push(newCandidate);
    return newCandidate;
  },
  updateCandidate: (candidate: Candidate): Candidate => {
    const index = candidates.findIndex(c => c.id === candidate.id);
    if (index !== -1) candidates[index] = candidate;
    return candidate;
  },
  deleteCandidate: (id: string): boolean => {
    const index = candidates.findIndex(c => c.id === id);
    if (index !== -1) { candidates.splice(index, 1); return true; }
    return false;
  },

  // Jobs CRUD
  getAllJobs: (): Job[] => jobs,
  getJob: (id: string): Job | undefined => jobs.find(j => j.id === id),
  addJob: (job: Omit<Job, "id" | "applicants">): Job => {
    const newJob: Job = { id: uuidv4(), applicants: 0, ...job };
    jobs.push(newJob);
    return newJob;
  },
  updateJob: (job: Job): Job => {
    const index = jobs.findIndex(j => j.id === job.id);
    if (index !== -1) jobs[index] = job;
    return job;
  },
  deleteJob: (id: string): boolean => {
    const index = jobs.findIndex(j => j.id === id);
    if (index !== -1) { jobs.splice(index, 1); return true; }
    return false;
  },

  // Interviews CRUD
  getAllInterviews: (): Interview[] => interviews,
  getInterview: (id: string): Interview | undefined => interviews.find(i => i.id === id),
  addInterview: (interview: Omit<Interview, "id">): Interview => {
    const newInterview: Interview = { id: uuidv4(), ...interview };
    interviews.push(newInterview);
    return newInterview;
  },
  updateInterview: (interview: Interview): Interview => {
    const index = interviews.findIndex(i => i.id === interview.id);
    if (index !== -1) interviews[index] = interview;
    return interview;
  },
  deleteInterview: (id: string): boolean => {
    const index = interviews.findIndex(i => i.id === id);
    if (index !== -1) { interviews.splice(index, 1); return true; }
    return false;
  },

  // Users CRUD
  getAllUsers: (): User[] => users,
  getUser: (id: string): User | undefined => users.find(u => u.id === id),
  addUser: (user: Omit<User, "id">): User => {
    const newUser = createUser(user);
    users.push(newUser);
    return newUser;
  },
  updateUser: (user: User): User => {
    const index = users.findIndex(u => u.id === user.id);
    if (index !== -1) users[index] = user;
    return user;
  },
  deleteUser: (id: string): boolean => {
    const index = users.findIndex(u => u.id === id);
    if (index !== -1) { users.splice(index, 1); return true; }
    return false;
  },

  // Onboarding Tasks CRUD
  getAllOnboardingTasks: (): OnboardingTask[] => onboardingTasks,
  getOnboardingTasksByCandidate: (candidateId: string): OnboardingTask[] => onboardingTasks.filter(t => t.candidateId === candidateId),
  addOnboardingTask: (task: Omit<OnboardingTask, "id">): OnboardingTask => {
    const newTask: OnboardingTask = { id: uuidv4(), ...task };
    onboardingTasks.push(newTask);
    return newTask;
  },
  updateOnboardingTask: (task: OnboardingTask): OnboardingTask => {
    const index = onboardingTasks.findIndex(t => t.id === task.id);
    if (index !== -1) onboardingTasks[index] = task;
    return task;
  },
  deleteOnboardingTask: (id: string): boolean => {
    const index = onboardingTasks.findIndex(t => t.id === id);
    if (index !== -1) { onboardingTasks.splice(index, 1); return true; }
    return false;
  },

  // Analytics data
  getTimeToHireData: (): TimeToHireData[] => timeToHireData,
  getDiversityData: (): DiversityData => diversityData
};
