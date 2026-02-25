
import { ReactNode, useState, useEffect } from "react";
import AppSidebar from "./AppSidebar";
import { NotificationsPopover } from "../notifications/NotificationsPopover";
import VoiceToggle from "@/components/voice/VoiceToggle";
import { Button } from "@/components/ui/button";
import { Menu, X, ExternalLink } from "lucide-react";
import EnhancedVoiceTutorialListener from "@/components/voice/EnhancedVoiceTutorialListener";

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile && sidebarOpen) {
        setSidebarOpen(false);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
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
      <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
        {isMobile ? (
          <>
            <div 
              className={`fixed inset-y-0 left-0 z-40 transition-transform transform duration-300 ease-in-out ${
                sidebarOpen ? 'translate-x-0' : '-translate-x-full'
              }`}
            >
              <AppSidebar onLinkClick={() => setSidebarOpen(false)} />
            </div>
            
            {sidebarOpen && (
              <div 
                className="fixed inset-0 bg-black bg-opacity-50 z-30"
                onClick={() => setSidebarOpen(false)}
              />
            )}
          </>
        ) : (
          <div className="hidden lg:block lg:w-64 flex-shrink-0">
            <AppSidebar />
          </div>
        )}
        
        <div className="flex-1 flex flex-col min-h-screen">
          <header className="sticky top-0 bg-white border-b border-gray-200 p-4 z-20 flex justify-between items-center">
            {isMobile && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={toggleSidebar}
              >
                {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
                <span className="sr-only">Toggle menu</span>
              </Button>
            )}
            
            <div className="ml-auto flex items-center space-x-4">
              <Button
                onClick={() => window.open('https://careertodo.com/practice-lab', '_self')}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <ExternalLink className="h-4 w-4" />
                Lab Dashboard
              </Button>
              <NotificationsPopover />
            </div>
          </header>
          
          <main className="flex-1 p-3 sm:p-6 lg:p-8 overflow-x-hidden">
            {children}
          </main>
        </div>
      </div>
      <VoiceToggle />
    </EnhancedVoiceTutorialListener>
  );
}
