import { PropsWithChildren } from 'react';
import { useSoundBeep } from '@/app/hooks/useSoundBeep';
import clsx from 'clsx';
import * as Tone from 'tone';

interface ButtonProps extends PropsWithChildren {
  className?: string,
  onClick?: () => void,
  beepNote?: Tone.Unit.Frequency
}

export default function Button({ className, onClick, beepNote, children } : ButtonProps){
  const beep = useSoundBeep();

  return (
    <button 
      className={clsx("text-2xl text-zinc-100 h-16 rounded-sm", className)}
      onClick={() => {
        beep(beepNote);
        if(onClick) onClick();
      }}
    >
      {children}
    </button>
  );
}