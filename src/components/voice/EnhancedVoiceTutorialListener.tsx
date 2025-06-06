
import { useEffect, useRef, useCallback } from "react";
import { useVoiceTutorial } from "@/contexts/VoiceTutorialContext";

interface EnhancedVoiceTutorialListenerProps {
  selector: string;
  description: string;
  help?: string;
  actionStep?: string;
  children: React.ReactNode;
  triggerOnLoad?: boolean;
  priority?: "low" | "medium" | "high";
  category?: "navigation" | "form" | "action" | "info";
}

export default function EnhancedVoiceTutorialListener({
  selector,
  description,
  help,
  actionStep,
  children,
  triggerOnLoad = false,
  priority = "medium",
  category = "info",
}: EnhancedVoiceTutorialListenerProps) {
  const { setTutorial, clearTutorial } = useVoiceTutorial();
  const ref = useRef<HTMLDivElement>(null);
  const lastGuidedRef = useRef<string>("");
  const loadTriggeredRef = useRef<boolean>(false);

  const guideNow = useCallback(() => {
    const tutorialKey = `${selector}-${description}`;
    if (lastGuidedRef.current === tutorialKey) return;
    
    clearTutorial();
    let tutorialText = description;
    if (actionStep) tutorialText = `${description} ${actionStep}`;
    
    // Add category context to tutorial
    const categoryPrefix = {
      navigation: "Navigation: ",
      form: "Form field: ", 
      action: "Action available: ",
      info: "Information: "
    };
    
    tutorialText = categoryPrefix[category] + tutorialText;
    setTutorial(tutorialText, help ? "decision" : "what");
    lastGuidedRef.current = tutorialKey;
  }, [clearTutorial, setTutorial, description, help, actionStep, selector, category]);

  const leaveNow = useCallback(() => {
    clearTutorial();
    lastGuidedRef.current = "";
  }, [clearTutorial]);

  // Trigger on component load if requested
  useEffect(() => {
    if (triggerOnLoad && !loadTriggeredRef.current) {
      const timer = setTimeout(() => {
        guideNow();
        loadTriggeredRef.current = true;
      }, 500); // Small delay to ensure component is rendered
      
      return () => clearTimeout(timer);
    }
  }, [triggerOnLoad, guideNow]);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let isHovered = false;

    const mouseEnterHandler = () => {
      isHovered = true;
      guideNow();
    };

    const mouseLeaveHandler = () => {
      isHovered = false;
      leaveNow();
    };

    const focusHandler = () => guideNow();
    const blurHandler = () => leaveNow();
    const clickHandler = () => guideNow();

    // Add event listeners
    node.addEventListener("mouseenter", mouseEnterHandler);
    node.addEventListener("mouseleave", mouseLeaveHandler);
    node.addEventListener("focus", focusHandler, true);
    node.addEventListener("blur", blurHandler, true);
    node.addEventListener("click", clickHandler);

    return () => {
      node.removeEventListener("mouseenter", mouseEnterHandler);
      node.removeEventListener("mouseleave", mouseLeaveHandler);
      node.removeEventListener("focus", focusHandler, true);
      node.removeEventListener("blur", blurHandler, true);
      node.removeEventListener("click", clickHandler);
    };
  }, [guideNow, leaveNow]);

  return (
    <div 
      ref={ref}
      data-voice-selector={selector}
      data-voice-category={category}
      data-voice-priority={priority}
      tabIndex={0}
      style={{ outline: "none" }}
    >
      {children}
    </div>
  );
}
