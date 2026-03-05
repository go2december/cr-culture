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
                        บุคลากร
                    </div>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-primary tracking-tight animate-fade-in-up delay-100 font-display">
                        คณะกรรมการจังหวัด
                    </h1>
                    <p className="text-lg md:text-xl text-base-content/70 max-w-2xl mx-auto font-light leading-relaxed animate-fade-in-up delay-200">
                        ทำเนียบคณะบริหารและกรรมการสภาวัฒนธรรมจังหวัดเชียงราย ผู้นำในการขับเคลื่อนงานด้านวัฒนธรรม
                    </p>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 to-transparent z-10" />
            </section>

            {/* Breadcrumb - Subtle & Clean */}
            <div className="container mx-auto max-w-7xl px-4 py-6 relative z-20">
                <div className="breadcrumbs text-sm text-base-content/60 font-light">
                    <ul>
                        <li><Link href="/" className="hover:text-primary transition-colors">หน้าแรก</Link></li>
                        <li><Link href="/about" className="hover:text-primary transition-colors">เกี่ยวกับเรา</Link></li>
                        <li className="text-primary font-medium">คณะกรรมการจังหวัด</li>
                    </ul>
                </div>
            </div>

            <div className="container mx-auto max-w-6xl px-4 py-12 pb-24 relative z-20">
                {/* Chairman Section */}
                <div className="flex flex-col items-center justify-center mb-20 animate-fade-in-up delay-300">
                    <div className="text-center mb-8">
                        <span className="text-secondary font-semibold tracking-widest text-sm uppercase mb-3 block">Chairman</span>
                        <h2 className="text-3xl font-bold text-primary font-display">ประธานสภาวัฒนธรรม</h2>
                    </div>

                    <div className="group relative bg-white rounded-3xl p-10 lg:p-12 w-full max-w-xl border border-base-200 shadow-[0_8px_30px_rgb(212,175,55,0.08)] hover:shadow-2xl hover:shadow-secondary/5 hover:border-secondary/30 transition-all duration-500 text-center">
                        <div className="absolute inset-0 bg-gradient-to-b from-secondary/[0.05] to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="relative z-10">
                            <div className="w-40 h-40 mx-auto rounded-full bg-gradient-to-br from-primary to-secondary p-1 mb-8 shadow-xl group-hover:scale-105 transition-transform duration-500">
                                <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden border-4 border-white">
                                    <div className="w-full h-full bg-slate-50 flex items-center justify-center text-primary/30 text-6xl">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                                    </div>
                                </div>
                            </div>
                            <h3 className="text-3xl font-bold mb-3 text-primary tracking-tight font-display group-hover:text-primary-dark transition-colors">
                                {boardMembers[0].name}
                            </h3>
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/20 text-secondary-dark font-medium text-sm">
                                <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                                {boardMembers[0].position}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Other Board Members Grid */}
                <div className="text-center mb-12 animate-fade-in-up delay-400">
                    <span className="text-secondary font-semibold tracking-widest text-sm uppercase mb-3 block">Executive Board</span>
                    <h2 className="section-header !mb-0 text-primary font-display">คณะกรรมการบริหาร</h2>
                </div>

                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8 mt-12 animate-fade-in-up delay-500">
                    {boardMembers.slice(1).map((member, i) => (
                        <div key={i} className="group bg-white rounded-3xl p-8 border border-base-200 shadow-sm hover:shadow-[0_8px_30px_rgb(212,175,55,0.06)] hover:border-secondary/30 transition-all duration-300 text-center flex flex-col items-center">
                            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 p-1 mb-6 group-hover:scale-110 group-hover:from-primary/20 group-hover:to-secondary/20 transition-all duration-300">
                                <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                                    <div className="w-full h-full bg-slate-50 flex items-center justify-center text-primary/20 text-3xl">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                                    </div>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-base-content group-hover:text-primary transition-colors font-display">{member.name}</h3>
                            <p className="text-sm font-medium text-secondary-dark">{member.position}</p>
                        </div>
                    ))}
                </div>

                {/* Elegant Table View */}
                <div className="mt-24 pt-16 border-t border-base-200">
                    <div className="text-center mb-10">
                        <span className="text-secondary font-semibold tracking-widest text-sm uppercase mb-3 block">Full List</span>
                        <h2 className="text-3xl font-bold text-primary font-display">รายชื่อคณะกรรมการทั้งหมด</h2>
                    </div>

                    <div className="bg-white rounded-3xl border border-secondary/20 shadow-[0_8px_30px_rgb(212,175,55,0.05)] overflow-hidden relative">
                        <div className="absolute inset-0 opacity-[0.02] mask-kanok bg-primary pointer-events-none" />
                        <div className="overflow-x-auto relative z-10">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-primary/5 border-b border-primary/10 text-sm uppercase tracking-wider text-primary font-bold">
                                        <th className="py-5 px-6 text-center w-24">ลำดับ</th>
                                        <th className="py-5 px-6">ชื่อ-นามสกุล</th>
                                        <th className="py-5 px-6">ตำแหน่ง</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {boardMembers.map((member, idx) => (
                                        <tr key={member.order} className={`border-b border-base-100 hover:bg-slate-50 transition-colors ${idx === boardMembers.length - 1 ? 'border-none' : ''}`}>
                                            <td className="py-4 px-6 text-center text-sm font-semibold text-primary/40">{member.order}</td>
                                            <td className="py-4 px-6 font-medium text-base-content">{member.name}</td>
                                            <td className="py-4 px-6 text-base-content/70 font-light">
                                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${member.order === 1 ? 'bg-secondary/20 text-secondary-dark' : 'bg-slate-100 text-base-content/70 border border-base-200'}`}>
                                                    {member.position}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
