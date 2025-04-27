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
import { DayPicker } from "react-day-picker";
import { useToast } from "@/hooks/use-toast";

export default function Interviews() {
  const { toast } = useToast();
  const [interviews, setInterviews] = useState(mockDataService.getAllInterviews());
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
    what: "This is the interview scheduling section where you manage upcoming and past interviews. Schedule new interviews, send calendar invites, and track interview feedback."
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
    mockDataService.addInterview(completeInterview);
    
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
        <Card>
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
                    <DayPicker
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
                  <SelectTrigger>
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
        
        <Card>
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
