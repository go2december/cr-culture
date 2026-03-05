import Link from 'next/link'

const categories = [
    { id: 'all', label: 'ทั้งหมด', icon: '📚' },
    { id: 'intangible-heritage', label: 'มรดกภูมิปัญญา', icon: '🏛️' },
    { id: 'chiangrai-studies', label: 'ศูนย์เชียงรายศึกษา', icon: '🎓' },
    { id: 'learning-resources', label: 'แหล่งเรียนรู้', icon: '📖' },
    { id: 'local-wisdom', label: 'ปราชญ์ชาวบ้าน', icon: '👨‍🏫' },
]

const sampleArticles = [
    {
        slug: 'lanna-textile',
        title: 'ผ้าทอล้านนา มรดกแห่งภูมิปัญญา',
        excerpt: 'ศิลปะการทอผ้าของชาวล้านนาที่สืบทอดกันมาหลายชั่วอายุคน',
        category: 'intangible-heritage',
        tags: ['ผ้าทอ', 'หัตถกรรม'],
        coverImage: null,
    },
    {
        slug: 'khantoke-dinner',
        title: 'ขันโตก วัฒนธรรมการกินอาหารล้านนา',
        excerpt: 'ประเพณีการรับประทานอาหารบนขันโตก ที่เชื่อมโยงคนในครอบครัว',
        category: 'intangible-heritage',
        tags: ['อาหาร', 'ประเพณี'],
        coverImage: null,
    },
    {
        slug: 'chiang-rai-history',
        title: 'ประวัติศาสตร์เมืองเชียงราย',
        excerpt: 'เรื่องราวความเป็นมาของนครเชียงราย ตั้งแต่สมัยพญามังราย',
        category: 'chiangrai-studies',
        tags: ['ประวัติศาสตร์'],
        coverImage: null,
    },
    {
        slug: 'wat-rong-khun',
        title: 'วัดร่องขุ่น แหล่งเรียนรู้ทางศิลปะ',
        excerpt: 'สถาปัตยกรรมร่วมสมัยที่ผสมผสานศิลปะล้านนากับความทันสมัย',
        category: 'learning-resources',
        tags: ['วัด', 'ศิลปะ'],
        coverImage: null,
    },
    {
        slug: 'local-sage-interview',
        title: 'ปราชญ์ชาวบ้าน ผู้รักษาภูมิปัญญาท้องถิ่น',
        excerpt: 'บทสัมภาษณ์ปราชญ์ชาวบ้านผู้เชี่ยวชาญด้านสมุนไพรพื้นบ้าน',
        category: 'local-wisdom',
        tags: ['สมุนไพร', 'ภูมิปัญญา'],
        coverImage: null,
    },
]

