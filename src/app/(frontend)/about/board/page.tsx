import Link from 'next/link'
import { getProvincialBoard, getDistrictChairmen } from '@/lib/payload'
import CmsImage from '@/components/CmsImage'
import type { MediaLike } from '@/lib/media'
import type { PublicBoardMember, PublicDistrictChairman } from '@/lib/public-organization'

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
    const rawBoardMembers = await getProvincialBoard() || []
    const districtChairmen = await getDistrictChairmen() || []
    const typedBoardMembers = rawBoardMembers as unknown as Array<{
        name: string
        position?: { title?: string | null; level?: number | null } | null
        positionOrder?: number | null
        image?: MediaLike
    }>
    const typedDistrictChairmen = districtChairmen as unknown as Array<{
        name: string
        district?: { name?: string | null; slug?: string | null } | null
        image?: MediaLike
    }>

    // Map data
    const boardMembers: PublicBoardMember[] = typedBoardMembers.map((member) => ({
        name: member.name,
        position: member.position?.title || 'กรรมการ',
        positionLevel: member.position?.level || 99,
        order: member.positionOrder || 99,
        image: member.image?.url || null,
    }))

    // จัดกลุ่มตามลำดับขั้น
    const chairman = boardMembers.find((m) => m.positionLevel === 1)
    const viceChairmen = boardMembers.filter((m) => m.positionLevel === 2).sort((a, b) => a.order - b.order)
    const committees = boardMembers.filter((m) => m.positionLevel !== 1 && m.positionLevel !== 2 && m.positionLevel !== 4)
    const secretaries = boardMembers.filter((m) => m.positionLevel === 4)

    // Map district chairmen — เรียงตามตัวอักษรของชื่ออำเภอ, ตำแหน่งต่อท้ายชื่ออำเภอไม่เว้นวรรค
    const districtChairmenList: PublicDistrictChairman[] = typedDistrictChairmen.map((m) => {
        const distName = m.district?.name?.replace(/^อำเภอ/, '') || '-'
        return {
            name: m.name,
            position: `ประธานสภาวัฒนธรรมอำเภอ${distName}`,
            districtName: m.district?.name || '-',
            districtSlug: m.district?.slug || '#',
            image: m.image?.url || null,
        }
    }).sort((a, b) => a.districtName.localeCompare(b.districtName, 'th'))

    return (
        <div className="bg-slate-50 min-h-screen font-sans">
            {/* Elegant Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-slate-50 accent-panel">
                <div className="absolute inset-0 z-0 bg-lanna-pattern">
                    <div className="absolute top-0 right-[-10%] w-[60%] h-[70%] rounded-full bg-linear-to-bl from-secondary/15 to-transparent blur-[120px]" />
                    <div className="absolute bottom-[-20%] left-[-10%] w-[70%] h-[60%] rounded-full bg-linear-to-tr from-accent/10 to-transparent blur-[130px]" />
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/80 backdrop-blur-md border border-secondary/30 text-sm font-medium text-primary shadow-sm mb-6 reveal-soft">
                        <span className="w-2 h-2 rounded-full bg-accent" />
                        บุคลากร
                    </div>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-primary tracking-tight font-display reveal-soft stagger-1">
                        คณะกรรมการจังหวัด
                    </h1>
                    <p className="text-lg md:text-xl text-base-content/70 max-w-2xl mx-auto font-light leading-relaxed reveal-soft stagger-2">
                        ทำเนียบคณะบริหารและกรรมการสภาวัฒนธรรมจังหวัดเชียงราย ผู้นำในการขับเคลื่อนงานด้านวัฒนธรรม
                    </p>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-slate-50 to-transparent z-10" />
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

                    <div className="group relative bg-white rounded-3xl p-10 lg:p-12 w-full max-w-xl border border-base-200 shadow-[0_8px_30px_rgb(212,175,55,0.08)] hover:shadow-2xl hover:shadow-secondary/5 hover:border-secondary/30 transition-all duration-500 text-center reveal-soft">
                        <div className="absolute inset-0 bg-linear-to-b from-secondary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative z-10 flex flex-col items-center">
                            <div className="mb-8 transition-transform duration-500">
                                <div className="w-40 h-40 rounded-full bg-linear-to-br from-primary to-secondary p-1 shadow-xl">
                                    <div className="relative w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden border-4 border-white">
                                        {chairman.image ? (
                                            <CmsImage src={chairman.image} alt={chairman.name} fill sizes="160px" className="object-cover" priority />
                                        ) : (
                                            <div className="w-full h-full bg-slate-50 flex items-center justify-center text-primary/30">
                                                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <h3 className="text-3xl font-bold mb-3 text-primary tracking-tight font-display group-hover:text-primary-dark transition-colors">
                                {chairman.name}
                            </h3>
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/20 text-secondary-dark font-medium text-sm">
                                <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                                {chairman.position}
                            </div>
                        </div>
                    </div>
                </div>
                )}

                {/* 2. รองประธาน */}
                {viceChairmen.length > 0 && (
                <>
                    <div className="text-center mb-12">
                        <span className="text-secondary font-semibold tracking-widest text-sm uppercase mb-3 block">Vice Chairman</span>
                        <h2 className="section-header mb-0! text-primary font-display">รองประธาน</h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-20 max-w-5xl mx-auto">
                        {viceChairmen.map((member, i: number) => (
                            <div key={i} className="group bg-white rounded-3xl p-6 border border-base-200 shadow-sm hover:shadow-[0_8px_30px_rgb(212,175,55,0.06)] hover:border-secondary/30 transition-all duration-300 text-center flex flex-col items-center reveal-soft ${i % 4 === 0 ? 'stagger-1' : i % 4 === 1 ? 'stagger-2' : i % 4 === 2 ? 'stagger-3' : 'stagger-4'}">
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

                {/* 3. กรรมการ */}
                {committees.length > 0 && (
                <>
                    <div className="text-center mb-12">
                        <span className="text-secondary font-semibold tracking-widest text-sm uppercase mb-3 block">Committee</span>
                        <h2 className="section-header mb-0! text-primary font-display">กรรมการ</h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-20 max-w-5xl mx-auto">
                        {committees.map((member, i: number) => (
                            <div key={i} className="group bg-white rounded-3xl p-6 border border-base-200 shadow-sm hover:shadow-[0_8px_30px_rgb(212,175,55,0.06)] hover:border-secondary/30 transition-all duration-300 text-center flex flex-col items-center reveal-soft ${i % 4 === 0 ? 'stagger-1' : i % 4 === 1 ? 'stagger-2' : i % 4 === 2 ? 'stagger-3' : 'stagger-4'}">
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

                {/* 4. เลขานุการ */}
                {secretaries.length > 0 && (
                <>
                    <div className="text-center mb-12">
                        <span className="text-secondary font-semibold tracking-widest text-sm uppercase mb-3 block">Secretary</span>
                        <h2 className="section-header mb-0! text-primary font-display">เลขานุการ</h2>
                    </div>

                    <div className="flex flex-wrap justify-center gap-5 mb-20 max-w-5xl mx-auto">
                        {secretaries.map((member, i: number) => (
                            <div key={i} className="group bg-white rounded-3xl p-6 border border-base-200 shadow-sm hover:shadow-[0_8px_30px_rgb(212,175,55,0.06)] hover:border-secondary/30 transition-all duration-300 text-center flex flex-col items-center w-full sm:w-[calc(50%-10px)] md:w-[calc(25%-15px)] reveal-soft ${i % 4 === 0 ? 'stagger-1' : i % 4 === 1 ? 'stagger-2' : i % 4 === 2 ? 'stagger-3' : 'stagger-4'}">
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

                {/* ประธานสภาวัฒนธรรมอำเภอ */}
                {districtChairmenList.length > 0 && (
                <div className="mt-24 pt-16 border-t border-base-200 accent-panel">
                    <div className="text-center mb-10 reveal-soft">
                        <span className="text-secondary font-semibold tracking-widest text-sm uppercase mb-3 block">District Chairmen</span>
                        <h2 className="text-3xl font-bold text-primary font-display">ประธานสภาวัฒนธรรมอำเภอ</h2>
                        <p className="text-base-content/60 font-light mt-3">รายชื่อประธานสภาวัฒนธรรมประจำแต่ละอำเภอ</p>
                    </div>

                    <div className="bg-white rounded-3xl border border-secondary/20 shadow-[0_8px_30px_rgb(212,175,55,0.05)] overflow-hidden relative">
                        <div className="absolute inset-0 opacity-[0.02] mask-kanok bg-primary pointer-events-none" />
                        <div className="overflow-x-auto relative z-10">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-primary/5 border-b border-primary/10 text-sm uppercase tracking-wider text-primary font-bold">
                                        <th className="py-5 px-6 text-center w-20">ลำดับ</th>
                                        <th className="py-5 px-6">อำเภอ</th>
                                        <th className="py-5 px-6">ชื่อ-นามสกุล</th>
                                        <th className="py-5 px-6">ตำแหน่ง</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {districtChairmenList.map((member, idx: number) => (
                                        <tr key={idx} className={`border-b border-base-100 hover:bg-slate-50 transition-colors ${idx === districtChairmenList.length - 1 ? 'border-none' : ''}`}>
                                            <td className="py-4 px-6 text-center text-sm font-semibold text-primary/40">{idx + 1}</td>
                                            <td className="py-4 px-6">
                                                <Link href={`/districts/${member.districtSlug}`} className="inline-flex min-h-11 items-center font-medium text-primary hover:text-secondary-dark transition-colors">
                                                    {member.districtName}
                                                </Link>
                                            </td>
                                            <td className="py-4 px-6 font-medium text-base-content">{member.name}</td>
                                            <td className="py-4 px-6 text-base-content/70 font-light">
                                                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-secondary/20 text-secondary-dark">
                                                    {member.position}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                )}
            </div>
        </div>
    )
}



