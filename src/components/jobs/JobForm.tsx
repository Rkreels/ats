import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface JobFormData {
  title: string;
  department: string;
  location: string;
  employmentType: "Full-time" | "Part-time" | "Contract" | "Temporary" | "Internship";
  status: "Draft" | "Pending Approval" | "Published" | "Closed" | "On Hold";
  description: string;
  requirements: string;
  postedDate: string;
  closingDate: string;
  salaryRange: string;
}

interface JobFormProps {
  initialData?: Partial<JobFormData>;
  onSubmit: (data: JobFormData) => void;
  onCancel: () => void;
  submitLabel?: string;
}

export default function JobForm({ 
  initialData, 
  onSubmit, 
  onCancel, 
  submitLabel = "Create Job" 
}: JobFormProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState<JobFormData>({
    title: "",
    department: "",
    location: "",
    employmentType: "Full-time",
    status: "Draft",
    description: "",
    requirements: "",
    postedDate: new Date().toISOString().split('T')[0],
    closingDate: "",
    salaryRange: "",
    ...initialData
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.department || !formData.location) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    onSubmit(formData);
  };

  const handleInputChange = (field: keyof JobFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Job Title*</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            placeholder="e.g. Senior Frontend Developer"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="department">Department*</Label>
          <Input
            id="department"
            value={formData.department}
            onChange={(e) => handleInputChange("department", e.target.value)}
            placeholder="e.g. Engineering"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="location">Location*</Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => handleInputChange("location", e.target.value)}
            placeholder="e.g. Remote, New York, NY"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="employmentType">Employment Type</Label>
          <Select
            value={formData.employmentType}
            onValueChange={(value) => handleInputChange("employmentType", value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Full-time">Full-time</SelectItem>
              <SelectItem value="Part-time">Part-time</SelectItem>
              <SelectItem value="Contract">Contract</SelectItem>
              <SelectItem value="Temporary">Temporary</SelectItem>
              <SelectItem value="Internship">Internship</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select
            value={formData.status}
            onValueChange={(value) => handleInputChange("status", value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Draft">Draft</SelectItem>
              <SelectItem value="Pending Approval">Pending Approval</SelectItem>
              <SelectItem value="Published">Published</SelectItem>
              <SelectItem value="Closed">Closed</SelectItem>
              <SelectItem value="On Hold">On Hold</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="salaryRange">Salary Range</Label>
          <Input
            id="salaryRange"
            value={formData.salaryRange}
            onChange={(e) => handleInputChange("salaryRange", e.target.value)}
            placeholder="e.g. $120,000 - $150,000"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="postedDate">Posted Date</Label>
          <Input
            id="postedDate"
            type="date"
            value={formData.postedDate}
            onChange={(e) => handleInputChange("postedDate", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="closingDate">Closing Date</Label>
          <Input
            id="closingDate"
            type="date"
            value={formData.closingDate}
            onChange={(e) => handleInputChange("closingDate", e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Job Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
          placeholder="Describe the role, responsibilities, and what you're looking for..."
          rows={4}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="requirements">Requirements</Label>
        <Textarea
          id="requirements"
          value={formData.requirements}
          onChange={(e) => handleInputChange("requirements", e.target.value)}
          placeholder="List the required skills, experience, and qualifications..."
          rows={4}
        />
      </div>

      <div className="flex space-x-2 pt-4">
        <Button type="submit" className="flex-1">
          {submitLabel}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
          Cancel
        </Button>
      </div>
    </form>
  );
}