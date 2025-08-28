import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Edit, Eye, Trash2, Plus } from "lucide-react";
import { useVoiceTrigger } from "@/hooks/useVoiceTrigger";
import EnhancedVoiceTutorialListener from "@/components/voice/EnhancedVoiceTutorialListener";

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
  type: "interview" | "rejection" | "offer" | "onboarding" | "general";
  variables: string[];
}

const initialTemplates: EmailTemplate[] = [
  {
    id: "1",
    name: "Interview Invitation",
    subject: "Interview Invitation - {{POSITION_TITLE}} at {{COMPANY_NAME}}",
    content: `Dear {{CANDIDATE_NAME}},

We are pleased to invite you for an interview for the {{POSITION_TITLE}} position at {{COMPANY_NAME}}.

Interview Details:
- Date: {{INTERVIEW_DATE}}
- Time: {{INTERVIEW_TIME}}
- Location: {{INTERVIEW_LOCATION}}
- Interview Type: {{INTERVIEW_TYPE}}

Please confirm your attendance by replying to this email.

Best regards,
{{RECRUITER_NAME}}
{{COMPANY_NAME}} Recruiting Team`,
    type: "interview",
    variables: ["CANDIDATE_NAME", "POSITION_TITLE", "COMPANY_NAME", "INTERVIEW_DATE", "INTERVIEW_TIME", "INTERVIEW_LOCATION", "INTERVIEW_TYPE", "RECRUITER_NAME"]
  },
  {
    id: "2",
    name: "Application Acknowledgment",
    subject: "Thank you for your application - {{POSITION_TITLE}}",
    content: `Dear {{CANDIDATE_NAME}},

Thank you for your interest in the {{POSITION_TITLE}} position at {{COMPANY_NAME}}.

We have received your application and will review it carefully. Our team will contact you within {{REVIEW_TIMEFRAME}} if your qualifications match our requirements.

Best regards,
{{RECRUITER_NAME}}
{{COMPANY_NAME}} Recruiting Team`,
    type: "general",
    variables: ["CANDIDATE_NAME", "POSITION_TITLE", "COMPANY_NAME", "REVIEW_TIMEFRAME", "RECRUITER_NAME"]
  },
  {
    id: "3",
    name: "Job Offer",
    subject: "Job Offer - {{POSITION_TITLE}} at {{COMPANY_NAME}}",
    content: `Dear {{CANDIDATE_NAME}},

Congratulations! We are excited to offer you the position of {{POSITION_TITLE}} at {{COMPANY_NAME}}.

Offer Details:
- Position: {{POSITION_TITLE}}
- Department: {{DEPARTMENT}}
- Start Date: {{START_DATE}}
- Salary: {{SALARY}}
- Benefits: {{BENEFITS}}

Please review the attached offer letter and let us know your decision by {{RESPONSE_DEADLINE}}.

Congratulations again, and we look forward to welcoming you to our team!

Best regards,
{{RECRUITER_NAME}}
{{COMPANY_NAME}} HR Team`,
    type: "offer",
    variables: ["CANDIDATE_NAME", "POSITION_TITLE", "COMPANY_NAME", "DEPARTMENT", "START_DATE", "SALARY", "BENEFITS", "RESPONSE_DEADLINE", "RECRUITER_NAME"]
  }
];

