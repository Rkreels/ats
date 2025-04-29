
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { EmailTemplate } from "@/types";

const defaultTemplates: EmailTemplate[] = [
  {
    id: "e1",
    name: "Interview Invitation",
    subject: "Interview Invitation for {{position}} role at {{company}}",
    body: "Dear {{candidateName}},\n\nWe are pleased to invite you for an interview for the {{position}} role. The interview is scheduled for {{interviewDate}} at {{interviewTime}}.\n\nPlease confirm your availability.\n\nBest regards,\n{{recruiterName}}",
    category: "Interview",
    variables: ["candidateName", "position", "company", "interviewDate", "interviewTime", "recruiterName"],
  },
  {
    id: "e2",
    name: "Job Offer",
    subject: "Job Offer - {{position}} at {{company}}",
    body: "Dear {{candidateName}},\n\nWe are delighted to offer you the position of {{position}} at {{company}} with a starting salary of {{salary}}.\n\nPlease review the attached offer letter and let us know your decision by {{offerDeadline}}.\n\nBest regards,\n{{recruiterName}}",
    category: "Offer",
    variables: ["candidateName", "position", "company", "salary", "offerDeadline", "recruiterName"],
  },
  {
    id: "e3",
    name: "Rejection Email",
    subject: "Update regarding your application for {{position}}",
    body: "Dear {{candidateName}},\n\nThank you for your interest in the {{position}} role at {{company}}. We appreciate the time you've taken to apply and interview with us.\n\nAfter careful consideration, we have decided to move forward with another candidate whose qualifications more closely match our current needs.\n\nWe wish you the best in your job search and future endeavors.\n\nBest regards,\n{{recruiterName}}",
    category: "Rejection",
    variables: ["candidateName", "position", "company", "recruiterName"],
  }
];

export default function EmailTemplates() {
  const { toast } = useToast();
  const [templates, setTemplates] = useState<EmailTemplate[]>(defaultTemplates);
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  const [editMode, setEditMode] = useState(false);

  const handleSelectTemplate = (template: EmailTemplate) => {
    setSelectedTemplate(template);
    setEditMode(false);
  };

  const handleEditTemplate = () => {
    setEditMode(true);
  };

  const handleSaveTemplate = () => {
    if (!selectedTemplate) return;
    
    setTemplates(prev => prev.map(t => 
      t.id === selectedTemplate.id ? selectedTemplate : t
    ));
    
    setEditMode(false);
    
    toast({
      title: "Template Saved",
      description: `Email template "${selectedTemplate.name}" has been updated successfully.`,
    });
  };

  const handleCreateTemplate = () => {
    const newTemplate: EmailTemplate = {
      id: `e${templates.length + 1}`,
      name: "New Template",
      subject: "",
      body: "",
      category: "General",
      variables: [],
    };
    
    setTemplates(prev => [...prev, newTemplate]);
    setSelectedTemplate(newTemplate);
    setEditMode(true);
  };

  const handleFieldChange = (field: keyof EmailTemplate, value: string) => {
    if (!selectedTemplate) return;
    
    setSelectedTemplate({
      ...selectedTemplate,
      [field]: value,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Email Templates</h2>
          <p className="text-gray-500">Manage your email communication templates</p>
        </div>
        <Button onClick={handleCreateTemplate}>Create New Template</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Template Categories</CardTitle>
            <CardDescription>Select a category to view templates</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="all">All Templates</TabsTrigger>
                <TabsTrigger value="categories">By Category</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="space-y-2">
                {templates.map(template => (
                  <Button 
                    key={template.id}
                    variant={selectedTemplate?.id === template.id ? "default" : "outline"}
                    className="w-full justify-start text-left h-auto py-3"
                    onClick={() => handleSelectTemplate(template)}
                  >
                    <div>
                      <p className="font-medium">{template.name}</p>
                      <p className="text-xs text-gray-500">{template.category}</p>
                    </div>
                  </Button>
                ))}
              </TabsContent>
              
              <TabsContent value="categories">
                {["Interview", "Offer", "Rejection", "General", "Onboarding"].map(category => (
                  <div key={category} className="mb-4">
                    <h3 className="text-sm font-medium mb-2">{category}</h3>
                    <div className="space-y-2">
                      {templates
                        .filter(t => t.category === category)
                        .map(template => (
                          <Button 
                            key={template.id}
                            variant={selectedTemplate?.id === template.id ? "default" : "outline"}
                            className="w-full justify-start text-left h-auto py-3"
                            onClick={() => handleSelectTemplate(template)}
                          >
                            <div>
                              <p className="font-medium">{template.name}</p>
                            </div>
                          </Button>
                        ))}
                    </div>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          {selectedTemplate ? (
            <>
              <CardHeader>
                <CardTitle>
                  {editMode ? (
                    <Input 
                      value={selectedTemplate.name}
                      onChange={(e) => handleFieldChange('name', e.target.value)}
                    />
                  ) : (
                    selectedTemplate.name
                  )}
                </CardTitle>
                <CardDescription>
                  {editMode ? (
                    <Select 
                      value={selectedTemplate.category}
                      onValueChange={(value) => handleFieldChange('category', value as any)}
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
                  ) : (
                    `Category: ${selectedTemplate.category}`
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input 
                    id="subject"
                    value={selectedTemplate.subject}
                    onChange={(e) => handleFieldChange('subject', e.target.value)}
                    disabled={!editMode}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="body">Email Body</Label>
                  <Textarea 
                    id="body"
                    value={selectedTemplate.body}
                    onChange={(e) => handleFieldChange('body', e.target.value)}
                    disabled={!editMode}
                    rows={10}
                  />
                </div>
                
                {!editMode && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium mb-2">Available Variables</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedTemplate.variables.map(variable => (
                        <div key={variable} className="bg-gray-100 px-2 py-1 text-xs rounded">
                          {`{{${variable}}}`}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-end space-x-2">
                {editMode ? (
                  <>
                    <Button variant="outline" onClick={() => {
                      setEditMode(false);
                      // Reset to original if canceled
                      const original = templates.find(t => t.id === selectedTemplate.id);
                      if (original) setSelectedTemplate(original);
                    }}>
                      Cancel
                    </Button>
                    <Button onClick={handleSaveTemplate}>Save Template</Button>
                  </>
                ) : (
                  <Button onClick={handleEditTemplate}>Edit Template</Button>
                )}
              </CardFooter>
            </>
          ) : (
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-gray-500 mb-4">Select a template to view or edit</p>
              <Button variant="outline" onClick={handleCreateTemplate}>
                Create New Template
              </Button>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
}
