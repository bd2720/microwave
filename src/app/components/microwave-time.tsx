import { type MicrowaveMode } from '@/app/components/microwave';
import Clock from '@/app/components/time/clock';
import InputDisplay from '@/app/components/time/input-display';
import Timer from '@/app/components/time/timer';
import clsx from 'clsx';

// detailed text to display for mode
const modeDisplayMap = {
  "clock": "TIME NOW",
  "input": "ENTER TIME",
  "cook": "COOKING"
}; 

interface MicrowaveTimeProps {
  mode: MicrowaveMode
  timeInput: string
  isValidTime: boolean
  secondsLeft: number
  isPaused: boolean
  tickDown: () => void
  onTimerEnd: () => void
}

export default function MicrowaveTime({ mode, timeInput, isValidTime, secondsLeft, isPaused, tickDown, onTimerEnd }: MicrowaveTimeProps){
  const showInputInvalid = (mode === 'input' && !isValidTime && timeInput !== '0000');

  return (
    <div className="relative bg-zinc-800 p-2 overflow-hidden h-16 flex justify-center items-center rounded-sm">
      <p 
        className="text-lg text-sky-400 text-center text-nowrap"
        suppressHydrationWarning={mode === 'clock'}
      >
        {
          (mode === 'clock') ? 
            <Clock /> :
          (mode === 'input') ? 
            <InputDisplay timeInput={timeInput} /> :
          (mode === 'cook') ? 
            <Timer 
              secondsLeft={secondsLeft}
              isPaused={isPaused}
              tickDown={tickDown}
              onTimerEnd={onTimerEnd}
            /> :
          <p className="text-red-500">ERROR</p>
        }
      </p>
      <p className={clsx("absolute bottom-0 text-sm", (showInputInvalid) ? "text-red-500" : (isPaused) ? "text-yellow-500" : "text-sky-500")}>
        {
          showInputInvalid ?
            "INVALID TIME" :
          isPaused ?
            "PAUSED" :
          modeDisplayMap[mode]
        }
      </p>
    </div>
  );
}