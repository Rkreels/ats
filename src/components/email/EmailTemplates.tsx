import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Mail, Plus, Edit, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  category: "Interview" | "Offer" | "Rejection" | "General" | "Onboarding";
  variables: string[];
}

export default function EmailTemplates() {
  const { toast } = useToast();
  const [templates, setTemplates] = useState<EmailTemplate[]>([
    {
      id: "1",
      name: "Interview Invitation",
      subject: "Interview Invitation - {{position}} at {{company}}",
      body: "Dear {{candidateName}},\n\nWe are pleased to invite you for an interview for the {{position}} position at {{company}}.\n\nInterview Details:\nDate: {{interviewDate}}\nTime: {{interviewTime}}\nLocation: {{interviewLocation}}\n\nPlease confirm your attendance by replying to this email.\n\nBest regards,\n{{recruiterName}}",
      category: "Interview",
      variables: ["candidateName", "position", "company", "interviewDate", "interviewTime", "interviewLocation", "recruiterName"]
    },
    {
      id: "2",
      name: "Job Offer",
      subject: "Job Offer - {{position}} at {{company}}",
      body: "Dear {{candidateName}},\n\nCongratulations! We are excited to offer you the position of {{position}} at {{company}}.\n\nOffer Details:\nPosition: {{position}}\nSalary: {{salary}}\nStart Date: {{startDate}}\n\nPlease review the attached offer letter and let us know your decision by {{responseDeadline}}.\n\nWe look forward to welcoming you to our team!\n\nBest regards,\n{{recruiterName}}",
      category: "Offer",
      variables: ["candidateName", "position", "company", "salary", "startDate", "responseDeadline", "recruiterName"]
    },
    {
      id: "3",
      name: "Application Rejection",
      subject: "Update on your application - {{position}} at {{company}}",
      body: "Dear {{candidateName}},\n\nThank you for your interest in the {{position}} position at {{company}} and for taking the time to apply.\n\nAfter careful consideration, we have decided to move forward with other candidates whose qualifications more closely match our current needs.\n\nWe appreciate your time and interest in {{company}}. We encourage you to apply for future opportunities that match your skills and experience.\n\nBest regards,\n{{recruiterName}}",
      category: "Rejection",
      variables: ["candidateName", "position", "company", "recruiterName"]
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<EmailTemplate | null>(null);
  const [newTemplate, setNewTemplate] = useState<Omit<EmailTemplate, "id">>({
    name: "",
    subject: "",
    body: "",
    category: "General",
    variables: []
  });

  const handleCreateTemplate = () => {
    if (!newTemplate.name || !newTemplate.subject || !newTemplate.body) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const template: EmailTemplate = {
      id: Date.now().toString(),
      ...newTemplate,
      variables: extractVariables(newTemplate.body + " " + newTemplate.subject)
    };

    setTemplates([...templates, template]);
    setIsDialogOpen(false);
    resetForm();

    toast({
      title: "Template Created",
      description: "Email template has been created successfully"
    });
  };

  const handleUpdateTemplate = () => {
    if (!editingTemplate) return;

    const updatedTemplate = {
      ...editingTemplate,
      variables: extractVariables(editingTemplate.body + " " + editingTemplate.subject)
    };

    setTemplates(templates.map(t => t.id === editingTemplate.id ? updatedTemplate : t));
    setEditingTemplate(null);
    setIsDialogOpen(false);

    toast({
      title: "Template Updated",
      description: "Email template has been updated successfully"
    });
  };

  const handleDeleteTemplate = (id: string) => {
    setTemplates(templates.filter(t => t.id !== id));
    toast({
      title: "Template Deleted",
      description: "Email template has been deleted successfully"
    });
  };

  const extractVariables = (text: string): string[] => {
    const matches = text.match(/\{\{([^}]+)\}\}/g);
    return matches ? matches.map(match => match.slice(2, -2)) : [];
  };

  const resetForm = () => {
    setNewTemplate({
      name: "",
      subject: "",
      body: "",
      category: "General",
      variables: []
    });
  };

  const openEditDialog = (template: EmailTemplate) => {
    setEditingTemplate(template);
    setIsDialogOpen(true);
  };

  const getCategoryColor = (category: EmailTemplate["category"]) => {
    switch (category) {
      case "Interview":
        return "bg-blue-100 text-blue-800";
      case "Offer":
        return "bg-green-100 text-green-800";
      case "Rejection":
        return "bg-red-100 text-red-800";
      case "Onboarding":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Email Templates</CardTitle>
          <CardDescription>Manage and customize email templates for different scenarios</CardDescription>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setEditingTemplate(null);
              resetForm();
            }}>
              <Plus className="h-4 w-4 mr-2" />
              New Template
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingTemplate ? "Edit Email Template" : "Create New Email Template"}
              </DialogTitle>
              <DialogDescription>
                {editingTemplate ? "Update the email template details" : "Create a new email template with variables"}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Template Name</Label>
                  <Input
                    id="name"
                    value={editingTemplate?.name || newTemplate.name}
                    onChange={(e) => editingTemplate 
                      ? setEditingTemplate({...editingTemplate, name: e.target.value})
                      : setNewTemplate({...newTemplate, name: e.target.value})
                    }
                    placeholder="e.g., Interview Invitation"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select 
                    value={editingTemplate?.category || newTemplate.category}
                    onValueChange={(value: EmailTemplate["category"]) => 
                      editingTemplate 
                        ? setEditingTemplate({...editingTemplate, category: value})
                        : setNewTemplate({...newTemplate, category: value})
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Interview">Interview</SelectItem>
                      <SelectItem value="Offer">Offer</SelectItem>
                      <SelectItem value="Rejection">Rejection</SelectItem>
                      <SelectItem value="General">General</SelectItem>
                      <SelectItem value="Onboarding">Onboarding</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subject">Email Subject</Label>
                <Input
                  id="subject"
                  value={editingTemplate?.subject || newTemplate.subject}
                  onChange={(e) => editingTemplate 
                    ? setEditingTemplate({...editingTemplate, subject: e.target.value})
                    : setNewTemplate({...newTemplate, subject: e.target.value})
                  }
                  placeholder="e.g., Interview Invitation - {{position}} at {{company}}"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="body">Email Body</Label>
                <Textarea
                  id="body"
                  className="min-h-[200px]"
                  value={editingTemplate?.body || newTemplate.body}
                  onChange={(e) => editingTemplate 
                    ? setEditingTemplate({...editingTemplate, body: e.target.value})
                    : setNewTemplate({...newTemplate, body: e.target.value})
                  }
                  placeholder="Dear {{candidateName}},\n\nYour email content here..."
                />
              </div>
              
              <div className="space-y-2">
                <Label>Available Variables</Label>
                <p className="text-sm text-gray-500">
                  Use variables like {"{{candidateName}}"}, {"{{position}}"}, {"{{company}}"}, {"{{interviewDate}}"}, etc.
                </p>
                <div className="flex flex-wrap gap-2">
                  {extractVariables((editingTemplate?.body || newTemplate.body) + " " + (editingTemplate?.subject || newTemplate.subject)).map((variable, index) => (
                    <Badge key={index} variant="secondary">
                      {variable}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={editingTemplate ? handleUpdateTemplate : handleCreateTemplate}>
                {editingTemplate ? "Update Template" : "Create Template"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {templates.map((template) => (
            <Card key={template.id} className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <h3 className="font-medium">{template.name}</h3>
                    <Badge className={getCategoryColor(template.category)}>
                      {template.category}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>Subject:</strong> {template.subject}
                  </p>
                  <p className="text-sm text-gray-500 line-clamp-2">
                    {template.body.substring(0, 150)}...
                  </p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {template.variables.slice(0, 5).map((variable, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {variable}
                      </Badge>
                    ))}
                    {template.variables.length > 5 && (
                      <Badge variant="outline" className="text-xs">
                        +{template.variables.length - 5} more
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openEditDialog(template)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteTemplate(template.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}