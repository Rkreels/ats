import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, Sector } from 'recharts';

// This function renders the active shape for pie charts
const renderActiveShape = (props) => {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value
  } = props;

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill} className="text-sm font-medium">
        {payload.name}: {value}
      </text>
      <text x={cx} y={cy + 20} dy={8} textAnchor="middle" fill="#999" className="text-xs">
        {`${(percent * 100).toFixed(2)}%`}
      </text>
      <path
        d={`M${cx},${cy}L${cx + outerRadius},${cy}`}
        stroke={fill}
        fill="none"
      />
    </g>
  );
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const applicationData = [
  { name: 'Applied', value: 400 },
  { name: 'Screen', value: 300 },
  { name: 'Interview', value: 300 },
  { name: 'Offer', value: 200 },
  { name: 'Hired', value: 278 },
  { name: 'Rejected', value: 189 },
];

const sourceData = [
  { name: 'LinkedIn', value: 400 },
  { name: 'Indeed', value: 300 },
  { name: 'Company Website', value: 300 },
  { name: 'Referral', value: 200 },
  { name: 'Other', value: 278 },
];

const hiringData = [
  { name: 'January', value: 20 },
  { name: 'February', value: 30 },
  { name: 'March', value: 40 },
  { name: 'April', value: 25 },
  { name: 'May', value: 35 },
  { name: 'June', value: 45 },
];

const ReportsCharts = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Application Status */}
      <Card>
        <CardHeader>
          <CardTitle>Application Status</CardTitle>
          <CardDescription>Current status of all applications</CardDescription>
        </CardHeader>
        <CardContent className="pt-2">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={applicationData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderActiveShape}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {applicationData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Candidate Source */}
      <Card>
        <CardHeader>
          <CardTitle>Candidate Source</CardTitle>
          <CardDescription>Where candidates are applying from</CardDescription>
        </CardHeader>
        <CardContent className="pt-2">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={sourceData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderActiveShape}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {sourceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Monthly Hires */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Hires</CardTitle>
          <CardDescription>Number of candidates hired each month</CardDescription>
        </CardHeader>
        <CardContent className="pt-2">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={hiringData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderActiveShape}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {hiringData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsCharts;
