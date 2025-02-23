import * as Tone from 'tone';

export const useSoundHum = () => {
  const humSynth = new Tone.Synth().toDestination();
  humSynth.volume.value = -12;
  // function to begin hum
  const beginHum = () => {
    const now = Tone.now();
    humSynth.triggerAttack("B1", now);
    console.log('begin hum');
  }

  // function to end hum
  const endHum = () => {
    const now = Tone.now();
    humSynth.triggerRelease(now);
    console.log('end hum');
  }

  return { beginHum, endHum };
}