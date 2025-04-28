
import { useState, useEffect } from "react";
import { useVoiceTrigger } from "@/hooks/useVoiceTrigger";
import { mockDataService } from "@/data/mockData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AnalyticsDashboard from "@/components/dashboard/AnalyticsDashboard";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalCandidates: 0,
    activeJobs: 0,
    scheduledInterviews: 0
  });

  useEffect(() => {
    // In a real app, we would fetch from an API
    const candidates = mockDataService.getAllCandidates();
    const jobs = mockDataService.getAllJobs();
    
    setStats({
      totalCandidates: candidates.length,
      activeJobs: jobs.length,
      scheduledInterviews: candidates.reduce((acc, candidate) => {
        return acc + (candidate.interviews ? candidate.interviews.length : 0);
      }, 0)
    });
  }, []);

  const { voiceProps: dashboardProps } = useVoiceTrigger({
    what: "Welcome to your ATS dashboard. Here you can see a summary of your recruitment activities, including key metrics and analytics to help you optimize your hiring process."
  });

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-600">Welcome to your recruitment dashboard</p>
        </div>
      </div>

      <div className="space-y-6" {...dashboardProps}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Total Candidates</CardTitle>
              <CardDescription>All applicants in the system</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{stats.totalCandidates}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Active Jobs</CardTitle>
              <CardDescription>Currently open positions</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{stats.activeJobs}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Scheduled Interviews</CardTitle>
              <CardDescription>Upcoming interviews</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{stats.scheduledInterviews}</p>
            </CardContent>
          </Card>
        </div>
        
        <AnalyticsDashboard />
      </div>
    </>
  );
};

export default Dashboard;
