
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useVoiceTrigger } from "@/hooks/useVoiceTrigger";
import { Download } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/contexts/UserContext";

// Create custom chart components to work around TypeScript issues
const LineChartCustom = ({ data, categories, colors, className }) => {
  return (
    <div className={className}>
      {/* Render chart data as a table for now */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="text-left p-2">Month</th>
              {categories.map((category) => (
                <th key={category} className="text-left p-2">{category}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="p-2">{item.month}</td>
                {categories.map((category) => (
                  <td key={category} className="p-2">
                    <div className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2" 
                        style={{ backgroundColor: colors[categories.indexOf(category)] }} 
                      />
                      {item[category]}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Visual representation */}
      <div className="mt-6 relative h-48">
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-200" />
        <div className="flex justify-between h-full">
          {data.map((item, i) => (
            <div key={i} className="flex-1 flex flex-col justify-end items-center relative">
              <div className="absolute bottom-2 text-xs text-gray-500">{item.month}</div>
              <div className="w-full flex justify-center space-x-1 pt-6">
                {categories.map((category, j) => {
                  const value = item[category];
                  const maxValue = Math.max(...data.map(d => d[category]));
                  const height = maxValue > 0 ? (value / maxValue) * 100 : 0;
                  
                  return (
                    <div 
                      key={category} 
                      className="w-2 rounded-t"
                      style={{ 
                        height: `${height}%`, 
                        backgroundColor: colors[j],
                        marginTop: 'auto'
                      }}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const BarChartCustom = ({ data, index, categories, colors, className }) => {
  return (
    <div className={className}>
      {/* Render chart data as a table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="text-left p-2">{index}</th>
              {categories.map((category) => (
                <th key={category} className="text-left p-2">{category}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <tr key={idx} className="border-b">
                <td className="p-2">{item[index]}</td>
                {categories.map((category) => (
                  <td key={category} className="p-2">
                    <div className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2" 
                        style={{ backgroundColor: colors[categories.indexOf(category)] }} 
                      />
                      {item[category]}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Visual representation */}
      <div className="mt-6 relative h-48">
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-200" />
        <div className="flex justify-between h-full">
          {data.map((item, i) => (
            <div key={i} className="flex-1 flex flex-col justify-end items-center relative">
              <div className="absolute bottom-2 text-xs text-gray-500 whitespace-nowrap">{item[index]}</div>
              <div className="w-full flex justify-center space-x-2 pt-6">
                {categories.map((category, j) => {
                  const value = item[category];
                  const maxValue = Math.max(...data.map(d => d[category]));
                  const height = maxValue > 0 ? (value / maxValue) * 100 : 0;
                  
                  return (
                    <div 
                      key={category} 
                      className="w-5 rounded-t"
                      style={{ 
                        height: `${height}%`, 
                        backgroundColor: colors[j],
                        marginTop: 'auto'
                      }}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Reports = () => {
  const { toast } = useToast();
  const { hasPermission } = useUser();
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [reportType, setReportType] = useState("hiring");
  
  // Sample data for reports - in a real app these would come from API calls
  const hiringData = [
    { month: "Jan", applications: 120, interviews: 45, hires: 10 },
    { month: "Feb", applications: 150, interviews: 55, hires: 12 },
    { month: "Mar", applications: 180, interviews: 70, hires: 15 },
    { month: "Apr", applications: 200, interviews: 80, hires: 18 },
    { month: "May", applications: 220, interviews: 90, hires: 25 },
    { month: "Jun", applications: 260, interviews: 100, hires: 30 },
  ];
  
  const timeToHireData = [
    { department: "Engineering", days: 45 },
    { department: "Marketing", days: 32 },
    { department: "Sales", days: 28 },
    { department: "Product", days: 40 },
    { department: "Design", days: 35 },
    { department: "Finance", days: 30 },
  ];
  
  const sourceEfficiencyData = [
    { source: "LinkedIn", applications: 250, qualifiedCandidates: 120, hires: 25 },
    { source: "Indeed", applications: 320, qualifiedCandidates: 150, hires: 30 },
    { source: "Company Website", applications: 150, qualifiedCandidates: 70, hires: 15 },
    { source: "Referrals", applications: 100, qualifiedCandidates: 80, hires: 40 },
    { source: "Job Fairs", applications: 80, qualifiedCandidates: 30, hires: 8 },
  ];

  const handleGenerateReport = () => {
    toast({
      title: "Report Generated",
      description: `${reportType.charAt(0).toUpperCase() + reportType.slice(1)} report has been generated.`
    });
  };

  const handleExportCSV = () => {
    toast({
      title: "Report Exported",
      description: "The report has been exported as CSV format."
    });
  };
  
  const { voiceProps: reportsOverviewProps } = useVoiceTrigger({
    what: "The reports section allows you to analyze your recruiting data. Generate different types of reports by selecting parameters and date ranges, and export the data for further analysis."
  });

  // Check if user has permission to view reports
  if (!hasPermission('canViewReports')) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Access Restricted</h1>
        <p className="text-gray-600">You don't have permission to view reports.</p>
      </div>
    );
  }
  
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Reports</h1>
          <p className="text-gray-600">Analyze your recruiting metrics and performance</p>
        </div>
      </div>
      
      <div className="mb-6" {...reportsOverviewProps}>
        <Card>
          <CardHeader>
            <CardTitle>Generate Report</CardTitle>
            <CardDescription>Select parameters to generate a custom report</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="reportType">Report Type</Label>
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger id="reportType">
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hiring">Hiring Overview</SelectItem>
                    <SelectItem value="timeToHire">Time to Hire</SelectItem>
                    <SelectItem value="sourceEfficiency">Source Efficiency</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !startDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="space-y-2">
                <Label>End Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !endDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="flex items-end">
                <Button className="w-full" onClick={handleGenerateReport}>Generate Report</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="hiring" value={reportType} onValueChange={setReportType}>
        <TabsList className="mb-6">
          <TabsTrigger value="hiring">Hiring Overview</TabsTrigger>
          <TabsTrigger value="timeToHire">Time to Hire</TabsTrigger>
          <TabsTrigger value="sourceEfficiency">Source Efficiency</TabsTrigger>
        </TabsList>
        
        <TabsContent value="hiring">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Hiring Overview</CardTitle>
                <CardDescription>Applications, interviews and hires over time</CardDescription>
              </div>
              <Button size="sm" variant="outline" onClick={handleExportCSV}>
                <Download className="mr-2 h-4 w-4" />
                Export CSV
              </Button>
            </CardHeader>
            <CardContent>
              <LineChartCustom 
                data={hiringData}
                categories={["applications", "interviews", "hires"]}
                colors={["#3b82f6", "#10b981", "#8b5cf6"]}
                className="h-[400px]"
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="timeToHire">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Time to Hire by Department</CardTitle>
                <CardDescription>Average days from job posting to hiring</CardDescription>
              </div>
              <Button size="sm" variant="outline" onClick={handleExportCSV}>
                <Download className="mr-2 h-4 w-4" />
                Export CSV
              </Button>
            </CardHeader>
            <CardContent>
              <BarChartCustom 
                data={timeToHireData}
                index="department"
                categories={["days"]}
                colors={["#3b82f6"]}
                className="h-[400px]"
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="sourceEfficiency">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recruiting Source Efficiency</CardTitle>
                <CardDescription>Compare recruiting sources by applications and hires</CardDescription>
              </div>
              <Button size="sm" variant="outline" onClick={handleExportCSV}>
                <Download className="mr-2 h-4 w-4" />
                Export CSV
              </Button>
            </CardHeader>
            <CardContent>
              <BarChartCustom 
                data={sourceEfficiencyData}
                index="source"
                categories={["applications", "qualifiedCandidates", "hires"]}
                colors={["#9ca3af", "#3b82f6", "#10b981"]}
                className="h-[400px]"
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default Reports;
