import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { mockDataService } from "@/data/mockData";
import { Candidate } from "@/types";
import { useNavigate } from "react-router-dom";
import { useVoiceTrigger } from "@/hooks/useVoiceTrigger";
import VoiceTutorialListener from "@/components/voice/VoiceTutorialListener";

interface JobApplicationsProps {
  jobId: string;
  jobTitle: string;
}

export default function JobApplications({ jobId, jobTitle }: JobApplicationsProps) {
  const navigate = useNavigate();
  const [applications, setApplications] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching applications for this job
    const timer = setTimeout(() => {
      const allCandidates = mockDataService.getAllCandidates();
      // Filter candidates that might have applied to this job (simplified logic)
      const applicants = allCandidates.filter(candidate => 
        candidate.role.toLowerCase().includes(jobTitle.toLowerCase().split(' ')[0]) ||
        Math.random() > 0.7 // Random selection for demo
      );
      setApplications(applicants);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [jobId, jobTitle]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Applied": return "bg-blue-100 text-blue-800";
      case "Screen": return "bg-yellow-100 text-yellow-800";
      case "Interview": return "bg-purple-100 text-purple-800";
      case "Offer": return "bg-green-100 text-green-800";
      case "Hired": return "bg-green-200 text-green-900";
      case "Rejected": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-primary"></div>
          <span className="ml-2">Loading applications...</span>
        </CardContent>
      </Card>
    );
  }

  return (
    <VoiceTutorialListener
      selector="job-applications-list"
      description={`Applications for ${jobTitle} position. View candidate details and manage their status.`}
      actionStep="Click on candidates to view their profiles or update their status."
    >
      <Card>
        <CardHeader>
          <CardTitle>Applications for {jobTitle}</CardTitle>
          <CardDescription>
            {applications.length} candidate{applications.length !== 1 ? 's' : ''} have applied
          </CardDescription>
        </CardHeader>
        <CardContent>
          {applications.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No applications yet for this position.</p>
            </div>
          ) : (
            <ScrollArea className="h-[400px]">
              <div className="space-y-4">
                {applications.map((candidate) => (
                  <VoiceTutorialListener
                    key={candidate.id}
                    selector={`application-${candidate.id}`}
                    description={`Application from ${candidate.name} for ${jobTitle}. Status: ${candidate.status}.`}
                    actionStep="Click to view full candidate profile and details."
                  >
                    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium">
                          {candidate.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-medium">{candidate.name}</h4>
                          <p className="text-sm text-muted-foreground">{candidate.email}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge className={getStatusColor(candidate.status)}>
                              {candidate.status}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              Applied {candidate.appliedDate}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/candidates/${candidate.id}`)}
                          {...useVoiceTrigger({
                            what: `View ${candidate.name}'s full profile and application details`,
                            actionStep: "Click to open candidate profile"
                          }).voiceProps}
                        >
                          View Profile
                        </Button>
                      </div>
                    </div>
                  </VoiceTutorialListener>
                ))}
              </div>
            </ScrollArea>
          )}
        </CardContent>
      </Card>
    </VoiceTutorialListener>
  );
}