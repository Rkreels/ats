
import { useState, useEffect, useCallback } from "react";
import { useVoiceTrigger } from "@/hooks/useVoiceTrigger";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Pencil, Trash2, ExternalLink, BriefcaseIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { mockDataService } from "@/data/mockData";
import { Job } from "@/types";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/contexts/UserContext";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

const jobTypes = ["Full-time", "Part-time", "Contract", "Temporary", "Internship"];

export default function Jobs() {
  const { toast } = useToast();
  const { hasPermission, permissions } = useUser();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [isCreateJobModalOpen, setIsCreateJobModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isViewJobModalOpen, setIsViewJobModalOpen] = useState(false);
  
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
    const fetchedJobs = mockDataService.getAllJobs();
    setJobs(fetchedJobs);
  }, []);
  
  // Reset form state when opening the modal
  useEffect(() => {
    if (isCreateJobModalOpen && !isEditMode) {
      setNewJob({
        title: "",
        department: "",
        location: "",
        type: "Full-time",
        description: "",
        responsibilities: [],
        requirements: [],
        postedDate: new Date().toLocaleDateString(),
        closingDate: (new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)).toLocaleDateString(),
        salary: "",
        status: "Draft",
        hiringManager: "",
        applicants: 0,
        skills: [],
      });
    }
  }, [isCreateJobModalOpen, isEditMode]);

  const handleCreateJob = () => {
    if (!newJob.title || !newJob.department || !newJob.location) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    if (isEditMode && selectedJob) {
      // Update existing job
      const updatedJob = { ...selectedJob, ...newJob };
      setJobs(jobs.map(job => job.id === selectedJob.id ? updatedJob : job));
      toast({
        title: "Job updated",
        description: `The job "${newJob.title}" has been updated.`
      });
    } else {
      // Create new job
      const newJobWithId = { ...newJob, id: `j-${Date.now()}` };
      setJobs([...jobs, newJobWithId]);
      toast({
        title: "Job created",
        description: `The job "${newJob.title}" has been created.`
      });
    }
    
    setIsCreateJobModalOpen(false);
    setIsEditMode(false);
    setSelectedJob(null);
  };

  const handleEditJob = (job: Job) => {
    setSelectedJob(job);
    setNewJob({
      title: job.title,
      department: job.department,
      location: job.location,
      type: job.type,
      description: job.description,
      responsibilities: job.responsibilities,
      requirements: job.requirements,
      postedDate: job.postedDate,
      closingDate: job.closingDate,
      salary: job.salary,
      status: job.status,
      hiringManager: job.hiringManager,
      applicants: job.applicants,
      skills: job.skills,
    });
    setIsEditMode(true);
    setIsCreateJobModalOpen(true);
  };

  const handleViewJob = (job: Job) => {
    setSelectedJob(job);
    setIsViewJobModalOpen(true);
  };

  const handleDeleteJob = (jobId: string) => {
    setJobs(jobs.filter(job => job.id !== jobId));
    toast({
      title: "Job deleted",
      description: "The job has been deleted."
    });
  };
  
  const handleResponsibilitiesChange = (value: string) => {
    if (!value) {
      setNewJob({...newJob, responsibilities: []});
      return;
    }
    
    const responsibilities = value.split('\n').filter(item => item.trim() !== '');
    setNewJob({...newJob, responsibilities});
  };
  
  const handleRequirementsChange = (value: string) => {
    if (!value) {
      setNewJob({...newJob, requirements: []});
      return;
    }
    
    const requirements = value.split('\n').filter(item => item.trim() !== '');
    setNewJob({...newJob, requirements});
  };
  
  const handleSkillsChange = (value: string) => {
    if (!value) {
      setNewJob({...newJob, skills: []});
      return;
    }
    
    const skills = value.split(',').map(s => s.trim()).filter(s => s !== '');
    setNewJob({...newJob, skills});
  };

  const filteredJobs = jobs.filter(job => {
    const searchTermMatch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           job.department.toLowerCase().includes(searchTerm.toLowerCase());
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
    what: "Use this search bar to find jobs by title or department."
  });
  
  const { voiceProps: filterVoiceProps } = useVoiceTrigger({
    what: "Use these filters to narrow down jobs by department, type, and status."
  });
  
  const { voiceProps: createVoiceProps } = useVoiceTrigger({
    what: "Click this button to create a new job posting. Only users with job creation permissions can use this feature."
  });
  
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Job Postings</h1>
          <p className="text-gray-600">Manage your job openings and track applicants</p>
        </div>
        {hasPermission('canCreateJob') && (
          <Button onClick={() => {
            setIsEditMode(false);
            setSelectedJob(null);
            setIsCreateJobModalOpen(true);
          }} {...createVoiceProps}>
            Create Job
          </Button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6" {...jobsOverviewProps}>
        <Input 
          type="text" 
          placeholder="Search by job title or department..." 
          className="md:col-span-1" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          {...searchVoiceProps}
        />
        
        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4" {...filterVoiceProps}>
          <Select onValueChange={setFilterDepartment} value={filterDepartment}>
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
          
          <Select onValueChange={setFilterType} value={filterType}>
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
          
          <Select onValueChange={setFilterStatus} value={filterStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Statuses</SelectItem>
              {[...new Set(jobs.map(job => job.status))].filter(Boolean).map(status => (
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
              {date ? new Date(date).toLocaleDateString() : <span>Filter by post date</span>}
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
      
      {filteredJobs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 bg-gray-50 border rounded-md">
          <BriefcaseIcon className="h-16 w-16 text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900">No jobs found</h3>
          <p className="text-gray-500 text-center max-w-md mt-2">
            There are no jobs matching your search criteria. Try adjusting your filters or create a new job.
          </p>
          {hasPermission('canCreateJob') && (
            <Button
              onClick={() => {
                setIsEditMode(false);
                setSelectedJob(null);
                setIsCreateJobModalOpen(true);
              }}
              className="mt-4"
            >
              Create Job
            </Button>
          )}
        </div>
      ) : (
        <ScrollArea className="h-[calc(100vh-320px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map(job => (
              <JobCard 
                key={job.id} 
                job={job}
                onView={handleViewJob}
                onEdit={hasPermission('canEditJob') ? handleEditJob : undefined} 
                onDelete={hasPermission('canDeleteJob') ? handleDeleteJob : undefined} 
              />
            ))}
          </div>
        </ScrollArea>
      )}
      
      {/* Create/Edit Job Modal */}
      {isCreateJobModalOpen && (
        <Dialog open={isCreateJobModalOpen} onOpenChange={setIsCreateJobModalOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>{isEditMode ? 'Edit Job' : 'Create New Job'}</DialogTitle>
              <DialogDescription>
                {isEditMode ? 'Update the job details below.' : 'Fill in the details to create a new job posting.'}
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[calc(100vh-250px)] overflow-y-auto p-1">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Job Title *</Label>
                  <Input 
                    type="text" 
                    id="title" 
                    value={newJob.title} 
                    onChange={(e) => setNewJob({ ...newJob, title: e.target.value })} 
                    placeholder="e.g. Senior Frontend Developer"
                  />
                </div>
                
                <div>
                  <Label htmlFor="department">Department *</Label>
                  <Input 
                    type="text" 
                    id="department" 
                    value={newJob.department} 
                    onChange={(e) => setNewJob({ ...newJob, department: e.target.value })} 
                    placeholder="e.g. Engineering"
                  />
                </div>
                
                <div>
                  <Label htmlFor="location">Location *</Label>
                  <Input 
                    type="text" 
                    id="location" 
                    value={newJob.location} 
                    onChange={(e) => setNewJob({ ...newJob, location: e.target.value })} 
                    placeholder="e.g. San Francisco, CA (Remote)"
                  />
                </div>
                
                <div>
                  <Label htmlFor="salary">Salary Range</Label>
                  <Input 
                    type="text" 
                    id="salary" 
                    value={newJob.salary} 
                    onChange={(e) => setNewJob({ ...newJob, salary: e.target.value })} 
                    placeholder="e.g. $100,000 - $130,000"
                  />
                </div>
                
                <div>
                  <Label htmlFor="hiringManager">Hiring Manager</Label>
                  <Input 
                    type="text" 
                    id="hiringManager" 
                    value={newJob.hiringManager} 
                    onChange={(e) => setNewJob({ ...newJob, hiringManager: e.target.value })} 
                    placeholder="e.g. John Smith"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="type">Type</Label>
                    <Select 
                      value={newJob.type} 
                      onValueChange={(value: string) => setNewJob({ ...newJob, type: value })}
                    >
                      <SelectTrigger id="type">
                        <SelectValue placeholder="Select job type" />
                      </SelectTrigger>
                      <SelectContent>
                        {jobTypes.map(type => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select 
                      value={newJob.status} 
                      onValueChange={(value: string) => setNewJob({ ...newJob, status: value })}
                    >
                      <SelectTrigger id="status">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Draft">Draft</SelectItem>
                        <SelectItem value="Published">Published</SelectItem>
                        <SelectItem value="Closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="description">Job Description</Label>
                  <Textarea 
                    id="description" 
                    value={newJob.description} 
                    onChange={(e) => setNewJob({ ...newJob, description: e.target.value })} 
                    placeholder="Enter a detailed job description"
                    className="min-h-[120px]"
                  />
                </div>
                
                <div>
                  <Label htmlFor="responsibilities">Responsibilities (one per line)</Label>
                  <Textarea 
                    id="responsibilities" 
                    value={newJob.responsibilities.join('\n')} 
                    onChange={(e) => handleResponsibilitiesChange(e.target.value)} 
                    placeholder="Enter job responsibilities (one per line)"
                    className="min-h-[100px]"
                  />
                </div>
                
                <div>
                  <Label htmlFor="requirements">Requirements (one per line)</Label>
                  <Textarea 
                    id="requirements" 
                    value={newJob.requirements.join('\n')} 
                    onChange={(e) => handleRequirementsChange(e.target.value)} 
                    placeholder="Enter job requirements (one per line)"
                    className="min-h-[100px]"
                  />
                </div>
                
                <div>
                  <Label htmlFor="skills">Skills (comma separated)</Label>
                  <Input 
                    id="skills" 
                    value={newJob.skills.join(', ')} 
                    onChange={(e) => handleSkillsChange(e.target.value)}
                    placeholder="e.g. React, TypeScript, CSS"
                  />
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateJobModalOpen(false)}>Cancel</Button>
              <Button onClick={handleCreateJob}>{isEditMode ? 'Update Job' : 'Create Job'}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      
      {/* View Job Modal */}
      {isViewJobModalOpen && selectedJob && (
        <Dialog open={isViewJobModalOpen} onOpenChange={setIsViewJobModalOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle className="text-xl">{selectedJob.title}</DialogTitle>
              <DialogDescription className="flex flex-wrap gap-2 mt-2">
                <Badge>{selectedJob.type}</Badge>
                <Badge variant={selectedJob.status === "Published" ? "default" : selectedJob.status === "Draft" ? "secondary" : "outline"}>
                  {selectedJob.status}
                </Badge>
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6 max-h-[calc(100vh-250px)] overflow-y-auto p-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Department</h3>
                  <p className="text-base">{selectedJob.department}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Location</h3>
                  <p className="text-base">{selectedJob.location}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Salary</h3>
                  <p className="text-base">{selectedJob.salary}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Hiring Manager</h3>
                  <p className="text-base">{selectedJob.hiringManager}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Posted Date</h3>
                  <p className="text-base">{selectedJob.postedDate}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Closing Date</h3>
                  <p className="text-base">{selectedJob.closingDate}</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Job Description</h3>
                <p className="text-base whitespace-pre-wrap">{selectedJob.description}</p>
              </div>
              
              {selectedJob.responsibilities.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Responsibilities</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {selectedJob.responsibilities.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {selectedJob.requirements.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Requirements</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {selectedJob.requirements.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {selectedJob.skills.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedJob.skills.map((skill, index) => (
                      <Badge key={index} variant="outline">{skill}</Badge>
                    ))}
                  </div>
                </div>
              )}
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Applicants</h3>
                <p className="text-base">{selectedJob.applicants} applicant{selectedJob.applicants !== 1 ? 's' : ''}</p>
              </div>
            </div>
            
            <DialogFooter className="gap-2">
              {hasPermission('canEditJob') && (
                <Button variant="outline" onClick={() => {
                  setIsViewJobModalOpen(false);
                  handleEditJob(selectedJob);
                }}>
                  Edit Job
                </Button>
              )}
              <Button variant="default">
                View Applicants
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

interface JobCardProps {
  job: Job;
  onView: (job: Job) => void;
  onEdit?: (job: Job) => void;
  onDelete?: (jobId: string) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onView, onEdit, onDelete }) => {
  const { voiceProps } = useVoiceTrigger({
    what: `This is a job posting for the position of ${job.title} in the ${job.department} department. It is a ${job.type} position with a salary range of ${job.salary}.`
  });
  
  return (
    <Card {...voiceProps} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => onView(job)}>
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <div>
            <CardTitle className="text-lg line-clamp-2">{job.title}</CardTitle>
            <CardDescription>{job.department}</CardDescription>
          </div>
          <div className="flex space-x-1">
            {onEdit && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 p-0" 
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(job);
                }}
                {...useVoiceTrigger({ what: "Edit this job posting" }).voiceProps}
              >
                <Pencil size={16} />
                <span className="sr-only">Edit</span>
              </Button>
            )}
            {onDelete && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50" 
                    onClick={(e) => e.stopPropagation()}
                    {...useVoiceTrigger({ what: "Delete this job posting" }).voiceProps}
                  >
                    <Trash2 size={16} />
                    <span className="sr-only">Delete</span>
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently delete the job posting for "{job.title}". This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => {
                      onDelete(job.id);
                    }}>Delete</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-sm">{job.location}</p>
        <div className="flex flex-wrap gap-2">
          <Badge>{job.type}</Badge>
          <Badge variant={job.status === "Published" ? "default" : job.status === "Draft" ? "secondary" : "outline"}>
            {job.status}
          </Badge>
        </div>
        {job.skills && job.skills.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {job.skills.slice(0, 3).map((skill, i) => (
              <Badge key={i} variant="outline" className="text-xs">{skill}</Badge>
            ))}
            {job.skills.length > 3 && (
              <Badge variant="outline" className="text-xs">+{job.skills.length - 3}</Badge>
            )}
          </div>
        )}
        <div className="flex justify-between items-center mt-2">
          <p className="text-sm text-gray-500">{job.applicants} applicants</p>
          <Button variant="link" size="sm" className="p-0 h-auto" asChild>
            <div className="flex items-center">
              View <ExternalLink className="ml-1 h-3 w-3" />
            </div>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
