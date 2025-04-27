
import { useState, useEffect, useCallback } from "react";
import { useVoiceTrigger } from "@/hooks/useVoiceTrigger";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { mockDataService } from "@/data/mockData";
import { Job } from "@/types";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";

const jobTypes = ["Full-time", "Part-time", "Contract", "Temporary", "Internship"];

export default function Jobs() {
  const { toast } = useToast();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [isCreateJobModalOpen, setIsCreateJobModalOpen] = useState(false);
  const [newJob, setNewJob] = useState<Omit<Job, 'id'>>({
    title: "",
    department: "",
    location: "",
    type: "Full-time",
    description: "",
    responsibilities: [],
    requirements: [],
    postedDate: new Date().toLocaleDateString(),
    closingDate: new Date().toLocaleDateString(),
    salary: "",
    status: "Draft",
    hiringManager: "",
    applicants: 0,
    skills: [],
  });
  
  useEffect(() => {
    setJobs(mockDataService.getAllJobs());
  }, []);
  
  const handleCreateJob = () => {
    const newJobWithId = { ...newJob, id: `j-${jobs.length + 1}` };
    setJobs([...jobs, newJobWithId]);
    // We need to modify this line as mockDataService doesn't have addJob method
    // Let's simulate adding the job to our local state only
    toast({
      title: "Job created",
      description: `The job "${newJob.title}" has been created.`
    });
    setIsCreateJobModalOpen(false);
  };
  
  const filteredJobs = jobs.filter(job => {
    const searchTermMatch = job.title.toLowerCase().includes(searchTerm.toLowerCase());
    const filterDepartmentMatch = filterDepartment ? job.department === filterDepartment : true;
    const filterTypeMatch = filterType ? job.type === filterType : true;
    const filterStatusMatch = filterStatus ? job.status === filterStatus : true;
    const dateMatch = date ? new Date(job.postedDate).getTime() === date.getTime() : true;
    
    return searchTermMatch && filterDepartmentMatch && filterTypeMatch && filterStatusMatch && dateMatch;
  });
  
  const { voiceProps: jobsOverviewProps } = useVoiceTrigger({
    what: "This is the jobs management section where you can create and manage job postings. Create new job postings, filter existing jobs, and track applicants for each position."
  });
  
  const { voiceProps: searchVoiceProps } = useVoiceTrigger({
    what: "Use this search bar to find jobs by title."
  });
  
  const { voiceProps: filterVoiceProps } = useVoiceTrigger({
    what: "Use these filters to narrow down jobs by department, type, and status."
  });
  
  const { voiceProps: createVoiceProps } = useVoiceTrigger({
    what: "Click this button to create a new job posting."
  });
  
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Job Postings</h1>
          <p className="text-gray-600">Manage your job openings and track applicants</p>
        </div>
        <Button onClick={() => setIsCreateJobModalOpen(true)} {...createVoiceProps}>
          Create Job
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6" {...jobsOverviewProps}>
        <Input 
          type="text" 
          placeholder="Search by job title..." 
          className="md:col-span-1" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          {...searchVoiceProps}
        />
        
        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4" {...filterVoiceProps}>
          <Select onValueChange={setFilterDepartment}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Departments</SelectItem>
              {[...new Set(jobs.map(job => job.department))].map(department => (
                <SelectItem key={department} value={department}>{department}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select onValueChange={setFilterType}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Types</SelectItem>
              {jobTypes.map(type => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select onValueChange={setFilterStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Statuses</SelectItem>
              {[...new Set(jobs.map(job => job.status))].map(status => (
                <SelectItem key={status} value={status}>{status}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="mb-6">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={""}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? new Date(date).toLocaleDateString() : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
              className="pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
      </div>
      
      <ScrollArea>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map(job => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </ScrollArea>
      
      {/* Create Job Modal */}
      {isCreateJobModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Create New Job</h2>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Job Title</Label>
                <Input 
                  type="text" 
                  id="title" 
                  value={newJob.title} 
                  onChange={(e) => setNewJob({ ...newJob, title: e.target.value })} 
                />
              </div>
              
              <div>
                <Label htmlFor="department">Department</Label>
                <Input 
                  type="text" 
                  id="department" 
                  value={newJob.department} 
                  onChange={(e) => setNewJob({ ...newJob, department: e.target.value })} 
                />
              </div>
              
              <div>
                <Label htmlFor="location">Location</Label>
                <Input 
                  type="text" 
                  id="location" 
                  value={newJob.location} 
                  onChange={(e) => setNewJob({ ...newJob, location: e.target.value })} 
                />
              </div>
              
              <div>
                <Label htmlFor="type">Type</Label>
                <Select defaultValue={newJob.type} onValueChange={(value) => setNewJob({ ...newJob, type: value as "Full-time" | "Part-time" | "Contract" | "Temporary" | "Internship" })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a job type" />
                  </SelectTrigger>
                  <SelectContent>
                    {jobTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="salary">Salary</Label>
                <Input 
                  type="text" 
                  id="salary" 
                  value={newJob.salary} 
                  onChange={(e) => setNewJob({ ...newJob, salary: e.target.value })} 
                />
              </div>
              
              <div>
                <Label htmlFor="hiringManager">Hiring Manager</Label>
                <Input 
                  type="text" 
                  id="hiringManager" 
                  value={newJob.hiringManager} 
                  onChange={(e) => setNewJob({ ...newJob, hiringManager: e.target.value })} 
                />
              </div>
            </div>
            
            <div className="flex justify-end gap-4 mt-6">
              <Button variant="ghost" onClick={() => setIsCreateJobModalOpen(false)}>Cancel</Button>
              <Button onClick={handleCreateJob}>Create</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const { voiceProps } = useVoiceTrigger({
    what: `This is a job posting for the position of ${job.title} in the ${job.department} department. It is a ${job.type} position with a salary range of ${job.salary}.`
  });
  
  return (
    <Card {...voiceProps}>
      <CardHeader>
        <CardTitle>{job.title}</CardTitle>
        <CardDescription>{job.department}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <p>{job.location}</p>
        <Badge>{job.type}</Badge>
        <p className="text-sm text-gray-500">{job.applicants} applicants</p>
      </CardContent>
    </Card>
  );
};
