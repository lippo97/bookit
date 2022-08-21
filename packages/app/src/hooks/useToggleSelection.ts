import { useState } from 'react';

export const useToggleSelection = <T>(initial: T | undefined) => {
  const [state, setState] = useState<T | undefined>(initial);
  const toggleSelection = (update: T) =>
    setState((s) => (s === update ? undefined : update));

  const reset = () => setState(undefined);
  return [state, toggleSelection, reset] as [
    T | undefined,
    (t: T) => void,
    () => void,
  ];
};
