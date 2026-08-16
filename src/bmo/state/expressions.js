// Catálogo de expresiones de BMO.
// Cada expresión combina una forma de ojos (izquierdo/derecho) y una de boca.
// Las claves de ojos/boca corresponden a las funciones de src/bmo/parts/face/shapes.js.

export const EXPRESSIONS = {
  neutral:   { label: 'Neutral',     eyes: ['open', 'open'],     mouth: 'line' },
  happy:     { label: 'Feliz',       eyes: ['open', 'open'],     mouth: 'openSmile' },
  joy:       { label: 'Encantado',   eyes: ['happy', 'happy'],   mouth: 'openBig' },
  smile:     { label: 'Sonrisa',     eyes: ['open', 'open'],     mouth: 'smile' },
  surprised: { label: 'Sorprendido', eyes: ['wide', 'wide'],     mouth: 'o' },
  sad:       { label: 'Triste',      eyes: ['sleepy', 'sleepy'], mouth: 'frown' },
  sleepy:    { label: 'Dormido',     eyes: ['closed', 'closed'], mouth: 'line' },
  wink:      { label: 'Guiño',       eyes: ['open', 'happy'],    mouth: 'smile' },
};

export const EXPRESSION_KEYS = Object.keys(EXPRESSIONS);

// Secuencia de bocas que se alterna mientras BMO "habla" (sin audio todavía).
export const TALK_MOUTHS = ['openSmall', 'openMid', 'line', 'openBig', 'openSmall', 'o', 'openMid', 'line'];
