import { motion } from 'framer-motion';
import { useBmo } from '../../state/bmo-context';
import { mouthPath, mouthShape } from './shapes';

// Centro de la boca dentro del viewBox 400x300 de la pantalla.
const MOUTH_X = 200;
const MOUTH_Y = 196;
// Alto visible de los dientes: proporcional a la apertura, acotado para que no llenen bocas pequeñas.
const teethHeight = (shape) => Math.min(12, Math.max(4, (shape.bottom - shape.top) * 0.3));

const morph = { duration: 0.16, ease: 'easeInOut' };

export default function Mouth() {
  const { mouth } = useBmo();
  const shape = mouthShape(mouth);
  const d = mouthPath(mouth);

  return (
    <g transform={`translate(${MOUTH_X} ${MOUTH_Y})`}>
      <defs>
        <clipPath id="bmo-mouth-clip">
          <motion.path initial={false} animate={{ d }} transition={morph} />
        </clipPath>
      </defs>

      {/* interior de la boca */}
      <motion.path
        fill="#2f7d4c"
        stroke="#000"
        strokeWidth="2.5"
        strokeLinejoin="round"
        initial={false}
        animate={{ d }}
        transition={morph}
      />

      <g clipPath="url(#bmo-mouth-clip)">
        {/* lengua */}
        <motion.ellipse
          fill="#8ccf6f"
          initial={false}
          animate={{
            cx: 0,
            cy: shape.bottom + 4,
            rx: shape.a * 0.55,
            ry: 16,
            opacity: shape.tongue ? 1 : 0,
          }}
          transition={morph}
        />
        {/* dientes */}
        <motion.rect
          x={-100}
          width={200}
          fill="#fff"
          stroke="#000"
          strokeWidth="1.5"
          initial={false}
          animate={{
            attrY: shape.top - 8,
            height: teethHeight(shape) + 8,
            opacity: shape.teeth ? 1 : 0,
          }}
          transition={morph}
        />
      </g>

      {/* contorno por encima de dientes y lengua */}
      <motion.path
        fill="none"
        stroke="#000"
        strokeWidth="2.5"
        strokeLinejoin="round"
        initial={false}
        animate={{ d }}
        transition={morph}
      />
    </g>
  );
}
