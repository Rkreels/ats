
import { useEffect, useRef } from "react";
import { useVoiceTutorial } from "@/contexts/VoiceTutorialContext";

/**
 * Advanced VoiceTrainer: Instantly responds to mouse/focus/keyboard/click actions.
 *
 * Usage: Wrap any actionable or important component in <VoiceTutorialListener>
 */
interface VoiceTutorialListenerProps {
  selector: string;
  description: string;
  help?: string;
  actionStep?: string;
  children: React.ReactNode;
}

export default function VoiceTutorialListener({
  selector,
  description,
  help,
  actionStep,
  children,
}: VoiceTutorialListenerProps) {
  const { setTutorial, clearTutorial } = useVoiceTutorial();
  const ref = useRef<HTMLDivElement>(null);

  // Handlers: Mouse enter, focus, and click.
  const showTutorial = () => {
    // Always immediately clear previous voice
    clearTutorial();
    let tutorialText = description;
    if (actionStep) tutorialText = `${description} ${actionStep}`;
    setTutorial(tutorialText, help ? "decision" : "what");
  };
  const hideTutorial = () => clearTutorial();

  useEffect(() => {
    // Attach listeners for mousemoving over children for deep coverage
    const node = ref.current;
    if (!node) return;
    node.addEventListener("mouseenter", showTutorial);
    node.addEventListener("focus", showTutorial, true);
    node.addEventListener("mousedown", showTutorial);
    node.addEventListener("mouseleave", hideTutorial);
    node.addEventListener("blur", hideTutorial, true);
    node.addEventListener("mouseup", showTutorial);

    // For MSAA: Add touch
    node.addEventListener("touchstart", showTutorial);

    return () => {
      node.removeEventListener("mouseenter", showTutorial);
      node.removeEventListener("focus", showTutorial, true);
      node.removeEventListener("mousedown", showTutorial);
      node.removeEventListener("mouseleave", hideTutorial);
      node.removeEventListener("blur", hideTutorial, true);
      node.removeEventListener("mouseup", showTutorial);
      node.removeEventListener("touchstart", showTutorial);
    };
  }, []);

  return (
    <div ref={ref} data-voice-selector={selector} tabIndex={0}>
      {children}
    </div>
  );
}
