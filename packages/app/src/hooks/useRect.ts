import { useState, useEffect } from 'react';

function useRect(ref: React.MutableRefObject<HTMLElement | null>) {
  const [rect, setRect] = useState<DOMRect | null>(null);

  function set() {
    setRect(ref.current ? ref.current.getBoundingClientRect() : null);
  }

  useEffect(() => {
    set();
    window.addEventListener('resize', set);
    return () => window.removeEventListener('resize', set);
  }, []);

  return rect;
}

export default useRect;
