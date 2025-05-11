
import { ReactNode, useState, useEffect } from "react";
import AppSidebar from "./AppSidebar";
import { NotificationsPopover } from "../notifications/NotificationsPopover";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  
  // Close sidebar when window is resized to desktop view
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
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Mobile sidebar with overlay */}
      {isMobile ? (
        <>
          <div 
            className={`fixed inset-y-0 left-0 z-40 transition-transform transform duration-300 ease-in-out ${
              sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <AppSidebar onClose={() => setSidebarOpen(false)} />
          </div>
          
          {/* Overlay for mobile */}
          {sidebarOpen && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-30"
              onClick={toggleSidebar}
            />
          )}
        </>
      ) : (
        // Desktop sidebar
        <div className="hidden md:block md:w-64 flex-shrink-0">
          <AppSidebar />
        </div>
      )}
      
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="sticky top-0 bg-white border-b border-gray-200 p-4 z-20 flex justify-between items-center">
          <Button 
            variant="ghost" 
            size="sm" 
            className="md:hidden" 
            onClick={toggleSidebar}
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            <span className="sr-only">Toggle menu</span>
          </Button>
          
          <div className="ml-auto">
            <NotificationsPopover />
          </div>
        </header>
        
        <main className="flex-1 p-3 md:p-6 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
