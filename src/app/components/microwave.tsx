"use client";

import MicrowaveDoor from '@/app/components/microwave-door';
import MicrowaveTime from '@/app/components/microwave-time';
import MicrowaveButtons from '@/app/components/microwave-buttons';
import { useState } from 'react';
import { useSoundHum } from '@/app/hooks/useSoundHum';
import { useSoundTimer } from '@/app/hooks/useSoundTimer';

export type MicrowaveMode = 'clock' | 'input' | 'cook' | 'pause';

export default function Microwave(){
  const [mode, setMode] = useState<MicrowaveMode>('clock');
  const [timeInput, setTimeInput] = useState<string>('0000');
  const [secondsLeft, setSecondsLeft] = useState<number>(0);
  
  // parse timeInput into seconds, minutes
  const seconds = parseInt(timeInput.slice(2));
  const minutes = parseInt(timeInput.slice(0, 2));
  const totalSeconds = minutes * 60 + seconds;
  const isValidTime = (seconds < 60) && (totalSeconds > 0);

  const { beginHum, endHum } = useSoundHum();
  const { playBeeper, cancelBeeper } = useSoundTimer();

  function handleNumPress(num: number){
    if(mode !== 'input') return;
    setTimeInput((timeStr : string) => (
      (timeStr + num).slice(-4)
    ));
  }

  function handleCookTimePress(){
    setMode('input'); // set input mode
    setTimeInput('0000'); // reset input
    if(mode === 'cook'){
      endHum(); // stop hum if necessary
    }
  }

  function handleStartPress(){
    if(!isValidTime) return;
    // retain pause state
    setMode('cook');
    setSecondsLeft(totalSeconds);
    if(mode !== 'pause') beginHum(); // begin microwave hum unless paused
  }

  function handlePausePress(){
    if(mode === 'cook'){
      setMode('pause');
      endHum();
    } else if(mode === 'pause'){
      setMode('cook');
      beginHum();
    }
  }

  function handleCookEnd(){
    setMode('clock');
    // do not reset timeInput here, so START may remember the previous timer
    if(mode === 'cook') endHum();
  }

  function handleTimeAdd(){
    if(mode === 'cook' || mode === 'pause'){
      setSecondsLeft(s => s + 30);
    } else {
      setMode('cook');
      setSecondsLeft(30);
      beginHum();
    }
  }

  return (
    <div className="w-full h-[36em] max-w-[1280px] bg-zinc-400 p-12 flex rounded-lg shadow-2xl max-[448px]:px-4 max-[448px]:justify-center">
      <MicrowaveDoor 
        glow={mode === 'cook' || mode === 'pause'}
        onHandlePress={() => {
          cancelBeeper();
          handleCookEnd();
        }}
      />
      <div className="h-full w-2 bg-black max-[448px]:hidden" />
      <div className="w-60 h-full bg-zinc-900 rounded-r-lg flex flex-col gap-4 p-5 shrink-0 max-[448px]:w-full max-[448px]:rounded-lg max-[448px]:">
        <MicrowaveTime 
          mode={mode} 
          timeInput={timeInput}
          isValidTime={isValidTime}
          secondsLeft={secondsLeft}
          tickDown={() => setSecondsLeft(s => s - 1)}
          onTimerEnd={() => {
            playBeeper(); // play beeper when cooking completes
            handleCookEnd();
          }}
        />
        <MicrowaveButtons
          mode={mode}
          isValidTime={isValidTime}
          onNumPress={handleNumPress}
          onCookTimePress={handleCookTimePress}
          onStartPress={handleStartPress}
          onPausePress={handlePausePress}
          onStopPress={() => {
            cancelBeeper();
            handleCookEnd();
          }}
          onTimeAddPress={handleTimeAdd}
        />
      </div>
  </div>
  );
}