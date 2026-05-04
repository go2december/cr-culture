import Link from 'next/link'

export default function ContactPage() {
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
                        <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                        ติดต่อเรา
                    </div>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-primary tracking-tight reveal-soft stagger-1 font-display">
                        ติดต่อสภาวัฒนธรรม
                    </h1>
                    <p className="text-lg md:text-xl text-base-content/70 max-w-2xl mx-auto font-light leading-relaxed reveal-soft stagger-2">
                        สอบถามข้อมูล หรือประสานงานเครือข่ายวัฒนธรรมจังหวัดเชียงราย ผ่านช่องทางด้านล่าง
                    </p>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-slate-50 to-transparent z-10" />
            </section>

            {/* Breadcrumb */}
            <div className="container mx-auto max-w-7xl px-4 py-6 relative z-20">
                <div className="breadcrumbs text-sm text-base-content/60 font-light">
                    <ul>
                        <li><Link href="/" className="hover:text-primary transition-colors">หน้าแรก</Link></li>
                        <li className="text-primary font-medium">ติดต่อเรา</li>
                    </ul>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto max-w-6xl px-4 py-12 pb-8 relative z-20">
                {/* Contact Cards Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Address */}
                    <div className="group relative bg-white rounded-3xl border border-base-200 shadow-sm p-8 hover:border-secondary/30 hover:shadow-[0_8px_30px_rgb(212,175,55,0.08)] transition-all duration-400 overflow-hidden reveal-soft stagger-1">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-linear-to-bl from-primary/5 to-transparent rounded-tr-3xl rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative z-10">
                            <div className="w-14 h-14 bg-linear-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform shadow-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" /><circle cx="12" cy="10" r="3" /></svg>
                            </div>
                            <h3 className="font-bold text-lg mb-3 text-primary font-display">ที่อยู่</h3>
                            <p className="text-base-content/70 font-light leading-relaxed text-sm">
                                สำนักงานสภาวัฒนธรรมจังหวัดเชียงราย<br />
                                ศาลากลางจังหวัดเชียงราย ชั้น 3<br />
                                ถนนแม่ฟ้าหลวง ตำบลริมกก<br />
                                อำเภอเมือง จังหวัดเชียงราย 57100
                            </p>
                        </div>
                    </div>

                    {/* Phone */}
                    <div className="group relative bg-white rounded-3xl border border-base-200 shadow-sm p-8 hover:border-secondary/30 hover:shadow-[0_8px_30px_rgb(212,175,55,0.08)] transition-all duration-400 overflow-hidden reveal-soft stagger-2">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-linear-to-bl from-secondary/5 to-transparent rounded-tr-3xl rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative z-10">
                            <div className="w-14 h-14 bg-linear-to-br from-secondary/10 to-secondary/5 rounded-2xl flex items-center justify-center text-secondary-dark mb-6 group-hover:scale-110 transition-transform shadow-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                            </div>
                            <h3 className="font-bold text-lg mb-3 text-primary font-display">โทรศัพท์</h3>
                            <div className="space-y-2">
                                <a href="tel:053150150" className="text-base-content/70 font-light text-sm hover:text-primary transition-colors flex items-center gap-2 group/link">
                                    <span className="w-1.5 h-1.5 rounded-full bg-accent/50 group-hover/link:bg-accent transition-colors" />
                                    053-150-150 ต่อ 123
                                </a>
                                <p className="text-base-content/50 font-light text-sm flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-base-300" />
                                    053-150-151 (แฟกซ์)
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Email */}
                    <div className="group relative bg-white rounded-3xl border border-base-200 shadow-sm p-8 hover:border-secondary/30 hover:shadow-[0_8px_30px_rgb(212,175,55,0.08)] transition-all duration-400 overflow-hidden reveal-soft stagger-3">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-linear-to-bl from-primary/5 to-transparent rounded-tr-3xl rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative z-10">
                            <div className="w-14 h-14 bg-linear-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform shadow-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                            </div>
                            <h3 className="font-bold text-lg mb-3 text-primary font-display">อีเมล</h3>
                            <a href="mailto:culture@chiangrai.go.th" className="text-base-content/70 font-light text-sm hover:text-primary transition-colors break-all">
                                culture@chiangrai.go.th
                            </a>
                        </div>
                    </div>

                    {/* Hours */}
                    <div className="group relative bg-white rounded-3xl border border-base-200 shadow-sm p-8 hover:border-secondary/30 hover:shadow-[0_8px_30px_rgb(212,175,55,0.08)] transition-all duration-400 overflow-hidden reveal-soft stagger-4">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-linear-to-bl from-secondary/5 to-transparent rounded-tr-3xl rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative z-10">
                            <div className="w-14 h-14 bg-linear-to-br from-secondary/10 to-secondary/5 rounded-2xl flex items-center justify-center text-secondary-dark mb-6 group-hover:scale-110 transition-transform shadow-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                            </div>
                            <h3 className="font-bold text-lg mb-3 text-primary font-display">เวลาทำการ</h3>
                            <div className="space-y-2">
                                <p className="text-base-content/70 font-light text-sm flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                                    จันทร์ - ศุกร์: 08:30 - 16:30 น.
                                </p>
                                <p className="text-base-content/50 font-light text-xs">
                                    (หยุดวันเสาร์-อาทิตย์ และวันหยุดราชการ)
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Social Media & Quick Actions */}
                <div className="mt-12 grid md:grid-cols-2 gap-8">
                    {/* Social Media */}
                    <div className="bg-white rounded-3xl border border-base-200 shadow-sm p-8 lg:p-10 accent-panel reveal-soft stagger-1">
                        <h3 className="text-xl font-bold text-primary mb-6 font-display flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                            </div>
                            ติดตามเรา
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <a href="#" className="group flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-base-100 hover:bg-white hover:border-[#1877F2]/30 hover:shadow-md transition-all">
                                <div className="w-12 h-12 rounded-xl bg-[#1877F2] flex items-center justify-center text-white shadow-sm group-hover:scale-110 transition-transform">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                </div>
                                <div>
                                    <span className="font-semibold text-sm text-base-content group-hover:text-[#1877F2] transition-colors">Facebook</span>
                                    <p className="text-xs text-base-content/50 font-light">@crculture</p>
                                </div>
                            </a>

                            <a href="#" className="group flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-base-100 hover:bg-white hover:border-[#00c300]/30 hover:shadow-md transition-all">
                                <div className="w-12 h-12 rounded-xl bg-[#00c300] flex items-center justify-center text-white shadow-sm group-hover:scale-110 transition-transform">
                                    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12.01 2C6.5 2 2.02 5.86 2.02 10.61c0 2.65 1.33 5.01 3.41 6.59-.12.44-.64 2.28-.67 2.44 0 0-.01.09.04.13s.11.01.11.01c.15-.02 1.76-1.15 2.46-1.68.6.17 1.24.29 1.9.35.31.03.63.05.95.05h.27c-.06-.34-.09-.69-.09-1.05 0-4.24 3.99-7.67 8.9-7.67.35 0 .69.02 1.03.06C19.82 5.55 16.28 2 12.01 2zm-2.76 6.89c.38 0 .68.31.68.69v3.12c0 .38-.3.69-.68.69s-.69-.31-.69-.69V9.58c0-.38.31-.69.69-.69zm5.5 0c.38 0 .69.31.69.69v3.12c0 .38-.31.69-.69.69s-.68-.31-.68-.69V9.58c0-.38.3-.69.68-.69z" />
                                    </svg>
                                </div>
                                <div>
                                    <span className="font-semibold text-sm text-base-content group-hover:text-[#00c300] transition-colors">LINE</span>
                                    <p className="text-xs text-base-content/50 font-light">@crculture</p>
                                </div>
                            </a>

                            <a href="#" className="group flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-base-100 hover:bg-white hover:border-[#FF0000]/30 hover:shadow-md transition-all">
                                <div className="w-12 h-12 rounded-xl bg-[#FF0000] flex items-center justify-center text-white shadow-sm group-hover:scale-110 transition-transform">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                    </svg>
                                </div>
                                <div>
                                    <span className="font-semibold text-sm text-base-content group-hover:text-[#FF0000] transition-colors">YouTube</span>
                                    <p className="text-xs text-base-content/50 font-light">CR Culture</p>
                                </div>
                            </a>

                            <a href="#" className="group flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-base-100 hover:bg-white hover:border-primary/30 hover:shadow-md transition-all">
                                <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-white shadow-sm group-hover:scale-110 transition-transform">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M2 12h20" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
                                </div>
                                <div>
                                    <span className="font-semibold text-sm text-base-content group-hover:text-primary transition-colors">เว็บไซต์</span>
                                    <p className="text-xs text-base-content/50 font-light">crculture.go.th</p>
                                </div>
                            </a>
                        </div>
                    </div>

                    {/* Quick Access Links */}
                    <div className="bg-linear-to-br from-primary to-primary-dark rounded-3xl shadow-lg p-8 lg:p-10 text-white relative overflow-hidden accent-panel reveal-soft stagger-2">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-bl-full" />
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/10 rounded-tr-full" />
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[40px_40px] mask-[radial-gradient(ellipse_50%_50%_at_50%,#000_70%,transparent_100%)]" />

                        <h3 className="text-xl font-bold mb-2 relative z-10 font-display">ลิงก์ด่วน</h3>
                        <p className="text-white/60 text-sm font-light mb-8 relative z-10">เข้าถึงข้อมูลที่สำคัญได้ทันที</p>

                        <ul className="space-y-3 relative z-10">
                            <li>
                                <Link href="/about" className="flex items-center justify-between p-4 rounded-2xl hover:bg-white/10 transition-colors group">
                                    <div className="flex items-center gap-4">
                                        <span className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-white/20 transition-colors text-lg">🏛️</span>
                                        <div>
                                            <span className="text-sm font-semibold block">เกี่ยวกับสภาวัฒนธรรม</span>
                                            <span className="text-xs text-white/50 font-light">วิสัยทัศน์ พันธกิจ โครงสร้าง</span>
                                        </div>
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                                </Link>
                            </li>
                            <li>
                                <Link href="/districts" className="flex items-center justify-between p-4 rounded-2xl hover:bg-white/10 transition-colors group">
                                    <div className="flex items-center gap-4">
                                        <span className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-white/20 transition-colors text-lg">🗺️</span>
                                        <div>
                                            <span className="text-sm font-semibold block">เครือข่ายอำเภอ</span>
                                            <span className="text-xs text-white/50 font-light">18 อำเภอทั่วจังหวัด</span>
                                        </div>
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                                </Link>
                            </li>
                            <li>
                                <Link href="/heritage" className="flex items-center justify-between p-4 rounded-2xl hover:bg-white/10 transition-colors group">
                                    <div className="flex items-center gap-4">
                                        <span className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-white/20 transition-colors text-lg">📚</span>
                                        <div>
                                            <span className="text-sm font-semibold block">คลังมรดกภูมิปัญญา</span>
                                            <span className="text-xs text-white/50 font-light">บทความ แหล่งเรียนรู้ ปราชญ์</span>
                                        </div>
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                                </Link>
                            </li>
                            <li>
                                <Link href="/activities" className="flex items-center justify-between p-4 rounded-2xl hover:bg-white/10 transition-colors group">
                                    <div className="flex items-center gap-4">
                                        <span className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-white/20 transition-colors text-lg">🎉</span>
                                        <div>
                                            <span className="text-sm font-semibold block">กิจกรรมทั้งหมด</span>
                                            <span className="text-xs text-white/50 font-light">ประเพณี เทศกาล งานวัฒนธรรม</span>
                                        </div>
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Map Section — Full Width */}
            <section className="py-20 px-4 md:px-8 bg-white border-t border-base-200 relative overflow-hidden accent-panel">
                <div className="absolute inset-0 opacity-[0.02] mask-kanok bg-primary pointer-events-none" />
                <div className="container mx-auto max-w-6xl relative z-10">
                    <div className="text-center mb-10 reveal-soft">
                        <span className="text-accent font-semibold tracking-widest text-sm uppercase mb-3 block">Location</span>
                        <h2 className="text-3xl font-bold text-primary font-display">แผนที่ตั้งสำนักงาน</h2>
                        <p className="text-base-content/60 font-light mt-3 max-w-lg mx-auto">ศาลากลางจังหวัดเชียงราย ชั้น 3 ถนนแม่ฟ้าหลวง ตำบลริมกก</p>
                    </div>

                    <div className="rounded-3xl border border-secondary/20 shadow-[0_8px_30px_rgb(212,175,55,0.05)] overflow-hidden aspect-video relative reveal-soft stagger-1">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3756.8!2d99.8325!3d19.9105!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30d70bf1e35a6c4d%3A0x1029bbc5945be1f0!2z4Lio4Liy4Lil4Liy4LiB4Lil4Liy4LiH4LiI4Lix4LiH4Lir4Lin4Lix4LiU4LmA4LiK4Li14Lii4LiH4Lij4Liy4Lii!5e0!3m2!1sth!2sth!4v1700000000000!5m2!1sth!2sth"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="absolute inset-0 w-full h-full"
                            title="แผนที่สำนักงานสภาวัฒนธรรมจังหวัดเชียงราย"
                        />
                    </div>

                    <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a
                            href="https://maps.google.com/?q=ศาลากลางจังหวัดเชียงราย"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white font-medium text-sm shadow-md shadow-primary/20 hover:shadow-lg hover:bg-primary-dark transition-all group"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                            เปิดใน Google Maps
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"><path d="M7 7h10v10" /><path d="M7 17 17 7" /></svg>
                        </a>
                        <a
                            href="https://maps.google.com/maps/dir//ศาลากลางจังหวัดเชียงราย"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-primary font-medium text-sm border border-base-200 shadow-sm hover:border-secondary hover:shadow-md transition-all group"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11" /></svg>
                            นำทาง
                        </a>
                    </div>
                </div>
            </section>
        </div>
    )
}
