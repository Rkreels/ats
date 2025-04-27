
import { useVoiceTrigger } from "@/hooks/useVoiceTrigger";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { mockDataService } from "@/data/mockData";
import { useState } from "react";
import { Interview } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar as CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { useToast } from "@/hooks/use-toast";

// Mock interviews data since mockDataService doesn't have interviews methods
const mockInterviews: Interview[] = [
  {
    id: "i-1",
    candidateId: "c-101",
    interviewerId: "u-201",
    interviewerName: "Jane Smith",
    date: "2025-05-05",
    time: "10:00",
    duration: "30 minutes",
    type: "Video",
    status: "Scheduled"
  },
  {
    id: "i-2",
    candidateId: "c-102",
    interviewerId: "u-202",
    interviewerName: "Michael Johnson",
    date: "2025-05-06",
    time: "14:30",
    duration: "45 minutes",
    type: "Phone",
    status: "Scheduled"
  }
];

export default function Interviews() {
  const { toast } = useToast();
  // Use our mock interviews instead of calling mockDataService
  const [interviews, setInterviews] = useState<Interview[]>(mockInterviews);
  const [newInterview, setNewInterview] = useState<Omit<Interview, 'id'>>({
    candidateId: '',
    interviewerId: '',
    interviewerName: '',
    date: '',
    time: '',
    duration: '',
    type: 'Phone',
    status: 'Scheduled',
  });
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  const { voiceProps: interviewsOverviewProps } = useVoiceTrigger({
    what: "This is the interview scheduling section. Here you can schedule new interviews with candidates. Fill in the candidate ID, interviewer name, and select date, time, and interview type to create a new interview."
  });
  
  const { voiceProps: scheduleFormProps } = useVoiceTrigger({
    what: "Use this form to schedule a new interview. Enter the candidate ID, interviewer name, select a date and time, and specify the interview duration and type."
  });
  
  const { voiceProps: upcomingInterviewsProps } = useVoiceTrigger({
    what: "This panel shows all upcoming interviews. You can see the interviewer name, candidate ID, and scheduled date and time for each interview."
  });
  
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
  
  const addInterview = () => {
    if (!newInterview.candidateId || !newInterview.interviewerName || !newInterview.date || !newInterview.time || !newInterview.duration) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    const newId = `i-${interviews.length + 1}`;
    const completeInterview: Interview = { id: newId, ...newInterview };
    setInterviews(prev => [...prev, completeInterview]);
    
    // Instead of using mockDataService.addInterview which doesn't exist
    // We're just adding to our local state
    
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
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Interviews</h1>
          <p className="text-gray-600">Manage upcoming and past interviews</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8" {...interviewsOverviewProps}>
        <Card {...scheduleFormProps}>
          <CardHeader>
            <CardTitle>Schedule New Interview</CardTitle>
            <CardDescription>Create a new interview for a candidate</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="candidateId">Candidate ID</Label>
                <Input 
                  type="text" 
                  id="candidateId" 
                  name="candidateId" 
                  value={newInterview.candidateId} 
                  onChange={handleInputChange} 
                />
              </div>
              <div>
                <Label htmlFor="interviewerName">Interviewer Name</Label>
                <Input 
                  type="text" 
                  id="interviewerName" 
                  name="interviewerName" 
                  value={newInterview.interviewerName} 
                  onChange={handleInputChange} 
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
                    <CalendarComponent
                      mode="single"
                      selected={selectedDate}
                      onSelect={handleDateSelect}
                      disabled={{ before: new Date() }}
                      showOutsideDays
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
                <Input 
                  type="text" 
                  id="duration" 
                  name="duration" 
                  value={newInterview.duration} 
                  onChange={handleInputChange} 
                />
              </div>
              <div>
                <Label htmlFor="type">Type</Label>
                <Select name="type" value={newInterview.type} onValueChange={(value) => handleInputChange({ target: { name: 'type', value } } as any)}>
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Phone">Phone</SelectItem>
                    <SelectItem value="Video">Video</SelectItem>
                    <SelectItem value="In-person">In-person</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Button onClick={addInterview}>Schedule Interview</Button>
          </CardContent>
        </Card>
        
        <Card {...upcomingInterviewsProps}>
          <CardHeader>
            <CardTitle>Upcoming Interviews</CardTitle>
            <CardDescription>List of scheduled interviews</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {interviews.map(interview => (
                <li key={interview.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-md">
                  <div className="flex-1">
                    <p className="font-medium">{interview.interviewerName}</p>
                    <p className="text-sm text-gray-600">
                      Candidate ID: <span className="font-medium">{interview.candidateId}</span>
                    </p>
                    <p className="text-xs text-gray-500">
                      {interview.date} at {interview.time} ({interview.duration})
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
