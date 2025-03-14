"use client";

import { useState } from 'react';
import { useSoundSettings } from '@/app/hooks/useSoundSettings';
import { Settings as SettingsIcon, X } from 'lucide-react';
import ButtonSetting from '@/app/components/button-setting';
import ThemeSetting from '@/app/components/theme-setting';
import SoundSetting from '@/app/components/sound-setting';

interface SettingsProps {
  togglePause: () => void
}

export default function Settings({ togglePause }: SettingsProps){
  const [isOpen, setIsOpen] = useState(false);
  const {humEnabled, setHumEnabled} = useSoundSettings();

  return (
    <>
      <button 
        className="size-12 bg-zinc-300 rounded-lg shadow-inner ring-zinc-500 dark:ring-zinc-400 hover:ring-2 active:shadow-zinc-400 flex justify-center items-center group"
        onClick={() => {
          setIsOpen(true);
          togglePause(); // pause, if cooking
        }}
      >
        <SettingsIcon 
          size="30" 
          className="text-zinc-500/80 group-hover:opacity-85 group-active:pt-0.5"
        />
      </button>
      {isOpen && (
        <div className="absolute top-0 left-0 bottom-0 right-0 bg-zinc-800/50 flex justify-center items-center z-20">
          <div className="relative w-96 bg-zinc-900 rounded-lg shadow-lg border-4 border-zinc-400 p-1">
            <h2 className="text-2xl font-semibold text-sky-500 bg-zinc-800 rounded-sm text-center">
              SETTINGS
            </h2>
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 text-zinc-600 hover:bg-zinc-400/60 rounded-sm size-6"
            >
              <X />
            </button>
            <div className="p-4">
              {/* THEME SETTING */}
              <ThemeSetting />
              { /* SOUND SETTINGS */}
              <ButtonSetting
                buttonText="Toggle Hum"
                displayText={`HUM ${humEnabled ? 'ON' : 'OFF'}`}
                onClick={() => setHumEnabled(!humEnabled)}
              />
              <SoundSetting />
            </div>
          </div>
        </div>
      )}
    </>
  );
}