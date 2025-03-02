import Numpad from '@/app/components/ui/numpad';
import { useSoundSettings } from '@/app/hooks/useSoundSettings';
import Button from '@/app/components/ui/button';

export default function SoundSetting(){
  const {volumeLevel, setVolumeLevel} = useSoundSettings();

  const volumeDisplayStr = `${volumeLevel}`.padStart(2, '0');
  
  function handleNumPress(num: number){
    // keep volume between 0 and 99
    setVolumeLevel((volumeLevel * 10 + num) % 100);
  }
  return (
    <div className="flex flex-col items-center gap-4 pt-4">
      <div className="w-52 relative bg-zinc-800 p-2 overflow-hidden h-16 flex justify-center items-center rounded-sm">
        <p className="text-lg text-sky-400 text-center text-nowrap">
          VOLUME: {volumeDisplayStr} / 99
        </p>
      </div>
      <Numpad
        className="w-52"
        onNumPress={handleNumPress}
      > 
        <div className="col-span-3 grid grid-cols-subgrid">
          <Button 
            className="text-sm"
            onClick={() => setVolumeLevel(0)}
          >
            Mute
          </Button>
          <Button onClick={() => handleNumPress(0)}>
            0
          </Button> 
        </div>
      </Numpad>
    </div>
  )
}