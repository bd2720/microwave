"use client";

import MicrowaveTime from '@/app/components/microwave-time';
import MicrowaveButtons from '@/app/components/microwave-buttons';
import { useState } from 'react';
import clsx from 'clsx';

export default function Microwave(){
  const [mode, setMode] = useState('clock');
  const [timeInput, setTimeInput] = useState('0000');

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
    // parse minutes
    const seconds = parseInt(timeInput.slice(2));
    if(seconds >= 60) return;
    setMode('cook');
  }

  function handleCookEnd(){
    setMode('clock');
  }

  return (
    <div className="w-[80em] h-[36em] max-w-[1280px] w-full bg-zinc-400 p-12 flex rounded-lg shadow-2xl">
      <div className="relative w-4/5 h-full bg-zinc-900 rounded-l-lg p-8">
        <div className="absolute top-12 right-4 h-96 w-8 bg-zinc-300 z-10 rounded-md" />
        <div className={clsx('w-full h-full rounded-sm transition duration-200', (mode === 'cook') ? 'bg-amber-200/40' : 'bg-black/40')} />
      </div>
      <div className="h-full w-2 bg-black" />
      <div className="w-1/5 h-full bg-zinc-900 rounded-r-lg flex flex-col gap-4 p-5">
        <MicrowaveTime 
          mode={mode} 
          timeInput={timeInput}
          onCookEnd={handleCookEnd}
        />
        <MicrowaveButtons 
          onNumPress={handleNumPress}
          onCookTimePress={handleCookTimePress}
          onStartPress={handleStartPress}
          onStopPress={handleCookEnd}
        />
      </div>
  </div>
  );
}