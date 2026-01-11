import './globals.css';
import type { Metadata } from 'next';
import { Kanit } from 'next/font/google'; // Using Kanit for Thai context if available, or just standard Inter

// Prompt said "Lanna-ChiangRai Theme"
// Let's assume standard font first or just className
// Actually, I'll use a standard font placeholder or just body class.

export const metadata: Metadata = {
    title: 'Chiang Rai Cultural Council',
    description: 'Preserving and promoting the cultural heritage of Chiang Rai',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="th">
            <body className="antialiased min-h-screen bg-base-100 text-base-content">
                {children}
            </body>
        </html>
    );
}
