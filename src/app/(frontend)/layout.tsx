import type { Metadata } from 'next'
import { Prompt, Charmonman, Noto_Serif_Thai } from 'next/font/google'
import '../globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const prompt = Prompt({
    subsets: ['thai', 'latin'],
    weight: ['300', '400', '500', '600', '700'],
    variable: '--font-sans',
    display: 'swap',
})

const charmonman = Charmonman({
    subsets: ['thai', 'latin'],
    weight: ['400', '700'],
    variable: '--font-display',
    display: 'swap',
})

const notoSerifThai = Noto_Serif_Thai({
    subsets: ['thai', 'latin'],
    weight: ['400', '500', '600', '700'],
    variable: '--font-noto-serif',
    display: 'swap',
})

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

export default function FrontendLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="th" data-theme="lofi">
            <body className={`min-h-screen flex flex-col font-sans ${prompt.variable} ${charmonman.variable} ${notoSerifThai.variable}`}>
                <Navbar />
                <main className="flex-grow">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    )
}
