import { useState } from "react";
import { useUser } from "@/contexts/UserContext";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import ReportFilters from "@/components/reports/ReportFilters";
import ReportTabs from "@/components/reports/ReportTabs";
import { DateRange } from "react-day-picker";
import VoiceTutorialListener from "@/components/voice/VoiceTutorialListener";

export default function Reports() {
  const { toast } = useToast();
  const { hasPermission } = useUser();
  const [currentReportType, setCurrentReportType] = useState<string>("overview");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  
  if (!hasPermission('canViewReports')) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Access Restricted</h2>
        <p className="text-gray-600 mb-8">You don't have permission to view reports.</p>
        <VoiceTutorialListener
          selector="report-request-access"
          description="Request access to the reports module."
          actionStep="Only admins can grant report permissions."
        >
          <Button variant="outline" onClick={() => {
            toast({
              title: "Need Access?",
              description: "Contact your administrator to request access to reporting features."
            });
          }}>Request Access</Button>
        </VoiceTutorialListener>
      </div>
    );
  }

  const handleGenerateReport = (reportType: string, dateRange: DateRange | undefined) => {
    setIsGenerating(true);
    setCurrentReportType(reportType);
    
    // Simulate report generation with a delay
    setTimeout(() => {
      setIsGenerating(false);
      toast({
        title: "Report Generated",
        description: "The report data has been updated successfully."
      });
    }, 1000);
  };
  
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Analytics & Reports</h1>
          <p className="text-gray-600">Track and analyze your recruitment process metrics</p>
        </div>
      </div>
      <VoiceTutorialListener
        selector="report-filters"
        description="Filter and generate recruitment reports for the selected period and category."
        actionStep="Choose filters and generate a report to analyze data."
      >
        <ReportFilters onGenerateReport={handleGenerateReport} />
      </VoiceTutorialListener>
      {isGenerating ? (
        <div className="flex items-center justify-center p-12">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
          <span className="ml-3">Generating report...</span>
        </div>
      ) : (
        <VoiceTutorialListener
          selector="report-tabs"
          description="Navigate through different analytics and custom reports."
          actionStep="Switch tabs for overview, custom, or other predefined reports."
        >
          <ReportTabs activeTab={currentReportType} />
        </VoiceTutorialListener>
      )}
    </>
  );
}
