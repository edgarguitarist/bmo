import { useEffect, useState } from 'react';
import { TALK_MOUTHS } from '../state/expressions';

const rand = (min, max) => min + Math.random() * (max - min);

// Mientras `talking` es true, recorre TALK_MOUTHS a ritmo irregular (90-170 ms por boca).
// Devuelve la forma de boca a mostrar, o null si no está hablando.
export function useTalking(talking) {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    if (!talking) return undefined;
    let cancelled = false;
    let id;
    const tick = () => {
      id = setTimeout(() => {
        if (cancelled) return;
        setFrame((f) => (f + 1) % TALK_MOUTHS.length);
        tick();
      }, rand(90, 170));
    };
    tick();
    return () => {
      cancelled = true;
      clearTimeout(id);
    };
  }, [talking]);

  return talking ? TALK_MOUTHS[frame] : null;
}
