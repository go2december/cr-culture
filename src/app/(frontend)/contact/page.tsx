import Link from 'next/link'
import { getPageHeroes } from '@/lib/payload'
import CmsImage from '@/components/CmsImage'
import { resolveMediaAlt, resolveMediaUrl, type MediaLike } from '@/lib/media'

export default async function ContactPage() {
    const pageHeroes = await getPageHeroes().catch(() => null)
    const hero = pageHeroes?.contact || {}
    const heroMedia = hero.heroImage as MediaLike
    const heroImageUrl = resolveMediaUrl(heroMedia)
    const heroImageAlt = resolveMediaAlt(heroMedia, (hero.title as string) || 'ภาพพื้นหลังหน้าติดต่อเรา')
    const hasHeroImage = Boolean(heroImageUrl)
    const contactAddress = 'สำนักงานวัฒนธรรมจังหวัดเชียงราย เลขที่ 570 หมู่ 2 ถ.เลี่ยงเมืองเชียงรายตะวันตก ต.บ้านดู่ อ.เมืองเชียงราย จ.เชียงราย 57100'

    return (
        <div className="bg-slate-50 min-h-screen font-sans">
            <section className={`relative overflow-hidden ${hasHeroImage ? 'pt-32 pb-24 lg:pt-40 lg:pb-30 accent-panel min-h-[52vh] flex items-end' : 'pt-32 pb-20 lg:pt-40 lg:pb-28 bg-slate-50 accent-panel'}`}>
                {hasHeroImage ? (
                    <>
                        <div className="absolute inset-0 z-0">
                            <CmsImage src={heroImageUrl!} alt={heroImageAlt} fill sizes="100vw" className="object-cover object-top" priority />
                            <div className="absolute inset-0 bg-linear-to-r from-primary/88 via-primary/70 to-primary/40" />
                            <div className="absolute inset-0 bg-lanna-pattern opacity-20" />
                            <div className="absolute top-0 right-[-10%] w-[50%] h-[70%] rounded-full bg-linear-to-bl from-secondary/18 to-transparent blur-[120px]" />
                            <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[60%] rounded-full bg-linear-to-tr from-accent/14 to-transparent blur-[130px]" />
                        </div>

                        <div className="container mx-auto max-w-7xl px-4 relative z-20">
                            <div className="max-w-4xl text-left">
                                <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium shadow-sm mb-6 bg-white/14 backdrop-blur-md border border-white/20 text-white reveal-soft">
                                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                                    {(hero.eyebrow as string) || 'ติดต่อเรา'}
                                </div>
                                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight reveal-soft stagger-1 font-display text-white leading-[1.05] drop-shadow-lg">
                                    {(hero.title as string) || 'ติดต่อสภาวัฒนธรรม'}
                                </h1>
                                <div className="w-24 h-1 rounded-full bg-linear-to-r from-secondary via-accent/60 to-transparent mb-6 reveal-soft stagger-2" />
                                <p className="text-lg md:text-xl max-w-3xl font-light leading-relaxed text-white/82 reveal-soft stagger-2">
                                    {(hero.subtitle as string) || 'สอบถามข้อมูล หรือติดต่อประสานงานกับสำนักงานวัฒนธรรมจังหวัดเชียงรายผ่านช่องทางด้านล่าง'}
                                </p>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="absolute inset-0 z-0 bg-lanna-pattern">
                            <div className="absolute top-0 right-[-10%] w-[60%] h-[70%] rounded-full bg-linear-to-bl from-secondary/15 to-transparent blur-[120px]" />
                            <div className="absolute bottom-[-20%] left-[-10%] w-[70%] h-[60%] rounded-full bg-linear-to-tr from-accent/10 to-transparent blur-[130px]" />
                        </div>

                        <div className="container mx-auto max-w-7xl px-4 relative z-10 text-center">
                            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/80 backdrop-blur-md border border-secondary/30 text-sm font-medium text-primary shadow-sm mb-6 reveal-soft">
                                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                                {(hero.eyebrow as string) || 'ติดต่อเรา'}
                            </div>
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-primary tracking-tight reveal-soft stagger-1 font-display">
                                {(hero.title as string) || 'ติดต่อสภาวัฒนธรรม'}
                            </h1>
                            <p className="text-lg md:text-xl text-base-content/70 max-w-2xl mx-auto font-light leading-relaxed reveal-soft stagger-2">
                                {(hero.subtitle as string) || 'สอบถามข้อมูล หรือติดต่อประสานงานกับสำนักงานวัฒนธรรมจังหวัดเชียงรายผ่านช่องทางด้านล่าง'}
                            </p>
                        </div>
                    </>
                )}

                <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-slate-50 to-transparent z-10" />
            </section>

            <div className="container mx-auto max-w-7xl px-4 py-6 relative z-20">
                <div className="breadcrumbs text-sm text-base-content/60 font-light">
                    <ul>
                        <li><Link href="/" className="hover:text-primary transition-colors">หน้าแรก</Link></li>
                        <li className="text-primary font-medium">ติดต่อเรา</li>
                    </ul>
                </div>
            </div>

            <div className="container mx-auto max-w-6xl px-4 py-12 pb-8 relative z-20">
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="group relative bg-white rounded-3xl border border-base-200 shadow-sm p-8 hover:border-secondary/30 hover:shadow-[0_8px_30px_rgb(212,175,55,0.08)] transition-all duration-400 overflow-hidden reveal-soft stagger-1">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-linear-to-bl from-primary/5 to-transparent rounded-tr-3xl rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative z-10">
                            <div className="w-14 h-14 bg-linear-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform shadow-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" /><circle cx="12" cy="10" r="3" /></svg>
                            </div>
                            <h3 className="font-bold text-lg mb-3 text-primary font-display">ที่อยู่</h3>
                            <p className="text-base-content/70 font-light leading-relaxed text-sm">
                                สำนักงานวัฒนธรรมจังหวัดเชียงราย<br />
                                เลขที่ 570 หมู่ 2 ถ.เลี่ยงเมืองเชียงรายตะวันตก<br />
                                ต.บ้านดู่ อ.เมืองเชียงราย จ.เชียงราย 57100
                            </p>
                        </div>
                    </div>

                    <div className="group relative bg-white rounded-3xl border border-base-200 shadow-sm p-8 hover:border-secondary/30 hover:shadow-[0_8px_30px_rgb(212,175,55,0.08)] transition-all duration-400 overflow-hidden reveal-soft stagger-2">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-linear-to-bl from-secondary/5 to-transparent rounded-tr-3xl rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative z-10">
                            <div className="w-14 h-14 bg-linear-to-br from-secondary/10 to-secondary/5 rounded-2xl flex items-center justify-center text-secondary-dark mb-6 group-hover:scale-110 transition-transform shadow-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                            </div>
                            <h3 className="font-bold text-lg mb-3 text-primary font-display">โทรศัพท์</h3>
                            <div className="space-y-2">
                                <a href="tel:053150169" className="text-base-content/70 font-light text-sm hover:text-primary transition-colors flex items-center gap-2 group/link">
                                    <span className="w-1.5 h-1.5 rounded-full bg-accent/50 group-hover/link:bg-accent transition-colors" />
                                    0-5315-0169
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="group relative bg-white rounded-3xl border border-base-200 shadow-sm p-8 hover:border-secondary/30 hover:shadow-[0_8px_30px_rgb(212,175,55,0.08)] transition-all duration-400 overflow-hidden reveal-soft stagger-3">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-linear-to-bl from-primary/5 to-transparent rounded-tr-3xl rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative z-10">
                            <div className="w-14 h-14 bg-linear-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform shadow-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                            </div>
                            <h3 className="font-bold text-lg mb-3 text-primary font-display">อีเมล</h3>
                            <a href="mailto:culture@chiangrai.go.th" className="text-base-content/70 font-light text-sm hover:text-primary transition-colors break-all">
                                culture@chiangrai.go.th
                            </a>
                        </div>
                    </div>

                    <div className="group relative bg-white rounded-3xl border border-base-200 shadow-sm p-8 hover:border-secondary/30 hover:shadow-[0_8px_30px_rgb(212,175,55,0.08)] transition-all duration-400 overflow-hidden reveal-soft stagger-4">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-linear-to-bl from-secondary/5 to-transparent rounded-tr-3xl rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative z-10">
                            <div className="w-14 h-14 bg-linear-to-br from-secondary/10 to-secondary/5 rounded-2xl flex items-center justify-center text-secondary-dark mb-6 group-hover:scale-110 transition-transform shadow-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                            </div>
                            <h3 className="font-bold text-lg mb-3 text-primary font-display">เวลาทำการ</h3>
                            <div className="space-y-2">
                                <p className="text-base-content/70 font-light text-sm flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                                    จันทร์ - ศุกร์: 08:30 - 16:30 น.
                                </p>
                                <p className="text-base-content/50 font-light text-xs">
                                    (หยุดวันเสาร์-อาทิตย์ และวันหยุดราชการ)
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 max-w-2xl mx-auto">
                    <div className="bg-linear-to-br from-primary to-primary-dark rounded-3xl shadow-lg p-8 lg:p-10 text-white relative overflow-hidden accent-panel reveal-soft stagger-2">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-bl-full" />
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/10 rounded-tr-full" />
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[40px_40px] mask-[radial-gradient(ellipse_50%_50%_at_50%,#000_70%,transparent_100%)]" />

                        <h3 className="text-xl font-bold mb-2 relative z-10 font-display">ลิงก์ด่วน</h3>
                        <p className="text-white/60 text-sm font-light mb-8 relative z-10">เข้าถึงข้อมูลสำคัญได้ทันที</p>

                        <ul className="space-y-3 relative z-10">
                            <li>
                                <Link href="/about" className="flex items-center justify-between p-4 rounded-2xl hover:bg-white/10 transition-colors group">
                                    <div className="flex items-center gap-4">
                                        <span className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-white/20 transition-colors text-lg">🏛️</span>
                                        <div>
                                            <span className="text-sm font-semibold block">เกี่ยวกับสภาวัฒนธรรม</span>
                                            <span className="text-xs text-white/50 font-light">วิสัยทัศน์ พันธกิจ โครงสร้าง</span>
                                        </div>
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                                </Link>
                            </li>
                            <li>
                                <Link href="/districts" className="flex items-center justify-between p-4 rounded-2xl hover:bg-white/10 transition-colors group">
                                    <div className="flex items-center gap-4">
                                        <span className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-white/20 transition-colors text-lg">🗺️</span>
                                        <div>
                                            <span className="text-sm font-semibold block">เครือข่ายอำเภอ</span>
                                            <span className="text-xs text-white/50 font-light">18 อำเภอทั่วจังหวัด</span>
                                        </div>
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                                </Link>
                            </li>
                            <li>
                                <Link href="/heritage" className="flex items-center justify-between p-4 rounded-2xl hover:bg-white/10 transition-colors group">
                                    <div className="flex items-center gap-4">
                                        <span className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-white/20 transition-colors text-lg">📚</span>
                                        <div>
                                            <span className="text-sm font-semibold block">คลังมรดกภูมิปัญญา</span>
                                            <span className="text-xs text-white/50 font-light">บทความ แหล่งเรียนรู้ ปราชญ์</span>
                                        </div>
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                                </Link>
                            </li>
                            <li>
                                <Link href="/activities" className="flex items-center justify-between p-4 rounded-2xl hover:bg-white/10 transition-colors group">
                                    <div className="flex items-center gap-4">
                                        <span className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-white/20 transition-colors text-lg">🎉</span>
                                        <div>
                                            <span className="text-sm font-semibold block">กิจกรรมทั้งหมด</span>
                                            <span className="text-xs text-white/50 font-light">ประเพณี เทศกาล งานวัฒนธรรม</span>
                                        </div>
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <section className="py-20 px-4 md:px-8 bg-white border-t border-base-200 relative overflow-hidden accent-panel">
                <div className="absolute inset-0 opacity-[0.02] mask-kanok bg-primary pointer-events-none" />
                <div className="container mx-auto max-w-6xl relative z-10">
                    <div className="text-center mb-10 reveal-soft">
                        <span className="text-accent font-semibold tracking-widest text-sm uppercase mb-3 block">Location</span>
                        <h2 className="text-3xl font-bold text-primary font-display">แผนที่ตั้งสำนักงาน</h2>
                        <p className="text-base-content/60 font-light mt-3 max-w-lg mx-auto">{contactAddress}</p>
                    </div>

                    <div className="rounded-3xl border border-secondary/20 shadow-[0_8px_30px_rgb(212,175,55,0.05)] overflow-hidden aspect-video relative reveal-soft stagger-1">
                        <iframe
                            src="https://maps.google.com/maps?q=สำนักงานวัฒนธรรมจังหวัดเชียงราย%20เลขที่%20570%20หมู่%202%20ถนนเลี่ยงเมืองเชียงรายตะวันตก%20ตำบลบ้านดู่%20อำเภอเมืองเชียงราย%20จังหวัดเชียงราย%2057100&z=16&output=embed"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="absolute inset-0 w-full h-full"
                            title="แผนที่สำนักงานวัฒนธรรมจังหวัดเชียงราย"
                        />
                    </div>

                    <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a
                            href="https://maps.google.com/?q=สำนักงานวัฒนธรรมจังหวัดเชียงราย เลขที่ 570 หมู่ 2 ถนนเลี่ยงเมืองเชียงรายตะวันตก ตำบลบ้านดู่ อำเภอเมืองเชียงราย จังหวัดเชียงราย 57100"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white font-medium text-sm shadow-md shadow-primary/20 hover:shadow-lg hover:bg-primary-dark transition-all group"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                            เปิดใน Google Maps
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"><path d="M7 7h10v10" /><path d="M7 17 17 7" /></svg>
                        </a>
                        <a
                            href="https://maps.google.com/maps/dir//สำนักงานวัฒนธรรมจังหวัดเชียงราย เลขที่ 570 หมู่ 2 ถนนเลี่ยงเมืองเชียงรายตะวันตก ตำบลบ้านดู่ อำเภอเมืองเชียงราย จังหวัดเชียงราย 57100"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-primary font-medium text-sm border border-base-200 shadow-sm hover:border-secondary hover:shadow-md transition-all group"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11" /></svg>
                            นำทาง
                        </a>
                    </div>
                </div>
            </section>
        </div>
    )
}
