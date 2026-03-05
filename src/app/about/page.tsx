import Link from 'next/link'

export default function AboutPage() {
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
                        ข้อมูลองค์กร
                    </div>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-primary tracking-tight animate-fade-in-up delay-100 font-display">
                        เกี่ยวกับเรา
                    </h1>
                    <p className="text-lg md:text-xl text-base-content/70 max-w-2xl mx-auto font-light leading-relaxed animate-fade-in-up delay-200">
                        ทำความรู้จักสภาวัฒนธรรมจังหวัดเชียงราย องค์กรแกนนำในการขับเคลื่อน อนุรักษ์ และสืบสานมรดกภูมิปัญญาล้านนา
                    </p>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 to-transparent z-10" />
            </section>

            <div className="container mx-auto max-w-5xl px-4 py-20 relative z-20">
                {/* Vision & Mission */}
                <section className="mb-24 animate-fade-in-up delay-300">
                    <div className="text-center mb-16">
                        <span className="text-secondary font-semibold tracking-widest text-sm uppercase mb-3 block">Vision & Mission</span>
                        <h2 className="section-header !mb-0 text-primary font-display">วิสัยทัศน์และพันธกิจ</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                        {/* Vision Card */}
                        <div className="group relative bg-white rounded-3xl p-10 border border-base-200 shadow-[0_8px_30px_rgb(212,175,55,0.05)] hover:shadow-xl hover:border-secondary/50 transition-all duration-500">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-secondary/10 to-transparent rounded-tr-3xl rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative z-10">
                                <div className="w-20 h-20 mb-8 rounded-2xl bg-slate-50 border border-base-100 flex items-center justify-center text-primary group-hover:bg-white group-hover:border-secondary/20 group-hover:text-secondary-dark group-hover:scale-110 transition-all duration-500 shadow-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>
                                </div>
                                <h3 className="text-3xl font-bold mb-6 text-primary tracking-tight font-display group-hover:text-primary-dark transition-colors">วิสัยทัศน์</h3>
                                <p className="text-base-content/70 leading-relaxed font-light text-lg">
                                    "เป็นองค์กรหลักในการขับเคลื่อนวัฒนธรรมท้องถิ่น ส่งเสริมและอนุรักษ์มรดกภูมิปัญญาล้านนา ให้คงอยู่อย่างยั่งยืนและสร้างคุณค่าสู่ชุมชน"
                                </p>
                            </div>
                        </div>

                        {/* Mission Card */}
                        <div className="group relative bg-white rounded-3xl p-10 border border-base-200 shadow-[0_8px_30px_rgb(212,175,55,0.05)] hover:shadow-xl hover:border-secondary/50 transition-all duration-500">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-secondary/10 to-transparent rounded-tr-3xl rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative z-10">
                                <div className="w-20 h-20 mb-8 rounded-2xl bg-slate-50 border border-base-100 flex items-center justify-center text-primary group-hover:bg-white group-hover:border-secondary/20 group-hover:text-secondary-dark group-hover:scale-110 transition-all duration-500 shadow-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
                                </div>
                                <h3 className="text-3xl font-bold mb-6 text-primary tracking-tight font-display group-hover:text-primary-dark transition-colors">พันธกิจ</h3>
                                <ul className="text-base-content/70 space-y-4 font-light text-lg">
                                    <li className="flex items-start gap-3">
                                        <div className="mt-2 w-2 h-2 rounded-full bg-secondary flex-shrink-0" />
                                        <span>ส่งเสริมและอนุรักษ์วัฒนธรรมท้องถิ่นอันดีงาม</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="mt-2 w-2 h-2 rounded-full bg-secondary flex-shrink-0" />
                                        <span>สนับสนุนกิจกรรมทางวัฒนธรรมในระดับชุมชนจนถึงระดับจังหวัด</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="mt-2 w-2 h-2 rounded-full bg-secondary flex-shrink-0" />
                                        <span>สร้างเครือข่ายความร่วมมือด้านวัฒนธรรมครอบคลุมทั้ง 18 อำเภอ</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="mt-2 w-2 h-2 rounded-full bg-secondary flex-shrink-0" />
                                        <span>รวบรวมและเผยแพร่องค์ความรู้เกี่ยวกับมรดกภูมิปัญญาล้านนา</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* History */}
                <section className="mb-24 relative">
                    <div className="bg-white rounded-3xl p-8 md:p-12 lg:p-16 shadow-[0_8px_30px_rgb(212,175,55,0.05)] border border-base-200">
                        <div className="text-center mb-12 relative z-10">
                            <span className="text-secondary font-semibold tracking-widest text-sm uppercase mb-3 block">Our History</span>
                            <h2 className="section-header !mb-0 text-primary font-display">ประวัติความเป็นมา</h2>
                        </div>

                        <div className="prose prose-lg max-w-3xl mx-auto prose-p:text-base-content/70 prose-p:font-light prose-p:leading-relaxed prose-headings:text-primary relative z-10">
                            <p className="first-letter:text-6xl first-letter:font-bold first-letter:text-primary first-letter:mr-2 first-letter:float-left first-letter:leading-none first-letter:font-display">
                                สภาวัฒนธรรมจังหวัดเชียงราย เป็นองค์กรที่จัดตั้งขึ้นตามพระราชบัญญัติวัฒนธรรมแห่งชาติ พ.ศ. 2553 เพื่อทำหน้าที่เป็นศูนย์กลางในการส่งเสริม อนุรักษ์ และเผยแพร่วัฒนธรรม ของจังหวัดเชียงราย
                            </p>
                            <p>
                                จังหวัดเชียงรายมีความหลากหลายทางวัฒนธรรมอย่างมาก เป็นดินแดนที่มีประวัติศาสตร์ยาวนาน ตั้งแต่สมัยพญามังรายมหาราช ปฐมกษัตริย์แห่งอาณาจักรล้านนา ประกอบกับความหลากหลาย ของกลุ่มชาติพันธุ์ที่อาศัยอยู่ในพื้นที่ ทำให้มีมรดกทางวัฒนธรรม ทั้งด้านภาษา ศิลปะ ประเพณี และวิถีชีวิต ที่เป็นเอกลักษณ์และควรค่าแก่การสืบสาน
                            </p>
                        </div>
                    </div>
                    <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
                </section>

                {/* Board Link CTA */}
                <section className="text-center pb-12 relative">
                    <div className="overflow-hidden rounded-3xl relative">
                        <div className="absolute inset-0 bg-primary opacity-10 mask-kanok" />
                        <div className="bg-gradient-to-br from-slate-50/80 to-white/90 backdrop-blur-sm p-12 border border-secondary/20 relative z-10 shadow-sm">
                            <h2 className="text-3xl font-bold text-primary mb-4 font-display">ทำเนียบคณะกรรมการ</h2>
                            <p className="text-lg text-base-content/70 font-light mb-8 max-w-xl mx-auto">
                                พบกับคณะผู้บริหารและกรรมการสภาวัฒนธรรมจังหวัดเชียงราย ที่ร่วมเป็นพลังขับเคลื่อนงานด้านศิลปวัฒนธรรมของจังหวัด
                            </p>
                            <Link href="/about/board" className="btn-lanna inline-flex items-center gap-2 text-lg px-8 py-4">
                                ดูรายชื่อคณะกรรมการจังหวัด
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}
