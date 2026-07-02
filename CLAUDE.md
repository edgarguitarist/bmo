# CLAUDE.md

Este archivo proporciona orientación a Claude Code (claude.ai/code) al trabajar con el código de este repositorio.

## Resumen del proyecto

**BMO** es una app web que dibuja al personaje BMO (de *Hora de Aventura*) íntegramente con JSX + clases de Tailwind, sin imágenes: cada parte del cuerpo (cara, pecho, botones, laterales) es un componente React compuesto. No hay lógica de negocio ni estado; es una pieza puramente visual.

Stack: **React 18 + Vite 4 + Tailwind CSS 3** (JavaScript, no TypeScript). ESLint para linting.

## Comandos principales

```bash
npm install        # Instalar dependencias
npm run dev        # Servidor de desarrollo con HMR (Vite)
npm run build      # Build de producción -> dist/
npm run preview    # Previsualizar el build de producción
npm run lint       # ESLint (js/jsx), falla con cualquier warning (--max-warnings 0)
```

## Arquitectura

El árbol de render se arma por composición de componentes, cada uno una parte del cuerpo de BMO:

- `src/main.jsx` — punto de entrada; monta `<App>` en `#root` e importa `src/index.css` (directivas de Tailwind).
- `src/App.jsx` — solo renderiza `<Structure>`.
- `src/bmo/structure.jsx` — layout raíz: fila flex de tres columnas `<LeftSide>` · cuerpo central (`<Face>` + `<Chest>`, fondo `#58b09a` redondeado) · `<RightSide>`.

Las partes viven bajo `src/bmo/parts/`, agrupadas por zona:

- `face/` — `face.jsx` compone `eyes.jsx` y `mouth.jsx`.
- `chest/` — `chest.jsx` compone `diskette.jsx`, `left-buttons/` (`d-pad.jsx`, `select-start-buttons.jsx`) y `right-buttons/` (`action-buttons.jsx`).
- `sides/` — `left-side.jsx` y `right-side.jsx`, más piezas compartidas `letters.jsx` y `speaker.jsx`.

Toda la apariencia (formas, colores, posiciones) se define con clases de Tailwind en el JSX. Para modificar a BMO, se edita el componente de la parte correspondiente; no hay CSS propio más allá de `src/index.css`.

### Notas

- La fuente `src/SocialScienceSans.otf` está en el repo como recurso; verificar dónde se referencia antes de asumir que está cargada.
- Tailwind escanea `index.html` y `src/**/*.{js,ts,jsx,tsx}` (ver `tailwind.config.js`); el tema no está extendido, se usan utilidades y valores arbitrarios (`bg-[#58b09a]`).

## Estructura del repo

```
bmo/
├── index.html              # HTML raíz (monta /src/main.jsx)
├── package.json            # scripts y dependencias
├── vite.config.js          # Vite + plugin React
├── tailwind.config.js      # config de Tailwind
├── postcss.config.js       # PostCSS (tailwindcss + autoprefixer)
├── .eslintrc.cjs           # reglas de ESLint
├── public/                 # assets estáticos (vite.svg)
└── src/
    ├── main.jsx            # entry point
    ├── App.jsx             # raíz de la app
    ├── index.css           # directivas de Tailwind
    ├── SocialScienceSans.otf
    ├── assets/
    └── bmo/
        ├── structure.jsx   # layout general
        └── parts/          # cara, pecho, botones y laterales
```
