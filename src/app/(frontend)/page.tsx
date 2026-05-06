import Link from 'next/link'
import { getActivities, getDistricts, getNews, getPageHeroes } from '@/lib/payload'
import { resolveMediaAlt, resolveMediaUrl, type MediaLike } from '@/lib/media'
import type { PublicActivity, PublicDistrict, PublicNews } from '@/lib/public-content'
import CmsImage from '@/components/CmsImage'

export default async function Home() {
    const [activitiesResponse, newsResponse, districtsData] = await Promise.all([
        getActivities({ limit: 3 }),
        getNews({ limit: 3 }),
        getDistricts(),
    ])
    const pageHeroes = await getPageHeroes().catch(() => null)
    const homeHero = pageHeroes?.home || {}
    const homeHeroMedia = homeHero.heroImage as MediaLike

    const { docs: activitiesData } = activitiesResponse
    const { docs: newsData } = newsResponse
    const publicActivities = (activitiesData || []) as PublicActivity[]
    const publicNews = (newsData || []) as PublicNews[]
    const publicDistricts = districtsData as PublicDistrict[]
    const featuredActivity = publicActivities[0]
    const featuredNews = publicNews[0]
    const homeHeroImageUrl = resolveMediaUrl(homeHeroMedia)
    const homeHeroImageAlt = resolveMediaAlt(homeHeroMedia, homeHero.title || 'ภาพพื้นหลังหน้าหลัก')

    return (
        <div className="overflow-hidden bg-base-100 font-sans">
            {/* Majestic Hero Section with Background Header */}
            <section className="relative overflow-hidden min-h-screen flex items-center accent-panel">
                {homeHeroImageUrl && (
                    <div className="absolute inset-0 z-0">
                        <CmsImage
                            src={homeHeroImageUrl}
                            alt={homeHeroImageAlt}
                            fill
                            sizes="100vw"
                            className="object-cover object-top"
                            priority
                        />
                    </div>
                )}

                <div className={`absolute inset-0 z-0 ${homeHeroImageUrl ? 'bg-linear-to-r from-primary/88 via-primary/70 to-primary/40' : 'bg-linear-to-br from-stone-50 via-white to-stone-100'}`} />
                <div className={`absolute inset-0 z-0 ${homeHeroImageUrl ? 'bg-lanna-pattern opacity-20' : 'bg-lanna-pattern opacity-8'}`} />
                {homeHeroImageUrl && (
                    <>
                        <div className="absolute top-0 right-[-10%] w-[50%] h-[70%] rounded-full bg-linear-to-bl from-secondary/18 to-transparent blur-[120px]" />
                        <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[60%] rounded-full bg-linear-to-tr from-accent/14 to-transparent blur-[130px]" />
                    </>
                )}

                <div className="container mx-auto px-4 relative z-10 pt-32 pb-24 lg:pt-40 lg:pb-30 flex flex-col items-center">
                    <div className="grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr] w-full max-w-7xl">
                        <div className="max-w-3xl mx-auto lg:mx-0 text-center lg:text-left">
                            <div className={`inline-flex items-center gap-3 px-6 py-2.5 rounded-full backdrop-blur-md text-sm font-medium shadow-sm mb-10 uppercase tracking-widest ${homeHeroImageUrl ? 'bg-white/14 border border-white/20 text-white' : 'bg-white/60 border border-red-900/10 text-stone-700'}`}>
                                <span className="w-2 h-2 rounded-full bg-[#A03C3C]" />
                                <span className={`${homeHeroImageUrl ? 'text-secondary' : 'text-[#A03C3C]'} font-bold`}>{homeHero.eyebrow || 'Modern Lanna'}</span> <span className={`${homeHeroImageUrl ? 'text-white/30' : 'text-stone-300'} px-1`}>|</span> <span className={homeHeroImageUrl ? 'text-white/80' : ''}>รากเหง้าที่ร่วมสมัย</span>
                            </div>

                            <h1 className={`text-5xl md:text-7xl lg:text-8xl font-bold mb-8 tracking-tight leading-[1.05] font-display ${homeHeroImageUrl ? 'text-white drop-shadow-lg' : 'text-stone-800'}`}>
                                {homeHero.title || 'สภาวัฒนธรรม จังหวัดเชียงราย'}
                            </h1>

                            <p className={`text-xl md:text-2xl lg:text-3xl mb-10 max-w-3xl mx-auto lg:mx-0 font-light leading-relaxed ${homeHeroImageUrl ? 'text-white/82' : 'text-stone-600'}`}>
                                {homeHero.subtitle || 'เมืองศิลปิน ถิ่นวัฒนธรรม ส่งเสริมและอนุรักษ์มรดกล้านนา เชื่อมโยงอดีตสู่ปัจจุบันอย่างยั่งยืนเพื่อชนรุ่นหลัง'}
                            </p>

                            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-5">
                                <Link href="/districts" className="group relative w-full sm:w-auto overflow-hidden rounded-full bg-linear-to-r from-[#A03C3C] to-[#8A2B2B] px-10 py-5 text-center text-lg font-bold text-white shadow-lg transition-colors hover:brightness-110 hover:shadow-xl hover:shadow-[#A03C3C]/30">
                                    <span className="relative z-10 flex items-center justify-center gap-3">
                                        เครือข่าย 18 อำเภอ
                                        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1.5 transition-transform"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                                    </span>
                                </Link>
                                <Link href="/heritage" className={`w-full sm:w-auto text-center rounded-full px-10 py-5 text-lg font-medium shadow-sm transition-all ${homeHeroImageUrl ? 'border border-white/20 bg-white/12 text-white hover:bg-white/18' : 'border border-stone-200 bg-white text-stone-700 hover:bg-stone-50 hover:border-stone-300 hover:text-[#A03C3C]'}`}>
                                    คลังมรดกภูมิปัญญา
                                </Link>
                            </div>

                        </div>

                        <div className="relative w-full max-w-2xl mx-auto lg:mx-0">
                            <div className={`absolute -inset-6 blur-2xl rounded-4xl ${homeHeroImageUrl ? 'bg-linear-to-br from-secondary/12 via-white/5 to-accent/10' : 'bg-linear-to-br from-[#A03C3C]/10 via-secondary/10 to-primary/10'}`} />
                            <div className={`relative overflow-hidden rounded-4xl border backdrop-blur-xl shadow-[0_20px_80px_rgba(27,42,73,0.15)] ${homeHeroImageUrl ? 'border-white/20 bg-white/10' : 'border-white/70 bg-white/75'}`}>
                                <div className="p-6 md:p-8">
                                    <div className="flex items-center justify-between gap-4 mb-6">
                                        <div>
                                            <span className={`text-xs font-bold uppercase tracking-[0.25em] ${homeHeroImageUrl ? 'text-white/80' : 'text-secondary-dark'}`}>Live Overview</span>
                                            <h2 className={`text-2xl md:text-3xl font-bold mt-2 font-display ${homeHeroImageUrl ? 'text-white' : 'text-primary'}`}>{homeHero.title || 'ภาพรวมการเคลื่อนไหวล่าสุด'}</h2>
                                        </div>
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${homeHeroImageUrl ? 'bg-white/15 text-white border border-white/20 backdrop-blur-md' : 'bg-secondary/10 text-secondary-dark'}`}>
                                            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                                                <path d="M4 4h16v16H4z" />
                                                <path d="M8 8h8" />
                                            </svg>
                                        </div>
                                    </div>

                                    <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                                        <div className={`rounded-2xl p-5 shadow-lg ${homeHeroImageUrl ? 'bg-white/15 text-white border border-white/20 backdrop-blur-md' : 'bg-linear-to-br from-primary to-primary-dark text-white shadow-primary/20'}`}>
                                            <div className="text-xs uppercase tracking-[0.25em] text-white/70 font-semibold">เครือข่ายอำเภอ</div>
                                            <div className="mt-3 text-4xl font-bold leading-none">{publicDistricts.length}</div>
                                            <p className="mt-3 text-sm text-white/80 leading-relaxed">เชื่อมโยงเครือข่ายชุมชน วัฒนธรรม และกิจกรรมทั่วจังหวัด</p>
                                        </div>

                                        <div className={`rounded-2xl p-5 ${homeHeroImageUrl ? 'bg-white/12 border border-white/20 backdrop-blur-md text-white' : 'bg-white border border-base-200'}`}>
                                            <div className={`text-xs uppercase tracking-[0.25em] font-semibold ${homeHeroImageUrl ? 'text-white/80' : 'text-secondary-dark'}`}>กิจกรรมล่าสุด</div>
                                            <h3 className={`mt-3 text-lg font-bold line-clamp-2 font-display ${homeHeroImageUrl ? 'text-white' : 'text-primary'}`}>{featuredActivity?.title || 'ยังไม่มีข้อมูลกิจกรรม'}</h3>
                                            <p className={`mt-2 text-sm line-clamp-3 ${homeHeroImageUrl ? 'text-white/80' : 'text-base-content/60'}`}>
                                                {featuredActivity?.excerpt || 'กำลังรอข้อมูลกิจกรรมเพื่อแสดงเรื่องราวที่กำลังเกิดขึ้น'}
                                            </p>
                                        </div>

                                        <div className={`rounded-2xl p-5 ${homeHeroImageUrl ? 'bg-white/12 border border-white/20 backdrop-blur-md text-white' : 'bg-slate-50 border border-base-200'}`}>
                                            <div className={`text-xs uppercase tracking-[0.25em] font-semibold ${homeHeroImageUrl ? 'text-white/80' : 'text-accent'}`}>ข่าวล่าสุด</div>
                                            <h3 className={`mt-3 text-lg font-bold line-clamp-2 font-display ${homeHeroImageUrl ? 'text-white' : 'text-primary'}`}>{featuredNews?.title || 'ยังไม่มีข้อมูลข่าวสาร'}</h3>
                                            <p className={`mt-2 text-sm line-clamp-3 ${homeHeroImageUrl ? 'text-white/80' : 'text-base-content/60'}`}>
                                                {featuredNews?.excerpt || 'กำลังรอข่าวสารใหม่เพื่ออัปเดตความเคลื่อนไหวของสภาวัฒนธรรม'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Elegant Bottom Edge Curve or Gradient */}
                <div className="absolute bottom-0 left-0 right-0 h-24 z-10 bg-linear-to-t from-white to-transparent pointer-events-none" />
            </section>

            {/* Cultural Heritage Highlights */}
            <section className="py-32 px-4 md:px-8 relative bg-white overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-[100px] -z-10" />
                <div className="absolute bottom-10 left-10 w-72 h-72 bg-primary/5 rounded-full blur-[80px] -z-10" />
                <div className="container mx-auto max-w-7xl relative z-10">
                    <div className="text-center mb-20">
                        <span className="text-accent font-semibold tracking-widest text-sm uppercase mb-3 block">Cultural Heritage</span>
                        <h2 className="section-header mb-6! text-primary">หมวดหมู่มรดกภูมิปัญญา</h2>
                        <p className="text-base-content/60 text-lg max-w-2xl mx-auto font-light">สำรวจและเรียนรู้ความหลากหลายของศิลปวัฒนธรรม ภูมิปัญญา และวิถีชีวิตชาวเชียงราย ผ่านมุมมองร่วมสมัย</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { title: 'มรดกภูมิปัญญา', icon: <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" /><path d="M18 14h-8" /><path d="M15 18h-5" /><path d="M10 6h8v4h-8V6Z" /></svg>, desc: 'ประเพณี การแสดง และงานช่างฝีมือที่สะท้อนถึงรากเหง้าของล้านนา', color: 'from-[#FFFDF5] to-[#FDF8E3]', borderColor: 'border-secondary/20', iconColor: 'text-secondary-dark', hoverColor: 'group-hover:bg-secondary/10' },
                            { title: 'แหล่งเรียนรู้', icon: <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>, desc: 'สถานที่ลงมือปฏิบัติและสัมผัสวิถีชีวิตจริงของชุมชนท้องถิ่น', color: 'from-[#FFF6F5] to-[#FFEBEA]', borderColor: 'border-accent/20', iconColor: 'text-accent', hoverColor: 'group-hover:bg-accent/10' },
                            { title: 'ปราชญ์ชาวบ้าน', icon: <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>, desc: 'ผู้ทรงคุณวุฒิที่อุทิศตนเพื่อการสืบทอดภูมิปัญญาและสร้างสรรค์ผลงาน', color: 'from-[#FAFAFA] to-[#F4F4F5]', borderColor: 'border-slate-300', iconColor: 'text-slate-700', hoverColor: 'group-hover:bg-slate-200/50' }
                        ].map((category, i) => (
                            <Link
                                key={i}
                                href={`/heritage?category=${i + 1}`}
                                className={`card-modern group relative rounded-3xl p-8 bg-linear-to-br ${category.color} ${category.borderColor} transition-all duration-300 hover:shadow-2xl overflow-hidden`}
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/40 rounded-full blur-2xl z-0" />
                                <div className="relative z-10 h-full flex flex-col">
                                    <div className={`w-16 h-16 mb-8 rounded-2xl bg-white border border-white/50 flex items-center justify-center ${category.iconColor} shadow-md`}>
                                        <div className={`p-3 rounded-xl transition-colors duration-300 ${category.hoverColor}`}>
                                            {category.icon}
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold mb-4 text-primary font-display group-hover:text-primary-dark transition-colors">{category.title}</h3>
                                    <p className="text-base-content/70 text-sm leading-relaxed font-light grow">
                                        {category.desc}
                                    </p>
                                    <div className="mt-6 flex items-center text-sm font-semibold opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-400">
                                        <span className={category.iconColor}>ดูเพิ่มเติม</span>
                                        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`ml-2 ${category.iconColor}`}><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* ศูนย์เชียงรายศึกษา - External Link */}
                    <div className="mt-8">
                        <a
                            href="https://social.crru.ac.th/cr-studies-center"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center justify-between p-6 md:p-8 rounded-3xl bg-linear-to-r from-[#F5F8FF] to-[#E6EFFF] border border-primary/20 hover:border-primary/40 hover:shadow-xl transition-all duration-500"
                        >
                            <div className="flex items-center gap-5">
                                <div className="w-14 h-14 rounded-2xl bg-white border border-primary/20 flex items-center justify-center text-primary shadow-md transition-colors duration-300">
                                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-primary font-display group-hover:text-primary-dark transition-colors">ศูนย์เชียงรายศึกษา</h3>
                                    <p className="text-base-content/60 text-sm font-light mt-1">แหล่งรวบรวมข้อมูล ประวัติศาสตร์ และการศึกษาวิจัยเพื่อการเรียนรู้ — มหาวิทยาลัยราชภัฏเชียงราย</p>
                                </div>
                            </div>
                            <div className="shrink-0 w-10 h-10 rounded-full bg-white border border-primary/20 flex items-center justify-center text-primary/50 group-hover:text-primary group-hover:bg-primary/5 transition-colors">
                                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" x2="21" y1="14" y2="3" /></svg>
                            </div>
                        </a>
                    </div>
                </div>
            </section>

            {/* Latest Activities Section with Timeline style */}
            <section className="py-32 px-4 md:px-8 bg-slate-50 border-y border-base-200/50 relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03] mask-kanok bg-primary" />
                <div className="absolute top-1/4 right-0 w-1/3 h-1/2 bg-linear-to-l from-secondary/5 to-transparent blur-3xl z-0" />
                <div className="absolute bottom-0 left-0 w-1/4 h-1/3 bg-linear-to-tr from-accent/5 to-transparent blur-2xl z-0" />
                <div className="container mx-auto max-w-7xl relative z-10">
                    <div className="flex flex-col md:flex-row items-end justify-between mb-16">
                        <div>
                            <span className="text-secondary font-semibold tracking-wider text-sm uppercase mb-3 block">News & Updates</span>
                            <h2 className="text-4xl font-bold text-primary font-display">กิจกรรมล่าสุด</h2>
                        </div>
                        <Link href="/activities" className="group flex min-h-11 items-center text-sm font-medium text-primary hover:text-secondary-dark transition-colors mt-6 md:mt-0 bg-white px-6 py-3 rounded-full border border-base-200 shadow-sm hover:shadow hover:border-secondary/30">
                            ดูกิจกรรมทั้งหมด
                            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {publicActivities.length > 0 ? publicActivities.map((item, i) => {
                            const dateObj = new Date(item.date)
                            const formattedDate = dateObj.toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' })
                            const imageUrl = resolveMediaUrl(item.coverImage, item.gallery)
                            const description = item.excerpt || 'กิจกรรมสภาวัฒนธรรมจังหวัดเชียงราย'

                            return (
                            <div key={item.id} className={`card-modern bg-white flex flex-col h-full group rounded-2xl overflow-hidden shadow-lg shadow-primary/5 hover:shadow-2xl hover:shadow-secondary/10`}>
                                <div className="aspect-16/10 bg-base-200 relative overflow-hidden shrink-0">
                                    {imageUrl ? (
                                        <div className="absolute inset-0 transition-transform duration-300 ease-out">
                                            <CmsImage
                                                src={imageUrl}
                                                alt={item.title}
                                                fill
                                                sizes="(min-width: 1024px) 30vw, (min-width: 768px) 33vw, 100vw"
                                                className="object-cover"
                                                priority={i === 0}
                                            />
                                            <div className="absolute inset-0 bg-linear-to-t from-primary/80 via-primary/20 to-transparent" />
                                        </div>
                                    ) : (
                                        <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-secondary/10 to-accent/10 flex items-center justify-center text-6xl transition-transform duration-300">
                                            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary/45 drop-shadow-md opacity-80 filter saturate-[0.8]">
                                                <path d="M6 7h12" />
                                                <path d="M6 12h12" />
                                                <path d="M6 17h8" />
                                                <path d="M4 4h16v16H4z" />
                                            </svg>
                                            <div className="absolute inset-0 bg-linear-to-t from-primary/60 to-transparent opacity-80" />
                                        </div>
                                    )}
                                    <div className="absolute top-4 left-4 z-20">
                                        <span className="bg-white/90 backdrop-blur-sm text-primary text-xs font-bold px-4 py-2 rounded-full shadow-lg border border-white/20">{formattedDate}</span>
                                    </div>
                                </div>
                                <div className="p-8 flex flex-col grow relative bg-white">
                                    <div className="absolute top-0 right-8 w-12 h-12 bg-secondary text-white rounded-b-xl flex items-center justify-center font-display font-bold text-xl shadow-md">
                                        {`0${i + 1}`}
                                    </div>
                                    <span className="text-xs font-bold tracking-widest text-accent uppercase mb-3 block mt-2">
                                        {item.level === 'province' ? 'กิจกรรมระดับจังหวัด' : 'กิจกรรมระดับอำเภอ'}
                                    </span>
                                    <h3 className="text-xl font-bold mb-3 group-hover:text-secondary-dark transition-colors line-clamp-2 leading-tight font-display">
                                        {item.title}
                                    </h3>
                                    <p className="text-base-content/60 text-sm mb-6 line-clamp-2 font-light grow">
                                        {description}
                                    </p>
                                    <div className="pt-5 border-t border-base-100 flex items-center justify-between mt-auto">
                                        <span className="text-xs text-base-content/50 flex items-center gap-1.5 font-medium">
                                            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-secondary"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                                            {item.district?.name || 'เมืองเชียงราย'}
                                        </span>
                                        <Link href={`/activities/${item.slug || item.id}`} className="text-sm font-semibold text-primary hover:text-secondary-dark transition-colors flex min-h-11 items-center gap-1 group/link bg-slate-50 px-4 py-2 rounded-full hover:bg-secondary/10">
                                            อ่านต่อ
                                            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover/link:translate-x-1 transition-transform"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}) : (
                            <div className="col-span-full py-10 text-center text-base-content/50">ยังไม่มีข้อมูลกิจกรรม</div>
                        )}
                    </div>
                </div>
            </section>

            {/* Latest News Section */}
            <section className="py-24 px-4 md:px-8 bg-white overflow-hidden relative border-b border-base-200/50">
                <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full blur-[80px] -z-10" />
                <div className="container mx-auto max-w-7xl relative z-10">
                    <div className="flex flex-col md:flex-row items-end justify-between mb-16">
                        <div>
                            <span className="text-accent font-semibold tracking-wider text-sm uppercase mb-3 block">Press & Announcements</span>
                            <h2 className="text-4xl font-bold text-primary font-display">ข่าวสารล่าสุด</h2>
                        </div>
                        <Link href="/news" className="group flex min-h-11 items-center text-sm font-medium text-primary hover:text-secondary-dark transition-colors mt-6 md:mt-0 bg-white px-6 py-3 rounded-full border border-base-200 shadow-sm hover:shadow hover:border-secondary/30">
                            ดูข่าวทั้งหมด
                            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {publicNews.length > 0 ? publicNews.map((news, i) => {
                            const dateObj = new Date(news.date || news.createdAt || new Date().toISOString())
                            const formattedDate = dateObj.toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' })
                            
                            const typeConfig = {
                                general: { label: 'ข่าวทั่วไป', color: 'text-primary border-primary/20 bg-primary/5' },
                                video: { label: 'วิดีโอ', color: 'text-secondary-dark border-secondary/20 bg-secondary/5' },
                                document: { label: 'เอกสาร', color: 'text-sky-700 border-sky-500/20 bg-sky-500/5' },
                            }
                            
                            const config = typeConfig[news.type as keyof typeof typeConfig] || typeConfig.general

                            return (
                            <Link key={news.id} href={`/news/${news.slug || news.id}`} className={`bg-white group rounded-3xl p-6 sm:p-8 flex flex-col h-full border border-base-200 hover:border-secondary/30 hover:shadow-xl hover:shadow-secondary/5 transition-all duration-300`}>
                                <div className="flex items-center justify-between mb-6">
                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest border ${config.color}`}>
                                        {config.label}
                                    </span>
                                    <span className="text-sm font-medium text-base-content/50 flex items-center gap-1.5">
                                        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" /></svg>
                                        {formattedDate}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold mb-4 font-display text-base-content group-hover:text-primary transition-colors line-clamp-3 leading-snug">
                                    {news.title}
                                </h3>
                                <p className="text-base-content/60 text-sm font-light line-clamp-2 md:line-clamp-3 mb-6 mt-auto">
                                    {news.summary || news.excerpt}
                                </p>
                                <div className="flex items-center gap-2 text-sm font-bold text-primary group-hover:underline group-hover:text-secondary-dark mt-auto">
                                    อ่านรายละเอียด
                                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                                </div>
                            </Link>
                        )}) : (
                            <div className="col-span-full py-10 text-center text-base-content/50">ยังไม่มีข้อมูลข่าวสาร</div>
                        )}
                    </div>
                </div>
            </section>

            {/* 18 Districts Quick Access */}
            <section className="py-32 px-4 md:px-8 bg-white overflow-hidden relative">
                <div className="absolute left-0 bottom-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -z-10" />
                <div className="absolute top-20 right-10 w-64 h-64 bg-accent/5 rounded-full blur-[80px] -z-10" />
                <div className="container mx-auto max-w-7xl text-center relative z-10">
                    <span className="text-accent font-semibold tracking-wider text-sm uppercase mb-3 block">Local Network</span>
                    <h2 className="section-header mb-6! text-center font-display">เครือข่ายสภาวัฒนธรรมอำเภอ</h2>
                    <p className="text-lg text-base-content/60 mb-16 max-w-2xl mx-auto font-light">
                        ประสานความร่วมมือและส่งเสริมกิจกรรมทางวัฒนธรรมครอบคลุมพื้นที่ 18 อำเภอ ในจังหวัดเชียงราย
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
                        {publicDistricts.length > 0 ? publicDistricts.map((district, i) => (
                            <Link
                                key={district.id || i}
                                href={`/districts/${district.slug || district.name.toLowerCase().replace(/\s+/g, '-')}`}
                                className="group bg-slate-50 rounded-xl border border-base-200/80 p-5 flex flex-col items-center gap-4 hover:bg-white hover:border-secondary/50 hover:shadow-[0_8px_30px_rgb(212,175,55,0.1)] transition-all duration-300 relative overflow-hidden"
                            >
                                <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-secondary-light to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="w-12 h-12 rounded-full bg-white border border-base-200 flex items-center justify-center group-hover:bg-secondary/10 group-hover:border-secondary/30 transition-colors shadow-sm">
                                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-primary/40 group-hover:text-secondary-dark transition-colors duration-300" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                                </div>
                                <span className="text-base md:text-lg font-medium text-primary/70 group-hover:text-primary transition-colors font-display tracking-wide">{district.name}</span>
                            </Link>
                        )) : (
                            <div className="col-span-full py-10 text-center text-base-content/50">ยังไม่มีข้อมูลเครือข่ายอำเภอ</div>
                        )}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-28 px-4 md:px-8 relative overflow-hidden bg-primary border-t border-primary-dark z-0">
                <div className="absolute inset-0 z-0">
                    {/* ฐานพื้นหลังสีน้ำเงินเข้ม */}
                    <div className="absolute inset-0 bg-primary/95" />

                    {/* ลวดลายผ้าทอล้านนาสีทองไล่เฉด */}
                    <div className="absolute inset-0 bg-linear-to-br from-secondary via-secondary-light to-accent mask-woven opacity-15 mix-blend-plus-lighter" />

                    {/* ทับซ้อนด้วยไล่เฉดสีน้ำเงินเข้มขอบๆ เพื่อบังให้เห็นลวดลายแค่นิดหน่อยตรงกลาง */}
                    <div className="absolute inset-0 bg-linear-to-b from-primary/90 via-transparent to-primary/90" />
                    <div className="absolute inset-0 bg-linear-to-r from-primary/80 via-transparent to-primary/80" />

                    {/* แสงสะท้อนประกอบ (ปรับให้อ่อนลง) */}
                    <div className="absolute top-0 right-[-10%] w-[50%] h-full rounded-full bg-linear-to-bl from-secondary/10 to-transparent blur-[100px]" />
                    <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-full rounded-full bg-linear-to-tr from-accent/10 to-transparent blur-[100px]" />
                </div>

                <div className="container mx-auto max-w-4xl text-center relative z-20">
                    <div className="w-16 h-1.5 bg-linear-to-r from-secondary to-secondary-light mx-auto mb-8 rounded-full shadow-[0_0_15px_rgba(212,175,55,0.5)]" />
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight font-display text-white drop-shadow-md">
                        ร่วมเป็นส่วนหนึ่งในการอนุรักษ์วัฒนธรรม
                    </h2>
                    <p className="text-xl text-blue-100/90 mb-12 font-light max-w-2xl mx-auto leading-relaxed">
                        เพื่อให้มรดกอันมีค่าเหล่านี้ ได้ส่งต่อถึงอนุชนรุ่นหลังอย่างยั่งยืน
                    </p>
                    <Link href="/contact" className="inline-flex min-h-11 items-center gap-3 bg-linear-to-r from-secondary to-secondary-light text-primary-dark px-10 py-4 rounded-full font-bold hover:from-secondary-light hover:to-secondary transition-all shadow-[0_8px_30px_rgba(212,175,55,0.25)] hover:shadow-[0_12px_40px_rgba(212,175,55,0.4)] text-lg group border border-secondary/50">
                        ติดต่อสอบถาม
                        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                    </Link>
                </div>
            </section>
        </div>
    )
}





