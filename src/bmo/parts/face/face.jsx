import Eyes from './eyes';
import Mouth from './mouth';

// Pantalla de BMO. Ojos y boca se dibujan en un único SVG con viewBox fijo para que
// las formas escalen con la pantalla y se puedan animar (ver shapes.js).
export default function Face() {
  return (
    <div className="bg-[#cefeda] w-full h-[50vh] border-2 border-black rounded-2xl overflow-hidden">
      <svg
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-full"
        aria-label="Cara de BMO"
      >
        <Eyes />
        <Mouth />
      </svg>
    </div>
  );
}
