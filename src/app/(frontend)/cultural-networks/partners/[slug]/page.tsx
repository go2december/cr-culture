import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getCulturalPartnerBySlug, getCulturalPartnerMembers } from '@/lib/payload'
import CmsImage from '@/components/CmsImage'
import type { PublicDistrictContact } from '@/lib/public-organization'

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>
}): Promise<Metadata> {
    const { slug } = await params
    const decodedSlug = decodeURIComponent(slug)
    const partnerData = await getCulturalPartnerBySlug(decodedSlug)
    if (!partnerData) {
        return {}
    }

    const title = `${partnerData.name} - เครือข่ายองค์กรภาคีวัฒนธรรม`
    const description = partnerData.description || `ข้อมูลเครือข่าย ประธาน และคณะกรรมการของ ${partnerData.name} จังหวัดเชียงราย`

    return {
        title,
        description,
        openGraph: {
            title,
            description,
        },
    }
}

export default async function CulturalPartnerDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const decodedSlug = decodeURIComponent(slug)

    const partnerData = await getCulturalPartnerBySlug(decodedSlug)
    if (!partnerData) {
        return notFound()
    }

    const members = (await getCulturalPartnerMembers(String(partnerData.id)) || []).sort((a, b) => a.order - b.order)

    type PartnerDetail = {
        name: string
        description: string
        contact: PublicDistrictContact
    }

    const partner: PartnerDetail = {
        name: partnerData.name,
        description: partnerData.description || `องค์กรภาคีร่วมขับเคลื่อนและอนุรักษ์ส่งเสริมมรดกทางวัฒนธรรมจังหวัดเชียงราย`,
        contact: {
            address: partnerData.address || `สำนักงาน${partnerData.name} จังหวัดเชียงราย`,
            phone: partnerData.phoneNumber || '-',
            email: partnerData.email || 'partner@crculture.go.th',
        },
    }

    return (
        <div className="bg-slate-50 min-h-screen font-sans">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-white">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 right-[-10%] w-[60%] h-[70%] rounded-full bg-linear-to-bl from-primary/5 to-transparent blur-[120px]" />
                    <div className="absolute bottom-[-20%] left-[-10%] w-[70%] h-[60%] rounded-full bg-linear-to-tr from-secondary/10 to-transparent blur-[130px]" />
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-base-200 text-sm font-medium text-primary shadow-sm mb-6">
                        <span className="w-2 h-2 rounded-full bg-accent" />
                        เครือข่ายองค์กรภาคีวัฒนธรรม
                    </div>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-primary tracking-tight font-display">
                        {partner.name}
                    </h1>
                    <p className="text-lg md:text-xl text-base-content/70 max-w-2xl mx-auto font-light leading-relaxed">
                        {partner.description}
                    </p>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-slate-50 to-transparent z-10" />
            </section>

            {/* Breadcrumb */}
            <div className="container mx-auto max-w-7xl px-4 py-6 relative z-20">
                <div className="breadcrumbs text-sm text-base-content/60 font-light">
                    <ul>
                        <li><Link href="/" className="hover:text-primary transition-colors">หน้าแรก</Link></li>
                        <li><Link href="/cultural-networks/partners" className="hover:text-primary transition-colors">เครือข่ายองค์กรภาคีวัฒนธรรม</Link></li>
                        <li className="text-primary font-medium">{partner.name}</li>
                    </ul>
                </div>
            </div>

            <div className="container mx-auto max-w-7xl px-4 py-8 pb-24">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Committee Section */}
                        <section className="bg-white rounded-3xl border border-base-200 shadow-sm p-8 lg:p-10">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-primary font-display">
                                        คณะผู้บริหารและกรรมการองค์กรภาคี
                                    </h2>
                                    <p className="text-sm text-base-content/60 font-light">
                                        รายนามผู้นำและคณะทำงานขับเคลื่อนองค์กร
                                    </p>
                                </div>
                            </div>

                            {/* Committee Members Grid */}
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {members.length > 0 ? members.map((member, i) => (
                                    <div
                                        key={i}
                                        className="group bg-white rounded-2xl border border-base-200 p-6 hover:shadow-lg hover:border-primary/30 transition-all duration-300"
                                    >
                                        <div className="relative mb-4">
                                            <div className="relative w-28 h-28 mx-auto rounded-full overflow-hidden border-4 border-white shadow-md transition-transform duration-300 bg-linear-to-br from-primary/10 to-secondary/10">
                                                {member.image?.url ? (
                                                    <CmsImage
                                                        src={member.image.url}
                                                        alt={member.name}
                                                        fill
                                                        sizes="112px"
                                                        className="object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-primary/40">
                                                        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                                            <circle cx="9" cy="7" r="4" />
                                                        </svg>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="text-center">
                                            <h3 className="font-bold text-lg text-base-content mb-2 line-clamp-2">
                                                {member.name}
                                            </h3>
                                            <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold shadow-sm ${member.order === 1
                                                ? 'bg-primary text-white'
                                                : member.order <= 5
                                                    ? 'bg-secondary text-primary-dark'
                                                    : 'bg-base-200 text-base-content/70'
                                                }`}>
                                                {member.position}
                                            </span>
                                        </div>
                                    </div>
                                )) : (
                                    <div className="col-span-full text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-base-200">
                                        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4 text-base-content/30">
                                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                            <circle cx="9" cy="7" r="4" />
                                            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                        </svg>
                                        <p className="text-base-content/50">ยังไม่มีข้อมูลคณะกรรมการในขณะนี้</p>
                                    </div>
                                )}
                            </div>
                        </section>
                    </div>

                    {/* Sidebar - Contact Info */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-3xl border border-base-200 shadow-sm p-6 lg:p-8">
                            <h3 className="text-lg font-bold text-primary mb-6 flex items-center gap-3 font-display">
                                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                                ข้อมูลติดต่อองค์กร
                            </h3>

                            <div className="space-y-5">
                                <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-base-100">
                                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary shadow-sm border border-base-200 shrink-0">
                                        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                                    </div>
                                    <div>
                                        <div className="text-xs font-semibold text-base-content/50 uppercase tracking-widest mb-1">ที่อยู่</div>
                                        <p className="text-sm text-base-content/80 leading-relaxed font-medium">
                                            {partner.contact.address}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-base-100">
                                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary shadow-sm border border-base-200 shrink-0">
                                        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="20" x="5" y="2" rx="2" ry="2" /><path d="M12 18h.01" /></svg>
                                    </div>
                                    <div>
                                        <div className="text-xs font-semibold text-base-content/50 uppercase tracking-widest mb-1">โทรศัพท์</div>
                                        <p className="text-sm text-base-content/80 leading-relaxed font-medium">
                                            {partner.contact.phone}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-base-100">
                                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary shadow-sm border border-base-200 shrink-0">
                                        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                                    </div>
                                    <div>
                                        <div className="text-xs font-semibold text-base-content/50 uppercase tracking-widest mb-1">อีเมล</div>
                                        <p className="text-sm text-base-content/80 leading-relaxed font-medium">
                                            {partner.contact.email}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
