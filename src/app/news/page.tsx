import Link from 'next/link'

const newsItems = [
    {
        slug: 'culture-council-meeting-2026',
        title: 'ประชุมสภาวัฒนธรรมจังหวัดเชียงราย ครั้งที่ 1/2569',
        type: 'general',
        publishedAt: '2026-01-10',
        excerpt: 'สรุปผลการประชุมและแผนการดำเนินงานประจำปี 2569 พร้อมทั้งหารือแนวทางการจัดกิจกรรมส่งเสริมสืบสานวัฒนธรรมล้านนาตลอดปี',
    },
    {
        slug: 'lanna-dance-documentary',
        title: 'สารคดี: ฟ้อนเล็บ ศิลปะการแสดงล้านนา',
        type: 'video',
        publishedAt: '2026-01-08',
        excerpt: 'สารคดีเชิงลึกเกี่ยวกับการอนุรักษ์ฟ้อนเล็บ การถ่ายทอดจากรุ่นสู่รุ่น และความสำคัญในงานประเพณีต่างๆ ของชาวล้านนา',
        videoUrl: 'https://youtube.com/watch?v=xxx',
    },
    {
        slug: 'annual-report-2568',
        title: 'รายงานประจำปี 2568 สภาวัฒนธรรมจังหวัดเชียงราย',
        type: 'document',
        publishedAt: '2026-01-05',
        excerpt: 'ดาวน์โหลดรายงานประจำปี 2568 รวบรวมผลการดำเนินงาน กิจกรรม และงบประมาณในการส่งเสริมวัฒนธรรมของจังหวัดเชียงราย',
    },
    {
        slug: 'heritage-award-2026',
        title: 'ประกาศรายชื่อผู้ได้รับรางวัลมรดกภูมิปัญญาดีเด่น 2569',
        type: 'general',
        publishedAt: '2026-01-03',
        excerpt: 'ประกาศผลการคัดเลือกบุคคลที่มีผลงานดีเด่นด้านการอนุรักษ์และสืบสานมรดกภูมิปัญญาทางวัฒนธรรม ประจำปี 2569',
    },
]

