import './globals.css';
import { Inter } from 'next/font/google';
// Importamos nuestro nuevo componente envoltorio.
import { ClientProviders } from './client-providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata = { title: 'Clinica Solidaria', description: 'Donaciones descentralizadas' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-slate-900 text-slate-100`}>
        {/* Usamos el componente cliente aquí. */}
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}