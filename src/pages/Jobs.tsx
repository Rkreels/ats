import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useVoiceTrigger } from "@/hooks/useVoiceTrigger";
import { useUser } from "@/contexts/UserContext";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import EnhancedVoiceTutorialListener from "@/components/voice/EnhancedVoiceTutorialListener";
import { mockDataService } from "@/data/mockData";
import { Job } from "@/types";
import JobForm from "@/components/jobs/JobForm";


export default function Jobs() {
  const { hasPermission } = useUser();
  const { toast } = useToast();
  const [jobs, setJobs] = useState<Job[]>(mockDataService.getAllJobs());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const handleOpenNewJobDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCreateJob = (jobData: any) => {
    const job = mockDataService.addJob(jobData);
    setJobs(mockDataService.getAllJobs());
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

  const handleUpdateJob = (jobData: any) => {
    if (!selectedJob) return;

    const updatedJob = { ...selectedJob, ...jobData };
    mockDataService.updateJob(updatedJob);
    setJobs(mockDataService.getAllJobs());
    setIsEditDialogOpen(false);
    setSelectedJob(null);

    toast({
      title: "Job updated",
      description: "The job posting has been updated successfully"
    });
  };

  const handleDeleteJob = (jobId: string) => {
    const success = mockDataService.deleteJob(jobId);
    if (success) {
      setJobs(mockDataService.getAllJobs());
      toast({
        title: "Job deleted",
        description: "The job posting has been deleted successfully"
      });
    }
  };

  const { voiceProps: jobsMainProps } = useVoiceTrigger({
    what: "This is the Jobs management page where you can create, edit, and manage job postings for your organization.",
    actionStep: "View existing jobs, create new ones, or edit job details using the available actions."
  });

  const { voiceProps: addJobProps } = useVoiceTrigger({
    what: "Create a new job posting by filling out the job details form.",
    actionStep: "Click to open the job creation form."
  });

  return (
    <div>
      <EnhancedVoiceTutorialListener
        selector="jobs-page"
        description="This is the Jobs management page where you can create, edit, and manage job postings for your organization."
        actionStep="View existing jobs, create new ones, or edit job details using the available actions."
        category="navigation"
        priority="high"
      >
        <Card {...jobsMainProps}>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Job Postings</CardTitle>
              <CardDescription>Manage your organization's job postings</CardDescription>
            </div>
            
            {hasPermission('canCreateJob') && (
              <Button onClick={handleOpenNewJobDialog} {...addJobProps}>
                Add New Job
              </Button>
            )}
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[600px]">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {jobs.map(job => (
                  <EnhancedVoiceTutorialListener
                    key={job.id}
                    selector={`job-card-${job.id}`}
                    description={`Job posting for ${job.title} in ${job.department}. Status: ${job.status}. ${job.applicants} applicants.`}
                    actionStep="Use the action buttons to view, edit, or delete this job posting."
                    category="info"
                    priority="medium"
                  >
                    <Card className="overflow-hidden">
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
                         <span className="text-sm ml-1">{job.type}</span>
                       </div>
                       <div>
                         <span className="text-sm font-medium">Salary Range:</span>
                         <span className="text-sm ml-1">{job.salary}</span>
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
                            what: `View details for ${job.title} position`,
                            actionStep: "Click to see full job details"
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
                              what: `Edit ${job.title} job posting`,
                              actionStep: "Click to modify job details"
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
                                  what: `Delete ${job.title} job posting`,
                                  actionStep: "This will permanently remove the job posting"
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
                  </EnhancedVoiceTutorialListener>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </EnhancedVoiceTutorialListener>

      {/* Create Job Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="w-[95vw] max-w-[900px] max-h-[90vh] overflow-auto p-4 sm:p-6">
          <DialogHeader>
            <DialogTitle>Create New Job Posting</DialogTitle>
            <DialogDescription>
              Fill in the details below to create a new job posting for your organization.
            </DialogDescription>
          </DialogHeader>
          <EnhancedVoiceTutorialListener
            selector="create-job-form"
            description="Form for creating a new job posting. Fill out all required fields."
            actionStep="Complete the form and click 'Create Job' to publish."
            category="form"
            priority="high"
          >
            <JobForm
              onSubmit={handleCreateJob}
              onCancel={() => setIsDialogOpen(false)}
              submitLabel="Create Job"
            />
          </EnhancedVoiceTutorialListener>
        </DialogContent>
      </Dialog>

      {/* Edit/View Job Dialog */}
      {selectedJob && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="w-[95vw] max-w-[900px] max-h-[90vh] overflow-auto p-4 sm:p-6">
            <DialogHeader>
              <DialogTitle>{isViewMode ? "View Job Posting" : "Edit Job Posting"}</DialogTitle>
              <DialogDescription>
                {isViewMode 
                  ? "Review the details of this job posting." 
                  : "Update the details of this job posting."}
              </DialogDescription>
            </DialogHeader>
            {isViewMode ? (
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Job Title</p>
                    <p className="text-base">{selectedJob.title}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Department</p>
                    <p className="text-base">{selectedJob.department}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Location</p>
                    <p className="text-base">{selectedJob.location}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Employment Type</p>
                    <p className="text-base">{selectedJob.type}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Status</p>
                    <p className="text-base">{selectedJob.status}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Salary Range</p>
                    <p className="text-base">{selectedJob.salary}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Description</p>
                  <p className="text-base mt-1">{selectedJob.description}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Requirements</p>
                  <ul className="list-disc list-inside mt-1">
                    {selectedJob.requirements.map((req, idx) => (
                      <li key={idx}>{req}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Applicants</p>
                  <p className="text-base">{selectedJob.applicants} candidates</p>
                </div>
                <Button onClick={() => setIsEditDialogOpen(false)} className="w-full">Close</Button>
              </div>
            ) : (
              <JobForm
                initialData={selectedJob}
                onSubmit={handleUpdateJob}
                onCancel={() => setIsEditDialogOpen(false)}
                submitLabel="Save Changes"
              />
            )}
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
