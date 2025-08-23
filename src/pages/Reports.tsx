import { useState } from "react";
import { useUser } from "@/contexts/UserContext";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import ReportFilters from "@/components/reports/ReportFilters";
import ReportTabs from "@/components/reports/ReportTabs";
import { DateRange } from "react-day-picker";
import { useVoiceTrigger } from "@/hooks/useVoiceTrigger";
import EnhancedVoiceTutorialListener from "@/components/voice/EnhancedVoiceTutorialListener";

export default function Reports() {
  const { toast } = useToast();
  const { hasPermission } = useUser();
  const [currentReportType, setCurrentReportType] = useState<string>("overview");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  
  const { voiceProps: reportsPageProps } = useVoiceTrigger({
    what: "Reports and analytics page for recruitment metrics and performance tracking",
    actionStep: "Generate reports, analyze data, or export insights for your recruitment process"
  });

  if (!hasPermission('canViewReports')) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Access Restricted</h2>
        <p className="text-gray-600 mb-8">You don't have permission to view reports.</p>
        <EnhancedVoiceTutorialListener
          selector="report-request-access"
          description="Request access to the reports module"
          actionStep="Only admins can grant report permissions"
          category="action"
          priority="medium"
        >
          <Button variant="outline" onClick={() => {
            toast({
              title: "Need Access?",
              description: "Contact your administrator to request access to reporting features."
            });
          }}>Request Access</Button>
        </EnhancedVoiceTutorialListener>
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
    <div {...reportsPageProps}>
      <EnhancedVoiceTutorialListener
        selector="reports-page-header"
        description="Analytics and reports page header with navigation and overview"
        actionStep="Use filters and tabs to generate and view different types of recruitment reports"
        category="navigation"
        priority="high"
      >
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Analytics & Reports</h1>
            <p className="text-gray-600">Track and analyze your recruitment process metrics</p>
          </div>
        </div>
      </EnhancedVoiceTutorialListener>

      <EnhancedVoiceTutorialListener
        selector="report-filters"
        description="Filter and generate recruitment reports for the selected period and category"
        actionStep="Choose filters and generate a report to analyze data"
        category="form"
        priority="high"
      >
        <ReportFilters onGenerateReport={handleGenerateReport} />
      </EnhancedVoiceTutorialListener>

      {isGenerating ? (
        <EnhancedVoiceTutorialListener
          selector="report-generating-loader"
          description="Report is generating. Please wait for completion"
          category="info"
          priority="medium"
        >
          <div className="flex items-center justify-center p-12">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
            <span className="ml-3">Generating report...</span>
          </div>
        </EnhancedVoiceTutorialListener>
      ) : (
        <EnhancedVoiceTutorialListener
          selector="report-tabs"
          description="Navigate through different analytics and custom reports"
          actionStep="Switch tabs for overview, custom, or other predefined reports"
          category="navigation"
          priority="medium"
        >
          <ReportTabs activeTab={currentReportType} />
        </EnhancedVoiceTutorialListener>
      )}
    </div>
  );
}