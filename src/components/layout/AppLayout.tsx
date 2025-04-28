
import { ReactNode } from "react";
import AppSidebar from "./AppSidebar";
import { VoiceTutorialPopup } from "../voice/VoiceTutorialPopup";
import { NotificationsPopover } from "../notifications/NotificationsPopover";

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AppSidebar />
      <div className="flex-1 ml-64"> {/* This accounts for the fixed sidebar width */}
        <main className="p-4 lg:p-6 overflow-x-hidden">
          <div className="flex justify-end mb-4">
            <NotificationsPopover />
          </div>
          {children}
        </main>
      </div>
      <VoiceTutorialPopup />
    </div>
  );
}
