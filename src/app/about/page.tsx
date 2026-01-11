import Link from 'next/link'

export default function AboutPage() {
    return (
        <>
            {/* Hero */}
            <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-20">
                <div className="container mx-auto max-w-7xl px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        เกี่ยวกับเรา
                    </h1>
                    <p className="text-xl opacity-90 max-w-2xl mx-auto">
                        ทำความรู้จักสภาวัฒนธรรมจังหวัดเชียงราย
                    </p>
                </div>
            </section>

            {/* Gold Accent */}
            <div className="gold-accent" />

            <div className="container mx-auto max-w-5xl px-4 py-16">
                {/* Vision & Mission */}
                <section className="mb-16">
                    <h2 className="section-header">วิสัยทัศน์และพันธกิจ</h2>

                    <div className="grid md:grid-cols-2 gap-8 mt-12">
                        <div className="card bg-base-100 shadow-xl">
                            <div className="card-body text-center">
                                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-3xl">
                                    🎯
                                </div>
                                <h3 className="card-title justify-center text-2xl text-primary">วิสัยทัศน์</h3>
                                <p className="text-base-content/80 leading-relaxed">
                                    "เป็นองค์กรหลักในการขับเคลื่อนวัฒนธรรมท้องถิ่น ส่งเสริมและอนุรักษ์มรดกภูมิปัญญาล้านนา
                                    ให้คงอยู่อย่างยั่งยืนและสร้างคุณค่าสู่ชุมชน"
                                </p>
                            </div>
                        </div>

                        <div className="card bg-base-100 shadow-xl">
                            <div className="card-body text-center">
                                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center text-white text-3xl">
                                    🚀
                                </div>
                                <h3 className="card-title justify-center text-2xl text-primary">พันธกิจ</h3>
                                <ul className="text-left text-base-content/80 space-y-2">
                                    <li>• ส่งเสริมและอนุรักษ์วัฒนธรรมท้องถิ่น</li>
                                    <li>• สนับสนุนกิจกรรมทางวัฒนธรรมในชุมชน</li>
                                    <li>• สร้างเครือข่ายวัฒนธรรมทุกอำเภอ</li>
                                    <li>• เผยแพร่องค์ความรู้มรดกภูมิปัญญา</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* History */}
                <section className="mb-16">
                    <h2 className="section-header">ประวัติความเป็นมา</h2>

                    <div className="prose prose-lg max-w-none mt-8">
                        <p>
                            สภาวัฒนธรรมจังหวัดเชียงราย เป็นองค์กรที่จัดตั้งขึ้นตามพระราชบัญญัติวัฒนธรรมแห่งชาติ
                            พ.ศ. 2553 เพื่อทำหน้าที่เป็นศูนย์กลางในการส่งเสริม อนุรักษ์ และเผยแพร่วัฒนธรรม
                            ของจังหวัดเชียงราย
                        </p>
                        <p>
                            จังหวัดเชียงรายมีความหลากหลายทางวัฒนธรรมอย่างมาก เป็นดินแดนที่มีประวัติศาสตร์ยาวนาน
                            ตั้งแต่สมัยพญามังรายมหาราช ปฐมกษัตริย์แห่งอาณาจักรล้านนา ประกอบกับความหลากหลาย
                            ของกลุ่มชาติพันธุ์ที่อาศัยอยู่ในพื้นที่
                        </p>
                    </div>
                </section>

                {/* Board Link */}
                <section className="text-center">
                    <Link href="/about/board" className="btn btn-primary btn-lg">
                        ดูคณะกรรมการจังหวัด →
                    </Link>
                </section>
            </div>
        </>
    )
}
