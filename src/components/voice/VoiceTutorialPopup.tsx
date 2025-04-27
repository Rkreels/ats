
import { useVoiceTutorial } from "@/contexts/VoiceTutorialContext";
import { useEffect, useState } from "react";
import { HelpCircle, Lightbulb, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

export const VoiceTutorialPopup = () => {
  const { activeTutorial, clearTutorial, voiceEnabled, toggleVoice, isPlaying } = useVoiceTutorial();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (activeTutorial) {
      setVisible(true);
      
      // Auto-dismiss after tutorial completes if it's a "what" tutorial
      if (activeTutorial.type === "what") {
        const timer = setTimeout(() => {
          setVisible(false);
          setTimeout(clearTutorial, 300); // Clear after animation completes
        }, 5000); // Shorter duration for quicker response
        
        return () => clearTimeout(timer);
      }
    }
  }, [activeTutorial, clearTutorial]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(clearTutorial, 300); // Clear after animation completes
  };

  if (!activeTutorial) return null;

  const getTutorialIcon = () => {
    switch (activeTutorial.type) {
      case "what":
        return <HelpCircle className="text-blue-500" />;
      case "decision":
        return <Lightbulb className="text-purple-500" />;
      default:
        return <HelpCircle />;
    }
  };

  const getTutorialColor = () => {
    switch (activeTutorial.type) {
      case "what":
        return "border-blue-200 bg-blue-50";
      case "decision":
        return "border-purple-200 bg-purple-50";
      default:
        return "border-gray-200 bg-gray-50";
    }
  };

  return (
    <div 
      className={cn(
        "fixed bottom-4 right-4 w-80 rounded-lg border p-4 shadow-lg transition-all duration-300 z-50",
        getTutorialColor(),
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      )}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          {getTutorialIcon()}
          <h4 className="font-medium">
            {activeTutorial.type === "what" && "What is this?"}
            {activeTutorial.type === "decision" && "Decision Support"}
          </h4>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={toggleVoice}
            className="p-1 rounded-full hover:bg-gray-200 transition-colors"
            aria-label={voiceEnabled ? "Disable voice" : "Enable voice"}
          >
            {voiceEnabled ? (
              <Volume2 className="h-4 w-4" />
            ) : (
              <VolumeX className="h-4 w-4" />
            )}
          </button>
          <button 
            onClick={handleClose}
            className="p-1 rounded-full hover:bg-gray-200 transition-colors"
            aria-label="Close tutorial"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
      
      <p className="text-sm text-gray-700">{activeTutorial.text}</p>
      
      {isPlaying && (
        <div className="flex justify-center gap-1 mt-2 h-3">
          <div className="w-1 bg-ats-primary rounded-full animate-voice-wave-1"></div>
          <div className="w-1 bg-ats-primary rounded-full animate-voice-wave-2"></div>
          <div className="w-1 bg-ats-primary rounded-full animate-voice-wave-3"></div>
          <div className="w-1 bg-ats-primary rounded-full animate-voice-wave-2"></div>
          <div className="w-1 bg-ats-primary rounded-full animate-voice-wave-1"></div>
        </div>
      )}
    </div>
  );
};
