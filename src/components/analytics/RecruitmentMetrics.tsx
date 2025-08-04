import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Users, Clock, Target, DollarSign } from "lucide-react";
import VoiceTutorialListener from "@/components/voice/VoiceTutorialListener";

interface MetricCardProps {
  title: string;
  value: string | number;
  change: number;
  changeLabel: string;
  icon: React.ElementType;
  description: string;
}

function MetricCard({ title, value, change, changeLabel, icon: Icon, description }: MetricCardProps) {
  const isPositive = change >= 0;
  
  return (
    <VoiceTutorialListener
      selector={`metric-${title.toLowerCase().replace(/\s+/g, '-')}`}
      description={`${title} metric showing ${value}. ${description}`}
      actionStep={`${changeLabel} compared to previous period`}
    >
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <Icon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{value}</div>
          <div className="flex items-center space-x-1 text-sm">
            {isPositive ? (
              <TrendingUp className="h-3 w-3 text-green-500" />
            ) : (
              <TrendingDown className="h-3 w-3 text-red-500" />
            )}
            <span className={`text-xs ${isPositive ? "text-green-600" : "text-red-600"}`}>
              {isPositive ? "+" : ""}{change}%
            </span>
            <span className="text-xs text-muted-foreground">{changeLabel}</span>
          </div>
        </CardContent>
      </Card>
    </VoiceTutorialListener>
  );
}

interface RecruitmentFunnelProps {
  data: {
    stage: string;
    count: number;
    percentage: number;
  }[];
}

function RecruitmentFunnel({ data }: RecruitmentFunnelProps) {
  return (
    <VoiceTutorialListener
      selector="recruitment-funnel"
      description="Recruitment funnel showing candidate progression through hiring stages"
      actionStep="View conversion rates at each stage of the hiring process"
    >
      <Card>
        <CardHeader>
          <CardTitle>Recruitment Funnel</CardTitle>
          <CardDescription>Candidate progression through hiring stages</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.map((stage, index) => (
            <div key={stage.stage} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{stage.stage}</span>
                <span className="text-sm text-muted-foreground">
                  {stage.count} candidates ({stage.percentage}%)
                </span>
              </div>
              <Progress value={stage.percentage} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>
    </VoiceTutorialListener>
  );
}

export default function RecruitmentMetrics() {
  const metrics = [
    {
      title: "Total Applications",
      value: 324,
      change: 12.5,
      changeLabel: "from last month",
      icon: Users,
      description: "Total number of job applications received"
    },
    {
      title: "Average Time to Hire",
      value: "23 days",
      change: -8.2,
      changeLabel: "faster than last month",
      icon: Clock,
      description: "Average days from application to hire"
    },
    {
      title: "Offer Acceptance Rate",
      value: "89%",
      change: 4.1,
      changeLabel: "from last month",
      icon: Target,
      description: "Percentage of offers accepted by candidates"
    },
    {
      title: "Cost Per Hire",
      value: "$4,250",
      change: -15.3,
      changeLabel: "lower than last month",
      icon: DollarSign,
      description: "Average cost to hire one candidate"
    }
  ];

  const funnelData = [
    { stage: "Applied", count: 324, percentage: 100 },
    { stage: "Screening", count: 187, percentage: 58 },
    { stage: "Interview", count: 89, percentage: 27 },
    { stage: "Offer", count: 34, percentage: 10 },
    { stage: "Hired", count: 28, percentage: 9 }
  ];

  return (
    <div className="space-y-6">
      <VoiceTutorialListener
        selector="recruitment-metrics-overview"
        description="Key recruitment performance metrics and statistics"
        actionStep="Review metrics to understand hiring performance and trends"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric) => (
            <MetricCard key={metric.title} {...metric} />
          ))}
        </div>
      </VoiceTutorialListener>
      
      <RecruitmentFunnel data={funnelData} />
    </div>
  );
}