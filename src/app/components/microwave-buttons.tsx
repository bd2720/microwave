import Button from '@/app/components/ui/button';

interface MicrowaveButtonProps {
  onNumPress: (num: number) => void,
  onCookTimePress: () => void,
  onStartPress: () => void,
  onStopPress: () => void,
}

export default function MicrowaveButtons({ onNumPress, onCookTimePress, onStartPress, onStopPress }: MicrowaveButtonProps){
  return (
    <>
    <div className="bg-zinc-800 grid grid-cols-3 rounded-sm">
      {[...Array(9).keys()].map((n) => {
        return (
          <Button 
            key={n+1}
            className="hover:bg-sky-500/20 active:bg-sky-500/40"
            onClick={() => onNumPress(n+1)}
          >
            {n+1}
          </Button>
        )
      })}
        <div className="col-span-3 grid grid-cols-subgrid">
          <Button 
            className="col-start-2 hover:bg-sky-500/20 active:bg-sky-500/40"
            onClick={() => onNumPress(0)}
          >
            0
          </Button> 
      </div>
    </div>
    <div className="bg-zinc-800 grid grid-cols-3 rounded-sm">
      <Button 
        className="text-sm hover:bg-sky-500/20 active:bg-sky-500/40"
        onClick={onCookTimePress}
      >
        Cook Time
      </Button>
      <Button
        className="text-sm border-2 border-green-400/50 hover:bg-green-300/20 active:bg-green-400/40"
        onClick={onStartPress}
      >
        START
      </Button>
      <Button
        className="text-sm border-2 border-red-400/50 hover:bg-red-300/20 active:bg-red-400/40"
        onClick={onStopPress}
      >
        STOP
      </Button>
    </div>
    </>
  );
}