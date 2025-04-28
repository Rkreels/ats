
import { useVoiceTrigger } from "@/hooks/useVoiceTrigger";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { mockDataService } from "@/data/mockData";
import { TimeToHireData, DiversityData } from "@/types";
import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Sector
} from "recharts";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const COLORS = [
  "#3B82F6", // blue-500
  "#10B981", // emerald-500
  "#8B5CF6", // violet-500
  "#EC4899", // pink-500
  "#F59E0B", // amber-500
  "#6366F1", // indigo-500
  "#EF4444", // red-500
  "#14B8A6", // teal-500
  "#F97316", // orange-500
  "#06B6D4", // cyan-500
];

interface CustomPieChartProps {
  data: Array<{
    name: string;
    value: number;
  }>;
  title: string;
  description: string;
  voiceDescription: string;
}

interface CustomBarChartProps {
  data: TimeToHireData[];
  title: string;
  description: string;
  voiceDescription: string;
}

export default function ReportsCharts() {
  const [timeToHireData, setTimeToHireData] = useState<TimeToHireData[]>([]);
  const [diversityData, setDiversityData] = useState<DiversityData | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchData = () => {
      try {
        const timeData = mockDataService.getTimeToHireData();
        const divData = mockDataService.getDiversityData();
        
        setTimeToHireData(timeData);
        setDiversityData(divData);
      } catch (error) {
        console.error("Error fetching mock data:", error);
      }
    };

    fetchData();
  }, []);
  
  const { voiceProps: overviewProps } = useVoiceTrigger({
    what: "This is your recruiting analytics dashboard showing key metrics like time to hire, diversity statistics, and recruitment sources. Use these insights to improve your hiring process."
  });

  const renderActiveShape = (props: any) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';
  
    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill} className="text-sm">
          {payload.name}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333" className="text-xs">
          {`${value} (${(percent * 100).toFixed(0)}%)`}
        </text>
      </g>
    );
  };
  
  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  if (!diversityData) {
    return <div>Loading analytics data...</div>;
  }

  const formatGenderData = () => {
    return Object.entries(diversityData.gender).map(([name, value]) => ({
      name,
      value
    }));
  };

  const formatEthnicityData = () => {
    return Object.entries(diversityData.ethnicity).map(([name, value]) => ({
      name,
      value
    }));
  };

  const formatHiringSourceData = () => {
    return Object.entries(diversityData.hiringSource).map(([name, value]) => ({
      name,
      value
    }));
  };

  return (
    <div className="space-y-6" {...overviewProps}>
      <CustomBarChart 
        data={timeToHireData} 
        title="Time to Hire by Department"
        description="Average days to fill positions across departments in the last 6 months"
        voiceDescription="This chart shows how long it takes to fill positions in different departments. Engineering positions typically take the longest to fill, while sales positions are filled more quickly."
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <CustomPieChart 
          data={formatGenderData()} 
          title="Gender Diversity"
          description="Candidate applications by gender"
          voiceDescription="This chart shows the gender diversity of your candidate pool. You can use this data to track diversity initiatives within your recruitment process."
        />
        
        <CustomPieChart 
          data={formatEthnicityData()} 
          title="Ethnic Diversity"
          description="Candidate applications by ethnicity"
          voiceDescription="This chart shows the ethnic diversity of your candidate pool. You can use this data to track diversity initiatives within your recruitment process."
        />
        
        <CustomPieChart 
          data={formatHiringSourceData()} 
          title="Hiring Sources"
          description="Where candidates are coming from"
          voiceDescription="This chart shows which sources are providing the most candidates for your open positions. LinkedIn and job boards are the biggest sources of candidates."
        />
      </div>
    </div>
  );
}

const CustomBarChart = ({ data, title, description, voiceDescription }: CustomBarChartProps) => {
  const { voiceProps } = useVoiceTrigger({
    what: voiceDescription
  });
  
  return (
    <Card {...voiceProps}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="pt-2">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis label={{ value: 'Days', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="Engineering" fill="#3B82F6" />
            <Bar dataKey="Product" fill="#10B981" />
            <Bar dataKey="Marketing" fill="#8B5CF6" />
            <Bar dataKey="Sales" fill="#EC4899" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

const CustomPieChart = ({ data, title, description, voiceDescription }: CustomPieChartProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { voiceProps } = useVoiceTrigger({
    what: voiceDescription
  });
  
  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  return (
    <Card {...voiceProps}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="pt-2">
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              onMouseEnter={onPieEnter}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="flex flex-wrap justify-center gap-2 mt-4">
          {data.map((entry, index) => (
            <div key={`legend-${index}`} className="flex items-center">
              <div 
                className="w-3 h-3 mr-1 rounded-full" 
                style={{ backgroundColor: COLORS[index % COLORS.length] }} 
              />
              <span className="text-xs">{entry.name}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
