
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useVoiceTrigger } from "@/hooks/useVoiceTrigger";

export default function JobTemplateSettings() {
  const { toast } = useToast();
  const [jobTemplates, setJobTemplates] = useState([
    { id: 1, title: "Software Engineer", department: "Engineering" },
    { id: 2, title: "Product Manager", department: "Product" },
    { id: 3, title: "UX Designer", department: "Design" },
    { id: 4, title: "Sales Representative", department: "Sales" },
  ]);

  const { voiceProps } = useVoiceTrigger({
    what: "Manage your reusable job posting templates to speed up the hiring process for frequently filled positions."
  });

  return (
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
                  <th className="p-3 font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobTemplates.map((template) => (
                  <tr key={template.id} className="border-b last:border-0">
                    <td className="p-3">{template.title}</td>
                    <td className="p-3">{template.department}</td>
                    <td className="p-3">
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-red-500 hover:text-red-700"
                          onClick={() => {
                            setJobTemplates(jobTemplates.filter(t => t.id !== template.id));
                            toast({
                              title: "Template deleted",
                              description: `The "${template.title}" template has been deleted.`
                            });
                          }}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <Button>
            Add New Template
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
