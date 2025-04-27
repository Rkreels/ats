
import { useState } from "react";
import { useVoiceTrigger } from "@/hooks/useVoiceTrigger";
import { Calendar as CalendarIcon, Clock, Users, Search, Filter, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockDataService, Candidate, Interview } from "@/data/mockData";
import { cn } from "@/lib/utils";

interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  interviews: {
    id: string;
    time: string;
    candidate: Candidate;
    type: string;
    status: string;
  }[];
}

export default function Interviews() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState("");
  
  // Get calendar days for current month
  const calendarDays = getCalendarDays(currentMonth);
  
  // Voice tutorials
  const { voiceProps: calendarVoiceProps } = useVoiceTrigger({
    what: "This is the interview calendar where you can view and manage all scheduled interviews.",
    how: "Click on any day to see scheduled interviews or use the tabs to filter interviews by status.",
    decision: "You have 3 interviews scheduled for tomorrow. Consider spacing them out to avoid back-to-back sessions and allow time for reflection."
  });
  
  const { voiceProps: todayVoiceProps } = useVoiceTrigger({
    what: "This shows all interviews scheduled for today.",
    how: "Review these interviews to prepare for your day and make sure all logistics are in place."
  });
  
  // Go to previous month
  const prevMonth = () => {
    setCurrentMonth(prevDate => {
      const date = new Date(prevDate);
      date.setMonth(date.getMonth() - 1);
      return date;
    });
  };
  
  // Go to next month
  const nextMonth = () => {
    setCurrentMonth(prevDate => {
      const date = new Date(prevDate);
      date.setMonth(date.getMonth() + 1);
      return date;
    });
  };
  
  // Format month and year
  const monthYearFormat = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' });
  
  // Get today's interviews
  const todayInterviews = getTodayInterviews();
  
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Interview Schedule</h1>
          <p className="text-gray-600">Manage and schedule candidate interviews</p>
        </div>
        <div className="flex space-x-2">
          <Button>
            <CalendarIcon className="w-4 h-4 mr-2" />
            Schedule Interview
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2">
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <button 
                    onClick={prevMonth}
                    className="p-2 hover:bg-gray-100 rounded-full"
                    aria-label="Previous month"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <h2 className="text-lg font-semibold px-4">
                    {monthYearFormat.format(currentMonth)}
                  </h2>
                  <button 
                    onClick={nextMonth}
                    className="p-2 hover:bg-gray-100 rounded-full"
                    aria-label="Next month"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
                <button
                  onClick={() => setCurrentMonth(new Date())}
                  className="text-sm text-ats-primary hover:underline"
                >
                  Today
                </button>
              </div>
              
              <div 
                className="grid grid-cols-7 gap-2"
                {...calendarVoiceProps}
              >
                {/* Day headers */}
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="text-center py-2 font-medium text-sm text-gray-500">
                    {day}
                  </div>
                ))}
                
                {/* Calendar days */}
                {calendarDays.map((day, i) => {
                  const isToday = isSameDay(day.date, new Date());
                  const hasInterviews = day.interviews.length > 0;
                  
                  return (
                    <div 
                      key={i} 
                      className={cn(
                        "min-h-[100px] border rounded-md p-1 transition-colors",
                        day.isCurrentMonth ? "bg-white" : "bg-gray-50",
                        isToday && "border-ats-primary",
                        !day.isCurrentMonth && "text-gray-400"
                      )}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className={cn(
                          "text-sm font-medium",
                          isToday && "bg-ats-primary text-white w-6 h-6 rounded-full flex items-center justify-center"
                        )}>
                          {day.date.getDate()}
                        </span>
                        {hasInterviews && (
                          <span className="text-xs bg-ats-primary text-white rounded-full px-2 py-0.5">
                            {day.interviews.length}
                          </span>
                        )}
                      </div>
                      
                      {/* Show first 2 interviews */}
                      {day.interviews.slice(0, 2).map((interview, idx) => (
                        <div 
                          key={idx} 
                          className="text-xs p-1 mb-1 rounded bg-blue-50 text-blue-700 truncate"
                          title={`${interview.candidate.name} - ${interview.type}`}
                        >
                          {formatTime(interview.time)} - {interview.candidate.name.split(' ')[0]}
                        </div>
                      ))}
                      
                      {/* Show count if more */}
                      {day.interviews.length > 2 && (
                        <div className="text-xs text-gray-500 pl-1">
                          +{day.interviews.length - 2} more
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6" {...todayVoiceProps}>
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-4">Today's Interviews</h3>
              {todayInterviews.length > 0 ? (
                <div className="space-y-3">
                  {todayInterviews.map((interview, idx) => {
                    const { voiceProps } = useVoiceTrigger({
                      what: `This is a ${interview.type} interview with ${interview.candidate.name} scheduled for ${formatTime(interview.time)}.`,
                      how: "Click to view details or add interview notes. You can also reschedule or cancel if needed."
                    });
                    
                    return (
                      <div 
                        key={idx} 
                        className="p-3 border rounded-md hover:bg-gray-50 cursor-pointer"
                        {...voiceProps}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{interview.candidate.name}</p>
                            <p className="text-sm text-gray-600">{interview.type}</p>
                          </div>
                          <div className="flex items-center">
                            <Clock size={14} className="text-gray-400 mr-1" />
                            <span className="text-sm">{formatTime(interview.time)}</span>
                          </div>
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-xs text-gray-500">
                            {interview.candidate.role} • {interview.candidate.location}
                          </span>
                          <span className={cn(
                            "text-xs px-2 py-0.5 rounded-full",
                            interview.status === 'Scheduled' ? "bg-blue-100 text-blue-700" : 
                            interview.status === 'Completed' ? "bg-green-100 text-green-700" :
                            "bg-gray-100 text-gray-700"
                          )}>
                            {interview.status}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center p-6 border border-dashed border-gray-300 rounded-md">
                  <CalendarIcon className="w-12 h-12 mx-auto text-gray-300 mb-2" />
                  <p className="text-gray-500">No interviews scheduled for today</p>
                  <p className="text-sm text-gray-400 mt-1">Time to catch up on other tasks!</p>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-4">Upcoming</h3>
              <div className="space-y-3">
                {getUpcomingInterviews().map((interview, idx) => (
                  <div key={idx} className="flex items-center p-2 border-b last:border-0">
                    <div className="w-10 text-xs text-gray-500">
                      {new Date(interview.time).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </div>
                    <div className="ml-2">
                      <p className="text-sm font-medium">{interview.candidate.name}</p>
                      <p className="text-xs text-gray-500">{interview.type}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="mb-6">
        <Tabs defaultValue="all">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="all">All Interviews</TabsTrigger>
              <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
            </TabsList>
            
            <div className="flex space-x-2">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <Input
                  placeholder="Search interviews..."
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <TabsContent value="all" className="mt-0">
            <InterviewList interviews={getAllInterviews()} searchTerm={searchTerm} />
          </TabsContent>
          
          <TabsContent value="scheduled" className="mt-0">
            <InterviewList 
              interviews={getAllInterviews().filter(i => i.status === 'Scheduled')} 
              searchTerm={searchTerm} 
            />
          </TabsContent>
          
          <TabsContent value="completed" className="mt-0">
            <InterviewList 
              interviews={getAllInterviews().filter(i => i.status === 'Completed')} 
              searchTerm={searchTerm} 
            />
          </TabsContent>
          
          <TabsContent value="cancelled" className="mt-0">
            <InterviewList 
              interviews={getAllInterviews().filter(i => i.status === 'Cancelled' || i.status === 'No-show')} 
              searchTerm={searchTerm} 
            />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}

// Helper components
interface InterviewWithCandidate {
  id: string;
  time: string;
  duration: number;
  type: string;
  status: string;
  candidate: Candidate;
  interviewerId: string;
  interviewerName: string;
  feedback?: string;
}

interface InterviewListProps {
  interviews: InterviewWithCandidate[];
  searchTerm: string;
}

function InterviewList({ interviews, searchTerm }: InterviewListProps) {
  // Filter interviews based on search term
  const filteredInterviews = interviews.filter(interview => 
    interview.candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    interview.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    interview.interviewerName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="border rounded-md overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50 border-b text-left">
            <th className="py-3 px-4 font-medium text-gray-500">Candidate</th>
            <th className="py-3 px-4 font-medium text-gray-500">Date & Time</th>
            <th className="py-3 px-4 font-medium text-gray-500">Type</th>
            <th className="py-3 px-4 font-medium text-gray-500">Interviewer</th>
            <th className="py-3 px-4 font-medium text-gray-500">Status</th>
            <th className="py-3 px-4 font-medium text-gray-500">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredInterviews.length > 0 ? (
            filteredInterviews.map((interview, idx) => {
              const { voiceProps } = useVoiceTrigger({
                what: `This is a ${interview.type} interview with ${interview.candidate.name} scheduled for ${formatDateTime(interview.time)}.`,
                how: "Click on 'View Details' to see interview information and add feedback.",
                decision: interview.status === 'Completed' && !interview.feedback ? 
                  "This interview was completed but no feedback has been recorded yet. Add your feedback within 24 hours for most accurate assessment." : 
                  undefined
              });
              
              return (
                <tr 
                  key={idx} 
                  className="border-b last:border-0 hover:bg-gray-50"
                  {...voiceProps}
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 mr-2">
                        {interview.candidate.avatar ? (
                          <img src={interview.candidate.avatar} alt={interview.candidate.name} className="w-full h-full object-cover" />
                        ) : (
                          <Users className="w-full h-full p-1" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{interview.candidate.name}</p>
                        <p className="text-xs text-gray-500">{interview.candidate.role}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <p className="font-medium">{formatDate(interview.time)}</p>
                    <p className="text-xs text-gray-500">{formatTime(interview.time)} ({interview.duration} min)</p>
                  </td>
                  <td className="py-3 px-4">{interview.type}</td>
                  <td className="py-3 px-4">{interview.interviewerName}</td>
                  <td className="py-3 px-4">
                    <span className={cn(
                      "inline-block px-2 py-1 text-xs rounded-full",
                      interview.status === 'Scheduled' ? "bg-blue-100 text-blue-700" : 
                      interview.status === 'Completed' ? "bg-green-100 text-green-700" :
                      interview.status === 'No-show' ? "bg-red-100 text-red-700" :
                      "bg-gray-100 text-gray-700"
                    )}>
                      {interview.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        View Details
                      </Button>
                      {interview.status === 'Completed' && !interview.feedback && (
                        <Button size="sm">Add Feedback</Button>
                      )}
                      {interview.status === 'Scheduled' && (
                        <Button variant="outline" size="sm">Reschedule</Button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={6} className="py-6 text-center">
                <p className="text-gray-500">No interviews found</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

// Helper functions
function getCalendarDays(date: Date): CalendarDay[] {
  const days: CalendarDay[] = [];
  
  const year = date.getFullYear();
  const month = date.getMonth();
  
  // First day of the month
  const firstDay = new Date(year, month, 1);
  // Last day of the month
  const lastDay = new Date(year, month + 1, 0);
  
  // Start from the previous month to fill first week
  const startDate = new Date(firstDay);
  startDate.setDate(firstDay.getDate() - firstDay.getDay());
  
  // End at the next month to fill last week
  const endDate = new Date(lastDay);
  endDate.setDate(lastDay.getDate() + (6 - lastDay.getDay()));
  
  // Generate calendar days
  const currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    days.push({
      date: new Date(currentDate),
      isCurrentMonth: currentDate.getMonth() === month,
      interviews: getInterviewsForDay(currentDate)
    });
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return days;
}

function getInterviewsForDay(date: Date) {
  // Get interviews from mock data
  const allCandidates = mockDataService.getAllCandidates();
  const interviews: any[] = [];
  
  allCandidates.forEach(candidate => {
    if (candidate.interviews) {
      candidate.interviews.forEach(interview => {
        const interviewDate = new Date(interview.scheduledTime);
        
        if (isSameDay(interviewDate, date)) {
          interviews.push({
            id: interview.id,
            time: interview.scheduledTime,
            candidate,
            type: interview.type,
            status: interview.status
          });
        }
      });
    }
  });
  
  return interviews.sort((a, b) => 
    new Date(a.time).getTime() - new Date(b.time).getTime()
  );
}

function getTodayInterviews() {
  const today = new Date();
  return getInterviewsForDay(today);
}

function getUpcomingInterviews() {
  const allCandidates = mockDataService.getAllCandidates();
  const today = new Date();
  const interviews: any[] = [];
  
  allCandidates.forEach(candidate => {
    if (candidate.interviews) {
      candidate.interviews.forEach(interview => {
        const interviewDate = new Date(interview.scheduledTime);
        
        // Only include scheduled future interviews (and not today's)
        if (interviewDate > today && interview.status === 'Scheduled' && !isSameDay(interviewDate, today)) {
          interviews.push({
            id: interview.id,
            time: interview.scheduledTime,
            candidate,
            type: interview.type
          });
        }
      });
    }
  });
  
  // Sort by date and take only next 5
  return interviews
    .sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime())
    .slice(0, 5);
}

function getAllInterviews(): InterviewWithCandidate[] {
  const allCandidates = mockDataService.getAllCandidates();
  const interviews: InterviewWithCandidate[] = [];
  
  allCandidates.forEach(candidate => {
    if (candidate.interviews) {
      candidate.interviews.forEach(interview => {
        interviews.push({
          id: interview.id,
          time: interview.scheduledTime,
          duration: interview.duration,
          type: interview.type,
          status: interview.status,
          candidate,
          interviewerId: interview.interviewerId,
          interviewerName: interview.interviewerName,
          feedback: interview.feedback
        });
      });
    }
  });
  
  // Sort by date
  return interviews.sort((a, b) => 
    new Date(b.time).getTime() - new Date(a.time).getTime()
  );
}

function isSameDay(d1: Date, d2: Date) {
  return d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();
}

function formatTime(timeString: string) {
  const date = new Date(timeString);
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
}

function formatDate(timeString: string) {
  const date = new Date(timeString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function formatDateTime(timeString: string) {
  const date = new Date(timeString);
  return `${formatDate(timeString)} at ${formatTime(timeString)}`;
}
