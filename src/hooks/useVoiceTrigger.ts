
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
      // Immediate voice feedback
      setTutorial(what, "what");
    }
  }, [what, setTutorial]);
  
  const handleClick = useCallback(() => {
    if (!disableClick && what) {
      // Also trigger on click for better accessibility
      setTutorial(what, "what");
    }
  }, [what, disableClick, setTutorial]);
  
  // For decision support (manually triggered)
  const triggerDecision = useCallback(() => {
    if (decision) {
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
