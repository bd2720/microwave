import * as Tone from 'tone';
import { useSoundSettings } from './useSoundSettings';
import { useEffect, useRef } from 'react';

export const useSoundHum = () => {
  // extract gain level from sound settings
  const { gainLevel } = useSoundSettings();
  // ref object to persist the Synth instance
  const humRef = useRef<Tone.Synth>(null);

  // function to begin hum
  const beginHum = () => {
    if(!humRef.current){
      const hum = new Tone.Synth().toDestination();
      hum.volume.value = gainLevel;
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

  // update Synth's volume whenever it changes
  useEffect(() => {
    if(humRef.current){
      humRef.current.volume.value = gainLevel;
    }
  }, [gainLevel])

  return { beginHum, endHum };
}