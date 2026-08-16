import { useEffect } from 'react';
import { useBmo } from '../bmo/state/bmo-context';
import { EXPRESSIONS, EXPRESSION_KEYS } from '../bmo/state/expressions';

// Panel de pruebas (solo en desarrollo) para forzar expresiones y gestos.
// Atajos: 1-8 expresiones · Espacio hablar · B parpadear · Flechas mirada · 0 centrar mirada.
export default function ExpressionPanel() {
  const { expression, setExpression, talking, setTalking, blink, gaze, setGaze } = useBmo();

  useEffect(() => {
    const onKey = (e) => {
      if (e.target.tagName === 'INPUT') return;
      const idx = Number(e.key) - 1;
      if (Number.isInteger(idx) && idx >= 0 && idx < EXPRESSION_KEYS.length) {
        setExpression(EXPRESSION_KEYS[idx]);
        return;
      }
      switch (e.key) {
        case ' ':
          e.preventDefault();
          setTalking((t) => !t);
          break;
        case 'b':
        case 'B':
          blink();
          break;
        case '0':
          setGaze({ x: 0, y: 0 });
          break;
        case 'ArrowLeft':
          setGaze((g) => ({ ...g, x: Math.max(-1, g.x - 0.5) }));
          break;
        case 'ArrowRight':
          setGaze((g) => ({ ...g, x: Math.min(1, g.x + 0.5) }));
          break;
        case 'ArrowUp':
          setGaze((g) => ({ ...g, y: Math.max(-1, g.y - 0.5) }));
          break;
        case 'ArrowDown':
          setGaze((g) => ({ ...g, y: Math.min(1, g.y + 0.5) }));
          break;
        default:
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [setExpression, setTalking, blink, setGaze]);

  const btn = 'px-2 py-1 rounded text-xs font-medium transition-colors';
  const idle = 'bg-white/10 hover:bg-white/25 text-white';
  const active = 'bg-[#58b09a] text-black';

  return (
    <div className="fixed bottom-3 left-3 z-50 flex flex-col gap-2 rounded-lg bg-black/70 p-3 text-white backdrop-blur">
      <div className="text-[10px] uppercase tracking-wider text-white/60">Expresiones (1-8)</div>
      <div className="grid grid-cols-4 gap-1">
        {EXPRESSION_KEYS.map((key, i) => (
          <button
            key={key}
            type="button"
            title={`Tecla ${i + 1}`}
            className={`${btn} ${expression === key ? active : idle}`}
            onClick={() => setExpression(key)}
          >
            {EXPRESSIONS[key].label}
          </button>
        ))}
      </div>
      <div className="text-[10px] uppercase tracking-wider text-white/60">Gestos</div>
      <div className="flex gap-1">
        <button
          type="button"
          title="Espacio"
          className={`${btn} ${talking ? active : idle}`}
          onClick={() => setTalking((t) => !t)}
        >
          {talking ? 'Hablando…' : 'Hablar'}
        </button>
        <button type="button" title="B" className={`${btn} ${idle}`} onClick={() => blink()}>
          Parpadear
        </button>
        <button type="button" title="0" className={`${btn} ${idle}`} onClick={() => setGaze({ x: 0, y: 0 })}>
          Mirar al frente
        </button>
      </div>
      <div className="text-[10px] text-white/50">
        Flechas: mirada ({gaze.x.toFixed(1)}, {gaze.y.toFixed(1)})
      </div>
    </div>
  );
}
