import Link from 'next/link'

export const metadata = {
    title: 'ข้อกำหนดการใช้งาน',
    description: 'ข้อกำหนดและเงื่อนไขการใช้งานเว็บไซต์สภาวัฒนธรรมจังหวัดเชียงราย',
}

export default function TermsPage() {
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
                        ข้อตกลงและเงื่อนไข
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-primary tracking-tight font-display">
                        ข้อกำหนดการใช้งาน
                    </h1>
                    <p className="text-lg md:text-xl text-base-content/70 max-w-2xl mx-auto font-light leading-relaxed">
                        ข้อตกลงในการใช้บริการข้อมูลและสิทธิ์ในทรัพย์สินทางปัญญาทางวัฒนธรรม
                    </p>
                </div>
            </section>

            {/* Breadcrumbs */}
            <div className="container mx-auto max-w-7xl px-4 py-6 relative z-20">
                <div className="breadcrumbs text-sm text-base-content/60 font-light">
                    <ul>
                        <li><Link href="/" className="hover:text-primary transition-colors">หน้าแรก</Link></li>
                        <li className="text-primary font-medium">ข้อกำหนดการใช้งาน</li>
                    </ul>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="container mx-auto max-w-4xl px-4 py-12 pb-24 relative z-20">
                <div className="bg-white rounded-3xl border border-base-200 shadow-xs p-8 md:p-12 lg:p-16">
                    <div className="prose prose-slate max-w-none">
                        
                        <p className="text-base-content/80 text-base md:text-lg font-light leading-relaxed mb-8">
                            การเข้าชมหรือใช้งานบริการข้อมูลต่างๆ บนเว็บไซต์สภาวัฒนธรรมจังหวัดเชียงราย ถือว่าท่านได้ตกลง ยอมรับ และปฏิบัติตามข้อกำหนดและเงื่อนไขที่ระบุไว้ดังต่อไปนี้ หากท่านไม่ประสงค์ที่จะยอมรับข้อตกลงนี้ โปรดยุติการเข้าชมและใช้งานเว็บไซต์นี้โดยทันที
                        </p>

                        <div className="w-full h-[1px] bg-slate-100 my-8" />

                        {/* Section 1 */}
                        <div className="mb-10">
                            <h2 className="text-xl md:text-2xl font-bold text-primary mb-4 font-display flex items-center gap-3">
                                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm font-bold">1</span>
                                การยอมรับข้อกำหนดการใช้งาน
                            </h2>
                            <p className="text-base-content/70 font-light leading-relaxed pl-11">
                                สภาวัฒนธรรมจังหวัดเชียงราย ขอสงวนสิทธิ์ในการแก้ไข ปรับปรุง หรือเพิ่มเติมข้อกำหนดและเงื่อนไขการใช้งานเหล่านี้ได้ตลอดเวลาตามความเหมาะสม โดยไม่ต้องแจ้งให้ท่านทราบล่วงหน้า การเข้าใช้งานเว็บไซต์อย่างต่อเนื่องหลังจากการแก้ไขข้อกำหนดดังกล่าวจะถือว่าท่านได้ยอมรับการเปลี่ยนแปลงเหล่านั้นโดยปริยาย
                            </p>
                        </div>

                        {/* Section 2 */}
                        <div className="mb-10">
                            <h2 className="text-xl md:text-2xl font-bold text-primary mb-4 font-display flex items-center gap-3">
                                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm font-bold">2</span>
                                ทรัพย์สินทางปัญญาและลิขสิทธิ์ทางวัฒนธรรม
                            </h2>
                            <p className="text-base-content/70 font-light leading-relaxed pl-11 mb-4">
                                เนื้อหา ข้อมูล รูปภาพ สื่อประสม และเอกสารประวัติศาสตร์ทั้งหมดที่เผยแพร่บนเว็บไซต์นี้ ได้รับการคุ้มครองตามกฎหมายทรัพย์สินทางปัญญาของไทย:
                            </p>
                            <ul className="list-disc pl-16 space-y-2 text-base-content/70 font-light leading-relaxed">
                                <li><strong>ข้อมูลศิลปวัฒนธรรมและคลังความรู้</strong>: ข้อความ บทความการวิจัย ข้อมูลประเพณี และระบบสภาวัฒนธรรมอำเภอ เป็นทรัพย์สินทางวิชาการและลิขสิทธิ์ร่วมของสภาวัฒนธรรมจังหวัดเชียงราย หรือได้รับสิทธิ์ใช้งานอย่างถูกต้องตามกฎหมายจากเจ้าของลิขสิทธิ์หรือปราชญ์ชาวบ้านผู้ให้ข้อมูล</li>
                                <li><strong>รูปภาพและสื่อทางศิลปะ</strong>: คลังภาพถ่ายศิลปกรรมล้านนา วิถีชีวิตชาติพันธุ์ และรูปภาพผลงานศิลปินเชียงรายที่แสดงในคลังความรู้ **ห้ามนำไปคัดลอก ดัดแปลง แจกจ่าย หรือใช้งานในเชิงพาณิชย์โดยไม่ได้รับความยินยอมเป็นลายลักษณ์อักษร** จากสภาวัฒนธรรมจังหวัดเชียงราย หรือเจ้าของภาพอย่างเป็นทางการ</li>
                                <li><strong>การอ้างอิงเพื่อสาธารณประโยชน์ (Fair Use)</strong>: ท่านสามารถทำซ้ำหรือนำข้อมูลบทความไปใช้ประกอบการศึกษา โครงงานของสถานศึกษา หรือการเผยแพร่ความรู้ที่ไม่แสวงหากำไรได้ โดยต้องแสดงการอ้างอิงแหล่งที่มา (Credit) ถึงเว็บไซต์สภาวัฒนธรรมจังหวัดเชียงรายอย่างชัดเจนทุกครั้ง</li>
                            </ul>
                        </div>

                        {/* Section 3 */}
                        <div className="mb-10">
                            <h2 className="text-xl md:text-2xl font-bold text-primary mb-4 font-display flex items-center gap-3">
                                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm font-bold">3</span>
                                ขอบเขตการใช้งานเว็บไซต์ที่ยอมรับได้
                            </h2>
                            <p className="text-base-content/70 font-light leading-relaxed pl-11 mb-3">
                                ในการใช้งานเว็บไซต์นี้ ผู้ใช้งานยินยอมที่จะไม่กระทำการใดๆ ที่อาจก่อให้เกิดความเสียหายต่อระบบและภาพลักษณ์ของหน่วยงาน ดังต่อไปนี้:
                            </p>
                            <ul className="list-disc pl-16 space-y-2 text-base-content/70 font-light leading-relaxed">
                                <li>ห้ามใช้เว็บไซต์เพื่อเผยแพร่ข้อมูลที่ผิดกฎหมาย ละเมิดสิทธิผู้อื่น หรือขัดต่อศีลธรรมอันดีของประชาชน</li>
                                <li>ห้ามพยายามเจาะระบบ (Hacking), แพร่กระจายไวรัส, มัลแวร์ หรือโค้ดที่เป็นอันตรายเข้าสู่ระบบฐานข้อมูลและเซิร์ฟเวอร์ของเว็บไซต์</li>
                                <li>ห้ามใช้โปรแกรมอัตโนมัติ (เช่น Web scrapers, Bots) ในการดึงข้อมูลคลังวัฒนธรรมในลักษณะที่ส่งผลกระทบต่อความเร็วและเสถียรภาพการทำงานของระบบ</li>
                                <li>ห้ามใช้ข้อมูลชื่อ ภาพถ่าย หรือเบอร์โทรศัพท์ติดต่อของคณะกรรมการจังหวัด/อำเภอ และปราชญ์ชาวบ้าน ไปใช้แอบอ้างสิทธิ์เพื่อผลประโยชน์ส่วนตน</li>
                            </ul>
                        </div>

                        {/* Section 4 */}
                        <div className="mb-10">
                            <h2 className="text-xl md:text-2xl font-bold text-primary mb-4 font-display flex items-center gap-3">
                                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm font-bold">4</span>
                                ข้อจำกัดความรับผิดชอบ (Limitation of Liability)
                            </h2>
                            <p className="text-base-content/70 font-light leading-relaxed pl-11 mb-3">
                                ข้อมูลประวัติศาสตร์ ประเพณี และศิลปวัฒนธรรมล้านนาที่ปรากฏบนเว็บไซต์นี้ได้รับการเก็บรวบรวมเพื่อการเรียนรู้และสร้างความตระหนักรู้ต่อสาธารณะ:
                            </p>
                            <ul className="list-disc pl-16 space-y-2 text-base-content/70 font-light leading-relaxed">
                                <li><strong>ทัศนะที่หลากหลาย</strong>: ข้อมูลและบทความบางส่วนมาจากทัศนะ คำบอกเล่า หรือบันทึกดั้งเดิมของแต่ละท้องถิ่น ซึ่งอาจมีความแตกต่างหลากหลายกันไปตามภูมิศาสตร์และชาติพันธุ์ สภาวัฒนธรรมจังหวัดเชียงรายนำเสนอเพื่อประโยชน์ทางการอนุรักษ์วิถีชีวิต และสภาวัฒนธรรมฯ จะไม่รับผิดชอบต่อการนำข้อมูลไปตีความที่ก่อให้เกิดข้อพิพาทเชิงวัฒนธรรม</li>
                                <li><strong>ความต่อเนื่องของระบบ</strong>: สภาวัฒนธรรมฯ มุ่งมั่นพัฒนาให้ระบบทำงานได้เสถียรที่สุด แต่ไม่สามารถรับผิดชอบต่อความเสียหายใดๆ จากระบบที่หยุดทำงานชั่วคราวอันเกิดจากผู้ให้บริการเครือข่าย ปัญหาทางเทคนิค หรือเหตุสุดวิสัยนอกเหนือการควบคุม</li>
                            </ul>
                        </div>

                        {/* Section 5 */}
                        <div className="mb-10">
                            <h2 className="text-xl md:text-2xl font-bold text-primary mb-4 font-display flex items-center gap-3">
                                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm font-bold">5</span>
                                การเชื่อมโยงไปยังเว็บไซต์ภายนอก
                            </h2>
                            <p className="text-base-content/70 font-light leading-relaxed pl-11">
                                เว็บไซต์นี้อาจมีการจัดทำลิงก์เพื่อเชื่อมโยงไปยังแหล่งข้อมูลภายนอก (เช่น เว็บไซต์กระทรวงวัฒนธรรม สำนักงานวัฒนธรรมจังหวัด หรือหน่วยงานรัฐอื่นๆ) เพื่อประโยชน์ในการค้นคว้าข้อมูลเพิ่มเติม สภาวัฒนธรรมฯ ไม่มีส่วนเกี่ยวข้องในการควบคุมและไม่ขอรับผิดชอบต่อนโยบายความปลอดภัย ข้อมูล หรือความเสียหายใดๆ ที่เกิดขึ้นจากการเข้าชมเว็บไซต์ภายนอกเหล่านั้น
                            </p>
                        </div>

                        {/* Section 6 */}
                        <div className="mb-10">
                            <h2 className="text-xl md:text-2xl font-bold text-primary mb-4 font-display flex items-center gap-3">
                                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm font-bold">6</span>
                                กฎหมายที่บังคับใช้และการระงับข้อพิพาท
                            </h2>
                            <p className="text-base-content/70 font-light leading-relaxed pl-11">
                                ข้อกำหนดและเงื่อนไขการใช้งานเว็บไซต์นี้ ให้อยู่ภายใต้บังคับและการตีความตามกฎหมายแห่งราชอาณาจักรไทย และหากมีข้อพิพาทใดๆ เกิดขึ้นที่เกี่ยวข้องกับการใช้งานระบบและข้อมูล ให้ข้อพิพาทดังกล่าวอยู่ภายใต้เขตอำนาจการพิจารณาคดีของศาลในจังหวัดเชียงรายเท่านั้น
                            </p>
                        </div>

                        <div className="w-full h-[1px] bg-slate-100 my-8" />

                        {/* Note Card */}
                        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 md:p-8 text-center text-sm font-light text-base-content/60">
                            <p className="mb-2">ประกาศและเริ่มบังคับใช้ตั้งแต่วันที่ 1 มกราคม พ.ศ. 2569</p>
                            <p>สภาวัฒนธรรมจังหวัดเชียงราย. สงวนลิขสิทธิ์ตามกฎหมาย.</p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
