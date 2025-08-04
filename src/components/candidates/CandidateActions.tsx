import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel,
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { MoreHorizontal, Edit, Trash2, Calendar, Mail, FileText, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useVoiceTrigger } from "@/hooks/useVoiceTrigger";
import { Candidate } from "@/types";

interface CandidateActionsProps {
  candidate: Candidate;
  onDelete?: (candidateId: string) => void;
  onEdit?: (candidate: Candidate) => void;
  onStatusChange?: (candidateId: string, newStatus: string) => void;
}

export default function CandidateActions({ 
  candidate, 
  onDelete, 
  onEdit, 
  onStatusChange 
}: CandidateActionsProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleViewProfile = () => {
    navigate(`/candidates/${candidate.id}`);
  };

  const handleScheduleInterview = () => {
    navigate(`/interviews?candidateId=${candidate.id}`);
    toast({
      title: "Interview Scheduling",
      description: `Redirected to schedule interview for ${candidate.name}`
    });
  };

  const handleSendEmail = () => {
    // In a real app, this would open an email composition dialog
    toast({
      title: "Email Feature",
      description: `Email functionality for ${candidate.name} would open here`
    });
  };

  const handleGenerateReport = () => {
    // In a real app, this would generate a candidate report
    toast({
      title: "Report Generated",
      description: `Candidate report for ${candidate.name} has been generated`
    });
  };

  const handleDelete = () => {
    onDelete?.(candidate.id);
    setIsDeleteDialogOpen(false);
    toast({
      title: "Candidate Deleted",
      description: `${candidate.name} has been removed from the system`
    });
  };

  const statusOptions = ["Applied", "Screen", "Interview", "Offer", "Hired", "Rejected"];

  const { voiceProps: actionsProps } = useVoiceTrigger({
    what: `Actions menu for candidate ${candidate.name}`,
    actionStep: "Click to see available actions like view profile, edit, delete, or schedule interview"
  });

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0" {...actionsProps}>
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px]">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          <DropdownMenuItem onClick={handleViewProfile}>
            <User className="mr-2 h-4 w-4" />
            View Profile
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={() => onEdit?.(candidate)}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Details
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={handleScheduleInterview}>
            <Calendar className="mr-2 h-4 w-4" />
            Schedule Interview
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={handleSendEmail}>
            <Mail className="mr-2 h-4 w-4" />
            Send Email
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={handleGenerateReport}>
            <FileText className="mr-2 h-4 w-4" />
            Generate Report
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuLabel>Status</DropdownMenuLabel>
          {statusOptions.map((status) => (
            <DropdownMenuItem 
              key={status}
              onClick={() => onStatusChange?.(candidate.id, status)}
              className={candidate.status === status ? "bg-accent" : ""}
            >
              {status} {candidate.status === status && "✓"}
            </DropdownMenuItem>
          ))}
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem 
            onClick={() => setIsDeleteDialogOpen(true)}
            className="text-red-600 focus:text-red-600"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Candidate
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete {candidate.name}'s 
              profile and remove all associated data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}