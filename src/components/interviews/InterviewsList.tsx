
import { Interview } from "@/types";

interface InterviewsListProps {
  interviews: Interview[];
}

const InterviewsList = ({ interviews }: InterviewsListProps) => {
  return (
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
      {interviews.length === 0 && (
        <li className="text-center py-4 text-gray-500">No interviews scheduled.</li>
      )}
    </ul>
  );
};

export default InterviewsList;
