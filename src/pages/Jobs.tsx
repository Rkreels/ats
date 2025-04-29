
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useVoiceTrigger } from "@/hooks/useVoiceTrigger";
import { useUser } from "@/contexts/UserContext";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

// Job type definition
type JobEmploymentType = "Full-time" | "Part-time" | "Contract" | "Temporary" | "Internship";
type JobStatus = "Draft" | "Pending Approval" | "Published" | "Closed" | "On Hold";

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  employmentType: JobEmploymentType;
  status: JobStatus;
  description: string;
  requirements: string;
  postedDate: string;
  closingDate: string;
  salaryRange: string;
  applicants: number;
}

// Initial jobs data
const initialJobs: Job[] = [
  {
    id: "job-1",
    title: "Senior Frontend Developer",
    department: "Engineering",
    location: "Remote",
    employmentType: "Full-time",
    status: "Published",
    description: "We're looking for a Senior Frontend Developer to join our team and help build amazing user experiences.",
    requirements: "5+ years of experience with React, TypeScript, and modern frontend frameworks.",
    postedDate: "2025-04-01",
    closingDate: "2025-05-01",
    salaryRange: "$120,000 - $150,000",
    applicants: 24
  },
  {
    id: "job-2",
    title: "UX/UI Designer",
    department: "Design",
    location: "San Francisco, CA",
    employmentType: "Full-time",
    status: "Published",
    description: "We're seeking a talented UX/UI Designer to create beautiful, functional interfaces for our products.",
    requirements: "3+ years of experience in UX/UI design. Proficiency with Figma, Adobe Creative Suite.",
    postedDate: "2025-03-25",
    closingDate: "2025-04-25",
    salaryRange: "$90,000 - $120,000",
    applicants: 18
  },
  {
    id: "job-3",
    title: "DevOps Engineer",
    department: "Operations",
    location: "New York, NY",
    employmentType: "Full-time",
    status: "Draft",
    description: "We need a DevOps Engineer to help us build and maintain our infrastructure and deployment pipelines.",
    requirements: "Experience with AWS, Kubernetes, CI/CD pipelines. Strong scripting skills.",
    postedDate: "2025-04-10",
    closingDate: "2025-05-10",
    salaryRange: "$130,000 - $160,000",
    applicants: 0
  },
  {
    id: "job-4",
    title: "Marketing Specialist",
    department: "Marketing",
    location: "Chicago, IL",
    employmentType: "Full-time",
    status: "Published",
    description: "Join our marketing team to help drive growth and brand awareness.",
    requirements: "3+ years of experience in digital marketing. Experience with Google Analytics and ad platforms.",
    postedDate: "2025-03-15",
    closingDate: "2025-04-15",
    salaryRange: "$75,000 - $95,000",
    applicants: 32
  },
  {
    id: "job-5",
    title: "Customer Support Representative",
    department: "Customer Success",
    location: "Remote",
    employmentType: "Part-time",
    status: "Published",
    description: "Help our customers succeed by providing exceptional support and guidance.",
    requirements: "Previous customer service experience. Excellent communication skills.",
    postedDate: "2025-04-05",
    closingDate: "2025-05-05",
    salaryRange: "$25 - $30 per hour",
    applicants: 45
  },
  {
    id: "job-6",
    title: "Product Manager",
    department: "Product",
    location: "Austin, TX",
    employmentType: "Full-time",
    status: "Pending Approval",
    description: "Lead the development of our new product line from conception to launch.",
    requirements: "5+ years of experience in product management. Technical background preferred.",
    postedDate: "2025-04-12",
    closingDate: "2025-05-12",
    salaryRange: "$110,000 - $140,000",
    applicants: 0
  },
  {
    id: "job-7",
    title: "Data Scientist",
    department: "Data",
    location: "Boston, MA",
    employmentType: "Contract",
    status: "Published",
    description: "Analyze data to provide insights and build predictive models.",
    requirements: "Advanced degree in Statistics, Mathematics, or Computer Science. Experience with Python and ML frameworks.",
    postedDate: "2025-03-20",
    closingDate: "2025-04-20",
    salaryRange: "$80,000 - $100,000",
    applicants: 15
  }
];

