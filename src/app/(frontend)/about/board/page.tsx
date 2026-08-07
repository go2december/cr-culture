import Link from 'next/link'
import { getPageHeroes, getProvincialBoard, getCulturalPartnerChairmen, getDistrictChairmen } from '@/lib/payload'
import CmsImage from '@/components/CmsImage'
import { resolveMediaAlt, resolveMediaUrl, type MediaLike } from '@/lib/media'
import type { PublicBoardMember, PublicDistrictChairman } from '@/lib/public-organization'

export const dynamic = 'force-dynamic'

// Helper: render member avatar
function MemberAvatar({ image, name, size = 'md' }: { image: string | null, name: string, size?: 'lg' | 'md' | 'sm' }) {
    const sizeClasses = {
        lg: 'w-40 h-40',
        md: 'w-24 h-24',
        sm: 'w-16 h-16',
    }
    const iconSizes = { lg: 64, md: 32, sm: 24 }

    return (
        <div className={`${sizeClasses[size]} rounded-full bg-linear-to-br from-primary/10 to-secondary/10 p-1`}>
            <div className="relative w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                {image ? (
                    <CmsImage src={image} alt={name} fill sizes={size === 'lg' ? '160px' : size === 'md' ? '96px' : '64px'} className="object-cover" />
                ) : (
                    <div className="w-full h-full bg-slate-50 flex items-center justify-center text-primary/20">
                        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={iconSizes[size]} height={iconSizes[size]} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                    </div>
                )}
            </div>
        </div>
    )
}

