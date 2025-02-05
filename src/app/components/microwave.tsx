"use client";

import MicrowaveDoor from '@/app/components/microwave-door';
import MicrowaveTime from '@/app/components/microwave-time';
import MicrowaveButtons from '@/app/components/microwave-buttons';
import { useState } from 'react';

export default function Microwave(){
  const [mode, setMode] = useState('clock');
  const [timeInput, setTimeInput] = useState('0000');
  const [secondsLeft, setSecondsLeft] = useState(0);

  function handleNumPress(num: number){
    if(mode !== 'input') return;
    setTimeInput((timeStr : string) => (
      (timeStr + num).slice(-4)
    ));
  }

  function handleCookTimePress(){
    setMode('input'); // set input mode
    setTimeInput('0000'); // reset input
  }

  function handleStartPress(){
    // parse timeInput into seconds, minutes
    const seconds = parseInt(timeInput.slice(2));
    const minutes = parseInt(timeInput.slice(0, 2));
    if(seconds >= 60 || timeInput === '0000') return;
    setMode('cook');
    setSecondsLeft(minutes * 60 + seconds);
  }

  function handleCookEnd(){
    setMode('clock');
    setTimeInput('0000');
  }

  function handleTimeAdd(){
    setMode('cook');
    if(mode === 'cook'){
      setSecondsLeft(s => s + 30);
    } else {
      setSecondsLeft(30);
    }
  }

  return (
    <div className="w-[80em] h-[36em] max-w-[1280px] w-full bg-zinc-400 p-12 flex rounded-lg shadow-2xl">
      <MicrowaveDoor 
        isCooking={mode ==='cook'}
        onHandlePress={handleCookEnd}
      />
      <div className="h-full w-2 bg-black" />
      <div className="w-60 h-full bg-zinc-900 rounded-r-lg flex flex-col gap-4 p-5 shrink-0">
        <MicrowaveTime 
          mode={mode} 
          timeInput={timeInput}
          secondsLeft={secondsLeft}
          tickDown={() => setSecondsLeft(s => s - 1)}
          onCookEnd={handleCookEnd}
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