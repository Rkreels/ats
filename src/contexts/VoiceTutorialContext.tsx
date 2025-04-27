
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
  voicePersona: string;
  setVoicePersona: (persona: string) => void;
  voiceSpeed: string;
  setVoiceSpeed: (speed: string) => void;
}

const VoiceTutorialContext = createContext<VoiceTutorialContextType | undefined>(undefined);

export const VoiceTutorialProvider = ({ children }: { children: ReactNode }) => {
  const [activeTutorial, setActiveTutorial] = useState<VoiceTutorialContent | null>(null);
  const [voiceEnabled, setVoiceEnabled] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [voiceQueue, setVoiceQueue] = useState<VoiceTutorialContent[]>([]);
  // Add state for voice persona and speed
  const [voicePersona, setVoicePersona] = useState<string>("professional");
  const [voiceSpeed, setVoiceSpeed] = useState<string>("slow");
  
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
      // Add a small delay before playing the next item to prevent overlapping
      setTimeout(() => {
        const nextTutorial = voiceQueue[0];
        setVoiceQueue(prev => prev.slice(1));
        setActiveTutorial(nextTutorial);
      }, 500);
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
      
      // Use different voices based on persona
      const voices = synth.getVoices();
      
      if (voices.length > 0) {
        let voiceIndex = 0;
        
        // Select voice based on persona preference
        switch (voicePersona) {
          case "friendly":
            voiceIndex = voices.findIndex(v => v.name.includes("Female") || v.name.includes("Samantha"));
            break;
          case "professional":
            voiceIndex = voices.findIndex(v => v.name.includes("Male") || v.name.includes("Alex"));
            break;
          case "technical":
            voiceIndex = voices.findIndex(v => v.name.includes("Daniel") || v.name.includes("Male"));
            break;
          case "mentor":
            voiceIndex = voices.findIndex(v => v.name.includes("Karen") || v.name.includes("Female"));
            break;
          default:
            // Default voice
            voiceIndex = 0;
        }
        
        if (voiceIndex !== -1) {
          utterance.voice = voices[voiceIndex];
        }
      }
      
      // Set speech rate based on user preference
      switch (voiceSpeed) {
        case "slow":
          utterance.rate = 0.8; // Slower for non-English speakers
          utterance.pitch = 1.0;
          break;
        case "normal":
          utterance.rate = 1.0;
          utterance.pitch = 1.0;
          break;
        case "fast":
          utterance.rate = 1.2;
          utterance.pitch = 1.0;
          break;
        default:
          utterance.rate = 0.8; // Default to slow
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
  }, [activeTutorial, voiceEnabled, voicePersona, voiceSpeed]);
  
  return (
    <VoiceTutorialContext.Provider 
      value={{ 
        activeTutorial, 
        setTutorial, 
        clearTutorial, 
        voiceEnabled, 
        toggleVoice, 
        isPlaying, 
        voicePersona, 
        setVoicePersona,
        voiceSpeed,
        setVoiceSpeed
      }}
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
