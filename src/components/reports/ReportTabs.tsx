
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import ReportsCharts from "@/components/reports/ReportsCharts";

const ReportTabs = () => {
  const { toast } = useToast();
  
  return (
    <Tabs defaultValue="dashboard" className="space-y-8">
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
  );
};

export default ReportTabs;
