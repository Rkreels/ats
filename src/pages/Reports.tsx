
import { useUser } from "@/contexts/UserContext";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import ReportFilters from "@/components/reports/ReportFilters";
import ReportTabs from "@/components/reports/ReportTabs";

export default function Reports() {
  const { toast } = useToast();
  const { hasPermission } = useUser();
  
  if (!hasPermission('canViewReports')) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Access Restricted</h2>
        <p className="text-gray-600 mb-8">You don't have permission to view reports.</p>
        <Button variant="outline" onClick={() => {
          toast({
            title: "Need Access?",
            description: "Contact your administrator to request access to reporting features."
          });
        }}>Request Access</Button>
      </div>
    );
  }
  
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Analytics & Reports</h1>
          <p className="text-gray-600">Track and analyze your recruitment process metrics</p>
        </div>
      </div>
      
      <ReportFilters onGenerateReport={() => {}} />
      <ReportTabs />
    </>
  );
}
