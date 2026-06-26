import Link from 'next/link'

export const metadata = {
    title: 'นโยบายความเป็นส่วนตัว',
    description: 'นโยบายความเป็นส่วนตัวและการคุ้มครองข้อมูลส่วนบุคคล (PDPA) ของสภาวัฒนธรรมจังหวัดเชียงราย',
}

export default function PrivacyPage() {
    const contactAddress = 'สำนักงานวัฒนธรรมจังหวัดเชียงราย เลขที่ 570 หมู่ 2 ถ.เลี่ยงเมืองเชียงรายตะวันตก ต.บ้านดู่ อ.เมืองเชียงราย จ.เชียงราย 57100'

    return (
        <div className="bg-slate-50 min-h-screen font-sans">
            {/* Header Banner */}
            <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28 bg-slate-50 accent-panel border-b border-base-200">
                <div className="absolute inset-0 z-0 bg-lanna-pattern opacity-10" />
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 right-[-10%] w-[60%] h-[70%] rounded-full bg-linear-to-bl from-secondary/15 to-transparent blur-[120px]" />
                    <div className="absolute bottom-[-20%] left-[-10%] w-[70%] h-[60%] rounded-full bg-linear-to-tr from-accent/10 to-transparent blur-[130px]" />
                </div>

                <div className="container mx-auto max-w-7xl px-4 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/80 backdrop-blur-md border border-secondary/30 text-sm font-medium text-primary shadow-xs mb-6">
                        <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                        คุ้มครองข้อมูลตามกฎหมาย PDPA
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-primary tracking-tight font-display">
                        นโยบายความเป็นส่วนตัว
                    </h1>
                    <p className="text-lg md:text-xl text-base-content/70 max-w-2xl mx-auto font-light leading-relaxed">
                        การคุ้มครองข้อมูลส่วนบุคคลของเครือข่ายวัฒนธรรมและผู้ใช้งานสภาวัฒนธรรมจังหวัดเชียงราย
                    </p>
                </div>
            </section>

            {/* Breadcrumbs */}
            <div className="container mx-auto max-w-7xl px-4 py-6 relative z-20">
                <div className="breadcrumbs text-sm text-base-content/60 font-light">
                    <ul>
                        <li><Link href="/" className="hover:text-primary transition-colors">หน้าแรก</Link></li>
                        <li className="text-primary font-medium">นโยบายความเป็นส่วนตัว</li>
                    </ul>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="container mx-auto max-w-4xl px-4 py-12 pb-24 relative z-20">
                <div className="bg-white rounded-3xl border border-base-200 shadow-xs p-8 md:p-12 lg:p-16">
                    <div className="prose prose-slate max-w-none">
                        
                        <p className="text-base-content/80 text-base md:text-lg font-light leading-relaxed mb-8">
                            สภาวัฒนธรรมจังหวัดเชียงราย ตระหนักถึงความสำคัญของการคุ้มครองข้อมูลส่วนบุคคลของผู้ใช้งานเว็บไซต์และเครือข่าย นโยบายความเป็นส่วนตัวนี้จัดทำขึ้นเพื่อชี้แจงรายละเอียดเกี่ยวกับการเก็บรวบรวม การใช้งาน และการเปิดเผยข้อมูลส่วนบุคคลของท่าน ให้สอดคล้องกับ **พระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 (PDPA)** ของประเทศไทย
                        </p>

                        <div className="w-full h-[1px] bg-slate-100 my-8" />

                        {/* Section 1 */}
                        <div className="mb-10">
                            <h2 className="text-xl md:text-2xl font-bold text-primary mb-4 font-display flex items-center gap-3">
                                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm font-bold">1</span>
                                ข้อมูลส่วนบุคคลที่เราเก็บรวบรวม
                            </h2>
                            <p className="text-base-content/70 font-light leading-relaxed pl-11 mb-4">
                                เมื่อท่านเข้าใช้งานเว็บไซต์สภาวัฒนธรรมจังหวัดเชียงราย เราอาจเก็บรวบรวมข้อมูลส่วนบุคคลของท่านตามความจำเป็นดังต่อไปนี้:
                            </p>
                            <ul className="list-disc pl-16 space-y-2 text-base-content/70 font-light leading-relaxed">
                                <li><strong>ข้อมูลการใช้งานทางเทคนิค (Usage Data)</strong>: ได้แก่ หมายเลขไอพี (IP Address), ประเภทและเวอร์ชันของเว็บเบราว์เซอร์ (Browser Type), ระบบปฏิบัติการของท่าน (OS), หน้าเว็บย่อยที่ท่านเยี่ยมชม, วันและเวลาที่ท่านเข้าชม รวมถึงคุกกี้ (Cookies) เพื่อประโยชน์ในการปรับปรุงการแสดงผลของหน้าเว็บ</li>
                                <li><strong>ข้อมูลการติดต่อประสานงาน (Contact Data)</strong>: ข้อมูลที่ท่านเป็นผู้ให้โดยสมัครใจเพื่อการติดต่อสอบถามหรือรับเรื่องผ่านทางช่องทางติดต่อหรือแบบฟอร์มบนเว็บไซต์ เช่น ชื่อ-นามสกุล, เบอร์โทรศัพท์ และอีเมล</li>
                            </ul>
                        </div>

                        {/* Section 2 */}
                        <div className="mb-10">
                            <h2 className="text-xl md:text-2xl font-bold text-primary mb-4 font-display flex items-center gap-3">
                                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm font-bold">2</span>
                                วัตถุประสงค์ในการประมวลผลข้อมูล
                            </h2>
                            <p className="text-base-content/70 font-light leading-relaxed pl-11 mb-4">
                                เราประมวลผลข้อมูลส่วนบุคคลภายใต้วัตถุประสงค์เพื่อการสาธารณประโยชน์ทางด้านการศึกษาและอนุรักษ์วัฒนธรรม ดังนี้:
                            </p>
                            <ul className="list-disc pl-16 space-y-2 text-base-content/70 font-light leading-relaxed">
                                <li>เพื่อพัฒนาระบบและปรับปรุงเว็บไซต์ให้มีประสิทธิภาพสูงสุดตามความต้องการของผู้ใช้งาน</li>
                                <li>เพื่อวิเคราะห์ทางสถิติและรวบรวมความสนใจของผู้เข้าชมเกี่ยวกับมรดกภูมิปัญญา ประเพณี และประวัติศาสตร์อำเภอต่างๆ</li>
                                <li>เพื่อใช้ในการติดต่อประสานงาน ตอบข้อซักถาม ชี้แจงข่าวสาร หรือประสานงานกิจกรรมร่วมกับสภาวัฒนธรรมอำเภอทั้ง 18 อำเภอ</li>
                            </ul>
                        </div>

                        {/* Section 3 */}
                        <div className="mb-10">
                            <h2 className="text-xl md:text-2xl font-bold text-primary mb-4 font-display flex items-center gap-3">
                                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm font-bold">3</span>
                                การเปิดเผยข้อมูลส่วนบุคคลแก่บุคคลภายนอก
                            </h2>
                            <p className="text-base-content/70 font-light leading-relaxed pl-11 mb-3">
                                สภาวัฒนธรรมจังหวัดเชียงราย **จะไม่มีการขาย แลกเปลี่ยน หรือเผยแพร่ข้อมูลส่วนบุคคลของท่าน** แก่บุคคลภายนอกโดยเด็ดขาด เว้นแต่ในกรณีดังต่อไปนี้:
                            </p>
                            <ul className="list-disc pl-16 space-y-2 text-base-content/70 font-light leading-relaxed">
                                <li>ได้รับความยินยอมเป็นลายลักษณ์อักษรหรือความยินยอมทางอิเล็กทรอนิกส์จากเจ้าของข้อมูลโดยตรง</li>
                                <li>เป็นการปฏิบัติตามคำสั่งของกฎหมาย หมายศาล หรือตามการร้องขอของพนักงานสอบสวนหรือหน่วยงานรัฐที่มีอำนาจตามกฎหมาย</li>
                            </ul>
                        </div>

                        {/* Section 4 */}
                        <div className="mb-10">
                            <h2 className="text-xl md:text-2xl font-bold text-primary mb-4 font-display flex items-center gap-3">
                                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm font-bold">4</span>
                                ระยะเวลาจัดเก็บรักษาข้อมูลส่วนบุคคล
                            </h2>
                            <p className="text-base-content/70 font-light leading-relaxed pl-11">
                                สภาวัฒนธรรมฯ จะจัดเก็บข้อมูลส่วนบุคคลของท่านเป็นระยะเวลาเท่าที่จำเป็นเพื่อตอบสนองต่อวัตถุประสงค์ในการเก็บรวบรวมเท่านั้น โดยข้อมูลการติดต่อประสานงานจะถูกจัดเก็บไว้เป็นระยะเวลาไม่เกิน **2 ปี** นับตั้งแต่วันที่ท่านส่งข้อมูล และข้อมูลสถิติการใช้งานจะถูกบันทึกไว้ในระบบวิเคราะห์เว็บไซต์เป็นเวลาไม่เกิน **1 ปี** หลังจากนั้นระบบจะดำเนินการลบหรือทำให้เป็นข้อมูลที่ไม่สามารถระบุตัวบุคคลได้ตามกระบวนการที่เหมาะสม
                            </p>
                        </div>

                        {/* Section 5 */}
                        <div className="mb-10">
                            <h2 className="text-xl md:text-2xl font-bold text-primary mb-4 font-display flex items-center gap-3">
                                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm font-bold">5</span>
                                สิทธิของเจ้าของข้อมูลส่วนบุคคลตามกฎหมาย PDPA
                            </h2>
                            <p className="text-base-content/70 font-light leading-relaxed pl-11 mb-4">
                                ภายใต้กฎหมาย พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 ท่านมีสิทธิในการควบคุมข้อมูลส่วนบุคคลของท่านอย่างเต็มที่ ดังนี้:
                            </p>
                            <ul className="list-disc pl-16 space-y-2 text-base-content/70 font-light leading-relaxed">
                                <li><strong>สิทธิขอเข้าถึงและรับสำเนา</strong>: ขอรับสำเนาข้อมูลส่วนบุคคลของท่านที่อยู่ในความดูแลรับผิดชอบของเรา</li>
                                <li><strong>สิทธิขอแก้ไขข้อมูล</strong>: ขอให้สภาวัฒนธรรมฯ ดำเนินการแก้ไขข้อผิดพลาดหรือปรับปรุงข้อมูลให้ถูกต้องเป็นปัจจุบัน</li>
                                <li><strong>สิทธิขอให้ลบหรือทำลาย</strong>: ขอให้สภาวัฒนธรรมฯ ดำเนินการลบ ทำลาย หรือทำให้ข้อมูลเป็นข้อมูลที่ไม่สามารถระบุตัวบุคคลได้ในกรณีที่หมดความจำเป็นหรือถอนความยินยอม</li>
                                <li><strong>สิทธิขอถอนความยินยอม</strong>: สามารถถอนความยินยอมในการเก็บรวบรวมข้อมูลส่วนบุคคลที่ท่านเคยให้ไว้กับเราเมื่อใดก็ได้</li>
                                <li><strong>สิทธิขอระงับการใช้ข้อมูล</strong>: ขอให้ระงับการใช้ข้อมูลส่วนบุคคลชั่วคราว</li>
                                <li><strong>สิทธิคัดค้านการประมวลผล</strong>: คัดค้านการประมวลผลข้อมูลส่วนบุคคลของท่านได้ตามข้อกำหนดทางกฎหมาย</li>
                            </ul>
                        </div>

                        {/* Section 6 */}
                        <div className="mb-10">
                            <h2 className="text-xl md:text-2xl font-bold text-primary mb-4 font-display flex items-center gap-3">
                                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm font-bold">6</span>
                                มาตรการรักษาความปลอดภัยของข้อมูล
                            </h2>
                            <p className="text-base-content/70 font-light leading-relaxed pl-11">
                                เพื่อป้องกันการสูญหาย การเข้าถึง การใช้งาน การดัดแปลง หรือการเปิดเผยข้อมูลส่วนบุคคลโดยมิชอบ สภาวัฒนธรรมฯ ได้จัดตั้งมาตรการการรักษาความมั่นคงปลอดภัยของข้อมูลที่เหมาะสม เช่น การเข้ารหัสข้อมูล (Encryption) ของระบบคอมพิวเตอร์และการเชื่อมต่อเว็บไซต์ผ่านโปรโตคอลความปลอดภัย SSL/HTTPS รวมทั้งมีการจำกัดสิทธิ์การเข้าถึงข้อมูลระบบการทำงาน (CMS) เฉพาะบุคลากรที่จำเป็นเท่านั้น
                            </p>
                        </div>

                        {/* Section 7 */}
                        <div className="mb-10">
                            <h2 className="text-xl md:text-2xl font-bold text-primary mb-4 font-display flex items-center gap-3">
                                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm font-bold">7</span>
                                นโยบายการใช้คุกกี้ (Cookies Policy)
                            </h2>
                            <p className="text-base-content/70 font-light leading-relaxed pl-11">
                                เว็บไซต์นี้ใช้คุกกี้เพื่อจดจำความพึงพอใจและสถิติการใช้งานของท่าน ซึ่งช่วยให้ระบบสามารถจดจำรูปแบบการใช้งานและส่งมอบบริการที่รวดเร็วและปลอดภัยยิ่งขึ้น ท่านสามารถเลือกปรับแต่งหรือปฏิเสธคุกกี้ได้ในการตั้งค่าเว็บเบราว์เซอร์ของท่าน แต่อาจส่งผลต่อการทำงานที่สมบูรณ์ของบางหน้าเว็บบนเว็บไซต์
                            </p>
                        </div>

                        <div className="w-full h-[1px] bg-slate-100 my-8" />

                        {/* Contact Card */}
                        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 md:p-8 mt-8">
                            <h3 className="font-bold text-lg text-primary mb-4 font-display flex items-center gap-2">
                                📬 ช่องทางการติดต่อสำหรับการสอบถามและใช้สิทธิ์ตามกฎหมาย
                            </h3>
                            <p className="text-sm text-base-content/70 font-light leading-relaxed mb-4">
                                หากท่านต้องการข้อมูลเพิ่มเติม หรือมีความประสงค์ที่จะขอใช้สิทธิ์ของเจ้าของข้อมูลส่วนบุคคลเกี่ยวกับข้อมูลของท่าน สามารถติดต่อได้ที่ช่องทางอย่างเป็นทางการของสภาวัฒนธรรมจังหวัดเชียงราย ดังนี้:
                            </p>
                            <div className="grid sm:grid-cols-2 gap-4 text-sm font-light text-base-content/80">
                                <div>
                                    <p className="font-semibold text-primary mb-1">ผู้ควบคุมข้อมูลส่วนบุคคล</p>
                                    <p>{contactAddress}</p>
                                </div>
                                <div className="space-y-2">
                                    <p><strong>เบอร์โทรศัพท์</strong>: <a href="tel:053150169" className="hover:text-primary transition-colors">0-5315-0169</a></p>
                                    <p><strong>อีเมล</strong>: <a href="mailto:culture@chiangrai.go.th" className="hover:text-primary transition-colors">culture@chiangrai.go.th</a></p>
                                    <p><strong>เวลาทำการ</strong>: จันทร์ - ศุกร์: 08:30 - 16:30 น.</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
