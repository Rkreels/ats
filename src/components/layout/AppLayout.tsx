
import { ReactNode, useState, useEffect } from "react";
import AppSidebar from "./AppSidebar";
import { NotificationsPopover } from "../notifications/NotificationsPopover";
import VoiceToggle from "@/components/voice/VoiceToggle";
import { Button } from "@/components/ui/button";
import { Menu, X, ExternalLink } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import EnhancedVoiceTutorialListener from "@/components/voice/EnhancedVoiceTutorialListener";

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && sidebarOpen) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [sidebarOpen]);
  
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  
  return (
    <EnhancedVoiceTutorialListener
      selector="app-layout-container"
      description="Main application layout with sidebar navigation and content area."
      category="navigation"
      priority="high"
      triggerOnLoad={true}
    >
      <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
        {isMobile ? (
          <>
            <div 
              className={`fixed inset-y-0 left-0 z-40 transition-transform transform duration-300 ease-in-out ${
                sidebarOpen ? 'translate-x-0' : '-translate-x-full'
              }`}
            >
              <AppSidebar />
            </div>
            
            {sidebarOpen && (
              <div 
                className="fixed inset-0 bg-black bg-opacity-50 z-30"
                onClick={toggleSidebar}
              />
            )}
          </>
        ) : (
          <div className="hidden md:block md:w-64 flex-shrink-0">
            <AppSidebar />
          </div>
        )}
        
        <div className="flex-1 flex flex-col min-h-screen">
          <EnhancedVoiceTutorialListener
            selector="app-header"
            description="Application header with mobile menu toggle and notifications."
            category="navigation"
          >
            <header className="sticky top-0 bg-white border-b border-gray-200 p-4 z-20 flex justify-between items-center">
              <EnhancedVoiceTutorialListener
                selector="mobile-menu-toggle"
                description="Mobile menu toggle button for opening and closing the sidebar."
                actionStep="Click to toggle the navigation menu on mobile devices."
                category="action"
              >
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="md:hidden" 
                  onClick={toggleSidebar}
                >
                  {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </EnhancedVoiceTutorialListener>
              
              <div className="ml-auto flex items-center space-x-4">
                <EnhancedVoiceTutorialListener
                  selector="master-dashboard-link"
                  description="Master Dashboard link - opens the main system dashboard in a new window"
                  actionStep="Click to access the central management dashboard"
                  category="navigation"
                  priority="medium"
                >
                  <Button
                    onClick={() => window.open('https://skillsim.vercel.app/dashboard', '_self')}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Master Dashboard
                  </Button>
                </EnhancedVoiceTutorialListener>
                <NotificationsPopover />
              </div>
            </header>
          </EnhancedVoiceTutorialListener>
          
          <EnhancedVoiceTutorialListener
            selector="main-content-area"
            description="Main content area where page content is displayed."
            category="info"
          >
            <main className="flex-1 p-3 md:p-6 overflow-x-hidden">
              {children}
            </main>
          </EnhancedVoiceTutorialListener>
        </div>
      </div>
      <VoiceToggle />
    </EnhancedVoiceTutorialListener>
  );
}
