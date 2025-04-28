
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useVoiceTrigger } from "@/hooks/useVoiceTrigger";
import { LineChart, BarChart } from "@/components/ui/chart";
import { Download } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const Reports = () => {
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
  
  const { voiceProps: reportsOverviewProps } = useVoiceTrigger({
    what: "The reports section allows you to analyze your recruiting data. Generate different types of reports by selecting parameters and date ranges, and export the data for further analysis."
  });
  
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
                <Button className="w-full">Generate Report</Button>
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
              <Button size="sm" variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export CSV
              </Button>
            </CardHeader>
            <CardContent>
              <LineChart 
                data={hiringData}
                index="month"
                categories={["applications", "interviews", "hires"]}
                colors={["blue", "green", "purple"]}
                valueFormatter={(value) => `${value}`}
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
              <Button size="sm" variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export CSV
              </Button>
            </CardHeader>
            <CardContent>
              <BarChart 
                data={timeToHireData}
                index="department"
                categories={["days"]}
                colors={["blue"]}
                valueFormatter={(value) => `${value} days`}
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
              <Button size="sm" variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export CSV
              </Button>
            </CardHeader>
            <CardContent>
              <BarChart 
                data={sourceEfficiencyData}
                index="source"
                categories={["applications", "qualifiedCandidates", "hires"]}
                colors={["gray", "blue", "green"]}
                valueFormatter={(value) => `${value}`}
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
