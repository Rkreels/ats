
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Home, Users, Briefcase, CalendarDays, BarChart, Settings, LogOut, FileText } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { useToast } from "@/hooks/use-toast";
import { useVoiceTrigger } from "@/hooks/useVoiceTrigger";
import VoiceTutorialListener from "@/components/voice/VoiceTutorialListener";

export default function AppSidebar() {
  const location = useLocation();
  const { user } = useUser();
  const { toast } = useToast();
  
  const { voiceProps: sidebarVoiceProps } = useVoiceTrigger({
    what: "This is the main navigation sidebar for the ATS system. It contains links to all major sections.",
    actionStep: "Click on the different icons to navigate between sections."
  });
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const navItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: Home,
      voice: "Navigate to the Dashboard to see an overview of your recruitment metrics."
    },
    {
      name: "Candidates",
      path: "/candidates",
      icon: Users,
      voice: "View and manage your candidate pipeline in the Candidates section."
    },
    {
      name: "Jobs",
      path: "/jobs",
      icon: Briefcase,
      voice: "Manage job postings and descriptions in the Jobs section."
    },
    {
      name: "Interviews",
      path: "/interviews",
      icon: CalendarDays,
      voice: "Schedule and manage interviews with candidates in this section."
    },
    {
      name: "Onboarding",
      path: "/onboarding",
      icon: FileText,
      voice: "Manage the onboarding process for new hires in this section."
    },
    {
      name: "Reports",
      path: "/reports",
      icon: BarChart,
      voice: "Access analytics and reports about your recruitment process here."
    }
  ];
  
  return (
    <aside className="w-64 fixed inset-y-0 left-0 bg-white border-r border-gray-200 z-10" {...sidebarVoiceProps}>
      <div className="flex flex-col h-full">
        <div className="p-6">
          <h1 className="text-xl font-bold text-gray-900">TalentTrack ATS</h1>
        </div>
        
        <nav className="flex-1 px-4 mt-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <VoiceTutorialListener
                key={item.path}
                selector={`${item.name.toLowerCase()}-nav-item`}
                description={`${item.name} navigation item.`}
                actionStep={item.voice}
              >
                <li>
                  <Link
                    to={item.path}
                    className={cn(
                      "flex items-center px-4 py-3 text-gray-700 rounded-md",
                      "transition-colors duration-200",
                      "hover:bg-gray-100",
                      isActive(item.path) && "bg-gray-100 font-medium text-gray-900"
                    )}
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              </VoiceTutorialListener>
            ))}
          </ul>
        </nav>
        
        <div className="p-4 border-t">
          <VoiceTutorialListener
            selector="settings-nav-item"
            description="Settings navigation item."
            actionStep="Click to configure your ATS system preferences and settings."
          >
            <Link
              to="/settings"
              className={cn(
                "flex items-center px-4 py-3 text-gray-700 rounded-md",
                "transition-colors duration-200 hover:bg-gray-100",
                isActive("/settings") && "bg-gray-100 font-medium text-gray-900"
              )}
            >
              <Settings className="h-5 w-5 mr-3" />
              <span>Settings</span>
            </Link>
          </VoiceTutorialListener>
          
          <VoiceTutorialListener
            selector="user-profile-item"
            description="User profile area."
            actionStep="Access your profile and logout options here."
          >
            <div className="flex items-center mt-6">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-medium">
                  {user?.name?.charAt(0) || "U"}
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">{user?.name || "User"}</p>
                <p className="text-xs text-gray-500">{user?.role || "Admin"}</p>
              </div>
              <button 
                className="ml-auto p-2 text-gray-500 hover:text-gray-700"
                onClick={() => {
                  toast({
                    title: "Logged Out",
                    description: "You have been successfully logged out."
                  });
                }}
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </VoiceTutorialListener>
        </div>
      </div>
    </aside>
  );
}
