import Link from 'next/link'
import { getCulturalPartners, getPageHeroes } from '@/lib/payload'
import CmsImage from '@/components/CmsImage'
import { resolveMediaAlt, resolveMediaUrl, type MediaLike } from '@/lib/media'
import type { PublicDistrictSummary } from '@/lib/public-organization'

export default async function CulturalPartnersPage() {
    const pageHeroes = await getPageHeroes().catch(() => null)
    const rawPartners = await getCulturalPartners() || []
    
    // Fallback sample partners if DB is empty
    const partners: PublicDistrictSummary[] = rawPartners.length > 0 ? rawPartners : [
        { id: '1', name: 'สมาคมขัวศิลปะเชียงราย', slug: 'art-bridge-chiang-rai', description: 'เครือข่ายส่งเสริมและสร้างสรรค์งานศิลปะร่วมสมัยและมรดกทางวัฒนธรรมเชียงราย' },
        { id: '2', name: 'มูลนิธิมรดกเมืองเชียงราย', slug: 'chiang-rai-heritage-foundation', description: 'อนุรักษ์ ฟื้นฟู และสืบสานสถาปัตยกรรมและมรดกเมืองล้านนาเชียงราย' },
        { id: '3', name: 'ชมรมปราชญ์ชาวบ้านและภูมิปัญญาล้านนา', slug: 'lanna-wisdom-club', description: 'ศูนย์รวมปราชญ์ท้องถิ่นและองค์ความรู้ภูมิผญาเมืองเชียงราย' },
        { id: '4', name: 'สมาคมเครือข่ายช่างดนตรีและศิลปะการแสดงล้านนา', slug: 'lanna-music-performing-arts', description: 'ส่งเสริม อนุรักษ์ และถ่ายทอดดนตรีพื้นบ้านล้านนา สะล้อ ซึง ดนตรีมังคละ และการแสดงพื้นเมือง' },
        { id: '5', name: 'เครือข่ายพิพิธภัณฑ์ท้องถิ่นเมืองเชียงราย', slug: 'chiang-rai-local-museums', description: 'รวบรวมและเชื่อมโยงพิพิธภัณฑ์ชุมชน แหล่งเรียนรู้ประวัติศาสตร์ และคลังโบราณวัตถุในท้องถิ่น' },
        { id: '6', name: 'ชมรมอนุรักษ์วัฒนธรรมชนเผ่าและชาติพันธุ์เชียงราย', slug: 'ethnic-culture-conservation-club', description: 'สืบสานวิถีชีวิต อัตลักษณ์ ภาษา และการแต่งกายของกลุ่มชาติพันธุ์หลากหลายในเชียงราย' },
        { id: '7', name: 'สมาคมส่งเสริมหัตถกรรมและผ้าทอพื้นเมืองเชียงราย', slug: 'chiang-rai-handicraft-textile', description: 'สนับสนุนกลุ่มทอผ้าพื้นเมือง ลวดลายล้านนา ผ้าลายน้ำไหล และงานหัตถกรรมสร้างสรรค์' },
        { id: '8', name: 'เครือข่ายเยาวชนสร้างสรรค์และวัฒนธรรมร่วมสมัย', slug: 'youth-cultural-creative-network', description: 'พลังเยาวชนรุ่นใหม่ขับเคลื่อนวัฒนธรรมเชียงรายผ่านสื่อสร้างสรรค์และงานออกแบบร่วมสมัย' },
    ]

    const hero = pageHeroes?.districts || {}
    const heroMedia = hero.heroImage as MediaLike
    const heroImageUrl = resolveMediaUrl(heroMedia)
    const heroImageAlt = resolveMediaAlt(heroMedia, 'ภาพพื้นหลังเครือข่ายองค์กรทางวัฒนธรรม')
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
                                    เครือข่ายทางวัฒนธรรม
                                </div>
                                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight font-display text-white leading-[1.05] drop-shadow-lg reveal-soft stagger-1">
                                    เครือข่ายองค์กรทางวัฒนธรรม
                                </h1>
                                <div className="w-24 h-1 rounded-full bg-linear-to-r from-secondary via-accent/60 to-transparent mb-6 reveal-soft stagger-2" />
                                <p className="text-lg md:text-xl max-w-3xl font-light leading-relaxed text-white/82 reveal-soft stagger-2">
                                    รวมพลังความร่วมมือระหว่างองค์กร สมาคม มูลนิธิ และสถาบันวัฒนธรรมเพื่อขับเคลื่อนมรดกภูมิปัญญาเมืองเชียงราย
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
                                <span className="w-2 h-2 rounded-full bg-accent" />
                                เครือข่ายทางวัฒนธรรม
                            </div>
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-primary tracking-tight reveal-soft stagger-1 font-display">
                                เครือข่ายองค์กรทางวัฒนธรรม
                            </h1>
                            <p className="text-lg md:text-xl text-base-content/70 max-w-2xl mx-auto font-light leading-relaxed reveal-soft stagger-2">
                                รวมพลังความร่วมมือระหว่างองค์กร สมาคม มูลนิธิ และสถาบันวัฒนธรรมเพื่อขับเคลื่อนมรดกภูมิปัญญาเมืองเชียงราย
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
                        <li className="text-primary font-medium">เครือข่ายองค์กรทางวัฒนธรรม</li>
                    </ul>
                </div>
            </div>

            {/* Content Section - Redesigned Cards Grid */}
            <div className="container mx-auto max-w-7xl px-4 py-8 pb-28 relative z-20">
                {/* Partners Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {partners.map((partner) => (
                        <Link 
                            key={partner.id} 
                            href={`/cultural-networks/partners/${partner.slug}`}
                            className="group bg-white rounded-2xl border border-base-200/90 p-6 flex flex-col items-center justify-between text-center gap-5 hover:border-accent/60 hover:shadow-[0_12px_35px_rgba(27,42,73,0.08)] transition-all duration-300 relative overflow-hidden hover:-translate-y-1"
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            
                            <div className="w-16 h-16 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300 shadow-xs">
                                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:scale-110">
                                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                    <circle cx="9" cy="7" r="4" />
                                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                </svg>
                            </div>

                            <div className="grow flex flex-col items-center">
                                <h3 className="text-xl font-bold text-primary group-hover:text-accent transition-colors font-display mb-2">
                                    {partner.name}
                                </h3>
                                <p className="text-sm text-base-content/65 font-light leading-relaxed line-clamp-3">
                                    {partner.description}
                                </p>
                            </div>

                            <div className="pt-4 border-t border-base-100 w-full flex items-center justify-center gap-1.5 text-xs font-bold text-primary group-hover:text-accent transition-colors">
                                <span className="group-hover:underline underline-offset-4">ข้อมูลองค์กร</span>
                                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
                                    <path d="M5 12h14" />
                                    <path d="m12 5 7 7-7 7" />
                                </svg>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
