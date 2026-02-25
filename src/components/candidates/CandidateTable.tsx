import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Candidate } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreVertical, Edit, Trash2, Eye } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { CandidateEdit } from "@/components/candidates/detail/CandidateEdit";
import { mockDataService } from "@/data/mockData";

interface CandidateTableProps {
  candidates: Candidate[];
  onDelete: (id: string) => void;
  onRefresh?: () => void;
}

const CandidateTable = ({ candidates, onDelete, onRefresh }: CandidateTableProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [candidateToEdit, setCandidateToEdit] = useState<Candidate | null>(null);

  const viewCandidateDetails = (id: string) => {
    navigate(`/candidates/${id}`);
  };

  const handleDelete = (id: string, name: string) => {
    onDelete(id);
    toast({ title: "Candidate deleted", description: `"${name}" has been deleted.` });
  };

  return (
    <>
      <ScrollArea className="rounded-md border h-[400px] w-full">
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 min-w-[600px]">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0">
              <tr>
                <th className="px-3 sm:px-6 py-3">Name</th>
                <th className="px-3 sm:px-6 py-3 hidden sm:table-cell">Role</th>
                <th className="px-3 sm:px-6 py-3">Status</th>
                <th className="px-3 sm:px-6 py-3 hidden md:table-cell">Applied Date</th>
                <th className="px-3 sm:px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {candidates.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-4 text-center">No candidates found.</td></tr>
              ) : candidates.map(candidate => (
                <tr key={candidate.id} className="bg-white border-b hover:bg-gray-50 cursor-pointer" onClick={() => viewCandidateDetails(candidate.id)}>
                  <th scope="row" className="flex items-center px-3 sm:px-6 py-4 text-gray-900 whitespace-nowrap">
                    <Avatar className="mr-2 sm:mr-3 h-8 w-8 sm:h-10 sm:w-10">
                      <AvatarImage src={candidate.avatar} alt={candidate.name} />
                      <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-medium">{candidate.name}</span>
                      <span className="text-xs text-gray-500 sm:hidden">{candidate.role}</span>
                    </div>
                  </th>
                  <td className="px-3 sm:px-6 py-4 hidden sm:table-cell">{candidate.role}</td>
                  <td className="px-3 sm:px-6 py-4">
                    <Badge variant="outline" className="text-xs">{candidate.status}</Badge>
                  </td>
                  <td className="px-3 sm:px-6 py-4 hidden md:table-cell">{candidate.appliedDate}</td>
                  <td className="px-3 sm:px-6 py-4" onClick={(e) => e.stopPropagation()}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => viewCandidateDetails(candidate.id)}>
                          <Eye className="mr-2 h-4 w-4" /> View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => { setCandidateToEdit(candidate); setEditModalOpen(true); }}>
                          <Edit className="mr-2 h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(candidate.id, candidate.name)} className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => {
                          toast({ title: "Resume", description: candidate.resumeUrl && candidate.resumeUrl !== '/placeholder.svg' ? "Opening resume..." : "No resume available for this candidate." });
                        }}>
                          View Resume
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ScrollArea>
    
      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent className="w-[95vw] max-w-[600px] max-h-[90vh] overflow-y-auto p-4 sm:p-6">
          <DialogHeader>
            <DialogTitle>Edit Candidate</DialogTitle>
          </DialogHeader>
          {candidateToEdit && (
            <CandidateEdit
              candidate={candidateToEdit}
              setCandidate={(updated) => {
                setEditModalOpen(false);
                setCandidateToEdit(null);
                if (onRefresh) onRefresh();
              }}
            />
          )}
          <DialogClose asChild>
            <Button variant="outline" className="mt-3 w-full">Cancel</Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CandidateTable;
