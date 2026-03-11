import Link from 'next/link'
import { getActivities } from '@/lib/payload'

export default async function ActivitiesPage() {
    const rawActivities = await getActivities() || []
    
    // Fallback data if no activities
    const displayActivities = rawActivities.length > 0 ? rawActivities : [
        {
            slug: 'songkran-2026',
            title: 'งานสงกรานต์เชียงราย 2569',
            date: '2026-04-13',
            endDate: '2026-04-15',
            level: 'province',
            location: 'ลานอนุสาวรีย์พ่อขุนเม็งรายมหาราช',
            excerpt: 'เทศกาลสงกรานต์ประจำปีจังหวัดเชียงราย สืบสานประเพณีไทย',
        },
        {
            slug: 'loy-krathong-2026',
            title: 'งานลอยกระทงเชียงราย 2569',
            date: '2026-11-15',
            level: 'province',
            location: 'ริมแม่น้ำกก',
            excerpt: 'งานลอยกระทงประจำปี สืบสานประเพณียี่เป็ง',
        },
    ]

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
                        กิจกรรมและประเพณี
                    </div>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-primary tracking-tight animate-fade-in-up delay-100 font-display">
                        กิจกรรมสภาวัฒนธรรม
                    </h1>
                    <p className="text-lg md:text-xl text-base-content/70 max-w-2xl mx-auto font-light leading-relaxed animate-fade-in-up delay-200">
                        รวมข่าวสารกิจกรรมและงานประเพณีท้องถิ่นที่จัดโดยสภาวัฒนธรรมจังหวัดเชียงรายและเครือข่ายระดับอำเภอ
                    </p>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 to-transparent z-10" />
            </section>

            {/* Breadcrumb - Subtle & Clean */}
            <div className="container mx-auto max-w-7xl px-4 py-6 relative z-20">
                <div className="breadcrumbs text-sm text-base-content/60 font-light">
                    <ul>
                        <li><Link href="/" className="hover:text-primary transition-colors">หน้าแรก</Link></li>
                        <li className="text-primary font-medium">กิจกรรมสภาวัฒนธรรม</li>
                    </ul>
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="container mx-auto max-w-7xl px-4 py-8 animate-fade-in-up delay-300">
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                    <button className="px-6 py-2.5 rounded-full bg-primary text-white text-sm font-medium shadow-md hover:bg-primary-dark transition-colors">ทั้งหมด</button>
                    <button className="px-6 py-2.5 rounded-full bg-slate-50 border border-base-200 text-base-content/70 text-sm font-medium hover:border-secondary hover:text-primary transition-all shadow-sm focus:bg-primary focus:text-white focus:border-primary">ระดับจังหวัด</button>
                    <button className="px-6 py-2.5 rounded-full bg-slate-50 border border-base-200 text-base-content/70 text-sm font-medium hover:border-secondary hover:text-primary transition-all shadow-sm focus:bg-primary focus:text-white focus:border-primary">ระดับอำเภอ</button>
                    <div className="ml-auto basis-full md:basis-auto flex justify-center md:justify-end mt-4 md:mt-0">
                        <Link href="/activities/calendar" className="px-6 py-2.5 rounded-full bg-secondary/20 text-primary-dark text-sm font-medium hover:bg-secondary/30 transition-colors flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" /><path d="M8 14h.01" /><path d="M12 14h.01" /><path d="M16 14h.01" /><path d="M8 18h.01" /><path d="M12 18h.01" /><path d="M16 18h.01" /></svg>
                            ปฏิทินกิจกรรม
                        </Link>
                    </div>
                </div>
            </div>

            {/* Activities Grid */}
            <section className="container mx-auto max-w-7xl px-4 pb-24">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 animate-fade-in-up delay-400">
                    {displayActivities.map((activity: any, i) => {
                        const dateObj = new Date(activity.date)
                        const imageUrl = activity.titleImage?.url || activity.gallery?.[0]?.image?.url
                        
                        return (
                        <div key={activity.id || activity.slug} className={`card-modern bg-white flex flex-col h-full group rounded-3xl overflow-hidden border border-base-200 shadow-sm hover:shadow-[0_8px_30px_rgb(212,175,55,0.08)] hover:border-secondary/50 transition-all duration-400 delay-${(i % 3 + 1) * 100}`}>
                            <div className="aspect-[16/10] bg-slate-50 relative overflow-hidden flex-shrink-0 border-b border-base-100">
                                {imageUrl ? (
                                    <div className="absolute inset-0 group-hover:scale-110 transition-transform duration-700 ease-out">
                                        <img src={imageUrl} alt={activity.title} className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
                                    </div>
                                ) : (
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/10 flex items-center justify-center text-4xl group-hover:scale-105 transition-transform duration-700">
                                    <span className="drop-shadow-sm group-hover:-translate-y-2 transition-transform duration-500 delay-100">🎉</span>
                                </div>
                                )}
                                <div className="absolute top-4 left-4 z-20">
                                    <div className="bg-white/95 backdrop-blur-sm shadow-md border border-white/50 rounded-xl overflow-hidden text-center min-w-[70px] flex flex-col">
                                        <div className="bg-secondary text-primary-dark text-xs font-bold py-1 px-3 mb-0 uppercase tracking-widest leading-none">
                                            {dateObj.toLocaleDateString('th-TH', { month: 'short' })}
                                        </div>
                                        <div className="text-2xl font-bold text-primary py-2 px-3 bg-white font-display">
                                            {dateObj.getDate()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="p-8 flex flex-col flex-grow relative">
                                <span className={`text-[10px] font-bold px-2.5 py-1 rounded inline-block w-fit uppercase tracking-widest mb-4 ${activity.level === 'province' ? 'bg-primary/10 text-primary' : 'bg-secondary/20 text-secondary-dark'}`}>
                                    {activity.level === 'province' ? 'กิจกรรมระดับจังหวัด' : `กิจกรรมระดับอำเภอ ${activity.district?.name || activity.districtName || ''}`}
                                </span>
                                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2 leading-tight font-display text-base-content relative z-10 w-full">
                                    {activity.title}
                                </h3>
                                {(activity.location || activity.district?.name) && (
                                <p className="text-sm font-medium text-base-content/50 flex items-center gap-2 mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-secondary"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                                    {activity.location || activity.district?.name}
                                </p>
                                )}
                                <p className="text-base-content/60 text-sm mb-6 line-clamp-2 font-light flex-grow">
                                    {activity.excerpt || activity.summary}
                                </p>
                                <div className="pt-5 border-t border-base-100 flex items-center justify-between mt-auto">
                                    <Link href={`/activities/${activity.slug || activity.id}`} className="text-sm font-semibold text-primary hover:text-secondary-dark transition-colors flex items-center gap-1 group/link w-full justify-between">
                                        ดูรายละเอียดกิจกรรม
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover/link:translate-x-1 transition-transform text-secondary"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )})}
                </div>

                {/* Load More */}
                <div className="text-center mt-16 animate-fade-in-up delay-500">
                    <button className="btn-outline-lanna inline-flex items-center justify-center min-w-[200px]">
                        โหลดเพิ่มเติม
                    </button>
                </div>
            </section>
        </div>
    )
}
