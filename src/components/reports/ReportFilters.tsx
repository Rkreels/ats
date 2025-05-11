
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format, subMonths } from "date-fns";
import { DateRange } from "react-day-picker";
import { useToast } from "@/hooks/use-toast";

interface ReportFiltersProps {
  onGenerateReport: (reportType: string, dateRange: DateRange | undefined) => void;
}

const ReportFilters = ({ onGenerateReport }: ReportFiltersProps) => {
  const { toast } = useToast();
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subMonths(new Date(), 6),
    to: new Date(),
  });
  const [reportType, setReportType] = useState<string>("overview");
  
  const handleGenerateReport = () => {
    if (!dateRange?.from || !dateRange?.to) {
      toast({
        title: "Missing date range",
        description: "Please select a date range for the report",
        variant: "destructive"
      });
      return;
    }
    
    onGenerateReport(reportType, dateRange);
    
    toast({
      title: "Report Generated",
      description: `Data updated for ${format(dateRange.from, "MMM yyyy")} to ${format(dateRange.to, "MMM yyyy")}`,
    });
  };
  
  return (
    <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-6">
      <Select value={reportType} onValueChange={setReportType}>
        <SelectTrigger className="w-full sm:w-[180px]">
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
            className={"w-full sm:w-[280px] justify-start text-left font-normal"}
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
      
      <Button onClick={handleGenerateReport} className="w-full sm:w-auto">
        Generate Report
      </Button>
    </div>
  );
};

export default ReportFilters;
