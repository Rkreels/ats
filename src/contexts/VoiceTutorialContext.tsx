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
  
  // Browser's SpeechSynthesis API
  const synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
  
  const setTutorial = (text: string, type: VoiceTutorialType) => {
    setActiveTutorial({ text, type });
  };
  
  const clearTutorial = () => {
    setActiveTutorial(null);
    if (synth) synth.cancel();
    setIsPlaying(false);
  };
  
  const toggleVoice = () => {
    setVoiceEnabled(prev => !prev);
    if (!voiceEnabled && synth) synth.cancel();
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
          utterance.rate = 1.1; // Slightly faster for quick information
          utterance.pitch = 1.1;
          break;
        case "decision":
          utterance.rate = 0.95;
          utterance.pitch = 0.9;
          break;
      }
      
      // Events
      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      
      // Speak the tutorial
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
