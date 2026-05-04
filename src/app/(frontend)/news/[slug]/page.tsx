import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getNewsBySlug, getNews } from '@/lib/payload'
import { resolveMediaUrl, type GalleryItemLike } from '@/lib/media'
import type { PublicNews } from '@/lib/public-content'
import CmsImage from '@/components/CmsImage'
import DeferredShareButtons from '@/components/DeferredShareButtons'

const typeConfig = {
    general: { label: 'ข่าวทั่วไป', icon: <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" /><path d="M18 14h-8" /><path d="M15 18h-5" /><path d="M10 6h8v4h-8V6Z" /></svg>, color: 'text-primary bg-primary/10 border-primary/20' },
    video: { label: 'วิดีโอ', icon: <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 8-6 4 6 4V8Z" /><rect width="14" height="12" x="2" y="6" rx="2" ry="2" /></svg>, color: 'text-secondary-dark bg-secondary/10 border-secondary/20' },
    document: { label: 'เอกสาร', icon: <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /><line x1="16" x2="8" y1="13" y2="13" /><line x1="16" x2="8" y1="17" y2="17" /><line x1="10" x2="8" y1="9" y2="9" /></svg>, color: 'text-sky-700 bg-sky-500/10 border-sky-500/20' },
}

export default async function NewsDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const decodedSlug = decodeURIComponent(slug)

    // Fetch from Payload API
    const newsData = await getNewsBySlug(decodedSlug)
    if (!newsData) {
        return notFound()
    }

    const config = typeConfig[newsData.type as keyof typeof typeConfig] || typeConfig.general
    const dateObj = new Date(newsData.date || newsData.createdAt)

    const news: PublicNews & { contentHtml: string; gallery: GalleryItemLike[] } = {
        id: newsData.id,
        slug: newsData.slug,
        title: newsData.title,
        type: newsData.type,
        date: newsData.date || newsData.createdAt,
        summary: newsData.summary || newsData.excerpt,
        contentHtml: newsData.content_html || newsData.summary || '<p>ไม่มีเนื้อหาเพิ่มเติม</p>',
        coverImage: newsData.coverImage,
        gallery: newsData.gallery || [],
    }

    const heroImageUrl = resolveMediaUrl(news.coverImage)
    const hasHeroImage = Boolean(heroImageUrl)

    // Fetch related news (same type, max 3)
    const relatedResponse = await getNews({ type: news.type, limit: 4 })
    const relatedNews = ((relatedResponse.docs || []) as PublicNews[]).filter((doc) => doc.id !== newsData.id).slice(0, 3)

    return (
        <div className="bg-slate-50 min-h-screen pb-24 font-sans">
            <section className={`relative overflow-hidden ${hasHeroImage ? 'pt-32 pb-24 lg:pt-40 lg:pb-30 accent-panel min-h-[52vh] flex items-end' : 'pt-32 pb-24 lg:pt-40 lg:pb-32 bg-white border-b border-base-200 accent-panel'}`}>
                <div className="absolute inset-0 z-0 bg-linear-to-br from-slate-50/90 to-white/90">
                    <div className="absolute top-0 right-[-10%] w-[60%] h-[70%] rounded-full bg-linear-to-bl from-secondary/10 to-transparent blur-[120px]" />
                    <div className="absolute bottom-[-20%] left-[-10%] w-[70%] h-[60%] rounded-full bg-linear-to-tr from-primary/10 to-transparent blur-[130px]" />
                </div>

                {hasHeroImage ? (
                    <>
                        <div className="absolute inset-0 z-0">
                            <CmsImage
                                src={heroImageUrl!}
                                alt={news.title}
                                fill
                                sizes="100vw"
                                className="object-cover object-top"
                                priority
                            />
                            <div className="absolute inset-0 bg-linear-to-r from-primary/88 via-primary/68 to-primary/36" />
                            <div className="absolute inset-0 bg-lanna-pattern opacity-20" />
                            <div className="absolute top-0 right-[-10%] w-[60%] h-[70%] rounded-full bg-linear-to-bl from-secondary/18 to-transparent blur-[120px]" />
                            <div className="absolute bottom-[-20%] left-[-10%] w-[70%] h-[60%] rounded-full bg-linear-to-tr from-accent/14 to-transparent blur-[130px]" />
                        </div>

                        <div className="container mx-auto max-w-5xl px-4 relative z-10">
                            <div className="max-w-4xl text-left">
                                <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-sm font-medium shadow-sm mb-6 bg-white/12 backdrop-blur-md text-white reveal-soft ${config.color.replace('text-', 'border-white/20 text-white ').replace(/bg-[^ ]+/, '')}`}>
                                    {config.icon}
                                    {config.label}
                                </div>
                                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight text-white leading-tight font-display max-w-4xl drop-shadow-lg reveal-soft stagger-1">
                                    {news.title}
                                </h1>
                                <div className="w-24 h-1 rounded-full bg-linear-to-r from-secondary via-accent/60 to-transparent mb-6 reveal-soft stagger-2" />
                                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/78 font-medium reveal-soft stagger-2">
                                    <div className="flex items-center gap-1.5">
                                        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" /></svg>
                                        {dateObj.toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' })}
                                    </div>
                                    <div className="hidden sm:block w-1 h-1 rounded-full bg-white/40" />
                                    <div className="flex items-center gap-1.5">
                                        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" /></svg>
                                        สภาวัฒนธรรมเชียงราย
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="container mx-auto max-w-4xl px-4 relative z-10 text-center">
                        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-sm font-medium shadow-sm mb-6 reveal-soft ${config.color.replace('border-', 'border border-')} bg-white`}>
                            {config.icon}
                            {config.label}
                        </div>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 tracking-tight text-primary leading-tight max-w-3xl mx-auto reveal-soft stagger-1 font-display">
                            {news.title}
                        </h1>
                        <div className="flex justify-center items-center gap-4 text-sm text-base-content/60 font-medium reveal-soft stagger-2 flex-wrap">
                            <div className="flex items-center gap-1.5">
                                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" /></svg>
                                {dateObj.toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' })}
                            </div>
                            <div className="w-1 h-1 rounded-full bg-base-300" />
                            <div className="flex items-center gap-1.5">
                                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" /></svg>
                                สภาวัฒนธรรมเชียงราย
                            </div>
                        </div>
                    </div>
                )}

                <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-slate-50 to-transparent z-10" />
            </section>

            {/* Breadcrumb Container */}
            <div className="container mx-auto max-w-4xl px-4 relative z-20 -mt-8 mb-8 flex justify-center">
                <div className="bg-white/95 backdrop-blur-md px-4 sm:px-6 py-3 rounded-2xl shadow-sm border border-base-200 inline-flex items-center max-w-full overflow-hidden reveal-soft">
                    <nav className="text-sm text-base-content/60 font-light w-full">
                        <ol className="flex items-center gap-2">
                            <li className="hidden sm:block"><Link href="/" className="hover:text-primary transition-colors whitespace-nowrap">หน้าแรก</Link></li>
                            <li className="hidden sm:block opacity-50">/</li>
                            <li><Link href="/news" className="hover:text-primary transition-colors whitespace-nowrap">ข่าวสาร</Link></li>
                            <li className="opacity-50">/</li>
                            <li className="text-primary font-medium truncate shrink">{news.title}</li>
                        </ol>
                    </nav>
                </div>
            </div>

            <div className="container mx-auto max-w-4xl px-4 pb-12">
                <article className="bg-white rounded-3xl border border-base-200 shadow-sm p-6 sm:p-10 lg:p-12 mb-12 accent-panel">
                    {/* Share Bar */}
                    <div className="flex items-center justify-between pb-6 mb-8 border-b border-base-100 reveal-soft">
                        <span className="text-sm font-semibold text-base-content/50 uppercase tracking-widest">แชร์ข่าวสาร</span>
                        <DeferredShareButtons title={news.title} />
                    </div>

                    {heroImageUrl && (
                        <figure className="mb-10 rounded-2xl overflow-hidden shadow-sm border border-base-200 bg-slate-50">
                            <CmsImage
                                src={heroImageUrl}
                                alt={news.title}
                                width={1600}
                                height={900}
                                sizes="(min-width: 1024px) 896px, 100vw"
                                className="w-full h-auto object-cover max-h-150"
                                priority
                            />
                        </figure>
                    )}

                    {news.summary && (
                        <div className="p-6 md:p-8 bg-slate-50/80 rounded-2xl border-l-4 border-l-primary border border-y-base-200 border-r-base-200 mb-10">
                            <p className="text-xl text-primary-dark font-display leading-relaxed">
                                {news.summary}
                            </p>
                        </div>
                    )}

                    <div
                        className="prose prose-lg md:prose-xl max-w-none prose-headings:text-primary prose-headings:font-bold prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-p:text-base-content/80 prose-p:leading-relaxed prose-a:text-primary hover:prose-a:text-primary-light prose-strong:text-base-content prose-img:rounded-2xl"
                        dangerouslySetInnerHTML={{ __html: news.contentHtml }}
                    />


                    {/* Gallery */}
                    {news.gallery.length > 0 && (
                        <div className="mt-12 pt-10 border-t border-base-100 reveal-soft stagger-1">
                            <h3 className="text-2xl font-bold text-primary mb-8 flex items-center gap-3">
                                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" /></svg>
                                แกลเลอรี
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {news.gallery.filter((item): item is NonNullable<GalleryItemLike> & { caption?: string | null } => Boolean(item)).map((item, i: number) => {
                                    const imageUrl = resolveMediaUrl(item.image)
                                    return (
                                        <div key={i} className="group relative aspect-square bg-slate-100 rounded-2xl border border-base-200 flex items-center justify-center overflow-hidden cursor-pointer hover:border-primary/30 hover:shadow-md transition-all">
                                            {imageUrl ? (
                                                <CmsImage
                                                    src={imageUrl}
                                                    alt={item.caption || 'Gallery image'}
                                                    fill
                                                    sizes="(min-width: 768px) 33vw, 50vw"
                                                    className="object-cover transition-transform duration-500"
                                                />
                                            ) : (
                                                <div className="text-center p-4 z-10 transition-transform duration-500">
                                                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-primary/40">
                                                        <rect x="3" y="3" width="18" height="18" rx="2" />
                                                        <circle cx="9" cy="9" r="2" />
                                                        <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                                                    </svg>
                                                </div>
                                            )}
                                            {item.caption && (
                                                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex items-end p-4">
                                                    <span className="text-sm font-medium text-white translate-y-2 group-hover:translate-y-0 transition-transform duration-300">{item.caption}</span>
                                                </div>
                                            )}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )}

                    {/* Action buttons based on type */}
                    {news.type === 'document' && (
                        <div className="mt-12 p-8 rounded-2xl bg-sky-50 border border-sky-100 flex flex-col sm:flex-row items-center justify-between gap-6 reveal-soft stagger-2">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-sky-100 text-sky-600 rounded-xl flex items-center justify-center">
                                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /></svg>
                                </div>
                                <div>
                                    <h4 className="font-bold text-base-content">เอกสารที่แนบมา</h4>
                                    <p className="text-sm text-base-content/60">คลิกที่ปุ่มเพื่อดาวน์โหลดเอกสาร</p>
                                </div>
                            </div>
                            <button className="px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-xl shadow-sm transition-colors font-medium flex items-center gap-2 whitespace-nowrap w-full sm:w-auto justify-center">
                                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" /></svg>
                                ดาวน์โหลด
                            </button>
                        </div>
                    )}
                </article>

                {/* Related News */}
                {relatedNews.length > 0 && (
                    <div className="reveal-soft">
                        <h3 className="text-2xl font-bold font-display text-primary mb-6 flex items-center gap-3">
                            <span className="w-8 h-px bg-primary/30" />
                            ข่าวสารที่เกี่ยวข้อง
                            <span className="w-8 h-px bg-primary/30" />
                        </h3>
                        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {relatedNews.map((related) => {
                                const rConfig = typeConfig[related.type as keyof typeof typeConfig] || typeConfig.general
                                const relatedDate = related.date || related.createdAt || new Date().toISOString()
                                return (
                                <Link key={related.slug || related.id} href={`/news/${related.slug || related.id}`} className="group bg-white p-5 rounded-2xl border border-base-200 shadow-[0_8px_30px_rgb(212,175,55,0.04)] hover:shadow-lg hover:border-secondary/30 transition-all flex flex-col h-full">
                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest mb-4 w-fit ${rConfig.color.replace('border-', 'border border-')}`}>
                                        {rConfig.label}
                                    </span>
                                    <h4 className="font-bold text-lg text-base-content group-hover:text-primary transition-colors line-clamp-2 mb-4 leading-snug font-display">
                                        {related.title}
                                    </h4>
                                    <div className="mt-auto pt-4 border-t border-base-100 flex items-center text-xs font-medium text-base-content/50">
                                        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1.5"><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" /></svg>
                                        {new Date(relatedDate).toLocaleDateString('th-TH', { year: 'numeric', month: 'short', day: 'numeric' })}
                                    </div>
                                </Link>
                            )})}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}


