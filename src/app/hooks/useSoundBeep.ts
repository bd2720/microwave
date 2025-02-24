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
  const beep = (isHigh: boolean = false) => {
    if(!beepRef.current){
      const beep = new Tone.Synth().toDestination();
      beep.volume.value = vol;
      beep.envelope.release = 0.15;
      beep.envelope.attack = 0.005;
      beep.envelope.sustain = 0.5;
      beepRef.current = beep;
    }
    const note = (isHigh) ? 'G#5' : 'D#5';
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