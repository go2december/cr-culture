import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getActivityBySlug, getActivities } from '@/lib/payload'

export default async function ActivityDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const decodedSlug = decodeURIComponent(slug)

    // Fetch from Payload API
    const activityData = await getActivityBySlug(decodedSlug)
    if (!activityData) {
        return notFound()
    }

    const activity = {
        title: activityData.title,
        level: activityData.level,
        district: typeof activityData.district?.name === 'string' ? activityData.district.name : null,
        districtSlug: typeof activityData.district?.slug === 'string' ? activityData.district.slug : null,
        date: activityData.date,
        endDate: activityData.endDate,
        location: activityData.location,
        summary: activityData.summary || activityData.excerpt,
        contentHtml: activityData.content_html || activityData.summary || '<p>ไม่มีเนื้อหาเพิ่มเติม</p>',
        titleImage: activityData.titleImage?.url,
        gallery: activityData.gallery || [],
    }

    // Related activities
    const { docs: relatedDocs } = await getActivities({ level: activity.level, limit: 4 })
    const relatedActivities = relatedDocs.filter((doc: any) => doc.id !== activityData.id).slice(0, 3)

    const dateObj = new Date(activity.date)
    const endDateObj = activity.endDate ? new Date(activity.endDate) : null

    return (
        <div className="bg-slate-50 min-h-screen pb-24">
            {/* Hero Section */}
            <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden bg-primary">
                <div className="absolute inset-0 z-0">
                    {activity.titleImage ? (
                        <>
                            <img src={activity.titleImage} alt={activity.title} className="w-full h-full object-cover mix-blend-overlay opacity-30" />
                            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-primary/50" />
                        </>
                    ) : (
                        <>
                            <div className="absolute inset-0 bg-black/20" />
                            <div className="absolute top-0 right-[-10%] w-[60%] h-[70%] rounded-full bg-gradient-to-bl from-white/10 to-transparent blur-[120px]" />
                            <div className="absolute bottom-[-20%] left-[-10%] w-[70%] h-[60%] rounded-full bg-gradient-to-tr from-secondary/30 to-transparent blur-[130px]" />
                        </>
                    )}
                </div>

                <div className="container mx-auto max-w-5xl px-4 relative z-10 text-white text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-sm font-medium shadow-sm mb-6 animate-fade-in-up">
                        {activity.level === 'province' ? 'กิจกรรมระดับจังหวัด' : `กิจกรรมระดับอำเภอ ${activity.district || ''}`}
                    </div>
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight animate-fade-in-up delay-100 drop-shadow-md">
                        {activity.title}
                    </h1>
                    <div className="flex flex-wrap justify-center items-center gap-4 text-sm opacity-90 animate-fade-in-up delay-200 font-light">
                        <span className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" /></svg>
                            {dateObj.toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' })}
                            {endDateObj && ` - ${endDateObj.toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' })}`}
                        </span>
                        {activity.location && (
                            <>
                                <span className="w-1 h-1 rounded-full bg-white/50" />
                                <span className="flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                                    {activity.location}
                                </span>
                            </>
                        )}
                    </div>
                </div>
            </section>

            {/* Breadcrumb */}
            <div className="container mx-auto max-w-5xl px-4 py-6 relative z-20 -mt-8">
                <div className="breadcrumbs text-sm bg-white/90 backdrop-blur-md px-6 py-3 rounded-2xl shadow-sm border border-base-200 inline-block text-base-content/60 font-light animate-fade-in-up delay-300">
                    <ul>
                        <li><Link href="/" className="hover:text-primary transition-colors">หน้าแรก</Link></li>
                        <li><Link href="/activities" className="hover:text-primary transition-colors">กิจกรรมสภาวัฒนธรรม</Link></li>
                        <li className="text-primary font-medium">{activity.title}</li>
                    </ul>
                </div>
            </div>

            <div className="container mx-auto max-w-5xl px-4 py-8">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <article className="lg:col-span-2 space-y-8 animate-fade-in-up delay-400">
                        <div className="bg-white rounded-3xl border border-base-200 shadow-sm p-8 lg:p-10">
                            {/* Summary */}
                            {activity.summary && (
                            <div className="p-6 bg-primary/5 rounded-2xl border-l-4 border-primary mb-8 text-lg text-primary-dark font-medium leading-relaxed">
                                {activity.summary}
                            </div>
                            )}

                            {/* Content */}
                            <div
                                className="prose prose-lg max-w-none prose-headings:text-primary prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-6 prose-p:text-base-content/80 prose-p:leading-relaxed prose-a:text-primary hover:prose-a:text-primary-light prose-strong:text-base-content"
                                dangerouslySetInnerHTML={{ __html: activity.contentHtml }}
                            />

                            {/* Gallery */}
                            {activity.gallery.length > 0 && (
                            <div className="mt-12 pt-10 border-t border-base-100">
                                <h3 className="text-2xl font-bold text-primary mb-8 flex items-center gap-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" /></svg>
                                    แกลเลอรี
                                </h3>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {activity.gallery.map((item: any, i: number) => {
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
                                    )})}
                                </div>
                            </div>
                            )}
                        </div>
                    </article>

                    {/* Sidebar */}
                    <aside className="space-y-6 animate-fade-in-up delay-500">
                        {/* Event Details widget */}
                        <div className="bg-white rounded-3xl border border-base-200 shadow-sm p-6 lg:p-8">
                            <h3 className="text-lg font-bold text-primary mb-5 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-secondary"><path d="M12 2A10 10 0 1 0 22 12 10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8Z"/><path d="M12 7v5l3 3"/></svg>
                                รายละเอียดกิจกรรม
                            </h3>
                            <ul className="space-y-4">
                                <li>
                                    <div className="text-xs font-semibold text-base-content/50 uppercase tracking-widest mb-1">วันที่จัดงาน</div>
                                    <div className="font-medium text-base-content/80 text-sm">
                                        {dateObj.toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' })}
                                        {endDateObj && ` - ${endDateObj.toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' })}`}
                                    </div>
                                </li>
                                {activity.location && (
                                <li>
                                    <div className="text-xs font-semibold text-base-content/50 uppercase tracking-widest mb-1">สถานที่</div>
                                    <div className="font-medium text-base-content/80 text-sm">{activity.location}</div>
                                </li>
                                )}
                                {activity.district && (
                                <li>
                                    <div className="text-xs font-semibold text-base-content/50 uppercase tracking-widest mb-1">พื้นที่</div>
                                    <div className="font-medium text-base-content/80 text-sm">อำเภอ{activity.district}</div>
                                </li>
                                )}
                            </ul>
                        </div>

                        {/* Related District */}
                        {activity.district && activity.districtSlug && (
                            <div className="bg-white rounded-3xl border border-base-200 shadow-sm p-6 lg:p-8">
                                <h3 className="text-lg font-bold text-primary mb-5 flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-secondary"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                                    เครือข่ายระดับอำเภอ
                                </h3>
                                <Link
                                    href={`/districts/${activity.districtSlug}`}
                                    className="group block p-4 bg-slate-50 border border-base-200 rounded-2xl hover:border-primary/30 transition-colors"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-base-200 flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
                                            📍
                                        </div>
                                        <div>
                                            <div className="text-xs font-semibold text-base-content/50 uppercase tracking-widest mb-1">สภาวัฒนธรรมอำเภอ</div>
                                            <div className="font-bold text-base-content group-hover:text-primary transition-colors">{activity.district}</div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        )}

                        {/* Related Activities */}
                        {relatedActivities.length > 0 && (
                        <div className="bg-white rounded-3xl border border-base-200 shadow-sm p-6 lg:p-8">
                            <h3 className="text-lg font-bold text-primary mb-5 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-secondary"><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" /></svg>
                                กิจกรรมอื่นๆ
                            </h3>
                            <ul className="space-y-3">
                                {relatedActivities.map((related: any, i: number) => {
                                    const rDateObj = new Date(related.date)
                                    return (
                                    <li key={i}>
                                        <Link
                                            href={`/activities/${related.slug || related.id}`}
                                            className="group flex gap-4 p-3 bg-slate-50 border border-base-100 rounded-xl hover:bg-white hover:border-primary/20 hover:shadow-sm transition-all"
                                        >
                                            <div className="w-14 h-14 bg-white border border-base-200 shadow-sm rounded-lg flex flex-col items-center justify-center flex-shrink-0 text-primary group-hover:border-primary/30 transition-colors">
                                                <span className="text-[10px] font-bold uppercase">{rDateObj.toLocaleDateString('th-TH', { month: 'short' })}</span>
                                                <span className="font-bold text-lg leading-none">{rDateObj.getDate()}</span>
                                            </div>
                                            <div className="flex flex-col justify-center">
                                                <h4 className="font-medium text-sm text-base-content group-hover:text-primary transition-colors line-clamp-2">
                                                    {related.title}
                                                </h4>
                                            </div>
                                        </Link>
                                    </li>
                                )})}
                            </ul>
                        </div>
                        )}

                        {/* Back to Activities */}
                        <Link href="/activities" className="btn btn-primary rounded-xl w-full flex items-center justify-center gap-2 group shadow-sm hover:shadow">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform"><path d="m15 18-6-6 6-6" /></svg>
                            กลับไปยังกิจกรรมทั้งหมด
                        </Link>
                    </aside>
                </div>
            </div>
        </div>
    )
}
