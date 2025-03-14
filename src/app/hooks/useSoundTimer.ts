"use client";

import * as Tone from 'tone';
import { useSoundSettings } from '@/app/hooks/useSoundSettings';
import { useEffect, useRef, useCallback } from 'react';

const note = 'B5';
const duration = '4n';
const numBeeps = 4;

export const useSoundTimer = () => {
  // extract gain level from sound settings
  const { gainLevel } = useSoundSettings();
  // ref object to persist the Synth instance
  const beeperRef = useRef<Tone.Synth>(null);

  // create beeper, redefine when gain changes
  const createBeeper = useCallback(() => {
    const beeper = new Tone.Synth({
      volume: gainLevel,
      envelope: {
        release: 0.1
      }
    }).toDestination();
    return beeper;
  }, [gainLevel]);

  // function to play beeper
  const playBeeper = () => {
    beeperRef.current = createBeeper();
    const now = Tone.now();
    // beep numBeeps times
    for(let i = 0; i < numBeeps; i++){
      beeperRef.current.triggerAttackRelease(note, duration, now + i);
    }
  }

  // function to interrupt beeper (optional)
  const cancelBeeper = () => {
    if(beeperRef.current){
      // create a new beeper to cancel
      beeperRef.current.disconnect();
      beeperRef.current = createBeeper();
    }
  }

  // update Synth's volume whenever it changes
  useEffect(() => {
    if(beeperRef.current){
      beeperRef.current.volume.value = gainLevel;
    } else { // create beeper if it doesn't exist (in case volume is turned on while cooking)
      beeperRef.current = createBeeper();
    }
  }, [gainLevel, createBeeper]);

  return { playBeeper, cancelBeeper };
}