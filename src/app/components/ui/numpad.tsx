import { PropsWithChildren } from 'react';
import Button from '@/app/components/ui/button';
import clsx from 'clsx';

interface NumpadProps extends PropsWithChildren {
  className?: string,
  onNumPress: (num: number) => void,
  disabled?: boolean
}

export default function Numpad({ className, onNumPress, disabled = false, children }: NumpadProps){
  return (
    <>
      <div className={clsx("bg-zinc-800 grid grid-cols-3 rounded-sm", className)}>
        {[...Array(9).keys()].map((n) => {
          return (
            <Button 
              key={n+1}
              onClick={() => onNumPress(n+1)}
              disabled={disabled}
            >
              {n+1}
            </Button>
          )
        })}
        {children || (
          <div className="col-span-3 grid grid-cols-subgrid">
            <Button 
              className="col-start-2"
              onClick={() => onNumPress(0)}
              disabled={disabled}
            >
              0
            </Button> 
          </div>
        )}
      </div>
    </>
  );
}