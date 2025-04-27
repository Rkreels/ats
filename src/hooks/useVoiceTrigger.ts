
import { useVoiceTutorial } from "@/contexts/VoiceTutorialContext";
import { useRef, useCallback } from "react";

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
  
  // Handlers for different events
  const handleMouseEnter = useCallback(() => {
    if (what) {
      setTutorial(what, "what");
    }
  }, [what, setTutorial]);
  
  // For decision support (manually triggered)
  const triggerDecision = useCallback(() => {
    if (decision) {
      setTutorial(decision, "decision");
    }
  }, [decision, setTutorial]);
  
  return {
    voiceProps: {
      onMouseEnter: what ? handleMouseEnter : undefined,
    },
    triggerDecision: decision ? triggerDecision : undefined
  };
};
