"use client";

import Header from '@/app/components/ui/header';
import Microwave from '@/app/components/microwave';
import { useState } from 'react';
import { useSoundHum } from '@/app/hooks/useSoundHum';

export type MicrowaveMode = 'clock' | 'input' | 'cook' | 'pause';

export default function Home() {
  const [mode, setMode] = useState<MicrowaveMode>('clock');
  const { beginHum, endHum } = useSoundHum();
  
  return (
    <div className="w-screen min-h-screen">
      <Header />
      <div className=" w-full h-full flex justify-center items-center pt-16 px-6">
        <Microwave 
          mode={mode} 
          setMode={setMode}
          beginHum={beginHum}
          endHum={endHum}
        />
      </div>
    </div>
  );
}
