import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Candidate } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MoreVertical, Edit, Trash2, Eye } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import VoiceTutorialListener from "@/components/voice/VoiceTutorialListener";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { CandidateEdit } from "@/components/candidates/detail/CandidateEdit";

interface CandidateTableProps {
  candidates: Candidate[];
  onDelete: (id: string) => void;
  onEditCandidate?: (candidate: Candidate) => void; // Optional prop for extra flexibility
}

const CandidateTable = ({ candidates, onDelete }: CandidateTableProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // State to handle edit modal
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [candidateToEdit, setCandidateToEdit] = useState<Candidate | null>(null);

  const viewCandidateDetails = (id: string) => {
    navigate(`/candidates/${id}`);
  };

  const handleDelete = (id: string, name: string) => {
    onDelete(id);
    toast({
      title: "Candidate deleted",
      description: `The candidate "${name}" has been deleted.`
    });
  };

  return (
    <>
      <VoiceTutorialListener
        selector="candidate-table-root"
        description="Below is the main candidate table. You can view details, edit, or delete each candidate using actions on each row."
        actionStep="Every row supports viewing details, edit or delete from the actions menu."
      >
        <ScrollArea className="rounded-md border h-[400px] w-full">
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0">
                <tr>
                  <th scope="col" className="px-6 py-3">Name</th>
                  <th scope="col" className="px-6 py-3">Role</th>
                  <th scope="col" className="px-6 py-3">Status</th>
                  <th scope="col" className="px-6 py-3">Applied Date</th>
                  <th scope="col" className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {candidates.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center">
                      No candidates found.
                    </td>
                  </tr>
                ) : (
                  candidates.map(candidate => (
                    <tr 
                      key={candidate.id} 
                      className="bg-white border-b hover:bg-gray-50 cursor-pointer"
                      onClick={() => viewCandidateDetails(candidate.id)}
                    >
                      <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap">
                        <Avatar className="mr-3">
                          <AvatarImage src={candidate.avatar} alt={candidate.name} />
                          <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        {candidate.name}
                      </th>
                      <td className="px-6 py-4">
                        {candidate.role}
                      </td>
                      <td className="px-6 py-4">
                        {candidate.status}
                      </td>
                      <td className="px-6 py-4">
                        {candidate.appliedDate}
                      </td>
                      <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <VoiceTutorialListener
                              selector={`actions-menu-${candidate.id}`}
                              description={`Actions for candidate ${candidate.name}`}
                              actionStep={`Open menu for viewing, editing, or deleting ${candidate.name}`}
                            >
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </VoiceTutorialListener>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem asChild>
                              <VoiceTutorialListener
                                selector={`view-details-${candidate.id}`}
                                description={`View details for candidate ${candidate.name}`}
                                actionStep="Click to see the candidate profile"
                              >
                                <div onClick={() => viewCandidateDetails(candidate.id)}>
                                  <Eye className="mr-2 h-4 w-4" /> View Details
                                </div>
                              </VoiceTutorialListener>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setCandidateToEdit(candidate);
                                setEditModalOpen(true);
                              }}
                            >
                              <VoiceTutorialListener
                                selector={`edit-candidate-${candidate.id}`}
                                description={`Edit candidate ${candidate.name}`}
                                actionStep="Click to edit this candidate's info"
                              >
                                <div>
                                  <Edit className="mr-2 h-4 w-4" /> Edit
                                </div>
                              </VoiceTutorialListener>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDelete(candidate.id, candidate.name)}
                            >
                              <VoiceTutorialListener
                                selector={`delete-candidate-${candidate.id}`}
                                description={`Delete candidate ${candidate.name}`}
                                actionStep="Click to permanently remove"
                              >
                                <div>
                                  <Trash2 className="mr-2 h-4 w-4" /> Delete
                                </div>
                              </VoiceTutorialListener>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <VoiceTutorialListener
                                selector={`view-resume-${candidate.id}`}
                                description={`View resume for candidate ${candidate.name}`}
                                actionStep="Click to preview the resume"
                              >
                                <a href={candidate.resumeUrl} target="_blank" rel="noopener noreferrer" className="flex items-center">
                                  View Resume
                                </a>
                              </VoiceTutorialListener>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </ScrollArea>
      </VoiceTutorialListener>
    
      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Candidate</DialogTitle>
          </DialogHeader>
          {candidateToEdit && (
            <CandidateEdit
              candidate={candidateToEdit}
              setCandidate={(updated) => {
                setEditModalOpen(false);
                setCandidateToEdit(null);
                // Reload the page or call a refetch as the parent maintains the candidate list!
                // Optionally, you could add a callback to update the parent, if required.
                window.location.reload();
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
