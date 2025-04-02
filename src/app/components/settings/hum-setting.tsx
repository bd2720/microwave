import ButtonSetting from "@/app/components/settings/button-setting";
import { useSoundSettings } from '@/app/hooks/useSoundSettings';

export default function HumSetting(){
  const {humEnabled, setHumEnabled} = useSoundSettings();

  return (
    <ButtonSetting
      buttonText="Toggle Hum"
      displayText={`HUM ${humEnabled ? 'ON' : 'OFF'}`}
      onClick={() => setHumEnabled(!humEnabled)}
      description='Toggle the low "hum" sound while the microwave is cooking'
    />
  );
}