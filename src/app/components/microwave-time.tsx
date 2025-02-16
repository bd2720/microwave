import { type MicrowaveMode } from '@/app/components/microwave';
import Clock from '@/app/components/time/clock';
import InputDisplay from '@/app/components/time/input-display';
import Timer from '@/app/components/time/timer';

// detailed text to display for mode
const modeDisplayMap = {
  "clock": "TIME NOW",
  "input": "ENTER TIME",
  "cook": "COOKING"
}; 

interface MicrowaveTimeProps {
  mode: MicrowaveMode,
  timeInput: string,
  secondsLeft: number,
  tickDown: () => void,
  onCookEnd: () => void
}

export default function MicrowaveTime({ mode, timeInput, secondsLeft, tickDown, onCookEnd }: MicrowaveTimeProps){
  return (
    <div className="relative bg-zinc-800 p-2 overflow-hidden h-16 flex justify-center items-center rounded-sm">
      <p className="text-lg text-sky-400 text-center text-nowrap">
        {
          (mode === 'clock') ? 
            <Clock /> :
          (mode === 'input') ? 
            <InputDisplay timeInput={timeInput} /> :
          (mode === 'cook') ? 
            <Timer 
              secondsLeft={secondsLeft}
              tickDown={tickDown}
              onTimerEnd={onCookEnd}
            /> :
          <p className="text-red-500">ERROR</p>
        }
      </p>
      <p className="absolute bottom-0 text-sky-500 text-sm">
        {modeDisplayMap[mode] ?? "INVALID MODE"}
      </p>
    </div>
  );
}