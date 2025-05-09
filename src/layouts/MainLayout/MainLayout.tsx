import React from 'react';
import type { ReactNode } from 'react';
import { Header, Footer } from '@/components';

interface MainLayoutProps {
    children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <div>
            <Header />
            <main>
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;