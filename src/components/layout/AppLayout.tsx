
import { ReactNode } from "react";
import AppSidebar from "./AppSidebar";
import { VoiceTutorialProvider } from "@/contexts/VoiceTutorialContext";
import { VoiceTutorialPopup } from "../voice/VoiceTutorialPopup";

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <VoiceTutorialProvider>
      <div className="min-h-screen bg-gray-50 flex">
        <AppSidebar />
        <main className="flex-1 p-4 lg:p-6 overflow-x-hidden">
          {children}
        </main>
        <VoiceTutorialPopup />
      </div>
    </VoiceTutorialProvider>
  );
}
