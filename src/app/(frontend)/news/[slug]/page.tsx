import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getNewsBySlug, getNews } from '@/lib/payload'

const typeConfig = {
    general: { label: 'ข่าวทั่วไป', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" /><path d="M18 14h-8" /><path d="M15 18h-5" /><path d="M10 6h8v4h-8V6Z" /></svg>, color: 'text-primary bg-primary/10 border-primary/20' },
    video: { label: 'วิดีโอ', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 8-6 4 6 4V8Z" /><rect width="14" height="12" x="2" y="6" rx="2" ry="2" /></svg>, color: 'text-secondary-dark bg-secondary/10 border-secondary/20' },
    document: { label: 'เอกสาร', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /><line x1="16" x2="8" y1="13" y2="13" /><line x1="16" x2="8" y1="17" y2="17" /><line x1="10" x2="8" y1="9" y2="9" /></svg>, color: 'text-sky-700 bg-sky-500/10 border-sky-500/20' },
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

    const news = {
        title: newsData.title,
        type: newsData.type,
        date: newsData.date || newsData.createdAt,
        summary: newsData.summary || newsData.excerpt,
        contentHtml: newsData.content_html || newsData.summary || '<p>ไม่มีเนื้อหาเพิ่มเติม</p>',
        titleImage: newsData.titleImage?.url,
        gallery: newsData.gallery || [],
    }

    // Fetch related news (same type, max 3)
    const relatedResponse = await getNews({ type: news.type, limit: 4 })
    const relatedNews = relatedResponse.docs?.filter((doc: any) => doc.id !== newsData.id).slice(0, 3) || []

    return (
        <div className="bg-slate-50 min-h-screen pb-24">
            {/* Hero Section */}
            <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden bg-white border-b border-base-200">
                <div className="absolute inset-0 z-0 bg-slate-50/50">
                    <div className="absolute top-0 right-[-10%] w-[60%] h-[70%] rounded-full bg-gradient-to-bl from-secondary/5 to-transparent blur-[120px]" />
                    <div className="absolute bottom-[-20%] left-[-10%] w-[70%] h-[60%] rounded-full bg-gradient-to-tr from-primary/5 to-transparent blur-[130px]" />
                </div>

                <div className="container mx-auto max-w-4xl px-4 relative z-10 text-center">
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium shadow-sm mb-6 animate-fade-in-up ${config.color.replace('border-', 'border border-')} bg-white`}>
                        {config.icon}
                        {config.label}
                    </div>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 tracking-tight animate-fade-in-up delay-100 text-primary font-display leading-snug">
                        {news.title}
                    </h1>
                    <div className="flex justify-center items-center gap-2 text-sm text-base-content/60 animate-fade-in-up delay-200 font-medium">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" /></svg>
                        {dateObj.toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                </div>
            </section>

            {/* Breadcrumb */}
            <div className="container mx-auto max-w-4xl px-4 py-6 relative z-20 -mt-8">
                <div className="breadcrumbs text-sm bg-white/90 backdrop-blur-md px-6 py-3 rounded-2xl shadow-sm border border-base-200 inline-block text-base-content/60 font-light animate-fade-in-up delay-300">
                    <ul>
                        <li><Link href="/" className="hover:text-primary transition-colors">หน้าแรก</Link></li>
                        <li><Link href="/news" className="hover:text-primary transition-colors">ข่าวสารและประชาสัมพันธ์</Link></li>
                        <li className="text-primary font-medium line-clamp-1 max-w-[200px] sm:max-w-[400px]">{news.title}</li>
                    </ul>
                </div>
            </div>

            <div className="container mx-auto max-w-4xl px-4 py-8">
                <article className="bg-white rounded-3xl border border-base-200 shadow-sm p-8 lg:p-12 mb-12 animate-fade-in-up delay-400">
                    {news.titleImage && (
                        <figure className="mb-10 rounded-2xl overflow-hidden shadow-sm border border-base-100">
                            <img src={news.titleImage} alt={news.title} className="w-full h-auto object-cover max-h-[500px]" />
                        </figure>
                    )}

                    {news.summary && (
                        <div className="p-6 bg-slate-50/80 rounded-2xl border border-base-200 mb-10 text-lg text-base-content/80 font-medium leading-relaxed">
                            {news.summary}
                        </div>
                    )}

                    <div
                        className="prose prose-lg max-w-none prose-headings:text-primary prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-6 prose-p:text-base-content/80 prose-p:leading-relaxed prose-a:text-primary hover:prose-a:text-primary-light prose-strong:text-base-content"
                        dangerouslySetInnerHTML={{ __html: news.contentHtml }}
                    />

                    {/* Gallery */}
                    {news.gallery.length > 0 && (
                        <div className="mt-12 pt-10 border-t border-base-100">
                            <h3 className="text-2xl font-bold text-primary mb-8 flex items-center gap-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" /></svg>
                                แกลเลอรี
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {news.gallery.map((item: any, i: number) => {
                                    const imageUrl = item.image?.url
                                    return (
                                        <div key={i} className="group relative aspect-square bg-slate-100 rounded-2xl border border-base-200 flex items-center justify-center overflow-hidden cursor-pointer hover:border-primary/30 hover:shadow-md transition-all">
                                            {imageUrl ? (
                                                <img src={imageUrl} alt={item.caption || "Gallery image"} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                            ) : (
                                                <div className="text-center p-4 z-10 group-hover:scale-110 transition-transform duration-500">
                                                    <span className="text-4xl mb-3 block drop-shadow-sm">🖼️</span>
                                                </div>
                                            )}
                                            {item.caption && (
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex items-end p-4">
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
                        <div className="mt-12 p-8 rounded-2xl bg-sky-50 border border-sky-100 flex flex-col sm:flex-row items-center justify-between gap-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-sky-100 text-sky-600 rounded-xl flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /></svg>
                                </div>
                                <div>
                                    <h4 className="font-bold text-base-content">เอกสารที่แนบมา</h4>
                                    <p className="text-sm text-base-content/60">คลิกที่ปุ่มเพื่อดาวน์โหลดเอกสาร</p>
                                </div>
                            </div>
                            <button className="px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-xl shadow-sm transition-colors font-medium flex items-center gap-2 whitespace-nowrap w-full sm:w-auto justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" /></svg>
                                ดาวน์โหลด
                            </button>
                        </div>
                    )}
                </article>

                {/* Related News */}
                {relatedNews.length > 0 && (
                    <div className="animate-fade-in-up delay-500">
                        <h3 className="text-2xl font-bold font-display text-primary mb-6 flex items-center gap-3">
                            <span className="w-8 h-px bg-primary/30" />
                            ข่าวสารที่เกี่ยวข้อง
                            <span className="w-8 h-px bg-primary/30" />
                        </h3>
                        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {relatedNews.map((related: any) => {
                                const rConfig = typeConfig[related.type as keyof typeof typeConfig] || typeConfig.general
                                return (
                                <Link key={related.slug || related.id} href={`/news/${related.slug || related.id}`} className="group bg-white p-5 rounded-2xl border border-base-200 shadow-[0_8px_30px_rgb(212,175,55,0.04)] hover:shadow-lg hover:border-secondary/30 transition-all flex flex-col h-full">
                                    <span className={`inline-flex items-center px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-widest mb-3 w-fit ${rConfig.color.replace('border-', 'border border-')}`}>
                                        {rConfig.label}
                                    </span>
                                    <h4 className="font-bold text-base-content group-hover:text-primary transition-colors line-clamp-2 mb-3 leading-snug">
                                        {related.title}
                                    </h4>
                                    <div className="mt-auto pt-4 border-t border-base-100 flex items-center text-xs font-medium text-base-content/50">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1.5"><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" /></svg>
                                        {new Date(related.date || related.createdAt).toLocaleDateString('th-TH', { year: 'numeric', month: 'short', day: 'numeric' })}
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
