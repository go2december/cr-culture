import { Metadata } from 'next'
import Link from 'next/link'
import { getActivitiesWithGallery, getPageHeroes } from '@/lib/payload'
import { resolveMediaAlt, resolveMediaUrl, type MediaLike } from '@/lib/media'
import CmsImage from '@/components/CmsImage'
import { ActivityListGallery, ActivityGalleryCard } from '@/components/activities/ActivityListGallery'

export const metadata: Metadata = {
    title: 'คลังภาพกิจกรรมสภาวัฒนธรรมจังหวัดเชียงราย',
    description: 'ประมวลภาพกิจกรรมและงานประเพณีวัฒนธรรมอันทรงคุณค่าที่จัดโดยสภาวัฒนธรรมจังหวัดเชียงรายและสภาวัฒนธรรมอำเภอ',
}

export default async function ActivityGalleryPage() {
    const activitiesResponse = await getActivitiesWithGallery()
    const pageHeroes = await getPageHeroes().catch(() => null)
    
    // ดึงค่าการตั้งค่าหน้ากิจกรรมเพื่อใช้ Hero ร่วมกัน
    const hero = pageHeroes?.activities || {}
    const heroMedia = hero.heroImage as MediaLike
    const heroImageUrl = resolveMediaUrl(heroMedia)
    const heroImageAlt = resolveMediaAlt(heroMedia, (hero.title as string) || 'ภาพกิจกรรมสภาวัฒนธรรม')
    const hasHeroImage = Boolean(heroImageUrl)

    // แปลงข้อมูลกิจกรรมเป็นโครงสร้างการ์ดกิจกรรม
    const galleryActivities: ActivityGalleryCard[] = (activitiesResponse?.docs || []).map((activity) => {
        const coverImageSrc = resolveMediaUrl(activity.coverImage) || 
            (activity.gallery && activity.gallery[0] ? resolveMediaUrl(activity.gallery[0].image) : '') || 
            ''
            
        return {
            id: String(activity.id),
            title: activity.title,
            slug: activity.slug,
            coverImageSrc,
            photoCount: activity.gallery ? activity.gallery.length : 0,
            date: activity.date,
        }
    })

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
                                    { (hero.eyebrow as string) ? `${hero.eyebrow} • คลังภาพกิจกรรม` : 'คลังภาพกิจกรรม' }
                                </div>

                                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight font-display text-white leading-[1.05] drop-shadow-lg reveal-soft stagger-1">
                                    คลังภาพกิจกรรม
                                </h1>

                                <div className="w-24 h-1 rounded-full bg-linear-to-r from-secondary via-accent/60 to-transparent mb-6 reveal-soft stagger-2" />

                                <p className="text-lg md:text-xl max-w-3xl font-light leading-relaxed text-white/82 reveal-soft stagger-2">
                                    ประมวลภาพบรรยากาศและงานประเพณีสำคัญต่างๆ แยกรายกิจกรรม เพื่อสืบสานและส่งเสริมศิลปวัฒนธรรมล้านนาในจังหวัดเชียงราย
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
                                คลังภาพกิจกรรม
                            </div>

                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight font-display reveal-soft stagger-1 text-primary">
                                คลังภาพกิจกรรมสภาวัฒนธรรม
                            </h1>

                            <p className="text-lg md:text-xl max-w-2xl font-light leading-relaxed reveal-soft stagger-2 text-base-content/70 mx-auto">
                                ประมวลภาพบรรยากาศและงานประเพณีสำคัญต่างๆ แยกรายกิจกรรม เพื่อสืบสานและส่งเสริมศิลปวัฒนธรรมล้านนาในจังหวัดเชียงราย
                            </p>
                        </div>
                    </>
                )}

                <div className="absolute bottom-0 left-0 right-0 h-24 z-20 bg-linear-to-t from-slate-50 to-transparent" />
            </section>

            {/* Breadcrumb */}
            <div className="container mx-auto max-w-7xl px-4 py-6 relative z-20">
                <div className="breadcrumbs text-sm text-base-content/60 font-light">
                    <ul>
                        <li><Link href="/" className="hover:text-primary transition-colors">หน้าแรก</Link></li>
                        <li><Link href="/activities" className="hover:text-primary transition-colors">กิจกรรม</Link></li>
                        <li className="text-primary font-medium">ภาพกิจกรรม</li>
                    </ul>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="container mx-auto max-w-7xl px-4 py-10 pb-28 relative z-20">
                <ActivityListGallery items={galleryActivities} />
            </div>
        </div>
    )
}
