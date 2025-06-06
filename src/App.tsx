
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import Candidates from "./pages/Candidates";
import CandidateDetail from "./pages/CandidateDetail";
import Jobs from "./pages/Jobs";
import Interviews from "./pages/Interviews";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Onboarding from "./pages/Onboarding";
import NotFound from "./pages/NotFound";
import { UserProvider } from "./contexts/UserContext";
import { VoiceTutorialProvider } from "./contexts/VoiceTutorialContext";
import { VoiceTutorialPopup } from "@/components/voice/VoiceTutorialPopup";
import ErrorBoundary from "./components/common/ErrorBoundary";

const queryClient = new QueryClient();

// Enhanced base path handling for better routing
const getBasename = () => {
  // Check if we're in production and on the correct path
  if (import.meta.env.PROD && window.location.pathname.startsWith('/simulation/ats')) {
    return "/simulation/ats";
  }
  // For development or when not on the simulation path
  return "";
};

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <VoiceTutorialProvider>
          <TooltipProvider>
            <VoiceTutorialPopup />
            <Toaster />
            <Sonner />
            <BrowserRouter basename={getBasename()}>
              <Routes>
                <Route path="/" element={
                  <AppLayout>
                    <Dashboard />
                  </AppLayout>
                } />
                <Route path="/candidates" element={
                  <AppLayout>
                    <Candidates />
                  </AppLayout>
                } />
                <Route path="/candidates/:id" element={
                  <AppLayout>
                    <CandidateDetail />
                  </AppLayout>
                } />
                <Route path="/jobs" element={
                  <AppLayout>
                    <Jobs />
                  </AppLayout>
                } />
                <Route path="/interviews" element={
                  <AppLayout>
                    <Interviews />
                  </AppLayout>
                } />
                <Route path="/onboarding" element={
                  <AppLayout>
                    <Onboarding />
                  </AppLayout>
                } />
                <Route path="/reports" element={
                  <AppLayout>
                    <Reports />
                  </AppLayout>
                } />
                <Route path="/settings" element={
                  <AppLayout>
                    <Settings />
                  </AppLayout>
                } />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </VoiceTutorialProvider>
      </UserProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
