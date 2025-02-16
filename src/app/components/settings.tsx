"use client";

import { useState } from 'react';
import { Settings as SettingsIcon, X } from 'lucide-react';

export default function Settings(){
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        className="size-12 bg-zinc-300 rounded-lg shadow-inner ring-zinc-400 hover:ring-2 active:shadow-zinc-400 flex justify-center items-center group"
        onClick={() => setIsOpen(true)}
      >
        <SettingsIcon 
          size="30" 
          className="text-zinc-500/80 group-hover:opacity-85 group-active:pt-0.5"
        />
      </button>
      {isOpen && (
        <div className="absolute top-0 left-0 bottom-0 right-0 bg-zinc-800/50 flex justify-center items-center z-20">
          <div className="w-96 bg-zinc-300 rounded-lg shadow-lg border-2 border-zinc-200 p-1 flex justify-between">
            <h2 className="text-xl font-semibold text-black text-center">SETTINGS</h2>
            <button onClick={() => setIsOpen(false)}>
              <X />
            </button>
          </div>
        </div>
      )}
    </>
  );
}