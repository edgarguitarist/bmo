# CLAUDE.md

Este archivo proporciona orientación a Claude Code (claude.ai/code) al trabajar con el código de este repositorio.

## Resumen del proyecto

**BMO** es una app web que dibuja al personaje BMO (de *Hora de Aventura*) íntegramente con JSX + clases de Tailwind, sin imágenes: cada parte del cuerpo (cara, pecho, botones, laterales) es un componente React compuesto. No hay lógica de negocio, estado ni props; es una pieza puramente visual.

Stack: **React 18 + Vite 4 + Tailwind CSS 3** (JavaScript, no TypeScript). ESLint para linting. No hay suite de tests ni script `test`.

## Comandos principales

```bash
npm install        # Instalar dependencias
npm run dev        # Servidor de desarrollo con HMR (Vite, http://localhost:5173)
npm run build      # Build de producción -> dist/
npm run preview    # Previsualizar el build de producción
npm run lint       # ESLint sobre js/jsx; falla con cualquier warning (--max-warnings 0)
```

Sobre el lint: la regla `react-refresh/only-export-components` está como `warn`, pero con `--max-warnings 0` cualquier warning rompe el comando. Cada archivo `.jsx` debe exportar solo componentes (export default de una función).

## Arquitectura

El árbol de render se arma por composición de componentes, cada uno una parte del cuerpo de BMO:

- `src/main.jsx` — punto de entrada; monta `<App>` en `#root` e importa `src/index.css`.
- `src/App.jsx` — solo renderiza `<Structure>`.
- `src/bmo/structure.jsx` — layout raíz: fila flex de tres columnas `<LeftSide>` (w-1/4) · cuerpo central (w-2/5, fondo `#58b09a`, contiene `<Face>` + `<Chest>`) · `<RightSide>` (w-1/4).

Las partes viven bajo `src/bmo/parts/`, agrupadas por zona:

- `face/` — `face.jsx` (panel `#cefeda`, `h-[50vh]`) compone `eyes.jsx` y `mouth.jsx`.
- `chest/` — `chest.jsx` (`h-[40vh]`) compone `diskette.jsx` y dos mitades: `left-buttons/left-buttons.jsx` (agrupa `d-pad.jsx` + `select-start-buttons.jsx`) y `right-buttons/right-buttons.jsx` (agrupa `action-buttons.jsx`).
- `sides/` — `left-side/left-side.jsx` y `right-side/right-side.jsx`, que componen las piezas compartidas `sides/speaker.jsx` (rejilla de altavoz) y `sides/letters.jsx` (texto "BMO" rotado).

Puntos no evidentes al leer un solo archivo:

- **Los dos laterales son copias idénticas**: `right-side.jsx` tiene el mismo JSX que `left-side.jsx` (e incluso exporta una función llamada `LeftSide`). Un cambio en un lateral normalmente hay que replicarlo en el otro.
- **Las proporciones dependen del alto del viewport**: `structure.jsx` usa `h-screen`, la cara `h-[50vh]` y el pecho `h-[40vh]`; el ancho se reparte con fracciones (`w-1/4`, `w-2/5`). Cambiar una de estas medidas desplaza el resto del cuerpo.
- **Fuente `Social Science Sans`**: se registra con `@font-face` en `src/index.css` (apunta a `src/SocialScienceSans.otf`) y solo se usa en `sides/letters.jsx` mediante `style={{ fontFamily: ... }}` inline, no con una clase de Tailwind. Si se quiere como utilidad (`font-...`), hay que extender `theme.fontFamily` en `tailwind.config.js`.
- **`src/index.css` no son solo directivas de Tailwind**: además define estilos globales en `:root` (fondo `#242424`, tipografía Inter/system-ui, `color-scheme: light dark`). Es el único CSS propio del proyecto; todo lo demás son clases de Tailwind en el JSX, con valores arbitrarios para los colores (`bg-[#58b09a]`, `bg-[#509284]`, `bg-[#cefeda]`). El tema de Tailwind no está extendido.
