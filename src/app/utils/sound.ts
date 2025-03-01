/* Constants and functions required by sound settings */

const GAIN_MIN = -60;
const GAIN_MAX = 0;

export function volumeToGain(vol: number){
  // validate range
  if(vol < 0 || vol > 99) return GAIN_MIN;
  // handle 0 edge case (ensure muted)
  if(vol === 0) return -Infinity;

  // interpolate gain from volume
  return GAIN_MIN + (GAIN_MAX - GAIN_MIN) * (vol / 99);
}