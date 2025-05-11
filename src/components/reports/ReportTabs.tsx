
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
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

const ReportTabs = ({ activeTab = "dashboard" }: ReportTabsProps) => {
  const { toast } = useToast();
  const [currentTab, setCurrentTab] = useState(activeTab);
  
  useEffect(() => {
    setCurrentTab(activeTab);
  }, [activeTab]);

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
