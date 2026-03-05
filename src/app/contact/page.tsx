export default function ContactPage() {
    return (
        <div className="bg-slate-50 min-h-screen font-sans">
            {/* Elegant Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-slate-50">
                <div className="absolute inset-0 z-0 bg-lanna-pattern">
                    <div className="absolute top-0 right-[-10%] w-[60%] h-[70%] rounded-full bg-gradient-to-bl from-secondary/15 to-transparent blur-[120px]" />
                    <div className="absolute bottom-[-20%] left-[-10%] w-[70%] h-[60%] rounded-full bg-gradient-to-tr from-accent/10 to-transparent blur-[130px]" />
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/80 backdrop-blur-md border border-secondary/30 text-sm font-medium text-primary shadow-sm mb-6 animate-fade-in-up">
                        <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                        ติดต่อเรา
                    </div>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-primary tracking-tight animate-fade-in-up delay-100 font-display">
                        ติดต่อสภาวัฒนธรรม
                    </h1>
                    <p className="text-lg md:text-xl text-base-content/70 max-w-2xl mx-auto font-light leading-relaxed animate-fade-in-up delay-200">
                        สอบถามข้อมูล แจ้งปัญหา หรือเสนอแนะกิจกรรมต่างๆ เรายินดีให้บริการและรับฟังทุกความคิดเห็น
                    </p>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 to-transparent z-10" />
            </section>

            <div className="container mx-auto max-w-6xl px-4 py-16 relative z-20">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
                    {/* Contact Info */}
                    <div className="animate-fade-in-up delay-300">
                        <span className="text-secondary font-semibold tracking-widest text-sm uppercase mb-3 block">Get in Touch</span>
                        <h2 className="text-3xl font-bold text-primary mb-8 font-display">
                            ข้อมูลการติดต่อ
                        </h2>

                        <div className="space-y-6">
                            {/* Address */}
                            <div className="group relative flex items-start gap-5 p-6 bg-white rounded-3xl border border-base-200 shadow-sm hover:border-secondary/30 hover:shadow-md transition-all">
                                <div className="w-14 h-14 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform shadow-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" /><circle cx="12" cy="10" r="3" /></svg>
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-2 text-primary">ที่อยู่</h3>
                                    <p className="text-base-content/70 font-light leading-relaxed">
                                        สำนักงานสภาวัฒนธรรมจังหวัดเชียงราย<br />
                                        ศาลากลางจังหวัดเชียงราย ชั้น 3<br />
                                        ถนนแม่ฟ้าหลวง ตำบลริมกก<br />
                                        อำเภอเมือง จังหวัดเชียงราย 57100
                                    </p>
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="group relative flex items-start gap-5 p-6 bg-white rounded-3xl border border-base-200 shadow-sm hover:border-secondary/30 hover:shadow-md transition-all">
                                <div className="w-14 h-14 bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-2xl flex items-center justify-center text-secondary group-hover:scale-110 transition-transform shadow-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="20" x="5" y="2" rx="2" ry="2" /><path d="M12 18h.01" /></svg>
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-2 text-primary">โทรศัพท์</h3>
                                    <p className="text-base-content/70 font-light leading-relaxed">
                                        053-150-150 ต่อ 123<br />
                                        053-150-151 (แฟกซ์)
                                    </p>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="group relative flex items-start gap-5 p-6 bg-white rounded-3xl border border-base-200 shadow-sm hover:border-secondary/30 hover:shadow-md transition-all">
                                <div className="w-14 h-14 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform shadow-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-2 text-primary">อีเมล</h3>
                                    <p className="text-base-content/70 font-light leading-relaxed">
                                        culture@chiangrai.go.th
                                    </p>
                                </div>
                            </div>

                            {/* Hours */}
                            <div className="group relative flex items-start gap-5 p-6 bg-white rounded-3xl border border-base-200 shadow-sm hover:border-secondary/30 hover:shadow-md transition-all">
                                <div className="w-14 h-14 bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-2xl flex items-center justify-center text-secondary group-hover:scale-110 transition-transform shadow-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-2 text-primary">เวลาทำการ</h3>
                                    <p className="text-base-content/70 font-light leading-relaxed">
                                        วันจันทร์ - วันศุกร์ 08:30 - 16:30 น.<br />
                                        <span className="text-sm opacity-80">(หยุดวันเสาร์-อาทิตย์ และวันหยุดราชการ)</span>
                                    </p>
                                </div>
                            </div>

                            {/* Social Media */}
                            <div className="pt-6">
                                <h3 className="font-bold text-lg mb-4 text-primary">ติดตามเรา</h3>
                                <div className="flex gap-4">
                                    <a href="#" className="w-12 h-12 rounded-full bg-white border border-base-200 flex items-center justify-center text-primary hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="animate-fade-in-up delay-400">
                        <div className="bg-white rounded-3xl p-8 lg:p-10 border border-base-200 shadow-[0_8px_30px_rgb(212,175,55,0.05)] relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-secondary/5 to-transparent rounded-tr-3xl rounded-bl-full" />

                            <h2 className="text-2xl font-bold text-primary mb-8 font-display">
                                ส่งข้อความถึงเรา
                            </h2>

                            <form className="space-y-5 relative z-10">
                                <div>
                                    <label className="text-sm font-medium text-base-content/80 mb-2 block">ชื่อ-นามสกุล <span className="text-error">*</span></label>
                                    <input
                                        type="text"
                                        placeholder="กรุณากรอกชื่อ-นามสกุล"
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-base-200 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-base-content/80 mb-2 block">อีเมล <span className="text-error">*</span></label>
                                    <input
                                        type="email"
                                        placeholder="example@email.com"
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-base-200 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-base-content/80 mb-2 block">เบอร์โทรศัพท์</label>
                                    <input
                                        type="tel"
                                        placeholder="08X-XXX-XXXX"
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-base-200 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-base-content/80 mb-2 block">หัวข้อ <span className="text-error">*</span></label>
                                    <select className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-base-200 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all appearance-none cursor-pointer" defaultValue="">
                                        <option value="" disabled>เลือกหัวข้อ</option>
                                        <option value="1">สอบถามข้อมูลทั่วไป</option>
                                        <option value="2">ร่วมกิจกรรม</option>
                                        <option value="3">แจ้งปัญหาการใช้งานเว็บไซต์</option>
                                        <option value="4">เสนอแนะ/ร้องเรียน</option>
                                        <option value="5">อื่นๆ</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-base-content/80 mb-2 block">ข้อความ <span className="text-error">*</span></label>
                                    <textarea
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-base-200 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all h-32 resize-none"
                                        placeholder="กรุณากรอกข้อความ"
                                        required
                                    ></textarea>
                                </div>

                                <button type="submit" className="btn-lanna w-full py-4 rounded-xl text-lg font-medium shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30">
                                    ส่งข้อความ
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Map */}
                <div className="mt-20 pt-16 border-t border-base-200/50 animate-fade-in-up delay-500">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-primary font-display">
                            แผนที่ตั้ง
                        </h2>
                    </div>
                    <div className="bg-slate-100 rounded-3xl border border-base-200 overflow-hidden aspect-video flex items-center justify-center relative group mask-kanok-container">
                        <div className="absolute inset-0 bg-primary opacity-5 mask-kanok pointer-events-none" />
                        <div className="text-center text-primary/40 relative z-10 group-hover:scale-105 transition-transform duration-500">
                            <span className="text-6xl mb-4 block">🗺️</span>
                            <p className="font-medium">Google Maps Integration</p>
                            <p className="text-sm opacity-70">ศาลากลางจังหวัดเชียงราย</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
