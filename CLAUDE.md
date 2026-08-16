# CLAUDE.md

Este archivo proporciona orientación a Claude Code (claude.ai/code) al trabajar con el código de este repositorio.

## Resumen del proyecto

**BMO** es una app web que dibuja al personaje BMO (de *Hora de Aventura*) íntegramente con JSX + clases de Tailwind y SVG inline, sin imágenes: cada parte del cuerpo (cara, pecho, botones, laterales) es un componente React compuesto. La cara tiene expresiones y gestos animados (parpadeo, mirada, boca "hablando"); el resto es puramente visual y estático.

Stack: **React 18 + Vite 4 + Tailwind CSS 3 + framer-motion** (JavaScript, no TypeScript). ESLint para linting. No hay suite de tests ni script `test`. Gestor de paquetes: **pnpm** (nunca npm; solo existe `pnpm-lock.yaml`).

## Comandos principales

```bash
pnpm install       # Instalar dependencias
pnpm dev           # Servidor de desarrollo con HMR (Vite, http://localhost:5173)
pnpm build         # Build de producción -> dist/
pnpm preview       # Previsualizar el build de producción
pnpm lint          # ESLint sobre js/jsx; falla con cualquier warning (--max-warnings 0)
```

Sobre el lint: la regla `react-refresh/only-export-components` está como `warn`, pero con `--max-warnings 0` cualquier warning rompe el comando. Cada archivo `.jsx` debe exportar solo componentes; por eso el contexto y el hook `useBmo` viven en un `.js` (`bmo-context.js`) separado del `BmoProvider` (`.jsx`). `react/prop-types` está activo: todo componente con props declara `propTypes` (`prop-types` está instalado).

Para comprobar cambios visuales sin abrir ventanas, usar Playwright **headless** (por ejemplo `python` con `playwright.sync_api`) contra `pnpm dev`; el panel de pruebas responde a teclado, así que se puede forzar cada expresión con `keyboard.press('1'..'8')` y recortar el `svg[aria-label="Cara de BMO"]`.

## Arquitectura

El árbol de render se arma por composición de componentes, cada uno una parte del cuerpo de BMO:

- `src/main.jsx` — punto de entrada; monta `<App>` en `#root` e importa `src/index.css`.
- `src/App.jsx` — envuelve `<Structure>` en `<BmoProvider>` y, solo en dev (`import.meta.env.DEV`), monta el panel de pruebas `src/dev/expression-panel.jsx`.
- `src/bmo/structure.jsx` — layout raíz: fila flex de tres columnas `<LeftSide>` (w-1/4) · cuerpo central (w-2/5, fondo `#58b09a`, contiene `<Face>` + `<Chest>`) · `<RightSide>` (w-1/4).

Las partes viven bajo `src/bmo/parts/`, agrupadas por zona:

- `face/` — `face.jsx` (panel `#cefeda`, `h-[50vh]`) contiene un único `<svg viewBox="0 0 400 300">` con `eyes.jsx` y `mouth.jsx`; `shapes.js` genera los paths.
- `chest/` — `chest.jsx` (`h-[40vh]`) compone `diskette.jsx` y dos mitades: `left-buttons/left-buttons.jsx` (agrupa `d-pad.jsx` + `select-start-buttons.jsx`) y `right-buttons/right-buttons.jsx` (agrupa `action-buttons.jsx`).
- `sides/` — `left-side/left-side.jsx` y `right-side/right-side.jsx`, que componen las piezas compartidas `sides/speaker.jsx` (rejilla de altavoz) y `sides/letters.jsx` (texto "BMO" rotado).

### Estado y gestos de la cara

- `src/bmo/state/expressions.js` — catálogo `EXPRESSIONS` (`neutral`, `happy`, `joy`, `smile`, `surprised`, `sad`, `sleepy`, `wink`): cada una es `{ label, eyes: [izq, der], mouth }` con claves que apuntan a `EYE_SHAPES` / `MOUTH_SHAPES` de `shapes.js`. También `TALK_MOUTHS`, la secuencia de bocas al hablar. Añadir una expresión = añadir una entrada aquí (y, si hace falta, una forma nueva en `shapes.js`).
- `src/bmo/state/bmo-provider.jsx` + `bmo-context.js` — `BmoProvider` centraliza `expression`, `gaze` ({x,y} en [-1,1]), `talking`, `blinking` y expone `useBmo()`. Resuelve las formas finales: `eyes` (cerrados si está parpadeando) y `mouth` (la del habla si `talking`).
- `src/bmo/behaviors/` — hooks de comportamiento automático que corren dentro del provider: `use-blink.js` (parpadeo cada 2-6 s, a veces doble, más `blink()` manual), `use-idle-gaze.js` (mirada aleatoria cada 2,5-6 s), `use-talking.js` (recorre `TALK_MOUTHS` a 90-170 ms mientras `talking`).
- `src/bmo/parts/face/shapes.js` — **todas las formas de ojos y boca son un mismo "blob" de 4 curvas cúbicas** (`blob({cx, cy, a, top, bottom, corner})`). Mantener esa estructura es lo que permite que framer-motion interpole el atributo `d` (morph) entre cualquier par de formas; una forma con distinto número de comandos rompería la animación.
- Detalles de framer-motion en SVG: en `motion.rect`/`motion.g` los valores `x`/`y` se tratan como transform (translate); para animar los atributos reales se usa `attrX`/`attrY` (así están los dientes). La mirada se aplica como translate del `<motion.g>` de los ojos.

Puntos no evidentes al leer un solo archivo:

- **Los dos laterales son copias idénticas**: `right-side.jsx` tiene el mismo JSX que `left-side.jsx` (e incluso exporta una función llamada `LeftSide`). Un cambio en un lateral normalmente hay que replicarlo en el otro.
- **Las proporciones dependen del alto del viewport**: `structure.jsx` usa `h-screen`, la cara `h-[50vh]` y el pecho `h-[40vh]`; el ancho se reparte con fracciones (`w-1/4`, `w-2/5`). Cambiar una de estas medidas desplaza el resto del cuerpo.
- **Fuente `Social Science Sans`**: se registra con `@font-face` en `src/index.css` (apunta a `src/SocialScienceSans.otf`) y solo se usa en `sides/letters.jsx` mediante `style={{ fontFamily: ... }}` inline, no con una clase de Tailwind. Si se quiere como utilidad (`font-...`), hay que extender `theme.fontFamily` en `tailwind.config.js`.
- **`src/index.css` no son solo directivas de Tailwind**: además define estilos globales en `:root` (fondo `#242424`, tipografía Inter/system-ui, `color-scheme: light dark`). Es el único CSS propio del proyecto; todo lo demás son clases de Tailwind en el JSX, con valores arbitrarios para los colores (`bg-[#58b09a]`, `bg-[#509284]`, `bg-[#cefeda]`). El tema de Tailwind no está extendido.
