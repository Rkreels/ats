
import { useVoiceTutorial } from "@/contexts/VoiceTutorialContext";
import { useEffect, useState } from "react";
import { HelpCircle, Lightbulb, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

export const VoiceTutorialPopup = () => {
  const { activeTutorial, clearTutorial, voiceEnabled, toggleVoice, isPlaying } = useVoiceTutorial();
  
  // Don't show the popup as requested by the user
  return null;
};
