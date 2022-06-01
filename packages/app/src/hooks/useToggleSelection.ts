import { useState } from 'react';

export const useToggleSelection = <T>(initial: T | null) => {
  const [state, setState] = useState<T | null>(initial);
  const toggleSelection = (update: T) =>
    setState((s) => (s === update ? null : update));

  const reset = () => setState(null);
  return [state, toggleSelection, reset] as [
    T | null,
    (t: T) => void,
    () => void,
  ];
};
