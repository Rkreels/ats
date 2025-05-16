import { useState } from "react";
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
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
          <p className="text-gray-600">Configure your ATS preferences</p>
        </div>
      </div>
      <VoiceTutorialListener
        selector="settings-tabs"
        description="Switch between tabs to configure various system settings."
        actionStep="Select a tab to update preferences for general, voice, templates, users, email, or integrations."
      >
        <Tabs defaultValue="general" className="space-y-8">
          <TabsList className="grid grid-cols-2 md:grid-cols-6 w-full md:w-auto">
            <VoiceTutorialListener
              selector="tab-general"
              description="General application settings."
            >
              <TabsTrigger value="general">General</TabsTrigger>
            </VoiceTutorialListener>
            <VoiceTutorialListener
              selector="tab-voice"
              description="Adjust voice assistant and accessibility options."
            >
              <TabsTrigger value="voice">Voice Assistant</TabsTrigger>
            </VoiceTutorialListener>
            <VoiceTutorialListener
              selector="tab-templates"
              description="Manage and edit job templates for new positions."
            >
              <TabsTrigger value="templates">Job Templates</TabsTrigger>
            </VoiceTutorialListener>
            <VoiceTutorialListener
              selector="tab-users"
              description="Manage application users and roles."
            >
              <TabsTrigger value="users">Users & Roles</TabsTrigger>
            </VoiceTutorialListener>
            <VoiceTutorialListener
              selector="tab-email"
              description="Configure email settings and templates."
            >
              <TabsTrigger value="email">Email</TabsTrigger>
            </VoiceTutorialListener>
            <VoiceTutorialListener
              selector="tab-integrations"
              description="Manage integrations with external systems."
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
      </VoiceTutorialListener>
    </>
  );
}
