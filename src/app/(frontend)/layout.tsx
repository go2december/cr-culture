import type { Metadata } from 'next'
import '../globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const dynamic = 'force-dynamic'

const serverUrl = (process.env.NEXT_PUBLIC_SERVER_URL || 'https://cr-culture.com').replace(/\/$/, '')

export const metadata: Metadata = {
    metadataBase: new URL(serverUrl),
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
        url: serverUrl,
        siteName: 'สภาวัฒนธรรมจังหวัดเชียงราย',
        locale: 'th_TH',
        type: 'website',
    },
}

export default function FrontendLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="th" data-theme="lofi">
            <body className="min-h-screen flex flex-col font-sans">
                <a href="#main-content" className="skip-link">ข้ามไปยังเนื้อหาหลัก</a>
                <Navbar />
                <main id="main-content" className="grow">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    )
}
