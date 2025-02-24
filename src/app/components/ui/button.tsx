import { PropsWithChildren } from 'react';
import { useSoundBeep } from '@/app/hooks/useSoundBeep';
import clsx from 'clsx';

interface ButtonProps extends PropsWithChildren {
  className?: string,
  onClick?: () => void,
  isImportant?: boolean // if isImportant, will beep higher than normal
}

export default function Button({ className, onClick, isImportant = false, children } : ButtonProps){
  const beep = useSoundBeep();

  return (
    <button 
      className={clsx("text-2xl text-zinc-100 h-16 rounded-sm", className)}
      onClick={() => {
        beep(isImportant);
        if(onClick) onClick();
      }}
    >
      {children}
    </button>
  );
}