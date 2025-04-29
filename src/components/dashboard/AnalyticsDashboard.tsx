
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useVoiceTrigger } from "@/hooks/useVoiceTrigger";
import { Bar, BarChart, Line, LineChart, Pie, PieChart, ResponsiveContainer } from "@/components/ui/chart";
import { mockDataService } from "@/data/mockData";
import { TimeToHireData, DiversityData } from "@/types";
import { useState, useEffect } from "react";

const AnalyticsDashboard = () => {
  const [timeToHireData, setTimeToHireData] = useState<TimeToHireData[]>([]);
  const [diversityData, setDiversityData] = useState<DiversityData | null>(null);
  const [hiringStats, setHiringStats] = useState({
    activeJobs: 0,
    totalCandidates: 0,
    interviewsScheduled: 0,
    offersSent: 0,
  });

  useEffect(() => {
    // In a real app, these would be API calls
    setTimeToHireData(mockDataService.getTimeToHireData());
    setDiversityData(mockDataService.getDiversityData());
    
    const candidates = mockDataService.getAllCandidates();
    const jobs = mockDataService.getAllJobs();
    
    setHiringStats({
      activeJobs: jobs.filter(job => job.status === "Published").length,
      totalCandidates: candidates.length,
      interviewsScheduled: candidates.reduce((acc, curr) => acc + (curr.interviews?.length || 0), 0),
      offersSent: candidates.filter(c => c.status === "Offer").length,
    });
  }, []);

  const { voiceProps: analyticsProps } = useVoiceTrigger({
    what: "This analytics dashboard gives you an overview of your recruiting metrics. You can see time-to-hire trends, diversity statistics, and key hiring metrics to help optimize your recruitment process."
  });

  return (
    <div className="space-y-6" {...analyticsProps}>
      {/* Hiring Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Active Jobs</CardDescription>
            <CardTitle className="text-3xl">{hiringStats.activeJobs}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Candidates</CardDescription>
            <CardTitle className="text-3xl">{hiringStats.totalCandidates}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Interviews Scheduled</CardDescription>
            <CardTitle className="text-3xl">{hiringStats.interviewsScheduled}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Offers Sent</CardDescription>
            <CardTitle className="text-3xl">{hiringStats.offersSent}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Time to hire chart */}
      <Card className="col-span-1 md:col-span-2">
        <CardHeader>
          <CardTitle>Time to Hire by Department</CardTitle>
          <CardDescription>Average days from application to hire</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={timeToHireData}>
              <Bar dataKey="Engineering" fill="rgba(59, 130, 246, 0.8)" />
              <Bar dataKey="Product" fill="rgba(16, 185, 129, 0.8)" />
              <Bar dataKey="Marketing" fill="rgba(250, 204, 21, 0.8)" />
              <Bar dataKey="Sales" fill="rgba(239, 68, 68, 0.8)" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Diversity pie charts */}
        <Card>
          <CardHeader>
            <CardTitle>Gender Distribution</CardTitle>
            <CardDescription>Candidate gender demographics</CardDescription>
          </CardHeader>
          <CardContent>
            {diversityData && (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie 
                    data={[
                      { name: "Male", value: diversityData.gender.Male },
                      { name: "Female", value: diversityData.gender.Female },
                      { name: "Non-binary", value: diversityData.gender["Non-binary"] },
                      { name: "Prefer not to say", value: diversityData.gender["Prefer not to say"] }
                    ]}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Hiring Sources</CardTitle>
            <CardDescription>Where candidates are coming from</CardDescription>
          </CardHeader>
          <CardContent>
            {diversityData && (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie 
                    data={[
                      { name: "LinkedIn", value: diversityData.hiringSource.LinkedIn },
                      { name: "Job Boards", value: diversityData.hiringSource["Job Boards"] },
                      { name: "Company Website", value: diversityData.hiringSource["Company Website"] },
                      { name: "Referrals", value: diversityData.hiringSource.Referrals },
                      { name: "University", value: diversityData.hiringSource["University Recruiting"] },
                      { name: "Other", value: diversityData.hiringSource.Other }
                    ]}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#82ca9d"
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
