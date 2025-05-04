
import { ReactNode, useState } from "react";
import AppSidebar from "./AppSidebar";
import { NotificationsPopover } from "../notifications/NotificationsPopover";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className={`transition-all duration-300 ${sidebarOpen || !isMobile ? 'translate-x-0' : '-translate-x-full'} fixed md:sticky top-0 h-screen z-30`}>
        <AppSidebar />
      </div>
      
      <div className="flex-1 md:ml-64 relative"> {/* This accounts for the sidebar width on desktop */}
        <header className="sticky top-0 bg-white border-b border-gray-200 p-4 z-20 flex justify-between items-center">
          <Button 
            variant="ghost" 
            size="sm" 
            className="md:hidden" 
            onClick={toggleSidebar}
          >
            <Menu />
            <span className="sr-only">Toggle menu</span>
          </Button>
          
          <div className="ml-auto">
            <NotificationsPopover />
          </div>
        </header>
        
        <main className="p-4 lg:p-6 overflow-x-hidden">
          {children}
        </main>
      </div>
      
      {/* Overlay to close sidebar on mobile */}
      {sidebarOpen && isMobile && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
}
