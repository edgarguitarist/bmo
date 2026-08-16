import { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { BmoContext } from './bmo-context';
import { EXPRESSIONS } from './expressions';
import { useBlink } from '../behaviors/use-blink';
import { useIdleGaze } from '../behaviors/use-idle-gaze';
import { useTalking } from '../behaviors/use-talking';

// Estado central de BMO: expresión actual, mirada, parpadeo y modo "hablando".
// Los comportamientos automáticos (parpadear, mirar alrededor, mover la boca) viven aquí
// para que toda la cara los comparta.
export default function BmoProvider({ children, initialExpression = 'happy' }) {
  const [expression, setExpression] = useState(initialExpression);
  const [talking, setTalking] = useState(false);
  const { blinking, blink } = useBlink();
  const { gaze, setGaze } = useIdleGaze();
  const talkMouth = useTalking(talking);

  const value = useMemo(() => {
    const def = EXPRESSIONS[expression] ?? EXPRESSIONS.neutral;
    return {
      expression,
      setExpression,
      expressionDef: def,
      eyes: blinking ? ['closed', 'closed'] : def.eyes,
      mouth: talkMouth ?? def.mouth,
      blinking,
      blink,
      gaze,
      setGaze,
      talking,
      setTalking,
    };
  }, [expression, blinking, blink, gaze, setGaze, talking, talkMouth]);

  return <BmoContext.Provider value={value}>{children}</BmoContext.Provider>;
}

BmoProvider.propTypes = {
  children: PropTypes.node,
  initialExpression: PropTypes.string,
};
