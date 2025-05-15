import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Candidate } from "@/types";
import { mockDataService } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";
import { useVoiceTrigger } from "@/hooks/useVoiceTrigger";

interface CandidateEditProps {
  candidate: Candidate;
  setCandidate: React.Dispatch<React.SetStateAction<Candidate | null>>;
  onClose?: () => void; // Added optional onClose for modals
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
  const [status, setStatus] = useState<Candidate['status']>(candidate.status); // Ensure correct type for status state
  const [appliedDate, setAppliedDate] = useState(candidate.appliedDate);

  const { toast } = useToast();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const updatedCandidate: Candidate = {
      ...candidate,
      name,
      role,
      email,
      phone,
      location,
      experience: parseInt(experience) || 0, // Ensure experience is a number, default to 0 if NaN
      skills: skills.split(",").map(s => s.trim()),
      education,
      linkedinUrl: linkedinUrl || undefined, // Handle empty string for optional field
      status,
      appliedDate,
      lastUpdated: new Date().toISOString()
    };

    mockDataService.updateCandidate(updatedCandidate);
    setCandidate(updatedCandidate);

    toast({
      title: "Candidate updated",
      description: "Candidate information has been updated."
    });
    if (onClose) {
      onClose(); // Call onClose if provided (for closing modals)
    }
  };

  const { voiceProps } = useVoiceTrigger({
    what: "Edit candidate details.",
    actionStep: "Update the information and click Update Candidate to save."
  });


  return (
    <form onSubmit={handleSubmit} className="space-y-4" {...voiceProps}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="role">Role</Label>
          <Input id="role" type="text" value={role} onChange={(e) => setRole(e.target.value)} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="location">Location</Label>
          <Input id="location" type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="experience">Experience (years)</Label>
          <Input id="experience" type="number" min="0" value={experience} onChange={(e) => setExperience(e.target.value)} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="skills">Skills (comma separated)</Label>
          <Input id="skills" type="text" value={skills} onChange={(e) => setSkills(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="education">Education</Label>
          <Input id="education" type="text" value={education} onChange={(e) => setEducation(e.target.value)} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
          <Input id="linkedinUrl" type="url" value={linkedinUrl} onChange={(e) => setLinkedinUrl(e.target.value)} placeholder="https://linkedin.com/in/candidate" />
        </div>
        <div>
          <Label htmlFor="status">Status</Label>
          {/* For status, ideally use a Select component to ensure valid values.
              For now, casting the value from the text input.
              Consider replacing with <Select> for better UX and type safety.
           */}
          <Input 
            id="status" 
            type="text" 
            value={status} 
            onChange={(e) => setStatus(e.target.value as Candidate['status'])} 
            placeholder="e.g., Applied, Screen, Interview"
          />
          {/* A better approach would be:
            <Select value={status} onValueChange={(value) => setStatus(value as Candidate['status'])}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Applied">Applied</SelectItem>
                <SelectItem value="Screen">Screen</SelectItem>
                <SelectItem value="Interview">Interview</SelectItem>
                <SelectItem value="Offer">Offer</SelectItem>
                <SelectItem value="Hired">Hired</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
           This would require importing Select components from shadcn/ui.
          */}
        </div>
      </div>
      <div>
        <Label htmlFor="appliedDate">Applied Date</Label>
        <Input id="appliedDate" type="date" value={appliedDate} onChange={(e) => setAppliedDate(e.target.value)} />
      </div>
      <div className="flex justify-end space-x-2">
        {onClose && <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>}
        <Button type="submit">Update Candidate</Button>
      </div>
    </form>
  );
}
