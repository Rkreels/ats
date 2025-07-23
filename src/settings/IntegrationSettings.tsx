import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { useVoiceTrigger } from "@/hooks/useVoiceTrigger";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Plus, Settings } from "lucide-react";

interface Integration {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  status: "Connected" | "Disconnected" | "Error";
  lastSync?: string;
  settings?: Record<string, any>;
}

export default function IntegrationSettings() {
  const { toast } = useToast();
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: "linkedin",
      name: "LinkedIn Recruiter",
      description: "Sync candidates from LinkedIn Recruiter",
      enabled: true,
      status: "Connected",
      lastSync: "2025-01-22 14:30"
    },
    {
      id: "indeed",
      name: "Indeed",
      description: "Post jobs and import candidates from Indeed",
      enabled: true,
      status: "Connected",
      lastSync: "2025-01-22 12:15"
    },
    {
      id: "greenhouse",
      name: "Greenhouse",
      description: "Bi-directional sync with Greenhouse ATS",
      enabled: false,
      status: "Disconnected"
    },
    {
      id: "slack",
      name: "Slack",
      description: "Send notifications to Slack channels",
      enabled: true,
      status: "Connected",
      lastSync: "2025-01-22 15:45"
    },
    {
      id: "zoom",
      name: "Zoom",
      description: "Automatically create Zoom meetings for interviews",
      enabled: false,
      status: "Disconnected"
    },
    {
      id: "calendly",
      name: "Calendly",
      description: "Schedule interviews using Calendly",
      enabled: false,
      status: "Disconnected"
    }
  ]);

  const { voiceProps } = useVoiceTrigger({
    what: "Manage integrations with external services like LinkedIn, Indeed, Slack, and other recruitment tools. Connect your ATS to streamline workflows."
  });

  const toggleIntegration = (id: string) => {
    setIntegrations(integrations.map(integration => 
      integration.id === id 
        ? { ...integration, enabled: !integration.enabled, status: integration.enabled ? "Disconnected" : "Connected" as const }
        : integration
    ));
    
    const integration = integrations.find(i => i.id === id);
    toast({
      title: `Integration ${integration?.enabled ? 'disabled' : 'enabled'}`,
      description: `${integration?.name} has been ${integration?.enabled ? 'disconnected' : 'connected'}.`
    });
  };

  const syncIntegration = (id: string) => {
    const integration = integrations.find(i => i.id === id);
    if (integration) {
      setIntegrations(integrations.map(i => 
        i.id === id 
          ? { ...i, lastSync: new Date().toLocaleString() }
          : i
      ));
      
      toast({
        title: "Sync started",
        description: `Syncing data from ${integration.name}...`
      });
    }
  };

  const configureIntegration = (id: string) => {
    const integration = integrations.find(i => i.id === id);
    toast({
      title: "Configuration",
      description: `Opening configuration for ${integration?.name}...`
    });
  };

  const getStatusColor = (status: Integration["status"]) => {
    switch (status) {
      case "Connected":
        return "bg-green-100 text-green-800";
      case "Disconnected":
        return "bg-gray-100 text-gray-800";
      case "Error":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card {...voiceProps}>
      <CardHeader>
        <CardTitle>Integrations</CardTitle>
        <CardDescription>Connect your ATS with external services and tools</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {integrations.map((integration) => (
            <div key={integration.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <h3 className="font-medium">{integration.name}</h3>
                    <p className="text-sm text-gray-500">{integration.description}</p>
                    {integration.lastSync && (
                      <p className="text-xs text-gray-400 mt-1">
                        Last sync: {integration.lastSync}
                      </p>
                    )}
                  </div>
                  <Badge className={getStatusColor(integration.status)}>
                    {integration.status}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={integration.enabled}
                    onCheckedChange={() => toggleIntegration(integration.id)}
                  />
                  {integration.enabled && (
                    <>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => syncIntegration(integration.id)}
                      >
                        Sync Now
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => configureIntegration(integration.id)}
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 pt-6 border-t">
          <h3 className="font-medium mb-4">Add New Integration</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Custom API</h4>
                  <p className="text-sm text-gray-500">Connect via REST API</p>
                </div>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add
                </Button>
              </div>
            </Card>
            
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Webhook</h4>
                  <p className="text-sm text-gray-500">Receive data via webhook</p>
                </div>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add
                </Button>
              </div>
            </Card>
            
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">More</h4>
                  <p className="text-sm text-gray-500">Browse marketplace</p>
                </div>
                <Button variant="outline" size="sm">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Browse
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}