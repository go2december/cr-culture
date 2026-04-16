import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
    return (
        <footer className="bg-slate-50 border-t border-base-200">
            {/* Gold Accent Line */}
            <div className="gold-accent" />

            <div className="container mx-auto max-w-7xl px-4 py-20">
                <div className="grid md:grid-cols-4 gap-12">
                    {/* Brand & Contact */}
                    <div className="md:col-span-1">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-16 relative rounded-full overflow-hidden flex items-center justify-center shadow-sm border border-base-200 bg-white">
                                <Image src="/logo.png" alt="โลโก้สภาวัฒนธรรม" fill sizes="64px" className="object-contain p-1" />
                            </div>
                            <div>
                                <div className="font-bold text-primary text-xl tracking-tight leading-tight">สภาวัฒนธรรม</div>
                                <div className="text-[11px] text-base-content/50 uppercase tracking-widest font-medium mt-0.5">จังหวัดเชียงราย</div>
                            </div>
                        </div>
                        <p className="text-[15px] text-base-content/60 mb-6 leading-relaxed font-light">
                            ร่วมส่งเสริมและอนุรักษ์มรดกวัฒนธรรมล้านนา <br />
                            เชื่อมโยงภูมิปัญญาจากอดีตสู่ความยั่งยืนในอนาคต
                        </p>
                        <div className="flex gap-2">
                            <button type="button" disabled aria-label="Facebook (กำลังอัปเดต)" className="w-11 h-11 rounded-full border border-base-200 flex items-center justify-center text-base-content/40 hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                            </button>
                            <button type="button" disabled aria-label="GitHub (กำลังอัปเดต)" className="w-11 h-11 rounded-full border border-base-200 flex items-center justify-center text-base-content/40 hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.11.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                                </svg>
                            </button>
                            <button type="button" disabled aria-label="X/Twitter (กำลังอัปเดต)" className="w-11 h-11 rounded-full border border-base-200 flex items-center justify-center text-base-content/40 hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-bold text-[15px] mb-5 text-primary tracking-wide">ลิงก์ด่วน</h4>
                        <ul className="space-y-3">
                            <li><Link href="/about" className="text-[15px] text-base-content/60 hover:text-primary transition-colors inline-block font-light">เกี่ยวกับเรา</Link></li>
                            <li><Link href="/about/board" className="text-[15px] text-base-content/60 hover:text-primary transition-colors inline-block font-light">คณะกรรมการ</Link></li>
                            <li><Link href="/activities" className="text-[15px] text-base-content/60 hover:text-primary transition-colors inline-block font-light">กิจกรรม</Link></li>
                            <li><Link href="/districts" className="text-[15px] text-base-content/60 hover:text-primary transition-colors inline-block font-light">เครือข่ายอำเภอ</Link></li>
                        </ul>
                    </div>

                    {/* Heritage Categories */}
                    <div>
                        <h4 className="font-bold text-[15px] mb-5 text-primary tracking-wide">มรดกภูมิปัญญา</h4>
                        <ul className="space-y-3">
                            <li><Link href="/heritage?category=1" className="text-[15px] text-base-content/60 hover:text-primary transition-colors inline-block font-light">มรดกภูมิปัญญา</Link></li>
                            <li><Link href="/heritage?category=2" className="text-[15px] text-base-content/60 hover:text-primary transition-colors inline-block font-light">แหล่งเรียนรู้</Link></li>
                            <li><Link href="/heritage?category=3" className="text-[15px] text-base-content/60 hover:text-primary transition-colors inline-block font-light">ปราชญ์ชาวบ้าน</Link></li>
                            <li><a href="https://social.crru.ac.th/cr-studies-center" target="_blank" rel="noopener noreferrer" className="text-[15px] text-base-content/60 hover:text-primary transition-colors inline-flex items-center gap-1 font-light">ศูนย์เชียงรายศึกษา <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" x2="21" y1="14" y2="3" /></svg></a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="font-bold text-[15px] mb-5 text-primary tracking-wide">ติดต่อเรา</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-secondary shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span className="text-[15px] text-base-content/60 font-light leading-relaxed">
                                    ศาลากลางจังหวัดเชียงราย<br />
                                    อำเภอเมือง จังหวัดเชียงราย 57000
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-secondary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <span className="text-[15px] text-base-content/60 font-light">053-150-150</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-secondary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <span className="text-[15px] text-base-content/60 font-light">culture@chiangrai.go.th</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-base-200 py-6 bg-white/50">
                <div className="container mx-auto max-w-7xl px-4 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-base-content/50 font-light">
                        © 2026 สภาวัฒนธรรมจังหวัดเชียงราย. สงวนลิขสิทธิ์.
                    </p>
                    <div className="flex gap-6 text-sm text-base-content/50 font-light">
                        <Link href="/privacy" className="hover:text-primary transition-colors">นโยบายความเป็นส่วนตัว</Link>
                        <Link href="/terms" className="hover:text-primary transition-colors">ข้อกำหนดการใช้งาน</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
