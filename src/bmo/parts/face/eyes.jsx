import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { useBmo } from '../../state/bmo-context';
import { eyePath } from './shapes';

// Posición de los ojos dentro del viewBox 400x300 de la pantalla.
const EYE_Y = 108;
const EYE_X = [115, 285];
// Cuánto se desplazan los ojos con la mirada (unidades del viewBox).
const GAZE_RANGE = { x: 8, y: 6 };

const morph = { duration: 0.22, ease: 'easeInOut' };
const blinkMorph = { duration: 0.07, ease: 'easeOut' };

function Eye({ x, shape, blinking }) {
  return (
    <motion.path
      transform={`translate(${x} ${EYE_Y})`}
      fill="#000"
      stroke="#000"
      strokeWidth="2"
      strokeLinejoin="round"
      initial={false}
      animate={{ d: eyePath(shape) }}
      transition={blinking ? blinkMorph : morph}
    />
  );
}

Eye.propTypes = {
  x: PropTypes.number.isRequired,
  shape: PropTypes.string.isRequired,
  blinking: PropTypes.bool,
};

export default function Eyes() {
  const { eyes, blinking, gaze } = useBmo();
  return (
    <motion.g
      initial={false}
      animate={{ x: gaze.x * GAZE_RANGE.x, y: gaze.y * GAZE_RANGE.y }}
      transition={{ type: 'spring', stiffness: 120, damping: 14 }}
    >
      <Eye x={EYE_X[0]} shape={eyes[0]} blinking={blinking} />
      <Eye x={EYE_X[1]} shape={eyes[1]} blinking={blinking} />
    </motion.g>
  );
}
