
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Candidate } from "@/types";

interface CandidateHeaderProps {
  candidate: Candidate;
  handleUpdateStatus: (status: Candidate['status']) => void;
  hasPermission: (permission: string) => boolean;
}

export function CandidateHeader({ candidate, handleUpdateStatus, hasPermission }: CandidateHeaderProps) {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">{candidate.name}</h1>
        <p className="text-gray-600">{candidate.role}</p>
      </div>
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
        {hasPermission('canEditCandidates') ? (
          <Select onValueChange={handleUpdateStatus} defaultValue={candidate.status}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Update Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Applied">Applied</SelectItem>
              <SelectItem value="Screen">Screen</SelectItem>
              <SelectItem value="Interview">Interview</SelectItem>
              <SelectItem value="Offer">Offer</SelectItem>
              <SelectItem value="Hired">Hired</SelectItem>
              <SelectItem value="Rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        ) : (
          <Badge>{candidate.status}</Badge>
        )}
        
        <Button variant="outline" onClick={() => navigate("/candidates")}>Back to Candidates</Button>
      </div>
    </div>
  );
}
