
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Candidate } from "@/types";

interface CandidateApplicationProps {
  candidate: Candidate;
}

export function CandidateApplication({ candidate }: CandidateApplicationProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Application Details</CardTitle>
        <CardDescription>Resume, cover letter, and application info</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Resume</h3>
          <a href={candidate.resumeUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
            View Resume
          </a>
        </div>
        
        {candidate.coverLetterUrl && (
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Cover Letter</h3>
            <a href={candidate.coverLetterUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              View Cover Letter
            </a>
          </div>
        )}
        
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Applied Date</h3>
          <p className="text-gray-600">{new Date(candidate.appliedDate).toLocaleDateString()}</p>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Source</h3>
          <p className="text-gray-600">{candidate.source}</p>
        </div>
      </CardContent>
    </Card>
  );
}
