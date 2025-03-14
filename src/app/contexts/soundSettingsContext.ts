"use client";

import { createContext, type Dispatch, type SetStateAction } from 'react';
import { volumeToGain } from '@/app/utils/sound';

interface SoundSettingsContextType {
  volumeLevel: number
  setVolumeLevel: Dispatch<SetStateAction<number>>
  humEnabled: boolean
  setHumEnabled: Dispatch<SetStateAction<boolean>>
  gainLevel: number
}

export const SoundSettingsContext = createContext<SoundSettingsContextType>({
  volumeLevel: 0,
  setVolumeLevel: () => {},
  humEnabled: true, // whether microwave hum sound is active
  setHumEnabled: () => {},
  gainLevel: volumeToGain(0) // depends on volumeLevel
});