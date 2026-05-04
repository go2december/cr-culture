import Link from 'next/link'
import { getActivities, getPageHeroes } from '@/lib/payload'
import { resolveMediaAlt, resolveMediaUrl, type MediaLike } from '@/lib/media'
import type { PublicActivity } from '@/lib/public-content'
import CmsImage from '@/components/CmsImage'

export default async function ActivitiesPage(props: {
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const searchParams = await props.searchParams
    const levelStr = searchParams?.level as string | undefined
    const validLevel = (levelStr === 'province' || levelStr === 'district') ? levelStr : undefined
    const page = Number(searchParams?.page) || 1

    const activitiesResponse = await getActivities({ level: validLevel, limit: 6, page })
    const pageHeroes = await getPageHeroes().catch(() => null)
    const hero = pageHeroes?.activities || {}
    const { docs: rawActivities, hasNextPage } = activitiesResponse

    // prefer original hero asset first so the uploaded image keeps its intended framing
    const heroMedia = hero.heroImage as MediaLike
    const heroImageUrl = resolveMediaUrl(heroMedia)
    const heroImageAlt = resolveMediaAlt(heroMedia, (hero.title as string) || 'กิจกรรมสภาวัฒนธรรม')
    const hasHeroImage = Boolean(heroImageUrl)

    const displayActivities: PublicActivity[] = rawActivities.length > 0 ? (rawActivities as PublicActivity[]) : []

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
                            <div className="absolute inset-0 bg-linear-to-r from-primary/88 via-primary/70 to-primary/40" />
                            <div className="absolute inset-0 bg-lanna-pattern opacity-20" />
                            <div className="absolute top-0 right-[-10%] w-[50%] h-[70%] rounded-full bg-linear-to-bl from-secondary/18 to-transparent blur-[120px]" />
                            <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[60%] rounded-full bg-linear-to-tr from-accent/14 to-transparent blur-[130px]" />
                        </div>

                        <div className="container mx-auto max-w-7xl px-4 relative z-20">
                            <div className="max-w-4xl text-left">
                                <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium shadow-sm mb-6 bg-white/14 backdrop-blur-md border border-white/20 text-white reveal-soft">
                                    <span className="w-2 h-2 rounded-full bg-accent" />
                                    {(hero.eyebrow as string) || 'กิจกรรมและประเพณี'}
                                </div>

                                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight font-display text-white leading-[1.05] drop-shadow-lg reveal-soft stagger-1">
                                    {(hero.title as string) || 'กิจกรรมสภาวัฒนธรรมจังหวัดเชียงราย'}
                                </h1>

                                <div className="w-24 h-1 rounded-full bg-linear-to-r from-secondary via-accent/60 to-transparent mb-6 reveal-soft stagger-2" />

                                <p className="text-lg md:text-xl max-w-3xl font-light leading-relaxed text-white/82 reveal-soft stagger-2">
                                    {(hero.subtitle as string) || 'รวมข่าวสารกิจกรรมและงานประเพณีท้องถิ่นที่จัดโดยสภาวัฒนธรรมจังหวัดเชียงรายและเครือข่ายระดับอำเภอ'}
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

                        <div className="container mx-auto px-4 relative z-20 text-center">
                            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium shadow-sm mb-6 reveal-soft bg-white/80 backdrop-blur-md border border-secondary/30 text-primary">
                                <span className="w-2 h-2 rounded-full bg-accent" />
                                {(hero.eyebrow as string) || 'กิจกรรมและประเพณี'}
                            </div>

                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight font-display reveal-soft stagger-1 text-primary">
                                {(hero.title as string) || 'กิจกรรมสภาวัฒนธรรมจังหวัดเชียงราย'}
                            </h1>

                            <p className="text-lg md:text-xl max-w-2xl font-light leading-relaxed reveal-soft stagger-2 text-base-content/70 mx-auto">
                                {(hero.subtitle as string) || 'รวมข่าวสารกิจกรรมและงานประเพณีท้องถิ่นที่จัดโดยสภาวัฒนธรรมจังหวัดเชียงรายและเครือข่ายระดับอำเภอ'}
                            </p>
                        </div>
                    </>
                )}

                <div className="absolute bottom-0 left-0 right-0 h-24 z-20 bg-linear-to-t from-slate-50 to-transparent" />
            </section>

            {/* Breadcrumb - Subtle & Clean */}
            <div className="container mx-auto max-w-7xl px-4 py-6 relative z-20">
                <div className="breadcrumbs text-sm text-base-content/60 font-light">
                    <ul>
                        <li><Link href="/" className="hover:text-primary transition-colors">หน้าแรก</Link></li>
                        <li className="text-primary font-medium">กิจกรรมสภาวัฒนธรรมจังหวัดเชียงราย</li>
                    </ul>
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="container mx-auto max-w-7xl px-4 py-8">
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                    <Link href="/activities" className={`inline-flex min-h-11 items-center px-6 py-2.5 rounded-full text-sm font-medium shadow-sm transition-all ${!validLevel ? 'bg-primary text-white shadow-md' : 'bg-slate-50 border border-base-200 text-base-content/70 hover:border-secondary hover:text-primary'}`}>ทั้งหมด</Link>
                    <Link href="/activities?level=province" className={`inline-flex min-h-11 items-center px-6 py-2.5 rounded-full text-sm font-medium shadow-sm transition-all ${validLevel === 'province' ? 'bg-primary text-white shadow-md' : 'bg-slate-50 border border-base-200 text-base-content/70 hover:border-secondary hover:text-primary'}`}>ระดับจังหวัด</Link>
                    <Link href="/activities?level=district" className={`inline-flex min-h-11 items-center px-6 py-2.5 rounded-full text-sm font-medium shadow-sm transition-all ${validLevel === 'district' ? 'bg-primary text-white shadow-md' : 'bg-slate-50 border border-base-200 text-base-content/70 hover:border-secondary hover:text-primary'}`}>ระดับอำเภอ</Link>
                    <div className="ml-auto basis-full md:basis-auto flex justify-center md:justify-end mt-4 md:mt-0">
                        <Link href="/activities/calendar" className="inline-flex min-h-11 items-center px-6 py-2.5 rounded-full bg-secondary/20 text-primary-dark text-sm font-medium hover:bg-secondary/30 transition-colors gap-2">
                            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" /><path d="M8 14h.01" /><path d="M12 14h.01" /><path d="M16 14h.01" /><path d="M8 18h.01" /><path d="M12 18h.01" /><path d="M16 18h.01" /></svg>
                            ปฏิทินกิจกรรม
                        </Link>
                    </div>
                </div>
            </div>

            {/* Activities Grid */}
            <section className="container mx-auto max-w-7xl px-4 pb-24">
                {displayActivities.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                        {displayActivities.map((activity, i) => {
                            const dateObj = new Date(activity.date)
                            const imageUrl = resolveMediaUrl(activity.coverImage, activity.gallery)

                            return (
                                <div key={activity.id || activity.slug} className={`card-modern bg-white flex flex-col h-full group rounded-3xl overflow-hidden border border-base-200 shadow-sm hover:shadow-[0_8px_30px_rgb(212,175,55,0.08)] hover:border-secondary/50 transition-all duration-400 reveal-soft ${i % 3 === 0 ? 'stagger-1' : i % 3 === 1 ? 'stagger-2' : 'stagger-3'}`}>
                                    <div className="aspect-16/10 bg-slate-50 relative overflow-hidden shrink-0 border-b border-base-100">
                                        {imageUrl ? (
                                            <div className="absolute inset-0 transition-transform duration-700 ease-out">
                                                <CmsImage
                                                    src={imageUrl}
                                                    alt={activity.title}
                                                    fill
                                                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                                                    className="object-cover"
                                                />
                                                <div className="absolute inset-0 bg-linear-to-t from-primary/80 via-primary/20 to-transparent" />
                                            </div>
                                        ) : (
                                            <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-secondary/10 flex items-center justify-center text-4xl transition-transform duration-700">
                                                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="text-primary/40 drop-shadow-sm">
                                                    <path d="M8 2v4" />
                                                    <path d="M16 2v4" />
                                                    <rect x="3" y="4" width="18" height="18" rx="2" />
                                                    <path d="M3 10h18" />
                                                </svg>
                                            </div>
                                        )}
                                        <div className="absolute top-4 left-4 z-20">
                                            <div className="bg-white/95 backdrop-blur-sm shadow-md border border-white/50 rounded-xl overflow-hidden text-center min-w-17.5 flex flex-col">
                                                <div className="bg-secondary text-primary-dark text-xs font-bold py-1 px-3 mb-0 uppercase tracking-widest leading-none">
                                                    {dateObj.toLocaleDateString('th-TH', { month: 'short' })}
                                                </div>
                                                <div className="text-2xl font-bold text-primary py-2 px-3 bg-white font-display">
                                                    {dateObj.getDate()}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-8 flex flex-col grow relative">
                                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded inline-block w-fit uppercase tracking-widest mb-4 ${activity.level === 'province' ? 'bg-primary/10 text-primary' : 'bg-secondary/20 text-secondary-dark'}`}>
                                            {activity.level === 'province' ? 'กิจกรรมระดับจังหวัด' : `กิจกรรมระดับอำเภอ ${activity.district?.name || activity.districtName || ''}`}
                                        </span>
                                        <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2 leading-tight font-display text-base-content relative z-10 w-full">
                                            {activity.title}
                                        </h3>
                                        {(activity.location || activity.district?.name) && (
                                            <p className="text-sm font-medium text-base-content/50 flex items-center gap-2 mb-4">
                                                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-secondary"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                                                {activity.location || activity.district?.name}
                                            </p>
                                        )}
                                        <p className="text-base-content/60 text-sm mb-6 line-clamp-2 font-light grow">
                                            {activity.excerpt || activity.summary}
                                        </p>
                                        <div className="pt-5 border-t border-base-100 flex items-center justify-between mt-auto">
                                            <Link href={`/activities/${activity.slug || activity.id}`} className="text-sm font-semibold text-primary hover:text-secondary-dark transition-colors flex min-h-11 items-center gap-1 group/link w-full justify-between">
                                                ดูรายละเอียดกิจกรรม
                                                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover/link:translate-x-1 transition-transform text-secondary"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                ) : (
                    <div className="text-center py-24 mb-12 bg-white rounded-3xl border border-dashed border-base-200">
                        <span className="mb-4 block opacity-50">
                            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-base-content/40">
                                <rect x="3" y="4" width="18" height="18" rx="2" />
                                <path d="M16 2v4" />
                                <path d="M8 2v4" />
                                <path d="M3 10h18" />
                            </svg>
                        </span>
                        <h3 className="text-xl font-bold text-base-content/70">ยังไม่มีข้อมูลกิจกรรมในขณะนี้</h3>
                    </div>
                )}

                {/* Load More Pagination */}
                {hasNextPage && (
                    <div className="text-center mt-16 flex justify-center items-center gap-4">
                        <Link
                            href={`/activities?page=${page + 1}${validLevel ? `&level=${validLevel}` : ''}`}
                            scroll={false}
                            className="btn-outline-lanna inline-flex items-center justify-center min-w-50"
                        >
                            หน้าต่อไป
                        </Link>
                    </div>
                )}
                {page > 1 && (
                    <div className="text-center mt-6 flex justify-center items-center gap-4">
                        <Link
                            href={`/activities?page=${page - 1}${validLevel ? `&level=${validLevel}` : ''}`}
                            scroll={false}
                            className="text-primary font-medium hover:underline inline-flex min-h-11 items-center gap-2"
                        >
                            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                            ย้อนกลับ
                        </Link>
                    </div>
                )}
            </section>
        </div>
    )
}



