import { useCallback, useEffect, useRef, useState } from 'react';

const rand = (min, max) => min + Math.random() * (max - min);

// Parpadeo automático: cada 2-6 s cierra los ojos ~120 ms; a veces parpadea doble.
// Devuelve el flag `blinking` y una función `blink()` para forzarlo.
export function useBlink({ enabled = true } = {}) {
  const [blinking, setBlinking] = useState(false);
  const timers = useRef([]);

  const clear = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const blink = useCallback((times = 1) => {
    clear();
    let t = 0;
    for (let i = 0; i < times; i++) {
      timers.current.push(setTimeout(() => setBlinking(true), t));
      timers.current.push(setTimeout(() => setBlinking(false), t + 120));
      t += 200;
    }
  }, []);

  useEffect(() => {
    if (!enabled) return undefined;
    let cancelled = false;
    const schedule = () => {
      const id = setTimeout(() => {
        if (cancelled) return;
        blink(Math.random() < 0.2 ? 2 : 1);
        schedule();
      }, rand(2000, 6000));
      timers.current.push(id);
    };
    schedule();
    return () => {
      cancelled = true;
      clear();
    };
  }, [enabled, blink]);

  return { blinking, blink };
}
