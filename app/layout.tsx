import type {Metadata} from 'next';
import { Inter, Syne, Orbitron } from 'next/font/google';
import SmoothScroll from '@/components/SmoothScroll';
import CustomCursor from '@/components/CustomCursor';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-serif', // Keeping the variable name to avoid breaking existing classes
});

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
});

export const metadata: Metadata = {
  title: 'hallelx2 | Immersive 3D Portfolio',
  description: 'Breaking the boundaries of digital experience.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable} ${orbitron.variable} dark`}>
      <body className="bg-[#030303] text-white font-sans antialiased overflow-x-hidden selection:bg-white/20" suppressHydrationWarning>
        <CustomCursor />
        <div className="noise-bg" />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
