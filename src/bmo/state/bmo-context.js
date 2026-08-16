import { createContext, useContext } from 'react';

export const BmoContext = createContext(null);

// Acceso al estado de BMO desde cualquier parte del cuerpo.
export function useBmo() {
  const ctx = useContext(BmoContext);
  if (!ctx) throw new Error('useBmo debe usarse dentro de <BmoProvider>');
  return ctx;
}
