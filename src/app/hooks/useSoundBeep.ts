"use client";

import * as Tone from 'tone';
import { useSoundSettings } from '@/app/hooks/useSoundSettings';
import { useEffect, useRef } from 'react';

export const useSoundBeep = () => {
  // extract gain level from sound settings
  const { gainLevel } = useSoundSettings();
  // ref object to persist the Synth instance
  const beepRef = useRef<Tone.Synth>(null);

  // function to play beep
  const beep = (note: Tone.Unit.Frequency = 'D#5') => {
    if(!beepRef.current){
      const beep = new Tone.Synth({
        volume: gainLevel,
        envelope: {
          attack: 0.005,
          sustain: 0.5,
          release: 0.1
        }
      }).toDestination();
      beepRef.current = beep;
    }
    beepRef.current.triggerAttackRelease(note, '16n');
  }

  // update Synth's volume whenever it changes
  useEffect(() => {
    if(beepRef.current){
      beepRef.current.volume.value = gainLevel;
    }
  }, [gainLevel]);

  return beep;
}