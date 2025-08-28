
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { useVoiceTrigger } from "@/hooks/useVoiceTrigger";
import { Plus, Edit, Trash2 } from "lucide-react";
import EnhancedVoiceTutorialListener from "@/components/voice/EnhancedVoiceTutorialListener";

interface JobTemplate {
  id: number;
  title: string;
  department: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  salaryRange: string;
  employmentType: string;
}

export default function JobTemplateSettings() {
  const { toast } = useToast();
  const [jobTemplates, setJobTemplates] = useState<JobTemplate[]>([
    {
      id: 1,
      title: "Software Engineer",
      department: "Engineering",
      description: "We are looking for a talented Software Engineer to join our growing development team.",
      requirements: ["Bachelor's degree in Computer Science", "3+ years of software development experience", "Proficiency in modern programming languages"],
      responsibilities: ["Design and develop software applications", "Collaborate with cross-functional teams", "Write clean, maintainable code"],
      salaryRange: "$80,000 - $120,000",
      employmentType: "Full-time"
    },
    {
      id: 2,
      title: "Product Manager",
      department: "Product",
      description: "Join our product team to drive innovation and deliver exceptional user experiences.",
      requirements: ["MBA or equivalent experience", "5+ years of product management experience", "Strong analytical skills"],
      responsibilities: ["Define product strategy and roadmap", "Work with engineering and design teams", "Analyze market trends and user feedback"],
      salaryRange: "$100,000 - $150,000",
      employmentType: "Full-time"
    },
    {
      id: 3,
      title: "UX Designer",
      department: "Design",
      description: "We're seeking a creative UX Designer to create intuitive and engaging user experiences.",
      requirements: ["Portfolio demonstrating UX design skills", "Proficiency in design tools like Figma", "Understanding of user-centered design principles"],
      responsibilities: ["Create wireframes and prototypes", "Conduct user research and testing", "Collaborate with product and engineering teams"],
      salaryRange: "$70,000 - $100,000",
      employmentType: "Full-time"
    },
    {
      id: 4,
      title: "Sales Representative",
      department: "Sales",
      description: "Looking for a dynamic Sales Representative to drive revenue growth and build client relationships.",
      requirements: ["Bachelor's degree preferred", "2+ years of sales experience", "Excellent communication skills"],
      responsibilities: ["Generate new business opportunities", "Manage client relationships", "Meet and exceed sales targets"],
      salaryRange: "$50,000 - $80,000 + commission",
      employmentType: "Full-time"
    },
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<JobTemplate | null>(null);
  const [newTemplate, setNewTemplate] = useState<Omit<JobTemplate, "id">>({
    title: "",
    department: "",
    description: "",
    requirements: [""],
    responsibilities: [""],
    salaryRange: "",
    employmentType: "Full-time"
  });

  const { voiceProps } = useVoiceTrigger({
    what: "Manage your reusable job posting templates to speed up the hiring process for frequently filled positions."
  });

  const handleCreateTemplate = () => {
    if (!newTemplate.title || !newTemplate.department) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const template: JobTemplate = {
      id: Date.now(),
      ...newTemplate,
      requirements: newTemplate.requirements.filter(req => req.trim() !== ""),
      responsibilities: newTemplate.responsibilities.filter(resp => resp.trim() !== "")
    };

    setJobTemplates([...jobTemplates, template]);
    setIsAddDialogOpen(false);
    setNewTemplate({
      title: "",
      department: "",
      description: "",
      requirements: [""],
      responsibilities: [""],
      salaryRange: "",
      employmentType: "Full-time"
    });

    toast({
      title: "Template created",
      description: "The job template has been created successfully."
    });
  };

  const handleEditTemplate = (template: JobTemplate) => {
    setEditingTemplate(template);
    setIsEditDialogOpen(true);
  };

  const handleUpdateTemplate = () => {
    if (!editingTemplate) return;

    setJobTemplates(jobTemplates.map(template => 
      template.id === editingTemplate.id ? editingTemplate : template
    ));
    setIsEditDialogOpen(false);
    setEditingTemplate(null);

    toast({
      title: "Template updated",
      description: "The job template has been updated successfully."
    });
  };

  const handleDeleteTemplate = (templateId: number) => {
    const template = jobTemplates.find(t => t.id === templateId);
    setJobTemplates(jobTemplates.filter(t => t.id !== templateId));
    toast({
      title: "Template deleted",
      description: `The "${template?.title}" template has been deleted.`
    });
  };

  const addRequirement = (isNew: boolean = true) => {
    if (isNew) {
      setNewTemplate({
        ...newTemplate,
        requirements: [...newTemplate.requirements, ""]
      });
    } else if (editingTemplate) {
      setEditingTemplate({
        ...editingTemplate,
        requirements: [...editingTemplate.requirements, ""]
      });
    }
  };

  const removeRequirement = (index: number, isNew: boolean = true) => {
    if (isNew) {
      setNewTemplate({
        ...newTemplate,
        requirements: newTemplate.requirements.filter((_, i) => i !== index)
      });
    } else if (editingTemplate) {
      setEditingTemplate({
        ...editingTemplate,
        requirements: editingTemplate.requirements.filter((_, i) => i !== index)
      });
    }
  };

  const addResponsibility = (isNew: boolean = true) => {
    if (isNew) {
      setNewTemplate({
        ...newTemplate,
        responsibilities: [...newTemplate.responsibilities, ""]
      });
    } else if (editingTemplate) {
      setEditingTemplate({
        ...editingTemplate,
        responsibilities: [...editingTemplate.responsibilities, ""]
      });
    }
  };

  const removeResponsibility = (index: number, isNew: boolean = true) => {
    if (isNew) {
      setNewTemplate({
        ...newTemplate,
        responsibilities: newTemplate.responsibilities.filter((_, i) => i !== index)
      });
    } else if (editingTemplate) {
      setEditingTemplate({
        ...editingTemplate,
        responsibilities: editingTemplate.responsibilities.filter((_, i) => i !== index)
      });
    }
  };

  return (
    <>
      <EnhancedVoiceTutorialListener
        selector="job-templates-settings"
        description="Manage reusable job posting templates to speed up the hiring process for frequently filled positions."
        actionStep="Create, edit, or delete job templates using the available actions."
        category="action"
        priority="high"
      >
        <Card {...voiceProps}>
          <CardHeader>
            <CardTitle>Job Templates</CardTitle>
            <CardDescription>Manage reusable job posting templates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 mb-6">
              <div className="border rounded-md">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-gray-50 text-left">
                      <th className="p-3 font-medium text-gray-500">Template Name</th>
                      <th className="p-3 font-medium text-gray-500">Department</th>
                      <th className="p-3 font-medium text-gray-500">Employment Type</th>
                      <th className="p-3 font-medium text-gray-500">Salary Range</th>
                      <th className="p-3 font-medium text-gray-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobTemplates.map((template) => (
                      <EnhancedVoiceTutorialListener
                        key={template.id}
                        selector={`template-${template.id}`}
                        description={`Job template for ${template.title} in ${template.department} department.`}
                        actionStep="Use the action buttons to edit or delete this template."
                        category="info"
                      >
                        <tr className="border-b last:border-0 hover:bg-gray-50">
                          <td className="p-3 font-medium">{template.title}</td>
                          <td className="p-3">{template.department}</td>
                          <td className="p-3">
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {template.employmentType}
                            </span>
                          </td>
                          <td className="p-3 text-sm text-gray-600">{template.salaryRange}</td>
                          <td className="p-3">
                            <div className="flex space-x-2">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleEditTemplate(template)}
                                className="flex items-center space-x-1"
                              >
                                <Edit className="h-4 w-4" />
                                <span>Edit</span>
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="text-red-500 hover:text-red-700 flex items-center space-x-1"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                    <span>Delete</span>
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      This will permanently delete the "{template.title}" template. This action cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleDeleteTemplate(template.id)}>
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </td>
                        </tr>
                      </EnhancedVoiceTutorialListener>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <Button onClick={() => setIsAddDialogOpen(true)} className="flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Add New Template</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </EnhancedVoiceTutorialListener>

      {/* Add Template Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="w-[95vw] max-w-[800px] max-h-[90vh] overflow-auto p-4 sm:p-6">
          <DialogHeader>
            <DialogTitle>Create Job Template</DialogTitle>
            <DialogDescription>
              Create a reusable template for job postings.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="new-title">Job Title*</Label>
                <Input
                  id="new-title"
                  value={newTemplate.title}
                  onChange={(e) => setNewTemplate({...newTemplate, title: e.target.value})}
                  placeholder="e.g., Senior Software Engineer"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-department">Department*</Label>
                <Input
                  id="new-department"
                  value={newTemplate.department}
                  onChange={(e) => setNewTemplate({...newTemplate, department: e.target.value})}
                  placeholder="e.g., Engineering"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="new-employment-type">Employment Type</Label>
                <Select
                  value={newTemplate.employmentType}
                  onValueChange={(value) => setNewTemplate({...newTemplate, employmentType: value})}
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
              <div className="space-y-2">
                <Label htmlFor="new-salary">Salary Range</Label>
                <Input
                  id="new-salary"
                  value={newTemplate.salaryRange}
                  onChange={(e) => setNewTemplate({...newTemplate, salaryRange: e.target.value})}
                  placeholder="e.g., $80,000 - $120,000"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-description">Job Description</Label>
              <Textarea
                id="new-description"
                value={newTemplate.description}
                onChange={(e) => setNewTemplate({...newTemplate, description: e.target.value})}
                placeholder="Describe the role and what the company is looking for..."
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label>Requirements</Label>
              {newTemplate.requirements.map((requirement, index) => (
                <div key={index} className="flex space-x-2">
                  <Input
                    value={requirement}
                    onChange={(e) => {
                      const newRequirements = [...newTemplate.requirements];
                      newRequirements[index] = e.target.value;
                      setNewTemplate({...newTemplate, requirements: newRequirements});
                    }}
                    placeholder="Enter a requirement..."
                  />
                  {newTemplate.requirements.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeRequirement(index)}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => addRequirement()}
              >
                Add Requirement
              </Button>
            </div>

            <div className="space-y-2">
              <Label>Responsibilities</Label>
              {newTemplate.responsibilities.map((responsibility, index) => (
                <div key={index} className="flex space-x-2">
                  <Input
                    value={responsibility}
                    onChange={(e) => {
                      const newResponsibilities = [...newTemplate.responsibilities];
                      newResponsibilities[index] = e.target.value;
                      setNewTemplate({...newTemplate, responsibilities: newResponsibilities});
                    }}
                    placeholder="Enter a responsibility..."
                  />
                  {newTemplate.responsibilities.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeResponsibility(index)}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => addResponsibility()}
              >
                Add Responsibility
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateTemplate}>
              Create Template
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Template Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="w-[95vw] max-w-[800px] max-h-[90vh] overflow-auto p-4 sm:p-6">
          <DialogHeader>
            <DialogTitle>Edit Job Template</DialogTitle>
            <DialogDescription>
              Update the job template details.
            </DialogDescription>
          </DialogHeader>
          {editingTemplate && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-title">Job Title*</Label>
                  <Input
                    id="edit-title"
                    value={editingTemplate.title}
                    onChange={(e) => setEditingTemplate({...editingTemplate, title: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-department">Department*</Label>
                  <Input
                    id="edit-department"
                    value={editingTemplate.department}
                    onChange={(e) => setEditingTemplate({...editingTemplate, department: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-employment-type">Employment Type</Label>
                  <Select
                    value={editingTemplate.employmentType}
                    onValueChange={(value) => setEditingTemplate({...editingTemplate, employmentType: value})}
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
                <div className="space-y-2">
                  <Label htmlFor="edit-salary">Salary Range</Label>
                  <Input
                    id="edit-salary"
                    value={editingTemplate.salaryRange}
                    onChange={(e) => setEditingTemplate({...editingTemplate, salaryRange: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-description">Job Description</Label>
                <Textarea
                  id="edit-description"
                  value={editingTemplate.description}
                  onChange={(e) => setEditingTemplate({...editingTemplate, description: e.target.value})}
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label>Requirements</Label>
                {editingTemplate.requirements.map((requirement, index) => (
                  <div key={index} className="flex space-x-2">
                    <Input
                      value={requirement}
                      onChange={(e) => {
                        const newRequirements = [...editingTemplate.requirements];
                        newRequirements[index] = e.target.value;
                        setEditingTemplate({...editingTemplate, requirements: newRequirements});
                      }}
                    />
                    {editingTemplate.requirements.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeRequirement(index, false)}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => addRequirement(false)}
                >
                  Add Requirement
                </Button>
              </div>

              <div className="space-y-2">
                <Label>Responsibilities</Label>
                {editingTemplate.responsibilities.map((responsibility, index) => (
                  <div key={index} className="flex space-x-2">
                    <Input
                      value={responsibility}
                      onChange={(e) => {
                        const newResponsibilities = [...editingTemplate.responsibilities];
                        newResponsibilities[index] = e.target.value;
                        setEditingTemplate({...editingTemplate, responsibilities: newResponsibilities});
                      }}
                    />
                    {editingTemplate.responsibilities.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeResponsibility(index, false)}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => addResponsibility(false)}
                >
                  Add Responsibility
                </Button>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateTemplate}>
              Update Template
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
