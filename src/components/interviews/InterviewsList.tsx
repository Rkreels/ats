
import { useState } from "react";
import { Interview } from "@/types";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Pencil, Trash2, Clock, Users } from "lucide-react";
import EnhancedVoiceTutorialListener from "@/components/voice/EnhancedVoiceTutorialListener";

interface InterviewsListProps {
  interviews: Interview[];
  onEdit?: (interview: Interview) => void;
  onDelete?: (interviewId: string) => void;
}

const InterviewsList = ({ interviews, onEdit, onDelete }: InterviewsListProps) => {
  const { toast } = useToast();
  const [editingInterview, setEditingInterview] = useState<Interview | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleEditInterview = (interview: Interview) => {
    setEditingInterview(interview);
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (editingInterview && onEdit) {
      onEdit(editingInterview);
      setIsEditDialogOpen(false);
      setEditingInterview(null);
      toast({
        title: "Interview Updated",
        description: "The interview has been successfully updated."
      });
    }
  };

  const handleDeleteInterview = (interviewId: string) => {
    if (onDelete) {
      onDelete(interviewId);
      toast({
        title: "Interview Deleted",
        description: "The interview has been removed from the schedule."
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Scheduled": return "bg-blue-100 text-blue-800";
      case "Completed": return "bg-green-100 text-green-800";
      case "Cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Video": return "🎥";
      case "Phone": return "📞";
      case "In-person": return "🏢";
      default: return "💼";
    }
  };

  return (
    <>
      <ScrollArea className="h-[500px]">
        <div className="space-y-4 pr-4">
          {interviews.map(interview => (
          <EnhancedVoiceTutorialListener
            key={interview.id}
            selector={`interview-${interview.id}`}
            description={`Interview with ${interview.interviewerName} scheduled for ${interview.date} at ${interview.time}. Status: ${interview.status}.`}
            actionStep="Use the action buttons to edit, reschedule, or cancel this interview."
            category="info"
            priority="medium"
          >
            <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    {getTypeIcon(interview.type)}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-semibold text-gray-900">{interview.interviewerName}</h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(interview.status)}`}>
                      {interview.status}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>Candidate ID: {interview.candidateId}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{interview.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{interview.time} ({interview.duration})</span>
                    </div>
                  </div>
                  <div className="mt-1">
                    <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                      {interview.type}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEditInterview(interview)}
                  className="flex items-center space-x-1"
                >
                  <Pencil className="h-4 w-4" />
                  <span>Edit</span>
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center space-x-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span>Cancel</span>
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Cancel Interview?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will cancel the interview with {interview.interviewerName} scheduled for {interview.date} at {interview.time}. This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Keep Interview</AlertDialogCancel>
                      <AlertDialogAction 
                        onClick={() => handleDeleteInterview(interview.id)}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        Cancel Interview
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </EnhancedVoiceTutorialListener>
        ))}
          {interviews.length === 0 && (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No interviews scheduled</h3>
              <p className="text-gray-500">Schedule your first interview to get started.</p>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Edit Interview Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="w-[95vw] max-w-[500px] max-h-[90vh] overflow-y-auto p-4 sm:p-6">
          <DialogHeader>
            <DialogTitle>Edit Interview</DialogTitle>
            <DialogDescription>
              Update the interview details below.
            </DialogDescription>
          </DialogHeader>
          {editingInterview && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-interviewer-name">Interviewer Name</Label>
                <Input
                  id="edit-interviewer-name"
                  value={editingInterview.interviewerName}
                  onChange={(e) => setEditingInterview({
                    ...editingInterview,
                    interviewerName: e.target.value
                  })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-date">Date</Label>
                <Input
                  id="edit-date"
                  type="date"
                  value={editingInterview.date}
                  onChange={(e) => setEditingInterview({
                    ...editingInterview,
                    date: e.target.value
                  })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-time">Time</Label>
                <Input
                  id="edit-time"
                  type="time"
                  value={editingInterview.time}
                  onChange={(e) => setEditingInterview({
                    ...editingInterview,
                    time: e.target.value
                  })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-duration">Duration</Label>
                <Input
                  id="edit-duration"
                  value={editingInterview.duration}
                  onChange={(e) => setEditingInterview({
                    ...editingInterview,
                    duration: e.target.value
                  })}
                  placeholder="e.g., 30 minutes"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-type">Type</Label>
                <Select
                  value={editingInterview.type}
                  onValueChange={(value) => setEditingInterview({
                    ...editingInterview,
                    type: value as any
                  })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Phone">Phone</SelectItem>
                    <SelectItem value="Video">Video</SelectItem>
                    <SelectItem value="In-person">In-person</SelectItem>
                    <SelectItem value="Behavioral">Behavioral</SelectItem>
                    <SelectItem value="Technical">Technical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-status">Status</Label>
                <Select
                  value={editingInterview.status}
                  onValueChange={(value) => setEditingInterview({
                    ...editingInterview,
                    status: value as any
                  })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Scheduled">Scheduled</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {editingInterview.notes !== undefined && (
                <div className="space-y-2">
                  <Label htmlFor="edit-notes">Notes</Label>
                  <Textarea
                    id="edit-notes"
                    value={editingInterview.notes || ""}
                    onChange={(e) => setEditingInterview({
                      ...editingInterview,
                      notes: e.target.value
                    })}
                    placeholder="Add interview notes..."
                  />
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEdit}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default InterviewsList;