const typeConfig = {
    general: { label: 'ข่าวทั่วไป', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" /><path d="M18 14h-8" /><path d="M15 18h-5" /><path d="M10 6h8v4h-8V6Z" /></svg>, color: 'text-primary bg-primary/10 border-primary/20' },
    video: { label: 'วิดีโอ', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 8-6 4 6 4V8Z" /><rect width="14" height="12" x="2" y="6" rx="2" ry="2" /></svg>, color: 'text-secondary-dark bg-secondary/10 border-secondary/20' },
    document: { label: 'เอกสาร', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /><line x1="16" x2="8" y1="13" y2="13" /><line x1="16" x2="8" y1="17" y2="17" /><line x1="10" x2="8" y1="9" y2="9" /></svg>, color: 'text-sky-700 bg-sky-500/10 border-sky-500/20' },
}

export default function NewsPage() {
    return (
        <div className="bg-slate-50 min-h-screen font-sans">
            {/* Elegant Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-slate-50">
                <div className="absolute inset-0 z-0 bg-lanna-pattern">
                    <div className="absolute top-0 right-[-10%] w-[60%] h-[70%] rounded-full bg-gradient-to-bl from-secondary/15 to-transparent blur-[120px]" />
                    <div className="absolute bottom-[-20%] left-[-10%] w-[70%] h-[60%] rounded-full bg-gradient-to-tr from-accent/10 to-transparent blur-[130px]" />
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/80 backdrop-blur-md border border-secondary/30 text-sm font-medium text-primary shadow-sm mb-6 animate-fade-in-up">
                        <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                        อัปเดตล่าสุด
                    </div>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-primary tracking-tight animate-fade-in-up delay-100 font-display">
                        ข่าวสารและประชาสัมพันธ์
                    </h1>
                    <p className="text-lg md:text-xl text-base-content/70 max-w-2xl mx-auto font-light leading-relaxed animate-fade-in-up delay-200">
                        ติดตามความเคลื่อนไหว ประกาศ และข่าวสารล่าสุดจากสภาวัฒนธรรมจังหวัดเชียงราย
                    </p>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 to-transparent z-10" />
            </section>

            {/* Breadcrumb - Subtle & Clean */}
            <div className="container mx-auto max-w-5xl px-4 py-6 relative z-20">
                <div className="breadcrumbs text-sm text-base-content/60 font-light">
                    <ul>
                        <li><Link href="/" className="hover:text-primary transition-colors">หน้าแรก</Link></li>
                        <li className="text-primary font-medium">ข่าวสารและประชาสัมพันธ์</li>
                    </ul>
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="container mx-auto max-w-5xl px-4 py-8 animate-fade-in-up delay-300">
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                    <button className="px-6 py-2.5 rounded-full bg-primary text-white text-sm font-medium shadow-md shadow-primary/20 hover:bg-primary-dark transition-all">ทั้งหมด</button>
                    <button className="px-5 py-2.5 rounded-full bg-white border border-base-200 text-base-content/70 text-sm font-medium hover:border-primary hover:text-primary transition-all shadow-sm hover:shadow-md flex items-center gap-2">
                        {typeConfig.general.icon} ข่าวทั่วไป
                    </button>
                    <button className="px-5 py-2.5 rounded-full bg-white border border-base-200 text-base-content/70 text-sm font-medium hover:border-secondary hover:text-secondary-dark transition-all shadow-sm hover:shadow-md flex items-center gap-2">
                        {typeConfig.video.icon} วิดีโอ
                    </button>
                    <button className="px-5 py-2.5 rounded-full bg-white border border-base-200 text-base-content/70 text-sm font-medium hover:border-sky-500 hover:text-sky-700 transition-all shadow-sm hover:shadow-md flex items-center gap-2">
                        {typeConfig.document.icon} เอกสาร
                    </button>
                </div>
            </div>

            {/* News List */}
            <section className="container mx-auto max-w-5xl px-4 pb-24 relative z-20">
                <div className="space-y-6 mt-8">
                    {newsItems.map((news, i) => {
                        const config = typeConfig[news.type as keyof typeof typeConfig]

                        return (
                            <article key={news.slug} className={`group bg-white rounded-3xl border border-base-200 shadow-[0_8px_30px_rgb(212,175,55,0.05)] hover:shadow-xl hover:border-secondary/30 transition-all duration-400 overflow-hidden animate-fade-in-up delay-${(i % 4 + 1) * 100}`}>
                                <div className="flex flex-col sm:flex-row items-stretch relative">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-secondary/5 to-transparent rounded-tr-3xl rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                    {/* Icon Area */}
                                    <div className="hidden sm:flex w-48 bg-slate-50/50 items-center justify-center p-8 border-r border-base-100 flex-shrink-0 relative overflow-hidden">
                                        <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 bg-current ${config.color.split(' ')[0]}`} />
                                        <div className={`w-20 h-20 rounded-2xl flex items-center justify-center shadow-sm border border-base-200 group-hover:scale-110 transition-transform duration-500 ${config.color} group-hover:border-current/30 bg-white`}>
                                            {config.icon}
                                        </div>
                                    </div>

                                    {/* Content Area */}
                                    <div className="p-8 md:p-10 flex-1 flex flex-col justify-center relative z-10">
                                        <div className="flex items-center flex-wrap gap-3 mb-4">
                                            <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold ${config.color.replace('border-', 'border border-')}`}>
                                                {config.label}
                                            </span>
                                            <span className="text-sm font-medium text-base-content/50 flex items-center gap-1.5">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" /></svg>
                                                {new Date(news.publishedAt).toLocaleDateString('th-TH', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                })}
                                            </span>
                                        </div>

                                        <h2 className="text-2xl lg:text-3xl font-bold text-primary group-hover:text-primary-dark transition-colors mb-4 leading-snug tracking-tight font-display pr-8">
                                            <Link href={`/news/${news.slug}`} className="before:absolute before:inset-0">
                                                {news.title}
                                            </Link>
                                        </h2>

                                        <p className="text-base-content/60 font-light leading-relaxed line-clamp-2 md:line-clamp-3 mb-8">
                                            {news.excerpt}
                                        </p>

                                        <div className="mt-auto flex items-center">
                                            {news.type === 'document' ? (
                                                <span className="inline-flex items-center gap-2 text-sm font-bold text-sky-600 group-hover:underline">
                                                    ดาวน์โหลดเอกสาร
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-y-0.5 transition-transform"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" /></svg>
                                                </span>
                                            ) : news.type === 'video' ? (
                                                <span className="inline-flex items-center gap-2 text-sm font-bold text-secondary-dark group-hover:underline">
                                                    รับชมวิดีโอ
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform"><circle cx="12" cy="12" r="10" /><polygon points="10 8 16 12 10 16 10 8" /></svg>
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 text-sm font-bold text-primary group-hover:underline">
                                                    อ่านรายละเอียด
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </article>
                        )
                    })}
                </div>

                {/* Pagination */}
                <div className="flex justify-center mt-16 animate-fade-in-up delay-500">
                    <div className="inline-flex items-center justify-center p-1.5 bg-white rounded-full border border-base-200 shadow-sm">
                        <button className="w-10 h-10 flex items-center justify-center rounded-full text-base-content/40 cursor-not-allowed">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                        </button>
                        <button className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-light text-white font-medium shadow-sm">1</button>
                        <button className="w-10 h-10 flex items-center justify-center rounded-full text-base-content/70 hover:bg-secondary/10 hover:text-secondary-dark transition-colors font-medium">2</button>
                        <button className="w-10 h-10 flex items-center justify-center rounded-full text-base-content/70 hover:bg-secondary/10 hover:text-secondary-dark transition-colors font-medium">3</button>
                        <button className="w-10 h-10 flex items-center justify-center rounded-full text-base-content/70 hover:bg-secondary/10 hover:text-secondary-dark transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                        </button>
                    </div>
                </div>
            </section>
        </div>
    )
}
