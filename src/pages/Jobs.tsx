
import { useState } from "react";
import { useVoiceTrigger } from "@/hooks/useVoiceTrigger";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus, Edit, ArrowUpRight, Briefcase, Building, Users } from "lucide-react";
import { mockDataService, Job } from "@/data/mockData";

export default function Jobs() {
  const [jobs, setJobs] = useState<Job[]>(mockDataService.getAllJobs());
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isJobDetailOpen, setIsJobDetailOpen] = useState(false);
  
  // Filter jobs based on search term
  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Group jobs by status
  const jobsByStatus = {
    Draft: filteredJobs.filter(job => job.status === 'Draft'),
    "Pending Approval": filteredJobs.filter(job => job.status === 'Pending Approval'),
    Published: filteredJobs.filter(job => job.status === 'Published'),
    "On Hold": filteredJobs.filter(job => job.status === 'On Hold'),
    Closed: filteredJobs.filter(job => job.status === 'Closed'),
  };
  
  // Voice tutorials
  const { voiceProps: jobsVoiceProps } = useVoiceTrigger({
    what: "This is the job management section where you can create, edit, and manage job postings.",
    how: "Click on any job card to view details or use the tabs to filter jobs by status. Use the 'New Job' button to create a new job posting."
  });
  
  const { voiceProps: searchVoiceProps } = useVoiceTrigger({
    what: "This is the search box for finding jobs by title, department, or location.",
    how: "Type a job title, department name, or location to filter the job listings."
  });
  
  const { voiceProps: newJobVoiceProps } = useVoiceTrigger({
    what: "This button creates a new job posting.",
    how: "Click here to start the job creation process. You'll be guided through a form to enter job details.",
    decision: "Before creating a new job, check if similar roles already exist to prevent duplication. Engineering already has 3 open positions."
  });
  
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Job Management</h1>
          <p className="text-gray-600">Create, publish and manage job openings</p>
        </div>
        <div>
          <Button {...newJobVoiceProps}>
            <Plus className="w-4 h-4 mr-2" />
            New Job
          </Button>
        </div>
      </div>
      
      <div className="mb-6 max-w-md" {...searchVoiceProps}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input 
            placeholder="Search jobs by title, department or location..." 
            className="pl-10" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <Tabs defaultValue="all" className="mb-6" {...jobsVoiceProps}>
        <TabsList>
          <TabsTrigger value="all">
            All ({filteredJobs.length})
          </TabsTrigger>
          <TabsTrigger value="draft">
            Draft ({jobsByStatus.Draft.length})
          </TabsTrigger>
          <TabsTrigger value="pending">
            Pending Approval ({jobsByStatus["Pending Approval"].length})
          </TabsTrigger>
          <TabsTrigger value="published">
            Published ({jobsByStatus.Published.length})
          </TabsTrigger>
          <TabsTrigger value="closed">
            Closed/On Hold ({jobsByStatus.Closed.length + jobsByStatus["On Hold"].length})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map(job => (
              <JobCard 
                key={job.id} 
                job={job} 
                onClick={() => {
                  setSelectedJob(job);
                  setIsJobDetailOpen(true);
                }}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="draft" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobsByStatus.Draft.map(job => (
              <JobCard 
                key={job.id} 
                job={job} 
                onClick={() => {
                  setSelectedJob(job);
                  setIsJobDetailOpen(true);
                }}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="pending" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobsByStatus["Pending Approval"].map(job => (
              <JobCard 
                key={job.id} 
                job={job} 
                onClick={() => {
                  setSelectedJob(job);
                  setIsJobDetailOpen(true);
                }}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="published" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobsByStatus.Published.map(job => (
              <JobCard 
                key={job.id} 
                job={job} 
                onClick={() => {
                  setSelectedJob(job);
                  setIsJobDetailOpen(true);
                }}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="closed" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...jobsByStatus.Closed, ...jobsByStatus["On Hold"]].map(job => (
              <JobCard 
                key={job.id} 
                job={job} 
                onClick={() => {
                  setSelectedJob(job);
                  setIsJobDetailOpen(true);
                }}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Job Detail Dialog */}
      {selectedJob && (
        <Dialog open={isJobDetailOpen} onOpenChange={setIsJobDetailOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Job Details</DialogTitle>
              <DialogDescription>Review and manage job information</DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">{selectedJob.title}</h2>
                <Badge variant={selectedJob.status === 'Published' ? 'default' : 'secondary'}>
                  {selectedJob.status}
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500 mb-1">Department</p>
                  <p className="font-medium">{selectedJob.department}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Location</p>
                  <p className="font-medium">{selectedJob.location}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Job Type</p>
                  <p className="font-medium">{selectedJob.type}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Salary Range</p>
                  <p className="font-medium">
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(selectedJob.salary.min)} - {' '}
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(selectedJob.salary.max)}
                  </p>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Description</h3>
                <p className="text-gray-700 mb-4">{selectedJob.description}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-2">Responsibilities</h3>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    {selectedJob.responsibilities.map((responsibility, index) => (
                      <li key={index}>{responsibility}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Requirements</h3>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    {selectedJob.requirements.map((requirement, index) => (
                      <li key={index}>{requirement}</li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Required Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedJob.skills.map(skill => (
                    <Badge key={skill} variant="outline">{skill}</Badge>
                  ))}
                </div>
              </div>
              
              {selectedJob.status === 'Pending Approval' && selectedJob.approvalWorkflow && (
                <div>
                  <h3 className="font-medium mb-2">Approval Workflow</h3>
                  <div className="border rounded-md p-4">
                    <p className="mb-2">Current Stage: <span className="font-medium">{selectedJob.approvalWorkflow.currentStage}</span></p>
                    <div className="space-y-3">
                      {selectedJob.approvalWorkflow.approvers.map((approver, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                          <div>
                            <p className="font-medium">{approver.name}</p>
                            <p className="text-sm text-gray-500">{approver.role}</p>
                          </div>
                          <Badge variant={approver.approved ? 'default' : 'outline'}>
                            {approver.approved ? 'Approved' : 'Pending'}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {selectedJob.status === 'Published' && (
                <div>
                  <h3 className="font-medium mb-2">Application Statistics</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border rounded-md p-4 text-center">
                      <p className="text-2xl font-bold">{selectedJob.applicantCount}</p>
                      <p className="text-gray-500">Total Applicants</p>
                    </div>
                    <div className="border rounded-md p-4 text-center">
                      <p className="text-2xl font-bold">{Math.floor(selectedJob.applicantCount * 0.3)}</p>
                      <p className="text-gray-500">Qualified Candidates</p>
                    </div>
                    <div className="border rounded-md p-4 text-center">
                      <p className="text-2xl font-bold">{Math.floor(Math.random() * 10) + 5}</p>
                      <p className="text-gray-500">Days Active</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex justify-between mt-6">
              <div>
                {selectedJob.status === 'Draft' && (
                  <Button variant="outline">
                    Delete Draft
                  </Button>
                )}
                {selectedJob.status === 'Published' && (
                  <Button variant="outline">
                    Pause Job
                  </Button>
                )}
              </div>
              <div className="flex space-x-2">
                <Button variant="outline">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Job
                </Button>
                {selectedJob.status === 'Draft' && (
                  <Button>
                    Submit for Approval
                  </Button>
                )}
                {selectedJob.status === 'Pending Approval' && (
                  <Button>
                    Approve & Publish
                  </Button>
                )}
                {selectedJob.status === 'Published' && (
                  <Button>
                    View Candidates
                  </Button>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

interface JobCardProps {
  job: Job;
  onClick?: () => void;
}

function JobCard({ job, onClick }: JobCardProps) {
  const { voiceProps } = useVoiceTrigger({
    what: `This is a job posting for ${job.title} in the ${job.department} department.`,
    how: "Click to view full details, edit the job description, or manage the approval workflow.",
    decision: job.status === 'Pending Approval' ? 
      "This job has been awaiting approval for 3 days. Consider sending a reminder to the approver." : 
      undefined
  });
  
  return (
    <Card 
      className="hover:shadow-md transition-shadow cursor-pointer" 
      onClick={onClick}
      {...voiceProps}
    >
      <CardContent className="pt-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
              {job.department.includes("Engineering") ? (
                <Building size={20} className="text-ats-primary" />
              ) : (
                <Briefcase size={20} className="text-ats-primary" />
              )}
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">{job.title}</h3>
              <p className="text-gray-600 text-sm">{job.department}</p>
            </div>
          </div>
          <Badge variant={job.status === 'Published' ? 'default' : 'secondary'}>
            {job.status}
          </Badge>
        </div>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600 text-sm">
            <Building size={14} className="mr-2" />
            {job.location}
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <Users size={14} className="mr-2" />
            {job.applicantCount} Applicants
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {job.skills.slice(0, 3).map(skill => (
            <Badge key={skill} variant="outline" className="text-xs">
              {skill}
            </Badge>
          ))}
          {job.skills.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{job.skills.length - 3} more
            </Badge>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="border-t pt-4 flex justify-between">
        <div className="text-sm text-gray-500">
          {job.postedDate ? `Posted: ${job.postedDate}` : 'Not published'}
        </div>
        <Button variant="ghost" size="sm" className="text-ats-primary">
          View Details
          <ArrowUpRight size={16} className="ml-1" />
        </Button>
      </CardFooter>
    </Card>
  );
}
