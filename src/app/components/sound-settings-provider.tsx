"use client";

import { SoundSettingsContext } from "@/app/contexts/soundSettingsContext";
import { PropsWithChildren, useEffect, useState } from "react";
import * as Tone from "tone";
import { volumeToGain } from "@/app/utils/sound";

interface SoundSettingsProviderProps extends PropsWithChildren {
  defaultVolumeLevel?: number
  defaultHumEnabled?: boolean
}

export default function SoundSettingsProvider({defaultVolumeLevel = 0, defaultHumEnabled = true, children}: SoundSettingsProviderProps){
  const [volumeLevel, setVolumeLevel] = useState(defaultVolumeLevel);
  const [humEnabled, setHumEnabled] = useState(defaultHumEnabled);

  // effect to start Tone when isAudible
  const isAudible = volumeLevel > 0;
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
    <SoundSettingsContext.Provider value={{volumeLevel, setVolumeLevel, humEnabled, setHumEnabled, gainLevel}}>
      {children}
    </SoundSettingsContext.Provider>
  );
}