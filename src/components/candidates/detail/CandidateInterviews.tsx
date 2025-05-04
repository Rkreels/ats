
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

interface CandidateInterviewsProps {
  candidate: Candidate;
  setCandidate: React.Dispatch<React.SetStateAction<Candidate | null>>;
  hasPermission: (permission: string) => boolean;
}

export function CandidateInterviews({ candidate, setCandidate, hasPermission }: CandidateInterviewsProps) {
  const { toast } = useToast();
  
  const handleScheduleInterview = (date: Date, type: Interview['type']) => {
    if (!candidate) return;
    
    // In a real app, this would be an API call
    const newInterview: Interview = {
      id: String(Math.random()),
      candidateId: candidate.id,
      interviewerId: "1", // Replace with actual interviewer ID
      interviewerName: "John Doe", // Replace with actual interviewer name
      date: format(date, 'yyyy-MM-dd'),
      time: "10:00",
      duration: "1 hour",
      type, // Use the correctly typed parameter
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
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Interviews</CardTitle>
        <CardDescription>Scheduled and past interviews</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {candidate.interviews.length > 0 ? (
          <ul className="space-y-2">
            {candidate.interviews.map((interview) => (
              <li key={interview.id} className="border rounded-md p-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-lg font-semibold">{interview.type}</h4>
                  <Badge>{interview.status}</Badge>
                </div>
                <p className="text-gray-600">Date: {new Date(interview.date).toLocaleDateString()}</p>
                <p className="text-gray-600">Time: {interview.time}</p>
                <p className="text-gray-600">Duration: {interview.duration}</p>
                <p className="text-gray-600">Interviewer: {interview.interviewerName}</p>
                <p className="text-gray-600">Notes: {interview.notes || "No notes available."}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No interviews scheduled.</p>
        )}
        
        {hasPermission('canEditCandidates') && (
          <Dialog>
            <DialogTrigger asChild>
              <Button>Schedule Interview</Button>
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
        )}
      </CardContent>
    </Card>
  );
}

interface ScheduleInterviewFormProps {
  onSubmit: (date: Date, type: Interview['type']) => void;
}

function ScheduleInterviewForm({ onSubmit }: ScheduleInterviewFormProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [type, setType] = useState<Interview['type']>("Video");
  
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (date) {
      onSubmit(date, type);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
            <SelectItem value="Phone">Phone</SelectItem>
            <SelectItem value="Video">Video</SelectItem>
            <SelectItem value="In-person">In-person</SelectItem>
            <SelectItem value="Behavioral">Behavioral</SelectItem>
            <SelectItem value="Technical">Technical</SelectItem>
          </SelectContent>
        </Select>
      </div>
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
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex justify-end">
        <Button type="submit" disabled={!date}>Schedule</Button>
      </div>
    </form>
  );
}
