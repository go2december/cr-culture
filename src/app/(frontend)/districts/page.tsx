import Link from 'next/link'
import { getDistricts } from '@/lib/payload'

export default async function DistrictsPage() {
    const rawDistricts = await getDistricts() || []
    
    // Fallback static data just in case db is completely empty
    const districts = rawDistricts.length > 0 ? rawDistricts.map((d: any) => ({
        name: d.name,
        slug: d.slug || d.name.toLowerCase().replace(/\s+/g, '-'),
        description: d.description || 'เครือข่ายศูนย์วัฒนธรรมระดับอำเภอ'
    })) : [
        { name: 'เมืองเชียงราย', slug: 'muang-chiang-rai', description: 'ศูนย์กลางจังหวัดเชียงราย' },
        { name: 'เวียงชัย', slug: 'wiang-chai', description: 'อำเภอเวียงชัย' },
    ]

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
                        <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                        เครือข่ายระดับอำเภอ
                    </div>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-primary tracking-tight animate-fade-in-up delay-100 font-display">
                        เครือข่ายสภาวัฒนธรรมอำเภอ
                    </h1>
                    <p className="text-lg md:text-xl text-base-content/70 max-w-2xl mx-auto font-light leading-relaxed animate-fade-in-up delay-200">
                        เชื่อมต่อและประสานความร่วมมือกับเครือข่ายสภาวัฒนธรรมครอบคลุมพื้นที่ 18 อำเภอ ในจังหวัดเชียงราย
                    </p>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 to-transparent z-10" />
            </section>

            {/* Breadcrumb - Subtle & Clean */}
            <div className="container mx-auto max-w-7xl px-4 py-6 relative z-20">
                <div className="breadcrumbs text-sm text-base-content/60 font-light">
                    <ul>
                        <li><a href="/" className="hover:text-primary transition-colors">หน้าแรก</a></li>
                        <li className="text-primary font-medium">เครือข่ายอำเภอ</li>
                    </ul>
                </div>
            </div>

            {/* District Grid */}
            <section className="py-12 px-4 md:px-8 pb-24 relative z-20">
                <div className="container mx-auto max-w-7xl">
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 animate-fade-in-up delay-300">
                        {districts.map((district: any, i: number) => (
                            <Link
                                key={district.slug || i}
                                href={`/districts/${district.slug}`}
                                className={`card-modern group bg-white rounded-2xl border border-base-200 shadow-sm hover:shadow-[0_8px_30px_rgb(212,175,55,0.08)] hover:-translate-y-1 hover:border-secondary/50 transition-all duration-400 p-6 flex flex-col items-center text-center relative overflow-hidden delay-${(i % 6) * 100}`}
                            >
                                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-secondary/10 to-transparent rounded-tr-2xl rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                                <div className="w-14 h-14 rounded-full bg-slate-50 border border-base-100 flex items-center justify-center mb-5 group-hover:bg-white group-hover:border-secondary/20 transition-all duration-400 relative z-10 shadow-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-primary/40 group-hover:text-secondary-dark group-hover:scale-110 transition-all duration-400" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                                </div>

                                <h2 className="text-lg font-bold text-primary group-hover:text-primary-dark transition-colors tracking-tight mb-2 relative z-10 font-display">
                                    {district.name}
                                </h2>
                                <p className="text-xs text-base-content/60 font-light line-clamp-1 relative z-10">
                                    {district.description}
                                </p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Map Section Placeholder */}
            <section className="py-24 px-4 md:px-8 bg-white border-t border-base-200 relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.02] mask-kanok bg-primary pointer-events-none" />
                <div className="container mx-auto max-w-5xl text-center relative z-10">
                    <div className="text-center mb-12">
                        <span className="text-accent font-semibold tracking-widest text-sm uppercase mb-3 block">Chiang Rai Map</span>
                        <h2 className="section-header !mb-0 text-primary font-display">แผนที่จังหวัดเชียงราย</h2>
                    </div>

                    <div className="bg-slate-50/80 backdrop-blur-md rounded-3xl border border-secondary/20 shadow-inner p-8 md:p-16 aspect-[16/9] flex flex-col items-center justify-center relative overflow-hidden group">
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
                        <div className="relative z-10 text-center text-primary/40 group-hover:text-secondary-dark transition-colors duration-500">
                            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-6 opacity-70 group-hover:scale-110 transition-transform duration-500"><path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z" /><path d="M15 5.764v15" /><path d="M9 3.236v15" /></svg>
                            <p className="text-lg font-medium font-display">Interactive Map Coming Soon</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
