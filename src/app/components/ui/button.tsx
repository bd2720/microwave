import { PropsWithChildren } from 'react';
import clsx from 'clsx';

interface ButtonProps extends PropsWithChildren {
  className?: string,
  onClick?: () => void
}

export default function Button({ className, onClick, children } : ButtonProps){
  return (
    <button 
      className={clsx("text-2xl text-zinc-100 h-16 rounded-sm", className)}
      onClick={onClick}  
    >
      {children}
    </button>
  );
}