import type { ReactNode } from "react";

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <main className="min-h-screen pb-16 md:pb-0 md:pl-20">
            {children}
        </main>
    );
};

export default Layout; 