import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { mockDataService } from "@/data/mockData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AnalyticsDashboard from "@/components/dashboard/AnalyticsDashboard";
import QuickActions from "@/components/dashboard/QuickActions";
import RecruitmentMetrics from "@/components/analytics/RecruitmentMetrics";
import NotificationCenter from "@/components/notifications/NotificationCenter";
import VoiceTutorialListener from "@/components/voice/VoiceTutorialListener";

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalCandidates: 0,
    activeJobs: 0,
    scheduledInterviews: 0
  });

  useEffect(() => {
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

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-600">Welcome to your recruitment dashboard</p>
        </div>
      </div>
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <VoiceTutorialListener
            selector="dashboard-total-candidates"
            description="This card shows the total number of candidates in your recruitment system."
            actionStep="Click to view all candidates in the system."
          >
            <Card 
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => navigate('/candidates')}
            >
              <CardHeader className="pb-2">
                <CardTitle>Total Candidates</CardTitle>
                <CardDescription>All applicants in the system</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{stats.totalCandidates}</p>
              </CardContent>
            </Card>
          </VoiceTutorialListener>
          <VoiceTutorialListener
            selector="dashboard-active-jobs"
            description="This card displays the number of active job postings."
            actionStep="Click to view and manage all job postings."
          >
            <Card 
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => navigate('/jobs')}
            >
              <CardHeader className="pb-2">
                <CardTitle>Active Jobs</CardTitle>
                <CardDescription>Currently open positions</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{stats.activeJobs}</p>
              </CardContent>
            </Card>
          </VoiceTutorialListener>
          <VoiceTutorialListener
            selector="dashboard-scheduled-interviews"
            description="Displays all upcoming interviews across all jobs and candidates."
            actionStep="Click to view and manage all scheduled interviews."
          >
            <Card 
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => navigate('/interviews')}
            >
              <CardHeader className="pb-2">
                <CardTitle>Scheduled Interviews</CardTitle>
                <CardDescription>Upcoming interviews</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{stats.scheduledInterviews}</p>
              </CardContent>
            </Card>
          </VoiceTutorialListener>
        </div>
        
        {/* Quick Actions */}
        <QuickActions />
        
        {/* Recruitment Metrics */}
        <RecruitmentMetrics />
        
        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Analytics Dashboard */}
          <VoiceTutorialListener
            selector="dashboard-analytics-main"
            description="This section provides visual reports, trends, and analytics of your entire hiring process."
            actionStep="Use charts to analyze trends. Hover for segment-specific guidance."
          >
            <AnalyticsDashboard />
          </VoiceTutorialListener>
          
          {/* Notifications */}
          <NotificationCenter />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
