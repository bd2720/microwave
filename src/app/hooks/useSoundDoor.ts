"use client";

import * as Tone from 'tone';
import { useSoundSettings } from '@/app/hooks/useSoundSettings';
import { useRef, useEffect } from 'react';

const doorSample = "microwave-door-open-90798.mp3";

export const useSoundDoor = () => {
  // ref for Tone sample player
  const doorRef = useRef<Tone.Player>(null);
  // extract gain from settings
  const { gainLevel } = useSoundSettings();

  // effect to instantiate Player and update gain
  useEffect(() => {
    // if ref null, create Player
    if(!doorRef.current){
      const doorPlayer = new Tone.Player(doorSample).toDestination();
      doorRef.current = doorPlayer;
    }
    // set/update volume
    doorRef.current.volume.value = gainLevel;
  }, [gainLevel]);

  // function to play door sample
  const door = () => {
    if(doorRef.current && doorRef.current.loaded){
      doorRef.current.start(Tone.now(), 0.2, 0.9);
    }
  }

  return door;
}