
import { Home, Users, Briefcase, Calendar, BarChart2, Settings, Menu, X, Volume2, VolumeX } from "lucide-react";
import { useVoiceTutorial } from "@/contexts/VoiceTutorialContext";
import { useVoiceTrigger } from "@/hooks/useVoiceTrigger";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";

const menuItems = [
  {
    label: "Dashboard",
    icon: Home,
    path: "/",
    voiceWhatIs: "This is the dashboard where you can see an overview of recruitment metrics and activity.",
  },
  {
    label: "Candidates",
    icon: Users,
    path: "/candidates",
    voiceWhatIs: "This is the candidate pipeline where you can track applicants through each stage of the hiring process.",
  },
  {
    label: "Jobs",
    icon: Briefcase,
    path: "/jobs",
    voiceWhatIs: "This is the job management section where you post new positions and track job applications.",
  },
  {
    label: "Interviews",
    icon: Calendar,
    path: "/interviews",
    voiceWhatIs: "This is the interview scheduling section where you manage candidate interviews.",
  },
  {
    label: "Reports",
    icon: BarChart2,
    path: "/reports",
    voiceWhatIs: "This is the analytics and reporting section where you track recruitment metrics.",
  },
  {
    label: "Settings",
    icon: Settings,
    path: "/settings",
    voiceWhatIs: "This is where you can configure your ATS settings.",
  }
];

export default function AppSidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const { voiceEnabled, toggleVoice } = useVoiceTutorial();
  
  const { voiceProps: sidebarVoiceProps } = useVoiceTrigger({
    what: "This is the main navigation menu. Use it to access different sections of your Applicant Tracking System."
  });
  
  return (
    <div className="h-full flex flex-col">
      {/* Sidebar */}
      <aside 
        className="h-full bg-white border-r border-gray-200 transition-all duration-300 ease-in-out shadow-sm w-64"
        {...sidebarVoiceProps}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-ats-primary">
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
              const { voiceProps } = useVoiceTrigger({
                what: item.voiceWhatIs
              });
              
              return (
                <li key={item.path}>
                  <NavLink 
                    to={item.path} 
                    className={({ isActive }) => cn(
                      "flex items-center p-3 rounded-md transition-colors",
                      isActive 
                        ? "bg-ats-primary text-white" 
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
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
              <Users size={20} className="text-gray-600" />
            </div>
            <div>
              <p className="text-sm font-medium">Demo Company</p>
              <p className="text-xs text-gray-500">HR Manager</p>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
