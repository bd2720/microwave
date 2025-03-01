import { createContext } from 'react';
import { volumeToGain } from '@/app/utils/sound';

export const SoundSettingsContext = createContext({
  volumeLevel: 0,
  setVolumeLevel: (newVolumeLevel: number) => {},
  humEnabled: true, // whether microwave hum sound is active
  setHumEnabled: (newHumEnabled: boolean) => {},
  gainLevel: volumeToGain(0) // depends on volumeLevel
});