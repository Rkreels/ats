import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Mail, Phone, Calendar, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Candidate } from "@/types";
import { useVoiceTrigger } from "@/hooks/useVoiceTrigger";
import EnhancedVoiceTutorialListener from "@/components/voice/EnhancedVoiceTutorialListener";

interface CandidateHeaderProps {
  candidate: Candidate;
  handleUpdateStatus: (status: Candidate['status']) => void;
  hasPermission: (permission: string) => boolean;
}

export function CandidateHeader({ candidate, handleUpdateStatus, hasPermission }: CandidateHeaderProps) {
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Applied": return "bg-blue-100 text-blue-800";
      case "Under Review": return "bg-yellow-100 text-yellow-800";
      case "Interview": return "bg-purple-100 text-purple-800";
      case "Hired": return "bg-green-100 text-green-800";
      case "Rejected": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const { voiceProps: backButtonProps } = useVoiceTrigger({
    what: "Return to candidates list",
    actionStep: "Click to go back to the main candidates page"
  });

  const { voiceProps: statusUpdateProps } = useVoiceTrigger({
    what: `Update candidate status. Current status: ${candidate.status}`,
    actionStep: "Select a new status to update the candidate's progress"
  });

  return (
    <EnhancedVoiceTutorialListener
      selector="candidate-header"
      description={`Candidate header for ${candidate.name}. Current status: ${candidate.status}. Role applied for: ${candidate.role}`}
      actionStep="Update status, contact candidate, or return to candidates list"
      category="navigation"
      priority="high"
    >
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/candidates")}
              className="flex items-center"
              {...backButtonProps}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Candidates
            </Button>
            
            {hasPermission('canEditCandidates') && (
              <EnhancedVoiceTutorialListener
                selector="status-update-dropdown"
                description="Change candidate status in the recruitment pipeline"
                actionStep="Select new status to update candidate progress"
                category="action"
                priority="high"
              >
                <Select value={candidate.status} onValueChange={handleUpdateStatus}>
                  <SelectTrigger className="w-48" {...statusUpdateProps}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Applied">Applied</SelectItem>
                    <SelectItem value="Under Review">Under Review</SelectItem>
                    <SelectItem value="Interview">Interview</SelectItem>
                    <SelectItem value="Hired">Hired</SelectItem>
                    <SelectItem value="Rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </EnhancedVoiceTutorialListener>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-start space-x-4">
            <EnhancedVoiceTutorialListener
              selector="candidate-avatar"
              description={`${candidate.name}'s profile picture`}
              category="info"
            >
              <Avatar className="h-16 w-16">
                <AvatarImage src={candidate.avatar} alt={candidate.name} />
                <AvatarFallback className="text-lg">{candidate.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </EnhancedVoiceTutorialListener>
            
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{candidate.name}</h1>
                  <p className="text-lg text-gray-600">{candidate.role}</p>
                  <Badge className={`mt-2 ${getStatusColor(candidate.status)}`}>
                    {candidate.status}
                  </Badge>
                </div>
                
                <div className="flex space-x-2">
                  <EnhancedVoiceTutorialListener
                    selector="contact-email-button"
                    description={`Send email to ${candidate.name}`}
                    actionStep="Click to open email client"
                    category="action"
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.location.href = `mailto:${candidate.email}`}
                      {...useVoiceTrigger({
                        what: `Send email to ${candidate.name}`,
                        actionStep: "Opens your email client with candidate's address"
                      }).voiceProps}
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Email
                    </Button>
                  </EnhancedVoiceTutorialListener>
                  
                  <EnhancedVoiceTutorialListener
                    selector="contact-phone-button"
                    description={`Call ${candidate.name}`}
                    actionStep="Click to initiate phone call"
                    category="action"
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.location.href = `tel:${candidate.phone}`}
                      {...useVoiceTrigger({
                        what: `Call ${candidate.name}`,
                        actionStep: "Initiates phone call to candidate"
                      }).voiceProps}
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Call
                    </Button>
                  </EnhancedVoiceTutorialListener>
                </div>
              </div>
              
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <EnhancedVoiceTutorialListener
                  selector="candidate-email-info"
                  description={`Email address: ${candidate.email}`}
                  category="info"
                >
                  <div className="flex items-center text-gray-600">
                    <Mail className="h-4 w-4 mr-2" />
                    <span>{candidate.email}</span>
                  </div>
                </EnhancedVoiceTutorialListener>
                
                <EnhancedVoiceTutorialListener
                  selector="candidate-phone-info"
                  description={`Phone number: ${candidate.phone}`}
                  category="info"
                >
                  <div className="flex items-center text-gray-600">
                    <Phone className="h-4 w-4 mr-2" />
                    <span>{candidate.phone}</span>
                  </div>
                </EnhancedVoiceTutorialListener>
                
                <EnhancedVoiceTutorialListener
                  selector="candidate-applied-date"
                  description={`Applied on: ${candidate.appliedDate}`}
                  category="info"
                >
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Applied: {candidate.appliedDate}</span>
                  </div>
                </EnhancedVoiceTutorialListener>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </EnhancedVoiceTutorialListener>
  );
}