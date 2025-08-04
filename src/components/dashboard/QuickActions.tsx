import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Calendar, FileText, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useVoiceTrigger } from "@/hooks/useVoiceTrigger";
import VoiceTutorialListener from "@/components/voice/VoiceTutorialListener";

export default function QuickActions() {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: "Add Candidate",
      description: "Add a new candidate to your pipeline",
      icon: Users,
      action: () => navigate("/candidates"),
      voiceDescription: "Quickly add a new candidate to your recruitment pipeline",
      actionStep: "Click to navigate to candidates page and add a new candidate"
    },
    {
      title: "Create Job",
      description: "Post a new job opening",
      icon: Plus,
      action: () => navigate("/jobs"),
      voiceDescription: "Create and publish a new job posting",
      actionStep: "Click to go to jobs page and create a new position"
    },
    {
      title: "Schedule Interview",
      description: "Schedule interviews with candidates",
      icon: Calendar,
      action: () => navigate("/interviews"),
      voiceDescription: "Schedule new interviews or manage existing ones",
      actionStep: "Click to access interview scheduling and management"
    },
    {
      title: "Generate Report",
      description: "Create recruitment analytics reports",
      icon: FileText,
      action: () => navigate("/reports"),
      voiceDescription: "Generate detailed recruitment performance reports",
      actionStep: "Click to create reports and view analytics"
    }
  ];

  return (
    <VoiceTutorialListener
      selector="dashboard-quick-actions"
      description="Quick action buttons for common tasks in your recruitment workflow"
      actionStep="Use these shortcuts to quickly access frequently used features"
    >
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Frequently used recruitment tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <VoiceTutorialListener
                key={action.title}
                selector={`quick-action-${action.title.toLowerCase().replace(/\s+/g, '-')}`}
                description={action.voiceDescription}
                actionStep={action.actionStep}
              >
                <Button
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-center space-y-2"
                  onClick={action.action}
                  {...useVoiceTrigger({
                    what: action.voiceDescription,
                    actionStep: action.actionStep
                  }).voiceProps}
                >
                  <action.icon className="h-6 w-6" />
                  <div className="text-center">
                    <div className="font-medium text-sm">{action.title}</div>
                    <div className="text-xs text-muted-foreground">{action.description}</div>
                  </div>
                </Button>
              </VoiceTutorialListener>
            ))}
          </div>
        </CardContent>
      </Card>
    </VoiceTutorialListener>
  );
}