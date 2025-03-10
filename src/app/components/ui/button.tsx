import { PropsWithChildren } from 'react';
import { useSoundBeep } from '@/app/hooks/useSoundBeep';
import clsx from 'clsx';
import * as Tone from 'tone';

interface ButtonProps extends PropsWithChildren {
  className?: string
  hoverClassName?: string // override the button's default hover/active bg color changes
  subtitle?: string // text to appear under button content (within button)
  beepNote?: Tone.Unit.Frequency
  onClick?: () => void
  disabled?: boolean
}

export default function Button({ className, hoverClassName, subtitle, beepNote, onClick, disabled = false, children } : ButtonProps){
  const beep = useSoundBeep();

  return (
    <button 
      className={clsx(
        "relative text-2xl text-zinc-100 h-16 rounded-sm",
        hoverClassName || "enabled:hover:bg-sky-500/20 enabled:active:bg-sky-500/40",
        subtitle && "flex flex-col items-center justify-center",
        className
      )}
      disabled={disabled}
      onClick={() => {
        beep(beepNote);
        if(onClick) onClick();
      }}
    >
      {children}
      {subtitle && 
        <span className="absolute bottom-0.5 text-xs text-zinc-400">
          {subtitle}
        </span>
      }
    </button>
  );
}