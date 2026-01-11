import Link from 'next/link'

const sampleActivities = [
    {
        slug: 'songkran-2026',
        title: 'งานสงกรานต์เชียงราย 2569',
        date: '2026-04-13',
        endDate: '2026-04-15',
        level: 'province',
        location: 'ลานอนุสาวรีย์พ่อขุนเม็งรายมหาราช',
        summary: 'เทศกาลสงกรานต์ประจำปีจังหวัดเชียงราย สืบสานประเพณีไทย',
    },
    {
        slug: 'loy-krathong-2026',
        title: 'งานลอยกระทงเชียงราย 2569',
        date: '2026-11-15',
        level: 'province',
        location: 'ริมแม่น้ำกก',
        summary: 'งานลอยกระทงประจำปี สืบสานประเพณียี่เป็ง',
    },
    {
        slug: 'culture-forum-2026',
        title: 'เวทีวัฒนธรรมล้านนา ครั้งที่ 10',
        date: '2026-02-20',
        level: 'province',
        location: 'ศูนย์ประชุมจังหวัดเชียงราย',
        summary: 'เวทีแลกเปลี่ยนเรียนรู้วัฒนธรรมล้านนาระหว่างเครือข่าย',
    },
    {
        slug: 'mae-chan-local-fair',
        title: 'งานวัฒนธรรมท้องถิ่นอำเภอแม่จัน',
        date: '2026-03-10',
        level: 'district',
        districtName: 'แม่จัน',
        location: 'ที่ว่าการอำเภอแม่จัน',
        summary: 'กิจกรรมจัดแสดงวัฒนธรรมท้องถิ่นของอำเภอแม่จัน',
    },
]

export default function ActivitiesPage() {
    return (
        <>
            {/* Hero */}
            <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-16">
                <div className="container mx-auto max-w-7xl px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        กิจกรรมสภาวัฒนธรรม
                    </h1>
                    <p className="text-xl opacity-90 max-w-2xl mx-auto">
                        กิจกรรมและงานประเพณีของสภาวัฒนธรรมจังหวัดเชียงราย
                    </p>
                </div>
            </section>

            {/* Gold Accent */}
            <div className="gold-accent" />

            {/* Filter Tabs */}
            <div className="container mx-auto max-w-7xl px-4 py-8">
                <div className="flex flex-wrap gap-2 justify-center">
                    <button className="btn btn-primary">ทั้งหมด</button>
                    <button className="btn btn-outline">ระดับจังหวัด</button>
                    <button className="btn btn-outline">ระดับอำเภอ</button>
                    <Link href="/activities/calendar" className="btn btn-ghost gap-2">
                        <span>📅</span> ปฏิทินกิจกรรม
                    </Link>
                </div>
            </div>

            {/* Activities Grid */}
            <section className="container mx-auto max-w-7xl px-4 pb-16">
                <div className="grid md:grid-cols-2 gap-8">
                    {sampleActivities.map((activity) => (
                        <div key={activity.slug} className="card-district group">
                            <figure className="aspect-video bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center relative">
                                <span className="text-6xl group-hover:scale-110 transition-transform">
                                    🎉
                                </span>
                                {/* Date Badge */}
                                <div className="absolute top-4 left-4 bg-primary text-white p-3 rounded-lg text-center min-w-[70px]">
                                    <div className="text-2xl font-bold">
                                        {new Date(activity.date).getDate()}
                                    </div>
                                    <div className="text-xs">
                                        {new Date(activity.date).toLocaleDateString('th-TH', { month: 'short' })}
                                    </div>
                                </div>
                            </figure>
                            <div className="card-body">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className={`badge ${activity.level === 'province' ? 'badge-primary' : 'badge-secondary'}`}>
                                        {activity.level === 'province' ? 'ระดับจังหวัด' : `อำเภอ${activity.districtName}`}
                                    </span>
                                </div>
                                <h3 className="card-title text-xl group-hover:text-primary transition-colors">
                                    {activity.title}
                                </h3>
                                <p className="text-sm text-base-content/60 flex items-center gap-2">
                                    <span>📍</span> {activity.location}
                                </p>
                                <p className="text-base-content/80 mt-2">
                                    {activity.summary}
                                </p>
                                <div className="card-actions justify-end mt-4">
                                    <Link href={`/activities/${activity.slug}`} className="btn btn-primary btn-sm">
                                        ดูรายละเอียด
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Load More */}
                <div className="text-center mt-12">
                    <button className="btn btn-outline btn-primary">
                        โหลดเพิ่มเติม
                    </button>
                </div>
            </section>
        </>
    )
}
