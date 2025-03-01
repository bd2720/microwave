import * as Tone from 'tone';
import { useSoundSettings } from '@/app/hooks/useSoundSettings';
import { useEffect, useRef } from 'react';

export const useSoundHum = () => {
  // extract gain level + hum status from sound settings
  const { gainLevel, humEnabled } = useSoundSettings();
  // mute if hum is not enabled
  const humGainLevel = humEnabled ? gainLevel : -Infinity;

  // ref object to persist the Synth instance
  const humRef = useRef<Tone.Synth>(null);

  // function to begin hum
  const beginHum = () => {
    if(!humRef.current){
      const hum = new Tone.Synth().toDestination();
      hum.volume.value = humGainLevel;
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
      humRef.current.volume.value = humGainLevel;
    }
  }, [humGainLevel])

  return { beginHum, endHum };
}