
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Candidate } from "@/types";
import { mockDataService } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";
import EnhancedVoiceTutorialListener from "@/components/voice/EnhancedVoiceTutorialListener";

interface CandidateOverviewProps {
  candidate: Candidate;
  setCandidate: React.Dispatch<React.SetStateAction<Candidate | null>>;
  hasPermission: (permission: string) => boolean;
}

export function CandidateOverview({ candidate, setCandidate, hasPermission }: CandidateOverviewProps) {
  const { toast } = useToast();
  
  const handleAddNote = (note: string) => {
    if (!candidate) return;
    
    try {
      const updatedCandidate = { 
        ...candidate, 
        notes: candidate.notes ? `${candidate.notes}\n\n${new Date().toLocaleDateString()}: ${note}` : `${new Date().toLocaleDateString()}: ${note}`,
        lastUpdated: new Date().toISOString()
      };
      
      mockDataService.updateCandidate(updatedCandidate);
      setCandidate(updatedCandidate);
      
      toast({
        title: "Note added",
        description: "Note has been added to the candidate's profile."
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add note. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  return (
    <EnhancedVoiceTutorialListener
      selector="candidate-overview-card"
      description="Candidate overview showing notes, feedback, and last updated information."
      category="info"
      priority="medium"
    >
      <Card>
        <CardHeader>
          <CardTitle>Overview</CardTitle>
          <CardDescription>Candidate notes and details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <EnhancedVoiceTutorialListener
            selector="candidate-notes-section"
            description="Candidate notes section showing all recorded notes about this candidate."
            category="info"
          >
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Notes</h3>
              <div className="bg-gray-50 p-3 rounded-md min-h-[80px]">
                <p className="text-gray-600 whitespace-pre-wrap">
                  {candidate.notes || "No notes available."}
                </p>
              </div>
            </div>
          </EnhancedVoiceTutorialListener>
          
          <EnhancedVoiceTutorialListener
            selector="candidate-feedback-section"
            description="Candidate feedback section showing interview feedback and comments."
            category="info"
          >
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Feedback</h3>
              <div className="bg-gray-50 p-3 rounded-md min-h-[60px]">
                <p className="text-gray-600">{candidate.feedback || "No feedback available."}</p>
              </div>
            </div>
          </EnhancedVoiceTutorialListener>
          
          <EnhancedVoiceTutorialListener
            selector="candidate-last-updated"
            description="Shows when the candidate profile was last updated."
            category="info"
          >
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Last Updated</h3>
              <p className="text-gray-600">{new Date(candidate.lastUpdated).toLocaleDateString()}</p>
            </div>
          </EnhancedVoiceTutorialListener>
          
          {hasPermission('canEditCandidates') && (
            <EnhancedVoiceTutorialListener
              selector="add-note-dialog"
              description="Add note dialog for adding new notes to the candidate profile."
              actionStep="Click to open the note dialog and add your observations."
              category="action"
            >
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Add Note</Button>
                </DialogTrigger>
                <DialogContent className="w-[95vw] max-w-[500px] max-h-[90vh] overflow-y-auto p-4 sm:p-6">
                  <DialogHeader>
                    <DialogTitle>Add Note</DialogTitle>
                    <DialogDescription>
                      Add a note to the candidate's profile.
                    </DialogDescription>
                  </DialogHeader>
                  <AddNoteForm onSubmit={handleAddNote} />
                </DialogContent>
              </Dialog>
            </EnhancedVoiceTutorialListener>
          )}
        </CardContent>
      </Card>
    </EnhancedVoiceTutorialListener>
  );
}

interface AddNoteFormProps {
  onSubmit: (note: string) => void;
}

function AddNoteForm({ onSubmit }: AddNoteFormProps) {
  const [note, setNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!note.trim()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      onSubmit(note.trim());
      setNote("");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <EnhancedVoiceTutorialListener
      selector="add-note-form"
      description="Form for adding a new note to the candidate profile."
      actionStep="Type your note and click Add Note to save it."
      category="form"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="note">Note</Label>
          <Textarea 
            id="note" 
            value={note} 
            onChange={(e) => setNote(e.target.value)} 
            placeholder="Add a note about the candidate"
            rows={4}
            required
          />
        </div>
        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting || !note.trim()}>
            {isSubmitting ? "Adding..." : "Add Note"}
          </Button>
        </div>
      </form>
    </EnhancedVoiceTutorialListener>
  );
}
