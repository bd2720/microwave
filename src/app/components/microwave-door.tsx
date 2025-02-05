import clsx from 'clsx';

interface MicrowaveDoorProps {
  isCooking: boolean,
  onHandlePress: () => void
}

export default function MicrowaveDoor({ isCooking, onHandlePress }: MicrowaveDoorProps){
  return (
    <div className="relative w-4/5 h-full bg-zinc-900 rounded-l-lg p-8">
      <button 
        className="absolute top-12 right-4 h-96 w-8 z-10 rounded-md bg-gradient-to-b from-zinc-400 via-zinc-300 to-zinc-400 hover:ring-4 ring-sky-500/40 active:ring-sky-500/60" 
        onClick={onHandlePress}
      />
      <div className={clsx('w-full h-full rounded-sm transition duration-200', (isCooking) ? 'bg-amber-200/40' : 'bg-black/40')} />
    </div>
  );
}