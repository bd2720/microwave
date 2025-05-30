import { type MicrowaveMode } from '@/app/page';
import Clock from '@/app/components/time/clock';
import InputDisplay from '@/app/components/time/input-display';
import Timer from '@/app/components/time/timer';
import clsx from 'clsx';
import { Dispatch, SetStateAction } from 'react';

// detailed text to display for mode
const modeDisplayMap = {
  "clock": "TIME NOW",
  "input": "ENTER TIME",
  "cook": "COOKING",
  "pause": "PAUSED"
}; 

interface MicrowaveTimeProps {
  mode: MicrowaveMode
  timeInput: string
  isValidTime: boolean
  millisecondsLeft: number
  setMillisecondsLeft: Dispatch<SetStateAction<number>>
  onTimerEnd: () => void
}

export default function MicrowaveTime({ mode, timeInput, isValidTime, millisecondsLeft, setMillisecondsLeft, onTimerEnd }: MicrowaveTimeProps){
  const showInputInvalid = (mode === 'input' && !isValidTime && timeInput !== '0000');

  return (
    <div 
      className="relative bg-zinc-800 p-2 overflow-hidden h-16 flex justify-center items-center rounded-sm"
      role="status"
      aria-label="Microwave Display"
    >
      <p 
        className="text-lg text-sky-400 text-center text-nowrap"
        suppressHydrationWarning={mode === 'clock'}
        aria-label="Display Text"
      >
        {
          (mode === 'clock') ? 
            <Clock /> :
          (mode === 'input') ? 
            <InputDisplay timeInput={timeInput} /> :
            <Timer 
              millisecondsLeft={millisecondsLeft}
              isPaused={mode === 'pause'}
              setMillisecondsLeft={setMillisecondsLeft}
              onTimerEnd={onTimerEnd}
            />
        }
      </p>
      <p 
        className={clsx("absolute bottom-0 text-sm", (showInputInvalid) ? "text-red-500" : (mode === 'pause') ? "text-yellow-500" : "text-sky-500")}
        aria-label="Display Subtext"
      >
        {
          showInputInvalid ?
            "INVALID TIME" :
          modeDisplayMap[mode]
        }
      </p>
    </div>
  );
}