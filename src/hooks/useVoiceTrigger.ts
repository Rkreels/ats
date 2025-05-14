import { useVoiceTutorial } from "@/contexts/VoiceTutorialContext";
import { useCallback, useRef, useEffect } from "react";

interface VoiceTriggerOptions {
  what?: string;
  decision?: string;
  disableClick?: boolean;
  actionStep?: string;
}

export const useVoiceTrigger = ({
  what,
  decision,
  disableClick = false,
  actionStep
}: VoiceTriggerOptions = {}) => {
  const { setTutorial, clearTutorial } = useVoiceTutorial();
  const timeoutRef = useRef<number | null>(null);

  // Add more responsive event handling
  const showVoice = useCallback(() => {
    clearTutorial();
    let tutorialText = what || "";
    if (actionStep) tutorialText = `${tutorialText} ${actionStep}`;
    if (tutorialText) setTutorial(tutorialText, "what");
  }, [what, actionStep, setTutorial, clearTutorial]);

  const hideVoice = useCallback(() => {
    clearTutorial();
  }, [clearTutorial]);

  // Actions
  const triggerDecision = useCallback(() => {
    if (decision) {
      clearTutorial();
      setTutorial(decision, "decision");
    }
  }, [decision, setTutorial, clearTutorial]);

  return {
    voiceProps: {
      onMouseEnter: showVoice,
      onFocus: showVoice,
      onMouseDown: showVoice,
      onMouseUp: showVoice,
      onClick: !disableClick ? showVoice : undefined,
      onMouseLeave: hideVoice,
      onBlur: hideVoice,
      tabIndex: 0,
      "data-voice": what ? true : undefined
    },
    triggerDecision: decision ? triggerDecision : undefined
  };
};
