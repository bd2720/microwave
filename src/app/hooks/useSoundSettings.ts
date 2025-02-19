/* Sound settings */
import { useState, useEffect } from 'react';

export const useSoundSettings = () => {
  const [isAudible, setIsAudible] = useState(false);

  return {isAudible, setIsAudible}
}