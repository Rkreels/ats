
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Candidate } from "@/types";
import { mockDataService } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";
import EnhancedVoiceTutorialListener from "@/components/voice/EnhancedVoiceTutorialListener";
import LoadingSpinner from "@/components/common/LoadingSpinner";

interface CandidateEditProps {
  candidate: Candidate;
  setCandidate: React.Dispatch<React.SetStateAction<Candidate | null>>;
  onClose?: () => void;
}

export function CandidateEdit({ candidate, setCandidate, onClose }: CandidateEditProps) {
  const [name, setName] = useState(candidate.name);
  const [role, setRole] = useState(candidate.role);
  const [email, setEmail] = useState(candidate.email);
  const [phone, setPhone] = useState(candidate.phone);
  const [location, setLocation] = useState(candidate.location);
  const [experience, setExperience] = useState(candidate.experience.toString());
  const [skills, setSkills] = useState(candidate.skills.join(", "));
  const [education, setEducation] = useState(candidate.education);
  const [linkedinUrl, setLinkedinUrl] = useState(candidate.linkedinUrl ?? "");
  const [status, setStatus] = useState<Candidate['status']>(candidate.status);
  const [appliedDate, setAppliedDate] = useState(candidate.appliedDate);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { toast } = useToast();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!name.trim()) newErrors.name = "Name is required";
    if (!role.trim()) newErrors.role = "Role is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Invalid email format";
    if (!phone.trim()) newErrors.phone = "Phone is required";
    if (!location.trim()) newErrors.location = "Location is required";
    if (!experience.trim()) newErrors.experience = "Experience is required";
    else if (isNaN(Number(experience)) || Number(experience) < 0) newErrors.experience = "Experience must be a valid number";
    if (!skills.trim()) newErrors.skills = "Skills are required";
    if (!education.trim()) newErrors.education = "Education is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors below.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const updatedCandidate: Candidate = {
        ...candidate,
        name: name.trim(),
        role: role.trim(),
        email: email.trim(),
        phone: phone.trim(),
        location: location.trim(),
        experience: parseInt(experience) || 0,
        skills: skills.split(",").map(s => s.trim()).filter(s => s.length > 0),
        education: education.trim(),
        linkedinUrl: linkedinUrl.trim() || undefined,
        status,
        appliedDate,
        lastUpdated: new Date().toISOString()
      };

      mockDataService.updateCandidate(updatedCandidate);
      setCandidate(updatedCandidate);

      toast({
        title: "Candidate updated",
        description: "Candidate information has been updated successfully."
      });
      
      if (onClose) {
        onClose();
      }
    } catch (error) {
      toast({
        title: "Update failed",
        description: "Failed to update candidate information. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitting) {
    return <LoadingSpinner text="Updating candidate..." />;
  }

  return (
    <EnhancedVoiceTutorialListener
      selector="candidate-edit-form"
      description="Edit candidate information form with all fields and validation."
      actionStep="Fill out the form fields and click Update Candidate to save changes."
      category="form"
      priority="high"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <EnhancedVoiceTutorialListener
            selector="candidate-name-field"
            description="Candidate name input field."
            category="form"
          >
            <div>
              <Label htmlFor="name">Name *</Label>
              <Input 
                id="name" 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
            </div>
          </EnhancedVoiceTutorialListener>
          
          <EnhancedVoiceTutorialListener
            selector="candidate-role-field"
            description="Candidate role/position input field."
            category="form"
          >
            <div>
              <Label htmlFor="role">Role *</Label>
              <Input 
                id="role" 
                type="text" 
                value={role} 
                onChange={(e) => setRole(e.target.value)}
                className={errors.role ? "border-red-500" : ""}
              />
              {errors.role && <p className="text-sm text-red-500 mt-1">{errors.role}</p>}
            </div>
          </EnhancedVoiceTutorialListener>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <EnhancedVoiceTutorialListener
            selector="candidate-email-field"
            description="Candidate email address input field."
            category="form"
          >
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input 
                id="email" 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
            </div>
          </EnhancedVoiceTutorialListener>
          
          <EnhancedVoiceTutorialListener
            selector="candidate-phone-field"
            description="Candidate phone number input field."
            category="form"
          >
            <div>
              <Label htmlFor="phone">Phone *</Label>
              <Input 
                id="phone" 
                type="text" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)}
                className={errors.phone ? "border-red-500" : ""}
              />
              {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone}</p>}
            </div>
          </EnhancedVoiceTutorialListener>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <EnhancedVoiceTutorialListener
            selector="candidate-location-field"
            description="Candidate location input field."
            category="form"
          >
            <div>
              <Label htmlFor="location">Location *</Label>
              <Input 
                id="location" 
                type="text" 
                value={location} 
                onChange={(e) => setLocation(e.target.value)}
                className={errors.location ? "border-red-500" : ""}
              />
              {errors.location && <p className="text-sm text-red-500 mt-1">{errors.location}</p>}
            </div>
          </EnhancedVoiceTutorialListener>
          
          <EnhancedVoiceTutorialListener
            selector="candidate-experience-field"
            description="Candidate years of experience input field."
            category="form"
          >
            <div>
              <Label htmlFor="experience">Experience (years) *</Label>
              <Input 
                id="experience" 
                type="number" 
                min="0" 
                value={experience} 
                onChange={(e) => setExperience(e.target.value)}
                className={errors.experience ? "border-red-500" : ""}
              />
              {errors.experience && <p className="text-sm text-red-500 mt-1">{errors.experience}</p>}
            </div>
          </EnhancedVoiceTutorialListener>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <EnhancedVoiceTutorialListener
            selector="candidate-skills-field"
            description="Candidate skills input field - enter skills separated by commas."
            category="form"
          >
            <div>
              <Label htmlFor="skills">Skills (comma separated) *</Label>
              <Input 
                id="skills" 
                type="text" 
                value={skills} 
                onChange={(e) => setSkills(e.target.value)}
                placeholder="React, JavaScript, Node.js"
                className={errors.skills ? "border-red-500" : ""}
              />
              {errors.skills && <p className="text-sm text-red-500 mt-1">{errors.skills}</p>}
            </div>
          </EnhancedVoiceTutorialListener>
          
          <EnhancedVoiceTutorialListener
            selector="candidate-education-field"
            description="Candidate education background input field."
            category="form"
          >
            <div>
              <Label htmlFor="education">Education *</Label>
              <Input 
                id="education" 
                type="text" 
                value={education} 
                onChange={(e) => setEducation(e.target.value)}
                className={errors.education ? "border-red-500" : ""}
              />
              {errors.education && <p className="text-sm text-red-500 mt-1">{errors.education}</p>}
            </div>
          </EnhancedVoiceTutorialListener>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <EnhancedVoiceTutorialListener
            selector="candidate-linkedin-field"
            description="Candidate LinkedIn profile URL input field."
            category="form"
          >
            <div>
              <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
              <Input 
                id="linkedinUrl" 
                type="url" 
                value={linkedinUrl} 
                onChange={(e) => setLinkedinUrl(e.target.value)} 
                placeholder="https://linkedin.com/in/candidate" 
              />
            </div>
          </EnhancedVoiceTutorialListener>
          
          <EnhancedVoiceTutorialListener
            selector="candidate-status-field"
            description="Candidate application status selection dropdown."
            category="form"
          >
            <div>
              <Label htmlFor="status">Status *</Label>
              <Select value={status} onValueChange={(value) => setStatus(value as Candidate['status'])}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
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
            </div>
          </EnhancedVoiceTutorialListener>
        </div>
        
        <EnhancedVoiceTutorialListener
          selector="candidate-applied-date-field"
          description="Date when candidate applied for the position."
          category="form"
        >
          <div>
            <Label htmlFor="appliedDate">Applied Date</Label>
            <Input 
              id="appliedDate" 
              type="date" 
              value={appliedDate} 
              onChange={(e) => setAppliedDate(e.target.value)} 
            />
          </div>
        </EnhancedVoiceTutorialListener>
        
        <div className="flex justify-end space-x-2 pt-4">
          {onClose && (
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          )}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Updating..." : "Update Candidate"}
          </Button>
        </div>
      </form>
    </EnhancedVoiceTutorialListener>
  );
}
