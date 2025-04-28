
import { useVoiceTutorial } from "@/contexts/VoiceTutorialContext";
import { useCallback, useEffect, useRef } from "react";

interface VoiceTriggerOptions {
  what?: string;
  decision?: string;
  disableClick?: boolean;
}

export const useVoiceTrigger = ({
  what,
  decision,
  disableClick = false
}: VoiceTriggerOptions = {}) => {
  const { setTutorial, clearTutorial } = useVoiceTutorial();
  const timeoutRef = useRef<number | null>(null);
  
  // Clear any pending timeouts on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  
  // Handlers for different events
  const handleMouseEnter = useCallback(() => {
    if (what) {
      // Clear any existing audio first - immediately stop any playing audio
      clearTutorial();
      
      // Clear any existing timeout to avoid overlapping instructions
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      // Set the tutorial immediately - no delay
      setTutorial(what, "what");
    }
  }, [what, setTutorial, clearTutorial]);
  
  const handleClick = useCallback(() => {
    if (!disableClick && what) {
      // Clear any existing audio first
      clearTutorial();
      
      // Clear any existing timeout to avoid overlapping instructions  
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      // Also trigger on click for better accessibility with no delay
      setTutorial(what, "what");
    }
  }, [what, disableClick, setTutorial, clearTutorial]);
  
  // Handle mouse leave - clear tutorial when leaving component
  const handleMouseLeave = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    // Immediately clear the tutorial when leaving the component
    clearTutorial();
  }, [clearTutorial]);
  
  // For decision support (manually triggered)
  const triggerDecision = useCallback(() => {
    if (decision) {
      // Clear any existing audio first
      clearTutorial();
      
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      // Set the tutorial immediately
      setTutorial(decision, "decision");
    }
  }, [decision, setTutorial, clearTutorial]);
  
  return {
    voiceProps: {
      onMouseEnter: what ? handleMouseEnter : undefined,
      onMouseLeave: what ? handleMouseLeave : undefined,
      onClick: what ? handleClick : undefined
    },
    triggerDecision: decision ? triggerDecision : undefined
  };
};
