
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useVoiceTutorial } from "@/contexts/VoiceTutorialContext";
import { useToast } from "@/hooks/use-toast";
import { useVoiceTrigger } from "@/hooks/useVoiceTrigger";

export default function VoiceSettings() {
  const { toast } = useToast();
  const { voiceEnabled, toggleVoice } = useVoiceTutorial();
  
  // Voice tutorial settings form state
  const [voicePersona, setVoicePersona] = useState("professional");
  const [voiceTutorialLevel, setVoiceTutorialLevel] = useState("all");
  const [voiceSpeed, setVoiceSpeed] = useState("normal");
  
  // Mock function to save settings
  const saveSettings = () => {
    // In a real implementation, this would update the voice settings in the context
    toast({
      title: "Voice settings saved",
      description: "Your voice tutorial preferences have been updated."
    });
  };
  
  // Voice tutorials
  const { voiceProps: voiceSettingsProps } = useVoiceTrigger({
    what: "These settings control how the voice tutorial system works."
  });
  
  return (
    <Card {...voiceSettingsProps}>
      <CardHeader>
        <CardTitle>Voice Tutorial Settings</CardTitle>
        <CardDescription>Configure how the voice assistant guides you through the ATS</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="voice-enabled" className="text-sm">Voice Assistant Enabled</Label>
            <p className="text-gray-500 text-xs">Turn the voice tutorial system on or off</p>
          </div>
          <Switch 
            id="voice-enabled" 
            checked={voiceEnabled}
            onCheckedChange={toggleVoice}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="voice-persona">Voice Persona</Label>
          <Select value={voicePersona} onValueChange={setVoicePersona}>
            <SelectTrigger id="voice-persona">
              <SelectValue placeholder="Select a voice persona" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="friendly">Friendly & Casual</SelectItem>
              <SelectItem value="professional">Professional</SelectItem>
              <SelectItem value="technical">Technical Expert</SelectItem>
              <SelectItem value="mentor">Mentoring Coach</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="tutorial-level">Tutorial Level</Label>
          <Select value={voiceTutorialLevel} onValueChange={setVoiceTutorialLevel}>
            <SelectTrigger id="tutorial-level">
              <SelectValue placeholder="Select tutorial detail level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="basic">Basic (What is this?)</SelectItem>
              <SelectItem value="advanced">Advanced (Decision support)</SelectItem>
              <SelectItem value="all">All Levels</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="voice-speed">Voice Speed</Label>
          <Select value={voiceSpeed} onValueChange={setVoiceSpeed}>
            <SelectTrigger id="voice-speed">
              <SelectValue placeholder="Select voice speed" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="slow">Slow</SelectItem>
              <SelectItem value="normal">Normal</SelectItem>
              <SelectItem value="fast">Fast</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label className="text-sm">Enable Tutorial Types</Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="whatIs" defaultChecked />
              <Label htmlFor="whatIs" className="text-sm">
                "What is this?" (Hover tutorials)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="decision" defaultChecked />
              <Label htmlFor="decision" className="text-sm">
                "Decision Support" (Critical action tutorials)
              </Label>
            </div>
          </div>
        </div>
        
        <Button onClick={saveSettings}>Save Voice Settings</Button>
      </CardContent>
    </Card>
  );
}
