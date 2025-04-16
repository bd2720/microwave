"use client";

import { useRef, useEffect, Dispatch, SetStateAction } from 'react';

/** Creates a running, pausable countdown timer. */
export const useTimer = (isTicking: boolean, isPaused: boolean, setMillisecondsLeft: Dispatch<SetStateAction<number>>, onTimerEnd: () => void) => {
  // previous milliseconds
  const prevRef = useRef(Date.now());
  // previous timestamp as a result of set interval (before pause)
  const prevPausedRef = useRef<number | null>(null);

  // save functions, to avoid specifying as dependencies
  const tickDownRef = useRef(setMillisecondsLeft);
  const onTimerEndRef = useRef(onTimerEnd);

  // timer effect
  useEffect(() => {
    let intervalId: ReturnType<typeof setTimeout>;
    let timeoutId: ReturnType<typeof setTimeout>;

    const updateTimer = () => {
      // use Date for accuracy
      const now = Date.now();
      // calculate time elapsed from last setInterval
      const tElapsed = (now - prevRef.current);
      // decrement seconds left
      tickDownRef.current(ms => ms - tElapsed);
      // update previous milliseconds
      prevRef.current = now;
    }

    if(!isTicking){
      // allow pause to preserve timer
      if(!isPaused) onTimerEndRef.current();
    } else if(!isPaused) {
      if(prevPausedRef.current !== null){
        // (coming back from a pause) calculate remaining second
        const millisecondsLeftover = Math.max(1000 - (prevRef.current - prevPausedRef.current), 0);
        // update timestamps
        prevPausedRef.current = null;
        prevRef.current = Date.now();
        // wait out the remaining second, then continue the interval
        timeoutId = setTimeout(() => {
          updateTimer();
          intervalId = setInterval(updateTimer, 1000);
        }, millisecondsLeftover);
      } else {
        intervalId = setInterval(updateTimer, 1000);
      }
    } else {
      // (paused) save last timestamp before pause
      prevPausedRef.current = prevRef.current;
      updateTimer();
    }
    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    }

  }, [isTicking, isPaused]);
}