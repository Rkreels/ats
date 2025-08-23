import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Download, MapPin, Calendar, Briefcase, GraduationCap } from "lucide-react";
import { Candidate } from "@/types";
import { useVoiceTrigger } from "@/hooks/useVoiceTrigger";
import EnhancedVoiceTutorialListener from "@/components/voice/EnhancedVoiceTutorialListener";

interface CandidateInfoProps {
  candidate: Candidate;
}

export function CandidateInfo({ candidate }: CandidateInfoProps) {
  const { voiceProps: resumeProps } = useVoiceTrigger({
    what: `View ${candidate.name}'s resume`,
    actionStep: "Click to open resume in new tab"
  });

  const { voiceProps: linkedinProps } = useVoiceTrigger({
    what: `Visit ${candidate.name}'s LinkedIn profile`,
    actionStep: "Click to open LinkedIn profile"
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <EnhancedVoiceTutorialListener
        selector="candidate-contact-info"
        description="Candidate contact information and location details"
        actionStep="Review personal and contact information"
        category="info"
        priority="medium"
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="h-5 w-5 mr-2" />
              Contact Information
            </CardTitle>
            <CardDescription>Personal and contact details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Location</label>
              <p className="text-sm">{candidate.location || "Not specified"}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Email</label>
              <p className="text-sm">{candidate.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Phone</label>
              <p className="text-sm">{candidate.phone}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Applied Date</label>
              <p className="text-sm">{candidate.appliedDate}</p>
            </div>
          </CardContent>
        </Card>
      </EnhancedVoiceTutorialListener>

      <EnhancedVoiceTutorialListener
        selector="candidate-professional-info"
        description="Professional background and experience information"
        actionStep="Review experience and qualifications"
        category="info"
        priority="medium"
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Briefcase className="h-5 w-5 mr-2" />
              Professional Information
            </CardTitle>
            <CardDescription>Experience and background</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Position Applied For</label>
              <p className="text-sm">{candidate.role}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Experience Level</label>
              <p className="text-sm">{candidate.experience || "Not specified"}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Expected Salary</label>
              <p className="text-sm">{candidate.expectedSalary || "Not specified"}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Availability</label>
              <p className="text-sm">{candidate.availability || "Immediate"}</p>
            </div>
          </CardContent>
        </Card>
      </EnhancedVoiceTutorialListener>

      <EnhancedVoiceTutorialListener
        selector="candidate-skills-info"
        description="Candidate skills and technical expertise"
        actionStep="Review technical and soft skills"
        category="info"
        priority="medium"
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <GraduationCap className="h-5 w-5 mr-2" />
              Skills & Expertise
            </CardTitle>
            <CardDescription>Technical and professional skills</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-500">Skills</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {candidate.skills && candidate.skills.length > 0 ? (
                    candidate.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary">{skill}</Badge>
                    ))
                  ) : (
                    <p className="text-sm text-gray-400">No skills listed</p>
                  )}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Education</label>
                <p className="text-sm mt-1">{candidate.education || "Not specified"}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Certifications</label>
                <p className="text-sm mt-1">{candidate.certifications || "None listed"}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </EnhancedVoiceTutorialListener>

      <EnhancedVoiceTutorialListener
        selector="candidate-documents-info"
        description="Candidate documents and external profiles"
        actionStep="Access resume, portfolio, or LinkedIn profile"
        category="action"
        priority="high"
      >
        <Card>
          <CardHeader>
            <CardTitle>Documents & Links</CardTitle>
            <CardDescription>Resume, portfolio, and professional profiles</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => window.open(candidate.resumeUrl, '_blank')}
                {...resumeProps}
              >
                <Download className="h-4 w-4 mr-2" />
                View Resume
              </Button>
              
              {candidate.linkedinUrl && (
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => window.open(candidate.linkedinUrl, '_blank')}
                  {...linkedinProps}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  LinkedIn Profile
                </Button>
              )}
              
              {candidate.portfolioUrl && (
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => window.open(candidate.portfolioUrl, '_blank')}
                  {...useVoiceTrigger({
                    what: `View ${candidate.name}'s portfolio`,
                    actionStep: "Click to open portfolio in new tab"
                  }).voiceProps}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Portfolio
                </Button>
              )}
            </div>
            
            <div className="pt-4">
              <label className="text-sm font-medium text-gray-500">Notes</label>
              <p className="text-sm mt-1 p-3 bg-gray-50 rounded-md">
                {candidate.notes || "No additional notes available"}
              </p>
            </div>
          </CardContent>
        </Card>
      </EnhancedVoiceTutorialListener>
    </div>
  );
}