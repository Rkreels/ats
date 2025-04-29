import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarIcon, Link, Mail, Phone, User } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Candidate } from "@/types";
import { mockDataService } from "@/data/mockData";
import { useUser } from "@/contexts/UserContext";
import { useToast } from "@/hooks/use-toast";

// Import at the top of the file

// Find and replace getCandidateById with getCandidate
const CandidateDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);
  const [showScheduleDialog, setShowScheduleDialog] = useState(false);
  const { hasPermission } = useUser();
  const { toast } = useToast();

  useEffect(() => {
    if (!id) {
      navigate("/candidates");
      return;
    }

    // In a real app, this would be an API call
    const fetchedCandidate = mockDataService.getCandidate(id);
    
    if (fetchedCandidate) {
      setCandidate(fetchedCandidate);
    } else {
      toast({
        title: "Candidate not found",
        description: "The candidate you're looking for doesn't exist.",
        variant: "destructive"
      });
      navigate("/candidates");
    }
    
    setIsLoading(false);
  }, [id, navigate, toast]);

  const handleUpdateStatus = (status: Candidate['status']) => {
    if (!candidate) return;
    
    // In a real app, this would be an API call
    const updatedCandidate = { 
      ...candidate, 
      status,
      lastUpdated: new Date().toISOString()
    };
    
    mockDataService.updateCandidate(updatedCandidate);
    setCandidate(updatedCandidate);
    
    toast({
      title: "Status updated",
      description: `Candidate status changed to ${status}`
    });
  };
  
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
    setShowAddNoteDialog(false);
    
    toast({
      title: "Note added",
      description: "Note has been added to the candidate's profile."
    });
  };
  
  const handleScheduleInterview = (date: Date) => {
    if (!candidate) return;
    
    // In a real app, this would be an API call
    const newInterview = {
      id: String(Math.random()),
      candidateId: candidate.id,
      interviewerId: "1", // Replace with actual interviewer ID
      interviewerName: "John Doe", // Replace with actual interviewer name
      date: date.toISOString(),
      time: "10:00 AM", // Replace with actual time
      duration: "1 hour", // Replace with actual duration
      type: "Video", // Replace with actual type
      status: "Scheduled",
      notes: ""
    };
    
    const updatedCandidate = {
      ...candidate,
      interviews: [...candidate.interviews, newInterview],
      lastUpdated: new Date().toISOString()
    };
    
    mockDataService.updateCandidate(updatedCandidate);
    setCandidate(updatedCandidate);
    setShowScheduleDialog(false);
    
    toast({
      title: "Interview scheduled",
      description: `Interview scheduled for ${format(date, "MMMM dd, yyyy")}`
    });
  };

  if (isLoading) {
    return <div>Loading candidate details...</div>;
  }

  if (!candidate) {
    return <div>Candidate not found.</div>;
  }

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{candidate.name}</h1>
          <p className="text-gray-600">{candidate.role}</p>
        </div>
        
        <div className="flex items-center space-x-2">
          {hasPermission('canEditCandidates') ? (
            <Select onValueChange={handleUpdateStatus} defaultValue={candidate.status}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Update Status" />
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
          ) : (
            <Badge>{candidate.status}</Badge>
          )}
          
          <Button variant="outline" onClick={() => navigate("/candidates")}>Back to Candidates</Button>
        </div>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Candidate Information</CardTitle>
            <CardDescription>Details about the candidate</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-start space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={candidate.avatar} alt={candidate.name} />
                <AvatarFallback>{candidate.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-semibold">{candidate.name}</h2>
                <p className="text-gray-500">{candidate.role}</p>
                <div className="mt-2 space-y-1">
                  <p className="flex items-center text-gray-600">
                    <Mail className="h-4 w-4 mr-2" />
                    <a href={`mailto:${candidate.email}`}>{candidate.email}</a>
                  </p>
                  <p className="flex items-center text-gray-600">
                    <Phone className="h-4 w-4 mr-2" />
                    {candidate.phone}
                  </p>
                  <p className="flex items-center text-gray-600">
                    <User className="h-4 w-4 mr-2" />
                    {candidate.experience} years experience
                  </p>
                  <p className="flex items-center text-gray-600">
                    <Link className="h-4 w-4 mr-2" />
                    {candidate.location}
                  </p>
                </div>
              </div>
            </div>
            
            <Separator className="my-4" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Skills</h3>
                <ul className="list-disc list-inside text-gray-600">
                  {candidate.skills.map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Education</h3>
                <p className="text-gray-600">{candidate.education}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="interviews">Interviews</TabsTrigger>
            <TabsTrigger value="application">Application</TabsTrigger>
            {hasPermission('canEditCandidates') && <TabsTrigger value="edit">Edit</TabsTrigger>}
          </TabsList>
          
          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <CardTitle>Overview</CardTitle>
                <CardDescription>Candidate notes and details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Notes</h3>
                  <p className="text-gray-600">{candidate.notes || "No notes available."}</p>
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
          </TabsContent>
          
          <TabsContent value="interviews">
            <Card>
              <CardHeader>
                <CardTitle>Interviews</CardTitle>
                <CardDescription>Scheduled and past interviews</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {candidate.interviews.length > 0 ? (
                  <ul className="space-y-2">
                    {candidate.interviews.map((interview) => (
                      <li key={interview.id} className="border rounded-md p-4">
                        <div className="flex justify-between items-center">
                          <h4 className="text-lg font-semibold">{interview.type}</h4>
                          <Badge>{interview.status}</Badge>
                        </div>
                        <p className="text-gray-600">Date: {new Date(interview.date).toLocaleDateString()}</p>
                        <p className="text-gray-600">Notes: {interview.notes || "No notes available."}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No interviews scheduled.</p>
                )}
                
                {hasPermission('canEditCandidates') && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>Schedule Interview</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Schedule Interview</DialogTitle>
                        <DialogDescription>
                          Schedule a new interview for the candidate.
                        </DialogDescription>
                      </DialogHeader>
                      <ScheduleInterviewForm onSubmit={handleScheduleInterview} />
                    </DialogContent>
                  </Dialog>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="application">
            <Card>
              <CardHeader>
                <CardTitle>Application Details</CardTitle>
                <CardDescription>Resume, cover letter, and application info</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Resume</h3>
                  <a href={candidate.resumeUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    View Resume
                  </a>
                </div>
                
                {candidate.coverLetterUrl && (
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">Cover Letter</h3>
                    <a href={candidate.coverLetterUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                      View Cover Letter
                    </a>
                  </div>
                )}
                
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Applied Date</h3>
                  <p className="text-gray-600">{new Date(candidate.appliedDate).toLocaleDateString()}</p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Source</h3>
                  <p className="text-gray-600">{candidate.source}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {hasPermission('canEditCandidates') && (
            <TabsContent value="edit">
              <Card>
                <CardHeader>
                  <CardTitle>Edit Candidate</CardTitle>
                  <CardDescription>Edit candidate information</CardDescription>
                </CardHeader>
                <CardContent>
                  <EditCandidateForm candidate={candidate} setCandidate={setCandidate} />
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </>
  );
};

interface AddNoteFormProps {
  onSubmit: (note: string) => void;
}

const AddNoteForm: React.FC<AddNoteFormProps> = ({ onSubmit }) => {
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
};

interface ScheduleInterviewFormProps {
  onSubmit: (date: Date) => void;
}

const ScheduleInterviewForm: React.FC<ScheduleInterviewFormProps> = ({ onSubmit }) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (date) {
      onSubmit(date);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label>Schedule Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[240px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              disabled={(date) =>
                date < new Date()
              }
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex justify-end">
        <Button type="submit" disabled={!date}>Schedule</Button>
      </div>
    </form>
  );
};

interface EditCandidateFormProps {
  candidate: Candidate;
  setCandidate: (candidate: Candidate) => void;
}

const EditCandidateForm: React.FC<EditCandidateFormProps> = ({ candidate, setCandidate }) => {
  const [name, setName] = useState(candidate.name);
  const [role, setRole] = useState(candidate.role);
  const [email, setEmail] = useState(candidate.email);
  const [phone, setPhone] = useState(candidate.phone);
  const [location, setLocation] = useState(candidate.location);
  const [experience, setExperience] = useState(candidate.experience.toString());
  const [skills, setSkills] = useState(candidate.skills.join(", "));
  const [education, setEducation] = useState(candidate.education);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    // In a real app, this would be an API call
    const updatedCandidate = {
      ...candidate,
      name,
      role,
      email,
      phone,
      location,
      experience: parseInt(experience),
      skills: skills.split(",").map(s => s.trim()),
      education,
      lastUpdated: new Date().toISOString()
    };
    
    mockDataService.updateCandidate(updatedCandidate);
    setCandidate(updatedCandidate);
    
    toast({
      title: "Candidate updated",
      description: "Candidate information has been updated."
    });
    
    navigate(`/candidates/${candidate.id}`);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <Label htmlFor="role">Role</Label>
        <Input id="role" type="text" value={role} onChange={(e) => setRole(e.target.value)} />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <Label htmlFor="phone">Phone</Label>
        <Input id="phone" type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
      </div>
      <div>
        <Label htmlFor="location">Location</Label>
        <Input id="location" type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
      </div>
      <div>
        <Label htmlFor="experience">Experience</Label>
        <Input id="experience" type="number" value={experience} onChange={(e) => setExperience(e.target.value)} />
      </div>
      <div>
        <Label htmlFor="skills">Skills (comma separated)</Label>
        <Input id="skills" type="text" value={skills} onChange={(e) => setSkills(e.target.value)} />
      </div>
      <div>
        <Label htmlFor="education">Education</Label>
        <Input id="education" type="text" value={education} onChange={(e) => setEducation(e.target.value)} />
      </div>
      <div className="flex justify-end">
        <Button type="submit">Update Candidate</Button>
      </div>
    </form>
  );
};

export default CandidateDetail;
