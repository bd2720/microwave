"use client";

import { SoundSettingsContext } from "@/app/contexts/soundSettingsContext";
import { PropsWithChildren, useEffect, useState } from "react";
import * as Tone from "tone";

interface SoundSettingsProviderProps extends PropsWithChildren {
  defaultIsAudible?: boolean
}

export default function SoundSettingsProvider({defaultIsAudible = false, children}: SoundSettingsProviderProps){
  const [isAudible, setIsAudible] = useState(defaultIsAudible);

  // effect to start Tone when isAudible
  useEffect(() => {
    if(isAudible && Tone.getContext().state !== 'running'){
      Tone.start().then(() => {
        console.log('Tone.js started successfully.');
      });
    }
  }, [isAudible]);
  
  return (
    <SoundSettingsContext.Provider value={{isAudible, setIsAudible}}>
      {children}
    </SoundSettingsContext.Provider>
  );
}