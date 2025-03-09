
import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import { useIsMobile } from '@/hooks/use-mobile';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow pt-16">
        <div className={isMobile ? "px-2 py-4" : ""}>
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;
