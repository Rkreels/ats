
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useVoiceTrigger } from "@/hooks/useVoiceTrigger";

export default function GeneralSettings() {
  const { toast } = useToast();
  // General settings form state
  const [companyName, setCompanyName] = useState("Demo Company");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [slackNotifications, setSlackNotifications] = useState(true);
  const [defaultCurrency, setDefaultCurrency] = useState("USD");
  
  // Mock function to save settings
  const saveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your changes have been saved successfully."
    });
  };

  const { voiceProps } = useVoiceTrigger({
    what: "These are your general application settings including company information and notification preferences."
  });

  return (
    <Card {...voiceProps}>
      <CardHeader>
        <CardTitle>General Settings</CardTitle>
        <CardDescription>Configure your company and notification preferences</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="company-name">Company Name</Label>
            <Input 
              id="company-name" 
              value={companyName} 
              onChange={(e) => setCompanyName(e.target.value)} 
            />
          </div>
          
          <div className="space-y-4">
            <Label>Notifications</Label>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-notifications" className="text-sm">Email Notifications</Label>
                <p className="text-gray-500 text-xs">Receive daily email digests</p>
              </div>
              <Switch 
                id="email-notifications" 
                checked={emailNotifications}
                onCheckedChange={setEmailNotifications}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="slack-notifications" className="text-sm">Slack Notifications</Label>
                <p className="text-gray-500 text-xs">Receive real-time Slack alerts</p>
              </div>
              <Switch 
                id="slack-notifications" 
                checked={slackNotifications}
                onCheckedChange={setSlackNotifications}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="currency">Default Currency</Label>
            <Select defaultValue={defaultCurrency} onValueChange={setDefaultCurrency}>
              <SelectTrigger>
                <SelectValue placeholder="Select a currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">USD ($)</SelectItem>
                <SelectItem value="EUR">EUR (€)</SelectItem>
                <SelectItem value="GBP">GBP (£)</SelectItem>
                <SelectItem value="CAD">CAD ($)</SelectItem>
                <SelectItem value="AUD">AUD ($)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Button onClick={saveSettings}>Save Changes</Button>
      </CardContent>
    </Card>
  );
}
