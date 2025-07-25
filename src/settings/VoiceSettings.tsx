
import { useState } from "react";
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
  const { 
    voiceEnabled, 
    toggleVoice, 
    voicePersona, 
    setVoicePersona,
    voiceSpeed,
    setVoiceSpeed
  } = useVoiceTutorial();
  
  // Voice tutorial settings form state
  const [voiceTutorialLevel, setVoiceTutorialLevel] = useState("all");
  const [whatIsEnabled, setWhatIsEnabled] = useState(true);
  const [decisionEnabled, setDecisionEnabled] = useState(true);
  
  // Mock function to save settings
  const saveSettings = () => {
    // The voice persona and speed are now directly managed by the context
    toast({
      title: "Voice settings saved",
      description: "Your voice tutorial preferences have been updated."
    });
  };
  
  // Voice tutorials with improved descriptions and action steps
  const { voiceProps: voiceSettingsProps } = useVoiceTrigger({
    what: "These settings control how the voice tutorial system works. You can customize how the voice assistant guides you through the application.",
    actionStep: "Try adjusting the voice persona or speed to find what works best for you."
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
          <p className="text-xs text-gray-500 mt-1">Choose the personality that best matches your preference</p>
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
          <p className="text-xs text-gray-500 mt-1">Determine how detailed guidance should be</p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="voice-speed">Voice Speed</Label>
          <Select value={voiceSpeed} onValueChange={setVoiceSpeed}>
            <SelectTrigger id="voice-speed">
              <SelectValue placeholder="Select voice speed" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="slow">Slow (For non-English speakers)</SelectItem>
              <SelectItem value="normal">Normal</SelectItem>
              <SelectItem value="fast">Fast</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-gray-500 mt-1">Adjust the speed at which instructions are spoken</p>
        </div>
        
        <div className="space-y-2">
          <Label className="text-sm">Enable Tutorial Types</Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="whatIs" 
                checked={whatIsEnabled}
                onCheckedChange={(checked) => {
                  setWhatIsEnabled(checked === true);
                }}
              />
              <Label htmlFor="whatIs" className="text-sm">
                "What is this?" (Hover tutorials)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="decision" 
                checked={decisionEnabled}
                onCheckedChange={(checked) => {
                  setDecisionEnabled(checked === true);
                }}
              />
              <Label htmlFor="decision" className="text-sm">
                "Decision Support" (Critical action tutorials)
              </Label>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-1">Choose which types of voice guidance you want to receive</p>
        </div>
        
        <Button onClick={saveSettings}>Save Voice Settings</Button>
      </CardContent>
    </Card>
  );
}
