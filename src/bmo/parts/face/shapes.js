// Generadores de paths SVG para ojos y boca.
//
// Todas las formas son un "blob" cerrado de 4 curvas cúbicas que pasa por cuatro anclas:
// izquierda (L), arriba (T), derecha (R) y abajo (B). Al compartir SIEMPRE la misma
// estructura de comandos, framer-motion puede interpolar el atributo `d` entre cualquier
// par de formas (morph suave de ojo abierto -> cerrado, boca línea -> boca abierta, etc.).

const K = 0.5523; // constante de Bézier para aproximar arcos elípticos
const f = (n) => Number(n.toFixed(2));

/**
 * @param {object} p
 * @param {number} p.cx       centro horizontal
 * @param {number} p.cy       centro vertical (referencia para top/bottom/corner)
 * @param {number} p.a        semiancho (distancia del centro a cada comisura)
 * @param {number} p.top      desplazamiento vertical del punto superior respecto a cy (negativo = arriba)
 * @param {number} p.bottom   desplazamiento vertical del punto inferior respecto a cy
 * @param {number} [p.corner] desplazamiento vertical de las comisuras respecto a cy
 */
export function blob({ cx, cy, a, top, bottom, corner = 0 }) {
  const yc = cy + corner;
  const yt = cy + top;
  const yb = cy + bottom;
  const lx = cx - a;
  const rx = cx + a;
  return [
    `M ${f(lx)} ${f(yc)}`,
    `C ${f(lx)} ${f(yc + K * (yt - yc))} ${f(cx - K * a)} ${f(yt)} ${f(cx)} ${f(yt)}`,
    `C ${f(cx + K * a)} ${f(yt)} ${f(rx)} ${f(yc + K * (yt - yc))} ${f(rx)} ${f(yc)}`,
    `C ${f(rx)} ${f(yc + K * (yb - yc))} ${f(cx + K * a)} ${f(yb)} ${f(cx)} ${f(yb)}`,
    `C ${f(cx - K * a)} ${f(yb)} ${f(lx)} ${f(yc + K * (yb - yc))} ${f(lx)} ${f(yc)}`,
    'Z',
  ].join(' ');
}

// ---------- Ojos ----------
// Todas centradas en (0, 0); el componente <Eye> las coloca con un translate.
export const EYE_SHAPES = {
  open:   { a: 10,   top: -14,   bottom: 14 },
  wide:   { a: 12.5, top: -17.5, bottom: 17.5 },
  closed: { a: 10,   top: -1.2,  bottom: 1.2 },
  sleepy: { a: 10,   top: -2.5,  bottom: 14 },
  // arco "^" de ojo feliz: el grosor del trazo es la diferencia top/bottom en el vértice
  happy:  { a: 14,   top: -13,   bottom: -5, corner: 0 },
};

export function eyePath(name) {
  const s = EYE_SHAPES[name] ?? EYE_SHAPES.open;
  return blob({ cx: 0, cy: 0, ...s });
}

// ---------- Boca ----------
// Centradas en (0, 0); `teeth`/`tongue` indican si se dibujan dientes y lengua.
export const MOUTH_SHAPES = {
  line:      { a: 26, top: -1.8, bottom: 1.8, corner: 0,  teeth: false, tongue: false },
  smile:     { a: 40, top: 4,    bottom: 10,  corner: -8, teeth: false, tongue: false },
  frown:     { a: 36, top: -11,  bottom: -5,  corner: 5,  teeth: false, tongue: false },
  o:         { a: 19, top: -21,  bottom: 21,  corner: 0,  teeth: false, tongue: true },
  openSmall: { a: 44, top: -5,   bottom: 20,  corner: -3, teeth: true,  tongue: false },
  openMid:   { a: 54, top: -10,  bottom: 32,  corner: -4, teeth: true,  tongue: true },
  openSmile: { a: 64, top: -12,  bottom: 42,  corner: -5, teeth: true,  tongue: true },
  openBig:   { a: 70, top: -14,  bottom: 54,  corner: -4, teeth: true,  tongue: true },
};

export function mouthShape(name) {
  return MOUTH_SHAPES[name] ?? MOUTH_SHAPES.line;
}

export function mouthPath(name) {
  const s = mouthShape(name);
  return blob({ cx: 0, cy: 0, a: s.a, top: s.top, bottom: s.bottom, corner: s.corner });
}
