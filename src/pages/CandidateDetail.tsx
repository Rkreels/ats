
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
      <CandidateHeader 
        candidate={candidate}
        handleUpdateStatus={handleUpdateStatus}
        hasPermission={hasPermission}
      />

      <CandidateInfo candidate={candidate} />
      
      <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab} value={activeTab}>
        <TabsList className="flex flex-wrap">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="interviews">Interviews</TabsTrigger>
          <TabsTrigger value="application">Application</TabsTrigger>
          {hasPermission('canEditCandidates') && <TabsTrigger value="edit">Edit</TabsTrigger>}
        </TabsList>
        
        <TabsContent value="overview">
          <CandidateOverview 
            candidate={candidate}
            setCandidate={setCandidate}
            hasPermission={hasPermission}
          />
        </TabsContent>
        
        <TabsContent value="interviews">
          <CandidateInterviews 
            candidate={candidate}
            setCandidate={setCandidate}
            hasPermission={hasPermission}
          />
        </TabsContent>
        
        <TabsContent value="application">
          <CandidateApplication candidate={candidate} />
        </TabsContent>
        
        {hasPermission('canEditCandidates') && (
          <TabsContent value="edit">
            <Card>
              <CardContent className="pt-6">
                <CandidateEdit 
                  candidate={candidate}
                  setCandidate={setCandidate}
                />
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default CandidateDetail;
