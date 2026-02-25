import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/contexts/UserContext";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { mockDataService } from "@/data/mockData";
import { Job } from "@/types";
import JobForm from "@/components/jobs/JobForm";
import { Eye, Pencil, Trash2, Plus } from "lucide-react";

export default function Jobs() {
  const { hasPermission } = useUser();
  const { toast } = useToast();
  const [jobs, setJobs] = useState<Job[]>(mockDataService.getAllJobs());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const handleCreateJob = (jobData: any) => {
    mockDataService.addJob(jobData);
    setJobs(mockDataService.getAllJobs());
    setIsDialogOpen(false);
    toast({ title: "Job created", description: "The job posting has been created successfully" });
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
    toast({ title: "Job updated", description: "The job posting has been updated successfully" });
  };

  const handleDeleteJob = (jobId: string) => {
    const success = mockDataService.deleteJob(jobId);
    if (success) {
      setJobs(mockDataService.getAllJobs());
      toast({ title: "Job deleted", description: "The job posting has been deleted successfully" });
    }
  };

  return (
    <div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Job Postings</CardTitle>
            <CardDescription>Manage your organization's job postings ({jobs.length} total)</CardDescription>
          </div>
          <Button onClick={() => setIsDialogOpen(true)} data-action="add-job">
            <Plus className="mr-2 h-4 w-4" /> Add New Job
          </Button>
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
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        job.status === "Published" ? "bg-green-100 text-green-800" :
                        job.status === "Draft" ? "bg-gray-100 text-gray-800" :
                        job.status === "Pending Approval" ? "bg-yellow-100 text-yellow-800" :
                        job.status === "Closed" ? "bg-red-100 text-red-800" :
                        "bg-blue-100 text-blue-800"
                      }`}>
                        {job.status}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-2 text-sm">
                      <div><span className="font-medium">Type:</span> {job.type}</div>
                      <div><span className="font-medium">Salary:</span> {job.salary}</div>
                      <div><span className="font-medium">Posted:</span> {job.postedDate}</div>
                      <div><span className="font-medium">Closing:</span> {job.closingDate}</div>
                      <div><span className="font-medium">Applicants:</span> {job.applicants}</div>
                    </div>
                    <div className="mt-4 flex justify-end space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => handleOpenEditDialog(job, true)}>
                        <Eye className="mr-1 h-4 w-4" /> View
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleOpenEditDialog(job, false)}>
                        <Pencil className="mr-1 h-4 w-4" /> Edit
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700">
                            <Trash2 className="mr-1 h-4 w-4" /> Delete
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently delete the "{job.title}" job posting.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDeleteJob(job.id)}>Delete</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
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
        <DialogContent className="w-[95vw] max-w-[900px] max-h-[90vh] overflow-auto p-4 sm:p-6">
          <DialogHeader>
            <DialogTitle>Create New Job Posting</DialogTitle>
            <DialogDescription>Fill in the details below to create a new job posting.</DialogDescription>
          </DialogHeader>
          <JobForm onSubmit={handleCreateJob} onCancel={() => setIsDialogOpen(false)} submitLabel="Create Job" />
        </DialogContent>
      </Dialog>

      {/* Edit/View Job Dialog */}
      {selectedJob && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="w-[95vw] max-w-[900px] max-h-[90vh] overflow-auto p-4 sm:p-6">
            <DialogHeader>
              <DialogTitle>{isViewMode ? "View Job Posting" : "Edit Job Posting"}</DialogTitle>
              <DialogDescription>
                {isViewMode ? "Review the details of this job posting." : "Update the details of this job posting."}
              </DialogDescription>
            </DialogHeader>
            {isViewMode ? (
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><p className="text-sm font-medium text-gray-500">Job Title</p><p>{selectedJob.title}</p></div>
                  <div><p className="text-sm font-medium text-gray-500">Department</p><p>{selectedJob.department}</p></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><p className="text-sm font-medium text-gray-500">Location</p><p>{selectedJob.location}</p></div>
                  <div><p className="text-sm font-medium text-gray-500">Employment Type</p><p>{selectedJob.type}</p></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><p className="text-sm font-medium text-gray-500">Status</p><p>{selectedJob.status}</p></div>
                  <div><p className="text-sm font-medium text-gray-500">Salary Range</p><p>{selectedJob.salary}</p></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><p className="text-sm font-medium text-gray-500">Hiring Manager</p><p>{selectedJob.hiringManager}</p></div>
                  <div><p className="text-sm font-medium text-gray-500">Applicants</p><p>{selectedJob.applicants} candidates</p></div>
                </div>
                <div><p className="text-sm font-medium text-gray-500">Description</p><p className="mt-1">{selectedJob.description}</p></div>
                <div><p className="text-sm font-medium text-gray-500">Requirements</p>
                  <ul className="list-disc list-inside mt-1">{selectedJob.requirements.map((req, idx) => <li key={idx}>{req}</li>)}</ul>
                </div>
                <div><p className="text-sm font-medium text-gray-500">Responsibilities</p>
                  <ul className="list-disc list-inside mt-1">{selectedJob.responsibilities.map((r, idx) => <li key={idx}>{r}</li>)}</ul>
                </div>
                {selectedJob.skills.length > 0 && (
                  <div><p className="text-sm font-medium text-gray-500">Skills</p><p className="mt-1">{selectedJob.skills.join(", ")}</p></div>
                )}
                <Button onClick={() => setIsEditDialogOpen(false)} className="w-full">Close</Button>
              </div>
            ) : (
              <JobForm initialData={selectedJob} onSubmit={handleUpdateJob} onCancel={() => setIsEditDialogOpen(false)} submitLabel="Save Changes" />
            )}
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
