import Link from 'next/link'
import { getActivities, getDistricts, getPageHeroes } from '@/lib/payload'
import CalendarView from './CalendarView'
import CmsImage from '@/components/CmsImage'
import { resolveMediaAlt, resolveMediaUrl, type MediaLike } from '@/lib/media'
import type { PublicCalendarActivity } from '@/lib/public-organization'
import type { PublicDistrictSummary } from '@/lib/public-organization'

export default async function ActivityCalendarPage(props: {
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const searchParams = await props.searchParams
    const year = Number(searchParams?.year) || new Date().getFullYear()
    const month = Number(searchParams?.month) || new Date().getMonth() + 1

    const activitiesResponse = await getActivities({ limit: 100, page: 1 })
    const allActivities = activitiesResponse.docs as PublicCalendarActivity[]

    // กรองกิจกรรมเฉพาะในเดือนที่เลือก
    const filteredActivities = allActivities.filter((activity) => {
        const activityDate = new Date(activity.date)
        return (
            activityDate.getFullYear() === year &&
            activityDate.getMonth() === month - 1
        )
    })

    const districts = (await getDistricts()) as PublicDistrictSummary[]
    const districtMap = new Map(districts.map((district) => [district.id, district.name]))
    const pageHeroes = await getPageHeroes().catch(() => null)
    const hero = pageHeroes?.activitiesCalendar || {}
    const heroMedia = hero.heroImage as MediaLike
    const heroImageUrl = resolveMediaUrl(heroMedia)
    const heroImageAlt = resolveMediaAlt(heroMedia, (hero.title as string) || 'ภาพพื้นหลังหน้าปฏิทินกิจกรรม')
    const hasHeroImage = Boolean(heroImageUrl)

    return (
        <div className="bg-slate-50 min-h-screen font-sans">
            {/* Hero Section */}
            <section className={`relative overflow-hidden ${hasHeroImage ? 'pt-32 pb-24 lg:pt-40 lg:pb-30 accent-panel min-h-[52vh] flex items-end' : 'pt-32 pb-20 lg:pt-40 lg:pb-28 bg-slate-50 accent-panel'}`}>
                {hasHeroImage ? (
                    <>
                        <div className="absolute inset-0 z-0">
                            <CmsImage src={heroImageUrl!} alt={heroImageAlt} fill sizes="100vw" className="object-cover object-top" priority />
                            <div className="absolute inset-0 bg-linear-to-r from-primary/88 via-primary/70 to-primary/40" />
                            <div className="absolute inset-0 bg-lanna-pattern opacity-20" />
                            <div className="absolute top-0 right-[-10%] w-[50%] h-[70%] rounded-full bg-linear-to-bl from-secondary/18 to-transparent blur-[120px]" />
                            <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[60%] rounded-full bg-linear-to-tr from-accent/14 to-transparent blur-[130px]" />
                        </div>

                        <div className="container mx-auto max-w-7xl px-4 relative z-20">
                            <div className="max-w-4xl text-left">
                                <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium shadow-sm mb-6 bg-white/14 backdrop-blur-md border border-white/20 text-white reveal-soft">
                                    <span className="w-2 h-2 rounded-full bg-accent" />
                                    {(hero.eyebrow as string) || 'ปฏิทินกิจกรรม'}
                                </div>
                                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight font-display text-white leading-[1.05] drop-shadow-lg reveal-soft stagger-1">
                                    {(hero.title as string) || 'ปฏิทินกิจกรรมสภาวัฒนธรรมจังหวัดเชียงราย'}
                                </h1>
                                <div className="w-24 h-1 rounded-full bg-linear-to-r from-secondary via-accent/60 to-transparent mb-6 reveal-soft stagger-2" />
                                <p className="text-lg md:text-xl max-w-3xl font-light leading-relaxed text-white/82 reveal-soft stagger-2">
                                    {(hero.subtitle as string) || 'ติดตามกิจกรรมและงานประเพณีท้องถิ่นล่วงหน้า'}
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

                        <div className="container mx-auto max-w-7xl px-4 relative z-20 text-center">
                            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/80 backdrop-blur-md border border-secondary/30 text-sm font-medium text-primary shadow-sm mb-6 reveal-soft">
                                <span className="w-2 h-2 rounded-full bg-accent" />
                                {(hero.eyebrow as string) || 'ปฏิทินกิจกรรม'}
                            </div>
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-primary tracking-tight font-display reveal-soft stagger-1">
                                {(hero.title as string) || 'ปฏิทินกิจกรรมสภาวัฒนธรรมจังหวัดเชียงราย'}
                            </h1>
                            <p className="text-lg md:text-xl text-base-content/70 max-w-2xl mx-auto font-light leading-relaxed reveal-soft stagger-2">
                                {(hero.subtitle as string) || 'ติดตามกิจกรรมและงานประเพณีท้องถิ่นล่วงหน้า'}
                            </p>
                        </div>
                    </>
                )}

                <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-slate-50 to-transparent z-10" />
            </section>

            {/* Breadcrumb - Subtle & Clean */}
            <div className="container mx-auto max-w-7xl px-4 py-6 relative z-20">
                <div className="breadcrumbs text-sm text-base-content/60 font-light">
                    <ul>
                        <li><Link href="/" className="inline-flex min-h-11 items-center hover:text-primary transition-colors">หน้าแรก</Link></li>
                        <li><Link href="/activities" className="inline-flex min-h-11 items-center hover:text-primary transition-colors">กิจกรรม</Link></li>
                        <li className="text-primary font-medium">ปฏิทินกิจกรรมสภาวัฒนธรรมจังหวัดเชียงราย</li>
                    </ul>
                </div>
            </div>

            {/* Navigation & Filter Tabs */}
            <div className="container mx-auto max-w-7xl px-4 py-8">
                <div className="flex flex-wrap gap-3 justify-center md:justify-start items-center mb-6">
                    <Link href="/activities" className="inline-flex min-h-11 items-center px-6 py-2.5 rounded-full bg-slate-50 border border-base-200 text-base-content/70 text-sm font-medium hover:border-secondary hover:text-primary transition-all">
                        รายการกิจกรรม
                    </Link>
                    <div className="px-6 py-2.5 rounded-full bg-primary text-white text-sm font-medium shadow-md">
                        ปฏิทินกิจกรรม
                    </div>
                </div>

                {/* Calendar Component */}
                <CalendarView
                    year={year}
                    month={month}
                    activities={filteredActivities}
                    districtMap={districtMap}
                />
            </div>
        </div>
    )
}

