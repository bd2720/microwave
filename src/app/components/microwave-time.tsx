import { type MicrowaveMode } from '@/app/page';
import Clock from '@/app/components/time/clock';
import InputDisplay from '@/app/components/time/input-display';
import Timer from '@/app/components/time/timer';
import clsx from 'clsx';

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
  secondsLeft: number
  tickDown: () => void
  onTimerEnd: () => void
}

export default function MicrowaveTime({ mode, timeInput, isValidTime, secondsLeft, tickDown, onTimerEnd }: MicrowaveTimeProps){
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
            <Timer 
              secondsLeft={secondsLeft}
              isPaused={mode === 'pause'}
              tickDown={tickDown}
              onTimerEnd={onTimerEnd}
            />
        }
      </p>
      <p className={clsx("absolute bottom-0 text-sm", (showInputInvalid) ? "text-red-500" : (mode === 'pause') ? "text-yellow-500" : "text-sky-500")}>
        {
          showInputInvalid ?
            "INVALID TIME" :
          modeDisplayMap[mode]
        }
      </p>
    </div>
  );
}