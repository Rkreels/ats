
import { useEffect, useRef, useState } from "react";
import { useVoiceTutorial } from "@/contexts/VoiceTutorialContext";

interface VoiceTutorialListenerProps {
  selector: string;
  description: string;
  children: React.ReactNode;
  help?: string;
  actionStep?: string; // Added to guide users on next steps
}

/**
 * Component that adds voice tutorial support to any element
 */
export default function VoiceTutorialListener({
  selector,
  description,
  children,
  help,
  actionStep,
}: VoiceTutorialListenerProps) {
  const { setTutorial, clearTutorial } = useVoiceTutorial();
  const elementRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Clear any pending timeouts on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  
  const startTutorial = () => {
    // Clear any existing timeout to prevent race conditions
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Clear any existing audio first
    clearTutorial();
    
    // Construct a more comprehensive tutorial message with action step if provided
    let tutorialText = description;
    if (actionStep) {
      tutorialText = `${description} ${actionStep}`;
    }
    
    // Set the tutorial immediately
    setTutorial(tutorialText, help ? "decision" : "what");
  };
  
  const stopTutorial = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    clearTutorial();
  };
  
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={elementRef}
      onMouseEnter={startTutorial}
      onMouseLeave={stopTutorial}
      onFocus={startTutorial}
      onBlur={stopTutorial}
      data-voice-selector={selector}
    >
      {children}
    </div>
  );
}
