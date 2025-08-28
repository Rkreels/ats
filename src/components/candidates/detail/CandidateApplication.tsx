import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ExternalLink, FileText, Download } from "lucide-react";
import { Candidate } from "@/types";
import { mockDataService } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";
import EnhancedVoiceTutorialListener from "@/components/voice/EnhancedVoiceTutorialListener";

interface CandidateApplicationProps {
  candidate: Candidate;
  setCandidate: React.Dispatch<React.SetStateAction<Candidate | null>>;
  hasPermission: (permission: string) => boolean;
}

export function CandidateApplication({ candidate, setCandidate, hasPermission }: CandidateApplicationProps) {
  const { toast } = useToast();
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  
  const handleStatusUpdate = async (newStatus: Candidate['status']) => {
    if (!candidate) return;
    
    setIsUpdatingStatus(true);
    try {
      const updatedCandidate = {
        ...candidate,
        status: newStatus,
        lastUpdated: new Date().toISOString()
      };
      
      mockDataService.updateCandidate(updatedCandidate);
      setCandidate(updatedCandidate);
      
      toast({
        title: "Status updated",
        description: `Candidate status changed to ${newStatus}`
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update status. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsUpdatingStatus(false);
    }
  };
  
  const handleDownloadResume = () => {
    // Mock download functionality
    toast({
      title: "Download started",
      description: "Resume download will begin shortly."
    });
  };
  
  return (
    <EnhancedVoiceTutorialListener
      selector="candidate-application-card"
      description="Candidate application details including resume, cover letter, and application status."
      category="info"
      priority="high"
    >
      <Card>
        <CardHeader>
          <CardTitle>Application Details</CardTitle>
          <CardDescription>Resume, cover letter, and application status</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Application Status */}
          <EnhancedVoiceTutorialListener
            selector="application-status-section"
            description="Current application status with ability to update progress."
            category="info"
          >
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Application Status</h3>
              <div className="flex items-center justify-between">
                <Badge 
                  variant={
                    candidate.status === "Hired" ? "default" :
                    candidate.status === "Rejected" ? "destructive" :
                    candidate.status === "Offer" ? "secondary" :
                    "outline"
                  }
                  className="text-sm px-3 py-1"
                >
                  {candidate.status}
                </Badge>
                
                {hasPermission('canEditCandidates') && (
                  <EnhancedVoiceTutorialListener
                    selector="status-update-dropdown"
                    description="Update candidate application status dropdown."
                    actionStep="Select a new status to update the candidate's progress."
                    category="action"
                  >
                    <Select 
                      value={candidate.status} 
                      onValueChange={handleStatusUpdate}
                      disabled={isUpdatingStatus}
                    >
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Update status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Applied">Applied</SelectItem>
                        <SelectItem value="Screen">Screen</SelectItem>
                        <SelectItem value="Interview">Interview</SelectItem>
                        <SelectItem value="Technical">Technical</SelectItem>
                        <SelectItem value="Final">Final</SelectItem>
                        <SelectItem value="Offer">Offer</SelectItem>
                        <SelectItem value="Hired">Hired</SelectItem>
                        <SelectItem value="Rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </EnhancedVoiceTutorialListener>
                )}
              </div>
              <p className="text-sm text-gray-600">
                Applied on: {new Date(candidate.appliedDate).toLocaleDateString()}
              </p>
            </div>
          </EnhancedVoiceTutorialListener>
          
          {/* Resume Section */}
          <EnhancedVoiceTutorialListener
            selector="resume-section"
            description="Candidate resume section with download and view options."
            category="info"
          >
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Resume</h3>
              <div className="border rounded-lg p-4 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-8 w-8 text-blue-600" />
                    <div>
                      <p className="font-medium">{candidate.name}_Resume.pdf</p>
                      <p className="text-sm text-gray-500">PDF • 245 KB</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <EnhancedVoiceTutorialListener
                      selector="resume-view-button"
                      description="View resume in browser button."
                      actionStep="Click to open resume in a new tab."
                      category="action"
                    >
                      <Button variant="outline" size="sm">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View
                      </Button>
                    </EnhancedVoiceTutorialListener>
                    <EnhancedVoiceTutorialListener
                      selector="resume-download-button"
                      description="Download resume button."
                      actionStep="Click to download the candidate's resume."
                      category="action"
                    >
                      <Button variant="outline" size="sm" onClick={handleDownloadResume}>
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </EnhancedVoiceTutorialListener>
                  </div>
                </div>
              </div>
            </div>
          </EnhancedVoiceTutorialListener>
          
          {/* Cover Letter Section */}
          <EnhancedVoiceTutorialListener
            selector="cover-letter-section"
            description="Candidate cover letter section."
            category="info"
          >
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Cover Letter</h3>
              <div className="border rounded-lg p-4 bg-gray-50 min-h-[120px]">
                <p className="text-gray-700 leading-relaxed">
                  Dear Hiring Manager,
                  <br /><br />
                  I am excited to apply for the {candidate.role} position at your company. With {candidate.experience} years of experience in software development and expertise in {candidate.skills.slice(0, 3).join(", ")}, I believe I would be a valuable addition to your team.
                  <br /><br />
                  My background in {candidate.education} and hands-on experience with modern technologies align well with your requirements. I am particularly drawn to this opportunity because of your company's commitment to innovation and excellence.
                  <br /><br />
                  Thank you for considering my application. I look forward to discussing how my skills and passion can contribute to your team's success.
                  <br /><br />
                  Best regards,<br />
                  {candidate.name}
                </p>
              </div>
            </div>
          </EnhancedVoiceTutorialListener>
          
          {/* Links Section */}
          {(candidate.linkedinUrl || candidate.portfolioUrl) && (
            <EnhancedVoiceTutorialListener
              selector="candidate-links-section"
              description="Candidate external links including LinkedIn and portfolio."
              category="info"
            >
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">Links</h3>
                <div className="space-y-2">
                  {candidate.linkedinUrl && (
                    <EnhancedVoiceTutorialListener
                      selector="linkedin-link"
                      description="Candidate's LinkedIn profile link."
                      actionStep="Click to open LinkedIn profile in new tab."
                      category="navigation"
                    >
                      <a 
                        href={candidate.linkedinUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
                      >
                        <ExternalLink className="h-4 w-4" />
                        <span>LinkedIn Profile</span>
                      </a>
                    </EnhancedVoiceTutorialListener>
                  )}
                  {candidate.portfolioUrl && (
                    <EnhancedVoiceTutorialListener
                      selector="portfolio-link"
                      description="Candidate's portfolio website link."
                      actionStep="Click to open portfolio in new tab."
                      category="navigation"
                    >
                      <a 
                        href={candidate.portfolioUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
                      >
                        <ExternalLink className="h-4 w-4" />
                        <span>Portfolio</span>
                      </a>
                    </EnhancedVoiceTutorialListener>
                  )}
                </div>
              </div>
            </EnhancedVoiceTutorialListener>
          )}
          
          {/* Additional Information */}
          <EnhancedVoiceTutorialListener
            selector="additional-info-section"
            description="Additional candidate information including salary expectations and availability."
            category="info"
          >
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Additional Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                {candidate.expectedSalary && (
                  <div>
                    <span className="font-medium text-gray-700">Expected Salary:</span>
                    <p className="text-gray-600">{candidate.expectedSalary}</p>
                  </div>
                )}
                {candidate.availability && (
                  <div>
                    <span className="font-medium text-gray-700">Availability:</span>
                    <p className="text-gray-600">{candidate.availability}</p>
                  </div>
                )}
                {candidate.certifications && (
                  <div className="md:col-span-2">
                    <span className="font-medium text-gray-700">Certifications:</span>
                    <p className="text-gray-600">{candidate.certifications}</p>
                  </div>
                )}
              </div>
            </div>
          </EnhancedVoiceTutorialListener>
        </CardContent>
      </Card>
    </EnhancedVoiceTutorialListener>
  );
}