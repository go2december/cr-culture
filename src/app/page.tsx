import Link from 'next/link'

export default function Home() {
    return (
        <>
            {/* Hero Section */}
            <section className="hero-lanna min-h-[70vh] flex items-center justify-center text-white relative">
                <div className="hero-content text-center z-10">
                    <div className="max-w-4xl mx-auto px-4">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
                            สภาวัฒนธรรมจังหวัดเชียงราย
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 opacity-90">
                            ส่งเสริมและอนุรักษ์มรดกวัฒนธรรมล้านนา เชื่อมโยงอดีตสู่อนาคต
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="/districts" className="btn btn-secondary btn-lg">
                                เครือข่าย 18 อำเภอ
                            </Link>
                            <Link href="/heritage" className="btn btn-outline btn-lg text-white border-white hover:bg-white hover:text-primary">
                                คลังมรดกภูมิปัญญา
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Decorative Wave */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="currentColor" className="text-base-100" />
                    </svg>
                </div>
            </section>

            {/* Gold Accent Line */}
            <div className="gold-accent" />

            {/* Latest Activities Section */}
            <section className="py-20 px-4 md:px-8">
                <div className="container mx-auto max-w-7xl">
                    <h2 className="section-header">กิจกรรมล่าสุด</h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="card-district">
                                <figure className="aspect-video bg-base-200">
                                    <div className="w-full h-full flex items-center justify-center text-base-content/50">
                                        รูปภาพกิจกรรม
                                    </div>
                                </figure>
                                <div className="card-body">
                                    <span className="badge badge-primary">กิจกรรมระดับจังหวัด</span>
                                    <h3 className="card-title mt-2">กิจกรรมตัวอย่าง {i}</h3>
                                    <p className="text-base-content/70">
                                        รายละเอียดกิจกรรมโดยย่อ...
                                    </p>
                                    <div className="card-actions justify-end mt-4">
                                        <Link href={`/activities/${i}`} className="btn btn-primary btn-sm">
                                            อ่านเพิ่มเติม
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Link href="/activities" className="btn btn-outline btn-primary">
                            ดูกิจกรรมทั้งหมด →
                        </Link>
                    </div>
                </div>
            </section>

            {/* Cultural Heritage Highlights */}
            <section className="py-20 px-4 md:px-8 bg-base-200">
                <div className="container mx-auto max-w-7xl">
                    <h2 className="section-header">มรดกภูมิปัญญาเด่น</h2>

                    <div className="grid md:grid-cols-4 gap-6">
                        {['มรดกภูมิปัญญา', 'ศูนย์เชียงรายศึกษา', 'แหล่งเรียนรู้', 'ปราชญ์ชาวบ้าน'].map((category, i) => (
                            <Link
                                key={i}
                                href={`/heritage?category=${i + 1}`}
                                className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                            >
                                <div className="card-body text-center">
                                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-3xl">
                                        {['🏛️', '📚', '🎓', '👨‍🏫'][i]}
                                    </div>
                                    <h3 className="card-title justify-center text-lg">{category}</h3>
                                    <p className="text-sm text-base-content/60">
                                        สำรวจ {category}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* 18 Districts Quick Access */}
            <section className="py-20 px-4 md:px-8">
                <div className="container mx-auto max-w-7xl">
                    <h2 className="section-header">เครือข่ายสภาวัฒนธรรมอำเภอ</h2>
                    <p className="text-center text-lg text-base-content/70 mb-12 max-w-2xl mx-auto">
                        เชื่อมต่อกับสภาวัฒนธรรมทั้ง 18 อำเภอของจังหวัดเชียงราย
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {[
                            'เมืองเชียงราย', 'เวียงชัย', 'เชียงของ', 'เทิง', 'พาน', 'ป่าแดด',
                            'แม่จัน', 'เชียงแสน', 'แม่สาย', 'แม่สรวย', 'เวียงป่าเป้า', 'พญาเม็งราย',
                            'เวียงแก่น', 'ขุนตาล', 'แม่ฟ้าหลวง', 'แม่ลาว', 'เวียงเชียงรุ้ง', 'ดอยหลวง'
                        ].map((district, i) => (
                            <Link
                                key={i}
                                href={`/districts/${district.toLowerCase().replace(/\s+/g, '-')}`}
                                className="btn btn-ghost h-auto py-4 flex-col gap-2 hover:bg-primary/10 hover:text-primary border border-base-300"
                            >
                                <span className="text-2xl">📍</span>
                                <span className="text-sm font-medium">{district}</span>
                            </Link>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Link href="/districts" className="btn btn-primary">
                            ดูแผนที่เครือข่ายทั้งหมด
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 md:px-8 bg-gradient-to-r from-primary to-primary-dark text-white">
                <div className="container mx-auto max-w-4xl text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        ร่วมเป็นส่วนหนึ่งในการอนุรักษ์วัฒนธรรม
                    </h2>
                    <p className="text-xl opacity-90 mb-8">
                        ติดต่อสภาวัฒนธรรมจังหวัดเชียงรายเพื่อร่วมกิจกรรมและโครงการต่างๆ
                    </p>
                    <Link href="/contact" className="btn btn-secondary btn-lg">
                        ติดต่อเรา
                    </Link>
                </div>
            </section>
        </>
    )
}
