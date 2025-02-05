"use client";

import { useEffect } from 'react';
import { formatTime } from '@/app/util/util';

interface TimerProps {
  secondsLeft: number,
  tickDown: () => void,
  onTimerEnd: () => void
}

export default function Timer({ secondsLeft, tickDown, onTimerEnd }: TimerProps){
  const isTicking = secondsLeft > 0;

  useEffect(() => {
    console.log(`Running Timer Effect... ${secondsLeft} seconds left.`);
    let timeoutId: ReturnType<typeof setTimeout>;

    if(!isTicking){
      onTimerEnd();
    } else {
      timeoutId = setInterval(() => {
        tickDown(); // decrement seconds left
      }, 1000); // set another 1s timeout
    }

    return () => clearTimeout(timeoutId);
  }, [isTicking]);

  return <>{isTicking ? formatTime(secondsLeft) : '00:01'}</>
}