export default function EmailTemplates() {
  const { toast } = useToast();
  const [templates, setTemplates] = useState<EmailTemplate[]>(initialTemplates);
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isCreateMode, setIsCreateMode] = useState(false);
  const [newTemplate, setNewTemplate] = useState<Omit<EmailTemplate, "id">>({
    name: "",
    subject: "",
    content: "",
    type: "general",
    variables: []
  });

  const handleEdit = (template: EmailTemplate) => {
    setSelectedTemplate(template);
    setIsEditMode(true);
  };

  const handleSave = () => {
    if (!selectedTemplate) return;
    
    setTemplates(prev => 
      prev.map(t => t.id === selectedTemplate.id ? selectedTemplate : t)
    );
    
    setIsEditMode(false);
    setSelectedTemplate(null);
    
    toast({
      title: "Template updated",
      description: "Email template has been saved successfully."
    });
  };

  const handleDelete = (templateId: string) => {
    setTemplates(prev => prev.filter(t => t.id !== templateId));
    
    toast({
      title: "Template deleted",
      description: "Email template has been removed."
    });
  };

  const handleCreate = () => {
    if (!newTemplate.name || !newTemplate.subject || !newTemplate.content) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const template: EmailTemplate = {
      ...newTemplate,
      id: Date.now().toString(),
      variables: extractVariables(newTemplate.content + " " + newTemplate.subject)
    };

    setTemplates(prev => [...prev, template]);
    setIsCreateMode(false);
    setNewTemplate({
      name: "",
      subject: "",
      content: "",
      type: "general",
      variables: []
    });
    
    toast({
      title: "Template created",
      description: "New email template has been added."
    });
  };

  const extractVariables = (text: string): string[] => {
    const matches = text.match(/\{\{([^}]+)\}\}/g);
    return matches ? [...new Set(matches.map(match => match.slice(2, -2)))] : [];
  };

  const { voiceProps: templatesProps } = useVoiceTrigger({
    what: "Email templates management for automated communications",
    actionStep: "Create, edit, or delete email templates for various recruitment scenarios"
  });

  return (
    <div {...templatesProps}>
      <EnhancedVoiceTutorialListener
        selector="email-templates-header"
        description="Email templates management section for automated recruitment communications"
        actionStep="Create new templates or manage existing ones"
        category="navigation"
        priority="high"
      >
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-lg font-medium">Email Templates</h3>
            <p className="text-sm text-gray-500">Manage templates for automated emails</p>
          </div>
          <Dialog open={isCreateMode} onOpenChange={setIsCreateMode}>
            <DialogTrigger asChild>
              <Button 
                {...useVoiceTrigger({
                  what: "Create a new email template",
                  actionStep: "Click to open the template creation form"
                }).voiceProps}
              >
                <Plus className="h-4 w-4 mr-2" />
                New Template
              </Button>
            </DialogTrigger>
            <DialogContent className="w-[95vw] max-w-[800px] max-h-[90vh] overflow-auto p-4 sm:p-6">
              <DialogHeader>
                <DialogTitle>Create Email Template</DialogTitle>
                <DialogDescription>
                  Create a new email template for automated communications
                </DialogDescription>
              </DialogHeader>
              <EnhancedVoiceTutorialListener
                selector="create-template-form"
                description="Form for creating new email templates with variables"
                actionStep="Fill out template details and save"
                category="form"
              >
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="new-name">Template Name</Label>
                      <Input
                        id="new-name"
                        value={newTemplate.name}
                        onChange={(e) => setNewTemplate(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="e.g., Interview Invitation"
                      />
                    </div>
                    <div>
                      <Label htmlFor="new-type">Template Type</Label>
                      <Select
                        value={newTemplate.type}
                        onValueChange={(value: any) => setNewTemplate(prev => ({ ...prev, type: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General</SelectItem>
                          <SelectItem value="interview">Interview</SelectItem>
                          <SelectItem value="rejection">Rejection</SelectItem>
                          <SelectItem value="offer">Offer</SelectItem>
                          <SelectItem value="onboarding">Onboarding</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="new-subject">Subject Line</Label>
                    <Input
                      id="new-subject"
                      value={newTemplate.subject}
                      onChange={(e) => setNewTemplate(prev => ({ ...prev, subject: e.target.value }))}
                      placeholder="Use {{VARIABLE_NAME}} for dynamic content"
                    />
                  </div>
                  <div>
                    <Label htmlFor="new-content">Email Content</Label>
                    <Textarea
                      id="new-content"
                      value={newTemplate.content}
                      onChange={(e) => setNewTemplate(prev => ({ ...prev, content: e.target.value }))}
                      rows={8}
                      placeholder="Write your email template using {{VARIABLE_NAME}} for dynamic content"
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsCreateMode(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleCreate}>Create Template</Button>
                  </div>
                </div>
              </EnhancedVoiceTutorialListener>
            </DialogContent>
          </Dialog>
        </div>
      </EnhancedVoiceTutorialListener>

      <div className="grid gap-4">
        {templates.map((template) => (
          <EnhancedVoiceTutorialListener
            key={template.id}
            selector={`template-${template.id}`}
            description={`${template.type} email template: ${template.name}`}
            actionStep="View, edit, or delete this template"
            category="info"
          >
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-base">{template.name}</CardTitle>
                    <CardDescription className="mt-1">
                      {template.subject}
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary">{template.type}</Badge>
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedTemplate(template);
                          setIsEditMode(false);
                        }}
                        {...useVoiceTrigger({
                          what: `Preview ${template.name} template`,
                          actionStep: "Click to view template content"
                        }).voiceProps}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(template)}
                        {...useVoiceTrigger({
                          what: `Edit ${template.name} template`,
                          actionStep: "Click to modify template content"
                        }).voiceProps}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(template.id)}
                        className="text-red-500 hover:text-red-700"
                        {...useVoiceTrigger({
                          what: `Delete ${template.name} template`,
                          actionStep: "This will permanently remove the template"
                        }).voiceProps}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                {template.variables.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    <span className="text-xs text-gray-500 mr-2">Variables:</span>
                    {template.variables.map((variable) => (
                      <Badge key={variable} variant="outline" className="text-xs">
                        {variable}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardHeader>
            </Card>
          </EnhancedVoiceTutorialListener>
        ))}
      </div>

      {/* Template Preview/Edit Dialog */}
      <Dialog open={!!selectedTemplate} onOpenChange={() => setSelectedTemplate(null)}>
        <DialogContent className="w-[95vw] max-w-[800px] max-h-[90vh] overflow-auto p-4 sm:p-6">
          <DialogHeader>
            <DialogTitle>
              {isEditMode ? "Edit Template" : "Template Preview"}: {selectedTemplate?.name}
            </DialogTitle>
          </DialogHeader>
          {selectedTemplate && (
            <EnhancedVoiceTutorialListener
              selector="template-preview-edit"
              description={isEditMode ? "Edit template form" : "Template preview"}
              actionStep={isEditMode ? "Make changes and save" : "Review template content"}
              category={isEditMode ? "form" : "info"}
            >
              <div className="space-y-4">
                <div>
                  <Label htmlFor="template-subject">Subject Line</Label>
                  {isEditMode ? (
                    <Input
                      id="template-subject"
                      value={selectedTemplate.subject}
                      onChange={(e) => setSelectedTemplate(prev => prev ? { ...prev, subject: e.target.value } : null)}
                    />
                  ) : (
                    <div className="p-2 bg-gray-50 rounded border">
                      {selectedTemplate.subject}
                    </div>
                  )}
                </div>
                <div>
                  <Label htmlFor="template-content">Content</Label>
                  {isEditMode ? (
                    <Textarea
                      id="template-content"
                      value={selectedTemplate.content}
                      onChange={(e) => setSelectedTemplate(prev => prev ? { ...prev, content: e.target.value } : null)}
                      rows={12}
                    />
                  ) : (
                    <ScrollArea className="h-60 p-3 bg-gray-50 rounded border">
                      <pre className="whitespace-pre-wrap text-sm">
                        {selectedTemplate.content}
                      </pre>
                    </ScrollArea>
                  )}
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setSelectedTemplate(null)}>
                    Close
                  </Button>
                  {isEditMode && (
                    <Button onClick={handleSave}>Save Changes</Button>
                  )}
                </div>
              </div>
            </EnhancedVoiceTutorialListener>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}