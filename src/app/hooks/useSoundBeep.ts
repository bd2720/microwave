import * as Tone from 'tone';
import { useSoundSettings } from './useSoundSettings';
import { useEffect, useRef } from 'react';

export const useSoundBeep = () => {

  const { isAudible } = useSoundSettings();
  // ref object to persist the Synth instance
  const beepRef = useRef<Tone.Synth>(null);
  // volume (-db) based on isAudible
  const vol = (isAudible) ? -18 : -9999;

  // function to play beep
  const beep = (note: Tone.Unit.Frequency = 'D#5') => {
    if(!beepRef.current){
      const beep = new Tone.Synth({
        volume: vol,
        envelope: {
          attack: 0.005,
          sustain: 0.5,
          release: 0.1
        }
      }).toDestination();
      beep.volume.value = vol;
      beepRef.current = beep;
    }
    beepRef.current.triggerAttackRelease(note, '16n');
  }

  // update Synth's volume whenever it changes
  useEffect(() => {
    if(beepRef.current){
      beepRef.current.volume.value = vol;
    }
  }, [vol])

  return beep;
}