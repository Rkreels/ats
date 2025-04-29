
import { Home, Users, Briefcase, Calendar, BarChart2, Settings, Menu, X, Volume2, VolumeX } from "lucide-react";
import { useVoiceTutorial } from "@/contexts/VoiceTutorialContext";
import { useVoiceTrigger } from "@/hooks/useVoiceTrigger";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";
import { Permissions } from "@/contexts/UserContext";
import VoiceTutorialListener from "../voice/VoiceTutorialListener";

const menuItems = [
  {
    label: "Dashboard",
    icon: Home,
    path: "/",
    voiceWhatIs: "This is the dashboard where you can see an overview of recruitment metrics and activity. You can view key metrics like total candidates, active jobs, scheduled interviews, and time-to-hire charts.",
    actionStep: "Click to view your recruitment analytics dashboard.",
    permission: null // everyone can access this
  },
  {
    label: "Candidates",
    icon: Users,
    path: "/candidates",
    voiceWhatIs: "This is the candidate pipeline where you can track applicants through each stage of the hiring process. You can search, filter, and sort candidates and view their details.",
    actionStep: "Click to manage your candidate pipeline.",
    permission: "canViewCandidates" as keyof Permissions
  },
  {
    label: "Jobs",
    icon: Briefcase,
    path: "/jobs",
    voiceWhatIs: "This is the job management section where you post new positions and track job applications. You can create, edit, and archive job postings.",
    actionStep: "Click to manage your job postings and applications.",
    permission: null // everyone can see jobs
  },
  {
    label: "Interviews",
    icon: Calendar,
    path: "/interviews",
    voiceWhatIs: "This is the interview scheduling section where you manage candidate interviews. You can schedule, reschedule, or cancel interviews and add feedback.",
    actionStep: "Click to manage your interview calendar.",
    permission: "canScheduleInterviews" as keyof Permissions
  },
  {
    label: "Reports",
    icon: BarChart2,
    path: "/reports",
    voiceWhatIs: "This is the analytics and reporting section where you track recruitment metrics. You can generate custom reports on hiring efficiency, source effectiveness, and more.",
    actionStep: "Click to view detailed recruitment reports and analytics.",
    permission: "canViewReports" as keyof Permissions
  },
  {
    label: "Settings",
    icon: Settings,
    path: "/settings",
    voiceWhatIs: "This is where you can configure your ATS settings. You can adjust your account preferences, manage users and roles, and customize voice tutorials.",
    actionStep: "Click to customize your ATS settings and preferences.",
    permission: null // everyone can access settings, but will see different options based on permissions
  }
];

export default function AppSidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const { voiceEnabled, toggleVoice } = useVoiceTutorial();
  const { currentUser, hasPermission } = useUser();
  
  const { voiceProps: sidebarVoiceProps } = useVoiceTrigger({
    what: "This is the main navigation menu. Use it to access different sections of your Applicant Tracking System.",
    actionStep: "Click on any menu item to navigate to that section."
  });
  
  return (
    <div className="h-full flex flex-col">
      {/* Sidebar */}
      <aside 
        className="h-full bg-white border-r border-gray-200 shadow-sm w-64 fixed left-0 top-0 bottom-0 z-30"
        {...sidebarVoiceProps}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-primary">
            VoiceATS
          </h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleVoice}
              className="p-2 rounded-full hover:bg-gray-100"
              aria-label={voiceEnabled ? "Disable voice tutorials" : "Enable voice tutorials"}
              title={voiceEnabled ? "Disable voice tutorials" : "Enable voice tutorials"}
            >
              {voiceEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
            </button>
          </div>
        </div>
        
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              // Skip rendering menu items the user doesn't have permission for
              if (item.permission && !hasPermission(item.permission)) {
                return null;
              }
              
              const { voiceProps } = useVoiceTrigger({
                what: item.voiceWhatIs,
                actionStep: item.actionStep
              });
              
              return (
                <li key={item.path}>
                  <NavLink 
                    to={item.path} 
                    className={({ isActive }) => cn(
                      "flex items-center p-3 rounded-md transition-colors",
                      isActive 
                        ? "bg-primary text-white" 
                        : "text-gray-700 hover:bg-gray-100"
                    )}
                    {...voiceProps}
                  >
                    <item.icon size={18} className="mr-3" />
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
        
        <div className="mt-auto w-full p-4 border-t border-gray-200">
          <VoiceTutorialListener
            selector="user-profile"
            description={`You are currently logged in as ${currentUser.name}, with the role of ${currentUser.role.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}.`}
            actionStep="Your role determines which features you can access in the system."
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                <Users size={20} className="text-gray-600" />
              </div>
              <div>
                <p className="text-sm font-medium">{currentUser.name}</p>
                <p className="text-xs text-gray-500">{currentUser.role.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</p>
              </div>
            </div>
          </VoiceTutorialListener>
        </div>
      </aside>
    </div>
  );
}