export default async function BoardPage() {
    const pageHeroes = await getPageHeroes().catch(() => null)
    const boardMembers = await getProvincialBoard() || []
    const getBoardDisplayRank = (member: PublicBoardMember) => {
        if (member.positionLevel === 1) return 1
        if (member.positionLevel === 2) return 2
        if (member.positionLevel === 3) return 3

        if (member.positionLevel === 4) return 4
        if (member.positionLevel === 5) return 5

        if (member.position.includes('เลขานุการ')) return 5

        return 99
    }

    const orderedBoardMembers = [...boardMembers].sort((a, b) => {
        const rankDifference = getBoardDisplayRank(a) - getBoardDisplayRank(b)
        if (rankDifference !== 0) {
            return rankDifference
        }

        return a.order - b.order
    })

    const partnerChairmenList: PublicDistrictChairman[] = (await getCulturalPartnerChairmen() || [])
    const districtChairmenList: PublicDistrictChairman[] = (await getDistrictChairmen() || [])
        .sort((a, b) => (a.districtCode || '').localeCompare(b.districtCode || ''));



    const resolvedBoardMembers = orderedBoardMembers.map((member) => {
        if (member.sourceType === 'partner' && member.partner?.slug) {
            const chairman = partnerChairmenList.find(
                (c) => c.districtSlug === member.partner?.slug
            )
            if (chairman) {
                return {
                    ...member,
                    name: chairman.name,
                    position: member.position,
                    image: chairman.image,
                    partnerSlug: chairman.districtSlug,
                }
            }
        }
        if (member.sourceType === 'district' && member.district?.slug) {
            const chairman = districtChairmenList.find(
                (c) => c.districtSlug === member.district?.slug
            )
            if (chairman) {
                return {
                    ...member,
                    name: chairman.name,
                    position: member.position,
                    image: chairman.image,
                    districtSlug: chairman.districtSlug,
                }
            }
        }

        return {
            ...member,
            districtSlug: null,
            partnerSlug: null,
        }
    })

    // จัดกลุ่มตามลำดับขั้น
    const chairman = resolvedBoardMembers.find((m) => m.positionLevel === 1)
    const viceChairmen = resolvedBoardMembers.filter((m) => m.positionLevel === 2)
    const committees = resolvedBoardMembers.filter((m) => m.positionLevel === 3)
    
    // ดึงข้อมูลจากตำแหน่งประธานองค์กรภาคีวัฒนธรรม และสภาอำเภอ มาเป็นกรรมการสภาวัฒนธรรมจังหวัด (แยกเป็น 2 กลุ่มอย่างชัดเจน)
    const manualCoordinators = resolvedBoardMembers.filter(
        (m) => m.positionLevel === 4 && !m.position.includes('เลขานุการ') && m.sourceType === 'manual'
    )
    const dbNetworkCoordinators = resolvedBoardMembers.filter(
        (m) => m.positionLevel === 4 && !m.position.includes('เลขานุการ') && (m.sourceType === 'partner' || m.sourceType === 'district')
    )

    // แบบที่ 1: กรรมการ (ประธานสภาวัฒนธรรมอำเภอ 18 อำเภอ)
    const districtCoordinators = districtChairmenList.map((districtItem, idx) => {
        const dbOverride = dbNetworkCoordinators.find((m) => m.district?.slug === districtItem.districtSlug)
        const displayPosition = dbOverride && dbOverride.position !== 'กรรมการ' ? dbOverride.position : districtItem.position
        return {
            name: districtItem.name,
            position: displayPosition,
            positionLevel: 4,
            order: (dbOverride?.order && dbOverride.order !== 99) ? dbOverride.order : (idx + 1),
            image: districtItem.image,
            districtSlug: districtItem.districtSlug,
            partnerSlug: null as string | null,
        }
    })

    // แบบที่ 2: กรรมการ (ประธาน/ผู้นำเครือข่ายองค์กรภาคีวัฒนธรรม)
    const partnerCoordinators = partnerChairmenList.map((partnerItem, idx) => {
        const dbOverride = dbNetworkCoordinators.find((m) => m.partner?.slug === partnerItem.districtSlug)
        const displayPosition = dbOverride && dbOverride.position !== 'กรรมการ' ? dbOverride.position : partnerItem.position
        return {
            name: partnerItem.name,
            position: displayPosition,
            positionLevel: 4,
            order: (dbOverride?.order && dbOverride.order !== 99) ? dbOverride.order : (idx + 1 + districtChairmenList.length),
            image: partnerItem.image,
            districtSlug: null as string | null,
            partnerSlug: partnerItem.districtSlug,
        }
    })

    const coordinators = [...districtCoordinators, ...partnerCoordinators, ...manualCoordinators];

    const secretaryMembers = resolvedBoardMembers.filter((m) => m.positionLevel === 5 || (m.positionLevel === 4 && m.position.includes('เลขานุการ')))

    const hero = pageHeroes?.aboutBoard || {}
    const heroMedia = hero.heroImage as MediaLike
    const heroImageUrl = resolveMediaUrl(heroMedia)
    const heroImageAlt = resolveMediaAlt(heroMedia, (hero.title as string) || 'ภาพพื้นหลังหน้าคณะกรรมการจังหวัด')
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
                                    {(hero.eyebrow as string) || 'บุคลากร'}
                                </div>
                                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight font-display text-white leading-[1.05] drop-shadow-lg reveal-soft stagger-1">
                                    {(hero.title as string) || 'คณะกรรมการจังหวัด'}
                                </h1>
                                <div className="w-24 h-1 rounded-full bg-linear-to-r from-secondary via-accent/60 to-transparent mb-6 reveal-soft stagger-2" />
                                <p className="text-lg md:text-xl max-w-3xl font-light leading-relaxed text-white/82 reveal-soft stagger-2">
                                    {(hero.subtitle as string) || 'ทำเนียบคณะบริหารและกรรมการสภาวัฒนธรรมจังหวัดเชียงราย ผู้นำในการขับเคลื่อนงานด้านวัฒนธรรม'}
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
                                {(hero.eyebrow as string) || 'บุคลากร'}
                            </div>
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-primary tracking-tight font-display reveal-soft stagger-1">
                                {(hero.title as string) || 'คณะกรรมการจังหวัด'}
                            </h1>
                            <p className="text-lg md:text-xl text-base-content/70 max-w-2xl mx-auto font-light leading-relaxed reveal-soft stagger-2">
                                {(hero.subtitle as string) || 'ทำเนียบคณะบริหารและกรรมการสภาวัฒนธรรมจังหวัดเชียงราย ผู้นำในการขับเคลื่อนงานด้านวัฒนธรรม'}
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
                        <li><Link href="/about" className="inline-flex min-h-11 items-center hover:text-primary transition-colors">เกี่ยวกับเรา</Link></li>
                        <li className="text-primary font-medium">คณะกรรมการจังหวัด</li>
                    </ul>
                </div>
            </div>

            <div className="container mx-auto max-w-6xl px-4 py-12 pb-24 relative z-20">
                {/* 1. ประธานสภาวัฒนธรรม */}
                {chairman && (
                <div className="flex flex-col items-center justify-center mb-20">
                    <div className="text-center mb-8">
                        <span className="text-secondary font-semibold tracking-widest text-sm uppercase mb-3 block">Chairman</span>
                        <h2 className="text-3xl font-bold text-primary font-display">ประธานสภาวัฒนธรรม</h2>
                    </div>

                    <div className="bg-white rounded-3xl p-8 md:p-10 border border-base-200 shadow-lg hover:shadow-xl transition-all duration-300 text-center flex flex-col items-center max-w-md w-full relative overflow-hidden group reveal-soft">
                        <div className="absolute top-0 left-0 right-0 h-2 bg-linear-to-r from-primary via-secondary to-accent" />
                        <div className="mb-6 transition-transform duration-300 group-hover:scale-105">
                            <MemberAvatar image={chairman.image} name={chairman.name} size="lg" />
                        </div>
                        <h3 className="text-2xl font-bold mb-2 text-primary font-display">{chairman.name}</h3>
                        <p className="text-secondary-dark font-medium text-lg mb-4">{chairman.position}</p>
                    </div>
                </div>
                )}

                {/* 2. รองประธาน */}
                {viceChairmen.length > 0 && (
                <>
                    <div className="text-center mb-12">
                        <span className="text-secondary font-semibold tracking-widest text-sm uppercase mb-3 block">Vice Chairmen</span>
                        <h2 className="section-header mb-0! text-primary font-display">รองประธานสภาวัฒนธรรม</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20 max-w-5xl mx-auto">
                        {viceChairmen.map((member, i: number) => (
                            <div key={i} className={`group bg-white rounded-3xl p-6 border border-base-200 shadow-sm hover:shadow-[0_8px_30px_rgb(212,175,55,0.08)] hover:border-secondary/40 transition-all duration-300 text-center flex flex-col items-center reveal-soft ${i % 4 === 0 ? 'stagger-1' : i % 4 === 1 ? 'stagger-2' : i % 4 === 2 ? 'stagger-3' : 'stagger-4'}`}>
                                <div className="mb-6 transition-transform duration-300">
                                    <MemberAvatar image={member.image} name={member.name} size="md" />
                                </div>
                                <h3 className="text-xl font-bold mb-2 text-base-content group-hover:text-primary transition-colors font-display">{member.name}</h3>
                                <p className="text-sm font-medium text-secondary-dark">{member.position}</p>
                            </div>
                        ))}
                    </div>
                </>
                )}

                {/* 3. คณะกรรมการบริหารและประสานงาน */}
                {committees.length > 0 && (
                <>
                    <div className="text-center mb-12">
                        <span className="text-secondary font-semibold tracking-widest text-sm uppercase mb-3 block">Executive Committee</span>
                        <h2 className="section-header mb-0! text-primary font-display">คณะกรรมการบริหารและประสานงาน</h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-20 max-w-5xl mx-auto">
                        {committees.map((member, i: number) => (
                            <div key={i} className={`group bg-white rounded-3xl p-6 border border-base-200 shadow-sm hover:shadow-[0_8px_30px_rgb(212,175,55,0.06)] hover:border-secondary/30 transition-all duration-300 text-center flex flex-col items-center reveal-soft ${i % 4 === 0 ? 'stagger-1' : i % 4 === 1 ? 'stagger-2' : i % 4 === 2 ? 'stagger-3' : 'stagger-4'}`}>
                                <div className="mb-6 transition-transform duration-300">
                                    <MemberAvatar image={member.image} name={member.name} size="md" />
                                </div>
                                <h3 className="text-xl font-bold mb-2 text-base-content group-hover:text-primary transition-colors font-display">{member.name}</h3>
                                {member.partnerSlug ? (
                                    <Link href={`/cultural-networks/partners/${member.partnerSlug}`} className="text-sm font-medium text-secondary hover:text-secondary-dark transition-colors hover:underline">
                                        {member.position}
                                    </Link>
                                ) : member.districtSlug ? (
                                    <Link href={`/cultural-networks/districts/${member.districtSlug}`} className="text-sm font-medium text-secondary hover:text-secondary-dark transition-colors hover:underline">
                                        {member.position}
                                    </Link>
                                ) : (
                                    <p className="text-sm font-medium text-secondary-dark">{member.position}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </>
                )}

                {/* 4. กรรมการ */}
                {coordinators.length > 0 && (
                <>
                    <div className="text-center mb-12">
                        <span className="text-secondary font-semibold tracking-widest text-sm uppercase mb-3 block">Board Members</span>
                        <h2 className="section-header mb-0! text-primary font-display">กรรมการ</h2>
                    </div>

                    <div className="flex flex-wrap justify-center gap-5 mb-20 max-w-5xl mx-auto">
                        {coordinators.map((member, i: number) => (
                            <div key={i} className={`group bg-white rounded-3xl p-6 border border-base-200 shadow-sm hover:shadow-[0_8px_30px_rgb(212,175,55,0.06)] hover:border-secondary/30 transition-all duration-300 text-center flex flex-col items-center w-full sm:w-[calc(50%-10px)] md:w-[calc(25%-15px)] reveal-soft ${i % 4 === 0 ? 'stagger-1' : i % 4 === 1 ? 'stagger-2' : i % 4 === 2 ? 'stagger-3' : 'stagger-4'}`}>
                                <div className="mb-6 transition-transform duration-300">
                                    <MemberAvatar image={member.image} name={member.name} size="md" />
                                </div>
                                <h3 className="text-xl font-bold mb-2 text-base-content group-hover:text-primary transition-colors font-display">{member.name}</h3>
                                {member.partnerSlug ? (
                                    <Link href={`/cultural-networks/partners/${member.partnerSlug}`} className="text-sm font-medium text-secondary hover:text-secondary-dark transition-colors hover:underline">
                                        {member.position}
                                    </Link>
                                ) : member.districtSlug ? (
                                    <Link href={`/cultural-networks/districts/${member.districtSlug}`} className="text-sm font-medium text-secondary hover:text-secondary-dark transition-colors hover:underline">
                                        {member.position}
                                    </Link>
                                ) : (
                                    <p className="text-sm font-medium text-secondary-dark">{member.position}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </>
                )}

                {/* 5. เลขานุการ */}
                {secretaryMembers.length > 0 && (
                <>
                    <div className="text-center mb-12">
                        <span className="text-secondary font-semibold tracking-widest text-sm uppercase mb-3 block">Secretary</span>
                        <h2 className="section-header mb-0! text-primary font-display">เลขานุการ</h2>
                    </div>

                    <div className="flex flex-wrap justify-center gap-5 mb-20 max-w-5xl mx-auto">
                        {secretaryMembers.map((member, i: number) => (
                            <div key={i} className={`group bg-white rounded-3xl p-6 border border-base-200 shadow-sm hover:shadow-[0_8px_30px_rgb(212,175,55,0.06)] hover:border-secondary/30 transition-all duration-300 text-center flex flex-col items-center w-full sm:w-[calc(50%-10px)] md:w-[calc(25%-15px)] reveal-soft ${i % 4 === 0 ? 'stagger-1' : i % 4 === 1 ? 'stagger-2' : i % 4 === 2 ? 'stagger-3' : 'stagger-4'}`}>
                                <div className="mb-6 transition-transform duration-300">
                                    <MemberAvatar image={member.image} name={member.name} size="md" />
                                </div>
                                <h3 className="text-xl font-bold mb-2 text-base-content group-hover:text-primary transition-colors font-display">{member.name}</h3>
                                {member.partnerSlug ? (
                                    <Link href={`/cultural-networks/partners/${member.partnerSlug}`} className="text-sm font-medium text-secondary hover:text-secondary-dark transition-colors hover:underline">
                                        {member.position}
                                    </Link>
                                ) : member.districtSlug ? (
                                    <Link href={`/cultural-networks/districts/${member.districtSlug}`} className="text-sm font-medium text-secondary hover:text-secondary-dark transition-colors hover:underline">
                                        {member.position}
                                    </Link>
                                ) : (
                                    <p className="text-sm font-medium text-secondary-dark">{member.position}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </>
                )}
            </div>
        </div>
    )
}



