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
  const [volumeLevel, setVolume] = useState(defaultVolumeLevel);
  const [humEnabled, setHum] = useState(defaultHumEnabled);

  // wrap useState setters with localstorage save
  const setVolumeLevel = (vol: number) => {
    localStorage.setItem('volumeLevel', `${vol}`);
    setVolume(vol);
  }
  const setHumEnabled = (hum: boolean) => {
    localStorage.setItem('humEnabled', `${hum}`);
    setHum(hum);
  }

  // extract settings from local storage
  useEffect(() => {
    const localVolumeLevel = localStorage.getItem('volumeLevel');
    const localHumEnabled = localStorage.getItem('humEnabled');
    if(localVolumeLevel !== null) setVolumeLevel(parseInt(localVolumeLevel));
    if(localHumEnabled !== null) setHumEnabled(localHumEnabled === "true");
  }, []);

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