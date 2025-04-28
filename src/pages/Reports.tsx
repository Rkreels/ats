
import { useVoiceTrigger } from "@/hooks/useVoiceTrigger";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { DateRange } from "react-day-picker";
import { useToast } from "@/hooks/use-toast";
import { format, subMonths } from "date-fns";
import { useUser } from "@/contexts/UserContext";
import ReportsCharts from "@/components/reports/ReportsCharts";

export default function Reports() {
  const { toast } = useToast();
  const { hasPermission } = useUser();
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subMonths(new Date(), 6),
    to: new Date(),
  });
  const [reportType, setReportType] = useState<string>("overview");
  
  const { voiceProps } = useVoiceTrigger({
    what: "This is the reports page where you can view analytics and metrics about your recruiting process. Look at time to hire, source effectiveness, diversity metrics, and more."
  });
  
  if (!hasPermission('canViewReports')) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Access Restricted</h2>
        <p className="text-gray-600 mb-8">You don't have permission to view reports.</p>
        <Button variant="outline" onClick={() => {
          toast({
            title: "Need Access?",
            description: "Contact your administrator to request access to reporting features."
          });
        }}>Request Access</Button>
      </div>
    );
  }
  
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Analytics & Reports</h1>
          <p className="text-gray-600">Track and analyze your recruitment process metrics</p>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-4 mb-6">
        <Select value={reportType} onValueChange={setReportType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Report Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="overview">Overview Dashboard</SelectItem>
            <SelectItem value="hiring">Hiring Efficiency</SelectItem>
            <SelectItem value="diversity">Diversity Metrics</SelectItem>
            <SelectItem value="source">Candidate Sources</SelectItem>
          </SelectContent>
        </Select>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={"w-[280px] justify-start text-left font-normal"}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateRange?.from ? (
                dateRange.to ? (
                  <>
                    {format(dateRange.from, "LLL dd, yyyy")} -{" "}
                    {format(dateRange.to, "LLL dd, yyyy")}
                  </>
                ) : (
                  format(dateRange.from, "LLL dd, yyyy")
                )
              ) : (
                <span>Select date range</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={dateRange?.from}
              selected={dateRange}
              onSelect={setDateRange}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
        
        <Button onClick={() => {
          toast({
            title: "Report Generated",
            description: `Data updated for ${format(dateRange?.from || new Date(), "MMM yyyy")} to ${format(dateRange?.to || new Date(), "MMM yyyy")}`,
          });
        }}>
          Generate Report
        </Button>
      </div>
      
      <Tabs defaultValue="dashboard" className="space-y-8" {...voiceProps}>
        <TabsList className="grid grid-cols-1 md:grid-cols-4 w-full md:w-auto">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="hiring">Hiring Process</TabsTrigger>
          <TabsTrigger value="diversity">Diversity</TabsTrigger>
          <TabsTrigger value="custom">Custom Reports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard">
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
                <div className="h-[300px] flex items-center justify-center border rounded-md">
                  <p className="text-gray-500">Application Rate Chart</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Time in Stage</CardTitle>
                <CardDescription>Average days spent in each hiring stage</CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="h-[300px] flex items-center justify-center border rounded-md">
                  <p className="text-gray-500">Time in Stage Chart</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Offer Acceptance Rate</CardTitle>
                <CardDescription>Percentage of offers accepted by candidates</CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="h-[300px] flex items-center justify-center border rounded-md">
                  <p className="text-gray-500">Offer Acceptance Chart</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="diversity">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Diversity Initiatives Impact</CardTitle>
                <CardDescription>Track progress of diversity initiatives</CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="h-[300px] flex items-center justify-center border rounded-md">
                  <p className="text-gray-500">Diversity Initiatives Chart</p>
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
                <CardDescription>Create and save custom reports</CardDescription>
              </CardHeader>
              <CardContent className="py-6">
                <div className="flex flex-col items-center justify-center py-8">
                  <p className="text-gray-500 mb-4">Custom report builder coming soon!</p>
                  <Button variant="outline" onClick={() => {
                    toast({
                      title: "Coming Soon",
                      description: "Custom report building functionality will be available in the next update."
                    });
                  }}>Request Early Access</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}
