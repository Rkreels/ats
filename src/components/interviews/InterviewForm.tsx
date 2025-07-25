
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/hooks/use-toast";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Interview, Candidate } from "@/types";
import { mockDataService } from "@/data/mockData";

interface InterviewFormProps {
  onAddInterview: (interview: Omit<Interview, "id">) => void;
}

const InterviewForm = ({ onAddInterview }: InterviewFormProps) => {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [newInterview, setNewInterview] = useState<Omit<Interview, "id">>({
    candidateId: '',
    interviewerId: '',
    interviewerName: '',
    date: '',
    time: '',
    duration: '30 minutes',
    type: 'Phone',
    status: 'Scheduled',
  });

  useEffect(() => {
    // Load candidates for the dropdown
    const allCandidates = mockDataService.getAllCandidates();
    setCandidates(allCandidates);
  }, []);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewInterview(prev => ({ ...prev, [name]: value }));
  };
  
  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      setNewInterview(prev => ({ ...prev, date: format(date, 'yyyy-MM-dd') }));
    }
  };
  
  const handleSubmit = () => {
    if (!newInterview.candidateId || !newInterview.interviewerName || !newInterview.date || !newInterview.time || !newInterview.duration) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    onAddInterview(newInterview);
    
    setNewInterview({
      candidateId: '',
      interviewerId: '',
      interviewerName: '',
      date: '',
      time: '',
      duration: '',
      type: 'Phone',
      status: 'Scheduled',
    });
    setSelectedDate(undefined);
    
    toast({
      title: "Success",
      description: "Interview scheduled successfully.",
    });
  };
  
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="candidateId">Select Candidate</Label>
          <Select
            value={newInterview.candidateId}
            onValueChange={(value) => setNewInterview(prev => ({ ...prev, candidateId: value }))}
          >
            <SelectTrigger id="candidateId">
              <SelectValue placeholder="Choose a candidate" />
            </SelectTrigger>
            <SelectContent>
              {candidates.map(candidate => (
                <SelectItem key={candidate.id} value={candidate.id}>
                  {candidate.name} - {candidate.role}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="interviewerName">Interviewer Name</Label>
          <Input 
            type="text" 
            id="interviewerName" 
            name="interviewerName" 
            value={newInterview.interviewerName} 
            onChange={handleInputChange}
            placeholder="Enter interviewer name"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="date">Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !selectedDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate ? (
                  format(selectedDate, "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                disabled={{ before: new Date() }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <Label htmlFor="time">Time</Label>
          <Input 
            type="time" 
            id="time" 
            name="time" 
            value={newInterview.time} 
            onChange={handleInputChange} 
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="duration">Duration</Label>
          <Select
            value={newInterview.duration}
            onValueChange={(value) => setNewInterview(prev => ({ ...prev, duration: value }))}
          >
            <SelectTrigger id="duration">
              <SelectValue placeholder="Select duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="15 minutes">15 minutes</SelectItem>
              <SelectItem value="30 minutes">30 minutes</SelectItem>
              <SelectItem value="45 minutes">45 minutes</SelectItem>
              <SelectItem value="1 hour">1 hour</SelectItem>
              <SelectItem value="1.5 hours">1.5 hours</SelectItem>
              <SelectItem value="2 hours">2 hours</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="type">Type</Label>
          <Select 
            name="type" 
            value={newInterview.type} 
            onValueChange={(value) => handleInputChange({ target: { name: 'type', value } } as any)}
          >
            <SelectTrigger id="type">
              <SelectValue placeholder="Select type" />
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
      </div>
      
      <Button onClick={handleSubmit}>Schedule Interview</Button>
    </div>
  );
};

export default InterviewForm;
