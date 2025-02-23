import * as Tone from 'tone';
import { useSoundSettings } from './useSoundSettings';
import { useEffect, useRef } from 'react';

export const useSoundHum = () => {

  const { isAudible } = useSoundSettings();
  const vol = (isAudible) ? -18 : -9999;

  const humRef = useRef<Tone.Synth>(null);

  // function to begin hum
  const beginHum = () => {
    if(!humRef.current){
      const hum = new Tone.Synth().toDestination();
      hum.volume.value = vol;
      hum.envelope.release = 2;
      humRef.current = hum;
    }
    humRef.current.triggerAttack('B1');
  }

  // function to end hum
  const endHum = () => {
    if(!humRef.current) return;
    humRef.current.triggerRelease();
  }

  useEffect(() => {
    if(humRef.current){
      humRef.current.volume.value = vol;
    }
  }, [vol])

  return { beginHum, endHum };
}