
import { useState } from "react";
import { format } from "date-fns";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Candidate, Interview } from "@/types";
import { mockDataService } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";
import EnhancedVoiceTutorialListener from "@/components/voice/EnhancedVoiceTutorialListener";

interface CandidateInterviewsProps {
  candidate: Candidate;
  setCandidate: React.Dispatch<React.SetStateAction<Candidate | null>>;
  hasPermission: (permission: string) => boolean;
}

export function CandidateInterviews({ candidate, setCandidate, hasPermission }: CandidateInterviewsProps) {
  const { toast } = useToast();
  
  const handleScheduleInterview = (date: Date, type: Interview['type']) => {
    if (!candidate) return;
    
    try {
      const newInterview: Interview = {
        id: String(Date.now()),
        candidateId: candidate.id,
        interviewerId: "1",
        interviewerName: "John Doe",
        date: format(date, 'yyyy-MM-dd'),
        time: "10:00",
        duration: "1 hour",
        type,
        status: "Scheduled",
      };
      
      const updatedCandidate = {
        ...candidate,
        interviews: [...candidate.interviews, newInterview],
        lastUpdated: new Date().toISOString()
      };
      
      mockDataService.updateCandidate(updatedCandidate);
      setCandidate(updatedCandidate);
      
      toast({
        title: "Interview scheduled",
        description: `${type} interview scheduled for ${format(date, "MMMM dd, yyyy")}`
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to schedule interview. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  return (
    <EnhancedVoiceTutorialListener
      selector="candidate-interviews-card"
      description="Candidate interviews section showing scheduled and past interviews."
      category="info"
      priority="medium"
    >
      <Card>
        <CardHeader>
          <CardTitle>Interviews</CardTitle>
          <CardDescription>Scheduled and past interviews</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {candidate.interviews.length > 0 ? (
            <EnhancedVoiceTutorialListener
              selector="interviews-list"
              description="List of all interviews for this candidate showing dates, types, and status."
              category="info"
            >
              <ul className="space-y-3">
                {candidate.interviews.map((interview) => (
                  <EnhancedVoiceTutorialListener
                    key={interview.id}
                    selector={`interview-${interview.id}`}
                    description={`${interview.type} interview scheduled for ${new Date(interview.date).toLocaleDateString()} with status ${interview.status}.`}
                    category="info"
                  >
                    <li className="border rounded-md p-4 bg-gray-50">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-lg font-semibold">{interview.type}</h4>
                        <Badge variant={interview.status === "Scheduled" ? "default" : interview.status === "Completed" ? "secondary" : "destructive"}>
                          {interview.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                        <p><strong>Date:</strong> {new Date(interview.date).toLocaleDateString()}</p>
                        <p><strong>Time:</strong> {interview.time}</p>
                        <p><strong>Duration:</strong> {interview.duration}</p>
                        <p><strong>Interviewer:</strong> {interview.interviewerName}</p>
                      </div>
                      {interview.notes && (
                        <div className="mt-2 p-2 bg-white rounded border">
                          <p className="text-sm"><strong>Notes:</strong> {interview.notes}</p>
                        </div>
                      )}
                    </li>
                  </EnhancedVoiceTutorialListener>
                ))}
              </ul>
            </EnhancedVoiceTutorialListener>
          ) : (
            <EnhancedVoiceTutorialListener
              selector="no-interviews-message"
              description="Message indicating no interviews are scheduled for this candidate."
              category="info"
            >
              <div className="text-center py-8 text-gray-500">
                <p>No interviews scheduled.</p>
              </div>
            </EnhancedVoiceTutorialListener>
          )}
          
          {hasPermission('canEditCandidates') && (
            <EnhancedVoiceTutorialListener
              selector="schedule-interview-dialog"
              description="Schedule interview dialog for creating new interviews."
              actionStep="Click to open the interview scheduling form."
              category="action"
            >
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full">Schedule Interview</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Schedule Interview</DialogTitle>
                    <DialogDescription>
                      Schedule a new interview for the candidate.
                    </DialogDescription>
                  </DialogHeader>
                  <ScheduleInterviewForm onSubmit={handleScheduleInterview} />
                </DialogContent>
              </Dialog>
            </EnhancedVoiceTutorialListener>
          )}
        </CardContent>
      </Card>
    </EnhancedVoiceTutorialListener>
  );
}

interface ScheduleInterviewFormProps {
  onSubmit: (date: Date, type: Interview['type']) => void;
}

function ScheduleInterviewForm({ onSubmit }: ScheduleInterviewFormProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [type, setType] = useState<Interview['type']>("Video");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!date) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      onSubmit(date, type);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <EnhancedVoiceTutorialListener
      selector="schedule-interview-form"
      description="Form for scheduling a new interview with date and type selection."
      actionStep="Select interview type and date, then click Schedule to create the interview."
      category="form"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <EnhancedVoiceTutorialListener
          selector="interview-type-select"
          description="Interview type selection dropdown."
          category="form"
        >
          <div>
            <Label>Interview Type</Label>
            <Select 
              value={type} 
              onValueChange={(value) => setType(value as Interview['type'])}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select interview type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Phone">Phone Interview</SelectItem>
                <SelectItem value="Video">Video Interview</SelectItem>
                <SelectItem value="In-person">In-person Interview</SelectItem>
                <SelectItem value="Behavioral">Behavioral Interview</SelectItem>
                <SelectItem value="Technical">Technical Interview</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </EnhancedVoiceTutorialListener>
        
        <EnhancedVoiceTutorialListener
          selector="interview-date-picker"
          description="Date picker for selecting interview date."
          category="form"
        >
          <div>
            <Label>Schedule Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(date) => date < new Date()}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
        </EnhancedVoiceTutorialListener>
        
        <div className="flex justify-end">
          <Button type="submit" disabled={!date || isSubmitting}>
            {isSubmitting ? "Scheduling..." : "Schedule"}
          </Button>
        </div>
      </form>
    </EnhancedVoiceTutorialListener>
  );
}
