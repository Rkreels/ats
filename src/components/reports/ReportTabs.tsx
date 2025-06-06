import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import ReportsCharts from "@/components/reports/ReportsCharts";
import { useEffect, useState } from "react";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

interface ReportTabsProps {
  activeTab?: string;
}

// Sample data for hiring process
const timeInStageData = [
  {
    name: 'Applied',
    days: 3,
  },
  {
    name: 'Screening',
    days: 5,
  },
  {
    name: 'Interview',
    days: 7,
  },
  {
    name: 'Technical',
    days: 4,
  },
  {
    name: 'Final',
    days: 6,
  },
  {
    name: 'Offer',
    days: 2,
  },
];

const diversityData = [
  {
    name: 'Male',
    count: 45,
  },
  {
    name: 'Female',
    count: 40,
  },
  {
    name: 'Non-binary',
    count: 5,
  },
  {
    name: 'Undisclosed',
    count: 10,
  },
];

const ReportTabs = ({ activeTab = "overview" }: ReportTabsProps) => {
  const { toast } = useToast();
  const [currentTab, setCurrentTab] = useState(activeTab);
  const [customReportName, setCustomReportName] = useState("");
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([]);
  const [reportDateRange, setReportDateRange] = useState("last30days");
  
  useEffect(() => {
    setCurrentTab(activeTab);
  }, [activeTab]);

  const handleMetricChange = (metric: string, checked: boolean) => {
    if (checked) {
      setSelectedMetrics([...selectedMetrics, metric]);
    } else {
      setSelectedMetrics(selectedMetrics.filter(m => m !== metric));
    }
  };

  const handleCreateCustomReport = () => {
    if (!customReportName.trim()) {
      toast({
        title: "Report Name Required",
        description: "Please enter a name for your custom report.",
        variant: "destructive"
      });
      return;
    }

    if (selectedMetrics.length === 0) {
      toast({
        title: "Metrics Required",
        description: "Please select at least one metric for your report.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Custom Report Created",
      description: `"${customReportName}" has been created with ${selectedMetrics.length} metrics.`
    });

    // Reset form
    setCustomReportName("");
    setSelectedMetrics([]);
  };

  return (
    <Tabs value={currentTab} onValueChange={setCurrentTab} className="space-y-8">
      <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full">
        <TabsTrigger value="overview">Dashboard</TabsTrigger>
        <TabsTrigger value="hiring">Hiring Process</TabsTrigger>
        <TabsTrigger value="diversity">Diversity</TabsTrigger>
        <TabsTrigger value="custom">Custom Reports</TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview">
        <ReportsCharts />
      </TabsContent>
      
      <TabsContent value="hiring">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Application Rate</CardTitle>
              <CardDescription>Applications received per job opening</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { name: 'Frontend Developer', rate: 45 },
                      { name: 'Backend Developer', rate: 32 },
                      { name: 'Product Manager', rate: 28 },
                      { name: 'Designer', rate: 20 },
                      { name: 'Marketing', rate: 15 }
                    ]}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="rate" fill="#8884d8" name="Applications" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Time in Stage</CardTitle>
              <CardDescription>Average days spent in each hiring stage</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={timeInStageData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="days" fill="#82ca9d" name="Days" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Offer Acceptance Rate</CardTitle>
              <CardDescription>Percentage of offers accepted by candidates</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="h-[300px] flex flex-col items-center justify-center">
                <div className="text-5xl font-bold text-green-500">78%</div>
                <p className="text-gray-500 mt-4">Of all offers were accepted</p>
                <div className="w-full mt-6">
                  <div className="h-4 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                  <div className="flex justify-between mt-2 text-sm text-gray-500">
                    <span>0%</span>
                    <span>50%</span>
                    <span>100%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
      
      <TabsContent value="diversity">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Gender Distribution</CardTitle>
              <CardDescription>Distribution of candidates by gender</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={diversityData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#8884d8" name="Candidates" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
      
      <TabsContent value="custom">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Custom Report Builder</CardTitle>
              <CardDescription>Create personalized reports with your selected metrics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="reportName">Report Name</Label>
                <Input
                  id="reportName"
                  placeholder="Enter report name..."
                  value={customReportName}
                  onChange={(e) => setCustomReportName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Date Range</Label>
                <Select value={reportDateRange} onValueChange={setReportDateRange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="last7days">Last 7 days</SelectItem>
                    <SelectItem value="last30days">Last 30 days</SelectItem>
                    <SelectItem value="last90days">Last 90 days</SelectItem>
                    <SelectItem value="last6months">Last 6 months</SelectItem>
                    <SelectItem value="lastyear">Last year</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label>Select Metrics</Label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    'Application Volume',
                    'Time to Hire',
                    'Conversion Rates',
                    'Source Effectiveness',
                    'Interview Success Rate',
                    'Offer Acceptance Rate',
                    'Diversity Metrics',
                    'Cost per Hire'
                  ].map((metric) => (
                    <div key={metric} className="flex items-center space-x-2">
                      <Checkbox
                        id={metric}
                        checked={selectedMetrics.includes(metric)}
                        onCheckedChange={(checked) => handleMetricChange(metric, checked as boolean)}
                      />
                      <Label htmlFor={metric} className="text-sm">{metric}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <Button onClick={handleCreateCustomReport} className="w-full">
                Create Custom Report
              </Button>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default ReportTabs;
