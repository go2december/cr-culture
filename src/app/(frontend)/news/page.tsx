import Link from 'next/link'
import { getNews, getPageHeroes } from '@/lib/payload'
import { resolveMediaAlt, resolveMediaUrl, type MediaLike } from '@/lib/media'
import type { PublicNews } from '@/lib/public-content'
import CmsImage from '@/components/CmsImage'

const typeConfig = {
    general: { label: 'ข่าวทั่วไป', icon: <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" /><path d="M18 14h-8" /><path d="M15 18h-5" /><path d="M10 6h8v4h-8V6Z" /></svg>, color: 'text-primary bg-primary/10 border-primary/20' },
    video: { label: 'วิดีโอ', icon: <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 8-6 4 6 4V8Z" /><rect width="14" height="12" x="2" y="6" rx="2" ry="2" /></svg>, color: 'text-secondary-dark bg-secondary/10 border-secondary/20' },
    document: { label: 'เอกสาร', icon: <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /><line x1="16" x2="8" y1="13" y2="13" /><line x1="16" x2="8" y1="17" y2="17" /><line x1="10" x2="8" y1="9" y2="9" /></svg>, color: 'text-sky-700 bg-sky-500/10 border-sky-500/20' },
}

export default async function NewsPage({
    searchParams,
}: {
    searchParams: Promise<{ type?: string; page?: string }>
}) {
    const params = await searchParams
    const selectedType = params.type || 'all'
    const currentPage = Number(params.page) || 1

    const newsResponse = await getNews({
        type: selectedType === 'all' ? undefined : selectedType,
        limit: 6,
        page: currentPage
    })

    const newsItems = (newsResponse.docs || []) as PublicNews[]
    const totalPages = newsResponse.totalPages || 1
    const hasNextPage = newsResponse.hasNextPage || false
    const hasPrevPage = newsResponse.hasPrevPage || false
    const pageHeroes = await getPageHeroes().catch(() => null)
    const hero = pageHeroes?.news || {}
    const heroMedia = hero.heroImage as MediaLike
    const heroImageUrl = resolveMediaUrl(heroMedia)
    const heroImageAlt = resolveMediaAlt(heroMedia, (hero.title as string) || 'ข่าวสารและประชาสัมพันธ์')
    const hasHeroImage = Boolean(heroImageUrl)

    return (
        <div className="bg-slate-50 min-h-screen font-sans">
            <section className={`relative overflow-hidden ${hasHeroImage ? 'pt-32 pb-24 lg:pt-40 lg:pb-30 accent-panel min-h-[52vh] flex items-end' : 'pt-32 pb-20 lg:pt-40 lg:pb-28 bg-slate-50 accent-panel'}`}>
                {hasHeroImage ? (
                    <>
                        <div className="absolute inset-0 z-0">
                            <CmsImage
                                src={heroImageUrl!}
                                alt={heroImageAlt}
                                fill
                                sizes="100vw"
                                className="object-cover object-top"
                                priority
                            />
                            <div className="absolute inset-0 bg-linear-to-r from-primary/88 via-primary/68 to-primary/36" />
                            <div className="absolute inset-0 bg-lanna-pattern opacity-20" />
                            <div className="absolute top-0 right-[-10%] w-[50%] h-[70%] rounded-full bg-linear-to-bl from-secondary/18 to-transparent blur-[120px]" />
                            <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[60%] rounded-full bg-linear-to-tr from-accent/14 to-transparent blur-[130px]" />
                        </div>

                        <div className="container mx-auto max-w-5xl px-4 relative z-20">
                            <div className="max-w-3xl text-left">
                                <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium shadow-sm mb-6 bg-white/14 backdrop-blur-md border border-white/20 text-white reveal-soft">
                                            <span className="w-2 h-2 rounded-full bg-accent" />
                                            {(hero.eyebrow as string) || 'อัปเดตล่าสุด'}
                                </div>

                                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight font-display text-white leading-[1.05] drop-shadow-lg reveal-soft stagger-1">
                                            {(hero.title as string) || 'ข่าวสารและประชาสัมพันธ์'}
                                </h1>

                                <div className="w-24 h-1 rounded-full bg-linear-to-r from-secondary via-accent/60 to-transparent mb-6 reveal-soft stagger-2" />

                                <p className="text-lg md:text-xl max-w-2xl font-light leading-relaxed text-white/82 reveal-soft stagger-2">
                                            {(hero.subtitle as string) || 'ติดตามความเคลื่อนไหว ประกาศ และข่าวสารล่าสุดจากสภาวัฒนธรรมจังหวัดเชียงราย'}
                                </p>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="absolute inset-0 z-0 bg-lanna-pattern">
                            <div className="absolute top-0 right-[-10%] w-[60%] h-[70%] rounded-full bg-linear-to-bl from-secondary/15 to-transparent blur-[120px]" />
                            <div className="absolute bottom-[-20%] left-[-10%] w-[70%] h-[60%] rounded-full bg-linear-to-tr from-accent/10 to-transparent blur-[130px]" />
                        </div>

                        <div className="container mx-auto max-w-5xl px-4 relative z-20 text-center">
                            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/80 backdrop-blur-md border border-secondary/30 text-sm font-medium text-primary shadow-sm mb-6 reveal-soft">
                                <span className="w-2 h-2 rounded-full bg-accent" />
                                {(hero.eyebrow as string) || 'อัปเดตล่าสุด'}
                            </div>
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-primary tracking-tight font-display reveal-soft stagger-1">
                                {(hero.title as string) || 'ข่าวสารและประชาสัมพันธ์'}
                            </h1>
                            <p className="text-lg md:text-xl text-base-content/70 max-w-2xl mx-auto font-light leading-relaxed reveal-soft stagger-2">
                                {(hero.subtitle as string) || 'ติดตามความเคลื่อนไหว ประกาศ และข่าวสารล่าสุดจากสภาวัฒนธรรมจังหวัดเชียงราย'}
                            </p>
                        </div>
                    </>
                )}

                <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-slate-50 to-transparent z-10" />
            </section>

            {/* Breadcrumb - Subtle & Clean */}
            <div className="container mx-auto max-w-5xl px-4 py-6 relative z-20">
                <div className="breadcrumbs text-sm text-base-content/60 font-light">
                    <ul>
                        <li><Link href="/" className="inline-flex min-h-11 items-center hover:text-primary transition-colors">หน้าแรก</Link></li>
                        <li className="text-primary font-medium">ข่าวสารและประชาสัมพันธ์</li>
                    </ul>
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="container mx-auto max-w-5xl px-4 py-8">
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                    <Link href="/news" className={`inline-flex min-h-11 items-center px-6 py-2.5 rounded-full text-sm font-medium shadow-sm transition-all ${selectedType === 'all' ? 'bg-primary text-white shadow-primary/20 hover:bg-primary-dark' : 'bg-white border border-base-200 text-base-content/70 hover:border-primary hover:text-primary'}`}>
                        ทั้งหมด
                    </Link>
                    <Link href="/news?type=general" className={`inline-flex min-h-11 items-center px-5 py-2.5 rounded-full border text-sm font-medium transition-all shadow-sm hover:shadow-md gap-2 ${selectedType === 'general' ? 'bg-primary text-white border-primary' : 'bg-white border-base-200 text-base-content/70 hover:border-primary hover:text-primary'}`}>
                        <div className={selectedType === 'general' ? 'text-white' : typeConfig.general.color.split(' ')[0]}>{typeConfig.general.icon}</div> ข่าวทั่วไป
                    </Link>
                    <Link href="/news?type=video" className={`inline-flex min-h-11 items-center px-5 py-2.5 rounded-full border text-sm font-medium transition-all shadow-sm hover:shadow-md gap-2 ${selectedType === 'video' ? 'bg-secondary-dark text-white border-secondary-dark' : 'bg-white border-base-200 text-base-content/70 hover:border-secondary hover:text-secondary-dark'}`}>
                        <div className={selectedType === 'video' ? 'text-white' : typeConfig.video.color.split(' ')[0]}>{typeConfig.video.icon}</div> วิดีโอ
                    </Link>
                    <Link href="/news?type=document" className={`inline-flex min-h-11 items-center px-5 py-2.5 rounded-full border text-sm font-medium transition-all shadow-sm hover:shadow-md gap-2 ${selectedType === 'document' ? 'bg-sky-600 text-white border-sky-600' : 'bg-white border-base-200 text-base-content/70 hover:border-sky-500 hover:text-sky-700'}`}>
                        <div className={selectedType === 'document' ? 'text-white' : typeConfig.document.color.split(' ')[0]}>{typeConfig.document.icon}</div> เอกสาร
                    </Link>
                </div>
            </div>

            {/* News List */}
            <section className="container mx-auto max-w-5xl px-4 pb-24 relative z-20">
                <div className="space-y-6 mt-8">
                    {newsItems.length > 0 ? newsItems.map((news, i: number) => {
                        const config = typeConfig[news.type as keyof typeof typeConfig] || typeConfig.general
                        const newsDate = news.date || news.createdAt || new Date().toISOString()

                        return (
                            <article key={news.slug || news.id} className={`group bg-white rounded-3xl border border-base-200 shadow-[0_8px_30px_rgb(212,175,55,0.05)] hover:shadow-xl hover:border-secondary/30 transition-all duration-400 overflow-hidden reveal-soft ${i % 2 === 0 ? 'stagger-1' : 'stagger-2'}`}>
                                <div className="flex flex-col sm:flex-row items-stretch relative">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-bl from-secondary/5 to-transparent rounded-tr-3xl rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                    {/* Icon Area */}
                                    <div className="hidden sm:flex w-48 bg-slate-50/50 items-center justify-center p-8 border-r border-base-100 shrink-0 relative overflow-hidden">
                                        <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 bg-current ${config.color.split(' ')[0]}`} />
                                        <div className={`w-20 h-20 rounded-2xl flex items-center justify-center shadow-sm border border-base-200 transition-transform duration-500 ${config.color} group-hover:border-current/30 bg-white`}>
                                            {config.icon}
                                        </div>
                                    </div>

                                    {/* Content Area */}
                                    <div className="p-8 md:p-10 flex-1 flex flex-col justify-center relative z-10 w-full sm:w-auto">
                                        <div className="flex items-center flex-wrap gap-3 mb-4">
                                            <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold ${config.color.replace('border-', 'border border-')}`}>
                                                {config.label}
                                            </span>
                                            <span className="text-sm font-medium text-base-content/50 flex items-center gap-1.5">
                                                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" /></svg>
                                                {new Date(newsDate).toLocaleDateString('th-TH', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                })}
                                            </span>
                                        </div>

                                        <h2 className="text-2xl lg:text-3xl font-bold text-primary group-hover:text-primary-dark transition-colors mb-4 leading-snug tracking-tight font-display pr-8 relative z-20">
                                            <Link href={`/news/${news.slug || news.id}`} className="before:absolute before:inset-0">
                                                {news.title}
                                            </Link>
                                        </h2>

                                        <p className="text-base-content/60 font-light leading-relaxed line-clamp-2 md:line-clamp-3">
                                            {news.summary || news.excerpt}
                                        </p>
                                    </div>
                                </div>
                            </article>
                        )
                    }) : (
                        <div className="col-span-full text-center py-16 bg-white rounded-3xl border border-dashed border-base-200">
                            <p className="text-base-content/50">ยังไม่มีข่าวสารในหมวดหมู่นี้</p>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                <div className="flex justify-center mt-16">
                    {totalPages > 1 && (
                    <div className="inline-flex items-center justify-center p-1.5 bg-white rounded-full border border-base-200 shadow-sm">
                        <Link href={`?type=${selectedType}&page=${currentPage - 1}`} className={`w-11 h-11 flex items-center justify-center rounded-full ${hasPrevPage ? 'text-base-content/70 hover:bg-secondary/10 hover:text-secondary-dark transition-colors' : 'text-base-content/40 cursor-not-allowed pointer-events-none'}`}>
                            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                        </Link>
                        
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <Link key={page} href={`?type=${selectedType}&page=${page}`} className={`w-11 h-11 flex items-center justify-center rounded-full font-medium ${currentPage === page ? 'bg-linear-to-br from-primary to-primary-light text-white shadow-sm' : 'text-base-content/70 hover:bg-secondary/10 hover:text-secondary-dark transition-colors'}`}>{page}</Link>
                        ))}

                        <Link href={`?type=${selectedType}&page=${currentPage + 1}`} className={`w-11 h-11 flex items-center justify-center rounded-full ${hasNextPage ? 'text-base-content/70 hover:bg-secondary/10 hover:text-secondary-dark transition-colors' : 'text-base-content/40 cursor-not-allowed pointer-events-none'}`}>
                            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                        </Link>
                    </div>
                    )}
                </div>
            </section>
        </div>
    )
}



