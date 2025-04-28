
import { useVoiceTutorial } from "@/contexts/VoiceTutorialContext";
import { useState, useEffect } from "react";
import { HelpCircle, Lightbulb, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export const VoiceTutorialPopup = () => {
  const { 
    activeTutorial, 
    clearTutorial, 
    voiceEnabled, 
    toggleVoice,
    isPlaying
  } = useVoiceTutorial();
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    if (activeTutorial) {
      setIsVisible(true);
    }
  }, [activeTutorial]);

  if (!activeTutorial) return null;
  
  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      clearTutorial();
    }, 300); // Allow animation to complete
  };
  
  return (
    <div 
      className={cn(
        "fixed bottom-4 right-4 max-w-md bg-white rounded-lg shadow-lg border border-gray-200 transition-all duration-300 transform z-50",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      )}
    >
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          {activeTutorial.type === "what" ? (
            <Lightbulb className="h-5 w-5 text-yellow-500" />
          ) : (
            <HelpCircle className="h-5 w-5 text-blue-500" />
          )}
          <span className="font-semibold">
            {activeTutorial.type === "what" ? "Tip" : "Help"}
          </span>
          <div className="ml-auto flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-7 w-7 p-0"
              onClick={toggleVoice}
              title={voiceEnabled ? "Mute voice" : "Enable voice"}
            >
              {voiceEnabled ? (
                <Volume2 className={cn("h-4 w-4", isPlaying && "text-blue-500")} />
              ) : (
                <VolumeX className="h-4 w-4" />
              )}
              <span className="sr-only">{voiceEnabled ? "Mute" : "Unmute"}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 w-7 p-0"
              onClick={handleClose}
            >
              <span className="sr-only">Close</span>
              ×
            </Button>
          </div>
        </div>
        <p className="text-sm text-gray-600">{activeTutorial.text}</p>
      </div>
    </div>
  );
};