export default async function HeritagePage({
    searchParams,
}: {
    searchParams: Promise<{ category?: string; tag?: string }>
}) {
    const params = await searchParams
    const selectedCategory = params.category || 'all'

    const filteredArticles = selectedCategory === 'all'
        ? sampleArticles
        : sampleArticles.filter(a => a.category === selectedCategory)

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
                        ความรู้และภูมิปัญญา
                    </div>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-primary tracking-tight animate-fade-in-up delay-100 font-display">
                        คลังมรดกภูมิปัญญา
                    </h1>
                    <p className="text-lg md:text-xl text-base-content/70 max-w-2xl mx-auto font-light leading-relaxed animate-fade-in-up delay-200">
                        รวบรวมและสงวนรักษามรดกทางวัฒนธรรม องค์ความรู้ และภูมิปัญญาท้องถิ่นอันทรงคุณค่าของจังหวัดเชียงราย
                    </p>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 to-transparent z-10" />
            </section>

            {/* Breadcrumb - Subtle & Clean */}
            <div className="container mx-auto max-w-7xl px-4 py-6 relative z-20">
                <div className="breadcrumbs text-sm text-base-content/60 font-light">
                    <ul>
                        <li><Link href="/" className="hover:text-primary transition-colors">หน้าแรก</Link></li>
                        <li className="text-primary font-medium">คลังมรดกภูมิปัญญา</li>
                    </ul>
                </div>
            </div>

            <div className="container mx-auto max-w-7xl px-4 py-8 pb-24">
                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Sidebar - Filters */}
                    <aside className="lg:col-span-1 animate-fade-in-up delay-300">
                        <div className="bg-white rounded-3xl border border-base-200 shadow-sm p-6 sticky top-28">
                            <h3 className="text-lg font-bold text-primary mb-6 flex items-center gap-2 font-display">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-secondary"><line x1="21" x2="14" y1="4" y2="4" /><line x1="10" x2="3" y1="4" y2="4" /><line x1="21" x2="12" y1="12" y2="12" /><line x1="8" x2="3" y1="12" y2="12" /><line x1="21" x2="16" y1="20" y2="20" /><line x1="12" x2="3" y1="20" y2="20" /><line x1="14" x2="14" y1="2" y2="6" /><line x1="8" x2="8" y1="10" y2="14" /><line x1="16" x2="16" y1="18" y2="22" /></svg>
                                หมวดหมู่
                            </h3>

                            <ul className="space-y-1">
                                {categories.map((cat) => (
                                    <li key={cat.id}>
                                        <Link
                                            href={cat.id === 'all' ? '/heritage' : `/heritage?category=${cat.id}`}
                                            className={`flex items-center gap-3 p-3 rounded-xl transition-all ${selectedCategory === cat.id
                                                ? 'bg-primary text-white shadow-md font-medium'
                                                : 'hover:bg-secondary/10 text-base-content/70 hover:text-primary font-light'
                                                }`}
                                        >
                                            <span className="text-xl flex-shrink-0 w-8 text-center">{cat.icon}</span>
                                            <span>{cat.label}</span>
                                            {selectedCategory === cat.id && (
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-auto opacity-70 text-secondary"><path d="m9 18 6-6-6-6" /></svg>
                                            )}
                                        </Link>
                                    </li>
                                ))}
                            </ul>

                            {/* Popular Tags */}
                            <div className="mt-8 pt-8 border-t border-base-100">
                                <h4 className="text-sm font-bold text-base-content/80 mb-4 uppercase tracking-wider">แท็กยอดนิยม</h4>
                                <div className="flex flex-wrap gap-2">
                                    {['ผ้าทอ', 'อาหาร', 'ประเพณี', 'ศิลปะ', 'สมุนไพร', 'หัตถกรรม'].map((tag) => (
                                        <Link
                                            key={tag}
                                            href={`/heritage?tag=${tag}`}
                                            className="px-3 py-1.5 rounded-lg bg-slate-50 border border-base-200 text-xs font-medium text-base-content/60 hover:text-primary hover:border-secondary transition-colors"
                                        >
                                            #{tag}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content - Article Grid */}
                    <main className="lg:col-span-3 pb-12">
                        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4 animate-fade-in-up delay-400">
                            <h2 className="text-2xl font-bold flex items-center gap-3 font-display text-primary">
                                {categories.find(c => c.id === selectedCategory)?.label || 'ทั้งหมด'}
                                <span className="text-sm font-medium px-3 py-1 rounded-full bg-secondary/20 text-primary-dark">
                                    {filteredArticles.length} รายการ
                                </span>
                            </h2>

                            <div className="flex items-center gap-2">
                                <span className="text-sm text-base-content/50 font-light">จัดเรียง:</span>
                                <select className="bg-white border border-base-200 text-sm rounded-xl px-4 py-2 outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/50 appearance-none cursor-pointer pr-8 bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%24%2024%22%20fill%3D%22none%22%20stroke%3D%22%23caa635%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:1em] bg-[right_0.5rem_center] bg-no-repeat shadow-sm">
                                    <option>ล่าสุด</option>
                                    <option>ยอดนิยม</option>
                                    <option>ตัวอักษร ก-ฮ</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 animate-fade-in-up delay-500">
                            {filteredArticles.map((article, i) => (
                                <Link
                                    key={article.slug}
                                    href={`/heritage/${article.slug}`}
                                    className={`card-modern group bg-white rounded-3xl border border-base-200 shadow-sm hover:shadow-[0_8px_30px_rgb(212,175,55,0.08)] hover:border-secondary/50 transition-all duration-400 overflow-hidden flex flex-col h-full delay-${(i % 4) * 100}`}
                                >
                                    <figure className="aspect-[16/10] bg-slate-50 relative overflow-hidden flex-shrink-0 border-b border-base-100">
                                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/10 group-hover:scale-105 transition-transform duration-700 flex items-center justify-center">
                                            <span className="text-6xl drop-shadow-sm group-hover:-translate-y-2 transition-transform duration-500 delay-100">
                                                {categories.find(c => c.id === article.category)?.icon || '📄'}
                                            </span>
                                        </div>
                                    </figure>
                                    <div className="p-6 md:p-8 flex flex-col flex-grow">
                                        <div className="flex items-center gap-2 mb-4">
                                            <span className="text-[10px] font-bold px-2.5 py-1 rounded bg-secondary/20 text-primary uppercase tracking-widest">
                                                {categories.find(c => c.id === article.category)?.label}
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-bold group-hover:text-primary transition-colors mb-3 leading-snug font-display">
                                            {article.title}
                                        </h3>
                                        <p className="text-sm text-base-content/70 font-light line-clamp-2 mb-6 flex-grow">
                                            {article.excerpt}
                                        </p>
                                        <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-base-100/50">
                                            {article.tags.map((tag) => (
                                                <span key={tag} className="text-xs font-medium text-base-content/50 before:content-['#'] before:mr-0.5 group-hover:text-secondary-dark transition-colors">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="flex justify-center mt-16 animate-fade-in-up delay-700">
                            <div className="inline-flex items-center justify-center p-1 bg-white rounded-full border border-base-200 shadow-sm">
                                <button className="w-10 h-10 flex items-center justify-center rounded-full text-base-content/40 cursor-not-allowed">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                                </button>
                                <button className="w-10 h-10 flex items-center justify-center rounded-full bg-primary text-white font-medium shadow-sm">1</button>
                                <button className="w-10 h-10 flex items-center justify-center rounded-full text-base-content/70 hover:bg-secondary/10 transition-colors font-medium">2</button>
                                <button className="w-10 h-10 flex items-center justify-center rounded-full text-base-content/70 hover:bg-secondary/10 transition-colors font-medium">3</button>
                                <button className="w-10 h-10 flex items-center justify-center rounded-full text-base-content/70 hover:bg-secondary/10 transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                                </button>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}
