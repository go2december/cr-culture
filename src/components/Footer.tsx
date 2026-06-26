import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
    return (
        <footer className="bg-slate-50 border-t border-base-200 relative overflow-hidden">
            <div className="h-px bg-linear-to-r from-transparent via-secondary/70 to-transparent" />
            <div className="absolute inset-x-0 top-0 h-24 bg-linear-to-b from-secondary/5 to-transparent pointer-events-none" />

            <div className="container mx-auto max-w-7xl px-4 py-20">
                <div className="grid md:grid-cols-4 gap-12">
                    <div className="md:col-span-1 reveal-soft">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-16 relative rounded-full overflow-hidden flex items-center justify-center shadow-sm border border-base-200 bg-white">
                                <Image src="/logo.png" alt="โลโก้สภาวัฒนธรรม" fill sizes="64px" className="object-contain p-1" />
                            </div>
                            <div>
                                <div className="font-bold text-primary text-xl tracking-tight leading-tight">สภาวัฒนธรรม</div>
                                <div className="text-[11px] text-base-content/60 uppercase tracking-widest font-semibold mt-0.5">จังหวัดเชียงราย</div>
                            </div>
                        </div>
                        <p className="text-[15px] text-base-content/70 mb-6 leading-relaxed font-normal">
                            ร่วมส่งเสริมและอนุรักษ์มรดกวัฒนธรรมล้านนา เชื่อมโยงภูมิปัญญาจากอดีตสู่ความยั่งยืนในอนาคต
                        </p>

                    </div>

                    <div className="reveal-soft stagger-1">
                        <h4 className="font-bold text-[15px] mb-5 text-primary tracking-wide">ลิงก์ด่วน</h4>
                        <ul className="space-y-3">
                            <li><Link href="/about" className="text-[15px] text-base-content/70 hover:text-primary transition-colors inline-block font-normal">เกี่ยวกับเรา</Link></li>
                            <li><Link href="/about/board" className="text-[15px] text-base-content/70 hover:text-primary transition-colors inline-block font-normal">คณะกรรมการ</Link></li>
                            <li><Link href="/activities" className="text-[15px] text-base-content/70 hover:text-primary transition-colors inline-block font-normal">กิจกรรม</Link></li>
                            <li><Link href="/districts" className="text-[15px] text-base-content/70 hover:text-primary transition-colors inline-block font-normal">เครือข่ายอำเภอ</Link></li>
                        </ul>
                    </div>

                    <div className="reveal-soft stagger-2">
                        <h4 className="font-bold text-[15px] mb-5 text-primary tracking-wide">มรดกภูมิปัญญา</h4>
                        <ul className="space-y-3">
                            <li><Link href="/heritage?category=intangible-heritage" className="text-[15px] text-base-content/70 hover:text-primary transition-colors inline-block font-normal">มรดกภูมิปัญญา</Link></li>
                            <li><Link href="/heritage?category=learning-resources" className="text-[15px] text-base-content/70 hover:text-primary transition-colors inline-block font-normal">แหล่งเรียนรู้</Link></li>
                            <li><Link href="/heritage?category=local-wisdom" className="text-[15px] text-base-content/70 hover:text-primary transition-colors inline-block font-normal">ปราชญ์ชาวบ้าน</Link></li>
                            <li><a href="https://social.crru.ac.th/cr-studies-center" target="_blank" rel="noopener noreferrer" className="text-[15px] text-base-content/70 hover:text-primary transition-colors inline-flex items-center gap-1 font-normal">ศูนย์เชียงรายศึกษา <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" x2="21" y1="14" y2="3" /></svg></a></li>
                        </ul>
                    </div>

                    <div className="reveal-soft stagger-3">
                        <h4 className="font-bold text-[15px] mb-5 text-primary tracking-wide">ติดต่อเรา</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-secondary shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span className="text-[15px] text-base-content/70 font-normal leading-relaxed">
                                    สำนักงานวัฒนธรรมจังหวัดเชียงราย เลขที่ 570 หมู่ 2 ถ.เลี่ยงเมืองเชียงรายตะวันตก ต.บ้านดู่ อ.เมืองเชียงราย จ.เชียงราย 57100
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-secondary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <span className="text-[15px] text-base-content/70 font-normal">0-5315-0169</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-secondary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <span className="text-[15px] text-base-content/70 font-normal">culture@chiangrai.go.th</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="border-t border-base-200 py-6 bg-white/50 relative">
                <div className="container mx-auto max-w-7xl px-4 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-base-content/60 font-normal">
                        ยฉ 2026 สภาวัฒนธรรมจังหวัดเชียงราย. สงวนลิขสิทธิ์.
                    </p>
                    <div className="flex gap-6 text-sm text-base-content/60 font-normal">
                        <Link href="/privacy" className="hover:text-primary transition-colors">นโยบายความเป็นส่วนตัว</Link>
                        <Link href="/terms" className="hover:text-primary transition-colors">ข้อกำหนดการใช้งาน</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
