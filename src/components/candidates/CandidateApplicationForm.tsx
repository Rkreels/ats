import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useVoiceTrigger } from "@/hooks/useVoiceTrigger";
import { mockDataService } from "@/data/mockData";
import VoiceTutorialListener from "@/components/voice/VoiceTutorialListener";

interface ApplicationFormData {
  candidateId: string;
  jobId: string;
  coverLetter: string;
  applicationNotes: string;
  expectedSalary: string;
  availabilityDate: string;
  applicationSource: string;
}

interface CandidateApplicationFormProps {
  candidateId: string;
  onSubmit?: (data: ApplicationFormData) => void;
}

export default function CandidateApplicationForm({ candidateId, onSubmit }: CandidateApplicationFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ApplicationFormData>({
    candidateId,
    jobId: "",
    coverLetter: "",
    applicationNotes: "",
    expectedSalary: "",
    availabilityDate: "",
    applicationSource: "Direct Application"
  });

  const jobs = mockDataService.getAllJobs();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.jobId || !formData.coverLetter) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onSubmit?.(formData);
      
      toast({
        title: "Application Submitted",
        description: "The job application has been submitted successfully"
      });
      
      // Reset form
      setFormData({
        candidateId,
        jobId: "",
        coverLetter: "",
        applicationNotes: "",
        expectedSalary: "",
        availabilityDate: "",
        applicationSource: "Direct Application"
      });
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting the application",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const { voiceProps: formProps } = useVoiceTrigger({
    what: "Form for submitting a job application for this candidate.",
    actionStep: "Fill out the application details and submit."
  });

  return (
    <VoiceTutorialListener
      selector="candidate-application-form"
      description="Submit a job application for this candidate"
      actionStep="Fill out the form with job details and application information"
    >
      <Card {...formProps}>
        <CardHeader>
          <CardTitle>Submit Job Application</CardTitle>
          <CardDescription>Apply this candidate to a specific job position</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="job">Job Position*</Label>
              <Select value={formData.jobId} onValueChange={(value) => setFormData({...formData, jobId: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a job position" />
                </SelectTrigger>
                <SelectContent>
                  {jobs.map(job => (
                    <SelectItem key={job.id} value={job.id}>
                      {job.title} - {job.department}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="coverLetter">Cover Letter*</Label>
              <Textarea
                id="coverLetter"
                placeholder="Write a compelling cover letter for this application..."
                value={formData.coverLetter}
                onChange={(e) => setFormData({...formData, coverLetter: e.target.value})}
                rows={5}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expectedSalary">Expected Salary</Label>
                <Input
                  id="expectedSalary"
                  placeholder="$120,000 - $150,000"
                  value={formData.expectedSalary}
                  onChange={(e) => setFormData({...formData, expectedSalary: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="availabilityDate">Available From</Label>
                <Input
                  id="availabilityDate"
                  type="date"
                  value={formData.availabilityDate}
                  onChange={(e) => setFormData({...formData, availabilityDate: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="applicationSource">Application Source</Label>
              <Select value={formData.applicationSource} onValueChange={(value) => setFormData({...formData, applicationSource: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Direct Application">Direct Application</SelectItem>
                  <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                  <SelectItem value="Indeed">Indeed</SelectItem>
                  <SelectItem value="Company Website">Company Website</SelectItem>
                  <SelectItem value="Referral">Referral</SelectItem>
                  <SelectItem value="Recruiter">Recruiter</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="applicationNotes">Application Notes</Label>
              <Textarea
                id="applicationNotes"
                placeholder="Any additional notes about this application..."
                value={formData.applicationNotes}
                onChange={(e) => setFormData({...formData, applicationNotes: e.target.value})}
                rows={3}
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button 
                type="submit" 
                disabled={isSubmitting}
                {...useVoiceTrigger({
                  what: "Submit the job application",
                  actionStep: "Click to submit the application"
                }).voiceProps}
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </VoiceTutorialListener>
  );
}