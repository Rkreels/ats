import { createContext, useState, useContext, useEffect, ReactNode } from "react";

type VoiceTutorialType = "what" | "decision";

interface VoiceTutorialContent {
  text: string;
  type: VoiceTutorialType;
}

interface VoiceTutorialContextType {
  activeTutorial: VoiceTutorialContent | null;
  setTutorial: (text: string, type: VoiceTutorialType) => void;
  clearTutorial: () => void;
  voiceEnabled: boolean;
  toggleVoice: () => void;
  isPlaying: boolean;
}

const VoiceTutorialContext = createContext<VoiceTutorialContextType | undefined>(undefined);

export const VoiceTutorialProvider = ({ children }: { children: ReactNode }) => {
  const [activeTutorial, setActiveTutorial] = useState<VoiceTutorialContent | null>(null);
  const [voiceEnabled, setVoiceEnabled] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [voiceQueue, setVoiceQueue] = useState<VoiceTutorialContent[]>([]);
  
  // Browser's SpeechSynthesis API
  const synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
  
  const setTutorial = (text: string, type: VoiceTutorialType) => {
    // If currently playing, queue the new tutorial
    if (isPlaying && voiceEnabled) {
      setVoiceQueue(prev => [...prev, { text, type }]);
      return;
    }
    
    // Otherwise set it as active immediately
    setActiveTutorial({ text, type });
  };
  
  const clearTutorial = () => {
    setActiveTutorial(null);
    if (synth) synth.cancel();
    setIsPlaying(false);
    
    // Process next item in queue if available
    if (voiceQueue.length > 0) {
      const nextTutorial = voiceQueue[0];
      setVoiceQueue(prev => prev.slice(1));
      setActiveTutorial(nextTutorial);
    }
  };
  
  const toggleVoice = () => {
    setVoiceEnabled(prev => !prev);
    if (synth) synth.cancel();
    setIsPlaying(false);
    setVoiceQueue([]);
    setActiveTutorial(null);
  };
  
  // Process voice tutorial when it changes
  useEffect(() => {
    if (activeTutorial && voiceEnabled && synth) {
      const utterance = new SpeechSynthesisUtterance(activeTutorial.text);
      
      // Use different voices based on tutorial type
      const voices = synth.getVoices();
      
      if (voices.length > 0) {
        let voiceIndex = 0;
        
        switch (activeTutorial.type) {
          case "what":
            // Informational voice (prefer female voices)
            voiceIndex = voices.findIndex(v => v.name.includes("Female") || v.name.includes("Samantha"));
            break;
          case "decision":
            // Authoritative voice (prefer male voices)
            voiceIndex = voices.findIndex(v => v.name.includes("Male") || v.name.includes("Daniel"));
            break;
        }
        
        if (voiceIndex !== -1) {
          utterance.voice = voices[voiceIndex];
        }
      }
      
      // Set properties based on tutorial type
      switch (activeTutorial.type) {
        case "what":
          utterance.rate = 1.2; // Faster for quick information
          utterance.pitch = 1.1;
          break;
        case "decision":
          utterance.rate = 1.0;
          utterance.pitch = 0.9;
          break;
      }
      
      // Events
      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => {
        setIsPlaying(false);
        clearTutorial(); // Auto-clear after speaking
      };
      utterance.onerror = () => {
        setIsPlaying(false);
        clearTutorial();
      };
      
      // Speak the tutorial immediately
      synth.speak(utterance);
    }
    
    return () => {
      if (synth) synth.cancel();
    };
  }, [activeTutorial, voiceEnabled]);
  
  return (
    <VoiceTutorialContext.Provider 
      value={{ activeTutorial, setTutorial, clearTutorial, voiceEnabled, toggleVoice, isPlaying }}
    >
      {children}
    </VoiceTutorialContext.Provider>
  );
};

export const useVoiceTutorial = () => {
  const context = useContext(VoiceTutorialContext);
  if (context === undefined) {
    throw new Error('useVoiceTutorial must be used within a VoiceTutorialProvider');
  }
  return context;
};
