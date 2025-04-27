
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
    voiceHowTo: "Click here to view top-level metrics like time-to-hire, applicant sources, and active job postings."
  },
  {
    label: "Candidates",
    icon: Users,
    path: "/candidates",
    voiceWhatIs: "This is the candidate pipeline where you can track applicants through each stage of the hiring process.",
    voiceHowTo: "Click here to view all candidates and manage them through the pipeline from application to hire."
  },
  {
    label: "Jobs",
    icon: Briefcase,
    path: "/jobs",
    voiceWhatIs: "This is the job management section where you post new positions and track job applications.",
    voiceHowTo: "Click here to create new job postings, manage your active jobs, and track approval workflows."
  },
  {
    label: "Interviews",
    icon: Calendar,
    path: "/interviews",
    voiceWhatIs: "This is the interview scheduling section where you manage candidate interviews.",
    voiceHowTo: "Click here to schedule and track interviews, send calendar invites, and manage interview feedback."
  },
  {
    label: "Reports",
    icon: BarChart2,
    path: "/reports",
    voiceWhatIs: "This is the analytics and reporting section where you track recruitment metrics.",
    voiceHowTo: "Click here to view time-to-hire metrics, source effectiveness, diversity metrics, and more."
  },
  {
    label: "Settings",
    icon: Settings,
    path: "/settings",
    voiceWhatIs: "This is where you can configure your ATS settings.",
    voiceHowTo: "Click here to customize job templates, workflows, and notification preferences."
  }
];

export default function AppSidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const { voiceEnabled, toggleVoice } = useVoiceTutorial();
  
  const { voiceProps: sidebarVoiceProps } = useVoiceTrigger({
    what: "This is the main navigation menu. Use it to access different sections of your Applicant Tracking System.",
    how: "Click on any icon to navigate to that section. You can also collapse this sidebar by clicking the menu button at the top."
  });
  
  return (
    <>
      {/* Mobile menu button */}
      <button 
        onClick={() => setIsOpen(prev => !prev)}
        className="lg:hidden fixed top-4 left-4 z-40 p-2 bg-white rounded-md shadow-md text-gray-700 hover:bg-gray-100"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
      
      {/* Sidebar backdrop for mobile */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/30 z-30"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed h-full bg-white border-r border-gray-200 transition-all duration-300 ease-in-out z-30 shadow-sm",
          isOpen ? "left-0" : "-left-64",
          "lg:left-0 lg:w-64"
        )}
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
              data-voice-what="This button toggles the voice tutorial system on and off."
              data-voice-how="Click to mute or unmute the voice assistant. When muted, you'll still see text tutorials but won't hear audio."
            >
              {voiceEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
            </button>
            <button
              onClick={() => setIsOpen(prev => !prev)}
              className="lg:hidden p-2 rounded-full hover:bg-gray-100"
              aria-label="Close menu"
            >
              <X size={18} />
            </button>
          </div>
        </div>
        
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const { voiceProps } = useVoiceTrigger({
                what: item.voiceWhatIs,
                how: item.voiceHowTo
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
        
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
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
      
      {/* Spacer for content to align with sidebar */}
      <div className="lg:w-64 flex-shrink-0" />
    </>
  );
}
