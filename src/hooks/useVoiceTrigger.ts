
import { useVoiceTutorial } from "@/contexts/VoiceTutorialContext";
import { useCallback, useRef } from "react";

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
  actionStep,
}: VoiceTriggerOptions = {}) => {
  const { setTutorial, clearTutorial } = useVoiceTutorial();
  const lastGuided = useRef<string>("");

  // Instantly guides with "what" info for any hover/focus/click
  const showVoice = useCallback((e?: React.SyntheticEvent | MouseEvent) => {
    if (!what && !actionStep) return;
    // Only re-guide if actually a different element/action
    const key = String(what) + actionStep;
    if (lastGuided.current === key) return;
    clearTutorial();
    let tutorialText = what || "";
    if (actionStep) tutorialText = `${tutorialText} ${actionStep}`;
    if (tutorialText) setTutorial(tutorialText, "what");
    lastGuided.current = key;
  }, [what, actionStep, setTutorial, clearTutorial]);

  const hideVoice = useCallback(() => {
    clearTutorial();
    lastGuided.current = "";
  }, [clearTutorial]);

  // Actions
  const triggerDecision = useCallback(() => {
    if (decision) {
      clearTutorial();
      setTutorial(decision, "decision");
      lastGuided.current = "decision_" + decision;
    }
  }, [decision, setTutorial, clearTutorial]);

  return {
    voiceProps: {
      onMouseEnter: showVoice,
      onFocus: showVoice,
      onMouseDown: showVoice,
      onMouseUp: showVoice,
      onClick: !disableClick ? showVoice : undefined,
      onMouseMove: showVoice,
      onMouseLeave: hideVoice,
      onBlur: hideVoice,
      tabIndex: 0,
      "data-voice": what ? true : undefined,
    },
    triggerDecision: decision ? triggerDecision : undefined
  };
};
