import Link from 'next/link'

const boardMembers = [
    { name: 'นายประสงค์ วัฒนธรรม', position: 'ประธานสภาวัฒนธรรมจังหวัด', order: 1 },
    { name: 'นางสาวสุภา รักษ์วัฒนธรรม', position: 'รองประธาน คนที่ 1', order: 2 },
    { name: 'นายวิชัย ล้านนาวัฒน์', position: 'รองประธาน คนที่ 2', order: 3 },
    { name: 'นางมาลี ใจงาม', position: 'เลขานุการ', order: 4 },
    { name: 'นายสมศักดิ์ สืบสาน', position: 'เหรัญญิก', order: 5 },
    { name: 'นางวิไล ภูมิใจ', position: 'นายทะเบียน', order: 6 },
    { name: 'นายประชา พัฒนา', position: 'ประชาสัมพันธ์', order: 7 },
    { name: 'นางสาวนิตยา วัฒนศิลป์', position: 'กรรมการ', order: 8 },
    { name: 'นายธนวัฒน์ ล้านนา', position: 'กรรมการ', order: 9 },
    { name: 'นางเพ็ญศรี รักษ์ไทย', position: 'กรรมการ', order: 10 },
]

export default function BoardPage() {
    return (
        <>
            {/* Hero */}
            <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-20">
                <div className="container mx-auto max-w-7xl px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        คณะกรรมการจังหวัด
                    </h1>
                    <p className="text-xl opacity-90 max-w-2xl mx-auto">
                        ทำเนียบคณะกรรมการสภาวัฒนธรรมจังหวัดเชียงราย
                    </p>
                </div>
            </section>

            {/* Gold Accent */}
            <div className="gold-accent" />

            {/* Breadcrumb */}
            <div className="container mx-auto max-w-7xl px-4 py-4">
                <div className="breadcrumbs text-sm">
                    <ul>
                        <li><Link href="/">หน้าแรก</Link></li>
                        <li><Link href="/about">เกี่ยวกับเรา</Link></li>
                        <li className="text-primary">คณะกรรมการจังหวัด</li>
                    </ul>
                </div>
            </div>

            <div className="container mx-auto max-w-7xl px-4 py-12">
                {/* Chairman Card */}
                <div className="flex justify-center mb-12">
                    <div className="card bg-base-100 shadow-2xl w-full max-w-md">
                        <figure className="pt-8">
                            <div className="w-40 h-40 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-6xl">
                                👤
                            </div>
                        </figure>
                        <div className="card-body text-center">
                            <h2 className="card-title justify-center text-2xl">
                                {boardMembers[0].name}
                            </h2>
                            <p className="text-secondary font-semibold text-lg">
                                {boardMembers[0].position}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Other Board Members Grid */}
                <h2 className="section-header">คณะกรรมการ</h2>

                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
                    {boardMembers.slice(1).map((member, i) => (
                        <div key={i} className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
                            <figure className="pt-6">
                                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/70 to-secondary/70 flex items-center justify-center text-white text-4xl">
                                    👤
                                </div>
                            </figure>
                            <div className="card-body text-center p-4">
                                <h3 className="font-semibold">{member.name}</h3>
                                <p className="text-sm text-secondary">{member.position}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Table View */}
                <div className="mt-16">
                    <h2 className="text-2xl font-bold text-primary mb-6">รายชื่อทั้งหมด</h2>
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
                                {boardMembers.map((member) => (
                                    <tr key={member.order} className="hover">
                                        <td className="text-center">{member.order}</td>
                                        <td>{member.name}</td>
                                        <td>{member.position}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}
