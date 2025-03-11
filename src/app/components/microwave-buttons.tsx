import { MicrowaveMode } from '@/app/components/microwave';
import Button from '@/app/components/ui/button';
import Numpad from '@/app/components/ui/numpad';

interface MicrowaveButtonProps {
  mode: MicrowaveMode
  isValidTime: boolean
  onNumPress: (num: number) => void
  onCookTimePress: () => void
  onStartPress: () => void
  onPausePress: () => void
  onStopPress: () => void
  onTimeAddPress: () => void
}

export default function MicrowaveButtons({ mode, isValidTime, onNumPress, onCookTimePress, onStartPress, onPausePress, onStopPress, onTimeAddPress }: MicrowaveButtonProps){
  return (
    <>
      <Numpad onNumPress={onNumPress} disabled={mode !== 'input'}>
        <div className="col-span-3 grid grid-cols-subgrid">
          <Button 
            className="text-sm"
            onClick={onCookTimePress}
          >
            Cook <div>Time</div>
          </Button>
          <Button 
            className="col-start-2"
            onClick={() => onNumPress(0)}
            disabled={mode !== 'input'}
          >
            0
          </Button> 
          <Button 
            className="text-sm col-start-3"
            onClick={onTimeAddPress}
          >
            Add <div className="text-nowrap">30 Sec</div>
          </Button> 
        </div>
      </Numpad>
      <div className="bg-zinc-800 grid grid-cols-3 rounded-sm">
        <Button
          className="text-sm border-b-4 border-green-400/50"
          hoverClassName="enabled:hover:bg-green-300/20 enabled:active:bg-green-400/40"
          subtitle="RESTART"
          onClick={onStartPress}
          beepNote="G#5"
          disabled={!isValidTime}
        >
          START
        </Button>
        <Button
          className="text-sm border-b-4 border-yellow-400/50"
          hoverClassName="enabled:hover:bg-yellow-300/20 enabled:active:bg-yellow-400/40"
          subtitle="RESUME"
          onClick={onPausePress}
          disabled={mode !== 'cook'}
        >
          PAUSE
        </Button>
        <Button
          className="text-sm border-b-4 border-red-400/50"
          hoverClassName="enabled:hover:bg-red-300/20 enabled:active:bg-red-400/40"
          subtitle="CLEAR"
          onClick={onStopPress}
          beepNote="G#4"
        >
          STOP
        </Button>
      </div>
    </>
  );
}