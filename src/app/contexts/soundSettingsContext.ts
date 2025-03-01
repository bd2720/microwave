import { createContext } from 'react';
import { volumeToGain } from '@/app/utils/sound';

export const SoundSettingsContext = createContext({
  volumeLevel: 0,
  setVolumeLevel: (newVolumeLevel: number) => {},
  gainLevel: volumeToGain(0) // depends on volumeLevel
});