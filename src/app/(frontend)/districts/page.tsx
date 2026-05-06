import Link from 'next/link'
import { getDistricts, getPageHeroes } from '@/lib/payload'
import CmsImage from '@/components/CmsImage'
import { resolveMediaAlt, resolveMediaUrl, type MediaLike } from '@/lib/media'
import { resolveDistrictMapPoint } from '@/lib/district-map'
import DistrictMap from '@/components/districts/DistrictMapClient'
import type { PublicDistrictSummary } from '@/lib/public-organization'

export default async function DistrictsPage() {
    const pageHeroes = await getPageHeroes().catch(() => null)
    const rawDistricts = await getDistricts() || []
    const typedDistricts = rawDistricts as Array<{
        id: string | number
        name: string
        slug?: string | null
        code?: string | null
        description?: string | null
        latitude?: number | null
        longitude?: number | null
    }>
    
    // Fallback static data just in case db is completely empty
    const districts: PublicDistrictSummary[] = typedDistricts.length > 0 ? typedDistricts.map((district) => ({
        id: district.id,
        name: district.name,
        slug: district.slug || district.name.toLowerCase().replace(/\s+/g, '-'),
        code: district.code ?? null,
        description: district.description || 'เครือข่ายศูนย์วัฒนธรรมระดับอำเภอ',
        latitude: district.latitude ?? null,
        longitude: district.longitude ?? null,
    })) : [
        { id: 'muang-chiang-rai', name: 'เมืองเชียงราย', slug: 'muang-chiang-rai', code: '5701', description: 'ศูนย์กลางจังหวัดเชียงราย' },
        { id: 'wiang-chai', name: 'เวียงชัย', slug: 'wiang-chai', code: '5710', description: 'อำเภอเวียงชัย' },
    ]
    const hero = pageHeroes?.districts || {}
    const heroMedia = hero.heroImage as MediaLike
    const heroImageUrl = resolveMediaUrl(heroMedia)
    const heroImageAlt = resolveMediaAlt(heroMedia, (hero.title as string) || 'ภาพพื้นหลังหน้าเครือข่ายอำเภอ')
    const hasHeroImage = Boolean(heroImageUrl)
    const mapPoints = districts.map(resolveDistrictMapPoint)

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
                                    <span className="w-2 h-2 rounded-full bg-secondary" />
                                    {(hero.eyebrow as string) || 'เครือข่ายระดับอำเภอ'}
                                </div>
                                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight font-display text-white leading-[1.05] drop-shadow-lg reveal-soft stagger-1">
                                    {(hero.title as string) || 'เครือข่ายสภาวัฒนธรรมอำเภอ'}
                                </h1>
                                <div className="w-24 h-1 rounded-full bg-linear-to-r from-secondary via-accent/60 to-transparent mb-6 reveal-soft stagger-2" />
                                <p className="text-lg md:text-xl max-w-3xl font-light leading-relaxed text-white/82 reveal-soft stagger-2">
                                    {(hero.subtitle as string) || 'เชื่อมต่อและประสานความร่วมมือกับเครือข่ายสภาวัฒนธรรมครอบคลุมพื้นที่ 18 อำเภอ ในจังหวัดเชียงราย'}
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

                        <div className="container mx-auto max-w-7xl px-4 relative z-10 text-center">
                            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/80 backdrop-blur-md border border-secondary/30 text-sm font-medium text-primary shadow-sm mb-6 reveal-soft">
                                <span className="w-2 h-2 rounded-full bg-secondary" />
                                {(hero.eyebrow as string) || 'เครือข่ายระดับอำเภอ'}
                            </div>
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-primary tracking-tight reveal-soft stagger-1 font-display">
                                {(hero.title as string) || 'เครือข่ายสภาวัฒนธรรมอำเภอ'}
                            </h1>
                            <p className="text-lg md:text-xl text-base-content/70 max-w-2xl mx-auto font-light leading-relaxed reveal-soft stagger-2">
                                {(hero.subtitle as string) || 'เชื่อมต่อและประสานความร่วมมือกับเครือข่ายสภาวัฒนธรรมครอบคลุมพื้นที่ 18 อำเภอ ในจังหวัดเชียงราย'}
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
                        <li className="text-primary font-medium">เครือข่ายอำเภอ</li>
                    </ul>
                </div>
            </div>

            {/* District Grid */}
            <section className="py-12 px-4 md:px-8 pb-24 relative z-20">
                <div className="container mx-auto max-w-7xl">
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                        {districts.map((district, i: number) => (
                            <Link
                                key={district.slug || i}
                                href={`/districts/${district.slug}`}
                                className={`card-modern group bg-white rounded-2xl border border-base-200 shadow-sm hover:shadow-[0_8px_30px_rgb(212,175,55,0.08)] hover:-translate-y-1 hover:border-secondary/50 transition-all duration-400 p-6 flex flex-col items-center text-center relative overflow-hidden reveal-soft ${i % 6 === 0 ? 'stagger-1' : i % 6 === 1 ? 'stagger-2' : i % 6 === 2 ? 'stagger-3' : i % 6 === 3 ? 'stagger-4' : i % 6 === 4 ? 'stagger-1' : 'stagger-2'}`}
                            >
                                <div className="absolute top-0 right-0 w-24 h-24 bg-linear-to-bl from-secondary/10 to-transparent rounded-tr-2xl rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                                <div className="w-14 h-14 rounded-full bg-slate-50 border border-base-100 flex items-center justify-center mb-5 group-hover:bg-white group-hover:border-secondary/20 transition-all duration-400 relative z-10 shadow-sm">
                                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-primary/40 group-hover:text-secondary-dark transition-all duration-400" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                                </div>

                                <h2 className="text-lg font-bold text-primary group-hover:text-primary-dark transition-colors tracking-tight mb-2 relative z-10 font-display">
                                    {district.name}
                                </h2>
                                <p className="text-xs text-base-content/60 font-light line-clamp-1 relative z-10">
                                    {district.description}
                                </p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Interactive Map */}
            <section className="py-24 px-4 md:px-8 bg-white border-t border-base-200 relative overflow-hidden accent-panel">
                <div className="absolute inset-0 opacity-[0.02] mask-kanok bg-primary pointer-events-none" />
                <div className="container mx-auto max-w-7xl text-center relative z-10">
                    <div className="text-center mb-12 reveal-soft">
                        <span className="text-accent font-semibold tracking-widest text-sm uppercase mb-3 block">Chiang Rai Map</span>
                        <h2 className="section-header mb-0! text-primary font-display">แผนที่จังหวัดเชียงราย</h2>
                    </div>

                    <DistrictMap points={mapPoints} />
                </div>
            </section>
        </div>
    )
}



