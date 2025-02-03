export function formatTime(seconds: number){
  const sec = (seconds%60).toString().padStart(2, '0');
  const min = (Math.floor(seconds/60)).toString().padStart(2, '0');
  return min + ':' + sec;
}