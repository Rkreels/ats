import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Interview } from "@/types";
import InterviewForm from "@/components/interviews/InterviewForm";
import InterviewsList from "@/components/interviews/InterviewsList";
import { mockDataService } from "@/data/mockData";

export default function Interviews() {
  const [interviews, setInterviews] = useState<Interview[]>(mockDataService.getAllInterviews());
  
  const addInterview = (interview: Omit<Interview, "id">) => {
    mockDataService.addInterview(interview);
    setInterviews([...mockDataService.getAllInterviews()]);
  };

  const editInterview = (updatedInterview: Interview) => {
    mockDataService.updateInterview(updatedInterview);
    setInterviews([...mockDataService.getAllInterviews()]);
  };

  const deleteInterview = (interviewId: string) => {
    mockDataService.deleteInterview(interviewId);
    setInterviews([...mockDataService.getAllInterviews()]);
  };
  
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Interviews</h1>
          <p className="text-gray-600">Manage upcoming and past interviews ({interviews.length} total)</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Schedule New Interview</CardTitle>
            <CardDescription>Create a new interview for a candidate</CardDescription>
          </CardHeader>
          <CardContent>
            <InterviewForm onAddInterview={addInterview} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Interviews</CardTitle>
            <CardDescription>List of scheduled interviews</CardDescription>
          </CardHeader>
          <CardContent>
            <InterviewsList 
              interviews={interviews} 
              onEdit={editInterview}
              onDelete={deleteInterview}
            />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
