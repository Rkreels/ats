import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Candidate } from "@/types";
import { mockDataService } from "@/data/mockData";
import { useUser } from "@/contexts/UserContext";
import { useToast } from "@/hooks/use-toast";

// Importing refactored components
import { CandidateHeader } from "@/components/candidates/detail/CandidateHeader";
import { CandidateInfo } from "@/components/candidates/detail/CandidateInfo";
import { CandidateOverview } from "@/components/candidates/detail/CandidateOverview";
import { CandidateInterviews } from "@/components/candidates/detail/CandidateInterviews";
import { CandidateApplication } from "@/components/candidates/detail/CandidateApplication";
import { CandidateEdit } from "@/components/candidates/detail/CandidateEdit";
import VoiceTutorialListener from "@/components/voice/VoiceTutorialListener";

const CandidateDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const { hasPermission } = useUser();
  const { toast } = useToast();

  useEffect(() => {
    if (!id) {
      navigate("/candidates");
      return;
    }

    // In a real app, this would be an API call
    const fetchedCandidate = mockDataService.getCandidate(id);
    
    if (fetchedCandidate) {
      setCandidate(fetchedCandidate);
    } else {
      toast({
        title: "Candidate not found",
        description: "The candidate you're looking for doesn't exist.",
        variant: "destructive"
      });
      navigate("/candidates");
    }
    
    setIsLoading(false);
  }, [id, navigate, toast]);

  const handleUpdateStatus = (status: Candidate['status']) => {
    if (!candidate) return;
    
    // In a real app, this would be an API call
    const updatedCandidate = { 
      ...candidate, 
      status,
      lastUpdated: new Date().toISOString()
    };
    
    mockDataService.updateCandidate(updatedCandidate);
    setCandidate(updatedCandidate);
    
    toast({
      title: "Status updated",
      description: `Candidate status changed to ${status}`
    });
  };

  if (isLoading) {
    return <div className="flex justify-center items-center py-10">Loading candidate details...</div>;
  }

  if (!candidate) {
    return <div className="flex justify-center items-center py-10">Candidate not found.</div>;
  }

  return (
    <div className="space-y-6">
      <VoiceTutorialListener
        selector="candidate-header"
        description="This area shows main information and candidate status. Actions are possible depending on your permissions."
        actionStep="Change status, initiate communication, or go back to the list."
      >
        <CandidateHeader 
          candidate={candidate}
          handleUpdateStatus={handleUpdateStatus}
          hasPermission={hasPermission}
        />
      </VoiceTutorialListener>
      <VoiceTutorialListener
        selector="candidate-info"
        description="Detailed candidate contact and background information."
        actionStep="Review details or copy information."
      >
        <CandidateInfo candidate={candidate} />
      </VoiceTutorialListener>
      <VoiceTutorialListener
        selector="candidate-tabs"
        description="Navigate between different sections of the candidate profile: overview, interviews, application, and editing."
        actionStep="Switch between tabs for detailed views and actions."
      >
        <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab} value={activeTab}>
          <TabsList className="flex flex-wrap w-full gap-1">
            <VoiceTutorialListener
              selector="tab-overview"
              description="Overview tab: view the candidate summary and timeline."
              actionStep="Switch tabs to access interviews, application, or editing."
            >
              <TabsTrigger value="overview">Overview</TabsTrigger>
            </VoiceTutorialListener>
            <VoiceTutorialListener
              selector="tab-interviews"
              description="Interviews tab: see all interviews related to this candidate."
              actionStep="Review or manage interview history."
            >
              <TabsTrigger value="interviews">Interviews</TabsTrigger>
            </VoiceTutorialListener>
            <VoiceTutorialListener
              selector="tab-application"
              description="Application tab: see application data submitted by this candidate."
            >
              <TabsTrigger value="application">Application</TabsTrigger>
            </VoiceTutorialListener>
            {hasPermission('canEditCandidates') && (
              <VoiceTutorialListener
                selector="tab-edit"
                description="Edit tab: update candidate details or status." 
                actionStep="Only available to users with edit permission."
              >
                <TabsTrigger value="edit">Edit</TabsTrigger>
              </VoiceTutorialListener>
            )}
          </TabsList>
          <TabsContent value="overview">
            <VoiceTutorialListener
              selector="tab-content-overview"
              description="Candidate at-a-glance and activity. Useful for quick summary."
            >
              <CandidateOverview 
                candidate={candidate}
                setCandidate={setCandidate}
                hasPermission={hasPermission}
              />
            </VoiceTutorialListener>
          </TabsContent>
          <TabsContent value="interviews">
            <VoiceTutorialListener
              selector="tab-content-interviews"
              description="Shows all interviews, statuses, and actions for this candidate."
              actionStep="Schedule, reschedule, edit, or cancel interviews as needed."
            >
              <CandidateInterviews 
                candidate={candidate}
                setCandidate={setCandidate}
                hasPermission={hasPermission}
              />
            </VoiceTutorialListener>
          </TabsContent>
          <TabsContent value="application">
            <VoiceTutorialListener
              selector="tab-content-application"
              description="Displays the candidate's application details."
            >
              <CandidateApplication 
                candidate={candidate} 
                setCandidate={setCandidate}
                hasPermission={hasPermission}
              />
            </VoiceTutorialListener>
          </TabsContent>
          {hasPermission('canEditCandidates') && (
            <TabsContent value="edit">
              <VoiceTutorialListener
                selector="tab-content-edit"
                description="Edit candidate form, update any details and save."
                actionStep="Make the changes and submit. Only available to editors."
              >
                <Card>
                  <CardContent className="pt-6">
                    <CandidateEdit 
                      candidate={candidate}
                      setCandidate={setCandidate}
                    />
                  </CardContent>
                </Card>
              </VoiceTutorialListener>
            </TabsContent>
          )}
        </Tabs>
      </VoiceTutorialListener>
    </div>
  );
};
export default CandidateDetail;
