'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const menuItems = [
    {
        label: 'หน้าแรก',
        href: '/',
    },
    {
        label: 'เกี่ยวกับเรา',
        href: '/about',
        submenu: [
            { label: 'ประวัติและวิสัยทัศน์', href: '/about' },
            { label: 'คณะกรรมการจังหวัด', href: '/about/board' },
        ],
    },
    {
        label: 'กิจกรรม',
        href: '/activities',
        submenu: [
            { label: 'กิจกรรมระดับจังหวัด', href: '/activities' },
            { label: 'ปฏิทินกิจกรรม', href: '/activities/calendar' },
        ],
    },
    {
        label: 'เครือข่ายอำเภอ',
        href: '/districts',
    },
    {
        label: 'คลังมรดกภูมิปัญญา',
        href: '/heritage',
        submenu: [
            { label: 'ทั้งหมด', href: '/heritage' },
            { label: 'มรดกภูมิปัญญา', href: '/heritage?category=intangible-heritage' },
            { label: 'แหล่งเรียนรู้', href: '/heritage?category=learning-resources' },
            { label: 'ปราชญ์ชาวบ้าน', href: '/heritage?category=local-wisdom' },
            { label: 'ศูนย์เชียงรายศึกษา ↗', href: 'https://social.crru.ac.th/cr-studies-center', external: true },
        ],
    },
    {
        label: 'ข่าวสาร',
        href: '/news',
    },
    {
        label: 'ติดต่อเรา',
        href: '/contact',
    },
]

