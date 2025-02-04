import Clock from '@/app/components/time/clock';
import InputDisplay from '@/app/components/time/input-display';
import Timer from '@/app/components/time/timer';

interface MicrowaveTimeProps {
  mode: string,
  timeInput: string,
  secondsLeft: number,
  tickDown: () => void,
  onCookEnd: () => void
}

export default function MicrowaveTime(props: MicrowaveTimeProps){
  return (
    <div className="bg-zinc-800 p-2 overflow-hidden h-16 flex justify-center items-center rounded-sm">
      <p className="text-lg text-sky-400 text-center text-nowrap">
        <MicrowaveTimeDisplay {...props} />
      </p>
    </div>
  );
}

function MicrowaveTimeDisplay({ mode, timeInput, secondsLeft, tickDown, onCookEnd }: MicrowaveTimeProps){
  switch(mode){
    case 'clock': {
      return <Clock />
    }
    case 'input': {
      return <InputDisplay timeInput={timeInput} />
    }
    case 'cook': {
      return (
        <Timer 
          secondsLeft={secondsLeft}
          tickDown={tickDown}
          onTimerEnd={onCookEnd}
        />
      )
    }
  }
}