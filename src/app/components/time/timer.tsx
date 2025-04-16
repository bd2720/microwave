"use client";

import { Dispatch, SetStateAction } from 'react';
import { formatTime } from '@/app/utils/time';
import { useTimer } from '@/app/hooks/useTimer';

interface TimerProps {
  millisecondsLeft: number
  isPaused: boolean
  setMillisecondsLeft: Dispatch<SetStateAction<number>>
  onTimerEnd: () => void
}

export default function Timer({ millisecondsLeft, isPaused, setMillisecondsLeft, onTimerEnd }: TimerProps){
  const isTicking = millisecondsLeft > 0;

  // begin timer
  useTimer(isTicking, isPaused, setMillisecondsLeft, onTimerEnd);
  
  return <>{isTicking ? formatTime(Math.ceil(millisecondsLeft / 1000)) : '00:01'}</>
}