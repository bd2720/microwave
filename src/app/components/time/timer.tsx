"use client";

import { useState, useEffect } from 'react';
import { formatTime } from '@/app/util/util';

interface TimerProps {
  duration: number,
  onTimerEnd: () => void
}

export default function Timer({ duration, onTimerEnd }: TimerProps){
  const [secondsLeft, setSecondsLeft] = useState(duration);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    if(secondsLeft <= 0){
      onTimerEnd();
    } else {
      timeoutId = setTimeout(() => {
        setSecondsLeft(s => s - 1); // decrement seconds left
      }, 1000); // set another 1s timeout
    }

    return () => clearTimeout(timeoutId);
  }, [secondsLeft]);

  return <>{(secondsLeft > 0) ? formatTime(secondsLeft) : '00:01'}</>
}