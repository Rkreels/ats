
import { useEffect, useRef, useState } from "react";
import { useVoiceTutorial } from "@/contexts/VoiceTutorialContext";

interface VoiceTutorialListenerProps {
  selector: string;
  description: string;
  children: React.ReactNode;
  help?: string;
}

/**
 * Component that adds voice tutorial support to any element
 */
export default function VoiceTutorialListener({
  selector,
  description,
  children,
  help,
}: VoiceTutorialListenerProps) {
  const { setActiveTutorial } = useVoiceTutorial();
  const elementRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const startTutorial = () => {
    // Clear any existing timeout to prevent race conditions
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Set a small timeout before activating to prevent flicker on quick mouse movements
    timeoutRef.current = setTimeout(() => {
      setActiveTutorial({
        type: help ? "help" : "what",
        text: help || description,
      });
    }, 100);
  };
  
  const stopTutorial = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveTutorial(null);
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
