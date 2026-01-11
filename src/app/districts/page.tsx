export default function DistrictsPage() {
    const districts = [
        { name: 'เมืองเชียงราย', slug: 'muang-chiang-rai', description: 'ศูนย์กลางจังหวัดเชียงราย' },
        { name: 'เวียงชัย', slug: 'wiang-chai', description: 'อำเภอเวียงชัย' },
        { name: 'เชียงของ', slug: 'chiang-khong', description: 'ประตูสู่ลาว' },
        { name: 'เทิง', slug: 'thoeng', description: 'ดินแดนแห่งข้าวหอมมะลิ' },
        { name: 'พาน', slug: 'phan', description: 'เมืองสับปะรด' },
        { name: 'ป่าแดด', slug: 'pa-daet', description: 'เมืองแห่งลิ้นจี่' },
        { name: 'แม่จัน', slug: 'mae-chan', description: 'ประตูสู่ดอยตุง' },
        { name: 'เชียงแสน', slug: 'chiang-saen', description: 'นครโบราณริมน้ำโขง' },
        { name: 'แม่สาย', slug: 'mae-sai', description: 'เหนือสุดแดนสยาม' },
        { name: 'แม่สรวย', slug: 'mae-suai', description: 'เมืองน้ำพุร้อน' },
        { name: 'เวียงป่าเป้า', slug: 'wiang-pa-pao', description: 'ดินแดนชาและกาแฟ' },
        { name: 'พญาเม็งราย', slug: 'phaya-mengrai', description: 'รำลึกมหาราช' },
        { name: 'เวียงแก่น', slug: 'wiang-kaen', description: 'ชายแดนเงียบสงบ' },
        { name: 'ขุนตาล', slug: 'khun-tan', description: 'ดินแดนแห่งขุนเขา' },
        { name: 'แม่ฟ้าหลวง', slug: 'mae-fa-luang', description: 'ดอยตุง - พระตำหนัก' },
        { name: 'แม่ลาว', slug: 'mae-lao', description: 'เมืองแห่งข้าวใหม่' },
        { name: 'เวียงเชียงรุ้ง', slug: 'wiang-chiang-rung', description: 'เมืองแห่งสายรุ้ง' },
        { name: 'ดอยหลวง', slug: 'doi-luang', description: 'ยอดดอยแห่งเชียงราย' },
    ]

    return (
        <>
            {/* Header */}
            <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-16">
                <div className="container mx-auto max-w-7xl px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        เครือข่ายสภาวัฒนธรรมอำเภอ
                    </h1>
                    <p className="text-xl opacity-90 max-w-2xl mx-auto">
                        เชื่อมต่อกับสภาวัฒนธรรมทั้ง 18 อำเภอของจังหวัดเชียงราย
                    </p>
                </div>
            </section>

            {/* Gold Accent */}
            <div className="gold-accent" />

            {/* District Grid */}
            <section className="py-16 px-4 md:px-8">
                <div className="container mx-auto max-w-7xl">
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {districts.map((district) => (
                            <a
                                key={district.slug}
                                href={`/districts/${district.slug}`}
                                className="card-district group"
                            >
                                <figure className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                                    <span className="text-6xl group-hover:scale-110 transition-transform">📍</span>
                                </figure>
                                <div className="card-body">
                                    <h2 className="card-title text-lg group-hover:text-primary transition-colors">
                                        {district.name}
                                    </h2>
                                    <p className="text-sm text-base-content/60">
                                        {district.description}
                                    </p>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* Map Section Placeholder */}
            <section className="py-16 px-4 md:px-8 bg-base-200">
                <div className="container mx-auto max-w-7xl text-center">
                    <h2 className="section-header">แผนที่จังหวัดเชียงราย</h2>
                    <div className="bg-base-100 rounded-2xl shadow-xl p-8 aspect-video flex items-center justify-center">
                        <div className="text-base-content/50">
                            <span className="text-6xl mb-4 block">🗺️</span>
                            <p>Interactive Map Coming Soon</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
