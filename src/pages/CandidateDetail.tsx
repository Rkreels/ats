
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { mockDataService } from "@/data/mockData";
import { Candidate } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Mail, Phone, MapPin, Calendar, FileText, MessageSquare, ClipboardList } from "lucide-react";
import { useVoiceTrigger } from "@/hooks/useVoiceTrigger";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const CandidateDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (id) {
      // In a real app, this would be an API call
      const candidateData = mockDataService.getCandidateById(id);
      setCandidate(candidateData || null);
      setLoading(false);
    }
  }, [id]);
  
  const { voiceProps: candidateProfileProps } = useVoiceTrigger({
    what: "This is the candidate profile page. Here you can view detailed information about this candidate, including their personal details, resume, interview history, and notes."
  });
  
  const updateStatus = (newStatus: Candidate["status"]) => {
    if (candidate) {
      const updatedCandidate = { ...candidate, status: newStatus };
      // In a real app, this would be an API call
      mockDataService.updateCandidate(updatedCandidate);
      setCandidate(updatedCandidate);
      
      toast({
        title: "Status updated",
        description: `Candidate's status updated to ${newStatus}`
      });
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (!candidate) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold mb-2">Candidate not found</h2>
        <p className="text-gray-500 mb-4">The candidate you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate("/candidates")}>Back to Candidates</Button>
      </div>
    );
  }
  
  return (
    <>
      <div className="mb-6 flex items-center">
        <Button variant="outline" onClick={() => navigate("/candidates")} className="mr-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <h1 className="text-2xl font-bold">{candidate.name}</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6" {...candidateProfileProps}>
        <div className="col-span-1">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Profile</CardTitle>
              <CardDescription>{candidate.role}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center mb-4">
                <Avatar className="h-24 w-24 mb-2">
                  <AvatarImage src={candidate.avatar} alt={candidate.name} />
                  <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h3 className="font-semibold text-lg">{candidate.name}</h3>
                <Badge className="mt-1">{candidate.status}</Badge>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex">
                  <Mail className="h-4 w-4 text-gray-500 mr-2" />
                  <span>{candidate.email}</span>
                </div>
                <div className="flex">
                  <Phone className="h-4 w-4 text-gray-500 mr-2" />
                  <span>{candidate.phone}</span>
                </div>
                <div className="flex">
                  <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                  <span>{candidate.location}</span>
                </div>
                <div className="flex">
                  <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                  <span>Applied: {candidate.appliedDate}</span>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t">
                <h4 className="font-medium mb-2">Update Status</h4>
                <Select 
                  defaultValue={candidate.status} 
                  onValueChange={(value: Candidate["status"]) => updateStatus(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Applied">Applied</SelectItem>
                    <SelectItem value="Screen">Screen</SelectItem>
                    <SelectItem value="Interview">Interview</SelectItem>
                    <SelectItem value="Offer">Offer</SelectItem>
                    <SelectItem value="Hired">Hired</SelectItem>
                    <SelectItem value="Rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="col-span-1 md:col-span-2">
          <Tabs defaultValue="details">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="resume">Resume</TabsTrigger>
              <TabsTrigger value="interviews">Interviews</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {candidate.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary">{skill}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Experience</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{candidate.experience} years experience</p>
                  <p className="mt-2">Education: {candidate.education}</p>
                  <p className="mt-2">Source: {candidate.source}</p>
                  <p className="mt-2">Expected Salary: {candidate.salary}</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="resume">
              <Card>
                <CardHeader>
                  <CardTitle>Resume</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 mr-2" />
                    <a 
                      href={candidate.resumeUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      View Resume
                    </a>
                  </div>
                  {candidate.coverLetterUrl && (
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 mr-2" />
                      <a 
                        href={candidate.coverLetterUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        View Cover Letter
                      </a>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="interviews">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Interview History</CardTitle>
                    <Button size="sm" onClick={() => navigate("/interviews")}>
                      Schedule Interview
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {candidate.interviews && candidate.interviews.length > 0 ? (
                    <div className="space-y-4">
                      {candidate.interviews.map((interview) => (
                        <div key={interview.id} className="border rounded-md p-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium">{interview.interviewerName}</p>
                              <p className="text-sm text-gray-500">
                                {interview.date} at {interview.time} ({interview.duration})
                              </p>
                              <Badge 
                                className="mt-1" 
                                variant={
                                  interview.status === "Completed" ? "default" : 
                                  interview.status === "Scheduled" ? "outline" : "destructive"
                                }
                              >
                                {interview.status}
                              </Badge>
                            </div>
                            <Badge variant="secondary">{interview.type}</Badge>
                          </div>
                          {interview.feedback && (
                            <div className="mt-2 pt-2 border-t">
                              <p className="text-sm font-medium">Feedback:</p>
                              <p className="text-sm">{interview.feedback}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center py-4 text-gray-500">No interviews scheduled yet</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notes">
              <Card>
                <CardHeader>
                  <CardTitle>Notes & Feedback</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium flex items-center mb-2">
                      <ClipboardList className="h-4 w-4 mr-1" /> Recruiter Notes
                    </h4>
                    <p className="text-sm bg-gray-50 p-3 rounded-md">
                      {candidate.notes || "No recruiter notes added yet."}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium flex items-center mb-2">
                      <MessageSquare className="h-4 w-4 mr-1" /> Feedback
                    </h4>
                    <p className="text-sm bg-gray-50 p-3 rounded-md">
                      {candidate.feedback || "No feedback recorded yet."}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default CandidateDetail;
