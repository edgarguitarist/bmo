# BMO

Recreación del personaje **BMO** (de *Hora de Aventura*) hecha íntegramente con **React + Tailwind CSS**, sin imágenes: cada parte del cuerpo es un componente JSX estilizado con clases de Tailwind.

## Stack

- **React 18**
- **Vite 4** (bundler + HMR)
- **Tailwind CSS 3** (+ PostCSS / Autoprefixer)
- **framer-motion** (animación de ojos y boca)
- **ESLint**

## Requisitos

- Node.js y **pnpm**.

## Instalación y uso

```bash
pnpm install       # Instalar dependencias
pnpm dev           # Servidor de desarrollo con HMR
pnpm build         # Build de producción -> dist/
pnpm preview       # Previsualizar el build
pnpm lint          # Linter (ESLint)
```

Tras `pnpm dev`, abre la URL que imprime Vite (por defecto http://localhost:5173).

## Expresiones y gestos

BMO parpadea, mira alrededor y puede cambiar de expresión o "hablar" (mueve la boca, sin audio). En desarrollo aparece un panel flotante para probarlo; también con teclado:

| Tecla | Acción |
|---|---|
| `1`–`8` | Neutral, Feliz, Encantado, Sonrisa, Sorprendido, Triste, Dormido, Guiño |
| `Espacio` | Hablar / dejar de hablar |
| `B` | Parpadear |
| Flechas / `0` | Mover la mirada / centrarla |

## Cómo está construido

BMO se arma por composición de componentes. `src/App.jsx` renderiza `src/bmo/structure.jsx`, que dispone tres columnas: lateral izquierdo, cuerpo central (cara + pecho) y lateral derecho. Las piezas viven en `src/bmo/parts/`:

- `face/` — pantalla con ojos y boca dibujados en SVG y animados con framer-motion.
- `chest/` — diskette, D-pad, botones select/start y botones de acción.
- `sides/` — laterales, letras y altavoz.

El estado de BMO (expresión, mirada, parpadeo, habla) vive en `src/bmo/state/` y los comportamientos automáticos en `src/bmo/behaviors/`. El resto de la apariencia (formas, colores, posición) se define con clases de Tailwind directamente en el JSX. Para más detalle de arquitectura, ver [CLAUDE.md](CLAUDE.md).
