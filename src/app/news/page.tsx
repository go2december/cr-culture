import Link from 'next/link'

const newsItems = [
    {
        slug: 'culture-council-meeting-2026',
        title: 'ประชุมสภาวัฒนธรรมจังหวัดเชียงราย ครั้งที่ 1/2569',
        type: 'general',
        publishedAt: '2026-01-10',
        excerpt: 'สรุปผลการประชุมและแผนการดำเนินงานประจำปี 2569',
    },
    {
        slug: 'lanna-dance-documentary',
        title: 'สารคดี: ฟ้อนเล็บ ศิลปะการแสดงล้านนา',
        type: 'video',
        publishedAt: '2026-01-08',
        excerpt: 'สารคดีเชิงลึกเกี่ยวกับการอนุรักษ์ฟ้อนเล็บ',
        videoUrl: 'https://youtube.com/watch?v=xxx',
    },
    {
        slug: 'annual-report-2568',
        title: 'รายงานประจำปี 2568 สภาวัฒนธรรมจังหวัดเชียงราย',
        type: 'document',
        publishedAt: '2026-01-05',
        excerpt: 'ดาวน์โหลดรายงานประจำปี 2568',
    },
    {
        slug: 'heritage-award-2026',
        title: 'ประกาศรายชื่อผู้ได้รับรางวัลมรดกภูมิปัญญาดีเด่น 2569',
        type: 'general',
        publishedAt: '2026-01-03',
        excerpt: 'ประกาศผลการคัดเลือกผู้มีผลงานด้านการอนุรักษ์วัฒนธรรม',
    },
]

const typeConfig = {
    general: { label: 'ข่าวทั่วไป', icon: '📰', color: 'badge-primary' },
    video: { label: 'วิดีโอ', icon: '🎬', color: 'badge-secondary' },
    document: { label: 'เอกสาร', icon: '📄', color: 'badge-accent' },
}

export default function NewsPage() {
    return (
        <>
            {/* Hero */}
            <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-16">
                <div className="container mx-auto max-w-7xl px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        ข่าวสารและประชาสัมพันธ์
                    </h1>
                    <p className="text-xl opacity-90 max-w-2xl mx-auto">
                        ติดตามข่าวสารล่าสุดจากสภาวัฒนธรรมจังหวัดเชียงราย
                    </p>
                </div>
            </section>

            {/* Gold Accent */}
            <div className="gold-accent" />

            {/* Filter Tabs */}
            <div className="container mx-auto max-w-7xl px-4 py-8">
                <div className="flex flex-wrap gap-2 justify-center">
                    <button className="btn btn-primary">ทั้งหมด</button>
                    <button className="btn btn-outline gap-2">
                        <span>📰</span> ข่าวทั่วไป
                    </button>
                    <button className="btn btn-outline gap-2">
                        <span>🎬</span> วิดีโอ
                    </button>
                    <button className="btn btn-outline gap-2">
                        <span>📄</span> เอกสาร
                    </button>
                </div>
            </div>

            {/* News List */}
            <section className="container mx-auto max-w-4xl px-4 pb-16">
                <div className="space-y-6">
                    {newsItems.map((news) => {
                        const config = typeConfig[news.type as keyof typeof typeConfig]

                        return (
                            <article key={news.slug} className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
                                <div className="card-body flex-row gap-6">
                                    {/* Icon */}
                                    <div className="hidden sm:flex w-20 h-20 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg items-center justify-center text-4xl flex-shrink-0">
                                        {config.icon}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className={`badge ${config.color}`}>
                                                {config.label}
                                            </span>
                                            <span className="text-sm text-base-content/50">
                                                {new Date(news.publishedAt).toLocaleDateString('th-TH', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                })}
                                            </span>
                                        </div>

                                        <h2 className="text-xl font-bold hover:text-primary transition-colors">
                                            <Link href={`/news/${news.slug}`}>
                                                {news.title}
                                            </Link>
                                        </h2>

                                        <p className="text-base-content/70 mt-2">
                                            {news.excerpt}
                                        </p>

                                        <div className="mt-4">
                                            {news.type === 'document' ? (
                                                <button className="btn btn-primary btn-sm gap-2">
                                                    <span>⬇️</span> ดาวน์โหลด
                                                </button>
                                            ) : news.type === 'video' ? (
                                                <button className="btn btn-secondary btn-sm gap-2">
                                                    <span>▶️</span> ดูวิดีโอ
                                                </button>
                                            ) : (
                                                <Link href={`/news/${news.slug}`} className="btn btn-ghost btn-sm">
                                                    อ่านเพิ่มเติม →
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </article>
                        )
                    })}
                </div>

                {/* Pagination */}
                <div className="flex justify-center mt-12">
                    <div className="join">
                        <button className="join-item btn btn-disabled">«</button>
                        <button className="join-item btn btn-primary">1</button>
                        <button className="join-item btn">2</button>
                        <button className="join-item btn">3</button>
                        <button className="join-item btn">»</button>
                    </div>
                </div>
            </section>
        </>
    )
}
