"use client";

import { useRef, useEffect } from 'react';
import { formatTime } from '@/app/utils/time';

interface TimerProps {
  secondsLeft: number
  isPaused: boolean
  tickDown: () => void
  onTimerEnd: () => void
}

export default function Timer({ secondsLeft, isPaused, tickDown, onTimerEnd }: TimerProps){
  const isTicking = secondsLeft > 0;
  
  // save functions, to avoid specifying as dependencies
  const tickDownRef = useRef(tickDown);
  const onTimerEndRef = useRef(onTimerEnd);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    if(!isTicking){
      onTimerEndRef.current();
    } else if(!isPaused) {
      timeoutId = setInterval(() => {
        tickDownRef.current(); // decrement seconds left
      }, 1000); // set interval every second
    }

    return () => clearInterval(timeoutId);
  }, [isTicking, isPaused]);

  return <>{isTicking ? formatTime(secondsLeft) : '00:01'}</>
}