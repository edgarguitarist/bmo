# BMO

Recreación del personaje **BMO** (de *Hora de Aventura*) hecha íntegramente con **React + Tailwind CSS**, sin imágenes: cada parte del cuerpo es un componente JSX estilizado con clases de Tailwind.

## Stack

- **React 18**
- **Vite 4** (bundler + HMR)
- **Tailwind CSS 3** (+ PostCSS / Autoprefixer)
- **ESLint**

## Requisitos

- Node.js y npm.

## Instalación y uso

```bash
npm install        # Instalar dependencias
npm run dev        # Servidor de desarrollo con HMR
npm run build      # Build de producción -> dist/
npm run preview    # Previsualizar el build
npm run lint       # Linter (ESLint)
```

Tras `npm run dev`, abre la URL que imprime Vite (por defecto http://localhost:5173).

## Cómo está construido

BMO se arma por composición de componentes. `src/App.jsx` renderiza `src/bmo/structure.jsx`, que dispone tres columnas: lateral izquierdo, cuerpo central (cara + pecho) y lateral derecho. Las piezas viven en `src/bmo/parts/`:

- `face/` — ojos y boca.
- `chest/` — diskette, D-pad, botones select/start y botones de acción.
- `sides/` — laterales, letras y altavoz.

Toda la apariencia (formas, colores, posición) se define con clases de Tailwind directamente en el JSX. Para más detalle de arquitectura, ver [CLAUDE.md](CLAUDE.md).
