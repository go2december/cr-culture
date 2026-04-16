import Link from 'next/link'
import { getActivities, getDistricts, getNews } from '@/lib/payload'

export default async function Home() {
    // Fetch data from Payload API
    const { docs: activitiesData } = await getActivities({ limit: 3 })
    const { docs: newsData } = await getNews({ limit: 3 })
    const districtsData = await getDistricts()

    return (
        <div className="overflow-hidden bg-base-100 font-sans">
            {/* Majestic Hero Section with Modern Lanna Concept */}
            <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-stone-50">
                {/* Geometric Red Background Pattern */}
                <div 
                    className="absolute inset-0 z-0 opacity-[0.08] pointer-events-none"
                    style={{
                        backgroundImage: `linear-gradient(45deg, #A03C3C 25%, transparent 25%, transparent 75%, #A03C3C 75%, #A03C3C),
                                          linear-gradient(135deg, #A03C3C 25%, transparent 25%, transparent 75%, #A03C3C 75%, #A03C3C)`,
                        backgroundSize: '40px 40px',
                        backgroundPosition: '0 0, 20px 0'
                    }}
                />
                
                {/* Soft gradient overlays to blend the pattern and ensure text readability */}
                <div className="absolute top-0 right-[-10%] w-[60%] h-[70%] rounded-full bg-linear-to-bl from-red-900/10 to-transparent blur-[120px]" />
                <div className="absolute bottom-[-20%] left-[-10%] w-[70%] h-[60%] rounded-full bg-linear-to-tr from-secondary/5 to-transparent blur-[130px]" />

                <div className="container mx-auto px-4 z-10 pt-32 pb-24 flex flex-col items-center">
                    <div className="max-w-5xl mx-auto text-center">
                        <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-white/60 backdrop-blur-md border border-red-900/10 text-sm font-medium text-stone-700 shadow-sm mb-12 uppercase tracking-widest">
                            <span className="w-2 h-2 rounded-full bg-[#A03C3C]" />
                            <span className="text-[#A03C3C] font-bold">Modern Lanna</span> <span className="text-stone-300 px-1">|</span> รากเหง้าที่ร่วมสมัย
                        </div>

                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-10 tracking-tight text-stone-800 leading-[1.1] font-display">
                            สภาวัฒนธรรม <br />
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#8A2B2B] via-[#A03C3C] to-[#C35252] font-normal relative">
                                จังหวัดเชียงราย
                                {/* Sparkle Effect */}
                                <svg aria-hidden="true" className="absolute -top-4 -right-8 w-10 h-10 text-[#A03C3C]/60" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.6h8l-6.4 4.7 2.4 7.7-6.4-4.7-6.4 4.7 2.4-7.7-6.4-4.7h8z"/></svg>
                            </span>
                        </h1>

                        <p className="text-xl md:text-2xl lg:text-3xl mb-16 text-stone-600 max-w-3xl mx-auto font-light leading-relaxed">
                            เมืองศิลปิน ถิ่นวัฒนธรรม ส่งเสริมและอนุรักษ์มรดกล้านนา <br className="hidden md:block" />
                            เชื่อมโยงอดีตสู่ปัจจุบันอย่างยั่งยืนเพื่อชนรุ่นหลัง
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <Link href="/districts" className="group relative w-full sm:w-auto overflow-hidden rounded-full bg-linear-to-r from-[#A03C3C] to-[#8A2B2B] px-10 py-5 text-center text-lg font-bold text-white shadow-lg transition-colors hover:brightness-110 hover:shadow-xl hover:shadow-[#A03C3C]/30">
                                <span className="relative z-10 flex items-center justify-center gap-3">
                                    เครือข่าย 18 อำเภอ
                                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1.5 transition-transform"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                                </span>
                            </Link>
                            <Link href="/heritage" className="w-full sm:w-auto text-center rounded-full border border-stone-200 bg-white px-10 py-5 text-lg font-medium text-stone-700 shadow-sm transition-all hover:bg-stone-50 hover:border-stone-300 hover:text-[#A03C3C]">
                                คลังมรดกภูมิปัญญา
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Elegant Bottom Edge Curve or Gradient */}
                <div className="absolute bottom-0 left-0 right-0 h-48 bg-linear-to-t from-white to-transparent z-10 pointer-events-none" />
            </section>

            {/* Cultural Heritage Highlights */}
            <section className="py-32 px-4 md:px-8 relative bg-white overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-[100px] -z-10" />
                <div className="absolute bottom-10 left-10 w-72 h-72 bg-primary/5 rounded-full blur-[80px] -z-10" />
                <div className="container mx-auto max-w-7xl relative z-10">
                    <div className="text-center mb-20">
                        <span className="text-accent font-semibold tracking-widest text-sm uppercase mb-3 block">Cultural Heritage</span>
                        <h2 className="section-header mb-6! text-primary">หมวดหมู่มรดกภูมิปัญญา</h2>
                        <p className="text-base-content/60 text-lg max-w-2xl mx-auto font-light">สำรวจและเรียนรู้ความหลากหลายของศิลปวัฒนธรรม ภูมิปัญญา และวิถีชีวิตชาวเชียงราย ผ่านมุมมองร่วมสมัย</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { title: 'มรดกภูมิปัญญา', icon: <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" /><path d="M18 14h-8" /><path d="M15 18h-5" /><path d="M10 6h8v4h-8V6Z" /></svg>, desc: 'ประเพณี การแสดง และงานช่างฝีมือที่สะท้อนถึงรากเหง้าของล้านนา', color: 'from-[#FFFDF5] to-[#FDF8E3]', borderColor: 'border-secondary/20', iconColor: 'text-secondary-dark', hoverColor: 'group-hover:bg-secondary/10' },
                            { title: 'แหล่งเรียนรู้', icon: <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>, desc: 'สถานที่ลงมือปฏิบัติและสัมผัสวิถีชีวิตจริงของชุมชนท้องถิ่น', color: 'from-[#FFF6F5] to-[#FFEBEA]', borderColor: 'border-accent/20', iconColor: 'text-accent', hoverColor: 'group-hover:bg-accent/10' },
                            { title: 'ปราชญ์ชาวบ้าน', icon: <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>, desc: 'ผู้ทรงคุณวุฒิที่อุทิศตนเพื่อการสืบทอดภูมิปัญญาและสร้างสรรค์ผลงาน', color: 'from-[#FAFAFA] to-[#F4F4F5]', borderColor: 'border-slate-300', iconColor: 'text-slate-700', hoverColor: 'group-hover:bg-slate-200/50' }
                        ].map((category, i) => (
                            <Link
                                key={i}
                                href={`/heritage?category=${i + 1}`}
                                className={`card-modern group relative rounded-3xl p-8 bg-linear-to-br ${category.color} ${category.borderColor} transition-all duration-300 hover:shadow-2xl overflow-hidden`}
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/40 rounded-full blur-2xl z-0" />
                                <div className="relative z-10 h-full flex flex-col">
                                    <div className={`w-16 h-16 mb-8 rounded-2xl bg-white border border-white/50 flex items-center justify-center ${category.iconColor} shadow-md`}>
                                        <div className={`p-3 rounded-xl transition-colors duration-300 ${category.hoverColor}`}>
                                            {category.icon}
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold mb-4 text-primary font-display group-hover:text-primary-dark transition-colors">{category.title}</h3>
                                    <p className="text-base-content/70 text-sm leading-relaxed font-light grow">
                                        {category.desc}
                                    </p>
                                    <div className="mt-6 flex items-center text-sm font-semibold opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-400">
                                        <span className={category.iconColor}>ดูเพิ่มเติม</span>
                                        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`ml-2 ${category.iconColor}`}><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* ศูนย์เชียงรายศึกษา - External Link */}
                    <div className="mt-8">
                        <a
                            href="https://social.crru.ac.th/cr-studies-center"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center justify-between p-6 md:p-8 rounded-3xl bg-linear-to-r from-[#F5F8FF] to-[#E6EFFF] border border-primary/20 hover:border-primary/40 hover:shadow-xl transition-all duration-500"
                        >
                            <div className="flex items-center gap-5">
                                <div className="w-14 h-14 rounded-2xl bg-white border border-primary/20 flex items-center justify-center text-primary shadow-md transition-colors duration-300">
                                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-primary font-display group-hover:text-primary-dark transition-colors">ศูนย์เชียงรายศึกษา</h3>
                                    <p className="text-base-content/60 text-sm font-light mt-1">แหล่งรวบรวมข้อมูล ประวัติศาสตร์ และการศึกษาวิจัยเพื่อการเรียนรู้ — มหาวิทยาลัยราชภัฏเชียงราย</p>
                                </div>
                            </div>
                            <div className="shrink-0 w-10 h-10 rounded-full bg-white border border-primary/20 flex items-center justify-center text-primary/50 group-hover:text-primary group-hover:bg-primary/5 transition-colors">
                                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" x2="21" y1="14" y2="3" /></svg>
                            </div>
                        </a>
                    </div>
                </div>
            </section>

            {/* Latest Activities Section with Timeline style */}
            <section className="py-32 px-4 md:px-8 bg-slate-50 border-y border-base-200/50 relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03] mask-kanok bg-primary" />
                <div className="absolute top-1/4 right-0 w-1/3 h-1/2 bg-linear-to-l from-secondary/5 to-transparent blur-3xl z-0" />
                <div className="absolute bottom-0 left-0 w-1/4 h-1/3 bg-linear-to-tr from-accent/5 to-transparent blur-2xl z-0" />
                <div className="container mx-auto max-w-7xl relative z-10">
                    <div className="flex flex-col md:flex-row items-end justify-between mb-16">
                        <div>
                            <span className="text-secondary font-semibold tracking-wider text-sm uppercase mb-3 block">News & Updates</span>
                            <h2 className="text-4xl font-bold text-primary font-display">กิจกรรมล่าสุด</h2>
                        </div>
                        <Link href="/activities" className="group flex min-h-11 items-center text-sm font-medium text-primary hover:text-secondary-dark transition-colors mt-6 md:mt-0 bg-white px-6 py-3 rounded-full border border-base-200 shadow-sm hover:shadow hover:border-secondary/30">
                            ดูกิจกรรมทั้งหมด
                            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {activitiesData && activitiesData.length > 0 ? activitiesData.map((item: any, i) => {
                            const dateObj = new Date(item.date)
                            const formattedDate = dateObj.toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' })
                            const imageUrl = item.titleImage?.url || item.gallery?.[0]?.image?.url
                            const description = item.excerpt || 'กิจกรรมสภาวัฒนธรรมจังหวัดเชียงราย'

                            return (
                            <div key={item.id} className={`card-modern bg-white flex flex-col h-full group rounded-2xl overflow-hidden shadow-lg shadow-primary/5 hover:shadow-2xl hover:shadow-secondary/10`}>
                                <div className="aspect-16/10 bg-base-200 relative overflow-hidden shrink-0">
                                    {imageUrl ? (
                                        <div className="absolute inset-0 transition-transform duration-300 ease-out">
                                            <img src={imageUrl} alt={item.title} className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-linear-to-t from-primary/80 via-primary/20 to-transparent" />
                                        </div>
                                    ) : (
                                        <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-secondary/10 to-accent/10 flex items-center justify-center text-6xl transition-transform duration-300">
                                            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary/45 drop-shadow-md opacity-80 filter saturate-[0.8]">
                                                <path d="M6 7h12" />
                                                <path d="M6 12h12" />
                                                <path d="M6 17h8" />
                                                <path d="M4 4h16v16H4z" />
                                            </svg>
                                            <div className="absolute inset-0 bg-linear-to-t from-primary/60 to-transparent opacity-80" />
                                        </div>
                                    )}
                                    <div className="absolute top-4 left-4 z-20">
                                        <span className="bg-white/90 backdrop-blur-sm text-primary text-xs font-bold px-4 py-2 rounded-full shadow-lg border border-white/20">{formattedDate}</span>
                                    </div>
                                </div>
                                <div className="p-8 flex flex-col grow relative bg-white">
                                    <div className="absolute top-0 right-8 w-12 h-12 bg-secondary text-white rounded-b-xl flex items-center justify-center font-display font-bold text-xl shadow-md">
                                        {`0${i + 1}`}
                                    </div>
                                    <span className="text-xs font-bold tracking-widest text-accent uppercase mb-3 block mt-2">
                                        {item.level === 'province' ? 'กิจกรรมระดับจังหวัด' : 'กิจกรรมระดับอำเภอ'}
                                    </span>
                                    <h3 className="text-xl font-bold mb-3 group-hover:text-secondary-dark transition-colors line-clamp-2 leading-tight font-display">
                                        {item.title}
                                    </h3>
                                    <p className="text-base-content/60 text-sm mb-6 line-clamp-2 font-light grow">
                                        {description}
                                    </p>
                                    <div className="pt-5 border-t border-base-100 flex items-center justify-between mt-auto">
                                        <span className="text-xs text-base-content/50 flex items-center gap-1.5 font-medium">
                                            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-secondary"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                                            {item.district?.name || 'เมืองเชียงราย'}
                                        </span>
                                        <Link href={`/activities/${item.slug || item.id}`} className="text-sm font-semibold text-primary hover:text-secondary-dark transition-colors flex min-h-11 items-center gap-1 group/link bg-slate-50 px-4 py-2 rounded-full hover:bg-secondary/10">
                                            อ่านต่อ
                                            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover/link:translate-x-1 transition-transform"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}) : (
                            <div className="col-span-full py-10 text-center text-base-content/50">ยังไม่มีข้อมูลกิจกรรม</div>
                        )}
                    </div>
                </div>
            </section>

            {/* Latest News Section */}
            <section className="py-24 px-4 md:px-8 bg-white overflow-hidden relative border-b border-base-200/50">
                <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full blur-[80px] -z-10" />
                <div className="container mx-auto max-w-7xl relative z-10">
                    <div className="flex flex-col md:flex-row items-end justify-between mb-16">
                        <div>
                            <span className="text-accent font-semibold tracking-wider text-sm uppercase mb-3 block">Press & Announcements</span>
                            <h2 className="text-4xl font-bold text-primary font-display">ข่าวสารล่าสุด</h2>
                        </div>
                        <Link href="/news" className="group flex min-h-11 items-center text-sm font-medium text-primary hover:text-secondary-dark transition-colors mt-6 md:mt-0 bg-white px-6 py-3 rounded-full border border-base-200 shadow-sm hover:shadow hover:border-secondary/30">
                            ดูข่าวทั้งหมด
                            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {newsData && newsData.length > 0 ? newsData.map((news: any, i) => {
                            const dateObj = new Date(news.date || news.createdAt)
                            const formattedDate = dateObj.toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' })
                            
                            const typeConfig = {
                                general: { label: 'ข่าวทั่วไป', color: 'text-primary border-primary/20 bg-primary/5' },
                                video: { label: 'วิดีโอ', color: 'text-secondary-dark border-secondary/20 bg-secondary/5' },
                                document: { label: 'เอกสาร', color: 'text-sky-700 border-sky-500/20 bg-sky-500/5' },
                            }
                            
                            const config = typeConfig[news.type as keyof typeof typeConfig] || typeConfig.general

                            return (
                            <Link key={news.id} href={`/news/${news.slug || news.id}`} className={`bg-white group rounded-3xl p-6 sm:p-8 flex flex-col h-full border border-base-200 hover:border-secondary/30 hover:shadow-xl hover:shadow-secondary/5 transition-all duration-300`}>
                                <div className="flex items-center justify-between mb-6">
                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest border ${config.color}`}>
                                        {config.label}
                                    </span>
                                    <span className="text-sm font-medium text-base-content/50 flex items-center gap-1.5">
                                        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" /></svg>
                                        {formattedDate}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold mb-4 font-display text-base-content group-hover:text-primary transition-colors line-clamp-3 leading-snug">
                                    {news.title}
                                </h3>
                                <p className="text-base-content/60 text-sm font-light line-clamp-2 md:line-clamp-3 mb-6 mt-auto">
                                    {news.summary || news.excerpt}
                                </p>
                                <div className="flex items-center gap-2 text-sm font-bold text-primary group-hover:underline group-hover:text-secondary-dark mt-auto">
                                    อ่านรายละเอียด
                                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                                </div>
                            </Link>
                        )}) : (
                            <div className="col-span-full py-10 text-center text-base-content/50">ยังไม่มีข้อมูลข่าวสาร</div>
                        )}
                    </div>
                </div>
            </section>

            {/* 18 Districts Quick Access */}
            <section className="py-32 px-4 md:px-8 bg-white overflow-hidden relative">
                <div className="absolute left-0 bottom-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -z-10" />
                <div className="absolute top-20 right-10 w-64 h-64 bg-accent/5 rounded-full blur-[80px] -z-10" />
                <div className="container mx-auto max-w-7xl text-center relative z-10">
                    <span className="text-accent font-semibold tracking-wider text-sm uppercase mb-3 block">Local Network</span>
                    <h2 className="section-header mb-6! text-center font-display">เครือข่ายสภาวัฒนธรรมอำเภอ</h2>
                    <p className="text-lg text-base-content/60 mb-16 max-w-2xl mx-auto font-light">
                        ประสานความร่วมมือและส่งเสริมกิจกรรมทางวัฒนธรรมครอบคลุมพื้นที่ 18 อำเภอ ในจังหวัดเชียงราย
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
                        {districtsData && districtsData.length > 0 ? districtsData.map((district: any, i) => (
                            <Link
                                key={district.id || i}
                                href={`/districts/${district.slug || district.name.toLowerCase().replace(/\s+/g, '-')}`}
                                className="group bg-slate-50 rounded-xl border border-base-200/80 p-5 flex flex-col items-center gap-4 hover:bg-white hover:border-secondary/50 hover:shadow-[0_8px_30px_rgb(212,175,55,0.1)] transition-all duration-300 relative overflow-hidden"
                            >
                                <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-secondary-light to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="w-12 h-12 rounded-full bg-white border border-base-200 flex items-center justify-center group-hover:bg-secondary/10 group-hover:border-secondary/30 transition-colors shadow-sm">
                                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-primary/40 group-hover:text-secondary-dark transition-colors duration-300" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                                </div>
                                <span className="text-base md:text-lg font-medium text-primary/70 group-hover:text-primary transition-colors font-display tracking-wide">{district.name}</span>
                            </Link>
                        )) : (
                            <div className="col-span-full py-10 text-center text-base-content/50">ยังไม่มีข้อมูลเครือข่ายอำเภอ</div>
                        )}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-28 px-4 md:px-8 relative overflow-hidden bg-primary border-t border-primary-dark z-0">
                <div className="absolute inset-0 z-0">
                    {/* ฐานพื้นหลังสีน้ำเงินเข้ม */}
                    <div className="absolute inset-0 bg-primary/95" />

                    {/* ลวดลายผ้าทอล้านนาสีทองไล่เฉด */}
                    <div className="absolute inset-0 bg-linear-to-br from-secondary via-secondary-light to-accent mask-woven opacity-15 mix-blend-plus-lighter" />

                    {/* ทับซ้อนด้วยไล่เฉดสีน้ำเงินเข้มขอบๆ เพื่อบังให้เห็นลวดลายแค่นิดหน่อยตรงกลาง */}
                    <div className="absolute inset-0 bg-linear-to-b from-primary/90 via-transparent to-primary/90" />
                    <div className="absolute inset-0 bg-linear-to-r from-primary/80 via-transparent to-primary/80" />

                    {/* แสงสะท้อนประกอบ (ปรับให้อ่อนลง) */}
                    <div className="absolute top-0 right-[-10%] w-[50%] h-full rounded-full bg-linear-to-bl from-secondary/10 to-transparent blur-[100px]" />
                    <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-full rounded-full bg-linear-to-tr from-accent/10 to-transparent blur-[100px]" />
                </div>

                <div className="container mx-auto max-w-4xl text-center relative z-20">
                    <div className="w-16 h-1.5 bg-linear-to-r from-secondary to-secondary-light mx-auto mb-8 rounded-full shadow-[0_0_15px_rgba(212,175,55,0.5)]" />
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight font-display text-white drop-shadow-md">
                        ร่วมเป็นส่วนหนึ่งในการอนุรักษ์วัฒนธรรม
                    </h2>
                    <p className="text-xl text-blue-100/90 mb-12 font-light max-w-2xl mx-auto leading-relaxed">
                        เพื่อให้มรดกอันมีค่าเหล่านี้ ได้ส่งต่อถึงอนุชนรุ่นหลังอย่างยั่งยืน
                    </p>
                    <Link href="/contact" className="inline-flex min-h-11 items-center gap-3 bg-linear-to-r from-secondary to-secondary-light text-primary-dark px-10 py-4 rounded-full font-bold hover:from-secondary-light hover:to-secondary transition-all shadow-[0_8px_30px_rgba(212,175,55,0.25)] hover:shadow-[0_12px_40px_rgba(212,175,55,0.4)] text-lg group border border-secondary/50">
                        ติดต่อสอบถาม
                        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                    </Link>
                </div>
            </section>
        </div>
    )
}





