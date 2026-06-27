import type { Metadata } from 'next'
import '../globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { getPayload } from 'payload'
import config from '@/payload.config'

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

export default async function FrontendLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const payload = await getPayload({ config })
    const settings = await payload.findGlobal({
        slug: 'site-settings',
    }).catch(() => ({ defaultTheme: 'normal' })) as { defaultTheme?: 'normal' | 'mourning' }

    const defaultTheme = settings?.defaultTheme || 'normal'

    return (
        <html
            lang="th"
            data-theme="lofi"
            className={defaultTheme === 'mourning' ? 'mourning' : undefined}
            suppressHydrationWarning
        >
            <head>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            try {
                                var savedTheme = localStorage.getItem('site-theme');
                                var defaultTheme = '${defaultTheme}';
                                var activeTheme = savedTheme || defaultTheme;
                                if (activeTheme === 'mourning') {
                                    document.documentElement.classList.add('mourning');
                                } else {
                                    document.documentElement.classList.remove('mourning');
                                }
                            } catch (e) {}
                        `,
                    }}
                />
            </head>
            <body className="min-h-screen flex flex-col font-sans">
                <a href="#main-content" className="skip-link">ข้ามไปยังเนื้อหาหลัก</a>
                <Navbar defaultTheme={defaultTheme} />
                <main id="main-content" className="grow">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    )
}
