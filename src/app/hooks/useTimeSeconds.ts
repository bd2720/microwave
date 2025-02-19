/* Returns the current date/time, updated every second */
import { useState, useEffect } from 'react';

export const useTimeSeconds = () => {
const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return time;
}