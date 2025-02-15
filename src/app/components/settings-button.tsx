import { Settings } from 'lucide-react';

export default function SettingsButton(){
  return (
    <button className="size-12 bg-zinc-300 rounded-lg shadow-inner ring-zinc-400 hover:ring-2 active:shadow-zinc-400 flex justify-center items-center group">
      <Settings 
        size="30" 
        className="text-zinc-500/80 group-active:opacity-85 group-active:pt-1"
      />
    </button>
  );
}