import Link from 'next/link'

export default function Footer() {
    return (
        <footer className="bg-base-200 border-t border-base-300">
            {/* Gold Accent Line */}
            <div className="gold-accent" />

            <div className="container mx-auto max-w-7xl px-4 py-16">
                <div className="grid md:grid-cols-4 gap-10">
                    {/* Brand & Contact */}
                    <div className="md:col-span-1">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-xl">
                                สภ
                            </div>
                            <div>
                                <div className="font-bold text-primary text-lg">สภาวัฒนธรรม</div>
                                <div className="text-sm text-base-content/60">จังหวัดเชียงราย</div>
                            </div>
                        </div>
                        <p className="text-sm text-base-content/70 mb-4">
                            ส่งเสริมและอนุรักษ์มรดกวัฒนธรรมล้านนา
                            เชื่อมโยงอดีตสู่อนาคต
                        </p>
                        <div className="flex gap-3">
                            <a href="#" className="btn btn-ghost btn-circle btn-sm hover:text-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                            </a>
                            <a href="#" className="btn btn-ghost btn-circle btn-sm hover:text-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.11.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                                </svg>
                            </a>
                            <a href="#" className="btn btn-ghost btn-circle btn-sm hover:text-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-bold text-lg mb-4 text-primary">ลิงก์ด่วน</h4>
                        <ul className="space-y-2">
                            <li><Link href="/about" className="text-sm hover:text-primary transition-colors">เกี่ยวกับเรา</Link></li>
                            <li><Link href="/about/board" className="text-sm hover:text-primary transition-colors">คณะกรรมการ</Link></li>
                            <li><Link href="/activities" className="text-sm hover:text-primary transition-colors">กิจกรรม</Link></li>
                            <li><Link href="/districts" className="text-sm hover:text-primary transition-colors">เครือข่ายอำเภอ</Link></li>
                            <li><Link href="/heritage" className="text-sm hover:text-primary transition-colors">คลังมรดกภูมิปัญญา</Link></li>
                        </ul>
                    </div>

                    {/* Heritage Categories */}
                    <div>
                        <h4 className="font-bold text-lg mb-4 text-primary">หมวดมรดกภูมิปัญญา</h4>
                        <ul className="space-y-2">
                            <li><Link href="/heritage?category=1" className="text-sm hover:text-primary transition-colors">มรดกภูมิปัญญา</Link></li>
                            <li><Link href="/heritage?category=2" className="text-sm hover:text-primary transition-colors">ศูนย์เชียงรายศึกษา</Link></li>
                            <li><Link href="/heritage?category=3" className="text-sm hover:text-primary transition-colors">แหล่งเรียนรู้</Link></li>
                            <li><Link href="/heritage?category=4" className="text-sm hover:text-primary transition-colors">ปราชญ์ชาวบ้าน</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="font-bold text-lg mb-4 text-primary">ติดต่อเรา</h4>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span className="text-sm">
                                    ศาลากลางจังหวัดเชียงราย<br />
                                    อำเภอเมือง จังหวัดเชียงราย 57000
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <span className="text-sm">053-150-150</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <span className="text-sm">culture@chiangrai.go.th</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-base-300 py-6">
                <div className="container mx-auto max-w-7xl px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-base-content/60">
                        © 2026 สภาวัฒนธรรมจังหวัดเชียงราย. สงวนลิขสิทธิ์.
                    </p>
                    <div className="flex gap-4 text-sm text-base-content/60">
                        <Link href="/privacy" className="hover:text-primary">นโยบายความเป็นส่วนตัว</Link>
                        <Link href="/terms" className="hover:text-primary">ข้อกำหนดการใช้งาน</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
