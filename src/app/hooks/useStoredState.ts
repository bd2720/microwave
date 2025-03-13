/* Custom hook that wraps useState with localstorage */
import { useState, useEffect, type Dispatch, type SetStateAction } from 'react';

export function useStoredState<T>(key: string, initialValue: T): [T, Dispatch<SetStateAction<T>>] {
  // create state, setting initial value to either storedValue, or initialValue if absent
  const [state, setState] = useState<T>(initialValue);

  // accesss localStorage in an effect, updating state w/ stored value if present
  useEffect(() => {
    // first, attempt to get item from storage
    const storedValue = localStorage.getItem(key);
    // set state with stored value if present
    if(storedValue !== null){
      // parse string value as type T
      setState(JSON.parse(storedValue) as T);
    }
  }, [key]);

  // define setStoredState wrapper around setState, storing new state value
  const setStoredState: Dispatch<SetStateAction<T>> = (value) => {
    setState((prevState) => {
      // handle if value is a function
      const newValue = (value instanceof Function) ? value(prevState) : value;
      // save to storage
      localStorage.setItem(key, JSON.stringify(newValue));
      // return the new value
      return newValue;
    });
  }

  // return [T, setT], as in useState
  return [state, setStoredState];
}