export default function Jobs() {
  const { hasPermission } = useUser();
  const { toast } = useToast();
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  
  // Form state for new job
  const [newJob, setNewJob] = useState<Omit<Job, "id" | "applicants">>({
    title: "",
    department: "",
    location: "",
    employmentType: "Full-time",
    status: "Draft",
    description: "",
    requirements: "",
    postedDate: new Date().toISOString().split('T')[0],
    closingDate: "",
    salaryRange: ""
  });

  // Voice tutorials for job management
  const { voiceProps: jobListProps } = useVoiceTrigger({
    what: "This is the job management page where you can view, create, edit, and delete job postings for your organization."
  });

  const { voiceProps: addJobButtonProps } = useVoiceTrigger({
    what: "Click this button to create a new job posting. You'll need to fill in details like the job title, description, and requirements."
  });

  const handleOpenNewJobDialog = () => {
    // Reset form state when opening the dialog
    setNewJob({
      title: "",
      department: "",
      location: "",
      employmentType: "Full-time",
      status: "Draft",
      description: "",
      requirements: "",
      postedDate: new Date().toISOString().split('T')[0],
      closingDate: "",
      salaryRange: ""
    });
    
    setIsDialogOpen(true);
  };

  const handleCreateJob = () => {
    // Validate form
    if (!newJob.title || !newJob.department || !newJob.location) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const job: Job = {
      id: `job-${Date.now()}`,
      ...newJob,
      applicants: 0
    };

    setJobs([job, ...jobs]);
    setIsDialogOpen(false);

    toast({
      title: "Job created",
      description: "The job posting has been created successfully"
    });
  };

  const handleOpenEditDialog = (job: Job, viewOnly: boolean = false) => {
    setSelectedJob(job);
    setIsViewMode(viewOnly);
    setIsEditDialogOpen(true);
  };

  const handleUpdateJob = () => {
    if (!selectedJob) return;

    // Validate form
    if (!selectedJob.title || !selectedJob.department || !selectedJob.location) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setJobs(jobs.map(job => job.id === selectedJob.id ? selectedJob : job));
    setIsEditDialogOpen(false);
    setSelectedJob(null);

    toast({
      title: "Job updated",
      description: "The job posting has been updated successfully"
    });
  };

  const handleDeleteJob = (jobId: string) => {
    setJobs(jobs.filter(job => job.id !== jobId));

    toast({
      title: "Job deleted",
      description: "The job posting has been deleted successfully"
    });
  };

  return (
    <div>
      <Card {...jobListProps}>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Job Postings</CardTitle>
            <CardDescription>Manage your organization's job postings</CardDescription>
          </div>
          
          {hasPermission('canCreateJob') && (
            <Button {...addJobButtonProps} onClick={handleOpenNewJobDialog}>
              Add New Job
            </Button>
          )}
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {jobs.map(job => (
                <Card key={job.id} className="overflow-hidden">
                  <CardHeader className="bg-gray-50 p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{job.title}</CardTitle>
                        <CardDescription>{job.department} • {job.location}</CardDescription>
                      </div>
                      <div>
                        <span 
                          className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                            job.status === "Published" ? "bg-green-100 text-green-800" :
                            job.status === "Draft" ? "bg-gray-100 text-gray-800" :
                            job.status === "Pending Approval" ? "bg-yellow-100 text-yellow-800" :
                            job.status === "Closed" ? "bg-red-100 text-red-800" :
                            "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {job.status}
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div>
                        <span className="text-sm font-medium">Employment Type:</span>
                        <span className="text-sm ml-1">{job.employmentType}</span>
                      </div>
                      <div>
                        <span className="text-sm font-medium">Salary Range:</span>
                        <span className="text-sm ml-1">{job.salaryRange}</span>
                      </div>
                      <div>
                        <span className="text-sm font-medium">Posted:</span>
                        <span className="text-sm ml-1">{job.postedDate}</span>
                      </div>
                      <div>
                        <span className="text-sm font-medium">Closing:</span>
                        <span className="text-sm ml-1">{job.closingDate}</span>
                      </div>
                      <div>
                        <span className="text-sm font-medium">Applicants:</span>
                        <span className="text-sm ml-1">{job.applicants}</span>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleOpenEditDialog(job, true)}
                        {...useVoiceTrigger({ 
                          what: "View the full details of this job posting, including the complete description and requirements." 
                        }).voiceProps}
                      >
                        View
                      </Button>
                      
                      {hasPermission('canEditJob') && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleOpenEditDialog(job, false)}
                          {...useVoiceTrigger({ 
                            what: "Edit this job posting to update its details, requirements, or status." 
                          }).voiceProps}
                        >
                          Edit
                        </Button>
                      )}
                      
                      {hasPermission('canDeleteJob') && (
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="text-red-500 hover:text-red-700"
                              {...useVoiceTrigger({ 
                                what: "Delete this job posting. This will permanently remove it from your system." 
                              }).voiceProps}
                            >
                              Delete
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This will permanently delete the job posting and cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDeleteJob(job.id)}>Delete</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Create Job Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Job Posting</DialogTitle>
            <DialogDescription>
              Fill in the details below to create a new job posting for your organization.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Job Title*</Label>
                <Input 
                  id="title" 
                  placeholder="e.g. Senior Frontend Developer"
                  value={newJob.title}
                  onChange={(e) => setNewJob({...newJob, title: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department*</Label>
                <Input 
                  id="department" 
                  placeholder="e.g. Engineering"
                  value={newJob.department}
                  onChange={(e) => setNewJob({...newJob, department: e.target.value})}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">Location*</Label>
                <Input 
                  id="location" 
                  placeholder="e.g. Remote, New York, NY"
                  value={newJob.location}
                  onChange={(e) => setNewJob({...newJob, location: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="salary-range">Salary Range</Label>
                <Input 
                  id="salary-range" 
                  placeholder="e.g. $80,000 - $100,000"
                  value={newJob.salaryRange}
                  onChange={(e) => setNewJob({...newJob, salaryRange: e.target.value})}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="employment-type">Employment Type*</Label>
                <Select 
                  value={newJob.employmentType} 
                  onValueChange={(value: JobEmploymentType) => setNewJob({...newJob, employmentType: value})}
                >
                  <SelectTrigger id="employment-type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Full-time">Full-time</SelectItem>
                    <SelectItem value="Part-time">Part-time</SelectItem>
                    <SelectItem value="Contract">Contract</SelectItem>
                    <SelectItem value="Temporary">Temporary</SelectItem>
                    <SelectItem value="Internship">Internship</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status*</Label>
                <Select 
                  value={newJob.status} 
                  onValueChange={(value: JobStatus) => setNewJob({...newJob, status: value})}
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Pending Approval">Pending Approval</SelectItem>
                    <SelectItem value="Published">Published</SelectItem>
                    <SelectItem value="Closed">Closed</SelectItem>
                    <SelectItem value="On Hold">On Hold</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="posting-date">Posting Date*</Label>
                <Input 
                  id="posting-date" 
                  type="date"
                  value={newJob.postedDate}
                  onChange={(e) => setNewJob({...newJob, postedDate: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="closing-date">Closing Date*</Label>
                <Input 
                  id="closing-date" 
                  type="date"
                  value={newJob.closingDate}
                  onChange={(e) => setNewJob({...newJob, closingDate: e.target.value})}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="job-description">Job Description*</Label>
              <Textarea 
                id="job-description" 
                placeholder="Enter a detailed description of the job..."
                className="min-h-[100px]"
                value={newJob.description}
                onChange={(e) => setNewJob({...newJob, description: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="job-requirements">Requirements*</Label>
              <Textarea 
                id="job-requirements" 
                placeholder="List the skills, experience, and qualifications required..."
                className="min-h-[100px]"
                value={newJob.requirements}
                onChange={(e) => setNewJob({...newJob, requirements: e.target.value})}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleCreateJob}>Create Job</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit/View Job Dialog */}
      {selectedJob && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{isViewMode ? "View Job Posting" : "Edit Job Posting"}</DialogTitle>
              <DialogDescription>
                {isViewMode 
                  ? "Review the details of this job posting." 
                  : "Update the details of this job posting."}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-title">Job Title*</Label>
                  <Input 
                    id="edit-title" 
                    value={selectedJob.title}
                    onChange={(e) => setSelectedJob({...selectedJob, title: e.target.value})}
                    readOnly={isViewMode}
                    className={isViewMode ? "bg-gray-100" : ""}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-department">Department*</Label>
                  <Input 
                    id="edit-department" 
                    value={selectedJob.department}
                    onChange={(e) => setSelectedJob({...selectedJob, department: e.target.value})}
                    readOnly={isViewMode}
                    className={isViewMode ? "bg-gray-100" : ""}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-location">Location*</Label>
                  <Input 
                    id="edit-location" 
                    value={selectedJob.location}
                    onChange={(e) => setSelectedJob({...selectedJob, location: e.target.value})}
                    readOnly={isViewMode}
                    className={isViewMode ? "bg-gray-100" : ""}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-salary-range">Salary Range</Label>
                  <Input 
                    id="edit-salary-range" 
                    value={selectedJob.salaryRange}
                    onChange={(e) => setSelectedJob({...selectedJob, salaryRange: e.target.value})}
                    readOnly={isViewMode}
                    className={isViewMode ? "bg-gray-100" : ""}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-employment-type">Employment Type*</Label>
                  {isViewMode ? (
                    <Input 
                      id="edit-employment-type" 
                      value={selectedJob.employmentType}
                      readOnly
                      className="bg-gray-100"
                    />
                  ) : (
                    <Select 
                      value={selectedJob.employmentType} 
                      onValueChange={(value: JobEmploymentType) => setSelectedJob({...selectedJob, employmentType: value})}
                    >
                      <SelectTrigger id="edit-employment-type">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Full-time">Full-time</SelectItem>
                        <SelectItem value="Part-time">Part-time</SelectItem>
                        <SelectItem value="Contract">Contract</SelectItem>
                        <SelectItem value="Temporary">Temporary</SelectItem>
                        <SelectItem value="Internship">Internship</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-status">Status*</Label>
                  {isViewMode ? (
                    <Input 
                      id="edit-status" 
                      value={selectedJob.status}
                      readOnly
                      className="bg-gray-100"
                    />
                  ) : (
                    <Select 
                      value={selectedJob.status} 
                      onValueChange={(value: JobStatus) => setSelectedJob({...selectedJob, status: value})}
                    >
                      <SelectTrigger id="edit-status">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Draft">Draft</SelectItem>
                        <SelectItem value="Pending Approval">Pending Approval</SelectItem>
                        <SelectItem value="Published">Published</SelectItem>
                        <SelectItem value="Closed">Closed</SelectItem>
                        <SelectItem value="On Hold">On Hold</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-posting-date">Posting Date*</Label>
                  <Input 
                    id="edit-posting-date" 
                    type="date"
                    value={selectedJob.postedDate}
                    onChange={(e) => setSelectedJob({...selectedJob, postedDate: e.target.value})}
                    readOnly={isViewMode}
                    className={isViewMode ? "bg-gray-100" : ""}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-closing-date">Closing Date*</Label>
                  <Input 
                    id="edit-closing-date" 
                    type="date"
                    value={selectedJob.closingDate}
                    onChange={(e) => setSelectedJob({...selectedJob, closingDate: e.target.value})}
                    readOnly={isViewMode}
                    className={isViewMode ? "bg-gray-100" : ""}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-job-description">Job Description*</Label>
                <Textarea 
                  id="edit-job-description" 
                  className="min-h-[100px]"
                  value={selectedJob.description}
                  onChange={(e) => setSelectedJob({...selectedJob, description: e.target.value})}
                  readOnly={isViewMode}
                  disabled={isViewMode}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-job-requirements">Requirements*</Label>
                <Textarea 
                  id="edit-job-requirements" 
                  className="min-h-[100px]"
                  value={selectedJob.requirements}
                  onChange={(e) => setSelectedJob({...selectedJob, requirements: e.target.value})}
                  readOnly={isViewMode}
                  disabled={isViewMode}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Applicants</Label>
                <div className="bg-gray-50 p-3 rounded-md">
                  <span className="text-lg font-semibold">{selectedJob.applicants}</span>
                  <span className="text-gray-500 ml-2">candidates have applied to this position</span>
                </div>
              </div>
            </div>
            <DialogFooter>
              {isViewMode ? (
                <Button onClick={() => setIsEditDialogOpen(false)}>Close</Button>
              ) : (
                <>
                  <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
                  <Button onClick={handleUpdateJob}>Save Changes</Button>
                </>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
