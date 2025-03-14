"use client";

/* Sound settings */
import { useContext } from 'react';
import { SoundSettingsContext } from '@/app/contexts/soundSettingsContext';

export const useSoundSettings = () => {
  return useContext(SoundSettingsContext);
}