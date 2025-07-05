'use client';

import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultConfig, RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { WagmiConfig } from 'wagmi';
import { sepolia } from 'wagmi/chains';
// Importamos las herramientas que necesitamos de TanStack Query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Creamos una instancia de nuestro "jefe de operaciones de datos".
// Esto solo se hace una vez.
const clienteQuery = new QueryClient();

// --- CREACION DE LA CONFIGURACION PRINCIPAL ---
const configuracionWagmi = getDefaultConfig({
  appName: 'Clinica Solidaria',
  projectId: 'Tu Project ID ', // Tu Project ID  (Clave para billeteras móviles)
  chains: [sepolia],
});

// --- EL COMPONENTE PROVEEDOR ---
// Este componente "envuelve" toda nuestra aplicación.
export function Proveedores({ children }: { children: React.ReactNode }) {
  return (
    // El proveedor de Wagmi es el más externo
    <WagmiConfig config={configuracionWagmi}>
      {/* Envolvemos todo con el proveedor de Query, pasándole nuestro "jefe" */}
      <QueryClientProvider client={clienteQuery}>
        {/* Finalmente, el proveedor de RainbowKit para la interfaz de usuario */}
        <RainbowKitProvider theme={darkTheme()}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiConfig>
  );
}