import Link from 'next/link'
import { getDistricts, getPageHeroes } from '@/lib/payload'
import CmsImage from '@/components/CmsImage'
import { resolveMediaAlt, resolveMediaUrl, type MediaLike } from '@/lib/media'
import { resolveDistrictMapPoint } from '@/lib/district-map'
import DistrictMap from '@/components/districts/DistrictMapClient'
import type { PublicDistrictSummary } from '@/lib/public-organization'

export default async function CulturalDistrictsPage() {
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
    
    // Fallback static data if DB is empty - sorted strictly by district code (รหัสอำเภอ)
    const districts: PublicDistrictSummary[] = typedDistricts.length > 0 ? typedDistricts.map((district) => ({
        id: district.id,
        name: district.name,
        slug: district.slug || district.name.toLowerCase().replace(/\s+/g, '-'),
        code: district.code ?? null,
        description: district.description || 'ศูนย์กลางส่งเสริมและประสานงานสภาวัฒนธรรมประจำอำเภอ',
        latitude: district.latitude ?? null,
        longitude: district.longitude ?? null,
    })).sort((a, b) => (a.code || '').localeCompare(b.code || '')) : [
        { id: 'muang-chiang-rai', name: 'เมืองเชียงราย', slug: 'muang-chiang-rai', code: '5701', description: 'ศูนย์กลางสภาวัฒนธรรมประจำอำเภอเมืองเชียงราย' },
        { id: 'wiang-chai', name: 'เวียงชัย', slug: 'wiang-chai', code: '5710', description: 'ศูนย์กลางสภาวัฒนธรรมประจำอำเภอเวียงชัย' },
    ]

    const hero = pageHeroes?.districts || {}
    const heroMedia = hero.heroImage as MediaLike
    const heroImageUrl = resolveMediaUrl(heroMedia)
    const heroImageAlt = resolveMediaAlt(heroMedia, (hero.title as string) || 'ภาพพื้นหลังหน้าเครือข่ายสภาวัฒนธรรมอำเภอ')
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
                                    {(hero.eyebrow as string) || 'เครือข่ายทางวัฒนธรรม'}
                                </div>
                                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight font-display text-white leading-[1.05] drop-shadow-lg reveal-soft stagger-1">
                                    {(hero.title as string) || 'เครือข่ายสภาวัฒนธรรมอำเภอ'}
                                </h1>
                                <div className="w-24 h-1 rounded-full bg-linear-to-r from-secondary via-accent/60 to-transparent mb-6 reveal-soft stagger-2" />
                                <p className="text-lg md:text-xl max-w-3xl font-light leading-relaxed text-white/82 reveal-soft stagger-2">
                                    {(hero.subtitle as string) || 'ประสานความร่วมมือและส่งเสริมกิจกรรมทางวัฒนธรรมครอบคลุมพื้นที่ 18 อำเภอ ในจังหวัดเชียงราย'}
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
                                {(hero.eyebrow as string) || 'เครือข่ายทางวัฒนธรรม'}
                            </div>
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-primary tracking-tight reveal-soft stagger-1 font-display">
                                {(hero.title as string) || 'เครือข่ายสภาวัฒนธรรมอำเภอ'}
                            </h1>
                            <p className="text-lg md:text-xl text-base-content/70 max-w-2xl mx-auto font-light leading-relaxed reveal-soft stagger-2">
                                {(hero.subtitle as string) || 'ประสานความร่วมมือและส่งเสริมกิจกรรมทางวัฒนธรรมครอบคลุมพื้นที่ 18 อำเภอ ในจังหวัดเชียงราย'}
                            </p>
                        </div>
                    </>
                )}

                <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-slate-50 to-transparent z-10" />
            </section>

            {/* Breadcrumb */}
            <div className="container mx-auto max-w-7xl px-4 py-6 relative z-20">
                <div className="breadcrumbs text-sm text-base-content/60 font-light">
                    <ul>
                        <li><Link href="/" className="inline-flex min-h-11 items-center hover:text-primary transition-colors">หน้าแรก</Link></li>
                        <li className="text-base-content/60">เครือข่ายทางวัฒนธรรม</li>
                        <li className="text-primary font-medium">สภาวัฒนธรรมอำเภอ</li>
                    </ul>
                </div>
            </div>

            {/* Content Section - Redesigned Cards Grid without Map */}
            <div className="container mx-auto max-w-7xl px-4 py-8 pb-28 relative z-20">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <span className="text-accent font-semibold tracking-wider text-xs uppercase mb-3 block">Local Cultural Networks</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 font-display">สภาวัฒนธรรมประจำอำเภอ (18 อำเภอ)</h2>
                    <p className="text-base-content/70 font-light text-base md:text-lg leading-relaxed">
                        เครือข่ายศูนย์กลางขับเคลื่อนกิจกรรม อนุรักษ์มรดกภูมิปัญญา และดูแลงานวัฒนธรรมท้องถิ่นในแต่ละอำเภอของจังหวัดเชียงราย
                    </p>
                </div>

                {/* Homepage-styled District Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {districts.map((district) => (
                        <Link 
                            key={district.id} 
                            href={`/cultural-networks/districts/${district.slug}`}
                            className="group bg-white rounded-2xl border border-base-200/90 p-6 flex flex-col items-center justify-between text-center gap-5 hover:border-secondary/60 hover:shadow-[0_12px_35px_rgba(212,175,55,0.14)] transition-all duration-300 relative overflow-hidden hover:-translate-y-1"
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-secondary-light to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            
                            <div className="w-16 h-16 rounded-2xl bg-secondary/10 border border-secondary/20 flex items-center justify-center text-secondary-dark group-hover:bg-secondary group-hover:text-primary-dark transition-all duration-300 shadow-xs">
                                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:scale-110">
                                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                                    <circle cx="12" cy="10" r="3" />
                                </svg>
                            </div>

                            <div className="grow flex flex-col items-center">
                                <h3 className="text-xl font-bold text-primary group-hover:text-secondary-dark transition-colors font-display mb-2">
                                    {district.name.startsWith('อำเภอ') ? district.name : `อำเภอ${district.name}`}
                                </h3>
                                <p className="text-sm text-base-content/65 font-light leading-relaxed line-clamp-3">
                                    {district.description}
                                </p>
                            </div>

                            <div className="pt-4 border-t border-base-100 w-full flex items-center justify-center gap-1.5 text-xs font-bold text-primary group-hover:text-secondary-dark transition-colors">
                                <span className="group-hover:underline underline-offset-4">ดูข้อมูลสภาวัฒนธรรม</span>
                                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
                                    <path d="M5 12h14" />
                                    <path d="m12 5 7 7-7 7" />
                                </svg>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* District Minimap Section at the Bottom */}
                <div className="mt-20 pt-16 border-t border-base-200/80">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                        <div>
                            <span className="text-secondary font-semibold tracking-wider text-xs uppercase mb-2 block font-display">District Map</span>
                            <h3 className="text-2xl md:text-3xl font-bold text-primary font-display">แผนที่พื้นที่สภาวัฒนธรรมอำเภอ</h3>
                            <p className="text-base-content/65 font-light text-sm mt-1">สำรวจตำแหน่งที่ตั้งและขอบเขตพื้นที่ดำเนินงานเครือข่ายวัฒนธรรมทั้ง 18 อำเภอ</p>
                        </div>
                        <div className="inline-flex items-center gap-2 text-xs text-base-content/60 font-light bg-white px-4 py-2 rounded-full border border-base-200 shadow-xs self-start md:self-auto">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            แผนที่เชิงโต้ตอบครอบคลุม 18 อำเภอ
                        </div>
                    </div>
                    <div className="rounded-3xl overflow-hidden shadow-xl shadow-primary/5 border border-base-200 bg-white">
                        <DistrictMap points={mapPoints} />
                    </div>
                </div>
            </div>
        </div>
    )
}
