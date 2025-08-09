// src/app/layout.tsx
import './globals.css';
import ClientWrapper from '../components/ClientWrapper';

export const metadata = {
  title: 'Free Market',
  icons: {
    icon: '/cart.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}

