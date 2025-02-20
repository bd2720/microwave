import { createContext } from 'react';

export const SoundSettingsContext = createContext({
  isAudible: false,
  setIsAudible: (newIsAudible: boolean) => {}
});