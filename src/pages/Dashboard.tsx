
import { useVoiceTrigger } from "@/hooks/useVoiceTrigger";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend } from "recharts";
import { ArrowUpRight, ArrowDownRight, Users, Briefcase, Calendar, Clock } from "lucide-react";
import { mockDataService } from "@/data/mockData";

const COLORS = ['#4cc9f0', '#4361ee', '#3a0ca3', '#7209b7', '#f72585', '#4bb543'];

export default function Dashboard() {
  // Get mock data
  const timeToHireData = mockDataService.getTimeToHireData();
  const diversityData = mockDataService.getDiversityData();
  
  // Convert diversity data for pie chart
  const genderData = Object.entries(diversityData.gender).map(([name, value]) => ({ name, value }));
  const ethnicityData = Object.entries(diversityData.ethnicity).map(([name, value]) => ({ name, value }));
  const sourceData = Object.entries(diversityData.hiringSource).map(([name, value]) => ({ name, value }));
  
  // Voice tutorials
  const { voiceProps: overviewVoiceProps } = useVoiceTrigger({
    what: "This is your recruitment dashboard showing key metrics like active jobs, candidates in pipeline, and upcoming interviews.",
    how: "Review these numbers daily to understand your recruitment funnel activity at a glance."
  });
  
  const { voiceProps: timeChartVoiceProps } = useVoiceTrigger({
    what: "This chart shows average time-to-hire in days across different departments over time.",
    how: "Use this chart to identify which departments are taking longer to fill positions and potentially need process improvements.",
    decision: "Engineering hiring is taking 10 days longer this month than last. Consider reviewing the technical interview process for bottlenecks."
  });
  
  const { voiceProps: diversityVoiceProps } = useVoiceTrigger({
    what: "These charts show the diversity breakdown of your candidate pipeline by gender and ethnicity.",
    how: "Track these metrics to ensure your recruiting efforts are reaching diverse candidate pools.",
    decision: "Your gender diversity ratio shows a 60/40 male-to-female split. Consider diversifying job boards or using inclusive language in job descriptions."
  });
  
  // Count candidates by status
  const candidates = mockDataService.getAllCandidates();
  const candidatesByStatus = {
    Applied: candidates.filter(c => c.status === 'Applied').length,
    Screen: candidates.filter(c => c.status === 'Screen').length,
    Interview: candidates.filter(c => c.status === 'Interview').length,
    Offer: candidates.filter(c => c.status === 'Offer').length,
    Hired: candidates.filter(c => c.status === 'Hired').length,
  };
  
  // Count jobs by status
  const jobs = mockDataService.getAllJobs();
  const activeJobs = jobs.filter(j => j.status === 'Published').length;
  
  // Count upcoming interviews
  const upcomingInterviews = candidates
    .flatMap(c => c.interviews || [])
    .filter(i => i.status === 'Scheduled')
    .length;
  
  // Calculate time-to-hire
  const avgTimeToHire = 32; // Let's pretend we calculated this
  
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Recruitment Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your hiring pipeline.</p>
        </div>
        <div>
          <button 
            className="bg-ats-primary text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors"
            onClick={() => mockDataService.generateMoreCandidates(5)}
          >
            Generate More Candidates
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8" {...overviewVoiceProps}>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Active Jobs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Briefcase className="text-ats-primary" />
                <span className="text-2xl font-bold">{activeJobs}</span>
              </div>
              <div className="flex items-center text-green-500 text-sm">
                <ArrowUpRight size={16} />
                <span>12%</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">vs previous month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Candidates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Users className="text-ats-info" />
                <span className="text-2xl font-bold">{candidates.length}</span>
              </div>
              <div className="flex items-center text-green-500 text-sm">
                <ArrowUpRight size={16} />
                <span>8%</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">vs previous month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Upcoming Interviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Calendar className="text-ats-warning" />
                <span className="text-2xl font-bold">{upcomingInterviews}</span>
              </div>
              <div className="flex items-center text-red-500 text-sm">
                <ArrowDownRight size={16} />
                <span>3%</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">vs previous month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Avg. Time to Hire</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Clock className="text-ats-danger" />
                <span className="text-2xl font-bold">{avgTimeToHire} days</span>
              </div>
              <div className="flex items-center text-green-500 text-sm">
                <ArrowUpRight size={16} />
                <span>5%</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">vs previous month</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <Card className="lg:col-span-2" {...timeChartVoiceProps}>
          <CardHeader>
            <CardTitle>Time to Hire by Department</CardTitle>
            <CardDescription>Average days from application to hire</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={timeToHireData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="Engineering" stroke="#4cc9f0" strokeWidth={2} />
                  <Line type="monotone" dataKey="Product" stroke="#4361ee" strokeWidth={2} />
                  <Line type="monotone" dataKey="Marketing" stroke="#3a0ca3" strokeWidth={2} />
                  <Line type="monotone" dataKey="Sales" stroke="#7209b7" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="lg:row-span-2" {...diversityVoiceProps}>
          <CardHeader>
            <CardTitle>Diversity Metrics</CardTitle>
            <CardDescription>Candidate pipeline demographics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="font-medium mb-2 text-sm text-gray-600">Gender Distribution</h4>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={genderData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {genderData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2 text-sm text-gray-600">Ethnicity Distribution</h4>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={ethnicityData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {ethnicityData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend layout="vertical" align="right" verticalAlign="middle" />
                    <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Candidates by Stage</CardTitle>
            <CardDescription>Current pipeline distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={Object.entries(candidatesByStatus).map(([name, value]) => ({ name, value }))}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#4361ee">
                    {Object.entries(candidatesByStatus).map(([name, _], index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Hiring Sources</CardTitle>
            <CardDescription>Where candidates are coming from</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sourceData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {sourceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates in your hiring pipeline</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {[...candidates]
                .sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
                .slice(0, 5)
                .map(candidate => (
                <li key={candidate.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-md">
                  <div className="w-10 h-10 rounded-full flex-shrink-0 overflow-hidden">
                    <img src={candidate.avatar} alt={candidate.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{candidate.name}</p>
                    <p className="text-sm text-gray-600">Moved to <span className="font-medium">{candidate.status}</span> stage</p>
                    <p className="text-xs text-gray-500">{candidate.lastUpdated}</p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
