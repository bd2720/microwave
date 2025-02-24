import * as Tone from 'tone';
import { useSoundSettings } from './useSoundSettings';
import { useEffect, useRef } from 'react';

export const useSoundTimer = () => {
  // ref object to persist the Synth instance
  const beeperRef = useRef<Tone.Synth>(null);

  const { isAudible } = useSoundSettings();
  // volume (-db) based on isAudible
  const vol = (isAudible) ? -18 : -9999;

  // function to play beeper
  const beeper = () => {
    if(!beeperRef.current){
      const beeper = new Tone.Synth({
        volume: vol,
        envelope: {
          release: 0.1
        }
      }).toDestination();
      beeperRef.current = beeper;
    }
    const note = 'B5';
    const duration = '4n';
    const now = Tone.now();
    const numBeeps = 4;
    // beep numBeeps times
    for(let i = 0; i < numBeeps; i++){
      beeperRef.current.triggerAttackRelease(note, duration, now + i);
    }
  }

  // update Synth's volume whenever it changes
  useEffect(() => {
    if(beeperRef.current){
      beeperRef.current.volume.value = vol;
    }
  }, [vol])

  return beeper;
}