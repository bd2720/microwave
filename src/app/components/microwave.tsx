"use client";

import MicrowaveDoor from '@/app/components/microwave-door';
import MicrowaveTime from '@/app/components/microwave-time';
import MicrowaveButtons from '@/app/components/microwave-buttons';
import { useState } from 'react';
import { useSoundHum } from '@/app/hooks/useSoundHum';
import { useSoundTimer } from '@/app/hooks/useSoundTimer';

export type MicrowaveMode = 'clock' | 'input' | 'cook';

export default function Microwave(){
  const [mode, setMode] = useState<MicrowaveMode>('clock');
  const [timeInput, setTimeInput] = useState<string>('0000');
  const [secondsLeft, setSecondsLeft] = useState<number>(0);

  const isCooking = (mode === 'cook');

  const { beginHum, endHum } = useSoundHum();
  const beeper = useSoundTimer();

  function handleNumPress(num: number){
    if(mode !== 'input') return;
    setTimeInput((timeStr : string) => (
      (timeStr + num).slice(-4)
    ));
  }

  function handleCookTimePress(){
    setMode('input'); // set input mode
    setTimeInput('0000'); // reset input
    if(mode === 'cook') endHum(); // stop hum if necessary
  }

  function handleStartPress(){
    // parse timeInput into seconds, minutes
    const seconds = parseInt(timeInput.slice(2));
    const minutes = parseInt(timeInput.slice(0, 2));
    if(seconds >= 60 || timeInput === '0000') return;
    const totalSeconds = minutes * 60 + seconds;
    setMode('cook');
    setSecondsLeft(totalSeconds);
    // begin microwave hum
    beginHum();
  }

  function handleCookEnd(){
    setMode('clock');
    setTimeInput('0000');
    endHum();
  }

  function handleTimeAdd(){
    setMode('cook');
    if(isCooking){
      setSecondsLeft(s => s + 30);
    } else {
      setSecondsLeft(30);
      beginHum();
    }
  }

  return (
    <div className="w-[80em] h-[36em] max-w-[1280px] w-full bg-zinc-400 p-12 flex rounded-lg shadow-2xl">
      <MicrowaveDoor 
        isCooking={isCooking}
        onHandlePress={handleCookEnd}
      />
      <div className="h-full w-2 bg-black" />
      <div className="w-60 h-full bg-zinc-900 rounded-r-lg flex flex-col gap-4 p-5 shrink-0">
        <MicrowaveTime 
          mode={mode} 
          timeInput={timeInput}
          secondsLeft={secondsLeft}
          tickDown={() => setSecondsLeft(s => s - 1)}
          onCookEnd={() => {
            beeper(); // play beeper when cooking completes
            handleCookEnd();
          }}
        />
        <MicrowaveButtons 
          onNumPress={handleNumPress}
          onCookTimePress={handleCookTimePress}
          onStartPress={handleStartPress}
          onStopPress={handleCookEnd}
          onTimeAddPress={handleTimeAdd}
        />
      </div>
  </div>
  );
}