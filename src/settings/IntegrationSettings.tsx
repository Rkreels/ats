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
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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

  const [isAddApiDialogOpen, setIsAddApiDialogOpen] = useState(false);
  const [isAddWebhookDialogOpen, setIsAddWebhookDialogOpen] = useState(false);
  const [isConfigDialogOpen, setIsConfigDialogOpen] = useState(false);
  const [configIntegration, setConfigIntegration] = useState<Integration | null>(null);
  
  const [newApiConfig, setNewApiConfig] = useState({
    name: "",
    baseUrl: "",
    apiKey: "",
    authType: "api_key"
  });

  const [newWebhookConfig, setNewWebhookConfig] = useState({
    name: "",
    webhookUrl: "",
    secret: "",
    events: "candidate.created"
  });

  const { voiceProps } = useVoiceTrigger({
    what: "Manage integrations with external services like LinkedIn, Indeed, Slack, and other recruitment tools."
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

  const openConfigDialog = (integration: Integration) => {
    setConfigIntegration(integration);
    setIsConfigDialogOpen(true);
  };

  const handleAddApi = () => {
    if (!newApiConfig.name || !newApiConfig.baseUrl) {
      toast({
        title: "Missing information",
        description: "Please fill in the integration name and base URL.",
        variant: "destructive"
      });
      return;
    }

    const newIntegration: Integration = {
      id: `custom-api-${Date.now()}`,
      name: newApiConfig.name,
      description: `Custom API: ${newApiConfig.baseUrl}`,
      enabled: true,
      status: "Connected",
      lastSync: new Date().toLocaleString()
    };

    setIntegrations([...integrations, newIntegration]);
    setIsAddApiDialogOpen(false);
    setNewApiConfig({ name: "", baseUrl: "", apiKey: "", authType: "api_key" });

    toast({
      title: "API Integration added",
      description: `${newApiConfig.name} has been connected successfully.`
    });
  };

  const handleAddWebhook = () => {
    if (!newWebhookConfig.name || !newWebhookConfig.webhookUrl) {
      toast({
        title: "Missing information",
        description: "Please fill in the webhook name and URL.",
        variant: "destructive"
      });
      return;
    }

    const newIntegration: Integration = {
      id: `webhook-${Date.now()}`,
      name: newWebhookConfig.name,
      description: `Webhook: ${newWebhookConfig.webhookUrl}`,
      enabled: true,
      status: "Connected",
      lastSync: new Date().toLocaleString()
    };

    setIntegrations([...integrations, newIntegration]);
    setIsAddWebhookDialogOpen(false);
    setNewWebhookConfig({ name: "", webhookUrl: "", secret: "", events: "candidate.created" });

    toast({
      title: "Webhook added",
      description: `${newWebhookConfig.name} webhook has been configured.`
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
    <>
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
                          onClick={() => openConfigDialog(integration)}
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
                  <Button variant="outline" size="sm" onClick={() => setIsAddApiDialogOpen(true)}>
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
                  <Button variant="outline" size="sm" onClick={() => setIsAddWebhookDialogOpen(true)}>
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
                  <Button variant="outline" size="sm" onClick={() => {
                    toast({
                      title: "Marketplace",
                      description: "Integration marketplace coming soon. Check back for new integrations."
                    });
                  }}>
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Browse
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Custom API Dialog */}
      <Dialog open={isAddApiDialogOpen} onOpenChange={setIsAddApiDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Custom API Integration</DialogTitle>
            <DialogDescription>Connect an external service via REST API.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="api-name">Integration Name</Label>
              <Input
                id="api-name"
                value={newApiConfig.name}
                onChange={(e) => setNewApiConfig({ ...newApiConfig, name: e.target.value })}
                placeholder="e.g., My CRM"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="api-url">Base URL</Label>
              <Input
                id="api-url"
                value={newApiConfig.baseUrl}
                onChange={(e) => setNewApiConfig({ ...newApiConfig, baseUrl: e.target.value })}
                placeholder="https://api.example.com/v1"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="auth-type">Authentication Type</Label>
              <Select value={newApiConfig.authType} onValueChange={(value) => setNewApiConfig({ ...newApiConfig, authType: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="api_key">API Key</SelectItem>
                  <SelectItem value="oauth2">OAuth 2.0</SelectItem>
                  <SelectItem value="basic">Basic Auth</SelectItem>
                  <SelectItem value="bearer">Bearer Token</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="api-key">API Key / Token</Label>
              <Input
                id="api-key"
                type="password"
                value={newApiConfig.apiKey}
                onChange={(e) => setNewApiConfig({ ...newApiConfig, apiKey: e.target.value })}
                placeholder="Enter your API key"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddApiDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddApi}>Connect API</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Webhook Dialog */}
      <Dialog open={isAddWebhookDialogOpen} onOpenChange={setIsAddWebhookDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Webhook</DialogTitle>
            <DialogDescription>Configure a webhook endpoint to receive data.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="webhook-name">Webhook Name</Label>
              <Input
                id="webhook-name"
                value={newWebhookConfig.name}
                onChange={(e) => setNewWebhookConfig({ ...newWebhookConfig, name: e.target.value })}
                placeholder="e.g., Candidate Sync"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="webhook-url">Webhook URL</Label>
              <Input
                id="webhook-url"
                value={newWebhookConfig.webhookUrl}
                onChange={(e) => setNewWebhookConfig({ ...newWebhookConfig, webhookUrl: e.target.value })}
                placeholder="https://your-server.com/webhook"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="webhook-secret">Signing Secret (optional)</Label>
              <Input
                id="webhook-secret"
                type="password"
                value={newWebhookConfig.secret}
                onChange={(e) => setNewWebhookConfig({ ...newWebhookConfig, secret: e.target.value })}
                placeholder="Enter signing secret"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="webhook-events">Events</Label>
              <Select value={newWebhookConfig.events} onValueChange={(value) => setNewWebhookConfig({ ...newWebhookConfig, events: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="candidate.created">Candidate Created</SelectItem>
                  <SelectItem value="candidate.updated">Candidate Updated</SelectItem>
                  <SelectItem value="interview.scheduled">Interview Scheduled</SelectItem>
                  <SelectItem value="job.published">Job Published</SelectItem>
                  <SelectItem value="all">All Events</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddWebhookDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddWebhook}>Add Webhook</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Configure Integration Dialog */}
      <Dialog open={isConfigDialogOpen} onOpenChange={setIsConfigDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Configure {configIntegration?.name}</DialogTitle>
            <DialogDescription>
              Manage settings for this integration.
            </DialogDescription>
          </DialogHeader>
          {configIntegration && (
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label>Status</Label>
                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor(configIntegration.status)}>
                    {configIntegration.status}
                  </Badge>
                  {configIntegration.lastSync && (
                    <span className="text-xs text-gray-500">Last sync: {configIntegration.lastSync}</span>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Sync Frequency</Label>
                <Select defaultValue="hourly">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="realtime">Real-time</SelectItem>
                    <SelectItem value="hourly">Hourly</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="manual">Manual Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Auto-import candidates</Label>
                  <p className="text-xs text-gray-500">Automatically import new candidates</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Send notifications</Label>
                  <p className="text-xs text-gray-500">Get notified on sync events</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsConfigDialogOpen(false)}>Cancel</Button>
            <Button onClick={() => {
              setIsConfigDialogOpen(false);
              toast({
                title: "Configuration saved",
                description: `${configIntegration?.name} settings updated successfully.`
              });
            }}>Save Configuration</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
