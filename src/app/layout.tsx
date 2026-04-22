import './globals.css';
import { Inter, Poppins, Outfit } from 'next/font/google';
import { ReactNode } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import FloatingElements from '../components/FloatingElements';
import { ThemeProvider } from '../components/ThemeProvider';

const poppins = Poppins({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

const outfit = Outfit({
  variable: '--font-display',
  subsets: ['latin'],
});

export const metadata = {
  title: 'AHAD International Hospital',
  description: 'World-class healthcare services and specialists.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${outfit.variable} antialiased text-medical-dark bg-white dark:bg-gray-900 dark:text-gray-100 flex flex-col min-h-screen selection:bg-medical-blue selection:text-white transition-colors duration-300`}>
        <ThemeProvider>
          <Navbar />
          <main className="flex-grow pt-20 overflow-hidden">
            {children}
          </main>
          <FloatingElements />
        <Footer />
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
          <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-medical-blue/5 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-medical-accent/5 blur-[120px] rounded-full"></div>
        </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
