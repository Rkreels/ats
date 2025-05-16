import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Interview } from "@/types";
import InterviewForm from "@/components/interviews/InterviewForm";
import InterviewsList from "@/components/interviews/InterviewsList";
import VoiceTutorialListener from "@/components/voice/VoiceTutorialListener";

// Mock interviews data
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
  // Use our mock interviews instead of calling mockDataService
  const [interviews, setInterviews] = useState<Interview[]>(mockInterviews);
  
  const addInterview = (interview: Omit<Interview, "id">) => {
    const newId = `i-${interviews.length + 1}`;
    const completeInterview: Interview = { id: newId, ...interview };
    setInterviews(prev => [...prev, completeInterview]);
  };
  
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Interviews</h1>
          <p className="text-gray-600">Manage upcoming and past interviews</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <VoiceTutorialListener
          selector="schedule-interview-card"
          description="Use this form to schedule a new interview with a candidate."
          actionStep="Fill out all required fields and submit to add a new interview."
        >
          <Card>
            <CardHeader>
              <CardTitle>Schedule New Interview</CardTitle>
              <CardDescription>Create a new interview for a candidate</CardDescription>
            </CardHeader>
            <CardContent>
              <InterviewForm onAddInterview={addInterview} />
            </CardContent>
          </Card>
        </VoiceTutorialListener>
        <VoiceTutorialListener
          selector="upcoming-interviews-card"
          description="Displays a list of all scheduled and upcoming interviews."
          actionStep="You can view, edit, reschedule, or delete any interview from here."
        >
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Interviews</CardTitle>
              <CardDescription>List of scheduled interviews</CardDescription>
            </CardHeader>
            <CardContent>
              <InterviewsList interviews={interviews} />
            </CardContent>
          </Card>
        </VoiceTutorialListener>
      </div>
    </>
  );
}
