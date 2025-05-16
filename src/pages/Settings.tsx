
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
            <VoiceTutorialListener
              selector="settings-general-panel"
              description="All general settings for company, timezone, and roles."
              actionStep="Edit general fields, then save your changes."
            >
              <GeneralSettings />
            </VoiceTutorialListener>
          </TabsContent>
          <TabsContent value="voice">
            <VoiceTutorialListener
              selector="settings-voice-panel"
              description="All customization for the voice assistant, including persona and speed."
              actionStep="Pick a voice and save."
            >
              <VoiceSettings />
            </VoiceTutorialListener>
          </TabsContent>
          <TabsContent value="templates">
            <VoiceTutorialListener
              selector="settings-templates-panel"
              description="Manage job template fields, defaults, and creation."
              actionStep="You can add, edit or remove templates."
            >
              <JobTemplateSettings />
            </VoiceTutorialListener>
          </TabsContent>
          <TabsContent value="users">
            <VoiceTutorialListener
              selector="settings-users-panel"
              description="User and permissions management."
              actionStep="Invite or update users, set roles here."
            >
              <UserSettings />
            </VoiceTutorialListener>
          </TabsContent>
          <TabsContent value="email">
            <VoiceTutorialListener
              selector="settings-email-panel"
              description="Email templates, signatures, and outgoing setup."
              actionStep="Edit or test your email settings."
            >
              <EmailSettings />
            </VoiceTutorialListener>
          </TabsContent>
          <TabsContent value="integrations">
            <VoiceTutorialListener
              selector="settings-integrations-panel"
              description="Integrations with job boards and ATS systems."
              actionStep="Connect or update integrations."
            >
              <IntegrationSettings />
            </VoiceTutorialListener>
          </TabsContent>
        </Tabs>
      </VoiceTutorialListener>
    </>
  );
}
