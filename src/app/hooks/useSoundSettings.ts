/* Sound settings */
import { useState } from 'react';

export const useSoundSettings = () => {
  const [isAudible, setIsAudible] = useState(false);

  return {isAudible, setIsAudible}
}