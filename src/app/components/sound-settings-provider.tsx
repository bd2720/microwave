"use client";

import { SoundSettingsContext } from "@/app/contexts/soundSettingsContext";
import { PropsWithChildren, useEffect, useState } from "react";
import * as Tone from "tone";
import { volumeToGain } from "@/app/utils/sound";

interface SoundSettingsProviderProps extends PropsWithChildren {
  defaultVolumeLevel?: number
}

export default function SoundSettingsProvider({defaultVolumeLevel = 0, children}: SoundSettingsProviderProps){
  const [volumeLevel, setVolumeLevel] = useState(defaultVolumeLevel);
  const isAudible = volumeLevel > 0;
  // effect to start Tone when isAudible
  useEffect(() => {
    if(isAudible && Tone.getContext().state !== 'running'){
      Tone.start().then(() => {
        console.log('Tone.js started successfully.');
      });
    }
  }, [isAudible]);

  // calculate gain
  const gainLevel = volumeToGain(volumeLevel);
  
  return (
    <SoundSettingsContext.Provider value={{volumeLevel, setVolumeLevel, gainLevel}}>
      {children}
    </SoundSettingsContext.Provider>
  );
}