import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
    title: {
        default: 'สภาวัฒนธรรมจังหวัดเชียงราย',
        template: '%s | สภาวัฒนธรรมจังหวัดเชียงราย',
    },
    description: 'เว็บไซต์สภาวัฒนธรรมจังหวัดเชียงราย - ส่งเสริมและอนุรักษ์มรดกวัฒนธรรมล้านนา Cultural Council of Chiang Rai Province',
    keywords: ['สภาวัฒนธรรม', 'เชียงราย', 'วัฒนธรรมล้านนา', 'มรดกภูมิปัญญา', 'Chiang Rai Culture'],
    authors: [{ name: 'สภาวัฒนธรรมจังหวัดเชียงราย' }],
    openGraph: {
        title: 'สภาวัฒนธรรมจังหวัดเชียงราย',
        description: 'ส่งเสริมและอนุรักษ์มรดกวัฒนธรรมล้านนา',
        url: 'https://crculture.go.th',
        siteName: 'สภาวัฒนธรรมจังหวัดเชียงราย',
        locale: 'th_TH',
        type: 'website',
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="th" data-theme="lanna">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@300;400;500;600;700&family=Prompt:wght@400;500;600;700&family=Sarabun:wght@300;400;500;600;700&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-grow">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    )
}

