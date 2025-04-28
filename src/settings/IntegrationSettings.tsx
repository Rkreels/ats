
import { useVoiceTrigger } from "@/hooks/useVoiceTrigger";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useUser } from "@/contexts/UserContext";
import { Globe, Linkedin, FileStack, Mail, Check, FilePlus, ExternalLink } from "lucide-react";

export default function IntegrationSettings() {
  const { toast } = useToast();
  const { hasPermission } = useUser();
  const [linkedInApiKey, setLinkedInApiKey] = useState("");
  const [indeedWebhook, setIndeedWebhook] = useState("");
  const [resumeParserKey, setResumeParserKey] = useState("");
  const [emailServiceKey, setEmailServiceKey] = useState("");
  const [isLinkedInConnected, setIsLinkedInConnected] = useState(false);
  const [isIndeedConnected, setIsIndeedConnected] = useState(false);
  const [isResumeParserConnected, setIsResumeParserConnected] = useState(false);
  const [isEmailServiceConnected, setIsEmailServiceConnected] = useState(false);
  
  const { voiceProps } = useVoiceTrigger({
    what: "Here you can integrate external job boards, resume parsers, and other services with your ATS system to automate the recruitment process."
  });
  
  const { voiceProps: linkedInProps } = useVoiceTrigger({
    what: "Connect your LinkedIn Recruiter account to automatically import candidates from LinkedIn."
  });
  
  const { voiceProps: indeedProps } = useVoiceTrigger({
    what: "Set up an Indeed integration to post jobs and receive applications directly from Indeed."
  });
  
  const { voiceProps: resumeParserProps } = useVoiceTrigger({
    what: "Connect to a resume parsing service to automatically extract candidate information from resumes."
  });
  
  const { voiceProps: emailServiceProps } = useVoiceTrigger({
    what: "Integrate with an email service to send automated emails to candidates."
  });
  
  const handleLinkedInConnect = () => {
    if (!linkedInApiKey) {
      toast({
        title: "Error",
        description: "Please enter a valid API key",
        variant: "destructive"
      });
      return;
    }
    
    setIsLinkedInConnected(true);
    toast({
      title: "LinkedIn Connected",
      description: "Your LinkedIn Recruiter account has been connected successfully."
    });
  };
  
  const handleIndeedConnect = () => {
    if (!indeedWebhook) {
      toast({
        title: "Error",
        description: "Please enter a valid webhook URL",
        variant: "destructive"
      });
      return;
    }
    
    setIsIndeedConnected(true);
    toast({
      title: "Indeed Connected",
      description: "Your Indeed account has been connected successfully."
    });
  };
  
  const handleResumeParserConnect = () => {
    if (!resumeParserKey) {
      toast({
        title: "Error",
        description: "Please enter a valid API key",
        variant: "destructive"
      });
      return;
    }
    
    setIsResumeParserConnected(true);
    toast({
      title: "Resume Parser Connected",
      description: "The resume parsing service has been connected successfully."
    });
  };
  
  const handleEmailServiceConnect = () => {
    if (!emailServiceKey) {
      toast({
        title: "Error",
        description: "Please enter a valid API key",
        variant: "destructive"
      });
      return;
    }
    
    setIsEmailServiceConnected(true);
    toast({
      title: "Email Service Connected",
      description: "The email service has been connected successfully."
    });
  };
  
  if (!hasPermission("canIntegrateExternalServices")) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>External Integrations</CardTitle>
          <CardDescription>Connect to external services and job boards</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8">
            <p className="text-gray-500 mb-2">You don't have permission to manage integrations</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <div {...voiceProps}>
      <Tabs defaultValue="job-boards" className="space-y-6">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full md:w-auto">
          <TabsTrigger value="job-boards">Job Boards</TabsTrigger>
          <TabsTrigger value="resume-parsing">Resume Parsing</TabsTrigger>
          <TabsTrigger value="email">Email Services</TabsTrigger>
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
        </TabsList>
        
        <TabsContent value="job-boards" className="space-y-4">
          <Card {...linkedInProps}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle className="text-lg font-semibold">LinkedIn Integration</CardTitle>
                <CardDescription>Connect to LinkedIn Recruiter to import candidates</CardDescription>
              </div>
              <Linkedin className="h-10 w-10 text-blue-600" />
            </CardHeader>
            <CardContent>
              {isLinkedInConnected ? (
                <div className="flex items-center space-x-2 text-green-600">
                  <Check className="h-5 w-5" />
                  <span>Connected to LinkedIn Recruiter</span>
                </div>
              ) : (
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="linkedin-api-key">LinkedIn Recruiter API Key</Label>
                    <Input 
                      id="linkedin-api-key" 
                      type="password" 
                      placeholder="Enter your LinkedIn API key" 
                      value={linkedInApiKey} 
                      onChange={(e) => setLinkedInApiKey(e.target.value)} 
                    />
                  </div>
                  <Button onClick={handleLinkedInConnect}>Connect LinkedIn</Button>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card {...indeedProps}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle className="text-lg font-semibold">Indeed Integration</CardTitle>
                <CardDescription>Post jobs and receive applications from Indeed</CardDescription>
              </div>
              <Globe className="h-10 w-10 text-blue-600" />
            </CardHeader>
            <CardContent>
              {isIndeedConnected ? (
                <div className="flex items-center space-x-2 text-green-600">
                  <Check className="h-5 w-5" />
                  <span>Connected to Indeed</span>
                </div>
              ) : (
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="indeed-webhook">Indeed Webhook URL</Label>
                    <Input 
                      id="indeed-webhook" 
                      placeholder="Enter your Indeed webhook URL" 
                      value={indeedWebhook} 
                      onChange={(e) => setIndeedWebhook(e.target.value)} 
                    />
                  </div>
                  <Button onClick={handleIndeedConnect}>Connect Indeed</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="resume-parsing" className="space-y-4">
          <Card {...resumeParserProps}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle className="text-lg font-semibold">Resume Parser</CardTitle>
                <CardDescription>Automatically extract information from resumes</CardDescription>
              </div>
              <FileStack className="h-10 w-10 text-purple-600" />
            </CardHeader>
            <CardContent>
              {isResumeParserConnected ? (
                <div className="flex items-center space-x-2 text-green-600">
                  <Check className="h-5 w-5" />
                  <span>Connected to Resume Parser</span>
                </div>
              ) : (
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="resume-parser-key">Resume Parser API Key</Label>
                    <Input 
                      id="resume-parser-key" 
                      type="password" 
                      placeholder="Enter your resume parser API key" 
                      value={resumeParserKey} 
                      onChange={(e) => setResumeParserKey(e.target.value)} 
                    />
                  </div>
                  <Button onClick={handleResumeParserConnect}>Connect Resume Parser</Button>
                </div>
              )}
            </CardContent>
            <CardFooter className="bg-gray-50 px-6 py-3">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center space-x-2">
                  <Switch id="accept-resumes" defaultChecked />
                  <Label htmlFor="accept-resumes">Accept resumes via email</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="parse-pdfs" defaultChecked />
                  <Label htmlFor="parse-pdfs">Parse PDF resumes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="parse-docx" defaultChecked />
                  <Label htmlFor="parse-docx">Parse DOCX resumes</Label>
                </div>
              </div>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Resume Upload Demo</CardTitle>
              <CardDescription>Test the resume parsing functionality</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <FilePlus className="w-10 h-10 mb-3 text-gray-400" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">PDF, DOCX or TXT (MAX. 10MB)</p>
                  </div>
                  <input id="dropzone-file" type="file" className="hidden" />
                </label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="email" className="space-y-4">
          <Card {...emailServiceProps}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle className="text-lg font-semibold">Email Service</CardTitle>
                <CardDescription>Send automated emails to candidates</CardDescription>
              </div>
              <Mail className="h-10 w-10 text-green-600" />
            </CardHeader>
            <CardContent>
              {isEmailServiceConnected ? (
                <div className="flex items-center space-x-2 text-green-600">
                  <Check className="h-5 w-5" />
                  <span>Connected to Email Service</span>
                </div>
              ) : (
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="email-service-key">Email Service API Key</Label>
                    <Input 
                      id="email-service-key" 
                      type="password" 
                      placeholder="Enter your email service API key" 
                      value={emailServiceKey} 
                      onChange={(e) => setEmailServiceKey(e.target.value)} 
                    />
                  </div>
                  <Button onClick={handleEmailServiceConnect}>Connect Email Service</Button>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between bg-gray-50 px-6 py-3">
              <div className="flex items-center space-x-2">
                <Switch id="email-templates" defaultChecked />
                <Label htmlFor="email-templates">Use email templates</Label>
              </div>
              <Button variant="link" size="sm" className="flex items-center">
                Edit templates <ExternalLink className="ml-1 h-3 w-3" />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="webhooks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Webhooks</CardTitle>
              <CardDescription>Connect to your own systems via webhooks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-3">
                  <Label htmlFor="new-candidate-webhook">New Candidate Webhook</Label>
                  <Input 
                    id="new-candidate-webhook" 
                    placeholder="https://your-system.com/webhooks/candidates" 
                  />
                </div>
                
                <div className="grid gap-3">
                  <Label htmlFor="new-job-webhook">New Job Webhook</Label>
                  <Input 
                    id="new-job-webhook" 
                    placeholder="https://your-system.com/webhooks/jobs" 
                  />
                </div>
                
                <div className="grid gap-3">
                  <Label htmlFor="interview-scheduled-webhook">Interview Scheduled Webhook</Label>
                  <Input 
                    id="interview-scheduled-webhook" 
                    placeholder="https://your-system.com/webhooks/interviews" 
                  />
                </div>
                
                <div className="grid gap-3">
                  <Label htmlFor="offer-made-webhook">Offer Made Webhook</Label>
                  <Input 
                    id="offer-made-webhook" 
                    placeholder="https://your-system.com/webhooks/offers" 
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Webhook Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
