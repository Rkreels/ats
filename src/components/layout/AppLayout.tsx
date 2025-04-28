
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
      <main className="flex-1 p-4 lg:p-6 overflow-x-hidden">
        <div className="flex justify-end mb-4">
          <NotificationsPopover />
        </div>
        {children}
      </main>
      <VoiceTutorialPopup />
    </div>
  );
}
