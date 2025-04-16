"use client";

import MicrowaveDoor from '@/app/components/microwave-door';
import MicrowaveTime from '@/app/components/microwave-time';
import MicrowaveButtons from '@/app/components/microwave-buttons';
import { useState, useEffect, type Dispatch, type SetStateAction } from 'react';
import { useSoundTimer } from '@/app/hooks/useSoundTimer';
import { type MicrowaveMode } from '@/app/page';
import { formatTime } from '@/app/utils/time';

const pageTitle = "Microwave Timer | bd2720"; // can't import from metadata

interface MicrowaveProps {
  mode: MicrowaveMode
  setMode: Dispatch<SetStateAction<MicrowaveMode>>
  beginHum: () => void
  endHum: () => void
}

export default function Microwave({ mode, setMode, beginHum, endHum }: MicrowaveProps){
  const [timeInput, setTimeInput] = useState<string>('0000');
  const [millisecondsLeft, setMillisecondsLeft] = useState<number>(0);

  // parse timeInput into seconds, minutes
  const seconds = parseInt(timeInput.slice(2));
  const minutes = parseInt(timeInput.slice(0, 2));
  const totalSeconds = minutes * 60 + seconds;
  // permit seconds above 59
  const isValidTime = (minutes === 0 || seconds < 60) && (totalSeconds > 0);

  const { playBeeper, cancelBeeper } = useSoundTimer();

  // update tab title with time left
  useEffect(() => {
    document.title = (mode === 'cook' || mode === 'pause') ? `(${formatTime(Math.ceil(millisecondsLeft / 1000))}) ${pageTitle}` : pageTitle;
  }, [mode, millisecondsLeft]);

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
    setMode('cook');
    setMillisecondsLeft(totalSeconds * 1000);
    beginHum();
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
      setMillisecondsLeft(ms => ms + 30000);
    } else {
      setMode('cook');
      setMillisecondsLeft(30000);
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
          millisecondsLeft={millisecondsLeft}
          setMillisecondsLeft={setMillisecondsLeft}
          onTimerEnd={() => {
            cancelBeeper(); // cancel beeper if playing
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