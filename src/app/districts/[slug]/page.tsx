import { notFound } from 'next/navigation'
import Link from 'next/link'

// Sample district data - will be replaced with API fetch
const districtsData: Record<string, {
    name: string
    description: string
    contact: { address: string; phone: string; email: string }
}> = {
    'muang-chiang-rai': {
        name: 'เมืองเชียงราย',
        description: 'ศูนย์กลางจังหวัดเชียงราย เป็นที่ตั้งของสภาวัฒนธรรมจังหวัด',
        contact: {
            address: 'ศาลากลางจังหวัดเชียงราย อ.เมือง จ.เชียงราย 57000',
            phone: '053-150-150',
            email: 'muang@crculture.go.th',
        },
    },
}

export default async function DistrictDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params

    // TODO: Fetch from Payload API
    const district = districtsData[slug] || {
        name: slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
        description: 'รายละเอียดอำเภอ',
        contact: {
            address: 'ที่อยู่สำนักงาน',
            phone: '-',
            email: '-',
        },
    }

    // Sample committee members
    const members = [
        { name: 'นายสมชาย ใจดี', position: 'ประธานสภาวัฒนธรรมอำเภอ', order: 1 },
        { name: 'นางสาวสมหญิง รักดี', position: 'รองประธาน', order: 2 },
        { name: 'นายวัฒนา วัฒนธรรม', position: 'เลขานุการ', order: 3 },
        { name: 'นางมาลี ดอกไม้', position: 'เหรัญญิก', order: 4 },
        { name: 'นายประชา ประชาชน', position: 'กรรมการ', order: 5 },
    ]

    // Sample activities
    const activities = [
        { title: 'งานสืบสานประเพณีท้องถิ่น', date: '2026-01-15', level: 'district' },
        { title: 'อบรมเยาวชนรักษ์วัฒนธรรม', date: '2026-02-20', level: 'district' },
    ]

    return (
        <>
            {/* Hero Section */}
            <section className="hero-lanna min-h-[40vh] flex items-center justify-center text-white relative">
                <div className="hero-content text-center z-10">
                    <div className="max-w-3xl mx-auto px-4">
                        <div className="text-5xl mb-4">📍</div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            สภาวัฒนธรรมอำเภอ{district.name}
                        </h1>
                        <p className="text-xl opacity-90">
                            {district.description}
                        </p>
                    </div>
                </div>
            </section>

            {/* Gold Accent */}
            <div className="gold-accent" />

            {/* Breadcrumb */}
            <div className="container mx-auto max-w-7xl px-4 py-4">
                <div className="breadcrumbs text-sm">
                    <ul>
                        <li><Link href="/">หน้าแรก</Link></li>
                        <li><Link href="/districts">เครือข่ายอำเภอ</Link></li>
                        <li className="text-primary">{district.name}</li>
                    </ul>
                </div>
            </div>

            <div className="container mx-auto max-w-7xl px-4 py-8">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Committee Section */}
                        <section className="card bg-base-100 shadow-xl">
                            <div className="card-body">
                                <h2 className="card-title text-2xl text-primary mb-6">
                                    คณะกรรมการสภาวัฒนธรรมอำเภอ
                                </h2>

                                <div className="overflow-x-auto">
                                    <table className="table-committee">
                                        <thead>
                                            <tr>
                                                <th>ลำดับ</th>
                                                <th>ชื่อ-นามสกุล</th>
                                                <th>ตำแหน่ง</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {members.map((member, i) => (
                                                <tr key={i} className="hover">
                                                    <td className="text-center">{member.order}</td>
                                                    <td>{member.name}</td>
                                                    <td>{member.position}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </section>

                        {/* Activities Section */}
                        <section className="card bg-base-100 shadow-xl">
                            <div className="card-body">
                                <h2 className="card-title text-2xl text-primary mb-6">
                                    กิจกรรมในอำเภอ
                                </h2>

                                <div className="space-y-4">
                                    {activities.length > 0 ? (
                                        activities.map((activity, i) => (
                                            <div key={i} className="flex items-start gap-4 p-4 bg-base-200 rounded-lg hover:bg-base-300 transition-colors">
                                                <div className="bg-primary text-white p-3 rounded-lg text-center min-w-[60px]">
                                                    <div className="text-lg font-bold">
                                                        {new Date(activity.date).getDate()}
                                                    </div>
                                                    <div className="text-xs">
                                                        {new Date(activity.date).toLocaleDateString('th-TH', { month: 'short' })}
                                                    </div>
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold">{activity.title}</h3>
                                                    <span className="badge badge-secondary badge-sm">
                                                        กิจกรรมอำเภอ
                                                    </span>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-base-content/60 text-center py-8">
                                            ยังไม่มีกิจกรรมในขณะนี้
                                        </p>
                                    )}
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Sidebar - Contact Info */}
                    <div className="space-y-6">
                        <div className="card bg-base-100 shadow-xl">
                            <div className="card-body">
                                <h3 className="card-title text-lg text-primary mb-4">
                                    ข้อมูลติดต่อ
                                </h3>

                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <span className="text-xl">📍</span>
                                        <div>
                                            <div className="font-medium">ที่อยู่</div>
                                            <p className="text-sm text-base-content/70">
                                                {district.contact.address}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <span className="text-xl">📞</span>
                                        <div>
                                            <div className="font-medium">โทรศัพท์</div>
                                            <p className="text-sm text-base-content/70">
                                                {district.contact.phone}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <span className="text-xl">✉️</span>
                                        <div>
                                            <div className="font-medium">อีเมล</div>
                                            <p className="text-sm text-base-content/70">
                                                {district.contact.email}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="card bg-base-100 shadow-xl">
                            <div className="card-body">
                                <h3 className="card-title text-lg text-primary mb-4">
                                    ลิงก์ที่เกี่ยวข้อง
                                </h3>
                                <ul className="space-y-2">
                                    <li>
                                        <Link href="/heritage" className="link link-hover text-sm flex items-center gap-2">
                                            <span>📚</span> คลังมรดกภูมิปัญญา
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/activities" className="link link-hover text-sm flex items-center gap-2">
                                            <span>🎉</span> กิจกรรมทั้งหมด
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/districts" className="link link-hover text-sm flex items-center gap-2">
                                            <span>🗺️</span> อำเภออื่นๆ
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
