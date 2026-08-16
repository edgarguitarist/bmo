import { useEffect, useState } from 'react';

const rand = (min, max) => min + Math.random() * (max - min);

// Mirada ociosa: cada 2.5-6 s BMO mira a un punto aleatorio o vuelve al centro.
// `gaze` es {x, y} en el rango [-1, 1]; `setGaze` permite forzarla desde fuera.
export function useIdleGaze({ enabled = true } = {}) {
  const [gaze, setGaze] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!enabled) return undefined;
    let cancelled = false;
    let id;
    const schedule = () => {
      id = setTimeout(() => {
        if (cancelled) return;
        setGaze(Math.random() < 0.45
          ? { x: 0, y: 0 }
          : { x: rand(-1, 1), y: rand(-0.6, 0.6) });
        schedule();
      }, rand(2500, 6000));
    };
    schedule();
    return () => {
      cancelled = true;
      clearTimeout(id);
    };
  }, [enabled]);

  return { gaze, setGaze };
}
