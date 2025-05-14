
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
}

export function CandidateEdit({ candidate, setCandidate }: CandidateEditProps) {
  const [name, setName] = useState(candidate.name);
  const [role, setRole] = useState(candidate.role);
  const [email, setEmail] = useState(candidate.email);
  const [phone, setPhone] = useState(candidate.phone);
  const [location, setLocation] = useState(candidate.location);
  const [experience, setExperience] = useState(candidate.experience.toString());
  const [skills, setSkills] = useState(candidate.skills.join(", "));
  const [education, setEducation] = useState(candidate.education);
  const [linkedinUrl, setLinkedinUrl] = useState(candidate.linkedinUrl ?? "");
  const [status, setStatus] = useState(candidate.status);
  const [appliedDate, setAppliedDate] = useState(candidate.appliedDate);

  const { toast } = useToast();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // In a real app, this would be an API call
    const updatedCandidate: Candidate = {
      ...candidate,
      name,
      role,
      email,
      phone,
      location,
      experience: parseInt(experience),
      skills: skills.split(",").map(s => s.trim()),
      education,
      linkedinUrl,
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
  };

  const { voiceProps } = useVoiceTrigger({
    what: "Edit candidate details.",
    actionStep: "Update the information and click Update Candidate to save."
  });

  // Expanded: added fields for LinkedIn, Status, Applied Date
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
          <Input id="status" type="text" value={status} onChange={(e) => setStatus(e.target.value)} />
        </div>
      </div>
      <div>
        <Label htmlFor="appliedDate">Applied Date</Label>
        <Input id="appliedDate" type="date" value={appliedDate} onChange={(e) => setAppliedDate(e.target.value)} />
      </div>
      <div className="flex justify-end">
        <Button type="submit">Update Candidate</Button>
      </div>
    </form>
  );
}
