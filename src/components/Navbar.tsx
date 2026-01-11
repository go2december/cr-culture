import Link from 'next/link'

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
            { label: 'มรดกภูมิปัญญา', href: '/heritage?category=1' },
            { label: 'ศูนย์เชียงรายศึกษา', href: '/heritage?category=2' },
            { label: 'แหล่งเรียนรู้', href: '/heritage?category=3' },
            { label: 'ปราชญ์ชาวบ้าน', href: '/heritage?category=4' },
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
    return (
        <nav className="nav-lanna">
            <div className="container mx-auto max-w-7xl">
                {/* Navbar Start - Logo */}
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        {/* Mobile Menu */}
                        <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[100] mt-3 w-64 p-2 shadow-xl">
                            {menuItems.map((item) => (
                                <li key={item.href}>
                                    {item.submenu ? (
                                        <details>
                                            <summary className="font-medium">{item.label}</summary>
                                            <ul className="p-2">
                                                {item.submenu.map((sub) => (
                                                    <li key={sub.href}>
                                                        <Link href={sub.href}>{sub.label}</Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </details>
                                    ) : (
                                        <Link href={item.href} className="font-medium">{item.label}</Link>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <Link href="/" className="flex items-center gap-3 px-2">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-lg">
                            สภ
                        </div>
                        <div className="hidden sm:block">
                            <div className="font-bold text-primary text-lg leading-tight">สภาวัฒนธรรม</div>
                            <div className="text-xs text-base-content/60">จังหวัดเชียงราย</div>
                        </div>
                    </Link>
                </div>

                {/* Navbar Center - Desktop Menu */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-1">
                        {menuItems.map((item) => (
                            <li key={item.href}>
                                {item.submenu ? (
                                    <details>
                                        <summary className="font-medium hover:text-primary">{item.label}</summary>
                                        <ul className="p-2 w-56 bg-base-100 rounded-box shadow-xl z-[100]">
                                            {item.submenu.map((sub) => (
                                                <li key={sub.href}>
                                                    <Link href={sub.href} className="hover:bg-primary/10 hover:text-primary">
                                                        {sub.label}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </details>
                                ) : (
                                    <Link href={item.href} className="font-medium hover:text-primary hover:bg-primary/10">
                                        {item.label}
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Navbar End - Search & CTA */}
                <div className="navbar-end gap-2">
                    <button className="btn btn-ghost btn-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                    <Link href="/admin" className="btn btn-primary btn-sm hidden sm:flex">
                        Admin
                    </Link>
                </div>
            </div>
        </nav>
    )
}
