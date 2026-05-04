import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getDistrictBySlug, getDistrictMembers, getActivities } from '@/lib/payload'
import CmsImage from '@/components/CmsImage'
import type { MediaLike } from '@/lib/media'
import type { PublicDistrictContact, PublicDistrictMember } from '@/lib/public-organization'

export default async function DistrictDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const decodedSlug = decodeURIComponent(slug)

    // Fetch from Payload API
    const districtData = await getDistrictBySlug(decodedSlug)
    if (!districtData) {
        // Fallback for visual mock or 404
        return notFound()
    }

    const rawMembers = await getDistrictMembers(String(districtData.id))
    const typedMembers = rawMembers as unknown as Array<{
        name: string
        position?: { title?: string | null } | null
        positionOrder?: number | null
        image?: MediaLike
        phone?: string | null
        isActive?: boolean | null
    }>
    const members: PublicDistrictMember[] = typedMembers.length > 0 ? typedMembers.map((member) => ({
        name: member.name,
        position: member.position?.title || 'กรรมการ',
        order: member.positionOrder || 99,
        image: member.image,
        phone: member.phone,
        isActive: member.isActive
    })).sort((a, b) => a.order - b.order) : []

    const { docs: activities } = await getActivities({ level: 'district', districtId: String(districtData.id), limit: 5 })

    // Build the final district object to map safely
    type DistrictDetail = {
        name: string
        description: string
        contact: PublicDistrictContact
    }

    const district: DistrictDetail = {
        name: districtData.name,
        description: districtData.description || `ศูนย์กลางส่งเสริมและอนุรักษ์มรดกภูมิปัญญาทางวัฒนธรรมประจำอำเภอ${districtData.name}`,
        contact: {
            address: districtData.address || `ที่ว่าการอำเภอ${districtData.name} จ.เชียงราย`,
            phone: districtData.phoneNumber || '-',
            email: districtData.email || 'contact@crculture.go.th',
        },
    }

    return (
        <div className="bg-slate-50 min-h-screen">
            {/* Elegant Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-white">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 right-[-10%] w-[60%] h-[70%] rounded-full bg-linear-to-bl from-primary/5 to-transparent blur-[120px]" />
                    <div className="absolute bottom-[-20%] left-[-10%] w-[70%] h-[60%] rounded-full bg-linear-to-tr from-secondary/10 to-transparent blur-[130px]" />
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-size-[40px_40px] mask-[radial-gradient(ellipse_50%_50%_at_50%,#000_70%,transparent_100%)]" />
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-base-200 text-sm font-medium text-primary shadow-sm mb-6">
                        <span className="w-2 h-2 rounded-full bg-secondary" />
                        เครือข่ายระดับอำเภอ
                    </div>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-primary tracking-tight">
                        สภาวัฒนธรรมอำเภอ{district.name}
                    </h1>
                    <p className="text-lg md:text-xl text-base-content/70 max-w-2xl mx-auto font-light leading-relaxed">
                        {district.description}
                    </p>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-slate-50 to-transparent z-10" />
            </section>

            {/* Breadcrumb - Subtle & Clean */}
            <div className="container mx-auto max-w-7xl px-4 py-6 relative z-20">
                <div className="breadcrumbs text-sm text-base-content/60 font-light">
                    <ul>
                        <li><Link href="/" className="hover:text-primary transition-colors">หน้าแรก</Link></li>
                        <li><Link href="/districts" className="hover:text-primary transition-colors">เครือข่ายอำเภอ</Link></li>
                        <li className="text-primary font-medium">{district.name}</li>
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
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-primary">
                                        คณะกรรมการสภาวัฒนธรรมอำเภอ
                                    </h2>
                                    <p className="text-sm text-base-content/60 font-light">
                                        รายนามคณะกรรมการบริหารงาน
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
                                        {/* Profile Image - Top */}
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

                                        {/* Member Info - Bottom Section */}
                                        <div className="text-center">
                                            <h3 className="font-bold text-lg text-base-content mb-2 line-clamp-2">
                                                {member.name}
                                            </h3>
                                            {/* Position Badge - Below Name */}
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
                                        <p className="text-base-content/50">ยังไม่มีข้อมูลคณะกรรมการอำเภอ</p>
                                    </div>
                                )}
                            </div>
                        </section>

                        {/* Activities Section */}
                        <section className="bg-white rounded-3xl border border-base-200 shadow-sm p-8 lg:p-10">
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary-dark">
                                        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2v4" /><path d="M16 2v4" /><rect width="18" height="18" x="3" y="4" rx="2" /><path d="M3 10h18" /><path d="M8 14h.01" /><path d="M12 14h.01" /><path d="M16 14h.01" /><path d="M8 18h.01" /><path d="M12 18h.01" /><path d="M16 18h.01" /></svg>
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-primary">
                                            กิจกรรมในอำเภอ
                                        </h2>
                                        <p className="text-sm text-base-content/60 font-light">
                                            อัปเดตกิจกรรมล่าสุด
                                        </p>
                                    </div>
                                </div>
                                <Link href="/activities" className="text-sm font-semibold text-primary hover:text-primary-light transition-colors hidden sm:inline-flex min-h-11 items-center gap-1 group">
                                    ดูทั้งหมด
                                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                                </Link>
                            </div>

                            <div className="space-y-4">
                                {activities.length > 0 ? (
                                    activities.map((activity, i) => (
                                        <div key={i} className="flex flex-col sm:flex-row items-center gap-4 p-4 lg:p-6 bg-slate-50 rounded-2xl border border-base-200 hover:border-primary/30 transition-colors group cursor-pointer">
                                            <div className="bg-white text-center rounded-xl shadow-sm border border-base-200 overflow-hidden shrink-0 min-w-20">
                                                <div className="bg-primary text-white text-[10px] font-bold py-1 px-3 uppercase tracking-wider">
                                                    {new Date(activity.date).toLocaleDateString('th-TH', { month: 'short' })}
                                                </div>
                                                <div className="text-2xl font-bold text-primary py-2">
                                                    {new Date(activity.date).getDate()}
                                                </div>
                                            </div>
                                            <div className="flex-1 text-center sm:text-left">
                                                <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-bold tracking-widest uppercase bg-secondary/10 text-secondary-dark mb-2">
                                                    กิจกรรมอำเภอ
                                                </span>
                                                <h3 className="font-bold text-lg text-base-content group-hover:text-primary transition-colors">
                                                    {activity.title}
                                                </h3>
                                            </div>
                                            <div className="w-10 h-10 rounded-full bg-white hidden sm:flex items-center justify-center text-base-content/30 group-hover:text-primary group-hover:bg-primary/5 transition-all shrink-0 shadow-sm border border-base-200">
                                                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 transition-transform"><path d="m9 18 6-6-6-6" /></svg>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-12 px-4 rounded-2xl border border-dashed border-base-300 bg-slate-50/50">
                                        <p className="text-base-content/50 font-light">
                                            ยังไม่มีกิจกรรมในขณะนี้
                                        </p>
                                    </div>
                                )}
                            </div>
                        </section>
                    </div>

                    {/* Sidebar - Contact Info */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-3xl border border-base-200 shadow-sm p-6 lg:p-8">
                            <h3 className="text-lg font-bold text-primary mb-6 flex items-center gap-3">
                                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-secondary"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                                ข้อมูลติดต่อ
                            </h3>

                            <div className="space-y-5">
                                <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-base-100">
                                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary shadow-sm border border-base-200 shrink-0">
                                        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                                    </div>
                                    <div>
                                        <div className="text-xs font-semibold text-base-content/50 uppercase tracking-widest mb-1">ที่อยู่</div>
                                        <p className="text-sm text-base-content/80 leading-relaxed font-medium">
                                            {district.contact.address}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-base-100">
                                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary shadow-sm border border-base-200 shrink-0">
                                        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="20" x="5" y="2" rx="2" ry="2" /><path d="M12 18h.01" /></svg>
                                    </div>
                                    <div>
                                        <div className="text-xs font-semibold text-base-content/50 uppercase tracking-widest mb-1">โทรศัพท์</div>
                                        <p className="text-sm text-base-content/80 leading-relaxed font-medium hover:text-primary transition-colors cursor-pointer">
                                            {district.contact.phone}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-base-100">
                                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary shadow-sm border border-base-200 shrink-0">
                                        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                                    </div>
                                    <div>
                                        <div className="text-xs font-semibold text-base-content/50 uppercase tracking-widest mb-1">อีเมล</div>
                                        <p className="text-sm text-base-content/80 leading-relaxed font-medium hover:text-primary transition-colors cursor-pointer">
                                            {district.contact.email}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="bg-linear-to-br from-primary to-primary-dark rounded-3xl shadow-lg p-6 lg:p-8 text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full" />
                            <div className="absolute bottom-0 left-0 w-24 h-24 bg-secondary/10 rounded-tr-full" />

                            <h3 className="text-lg font-bold mb-6 relative z-10 flex items-center gap-2">
                                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>
                                ลิงก์ที่เกี่ยวข้อง
                            </h3>
                            <ul className="space-y-3 relative z-10">
                                <li>
                                    <Link href="/heritage" className="flex min-h-11 items-center justify-between p-3 rounded-xl hover:bg-white/10 transition-colors group">
                                        <div className="flex items-center gap-3">
                                            <span className="p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors">
                                                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                                                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                                                </svg>
                                            </span>
                                            <span className="text-sm font-medium">คลังมรดกภูมิปัญญา</span>
                                        </div>
                                        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/activities" className="flex min-h-11 items-center justify-between p-3 rounded-xl hover:bg-white/10 transition-colors group">
                                        <div className="flex items-center gap-3">
                                            <span className="p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors">
                                                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M8 2v4" />
                                                    <path d="M16 2v4" />
                                                    <rect width="18" height="18" x="3" y="4" rx="2" />
                                                    <path d="M3 10h18" />
                                                    <path d="m16 18-4-3-4 3" />
                                                </svg>
                                            </span>
                                            <span className="text-sm font-medium">กิจกรรมทั้งหมด</span>
                                        </div>
                                        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/districts" className="flex min-h-11 items-center justify-between p-3 rounded-xl hover:bg-white/10 transition-colors group">
                                        <div className="flex items-center gap-3">
                                            <span className="p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors">
                                                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                                                    <circle cx="12" cy="10" r="3" />
                                                </svg>
                                            </span>
                                            <span className="text-sm font-medium">อำเภออื่นๆ</span>
                                        </div>
                                        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


