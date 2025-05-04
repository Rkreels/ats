
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Candidate } from "@/types";
import { mockDataService } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

interface CandidateOverviewProps {
  candidate: Candidate;
  setCandidate: React.Dispatch<React.SetStateAction<Candidate | null>>;
  hasPermission: (permission: string) => boolean;
}

export function CandidateOverview({ candidate, setCandidate, hasPermission }: CandidateOverviewProps) {
  const { toast } = useToast();
  
  const handleAddNote = (note: string) => {
    if (!candidate) return;
    
    // In a real app, this would be an API call
    const updatedCandidate = { 
      ...candidate, 
      notes: `${candidate.notes}\n${note}`,
      lastUpdated: new Date().toISOString()
    };
    
    mockDataService.updateCandidate(updatedCandidate);
    setCandidate(updatedCandidate);
    
    toast({
      title: "Note added",
      description: "Note has been added to the candidate's profile."
    });
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Overview</CardTitle>
        <CardDescription>Candidate notes and details</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Notes</h3>
          <p className="text-gray-600 whitespace-pre-wrap">{candidate.notes || "No notes available."}</p>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Feedback</h3>
          <p className="text-gray-600">{candidate.feedback || "No feedback available."}</p>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Last Updated</h3>
          <p className="text-gray-600">{new Date(candidate.lastUpdated).toLocaleDateString()}</p>
        </div>
        
        {hasPermission('canEditCandidates') && (
          <Dialog>
            <DialogTrigger asChild>
              <Button>Add Note</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Note</DialogTitle>
                <DialogDescription>
                  Add a note to the candidate's profile.
                </DialogDescription>
              </DialogHeader>
              <AddNoteForm onSubmit={handleAddNote} />
            </DialogContent>
          </Dialog>
        )}
      </CardContent>
    </Card>
  );
}

interface AddNoteFormProps {
  onSubmit: (note: string) => void;
}

function AddNoteForm({ onSubmit }: AddNoteFormProps) {
  const [note, setNote] = useState("");
  
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(note);
    setNote("");
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="note">Note</Label>
        <Textarea id="note" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Add a note about the candidate" />
      </div>
      <div className="flex justify-end">
        <Button type="submit">Add Note</Button>
      </div>
    </form>
  );
}
