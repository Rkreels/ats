import { Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useVoiceTutorial } from "@/contexts/VoiceTutorialContext";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function VoiceToggle() {
  const { voiceEnabled, toggleVoice } = useVoiceTutorial();

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={toggleVoice}
              size="lg"
              className={`rounded-full h-12 w-12 shadow-lg transition-all duration-200 ${
                voiceEnabled 
                  ? "bg-primary hover:bg-primary/90 text-primary-foreground" 
                  : "bg-muted hover:bg-muted/80 text-muted-foreground"
              }`}
            >
              {voiceEnabled ? (
                <Volume2 className="h-6 w-6" />
              ) : (
                <VolumeX className="h-6 w-6" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>{voiceEnabled ? "Turn off voice training" : "Turn on voice training"}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}