"use client";

import * as Tone from 'tone';
import { useSoundSettings } from '@/app/hooks/useSoundSettings';
import { useEffect, useRef } from 'react';

const note = 'B5';
const duration = '4n';
const numBeeps = 4;

export const useSoundTimer = () => {
  // extract gain level from sound settings
  const { gainLevel } = useSoundSettings();
  // ref object to persist the Synth instance
  const beeperRef = useRef<Tone.Synth>(null);

  // create beeper on mount, and whenever volume changes
  useEffect(() => {
    // create if not yet created
    if(!beeperRef.current){
      const beeper = new Tone.Synth({
        envelope: {
          release: 0.1
        }
      }).toDestination();
      beeperRef.current = beeper;
    }
    // set volume
    beeperRef.current.volume.value = gainLevel;
  }, [gainLevel]);

  // function to play beeper
  const playBeeper = () => {
    if(!beeperRef.current) return;
    // beep numBeeps times
    const now = Tone.now();
    for(let i = 0; i < numBeeps; i++){
      beeperRef.current.triggerAttackRelease(note, duration, now + i);
    }
  }

  // function to interrupt beeper (optional)
  const cancelBeeper = () => {
    if(!beeperRef.current) return;
    // create a new beeper to cancel triggered beeps
    beeperRef.current.disconnect();
    const beeper = new Tone.Synth({
      volume: gainLevel,
      envelope: {
        release: 0.1
      }
    }).toDestination();
    beeperRef.current = beeper;
  }

  return { playBeeper, cancelBeeper };
}