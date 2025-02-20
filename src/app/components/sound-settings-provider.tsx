"use client";

import { SoundSettingsContext } from "@/app/contexts/soundSettingsContext";
import { PropsWithChildren, useState } from "react";

interface SoundSettingsProviderProps extends PropsWithChildren {
  defaultIsAudible?: boolean
}

export default function SoundSettingsProvider({defaultIsAudible = false, children}: SoundSettingsProviderProps){
  const [isAudible, setIsAudible] = useState(defaultIsAudible);
  
  return (
    <SoundSettingsContext.Provider value={{isAudible, setIsAudible}}>
      {children}
    </SoundSettingsContext.Provider>
  );
}