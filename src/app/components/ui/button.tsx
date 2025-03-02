import { PropsWithChildren } from 'react';
import { useSoundBeep } from '@/app/hooks/useSoundBeep';
import clsx from 'clsx';
import * as Tone from 'tone';

interface ButtonProps extends PropsWithChildren {
  className?: string,
  hoverClassName?: string, // override the button's default hover/active bg color changes
  beepNote?: Tone.Unit.Frequency,
  onClick?: () => void,
  disabled?: boolean
}

export default function Button({ className, hoverClassName, beepNote, onClick, disabled = false, children } : ButtonProps){
  const beep = useSoundBeep();

  return (
    <button 
      className={clsx(
        "text-2xl text-zinc-100 h-16 rounded-sm",
        hoverClassName || "enabled:hover:bg-sky-500/20 enabled:active:bg-sky-500/40",
        className
      )}
      disabled={disabled}
      onClick={() => {
        beep(beepNote);
        if(onClick) onClick();
      }}
    >
      {children}
    </button>
  );
}