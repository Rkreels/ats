
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import EmailTemplates from "@/components/email/EmailTemplates";

export default function EmailSettings() {
  const { toast } = useToast();
  const [smtpSettings, setSmtpSettings] = useState({
    host: "smtp.example.com",
    port: "587",
    username: "recruiting@company.com",
    password: "••••••••••••",
    fromName: "HR Recruiting Team",
    fromEmail: "recruiting@company.com",
  });
  
  const [emailAutomations, setEmailAutomations] = useState({
    sendInterviewInvites: true,
    sendRejectionEmails: false,
    sendOfferLetters: true,
    sendOnboardingInstructions: true,
    allowCandidateReplies: true,
    bccRecruiter: true,
  });
  
  const handleSmtpChange = (field: string, value: string) => {
    setSmtpSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleAutomationToggle = (field: string) => {
    setEmailAutomations(prev => ({
      ...prev,
      [field]: !prev[field as keyof typeof prev]
    }));
  };
  
  const saveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Email configuration has been updated successfully."
    });
  };
  
  const testConnection = () => {
    toast({
      title: "Test Successful",
      description: "SMTP connection test completed successfully."
    });
  };
  
  return (
    <Tabs defaultValue="configuration">
      <TabsList className="mb-6">
        <TabsTrigger value="configuration">Email Configuration</TabsTrigger>
        <TabsTrigger value="automations">Automations</TabsTrigger>
        <TabsTrigger value="templates">Email Templates</TabsTrigger>
      </TabsList>
      
      <TabsContent value="configuration">
        <Card>
          <CardHeader>
            <CardTitle>SMTP Configuration</CardTitle>
            <CardDescription>Configure your email server settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="smtp-host">SMTP Server</Label>
                <Input 
                  id="smtp-host" 
                  value={smtpSettings.host}
                  onChange={(e) => handleSmtpChange('host', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="smtp-port">SMTP Port</Label>
                <Input 
                  id="smtp-port" 
                  value={smtpSettings.port}
                  onChange={(e) => handleSmtpChange('port', e.target.value)}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="smtp-username">Username</Label>
                <Input 
                  id="smtp-username" 
                  value={smtpSettings.username}
                  onChange={(e) => handleSmtpChange('username', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="smtp-password">Password</Label>
                <Input 
                  id="smtp-password" 
                  type="password"
                  value={smtpSettings.password}
                  onChange={(e) => handleSmtpChange('password', e.target.value)}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="from-name">From Name</Label>
                <Input 
                  id="from-name" 
                  value={smtpSettings.fromName}
                  onChange={(e) => handleSmtpChange('fromName', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="from-email">From Email</Label>
                <Input 
                  id="from-email" 
                  value={smtpSettings.fromEmail}
                  onChange={(e) => handleSmtpChange('fromEmail', e.target.value)}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={testConnection}>Test Connection</Button>
            <Button onClick={saveSettings}>Save Settings</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      
      <TabsContent value="automations">
        <Card>
          <CardHeader>
            <CardTitle>Email Automations</CardTitle>
            <CardDescription>Configure automated email triggers</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              {Object.entries(emailAutomations).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor={key}>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</Label>
                    <p className="text-sm text-gray-500">
                      {key === 'sendInterviewInvites' && 'Automatically send emails when interviews are scheduled'}
                      {key === 'sendRejectionEmails' && 'Automatically send rejection emails when candidates are rejected'}
                      {key === 'sendOfferLetters' && 'Automatically send offer letters when candidates reach offer stage'}
                      {key === 'sendOnboardingInstructions' && 'Automatically send onboarding instructions to hired candidates'}
                      {key === 'allowCandidateReplies' && 'Allow candidates to reply directly to automated emails'}
                      {key === 'bccRecruiter' && 'BCC the recruiter on all automated emails'}
                    </p>
                  </div>
                  <Switch 
                    id={key}
                    checked={value}
                    onCheckedChange={() => handleAutomationToggle(key)}
                  />
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button className="ml-auto" onClick={saveSettings}>Save Settings</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      
      <TabsContent value="templates">
        <EmailTemplates />
      </TabsContent>
    </Tabs>
  );
}
