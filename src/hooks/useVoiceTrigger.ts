
import { useVoiceTutorial } from "@/contexts/VoiceTutorialContext";
import { useRef, useCallback } from "react";

interface VoiceTriggerOptions {
  what?: string;
  how?: string;
  decision?: string;
  hoverDelay?: number;
  disableClick?: boolean;
}

export const useVoiceTrigger = ({
  what,
  how,
  decision,
  hoverDelay = 2000,
  disableClick = false
}: VoiceTriggerOptions = {}) => {
  const { setTutorial } = useVoiceTutorial();
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Clear any running hover timer
  const clearHoverTimer = useCallback(() => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
  }, []);
  
  // Handlers for different events
  const handleMouseEnter = useCallback(() => {
    if (what) {
      hoverTimerRef.current = setTimeout(() => {
        setTutorial(what, "what");
      }, hoverDelay);
    }
  }, [what, hoverDelay, setTutorial]);
  
  const handleMouseLeave = useCallback(() => {
    clearHoverTimer();
  }, [clearHoverTimer]);
  
  const handleClick = useCallback(() => {
    if (!disableClick && how) {
      clearHoverTimer(); // Cancel the "what" tutorial if it's pending
      setTutorial(how, "how");
    }
  }, [how, disableClick, clearHoverTimer, setTutorial]);
  
  // For decision support (manually triggered)
  const triggerDecision = useCallback(() => {
    if (decision) {
      clearHoverTimer();
      setTutorial(decision, "decision");
    }
  }, [decision, clearHoverTimer, setTutorial]);
  
  // Return the event handlers and the trigger function
  return {
    voiceProps: {
      onMouseEnter: what ? handleMouseEnter : undefined,
      onMouseLeave: what ? handleMouseLeave : undefined,
      onClick: !disableClick && how ? handleClick : undefined
    },
    triggerDecision: decision ? triggerDecision : undefined
  };
};
