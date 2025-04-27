
import { useState } from "react";
import { useVoiceTrigger } from "@/hooks/useVoiceTrigger";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockDataService } from "@/data/mockData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { Download, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

const COLORS = ['#4cc9f0', '#4361ee', '#3a0ca3', '#7209b7', '#f72585', '#4bb543', '#f9c74f', '#90dbf4'];

export default function Reports() {
  // Get mock data
  const timeToHireData = mockDataService.getTimeToHireData();
  const diversityData = mockDataService.getDiversityData();
  
  // Convert diversity data for charts
  const genderData = Object.entries(diversityData.gender).map(([name, value]) => ({ name, value }));
  const ethnicityData = Object.entries(diversityData.ethnicity).map(([name, value]) => ({ name, value }));
  const hiringSourceData = Object.entries(diversityData.hiringSource).map(([name, value]) => ({ name, value }));
  
  // Voice tutorials
  const { voiceProps: metricsVoiceProps } = useVoiceTrigger({
    what: "This is the analytics dashboard showing key recruitment metrics and diversity statistics.",
    how: "Use these charts to track hiring trends, identify bottlenecks in your recruitment process, and assess diversity initiatives.",
    decision: "Your time-to-hire has increased by 15% in Engineering. Consider simplifying the technical assessment to reduce candidate drop-off."
  });
  
  const { voiceProps: timeToHireVoiceProps } = useVoiceTrigger({
    what: "This chart shows how long it takes to fill positions across different departments over time.",
    how: "Look for spikes in the chart that might indicate process issues or hiring freezes."
  });
  
  const { voiceProps: diversityVoiceProps } = useVoiceTrigger({
    what: "These charts show the demographic breakdown of your candidate pool.",
    how: "Use these metrics to ensure your recruiting efforts are reaching diverse candidates.",
    decision: "Your ethnic diversity shows improvement, but gender balance remains unchanged. Consider targeted outreach to women in tech organizations."
  });
  
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Analytics & Reports</h1>
          <p className="text-gray-600">Track recruitment metrics and hiring performance</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="metrics" className="space-y-8">
        <TabsList>
          <TabsTrigger value="metrics">Recruitment Metrics</TabsTrigger>
          <TabsTrigger value="diversity">Diversity & Inclusion</TabsTrigger>
          <TabsTrigger value="sources">Source Effectiveness</TabsTrigger>
        </TabsList>
        
        <TabsContent value="metrics" {...metricsVoiceProps}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <MetricCard 
              title="Avg. Time to Hire"
              value="32 days"
              change="+5%"
              isPositive={false}
              description="vs. last quarter"
            />
            <MetricCard 
              title="Cost per Hire"
              value="$4,250"
              change="-8%"
              isPositive={true}
              description="vs. last quarter"
            />
            <MetricCard 
              title="Offer Acceptance"
              value="78%"
              change="+12%"
              isPositive={true}
              description="vs. last quarter"
            />
            <MetricCard 
              title="Interview to Hire"
              value="14%"
              change="-2%"
              isPositive={false}
              description="vs. last quarter"
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card {...timeToHireVoiceProps}>
              <CardHeader>
                <CardTitle>Time to Hire by Department</CardTitle>
                <CardDescription>Average days from job posting to offer acceptance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
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
            
            <Card>
              <CardHeader>
                <CardTitle>Pipeline Conversion Rates</CardTitle>
                <CardDescription>Percentage of candidates moving between stages</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { name: 'Applied → Screen', rate: 45 },
                        { name: 'Screen → Interview', rate: 62 },
                        { name: 'Interview → Offer', rate: 38 },
                        { name: 'Offer → Hired', rate: 78 },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis unit="%" />
                      <Tooltip formatter={(value) => [`${value}%`, 'Conversion Rate']} />
                      <Bar dataKey="rate" fill="#4361ee">
                        {[
                          { name: 'Applied → Screen', rate: 45 },
                          { name: 'Screen → Interview', rate: 62 },
                          { name: 'Interview → Offer', rate: 38 },
                          { name: 'Offer → Hired', rate: 78 },
                        ].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Applications by Department</CardTitle>
              <CardDescription>Number of applications received per department</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { name: 'Engineering', applications: 234, positions: 8 },
                      { name: 'Product', applications: 156, positions: 5 },
                      { name: 'Marketing', applications: 128, positions: 4 },
                      { name: 'Sales', applications: 175, positions: 6 },
                      { name: 'Design', applications: 98, positions: 3 },
                      { name: 'Customer Support', applications: 142, positions: 7 },
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar name="Applications" dataKey="applications" fill="#4361ee" />
                    <Bar name="Open Positions" dataKey="positions" fill="#f72585" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="diversity" {...diversityVoiceProps}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Gender Distribution</CardTitle>
                <CardDescription>Candidates by gender identity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={genderData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={120}
                        fill="#8884d8"
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
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Ethnicity Distribution</CardTitle>
                <CardDescription>Candidates by ethnic background</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={ethnicityData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {ethnicityData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Diversity Over Time</CardTitle>
                <CardDescription>Gender diversity trend by quarter</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={[
                        { quarter: 'Q1 2024', male: 58, female: 35, nonbinary: 7 },
                        { quarter: 'Q2 2024', male: 55, female: 38, nonbinary: 7 },
                        { quarter: 'Q3 2024', male: 52, female: 40, nonbinary: 8 },
                        { quarter: 'Q4 2024', male: 48, female: 42, nonbinary: 10 },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="quarter" />
                      <YAxis unit="%" />
                      <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                      <Legend />
                      <Line type="monotone" name="Male" dataKey="male" stroke="#4361ee" strokeWidth={2} />
                      <Line type="monotone" name="Female" dataKey="female" stroke="#f72585" strokeWidth={2} />
                      <Line type="monotone" name="Non-binary" dataKey="nonbinary" stroke="#4cc9f0" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Additional Demographics</CardTitle>
                <CardDescription>Veteran and disability status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-2">Veteran Status</h4>
                    <div className="h-32">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={[
                            { name: 'Veteran', value: diversityData.veteranStatus.Veteran },
                            { name: 'Non-veteran', value: diversityData.veteranStatus['Non-veteran'] },
                          ]}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis unit="%" />
                          <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                          <Bar dataKey="value" fill="#3a0ca3" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Disability Status</h4>
                    <div className="h-32">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={[
                            { name: 'Person with disability', value: diversityData.disabilityStatus['Person with disability'] },
                            { name: 'No disability', value: diversityData.disabilityStatus['No disability'] },
                          ]}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis unit="%" />
                          <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                          <Bar dataKey="value" fill="#7209b7" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="sources">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Candidate Sources</CardTitle>
                <CardDescription>Where candidates are coming from</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={hiringSourceData}
                      layout="vertical"
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" unit="%" />
                      <YAxis type="category" dataKey="name" width={100} />
                      <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                      <Bar dataKey="value" fill="#4361ee">
                        {hiringSourceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Source Quality</CardTitle>
                <CardDescription>Percentage of candidates that reach offer stage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { name: 'LinkedIn', rate: 22 },
                        { name: 'Indeed', rate: 15 },
                        { name: 'Referral', rate: 38 },
                        { name: 'Company Website', rate: 18 },
                        { name: 'GitHub', rate: 28 },
                        { name: 'Other', rate: 12 },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis unit="%" />
                      <Tooltip formatter={(value) => [`${value}%`, 'Conversion to Offer']} />
                      <Bar dataKey="rate" fill="#4cc9f0">
                        {[
                          { name: 'LinkedIn', rate: 22 },
                          { name: 'Indeed', rate: 15 },
                          { name: 'Referral', rate: 38 },
                          { name: 'Company Website', rate: 18 },
                          { name: 'GitHub', rate: 28 },
                          { name: 'Other', rate: 12 },
                        ].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Cost per Hire by Source</CardTitle>
              <CardDescription>Average cost to hire a candidate from each source</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { name: 'LinkedIn', cost: 4820 },
                      { name: 'Indeed', cost: 3250 },
                      { name: 'Referral', cost: 2100 },
                      { name: 'Company Website', cost: 1850 },
                      { name: 'GitHub', cost: 3950 },
                      { name: 'Other', cost: 4350 },
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Cost per Hire']} />
                    <Bar dataKey="cost" fill="#3a0ca3">
                      {[
                        { name: 'LinkedIn', cost: 4820 },
                        {name: 'Indeed', cost: 3250 },
                        { name: 'Referral', cost: 2100 },
                        { name: 'Company Website', cost: 1850 },
                        { name: 'GitHub', cost: 3950 },
                        { name: 'Other', cost: 4350 },
                      ].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}

// Metric Card Component
interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  description: string;
}

function MetricCard({ title, value, change, isPositive, description }: MetricCardProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-2">
          <p className="text-gray-500 text-sm">{title}</p>
          <div className={`flex items-center text-xs ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
            <span>{change}</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 20 20" 
              fill="currentColor" 
              className="w-4 h-4 ml-1" 
              style={{ transform: isPositive ? 'none' : 'rotate(180deg)' }}
            >
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        <h3 className="text-2xl font-bold">{value}</h3>
        <p className="text-xs text-gray-500 mt-2">{description}</p>
      </CardContent>
    </Card>
  );
}
