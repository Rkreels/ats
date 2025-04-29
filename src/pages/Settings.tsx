
import { useState } from "react";
import { useVoiceTrigger } from "@/hooks/useVoiceTrigger";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import VoiceSettings from "@/settings/VoiceSettings";
import GeneralSettings from "@/settings/GeneralSettings";
import JobTemplateSettings from "@/settings/JobTemplateSettings";
import UserSettings from "@/settings/UserSettings";
import IntegrationSettings from "@/settings/IntegrationSettings";
import EmailSettings from "@/settings/EmailSettings";
import VoiceTutorialListener from "@/components/voice/VoiceTutorialListener";

export default function Settings() {
  // Voice tutorials with improved descriptions
  const { voiceProps: settingsVoiceProps } = useVoiceTrigger({
    what: "This is the settings page where you can configure your ATS preferences.",
    actionStep: "Click on different tabs to configure various aspects of the system."
  });
  
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
          <p className="text-gray-600">Configure your ATS preferences</p>
        </div>
      </div>
      
      <Tabs defaultValue="general" className="space-y-8" {...settingsVoiceProps}>
        <TabsList className="grid grid-cols-2 md:grid-cols-6 w-full md:w-auto">
          <VoiceTutorialListener
            selector="general-settings-tab"
            description="General settings for your ATS system."
            actionStep="Click to configure system-wide settings like company information and ATS preferences."
          >
            <TabsTrigger value="general">General</TabsTrigger>
          </VoiceTutorialListener>
          
          <VoiceTutorialListener
            selector="voice-settings-tab"
            description="Voice Assistant settings."
            actionStep="Click to customize how the voice tutorial system works throughout the application."
          >
            <TabsTrigger value="voice">Voice Assistant</TabsTrigger>
          </VoiceTutorialListener>
          
          <VoiceTutorialListener
            selector="templates-settings-tab"
            description="Job Templates settings."
            actionStep="Click to create and manage templates for job postings to streamline the creation process."
          >
            <TabsTrigger value="templates">Job Templates</TabsTrigger>
          </VoiceTutorialListener>
          
          <VoiceTutorialListener
            selector="users-settings-tab"
            description="Users and Roles settings."
            actionStep="Click to manage user accounts and assign different permission roles."
          >
            <TabsTrigger value="users">Users & Roles</TabsTrigger>
          </VoiceTutorialListener>
          
          <VoiceTutorialListener
            selector="email-settings-tab"
            description="Email communication settings."
            actionStep="Click to configure email templates, automations, and server settings."
          >
            <TabsTrigger value="email">Email</TabsTrigger>
          </VoiceTutorialListener>
          
          <VoiceTutorialListener
            selector="integrations-settings-tab"
            description="External system integrations."
            actionStep="Click to configure integrations with job boards, HRIS systems, and other external platforms."
          >
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
          </VoiceTutorialListener>
        </TabsList>
        
        <TabsContent value="general">
          <GeneralSettings />
        </TabsContent>
        
        <TabsContent value="voice">
          <VoiceSettings />
        </TabsContent>
        
        <TabsContent value="templates">
          <JobTemplateSettings />
        </TabsContent>
        
        <TabsContent value="users">
          <UserSettings />
        </TabsContent>
        
        <TabsContent value="email">
          <EmailSettings />
        </TabsContent>
        
        <TabsContent value="integrations">
          <IntegrationSettings />
        </TabsContent>
      </Tabs>
    </>
  );
}
