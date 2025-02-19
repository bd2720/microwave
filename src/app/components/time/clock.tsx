import { useTimeSeconds } from '@/app/hooks/useTimeSeconds';

export default function Clock(){
  const time = useTimeSeconds();
  return (
    <>
      {time.toLocaleTimeString()}
    </>
  );
}