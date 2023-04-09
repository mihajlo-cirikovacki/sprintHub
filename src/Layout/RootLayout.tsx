import { Inter, Oswald } from '@next/font/google';
import type { PropsWithChildren } from 'react';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const oswald = Oswald({ subsets: ['latin'], variable: '--font-oswald' });

export const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <main
      className={`h-screen bg-primary font-inter text-gray-dark ${inter.variable} ${oswald.variable}`}
    >
      {children}
    </main>
  );
};
