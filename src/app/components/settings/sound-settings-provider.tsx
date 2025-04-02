"use client";

import { SoundSettingsContext } from "@/app/contexts/soundSettingsContext";
import { PropsWithChildren, useEffect } from "react";
import * as Tone from "tone";
import { volumeToGain } from "@/app/utils/sound";
import { useStoredState } from "@/app/hooks/useStoredState";

interface SoundSettingsProviderProps extends PropsWithChildren {
  defaultVolumeLevel?: number
  defaultHumEnabled?: boolean
}

export default function SoundSettingsProvider({defaultVolumeLevel = 0, defaultHumEnabled = true, children}: SoundSettingsProviderProps){
  const [volumeLevel, setVolumeLevel] = useStoredState<number>("volumeLevel", defaultVolumeLevel);
  const [humEnabled, setHumEnabled] = useStoredState<boolean>("humEnabled", defaultHumEnabled);

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