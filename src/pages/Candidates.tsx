
import { useState, useRef } from "react";
import { useVoiceTrigger } from "@/hooks/useVoiceTrigger";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, User, FileText, MessageSquare, Star, ThumbsUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { mockDataService, Candidate } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

const STATUSES = ['Applied', 'Screen', 'Interview', 'Offer', 'Hired'] as const;
const STATUS_COLORS = {
  'Applied': 'bg-kanban-applied',
  'Screen': 'bg-kanban-screen',
  'Interview': 'bg-kanban-interview',
  'Offer': 'bg-kanban-offer',
  'Hired': 'bg-kanban-hired',
};

export default function Candidates() {
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [candidates, setCandidates] = useState<Candidate[]>(mockDataService.getAllCandidates());
  const [searchTerm, setSearchTerm] = useState("");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const draggedCandidateRef = useRef<string | null>(null);
  const { toast } = useToast();
  
  // Filter candidates based on search term
  const filteredCandidates = candidates.filter(candidate => 
    candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.role.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Get candidates by status
  const getCandidatesByStatus = (status: typeof STATUSES[number]) => {
    return filteredCandidates.filter(candidate => candidate.status === status);
  };
  
  // Handle drag events
  const handleDragStart = (candidateId: string) => {
    draggedCandidateRef.current = candidateId;
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };
  
  const handleDrop = (status: typeof STATUSES[number]) => {
    if (draggedCandidateRef.current) {
      // Update candidate status in mock service
      const updatedCandidate = mockDataService.updateCandidateStatus(draggedCandidateRef.current, status);
      
      // Update local state
      setCandidates(prevCandidates => 
        prevCandidates.map(candidate => 
          candidate.id === draggedCandidateRef.current 
            ? { ...candidate, status, lastUpdated: new Date().toISOString().split('T')[0] }
            : candidate
        )
      );
      
      // Show toast
      toast({
        title: "Candidate Updated",
        description: `${updatedCandidate?.name} moved to ${status} stage`,
      });
      
      // Reset dragged candidate
      draggedCandidateRef.current = null;
    }
  };
  
  // Voice tutorials
  const { voiceProps: pipelineVoiceProps } = useVoiceTrigger({
    what: "This is the candidate pipeline where you can track applicants through different hiring stages.",
    how: "Drag candidates between stages to update their status. Click on a candidate to view their full profile and leave feedback."
  });
  
  const { voiceProps: searchVoiceProps } = useVoiceTrigger({
    what: "This is the search box for finding candidates by name or role.",
    how: "Type a name or job title to filter candidates across all stages."
  });
  
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Candidate Pipeline</h1>
          <p className="text-gray-600">Track and manage candidates through the hiring process</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button>
            <User className="w-4 h-4 mr-2" />
            Add Candidate
          </Button>
        </div>
      </div>
      
      <div className="mb-6 max-w-md" {...searchVoiceProps}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input 
            placeholder="Search candidates by name or role..." 
            className="pl-10" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div 
        className="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-x-auto pb-6"
        {...pipelineVoiceProps}
      >
        {STATUSES.map((status) => (
          <div 
            key={status}
            className="kanban-column min-h-[500px]"
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(status)}
          >
            <div className="flex items-center mb-3">
              <div className={cn("w-3 h-3 rounded-full mr-2", STATUS_COLORS[status])}></div>
              <h3 className="font-medium">{status}</h3>
              <span className="ml-2 text-sm text-gray-500">({getCandidatesByStatus(status).length})</span>
            </div>
            
            <div className="space-y-3">
              {getCandidatesByStatus(status).map((candidate) => {
                const { voiceProps } = useVoiceTrigger({
                  what: `This is ${candidate.name}, a ${candidate.role} candidate in the ${status} stage.`,
                  how: "Click to view details or drag to move to another stage.",
                  decision: candidate.status === 'Interview' ? 
                    `${candidate.name} has been in the Interview stage for 5 days. Consider scheduling a follow-up or moving to Offer stage.` : 
                    undefined
                });
                
                return (
                  <Card 
                    key={candidate.id}
                    className="kanban-card cursor-pointer"
                    draggable
                    onDragStart={() => handleDragStart(candidate.id)}
                    onClick={() => {
                      setSelectedCandidate(candidate);
                      setIsProfileOpen(true);
                    }}
                    {...voiceProps}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center mb-3">
                        <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 mr-2">
                          {candidate.avatar ? (
                            <img src={candidate.avatar} alt={candidate.name} className="w-full h-full object-cover" />
                          ) : (
                            <User className="w-full h-full p-1" />
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">{candidate.name}</h4>
                          <p className="text-gray-500 text-xs">{candidate.role}</p>
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        {candidate.skills.slice(0, 3).map(skill => (
                          <Badge key={skill} variant="outline" className="mr-1 mb-1">
                            {skill}
                          </Badge>
                        ))}
                        {candidate.skills.length > 3 && (
                          <Badge variant="outline" className="mb-1">
                            +{candidate.skills.length - 3}
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Applied: {candidate.appliedDate}</span>
                        <span>{candidate.source}</span>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
              
              {getCandidatesByStatus(status).length === 0 && (
                <div className="text-center p-4 border border-dashed border-gray-300 rounded-md">
                  <p className="text-gray-400 text-sm">Drop candidates here</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {/* Candidate Profile Dialog */}
      {selectedCandidate && (
        <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Candidate Profile</DialogTitle>
              <DialogDescription>Review candidate details and manage their application</DialogDescription>
            </DialogHeader>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left column - Profile info */}
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 mr-3">
                    {selectedCandidate.avatar ? (
                      <img src={selectedCandidate.avatar} alt={selectedCandidate.name} className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-full h-full p-3" />
                    )}
                  </div>
                  <div>
                    <h2 className="font-semibold text-lg">{selectedCandidate.name}</h2>
                    <p className="text-gray-600">{selectedCandidate.role}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-sm text-gray-500 mb-1">Contact Information</h3>
                  <p className="text-sm mb-1">{selectedCandidate.email}</p>
                  <p className="text-sm mb-1">{selectedCandidate.phone}</p>
                  <p className="text-sm">{selectedCandidate.location}</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-sm text-gray-500 mb-1">Application Details</h3>
                  <p className="text-sm mb-1">Applied on: {selectedCandidate.appliedDate}</p>
                  <p className="text-sm mb-1">Source: {selectedCandidate.source}</p>
                  <p className="text-sm mb-1">Experience: {selectedCandidate.experience} years</p>
                  <p className="text-sm">Expected salary: {selectedCandidate.salary}</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-sm text-gray-500 mb-1">Skills</h3>
                  <div>
                    {selectedCandidate.skills.map(skill => (
                      <Badge key={skill} variant="outline" className="mr-1 mb-1">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Right column - Tabs */}
              <div className="col-span-2">
                <Tabs defaultValue="resume">
                  <TabsList className="grid grid-cols-4 mb-4">
                    <TabsTrigger value="resume" className="text-xs sm:text-sm">
                      <FileText className="w-4 h-4 mr-1 hidden sm:inline" />
                      Resume
                    </TabsTrigger>
                    <TabsTrigger value="notes" className="text-xs sm:text-sm">
                      <MessageSquare className="w-4 h-4 mr-1 hidden sm:inline" />
                      Notes
                    </TabsTrigger>
                    <TabsTrigger value="feedback" className="text-xs sm:text-sm">
                      <ThumbsUp className="w-4 h-4 mr-1 hidden sm:inline" />
                      Feedback
                    </TabsTrigger>
                    <TabsTrigger value="scorecard" className="text-xs sm:text-sm">
                      <Star className="w-4 h-4 mr-1 hidden sm:inline" />
                      Scorecard
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="resume" className="border rounded-md p-4">
                    <h4 className="font-medium mb-2">Resume Preview</h4>
                    <div className="bg-gray-50 p-4 rounded">
                      <h5 className="font-bold text-lg mb-1">{selectedCandidate.name}</h5>
                      <p className="text-gray-500 mb-4">{selectedCandidate.role} • {selectedCandidate.location}</p>
                      
                      <div className="mb-4">
                        <h6 className="font-medium mb-1">Summary</h6>
                        <p className="text-sm">
                          Experienced {selectedCandidate.role} with {selectedCandidate.experience} years of industry expertise.
                          Skilled in {selectedCandidate.skills.slice(0, 3).join(', ')}, and other technologies.
                        </p>
                      </div>
                      
                      <div className="mb-4">
                        <h6 className="font-medium mb-1">Skills</h6>
                        <div className="flex flex-wrap gap-1 mb-2">
                          {selectedCandidate.skills.map(skill => (
                            <Badge key={skill} variant="outline" className="mr-1 mb-1">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <h6 className="font-medium mb-1">Education</h6>
                        <p className="text-sm">{selectedCandidate.education}</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-end mt-4 space-x-2">
                      <Button variant="outline">Download Resume</Button>
                      <Button>Share Resume</Button>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="notes" className="border rounded-md p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-medium">Candidate Notes</h4>
                      <Button size="sm">Add Note</Button>
                    </div>
                    
                    {selectedCandidate.notes && selectedCandidate.notes.length > 0 ? (
                      <div className="space-y-3">
                        {selectedCandidate.notes.map((note, index) => (
                          <div key={index} className="p-3 bg-gray-50 rounded-md">
                            <p className="text-sm">{note}</p>
                            <p className="text-xs text-gray-500 mt-1">Added on {selectedCandidate.lastUpdated}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center p-6 border border-dashed border-gray-300 rounded-md">
                        <p className="text-gray-500">No notes added yet</p>
                        <p className="text-sm text-gray-400">Click "Add Note" to create the first note</p>
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="feedback" className="border rounded-md p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-medium">Interview Feedback</h4>
                      <Button size="sm">Add Feedback</Button>
                    </div>
                    
                    {selectedCandidate.feedback && selectedCandidate.feedback.length > 0 ? (
                      <div className="space-y-4">
                        {selectedCandidate.feedback.map((feedback) => (
                          <div key={feedback.id} className="border rounded-md p-3">
                            <div className="flex justify-between mb-2">
                              <div>
                                <p className="font-medium">{feedback.reviewerName}</p>
                                <p className="text-xs text-gray-500">{feedback.date}</p>
                              </div>
                              <div className="flex">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star 
                                    key={i} 
                                    size={16} 
                                    className={i < feedback.overallRating ? "text-amber-500 fill-amber-500" : "text-gray-300"} 
                                  />
                                ))}
                              </div>
                            </div>
                            
                            <div className="mb-3">
                              <h6 className="text-sm font-medium mb-1">Skills Assessment</h6>
                              <div className="space-y-1">
                                {Object.entries(feedback.skillRatings).map(([skill, rating]) => (
                                  <div key={skill} className="flex items-center">
                                    <span className="text-xs w-24 text-gray-600">{skill}</span>
                                    <div className="flex">
                                      {Array.from({ length: 5 }).map((_, i) => (
                                        <Star 
                                          key={i} 
                                          size={12} 
                                          className={i < rating ? "text-amber-500 fill-amber-500" : "text-gray-300"} 
                                        />
                                      ))}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                              <div>
                                <h6 className="font-medium mb-1">Strengths</h6>
                                <p className="text-gray-700">{feedback.strengths}</p>
                              </div>
                              <div>
                                <h6 className="font-medium mb-1">Areas for Growth</h6>
                                <p className="text-gray-700">{feedback.weaknesses}</p>
                              </div>
                            </div>
                            
                            <div className="mt-3">
                              <h6 className="font-medium mb-1 text-sm">Recommendation</h6>
                              <p className="text-gray-700 text-sm">{feedback.recommendations}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center p-6 border border-dashed border-gray-300 rounded-md">
                        <p className="text-gray-500">No feedback submitted yet</p>
                        <p className="text-sm text-gray-400">Feedback will appear here after interviews</p>
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="scorecard" className="border rounded-md p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-medium">Evaluation Scorecard</h4>
                      <Button size="sm">New Scorecard</Button>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-md mb-4">
                      <h5 className="font-medium mb-3">Technical Competencies</h5>
                      <div className="space-y-3">
                        {selectedCandidate.skills.slice(0, 5).map(skill => (
                          <div key={skill} className="flex items-center">
                            <span className="w-1/3 text-sm">{skill}</span>
                            <div className="w-2/3 flex items-center space-x-1">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <div 
                                  key={i}
                                  className={cn(
                                    "h-2 flex-1 rounded-sm",
                                    i < Math.floor(Math.random() * 5) + 1 ? "bg-ats-primary" : "bg-gray-200"
                                  )}
                                />
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-md">
                      <h5 className="font-medium mb-3">Soft Skills</h5>
                      <div className="space-y-3">
                        {['Communication', 'Teamwork', 'Problem Solving', 'Adaptability', 'Leadership'].map(skill => (
                          <div key={skill} className="flex items-center">
                            <span className="w-1/3 text-sm">{skill}</span>
                            <div className="w-2/3 flex items-center space-x-1">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <div 
                                  key={i}
                                  className={cn(
                                    "h-2 flex-1 rounded-sm",
                                    i < Math.floor(Math.random() * 5) + 1 ? "bg-ats-secondary" : "bg-gray-200"
                                  )}
                                />
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
            
            <div className="flex justify-between mt-6">
              <div className="flex space-x-2">
                <Button variant="destructive" size="sm">
                  Reject
                </Button>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  Schedule Interview
                </Button>
                <Button size="sm">
                  Move to {
                    STATUSES[Math.min(
                      STATUSES.indexOf(selectedCandidate.status as typeof STATUSES[number]) + 1,
                      STATUSES.length - 1
                    )]
                  }
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
