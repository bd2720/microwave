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
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const isCooking = (mode === 'cook');

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
    if(isCooking){
      setIsPaused(false);
      endHum(); // stop hum if necessary
    }
  }

  function handleStartPress(){
    if(!isValidTime) return;
    setMode('cook');
    setSecondsLeft(totalSeconds);
    if(!isPaused) beginHum(); // begin microwave hum unless paused
  }

  function handlePausePress(){
    if(!isCooking) return;
    setIsPaused(paused => !paused);
    // control hum depending on previous isPaused
    isPaused ? beginHum() : endHum();
  }

  function handleCookEnd(){
    setMode('clock');
    setIsPaused(false);
    // do not reset timeInput here, so START may remember the previous timer
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
        onHandlePress={() => {
          cancelBeeper();
          handleCookEnd();
        }}
      />
      <div className="h-full w-2 bg-black" />
      <div className="w-60 h-full bg-zinc-900 rounded-r-lg flex flex-col gap-4 p-5 shrink-0">
        <MicrowaveTime 
          mode={mode} 
          timeInput={timeInput}
          isValidTime={isValidTime}
          secondsLeft={secondsLeft}
          isPaused={isPaused}
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