export default function Navbar() {
    const pathname = usePathname()

    const isActive = (href: string) => {
        if (href === '/') return pathname === '/'
        return pathname === href || pathname.startsWith(`${href}/`)
    }

    const handleClick = () => {
        if (typeof document !== 'undefined') {
            const activeElement = document.activeElement as HTMLElement
            if (activeElement) {
                activeElement.blur()
            }
            // For details element in daisyUI mobile menu
            const detailsElement = activeElement.closest('details')
            if (detailsElement) {
                detailsElement.removeAttribute('open')
            }
        }
    }

    return (
        <div className="fixed top-0 inset-x-0 z-50 px-4 py-4 transition-all duration-300">
            <nav className="mx-auto max-w-7xl rounded-2xl bg-white/80 backdrop-blur-xl border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative">
                <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-secondary/70 to-transparent" />
                <div className="px-5 sm:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <div className="flex items-center">
                            {/* Mobile Menu Button */}
                            <div className="dropdown lg:hidden">
                                <button type="button" tabIndex={0} aria-label="เปิดเมนูนำทาง" className="btn btn-ghost btn-sm mr-2 rounded-lg min-h-11 min-w-11">
                                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h8m-8 6h16" />
                                    </svg>
                                </button>
                                {/* Mobile Menu Dropdown */}
                                <ul tabIndex={0} className="menu menu-sm dropdown-content bg-white rounded-xl z-100 mt-4 w-64 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-base-200">
                                    {menuItems.map((item) => (
                                        <li key={item.href}>
                                            {item.submenu ? (
                                                <details>
                                                    <summary className="font-medium py-2 text-base-content/80">{item.label}</summary>
                                                    <ul className="p-2 gap-1 relative before:absolute before:left-4 before:top-0 before:bottom-0 before:w-px before:bg-base-200">
                                                        {item.submenu.map((sub) => (
                                                            <li key={sub.href}>
                                                                {sub.external ? (
                                                                    <a href={sub.href} onClick={handleClick} target="_blank" rel="noopener noreferrer" className="py-2 hover:bg-slate-50 hover:text-primary rounded-lg text-sm text-base-content/70">
                                                                        {sub.label}
                                                                    </a>
                                                                ) : (
                                                                    <Link href={sub.href} onClick={handleClick} className="py-2 hover:bg-slate-50 hover:text-primary rounded-lg text-sm text-base-content/70">
                                                                        {sub.label}
                                                                    </Link>
                                                                )}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </details>
                                            ) : (
                                                <Link href={item.href} onClick={handleClick} className={`font-medium py-2 rounded-lg ${isActive(item.href) ? 'text-primary bg-secondary/10' : 'text-base-content/80 hover:bg-slate-50 hover:text-primary'}`} aria-current={isActive(item.href) ? 'page' : undefined}>{item.label}</Link>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Logo and Brand */}
                            <Link href="/" onClick={handleClick} className="flex items-center gap-3.5 group">
                                <div className="w-11 h-11 relative rounded-full overflow-hidden flex items-center justify-center shadow-md shadow-secondary/20 group-hover:scale-105 transition-all duration-300">
                                    <Image src="/logo.png" alt="โลโก้สภาวัฒนธรรม" fill sizes="44px" className="object-contain" priority />
                                </div>
                                <div className="hidden sm:block">
                                    <div className="font-bold text-primary text-xl leading-tight tracking-tight group-hover:text-secondary-dark transition-colors font-display">สภาวัฒนธรรม</div>
                                    <div className="text-[11px] text-accent font-medium tracking-widest uppercase mt-0.5">จังหวัดเชียงราย</div>
                                </div>
                            </Link>
                        </div>

                        {/* Desktop Menu - Center */}
                        <div className="hidden lg:flex items-center">
                            <ul className="flex items-center gap-1.5">
                                {menuItems.map((item) => (
                                    <li key={item.href} className="relative group">
                                        {item.submenu ? (
                                            <div className="dropdown dropdown-hover">
                                                <button type="button" tabIndex={0} className={`px-4 py-2 font-medium text-[15px] rounded-full transition-all cursor-pointer inline-flex items-center gap-1.5 ${isActive(item.href) ? 'text-primary bg-secondary/10' : 'text-base-content/70 hover:text-primary hover:bg-secondary/5'}`}>
                                                    {item.label}
                                                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                                </button>
                                                <ul tabIndex={0} className="dropdown-content absolute left-0 top-full pt-3">
                                                    <div className="bg-white w-60 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-2 animate-fade-in-up border border-base-200 relative">
                                                        <div className="absolute -top-1 left-6 w-3 h-3 bg-white border-l border-t border-base-200 rotate-45 -z-10"></div>
                                                        {item.submenu.map((sub) => (
                                                            <li key={sub.href}>
                                                                {sub.external ? (
                                                                    <a href={sub.href} onClick={handleClick} target="_blank" rel="noopener noreferrer" className="block px-4 py-2.5 text-sm text-base-content/70 hover:bg-secondary/5 hover:text-primary rounded-xl transition-colors">
                                                                        {sub.label}
                                                                    </a>
                                                                ) : (
                                                                    <Link href={sub.href} onClick={handleClick} className="block px-4 py-2.5 text-sm text-base-content/70 hover:bg-secondary/5 hover:text-primary rounded-xl transition-colors">
                                                                        {sub.label}
                                                                    </Link>
                                                                )}
                                                            </li>
                                                        ))}
                                                    </div>
                                                </ul>
                                            </div>
                                        ) : (
                                            <Link href={item.href} onClick={handleClick} className={`px-4 py-2 font-medium text-[15px] rounded-full transition-all block ${isActive(item.href) ? 'text-primary bg-secondary/10' : 'text-base-content/70 hover:text-primary hover:bg-secondary/5'}`} aria-current={isActive(item.href) ? 'page' : undefined}>
                                                {item.label}
                                            </Link>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Right Side - Search & Admin */}
                        <div className="flex items-center gap-3">
                            <button aria-label="ค้นหา" className="btn btn-ghost btn-circle btn-sm min-h-11 min-w-11 text-base-content/60 hover:bg-secondary/10 hover:text-primary transition-colors border border-transparent hover:border-secondary/20">
                                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                            <div className="hidden sm:block w-px h-6 bg-base-200"></div>
                            <Link href="/admin" onClick={handleClick} className="hidden sm:inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium text-white bg-primary rounded-full hover:bg-primary-dark transition-all shadow-[0_4px_14px_0_rgba(27,42,73,0.39)] hover:shadow-[0_6px_20px_rgba(27,42,73,0.23)] hover:-translate-y-0.5 active:translate-y-0">
                                เข้าสู่ระบบ
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}
