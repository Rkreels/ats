
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
  const { setTutorial } = useVoiceTutorial();
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
      // Clear any existing timeout to avoid overlapping instructions
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      // Immediate voice feedback with no delay
      setTutorial(what, "what");
    }
  }, [what, setTutorial]);
  
  const handleClick = useCallback(() => {
    if (!disableClick && what) {
      // Clear any existing timeout to avoid overlapping instructions  
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      // Also trigger on click for better accessibility with no delay
      setTutorial(what, "what");
    }
  }, [what, disableClick, setTutorial]);
  
  // For decision support (manually triggered)
  const triggerDecision = useCallback(() => {
    if (decision) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setTutorial(decision, "decision");
    }
  }, [decision, setTutorial]);
  
  return {
    voiceProps: {
      onMouseEnter: what ? handleMouseEnter : undefined,
      onClick: what ? handleClick : undefined
    },
    triggerDecision: decision ? triggerDecision : undefined
  };
};
