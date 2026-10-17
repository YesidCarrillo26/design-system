import type { ReactNode } from 'react';
import './globals.css';
import { Providers } from './providers';

export const metadata = { title: 'Ejemplo Next.js — @yesid/ui' };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
