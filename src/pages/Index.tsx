
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import VoiceTutorialListener from "@/components/voice/VoiceTutorialListener";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Only redirect if we're actually on the index path to avoid infinite loops
    if (window.location.pathname === "/" || window.location.pathname === "/index") {
      const timer = setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [navigate]);

  return (
    <VoiceTutorialListener
      selector="index-loading"
      description="Welcome to VoiceATS! Your AI-powered recruitment system is loading."
      actionStep="Please wait while we initialize your dashboard."
    >
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary mx-auto"></div>
          <h1 className="text-4xl font-bold mb-4 text-foreground">Loading VoiceATS...</h1>
          <p className="text-xl text-muted-foreground">Preparing your AI-powered recruitment system</p>
        </div>
      </div>
    </VoiceTutorialListener>
  );
};

export default Index;
