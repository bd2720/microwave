"use client";

import { useState, useRef, useEffect, Dispatch, SetStateAction } from 'react';
import { formatTime } from '@/app/utils/time';
import { now } from 'tone';

interface TimerProps {
  millisecondsLeft: number
  isPaused: boolean
  setMillisecondsLeft: Dispatch<SetStateAction<number>>
  onTimerEnd: () => void
}

export default function Timer({ millisecondsLeft, isPaused, setMillisecondsLeft, onTimerEnd }: TimerProps){
  // previous milliseconds
  const prevRef = useRef(Date.now());
  // whether we were paused on the previous interval
  const prevPausedRef = useRef(false);

  const isTicking = millisecondsLeft > 0;
  
  // save functions, to avoid specifying as dependencies
  const tickDownRef = useRef(setMillisecondsLeft);
  const onTimerEndRef = useRef(onTimerEnd);

  console.log(millisecondsLeft)

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const updateTimer = () => {
      // use Date for accuracy
      const now = Date.now();
      // calculate time elapsed from last setInterval
      const tElapsed = (now - prevRef.current);
      console.log(now, prevRef.current, tElapsed)
      // decrement seconds left
      tickDownRef.current(ms => ms - tElapsed);
      // update previous milliseconds
      prevRef.current = now;
    }

    if(!isTicking){
      onTimerEndRef.current();
    } else if(!isPaused) {
      // if coming back from a pause, reset the prev timestamp
      if(prevPausedRef.current){
        prevPausedRef.current = false; // if we were paused, unpause
        prevRef.current = Date.now();
      }
      timeoutId = setInterval(updateTimer, 1000);
    } else {
      // paused
      updateTimer();
      prevPausedRef.current = true;
    }
    console.log(prevPausedRef.current);
    return () => clearInterval(timeoutId);
  }, [isTicking, isPaused]);

  return <>{isTicking ? formatTime(Math.ceil(millisecondsLeft / 1000)) : '00:01'}</>
}