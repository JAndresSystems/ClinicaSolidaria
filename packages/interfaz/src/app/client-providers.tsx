'use client'; // <-- LA LÍNEA MÁGICA: Declara este archivo como un Componente Cliente.

import dynamic from 'next/dynamic';
import React from 'react';

// Importamos nuestros proveedores de forma dinámica DENTRO de un componente cliente.
const ProveedoresDinamicos = dynamic(
  () => import('./providers').then((modulo) => modulo.Proveedores),
  {
    ssr: false, // Ahora 'ssr: false' sí está permitido aquí.
  }
);

// Creamos un componente envoltorio que usará la importación dinámica.
export function ClientProviders({ children }: { children: React.ReactNode }) {
  return <ProveedoresDinamicos>{children}</ProveedoresDinamicos>;
}