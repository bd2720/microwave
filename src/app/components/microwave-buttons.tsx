import { MicrowaveMode } from '@/app/components/microwave';
import Button from '@/app/components/ui/button';
import Numpad from '@/app/components/ui/numpad';

interface MicrowaveButtonProps {
  mode: MicrowaveMode,
  onNumPress: (num: number) => void,
  onCookTimePress: () => void,
  onStartPress: () => void,
  onStopPress: () => void,
  onTimeAddPress: () => void
}

export default function MicrowaveButtons({ mode, onNumPress, onCookTimePress, onStartPress, onStopPress, onTimeAddPress }: MicrowaveButtonProps){
  return (
    <>
      <Numpad onNumPress={onNumPress} disabled={mode !== 'input'}>
        <div className="col-span-3 grid grid-cols-subgrid">
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
            Add <span className="text-nowrap">30 Sec</span>
          </Button> 
        </div>
      </Numpad>
      <div className="bg-zinc-800 grid grid-cols-3 rounded-sm">
        <Button 
          className="text-sm"
          onClick={onCookTimePress}
        >
          Cook Time
        </Button>
        <Button
          className="text-sm border-b-4 border-green-400/50 p-1"
          hoverClassName="hover:bg-green-300/20 active:bg-green-400/40"
          onClick={onStartPress}
          beepNote="G#5"
        >
          START
        </Button>
        <Button
          className="text-sm border-b-4 border-red-400/50"
          hoverClassName="hover:bg-red-300/20 active:bg-red-400/40"
          onClick={onStopPress}
          beepNote="G#4"
        >
          STOP
        </Button>
      </div>
    </>
  );
}