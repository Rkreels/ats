
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Home, Users, Briefcase, CalendarDays, BarChart, Settings, LogOut, FileText } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { useToast } from "@/hooks/use-toast";
import VoiceTutorialListener from "@/components/voice/VoiceTutorialListener";

export default function AppSidebar() {
  const location = useLocation();
  const { currentUser } = useUser();
  const { toast } = useToast();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: Home,
      description: "See a high-level overview of all ATS activities and stats on the Dashboard.",
      actionStep: "Click here to access your dashboard and view company stats."
    },
    {
      name: "Candidates",
      path: "/candidates",
      icon: Users,
      description: "Manage and review candidates, including adding, editing, and deleting profiles.",
      actionStep: "Click here to view all candidate profiles and manage your talent pipeline."
    },
    {
      name: "Jobs",
      path: "/jobs",
      icon: Briefcase,
      description: "View, add, edit, and manage job postings.",
      actionStep: "Click to create new jobs or review current roles."
    },
    {
      name: "Interviews",
      path: "/interviews",
      icon: CalendarDays,
      description: "Schedule, edit, and track interviews for candidates.",
      actionStep: "Click to see scheduled interviews, reschedule, or create new."
    },
    {
      name: "Onboarding",
      path: "/onboarding",
      icon: FileText,
      description: "Track onboarding steps and documents for new hires.",
      actionStep: "Manage onboarding tasks or add new employee tasks."
    },
    {
      name: "Reports",
      path: "/reports",
      icon: BarChart,
      description: "Analyze recruitment performance, generate reports, and review insights.",
      actionStep: "Click to generate reports or view analytics."
    }
  ];

  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-200 z-10 overflow-y-auto">
      <div className="flex flex-col h-full">
        <div className="p-6">
          <h1 className="text-xl font-bold text-gray-900">TalentTrack ATS</h1>
        </div>
        <nav className="flex-1 px-4 mt-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <VoiceTutorialListener
                  selector={`sidebar-link-${item.name.toLowerCase()}`}
                  description={item.description}
                  actionStep={item.actionStep}
                >
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
                </VoiceTutorialListener>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4 border-t">
          <VoiceTutorialListener
            selector="settings-link"
            description="Go to application settings to configure system options, voice assistant preferences, and integrations."
            actionStep="Click to view or edit ATS settings."
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
          <div className="flex items-center mt-6">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-medium">
                {currentUser?.name?.charAt(0) || "U"}
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">{currentUser?.name || "User"}</p>
              <p className="text-xs text-gray-500">{currentUser?.role || "Admin"}</p>
            </div>
            <VoiceTutorialListener
              selector="logout-button"
              description="Click here to log out of your account securely."
              actionStep="Press to confirm logging out."
            >
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
            </VoiceTutorialListener>
          </div>
        </div>
      </div>
    </aside>
  );
}
