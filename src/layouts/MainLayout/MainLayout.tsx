import React from 'react';
import type { ReactNode } from 'react';
import { Header, Footer } from '@/components';

interface MainLayoutProps {
    children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <div className="bg-gray-100 min-h-screen text-gray-800 font-sans">
            <div className="container mx-auto px-4 py-8 relative z-10">
                <Header />
                <main className="flex-grow">
                    {children}
                </main>
                <Footer />
            </div>
        </div>
    );
};

export default MainLayout;