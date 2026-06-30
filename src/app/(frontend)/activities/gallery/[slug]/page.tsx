import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getActivityBySlug, getPageHeroes } from '@/lib/payload'
import { resolveMediaAlt, resolveMediaUrl, type MediaLike } from '@/lib/media'
import CmsImage from '@/components/CmsImage'
import { SingleActivityGallery, SingleGalleryItem } from '@/components/activities/SingleActivityGallery'

interface Props {
    params: Promise<{ slug: string }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
    const params = await props.params
    const activity = await getActivityBySlug(params.slug).catch(() => null)
    if (!activity) return { title: 'ไม่พบหน้าภาพกิจกรรม' }
    return {
        title: `ภาพกิจกรรม: ${activity.title}`,
        description: activity.summary || `ประมวลภาพบรรยากาศงาน ${activity.title}`,
    }
}

export default async function ActivitySingleGalleryPage(props: Props) {
    const params = await props.params
    const activity = await getActivityBySlug(params.slug).catch(() => null)
    
    if (!activity || !activity.gallery || activity.gallery.length === 0) {
        notFound()
    }

    const pageHeroes = await getPageHeroes().catch(() => null)
    
    // ดึงค่าตั้งค่าหน้ากิจกรรมสำหรับฮีโร่
    const hero = pageHeroes?.activities || {}
    const heroMedia = hero.heroImage as MediaLike
    const heroImageUrl = resolveMediaUrl(heroMedia)
    const heroImageAlt = resolveMediaAlt(heroMedia, (hero.title as string) || 'ภาพกิจกรรมสภาวัฒนธรรม')
    const hasHeroImage = Boolean(heroImageUrl)

    // จัดโครงสร้างภาพแกลเลอรี
    const galleryItems: SingleGalleryItem[] = activity.gallery
        .filter((item): item is NonNullable<typeof item> => Boolean(item))
        .map((item, idx) => {
            const imageSrc = resolveMediaUrl(item.image)
            return {
                id: `${activity.id}-single-gallery-${idx}`,
                imageSrc: imageSrc || '',
                caption: item.caption || '',
            }
        })
        .filter((item) => item.imageSrc !== '')

    return (
        <div className="bg-slate-50 min-h-screen font-sans">
            {/* Hero Section */}
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
                                    ภาพกิจกรรมท่องเที่ยวล้านนา
                                </div>

                                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight font-display text-white leading-[1.1] drop-shadow-lg reveal-soft stagger-1">
                                    {activity.title}
                                </h1>

                                <div className="w-24 h-1 rounded-full bg-linear-to-r from-secondary via-accent/60 to-transparent mb-6 reveal-soft stagger-2" />
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
                                รายละเอียดภาพกิจกรรม
                            </div>

                            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight font-display reveal-soft stagger-1 text-primary">
                                {activity.title}
                            </h1>
                        </div>
                    </>
                )}

                <div className="absolute bottom-0 left-0 right-0 h-24 z-20 bg-linear-to-t from-slate-50 to-transparent" />
            </section>

            {/* Breadcrumb & Navigation */}
            <div className="container mx-auto max-w-7xl px-4 py-6 relative z-20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="breadcrumbs text-sm text-base-content/60 font-light">
                    <ul>
                        <li><Link href="/" className="hover:text-primary transition-colors">หน้าแรก</Link></li>
                        <li><Link href="/activities" className="hover:text-primary transition-colors">กิจกรรม</Link></li>
                        <li><Link href="/activities/gallery" className="hover:text-primary transition-colors">ภาพกิจกรรม</Link></li>
                        <li className="text-primary font-medium truncate max-w-[200px] sm:max-w-xs">{activity.title}</li>
                    </ul>
                </div>
                <Link
                    href="/activities/gallery"
                    className="inline-flex items-center gap-2 text-sm text-secondary hover:text-primary transition-colors font-medium"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                    </svg>
                    ย้อนกลับไปคลังภาพกิจกรรม
                </Link>
            </div>

            {/* Main Content Area */}
            <div className="container mx-auto max-w-7xl px-4 py-10 pb-28 relative z-20">
                <SingleActivityGallery
                    activityTitle={activity.title}
                    date={activity.date}
                    items={galleryItems}
                />
            </div>
        </div>
    )
}
