import Button from '@/app/components/ui/button';
import Numpad from '@/app/components/ui/numpad';

interface MicrowaveButtonProps {
  onNumPress: (num: number) => void,
  onCookTimePress: () => void,
  onStartPress: () => void,
  onStopPress: () => void,
  onTimeAddPress: () => void
}

export default function MicrowaveButtons({ onNumPress, onCookTimePress, onStartPress, onStopPress, onTimeAddPress }: MicrowaveButtonProps){
  return (
    <>
      <Numpad onNumPress={onNumPress}>
        <div className="col-span-3 grid grid-cols-subgrid">
          <Button 
            className="col-start-2 hover:bg-sky-500/20 active:bg-sky-500/40"
            onClick={() => onNumPress(0)}
          >
            0
          </Button> 
          <Button 
            className=" text-sm col-start-3 hover:bg-sky-500/20 active:bg-sky-500/40"
            onClick={onTimeAddPress}
          >
            Add <span className="text-nowrap">30 Sec</span>
          </Button> 
        </div>
      </Numpad>
      <div className="bg-zinc-800 grid grid-cols-3 rounded-sm">
        <Button 
          className="text-sm hover:bg-sky-500/20 active:bg-sky-500/40"
          onClick={onCookTimePress}
        >
          Cook Time
        </Button>
        <Button
          className="text-sm  border-b-4 border-green-400/50 hover:bg-green-300/20 active:bg-green-400/40 p-1"
          onClick={onStartPress}
          beepNote="G#5"
        >
          START
        </Button>
        <Button
          className="text-sm border-b-4 border-red-400/50 hover:bg-red-300/20 active:bg-red-400/40"
          onClick={onStopPress}
          beepNote="G#4"
        >
          STOP
        </Button>
      </div>
    </>
  );
}