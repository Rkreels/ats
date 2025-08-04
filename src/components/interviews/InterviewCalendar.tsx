import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { ChevronLeft, ChevronRight, Clock, User, MapPin } from "lucide-react";
import { format } from "date-fns";
import { mockDataService } from "@/data/mockData";
import VoiceTutorialListener from "@/components/voice/VoiceTutorialListener";

interface InterviewEvent {
  id: string;
  title: string;
  candidateName: string;
  time: string;
  duration: string;
  type: "Phone" | "Video" | "In-person";
  status: "Scheduled" | "Completed" | "Cancelled";
  location?: string;
}

export default function InterviewCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [viewMode, setViewMode] = useState<"calendar" | "list">("calendar");

  // Mock interview events - in a real app, this would come from your data service
  const interviews: InterviewEvent[] = [
    {
      id: "1",
      title: "Frontend Developer Interview",
      candidateName: "John Smith",
      time: "10:00 AM",
      duration: "1 hour",
      type: "Video",
      status: "Scheduled"
    },
    {
      id: "2",
      title: "Backend Developer Interview",
      candidateName: "Alice Johnson",
      time: "2:00 PM",
      duration: "45 minutes",
      type: "Phone",
      status: "Scheduled"
    },
    {
      id: "3",
      title: "Product Manager Interview",
      candidateName: "Bob Williams",
      time: "4:00 PM",
      duration: "1.5 hours",
      type: "In-person",
      status: "Scheduled",
      location: "Conference Room A"
    }
  ];

  const todayInterviews = interviews.filter(interview => {
    // For demo purposes, showing all interviews as today's
    return interview.status === "Scheduled";
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Scheduled": return "bg-blue-100 text-blue-800";
      case "Completed": return "bg-green-100 text-green-800";
      case "Cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Video": return "📹";
      case "Phone": return "📞";
      case "In-person": return "👥";
      default: return "📅";
    }
  };

  return (
    <div className="space-y-6">
      <VoiceTutorialListener
        selector="interview-calendar-header"
        description="Interview calendar showing scheduled interviews and appointments"
        actionStep="Switch between calendar and list view, or select dates to view interviews"
      >
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Interview Calendar</CardTitle>
              <CardDescription>Manage and view scheduled interviews</CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button
                variant={viewMode === "calendar" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("calendar")}
              >
                Calendar
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                List
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {viewMode === "calendar" ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <VoiceTutorialListener
                  selector="calendar-picker"
                  description="Calendar for selecting dates and viewing interview schedules"
                  actionStep="Click on dates to view scheduled interviews for that day"
                >
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => date && setSelectedDate(date)}
                    className="rounded-md border"
                  />
                </VoiceTutorialListener>
                
                <div className="space-y-4">
                  <h3 className="font-medium">
                    Interviews for {format(selectedDate, "MMMM d, yyyy")}
                  </h3>
                  {todayInterviews.length === 0 ? (
                    <p className="text-muted-foreground text-sm">No interviews scheduled for this day</p>
                  ) : (
                    <div className="space-y-3">
                      {todayInterviews.map((interview) => (
                        <VoiceTutorialListener
                          key={interview.id}
                          selector={`calendar-interview-${interview.id}`}
                          description={`Interview with ${interview.candidateName} at ${interview.time}`}
                          actionStep="Click to view or edit interview details"
                        >
                          <div className="p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-lg">{getTypeIcon(interview.type)}</span>
                                  <h4 className="font-medium text-sm">{interview.title}</h4>
                                </div>
                                <div className="space-y-1 text-sm text-muted-foreground">
                                  <div className="flex items-center gap-1">
                                    <User className="h-3 w-3" />
                                    {interview.candidateName}
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {interview.time} ({interview.duration})
                                  </div>
                                  {interview.location && (
                                    <div className="flex items-center gap-1">
                                      <MapPin className="h-3 w-3" />
                                      {interview.location}
                                    </div>
                                  )}
                                </div>
                              </div>
                              <Badge className={getStatusColor(interview.status)}>
                                {interview.status}
                              </Badge>
                            </div>
                          </div>
                        </VoiceTutorialListener>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <VoiceTutorialListener
                selector="interview-list-view"
                description="List view of all scheduled interviews"
                actionStep="View all interviews in a detailed list format"
              >
                <div className="space-y-4">
                  {interviews.map((interview) => (
                    <VoiceTutorialListener
                      key={interview.id}
                      selector={`list-interview-${interview.id}`}
                      description={`${interview.type} interview with ${interview.candidateName}`}
                      actionStep="Click to manage this interview"
                    >
                      <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-center space-x-4">
                          <div className="text-2xl">{getTypeIcon(interview.type)}</div>
                          <div>
                            <h4 className="font-medium">{interview.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              {interview.candidateName} • {interview.time} • {interview.duration}
                            </p>
                            {interview.location && (
                              <p className="text-xs text-muted-foreground flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {interview.location}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(interview.status)}>
                            {interview.status}
                          </Badge>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </VoiceTutorialListener>
                  ))}
                </div>
              </VoiceTutorialListener>
            )}
          </CardContent>
        </Card>
      </VoiceTutorialListener>
    </div>
  );
}