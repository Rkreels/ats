
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
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from "recharts";
import EnhancedVoiceTutorialListener from "@/components/voice/EnhancedVoiceTutorialListener";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { Download, Save, Trash2 } from "lucide-react";

interface ReportTabsProps {
  activeTab?: string;
}

// Enhanced sample data
const timeInStageData = [
  { name: 'Applied', days: 3, candidates: 45 },
  { name: 'Screening', days: 5, candidates: 32 },
  { name: 'Interview', days: 7, candidates: 28 },
  { name: 'Technical', days: 4, candidates: 20 },
  { name: 'Final', days: 6, candidates: 15 },
  { name: 'Offer', days: 2, candidates: 12 },
];

const diversityData = [
  { name: 'Male', count: 45, percentage: 45 },
  { name: 'Female', count: 40, percentage: 40 },
  { name: 'Non-binary', count: 5, percentage: 5 },
  { name: 'Undisclosed', count: 10, percentage: 10 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

interface CustomReport {
  id: string;
  name: string;
  metrics: string[];
  dateRange: string;
  createdAt: string;
}

const ReportTabs = ({ activeTab = "overview" }: ReportTabsProps) => {
  const { toast } = useToast();
  const [currentTab, setCurrentTab] = useState(activeTab);
  const [customReportName, setCustomReportName] = useState("");
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([]);
  const [reportDateRange, setReportDateRange] = useState("last30days");
  const [savedReports, setSavedReports] = useState<CustomReport[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showCustomData, setShowCustomData] = useState(false);
  
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

    setIsGenerating(true);
    
    setTimeout(() => {
      const newReport: CustomReport = {
        id: `report_${Date.now()}`,
        name: customReportName,
        metrics: [...selectedMetrics],
        dateRange: reportDateRange,
        createdAt: new Date().toISOString()
      };

      setSavedReports(prev => [...prev, newReport]);
      setShowCustomData(true);
      setIsGenerating(false);

      toast({
        title: "Custom Report Created",
        description: `"${customReportName}" has been created with ${selectedMetrics.length} metrics.`
      });

      // Reset form
      setCustomReportName("");
      setSelectedMetrics([]);
    }, 2000);
  };

  const handleDeleteReport = (reportId: string) => {
    setSavedReports(prev => prev.filter(r => r.id !== reportId));
    toast({
      title: "Report Deleted",
      description: "Custom report has been removed."
    });
  };

  const availableMetrics = [
    'Application Volume',
    'Time to Hire',
    'Conversion Rates',
    'Source Effectiveness',
    'Interview Success Rate',
    'Offer Acceptance Rate',
    'Diversity Metrics',
    'Cost per Hire'
  ];

  return (
    <EnhancedVoiceTutorialListener
      selector="report-tabs-container"
      description="This is the main reports section with different analytics views and custom report creation."
      actionStep="Navigate between tabs to view different report types or create custom reports."
      category="navigation"
      priority="high"
    >
      <Tabs value={currentTab} onValueChange={setCurrentTab} className="space-y-8">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full">
          <EnhancedVoiceTutorialListener
            selector="tab-overview"
            description="Dashboard tab showing overview of all recruitment metrics."
            category="navigation"
          >
            <TabsTrigger value="overview">Dashboard</TabsTrigger>
          </EnhancedVoiceTutorialListener>
          <EnhancedVoiceTutorialListener
            selector="tab-hiring"
            description="Hiring process analytics including application rates and time in stages."
            category="navigation"
          >
            <TabsTrigger value="hiring">Hiring Process</TabsTrigger>
          </EnhancedVoiceTutorialListener>
          <EnhancedVoiceTutorialListener
            selector="tab-diversity"
            description="Diversity and inclusion metrics for candidate demographics."
            category="navigation"
          >
            <TabsTrigger value="diversity">Diversity</TabsTrigger>
          </EnhancedVoiceTutorialListener>
          <EnhancedVoiceTutorialListener
            selector="tab-custom"
            description="Create and manage custom reports with selected metrics."
            category="navigation"
          >
            <TabsTrigger value="custom">Custom Reports</TabsTrigger>
          </EnhancedVoiceTutorialListener>
        </TabsList>
        
        <TabsContent value="overview">
          <EnhancedVoiceTutorialListener
            selector="reports-overview"
            description="Overview dashboard with key recruitment metrics and charts."
            category="info"
          >
            <ReportsCharts />
          </EnhancedVoiceTutorialListener>
        </TabsContent>
        
        <TabsContent value="hiring">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <EnhancedVoiceTutorialListener
              selector="application-rate-chart"
              description="Application rate chart showing applications received per job opening."
              category="info"
            >
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
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
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
            </EnhancedVoiceTutorialListener>
            
            <EnhancedVoiceTutorialListener
              selector="time-in-stage-chart"
              description="Time in stage chart showing average days spent in each hiring stage."
              category="info"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Time in Stage</CardTitle>
                  <CardDescription>Average days spent in each hiring stage</CardDescription>
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={timeInStageData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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
            </EnhancedVoiceTutorialListener>
            
            <EnhancedVoiceTutorialListener
              selector="offer-acceptance-rate"
              description="Offer acceptance rate showing percentage of offers accepted by candidates."
              category="info"
            >
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
            </EnhancedVoiceTutorialListener>
          </div>
        </TabsContent>
        
        <TabsContent value="diversity">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <EnhancedVoiceTutorialListener
              selector="gender-distribution-bar"
              description="Gender distribution bar chart showing candidate demographics."
              category="info"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Gender Distribution (Bar Chart)</CardTitle>
                  <CardDescription>Distribution of candidates by gender</CardDescription>
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={diversityData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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
            </EnhancedVoiceTutorialListener>
            
            <EnhancedVoiceTutorialListener
              selector="gender-distribution-pie"
              description="Gender distribution pie chart showing proportional demographics."
              category="info"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Gender Distribution (Pie Chart)</CardTitle>
                  <CardDescription>Proportional distribution by gender</CardDescription>
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={diversityData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percentage }) => `${name}: ${percentage}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="count"
                        >
                          {diversityData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </EnhancedVoiceTutorialListener>
          </div>
        </TabsContent>
        
        <TabsContent value="custom">
          <div className="space-y-6">
            <EnhancedVoiceTutorialListener
              selector="custom-report-builder"
              description="Custom report builder for creating personalized analytics reports."
              actionStep="Fill out the form fields and click create to build your custom report."
              category="form"
              priority="high"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Custom Report Builder</CardTitle>
                  <CardDescription>Create personalized reports with your selected metrics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {isGenerating ? (
                    <LoadingSpinner text="Generating custom report..." />
                  ) : (
                    <>
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
                          {availableMetrics.map((metric) => (
                            <EnhancedVoiceTutorialListener
                              key={metric}
                              selector={`metric-${metric.toLowerCase().replace(/\s+/g, '-')}`}
                              description={`${metric} metric checkbox for including in custom reports.`}
                              category="form"
                            >
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id={metric}
                                  checked={selectedMetrics.includes(metric)}
                                  onCheckedChange={(checked) => handleMetricChange(metric, checked as boolean)}
                                />
                                <Label htmlFor={metric} className="text-sm">{metric}</Label>
                              </div>
                            </EnhancedVoiceTutorialListener>
                          ))}
                        </div>
                      </div>

                      <Button onClick={handleCreateCustomReport} className="w-full">
                        <Save className="h-4 w-4 mr-2" />
                        Create Custom Report
                      </Button>
                    </>
                  )}
                </CardContent>
              </Card>
            </EnhancedVoiceTutorialListener>

            {savedReports.length > 0 && (
              <EnhancedVoiceTutorialListener
                selector="saved-reports-list"
                description="List of saved custom reports with options to download or delete."
                category="info"
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Saved Custom Reports</CardTitle>
                    <CardDescription>Manage your created reports</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {savedReports.map((report) => (
                        <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <h3 className="font-medium">{report.name}</h3>
                            <p className="text-sm text-gray-500">
                              {report.metrics.length} metrics • {report.dateRange} • Created: {new Date(report.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => {
                              toast({
                                title: "Report Downloaded",
                                description: `${report.name} has been downloaded.`
                              });
                            }}>
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleDeleteReport(report.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </EnhancedVoiceTutorialListener>
            )}

            {showCustomData && (
              <EnhancedVoiceTutorialListener
                selector="custom-report-preview"
                description="Preview of your custom report data visualization."
                category="info"
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Custom Report Preview</CardTitle>
                    <CardDescription>Sample data for your selected metrics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={[
                            { name: 'Q1', value: 40 },
                            { name: 'Q2', value: 65 },
                            { name: 'Q3', value: 55 },
                            { name: 'Q4', value: 80 }
                          ]}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="value" fill="#8884d8" name="Custom Metric" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </EnhancedVoiceTutorialListener>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </EnhancedVoiceTutorialListener>
  );
};

export default ReportTabs;
