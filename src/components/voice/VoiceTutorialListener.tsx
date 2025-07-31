
import React, { useEffect, useRef, useCallback } from "react";
import { useVoiceTutorial } from "@/contexts/VoiceTutorialContext";

/**
 * Ultra-Responsive VoiceTrainer: Instantly responds to mouse/focus/keyboard/click actions.
 * Applies to any actionable or important interactive element for rapid voice switches.
 *
 * Usage: Wrap any actionable/important element in &lt;VoiceTutorialListener&gt;
 */
interface VoiceTutorialListenerProps {
  selector: string;
  description: string;
  help?: string;
  actionStep?: string;
  children: React.ReactNode;
}

const VoiceTutorialListener = React.forwardRef<HTMLDivElement, VoiceTutorialListenerProps>(({
  selector,
  description,
  help,
  actionStep,
  children,
}, forwardedRef) => {
  const { setTutorial, clearTutorial } = useVoiceTutorial();
  const ref = useRef<HTMLDivElement>(null);
  // Maintain last-guided element to avoid unnecessary repeats
  const lastGuidedRef = useRef<string>("");

  const guideNow = useCallback(() => {
    // Do not re-announce the same element rapidly if it's already active
    if (lastGuidedRef.current === selector) return;
    clearTutorial();
    let tutorialText = description;
    if (actionStep) tutorialText = `${description} ${actionStep}`;
    setTutorial(tutorialText, help ? "decision" : "what");
    lastGuidedRef.current = selector;
  }, [clearTutorial, setTutorial, description, help, actionStep, selector]);

  const leaveNow = useCallback(() => {
    clearTutorial();
    lastGuidedRef.current = "";
  }, [clearTutorial]);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    // Listen to mousemove for subcomponent granularity (child actions)
    let hasMouse = false;

    const mouseMoveListener = (e: MouseEvent) => {
      // Only guide if mouse is over this node and not deepest child (buttons in a row)
      if (node.contains(e.target as Node)) {
        if (!hasMouse) {
          guideNow();
          hasMouse = true;
        }
      } else {
        if (hasMouse) {
          leaveNow();
          hasMouse = false;
        }
      }
    };
    // Attach listeners: high-frequency mouseover, focus
    node.addEventListener("mouseenter", guideNow, { passive: true });
    node.addEventListener("mousemove", guideNow, { passive: true });
    node.addEventListener("focus", guideNow, true);
    node.addEventListener("mousedown", guideNow);
    node.addEventListener("mouseleave", leaveNow, { passive: true });
    node.addEventListener("blur", leaveNow, true);
    node.addEventListener("mouseup", guideNow);
    node.addEventListener("touchstart", guideNow);

    // Global mousemove to catch leave anywhere
    document.addEventListener("mousemove", mouseMoveListener);

    return () => {
      node.removeEventListener("mouseenter", guideNow);
      node.removeEventListener("mousemove", guideNow);
      node.removeEventListener("focus", guideNow, true);
      node.removeEventListener("mousedown", guideNow);
      node.removeEventListener("mouseleave", leaveNow);
      node.removeEventListener("blur", leaveNow, true);
      node.removeEventListener("mouseup", guideNow);
      node.removeEventListener("touchstart", guideNow);
      document.removeEventListener("mousemove", mouseMoveListener);
    };
  }, [guideNow, leaveNow]);

  return (
    <div 
      ref={forwardedRef || ref}
      data-voice-selector={selector}
      tabIndex={0}
      style={{ outline: "none" }}
    >
      {children}
    </div>
  );
});

VoiceTutorialListener.displayName = "VoiceTutorialListener";

export default VoiceTutorialListener;
